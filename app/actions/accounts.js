import { REMOVE_CURRENT_USER, SET_TOKEN, SET_AUTH_ERROR, SIGN_IN } from './../constants'
import { purgeStoredState } from 'redux-persist'
import { AsyncStorage } from 'react-native'
import { getCurrencySymbol } from './settings'
import {
  currentUser,
  signin,
  signup,
  setAuth,
  revokeAuth
} from './../api/accounts'

import {
  getTransactions,
  getYearTotal,
  getFavoriteTransactions
} from './data'

import { getCategories } from './categories'

export function loadingActions(token) {
  return function(dispatch) {
    let currentYear = new Date().getFullYear()
    dispatch(setToken(token))
    dispatch(getTransactions(currentYear, token))
    dispatch(getCategories(token))
  }
}

// function loadingActions(dispatch, token) {
//   let currentYear = new Date().getFullYear()
//   dispatch(setToken(token))
//   dispatch(getTransactions(currentYear, token))
//   dispatch(getCategories(token))
// }

function removeCurrentUser () {
  return {
    type: REMOVE_CURRENT_USER
  }
}

function setToken(token, isAuthed = true) {
  return {
    type: SET_TOKEN,
    token,
    isAuthed
  }
}

export function setAuthError(message) {
  return {
    type: SET_AUTH_ERROR,
    message
  }
}

export function checkIfAuthed() {
  return function(dispatch, getState) {
    const state = getState()
  }
}

export function signinAndAuthUser(credentials) {
  return {
    type: SIGN_IN,
    credentials
  }
}

// export function signinAndAuthUser (credentials) {
//   return function (dispatch) {
//     return signin(credentials)
//       .then((res) => {
//         console.log('response ------', res)
//         if (res.data.message) {
//           dispatch(setAuthError(res.data.message))
//         } else {
//           loadingActions(dispatch, res.data.token)
//         }
//       })
//       .catch((err) => console.warn(err))
//   }
// }

export function signupAndAuthUser (credentials) {
  return function (dispatch) {
    return signup(credentials)
      .then((res) => {
        if (res.data.message) {
          dispatch(setAuthError(res.data.message))
        } else {
          loadingActions(dispatch, res.data.token)
        }
      })
      .catch((err) => {
        dispatch(setAuthError(err.response.data.error))
        console.log(err)
      })
  }
}

export function logoutAndUnauthUser () {
  return function (dispatch) {
    dispatch(setToken('', false))
    purgeStoredState({storage: AsyncStorage}).then(() => {
      console.log('purge of someReducer completed')
    }).catch(() => {
      console.log('purge of someReducer failed')
    })
  }
}
