import React, { Component, PropTypes } from 'react'
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form'
import Icon from 'react-native-vector-icons/Ionicons'
import DatePicker from 'react-native-datepicker'
import { Actions } from 'react-native-router-flux'
import { View, Text, Image, ScrollView } from 'react-native'
import RowDatePicker from '../common/formWidgets/widgets/RowDatePicker'

function getIcon(name) {
  return <Icon name={name} size={16} color='black' style={{paddingLeft: 10}}/>
}

export default class NewReminderForm extends Component {
  render() {
    const { name, type, amount, date, notes, handleValueChange, onDateChange } = this.props
    return (
      <ScrollView keyboardShouldPersistTaps={true}>
      <GiftedForm
        formName='newReminderForm'
        onValueChange={(values) => {
          handleValueChange(values, GiftedFormManager.validate('newReminderForm'))
        }}
        validators={{
          name: {
            title: 'name',
            validate: [{
              validator: 'isLength',
              arguments: [1, 15],
              message: '{TITLE} is required'
            }]
          },
          amount: {
            title: 'Amount',
            validate: [{
              validator: 'isNumeric',
              message: '{TITLE} must be a number'
            }]
          },
          type: {
            title: 'Type',
            validate: [{
              validator: (...args) => {
                if (args[0] === undefined) {
                  return false;
                }
                return true;
              },
              message: '{TITLE} is required',
            }]
          }
        }}
      >
          <GiftedForm.GroupWidget title='Choose Type'/>
          <GiftedForm.SelectWidget name='type' title='Type' multiple={false}>
            <GiftedForm.OptionWidget
              image={<Image source={require('../../icons/wallet2_left.png')} style={{height:22,width:22}}/>}
              title='Borrow'
              value='borrow'/>
            <GiftedForm.OptionWidget
              image={<Image source={require('../../icons/wallet2_right.png')} style={{height:22,width:22}}/>}
              title='Lent'
              value='lent'/>
          </GiftedForm.SelectWidget>

          <GiftedForm.SeparatorWidget />
          <GiftedForm.GroupWidget title='enter details'/>
          <GiftedForm.TextInputWidget
            name='name'
            title='Name'
            placeholder='Enter name'
            clearButtonMode='while-editing'
            value={name}
            image={getIcon('md-person')}
          />
          <GiftedForm.TextInputWidget
            name='amount'
            title='Amount'
            keyboardType='numeric'
            placeholder='Enter amount'
            clearButtonMode='while-editing'
            value={amount}
            image={getIcon('ios-cash')}
          />
          <RowDatePicker
            name='dateRow'
            title='Date'
            placeholder='Enter date'
            image={getIcon('ios-calendar')}
            date={date}
            onDateChange={onDateChange}
            />
          <GiftedForm.TextAreaWidget
            name='notes'
            title='Notes'
            placeholder='Enter Notes'
            clearButtonMode='while-editing'
            value={notes}
          />
          <GiftedForm.NoticeWidget title={this.props.errors} style={{color: 'red'}}/>
          <GiftedForm.ErrorsWidget />
          <GiftedForm.SubmitWidget
            title='Add new reminder'
            widgetStyles={{
              submitButton: {
                backgroundColor: 'green',
              }
            }}
            onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
              if (isValid === true) {
                values.date = date
                GiftedFormManager.reset('newReminderForm')
                this.props.onSubmitReminder(isValid)
              } else {
                console.log('validationResults', validationResults)

              }
            }}
          />
      </GiftedForm>
      </ScrollView>
    )
  }
}

NewReminderForm.PropTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  amount: PropTypes.number,
  date: PropTypes.date,
  notes: PropTypes.string,
  handleValueChange: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired
}
