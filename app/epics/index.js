import { combineEpics } from 'redux-observable'
import settings from './settings'
import connection from './connection'
import { signinAndAuthUser } from './authentication'

export default combineEpics(
  settings,
  connection,
  signinAndAuthUser
)
