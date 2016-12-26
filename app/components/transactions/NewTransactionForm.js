import React, { Component, PropTypes } from 'react'
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import Button from 'react-native-button'
import { addBorder, DatePicker, DatePickerModal, RowDatePicker, RowWidgetWithTitle } from '../../components'
import { View, Text, StyleSheet, TextInput, TouchableHighlight, ListView, ScrollView } from 'react-native'

function getIcon(name) {
  return <Icon name={name} size={16} color='black' style={{paddingLeft: 10}}/>
}

class NewTransactionForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dateModalVisible: false
    }
  }

  setModalVisible = (visible) => {
    this.setState({ dateModalVisible: visible })
  }

  setCategoryColor = (category) => {
    if (category === 'Category') return 0.5
    else return 1
  }

  render() {
    const { name, category, categoryType, amount, date, notes, handleValueChange, onDateChange, error } = this.props
    return (
      <View style={[styles.container]}>
          <ScrollView keyboardShouldPersistTaps={true}>
          <GiftedForm
            formName='newTransactionForm'
            onValueChange={(values) => {
              handleValueChange(values, GiftedFormManager.validate('newTransactionForm'))
            }}
            validators={{
              amount: {
                title: 'Amount',
                validate: [{
                  validator: 'isNumeric',
                  message: '{TITLE} must be a number'
                }]
              }
            }}
          >
              {this.props.title !== 'New Favorite Transaction'
                ? <RowDatePicker
                    name='dateRow'
                    title='Date'
                    placeholder='Enter date'
                    image={getIcon('ios-calendar')}
                    date={date}
                    onDateChange={onDateChange}
                  /> : null }
                  <GiftedForm.TextInputWidget
                    name='amount'
                    title='Amount'
                    keyboardType='numeric'
                    placeholder='Enter amount'
                    clearButtonMode='while-editing'
                    value={amount}
                    image={getIcon('ios-cash')}
                    inline={true}
                  />
                  <RowWidgetWithTitle
                    title='Category'
                    disclosure={true}
                    onPress={() => Actions.categoryList({categoryType: this.props.categoryType})}
                    image={getIcon('ios-list-box')}
                    mainContent={category}
                    placeholder='Category'
                  />
                  <GiftedForm.TextAreaWidget
                    name='notes'
                    title='Notes'
                    placeholder='Enter Notes'
                    clearButtonMode='while-editing'
                    value={notes}
                  />
                  <GiftedForm.NoticeWidget title={error} style={{color: 'red'}}/>
          </GiftedForm>
          </ScrollView>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: "#FFF",
  }
})

NewTransactionForm.propTypes = {
  date: PropTypes.object,
  amount: PropTypes.string,
  category: PropTypes.string,
  notes: PropTypes.string,
  error: PropTypes.string,
  onDateChange: PropTypes.func.isRequired,
  handleValueChange: PropTypes.func.isRequired,
  newCategory: PropTypes.string
}

export default connect(
  (state) => ({newCategory: state.form.category})
)(NewTransactionForm)
