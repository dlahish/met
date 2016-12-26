import { SET_NEW_REMINDER, SET_CHECKED_REMINDER, CLEAR_COMPLETED_REMINDERS } from './../constants'

export function setNewReminder(reminder) {
  return {
    type: SET_NEW_REMINDER,
    reminder
  }
}

export function setCheckedReminder(reminderId) {
  return {
    type: SET_CHECKED_REMINDER,
    reminderId
  }
}

export function clearCompletedReminders() {
  return {
    type: CLEAR_COMPLETED_REMINDERS
  }
}
