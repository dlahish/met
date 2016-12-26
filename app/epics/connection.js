import Rx from 'rxjs/Rx'
import { Observable } from 'rxjs/Observable'
import { CHANGE_CONNECTION_STATUS, SYNC_DATA } from '../constants'
import { getTransactions } from '../actions/data'

export default function connection(action$, store) {
  return action$.ofType(CHANGE_CONNECTION_STATUS)
    .filter(action => action.isConnected === true && !store.getState().transactions.synced)
    .mapTo({ type: SYNC_DATA })
}
