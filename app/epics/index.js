import { combineEpics } from 'redux-observable'
import settings from './settings'
import connection from './connection'

export default combineEpics(
  settings,
  connection
)
