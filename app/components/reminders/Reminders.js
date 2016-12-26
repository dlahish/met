import React, { Component, PropTypes } from 'react'
import I18n from 'react-native-i18n'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as remindersActions from '../../actions/reminders'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux'
import { ItemRow, MessageModal } from '../../components'
import { setAmountColor, setMainText, getSymbol } from '../../functions/transactionsScene'
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView
} from 'react-native'

function filterReminders(reminders, filter) {
  let filteredReminders
  if (filter === 'active') filteredReminders = reminders.filter((reminder) => !reminder.completed)
  else filteredReminders = reminders.filter((reminder) => reminder.completed)
  return filteredReminders
}

function getSecondaryText(reminder) {
  const date = new Date(reminder.date).toLocaleDateString('en-GB')
        completed = new Date(reminder.completionDate).toLocaleDateString('en-GB')
  if (reminder.completed) {
    if (reminder.notes.length > 0) return `${date}, ${reminder.notes}, ${reminder.type}, completed: ${completed}`
    else return `${date}, ${reminder.notes}, completed: ${completed}`
  }
  else {
    if (reminder.notes.length > 0) return `${date}, ${reminder.notes}, ${reminder.type}`
    else return `${date}, ${reminder.type}`
  }
}

class Reminders extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      filter: 'active'
    }
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible })
  }

  onCheckRow = (itemId) => {
    this.props.actions.reminders.setCheckedReminder(itemId)
  }

  onDeleteConfirmPress = (result) => {
    this.setState({ modalVisible: false })
    if (result) this.props.actions.reminders.clearCompletedReminders()
  }

  onClearCompletedPress = () => {
    this.setModalVisible(true)
  }

  setRemindersFilter = (type) => {
    this.setState({ filter: type })
  }

  render() {
    const p = this.props
    const filteredReminders = filterReminders(p.reminders, this.state.filter)
    return (
      <View style={styles.container}>
          <ScrollView style={{flex: 1}}>
            {filteredReminders.map((reminder,i) =>
              <ItemRow
                key={i}
                itemIndex={i}
                icon='checkBox'
                completed={reminder.completed}
                onCheckRow={this.onCheckRow}
                item={reminder}
                mainText={reminder.name}
                rightText={I18n.toCurrency(Math.abs(reminder.amount),
                  {unit: getSymbol(reminder.currencySymbol),
                  format: "%u %n",
                  sign_first: false,
                  precision: 0})}
                rightTextStyle={setAmountColor(reminder.type[0])}
                secondaryText={getSecondaryText(reminder)}
                onSelecetItem={() => {}}
              />
            )}
          </ScrollView>


              {this.state.filter === 'active'
                ? <ActionButton buttonColor="rgba(231,76,60,1)" offsetY={40} offsetX={15}>
                    <ActionButton.Item
                      buttonColor='#9b59b6'
                      title="New Reminder"
                      onPress={() => Actions.newReminder()}>
                      <Icon name="md-create" style={styles.actionButtonIcon} />
                    </ActionButton.Item>

                    <ActionButton.Item
                      buttonColor='#1abc9c'
                      title="Completed reminders"
                      onPress={() => this.setRemindersFilter('completed')}>
                      <Icon name="md-warning" style={[styles.actionButtonIcon, {fontSize: 20}]}/>
                    </ActionButton.Item>
                  </ActionButton>
                : <ActionButton buttonColor="rgba(231,76,60,1)" offsetY={40} offsetX={15}>
                    <ActionButton.Item
                      buttonColor='#1abc9c'
                      title="Active reminders"
                      onPress={() => this.setRemindersFilter('active')}>
                      <Icon name="md-list" style={[styles.actionButtonIcon, {fontSize: 20}]}/>
                    </ActionButton.Item>
                    <ActionButton.Item
                      buttonColor='red'
                      title="Clear all completed reminders"
                      onPress={() => this.onClearCompletedPress()}>
                      <Icon name="md-warning" style={[styles.actionButtonIcon, {fontSize: 20}]}/>
                    </ActionButton.Item>
                  </ActionButton>
                }

          <MessageModal
            setModalVisible={this.setModalVisible}
            modalVisible={this.state.modalVisible}
            text='Are you sure you want to delete all completed reminders?'
            button={true}
            buttonText='Delete All'
            onButtonPress={this.onDeleteConfirmPress}
          />
      </View>
    )
  }
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    backgroundColor: 'rgb(253,253,253)',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 20,
    color: 'white',
  }
})

export default connect(
  (state) => ({
    currencySymbol: state.settings.currencySymbol,
    reminders: state.reminders.reminders
  }),
  (dispatch) => ({
    actions: {
      reminders: bindActionCreators(remindersActions, dispatch)
    }
  })
)(Reminders)
