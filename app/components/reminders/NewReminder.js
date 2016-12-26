import React, { Component, PropTypes } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as remindersActions from '../../actions/reminders'
import { Actions } from 'react-native-router-flux'
import NewReminderForm from './NewReminderForm'

class NewReminder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        name: '',
        type: '',
        amount: '',
        date: new Date(),
        notes: ''
      },
      errors: ''
    }
  }

  onCancelPress = () => {
    this.setState({
      form: {
        name: '',
        type: '',
        amount: '',
        date: new Date(),
        notes: ''
      },
      errors: ''
    })
    Actions.pop()
  }

  handleValueChange = (values, formValidateInfo) => {
    let errors = ''
    this.setState({
      form: {
        ...this.state.form,
        isValid: formValidateInfo.isValid,
        amount: values.amount,
        notes: values.notes,
        type: values.type,
        name: values.name
      },
      errors,
      formValidateInfo
    })
  }

  onDateChange = (date) => {
    let dateParts = date.split('-')
    let formattedDate = new Date(dateParts[2], (dateParts[1] - 1), dateParts[0])
    this.setState({ ...this.state, form: {...this.state.form, date: formattedDate } })
  }

  onSubmitReminder = (isValid) => {
    const s = this.state
    if (s.form.isValid) {
      this.props.actions.reminders.setNewReminder(this.state.form)
      Actions.pop()
    } else {
      if (s.formValidateInfo === undefined) return this.setState({ errors: 'Please choose type of reminder'})
      let errors = ''
      if (!s.formValidateInfo.results.amount[0].isValid) errors += s.formValidateInfo.results.amount[0].message + '\n'
      if (!s.formValidateInfo.results.name[0].isValid) errors += s.formValidateInfo.results.name[0].message + '\n'
      if (!s.formValidateInfo.results.type[0].isValid) errors += s.formValidateInfo.results.type[0].message + '\n'
      this.setState({ errors })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <CustomNavBar
          onLeftPress={this.onCancelPress}
          onRightPress={this.onSubmitReminder}
          title={this.props.title}
          leftButton='Cancel'
          rightButton='Save'
        />
        <NewReminderForm
          date={this.state.form.date}
          name={this.state.form.name}
          type={this.state.form.type}
          amount={this.state.form.amount}
          notes={this.state.form.notes}
          handleValueChange={this.handleValueChange}
          onDateChange={this.onDateChange}
          onSubmitReminder={this.onSubmitReminder}
          errors={this.state.errors}
        />
      </View>
    )
  }
}

NewReminder.PropTypes = {
  setNewReminder: PropTypes.func.isRequired,
  title: PropTypes.string
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(253,253,253)',
  }
})

export default connect(
  (state) => ({}),
  (dispatch) => ({
    actions: {
      reminders: bindActionCreators(remindersActions, dispatch)
    }
  })
)(NewReminder)
