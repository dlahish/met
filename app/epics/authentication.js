import Rx from 'rxjs/Rx'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/dom/ajax'
import { SIGN_IN } from '../constants'
import { setAuthError, loadingActions } from '../actions/accounts'

function signinAndAuthUser(action$, store) {
  return action$.ofType(SIGN_IN)
    .flatMap((action$) => {
      const { email, password } = action$.credentials
      return Observable.ajax({
        url: 'https://spendingapi2.herokuapp.com/signin',
        method: 'POST',
        responseType: 'json',
        body: { email, password }
      })
      .map(res => res.response)
      .map(res => {
        if (res.message) { return setAuthError(res.message) }
        return loadingActions(res.token)
      })
      .catch(x => Observable.of('Can\'t connect to server')
        .map(setAuthError)
      )
    })
}

module.exports = {
  signinAndAuthUser
}
