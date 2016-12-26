import React, { Component, PropTypes } from 'react'
import { View, Text, ScrollView, TouchableHighlight, Platform } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import I18n from 'react-native-i18n'
import SearchBar from 'react-native-search-bar'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  ItemRow,
  ChangeMonthArrows,
  MonthHeader, MenuModal,
  FilteredAndSortedTransactionsTotal,
  LoadingOverlay } from '../../components'
import { getTransactions } from '../../actions/data'
import { bindActionCreators } from 'redux'
import * as dataActions from '../../actions/data'
import * as formActions from '../../actions/form'
import * as transactionsActions from '../../actions/transactions'
import {searchTransactions, sortTransactions} from '../../functions/transactionsSearchAndFilter'
const upArrow = (<Icon name='angle-up' size={24} color='#FFF' />)
import onSendEmail from '../../functions/exportToCsv'
import {
  setAmountColor,
  setMainText,
  getSymbol } from '../../functions/transactionsScene'
import AppScrollView from '../common/AppScrollView'

class Transactions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedItemIndex: null,
      searchValue: '',
      isModalOpen: false,
      swipeToClose: true,
      sortType: 'date',
      dateSortDirection: false,
      amountSortDirection: false,
      categorySortDirection: false,
      scrollY: 44,
      isLoading: false
    }
  }

  componentDidMount() {
    this.refs._scrollView.scrollTo({y: this.state.scrollY})
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.visibleTransactions !== nextProps.visibleTransactions) {
      this.setState({isLoading: false})
    }
    if (!this.props.selectedItemIndex) this.setState({selectedItemIndex: null})
  }

  onSelecetItem = (itemIndex, selected, transaction) => {
    const selectedItemIndex = this.state.selectedItemIndex
    if (this.props.editMode) {
        if (selected) this.setState({ selectedItemIndex: null})
        else if (selectedItemIndex !== null && itemIndex !== selectedItemIndex) this.setState({ selectedItemIndex: null})
        else this.setState({ selectedItemIndex: itemIndex })
    } else {
        Actions.newTransaction({editMode: true, transaction})
    }
  }

  openModal = () => {
    this.setState({isModalOpen: true})
  }

  closeModal = () => {
    this.setState({isModalOpen: false})
  }

  setFilter = (filter) => {
    this.setState({
      sortType: filter,
      [`${filter}SortDirection`]: !this.state[`${this.state.sortType}SortDirection`],
      isModalOpen: false
    })

  }

  getIcon = (category) => {
    if (!!this.props.categoryIconIndex[category]) return this.props.categoryIconIndex[category]
    else return 'ios-pricetag'
  }

  onDeleteTransaction = (transaction) => {
    this.setState({ isLoading: true })
    this.props.actions.transactions.removeTransaction(transaction)
  }

  render() {
    const p = this.props
    let transactionsToRender = searchTransactions(p.visibleTransactions, this.state.searchValue)
    transactionsToRender = sortTransactions(transactionsToRender,
                                            this.state.sortType,
                                            this.state[`${this.state.sortType}SortDirection`])
    return (
      <View style={styles.container}>

          <MonthHeader
            currentMonthName={p.currentMonthName}
            onPressLeft={() => {
              p.actions.data.setMonth('previous',
                p.currentMonthIndex,
                p.yearTotal,
                p.transactions)
              this.refs._scrollView.scrollTo({y: this.state.scrollY})}}
            onPressRight={() => {
              p.actions.data.setMonth('next',
                p.currentMonthIndex,
                p.yearTotal,
                p.transactions)
              this.refs._scrollView.scrollTo({y: this.state.scrollY})}}
            onSortPress={() => this.openModal()}
            onExportPress={() => onSendEmail(transactionsToRender)}
          />

          <ScrollView ref='_scrollView'>

              <View style={{backgroundColor: '#c8c7cc'}}>
                  {Platform.OS === 'ios' ?
                    <SearchBar
                      ref='searchBar'
                      placeholder='Search Category, Amount or Notes'
                      text={p.searchTransactionsValue}
                      onChangeText={(value) => this.setState({searchValue: value})}
                      onSearchButtonPress={() => this.refs.searchBar.unFocus() }
                      onCancelButtonPress={() => {
                        this.setState({searchValue: ''})
                        this.refs._scrollView.scrollTo({y: this.state.scrollY})}}
                      showsCancelButton={true}/> : null}

                  <View style={{alignItems: 'center', justifyContent: 'center'}}>{upArrow}</View>

                  <FilteredAndSortedTransactionsTotal
                    transactions={transactionsToRender}
                    currencySymbol={p.currencySymbol}/>

              </View>

              {transactionsToRender.map((transaction, i) =>
                <ItemRow
                  key={i}
                  itemIndex={i}
                  editMode={p.editMode}
                  selected={i === this.state.selectedItemIndex ? true : false}
                  item={transaction}
                  mainText={setMainText(transaction)}
                  icon={this.getIcon(transaction.category)}
                  rightText={I18n.toCurrency(Math.abs(transaction.amount),
                    {unit: getSymbol(p.currencySymbol),
                    format: "%u %n",
                    sign_first: false,
                    precision: 0})}
                  rightTextStyle={setAmountColor(transaction.type)}
                  secondaryText={`${(new Date(transaction.date).toLocaleDateString('en-GB'))}, ${transaction.category}`}
                  onSelecetItem={this.onSelecetItem}
                  onDeleteItem={this.onDeleteTransaction}
                />
              )}
          </ScrollView>

          <MenuModal
            isOpen={this.state.isModalOpen}
            closeModal={this.closeModal}
            button1='Date'
            button1OnPress={() => this.setFilter('date')}
            button2='Amount'
            button2OnPress={() => this.setFilter('amount')}
            button3='Category'
            button3OnPress={() => this.setFilter('category')}
          />

          <LoadingOverlay isLoading={this.state.isLoading} />
      </View>
    )
  }
}

export default connect(
  (state) => ({
    transactions: state.transactions.transactions,
    visibleTransactions: state.data.visibleTransactions,
    currentMonthName: state.data.currentMonthName,
    currentMonthIndex: state.data.currentMonthIndex,
    yearTotal: state.data.yearTotal,
    currencySymbol: state.settings.currencySymbol,
    transactionsSearchValue: state.form.transactionsSearchValue,
    categoryIconIndex: state.categories.categoryIconIndex,
    forcedNewProps: state.transactions.forcedNewProps
  }),
  (dispatch) => ({
    actions: {
      data: bindActionCreators(dataActions, dispatch),
      transactions: bindActionCreators(transactionsActions, dispatch),
      form: bindActionCreators(formActions, dispatch)
    }
  }))(Transactions)

Transactions.propTypes = {
  transactions: PropTypes.array,
  visibleTransactions: PropTypes.array,
  currentMonthName: PropTypes.string,
  currentMonthIndex: PropTypes.number,
  yearTotal: PropTypes.array,
  currencySymbol: PropTypes.string,
  transactionsSearchValue: PropTypes.string,
  categoryIconIndex: PropTypes.object,
  forcedNewProps: PropTypes.bool
}

const styles = {
  container: {
    flex: 1,
    paddingTop: 64,
    paddingBottom: 50
  },
  transactionRow: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
    paddingTop: 5
  },
  nameAndAmount: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  date: {
    fontSize: 12
  },
  text: {
    fontSize: 22
  },
  icon: {
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
}
