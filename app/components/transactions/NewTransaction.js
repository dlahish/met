import React, { Component, PropTypes } from 'react'
import { NewTransactionForm, CustomNavBar, addBorder, CategorySelector, LoadingOverlay } from '../../components'
import { Actions, ActionConst } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Button from 'react-native-button'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { bindActionCreators } from 'redux'
import * as dataActionCreators from '../../actions/data'
import * as formActionCreators from '../../actions/form'
import * as transactionsActionCreators from '../../actions/transactions'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  LayoutAnimation,
  Keyboard,
  Dimensions,
  TouchableHighlight
} from 'react-native'

class NewTransaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
      amount: '',
      category: '',
      notes: null,
      error: '',
      categoryType: '',
      isValid: false,
      formValidateInfo: undefined,
      isLoading: false,
      visibleTransactions: null
    }
  }

  componentWillMount () {
    if (this.props.editMode && this.props.title === 'New Favorite Transaction' || !this.props.editMode) {
      this.setState({ categoryType: this.props.categoryType, visibleTransactions: this.props.visibleTransactions })
    } else {
      const tempDate = new Date(this.props.transaction.date),
            tempAmount = Math.abs(this.props.transaction.amount).toString()
      this.setState({
        _id: this.props.transaction._id,
        id: this.props.transaction.id,
        date: tempDate,
        amount: tempAmount,
        category: this.props.transaction.category,
        notes: this.props.transaction.notes,
        categoryType: this.props.transaction.type
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      // ...this.state,
      category: nextProps.newCategory,
      categoryType: nextProps.categoryType,
      error: ''
    })
  }

  onDateChange = (date) => {
    let dateParts = date.split('-')
    let formattedDate = new Date(dateParts[2], (dateParts[1] - 1), dateParts[0])
    this.setState({ date: formattedDate })
  }

  handleValueChange = (values, formValidateInfo) => {
    let error = this.state.error
    if (formValidateInfo.results.amount[0].value.length === 0) error = ''
    this.setState({
      isValid: formValidateInfo.isValid,
      amount: values.amount,
      notes: values.notes,
      error,
      formValidateInfo
    })
  }

  onSaveNewTransaction = () => {
    var isEditTransaction = false
    if (this.state.formValidateInfo === undefined && this.state.amount.length > 0) isEditTransaction = true

    if (this.state.isValid || isEditTransaction) {
        if (this.state.category === '') {
            this.setState({error: 'Category is required'})
        } else if (this.state.amount === null || this.state.amount.length === 0) {
            this.setState({error: 'Amount is required'})
        } else {
            let newAmount = this.state.amount
            if (this.state.categoryType === 'Expense') newAmount = this.state.amount * -1
            const transaction = {
              _id: this.state._id,
              id: this.state.id,
              date: this.state.date,
              amount: newAmount,
              category: this.state.category,
              notes: this.state.notes,
              type: this.state.categoryType
            }
            if (this.props.title === 'New Transaction') {
              if (!this.props.editMode || this.props.customFavorites) {
                this.props.actions.transactions.addNewTransaction(transaction)
                this.setState({isLoading: true})
                this.props.actions.form.clearForm()
                Actions.pop()
              } else {
                this.props.actions.transactions.updateTransaction(transaction)
                this.setState({isLoading: true})
                this.props.actions.form.clearForm()
                Actions.pop()
              }
            } else {
              this.props.actions.data.addFavoriteTransaction(transaction)
              this.setState({
                date: new Date(),
                amount: '',
                category: '',
                notes: '',
                error: '',
                categoryType: ''
              })
              this.props.actions.form.clearForm()
              Actions.pop()
            }

        }
    } else {
        let error
        if (this.state.formValidateInfo === undefined) {
          error = 'Amount is required'
          this.setState({error})
        } else if (this.state.formValidateInfo.results.amount[0].message.length > 0) {
          error = this.state.formValidateInfo.results.amount[0].message
          this.setState({error})
        } else { this.setState({error: ''}) }
    }
  }

  onCancelPress = () => {
    this.setState({
      date: new Date(),
      amount: '',
      category: '',
      notes: '',
      error: '',
      type: '',
      categoryType: ''
    })
    this.props.actions.form.clearForm()
    Actions.pop()
  }

  onTypeChange = (categoryType) => {
    this.props.actions.form.setCategoryType(categoryType)
  }

  onDeleteTransaction = () => {
    if (this.props.title === 'New Transaction') {
      this.props.actions.transactions.removeTransaction(this.props.transaction)
      Actions.pop()
    } else {
      this.props.actions.data.removeNewFavoriteTransaction(transaction)
    }
  }

  render() {
    let incomeSelected, expenseSelected
    if (this.state.categoryType === 'Income') { incomeSelected = true, expenseSelected = false }
    else { incomeSelected = false, expenseSelected = true }

    return (
      <View style={styles.container}>
        <CustomNavBar
          onLeftPress={this.onCancelPress}
          onRightPress={this.onSaveNewTransaction}
          title={this.props.title}
          leftButton='Cancel'
          rightButton='Save'
        />
        <CategorySelector
          incomeSelected={incomeSelected}
          expenseSelected={expenseSelected}
          onTypeChange={this.onTypeChange}
        />
        <NewTransactionForm
          date={this.state.date}
          amount={this.state.amount}
          category={this.state.category}
          categoryType={this.props.categoryType}
          notes={this.state.notes}
          error={this.state.error}
          type={this.state.type}
          onDateChange={this.onDateChange}
          title={this.props.title}
          handleValueChange={this.handleValueChange}
          onSaveNewTransaction={this.onSaveNewTransaction}
        />
        {this.props.editMode
          ? <View style={{alignItems: 'center'}}>
              <Button style={styles.btnText}
                containerStyle={styles.btn}
                onPress={this.onDeleteTransaction}>Delete transaction
              </Button>
            </View>
          : <View></View>}
        <KeyboardSpacer/>
        <LoadingOverlay isLoading={this.state.isLoading} />
      </View>
    )
  }
}

NewTransaction.propTypes = {
  newCategory: PropTypes.string,
  categoryType: PropTypes.string
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  btnText: {
    color: "#f2f2f2"
  },
  btn: {
    backgroundColor:"red",
    padding:4,
    borderRadius: 5,
    width:200,
    margin: 8,
    marginLeft: 15,
  }
})

export default connect(
  (state) => ({
    newCategory: state.form.category,
    categoryType: state.form.categoryType,
    visibleTransactions: state.data.visibleTransactions,
    customFavorites: state.settings.customFavorites }),
  (dispatch) => ({
    actions: {
      data: bindActionCreators(dataActionCreators, dispatch),
      form: bindActionCreators(formActionCreators, dispatch),
      transactions: bindActionCreators(transactionsActionCreators, dispatch)
    }
  })
)(NewTransaction)
