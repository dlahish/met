import { combineReducers } from 'redux'
import account from './account'
import routes from './routes'
import data from './data'
import form from './form'
import settings from './settings'
import storage from './storage'
import reminders from './reminders'
import categories from './categories'
import transactions from './transactions'
import isConnected from './isConnected'

export default combineReducers({
  account,
  routes,
  data,
  form,
  storage,
  settings,
  reminders,
  categories,
  transactions,
  isConnected
})
