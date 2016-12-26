import React, { Component, PropTypes } from 'react'
import { View, Text, ScrollView, TouchableHighlight } from 'react-native'
import { getTransactions } from '../../actions/data'
import { Actions } from 'react-native-router-flux'
import { ItemRow, MessageModal } from '../../components'
import I18n from 'react-native-i18n'
import Icon from 'react-native-vector-icons/FontAwesome'
const plusIcon = (<Icon name='plus' size={26} color='#FFF' />)
const plusIconBlackDisabled = (<Icon name='plus' size={26} color='#BBBBBB' />)

function setAmountColor(type) {
  if (type === 'Income') return {color: 'green'}
  else return {color: 'red'}
}

function setMainText(transaction) {
  if (transaction.notes) return transaction.notes
  else return transaction.category
}

function getSymbol(symbol) {
  if (symbol === 'default') return null
  if (typeof symbol === 'number') return String.fromCharCode(symbol)
  else return symbol
}

export default class FavoriteTransaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedItemIndex: null,
      errorModalVisible: false
    }
  }

  componentWillReceiveProps(nextProps) {
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

  onPlusIconPress = () => {
    if (this.props.favoriteTransactions === null || this.props.favoriteTransactions.length < 5) {
      Actions.newTransaction({title: 'New Favorite Transaction'})
    } else {
      this.setModalVisible(true)
    }
  }

  getCustomNavBar = (editMode) => {
    if (editMode) {
      return <CustomNavBar
        onLeftPress={() => Actions.viewFavoriteTransactions({editMode: false})}
        onRightPress={() => {}}
        title='Favorite Transactions'
        leftButton='Done'
      />
    } else {
      return <CustomNavBar
        onLeftPress={() => Actions.pop()}
        onSecondLeftPress={() => Actions.editFavoriteTransactions({editMode: true})}
        onRightPress={() => this.onPlusIconPress()}
        title='Favorite Transactions'
        leftButton='Back'
        secondLeftButton='Edit'
        rightButton={plusIcon}
      />
    }
  }

  setModalVisible = (visible) => {
    this.setState({ errorModalVisible: visible })
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          {this.getCustomNavBar(this.props.editMode)}
        </View>
        <MessageModal
          setModalVisible={this.setModalVisible}
          modalVisible={this.state.errorModalVisible}
          text='Max 5 favorite transactions allowed'
        />
        <ScrollView>
            {this.props.favoriteTransactions !== null ? this.props.favoriteTransactions.map((transaction, i) =>
              <ItemRow
                key={i}
                itemIndex={i}
                editMode={this.props.editMode}
                selected={i === this.state.selectedItemIndex ? true : false}
                item={transaction}
                mainText={transaction.category}
                rightText={I18n.toCurrency(Math.abs(transaction.amount),
                  {unit: getSymbol(this.props.currencySymbol),
                  format: "%u %n",
                  sign_first: false,
                  precision: 0})}
                rightTextStyle={setAmountColor(transaction.type)}
                secondaryText={transaction.notes}
                onSelecetItem={this.onSelecetItem}
                onDeleteItem={this.props.removeFavoriteTransaction}
              />)
              : <View>
                  <Text style={styles.message}>Press the '+' icon to add your favorite Transactions</Text>
                </View>}
        </ScrollView>

      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    paddingBottom: 50
  },
  monthHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    marginBottom: 5
  },
  monthWrapper: {
    borderColor: '#BBB',
    borderWidth: 2,
    borderRadius: 5,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 5,
    paddingRight: 5
  },
  monthText: {
    fontSize: 18
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
  },
  message: {
    opacity: 0.6,
    paddingTop: 10,
    paddingLeft: 10
  }
}
