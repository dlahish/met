import { CHANGE_CONNECTION_STATUS } from '../constants'

export default function isConnected(state = false, action) {
  if (action.type === CHANGE_CONNECTION_STATUS) {
    if (action.isConnected === undefined)
      return false
    
    return state = action.isConnected
  }

  return state
}
