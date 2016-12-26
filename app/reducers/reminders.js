import { SET_NEW_REMINDER, SET_CHECKED_REMINDER, CLEAR_COMPLETED_REMINDERS } from '../constants'
import {REHYDRATE} from 'redux-persist/constants'
const initialState = {
  idIndex: 0,
  reminders: []
}

export default function accounts (state = initialState, action) {
  let nextReminder, nextReminders
  switch (action.type) {
    case SET_NEW_REMINDER:
      nextReminder = action.reminder
      nextReminder.id = state.idIndex + 1
      nextReminders = state.reminders.concat(nextReminder)
      return { ...state, reminders: nextReminders, idIndex: state.idIndex + 1 }
    case SET_CHECKED_REMINDER:
      nextReminders = state.reminders.map((reminder) => {
        if (reminder.id === action.reminderId) {
          let completionDate = new Date().toISOString()
          if (reminder.completed) completionDate = null
          return reminder = { ...reminder, completed: !reminder.completed, completionDate }
        } else return reminder
      })
      return { ...state, reminders: nextReminders }
    case CLEAR_COMPLETED_REMINDERS:
      nextReminders = state.reminders.filter((reminder) => !reminder.completed)
      return { ...state, reminders: nextReminders }
    case REHYDRATE:
      var incoming = action.payload.myReducer
      if (incoming) return {...state, ...incoming, specialKey: processSpecial(incoming.specialKey)}
      return state
    default:
      return state
  }
}
