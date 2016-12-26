import { REHYDRATE } from 'redux-persist/constants'
import {
  SET_YEAR_TOTAL,
  REMOVE_CURRENT_USER,
  SET_CURRENT_MONTH,
  SET_YEAR_TRANSACTIONS,
  SET_FAVORITE_TRANSACTION,
  DELETE_FAVORITE_TRANSACTION,
  SET_VISIBLE_TRANSACTIONS
} from '../constants'

const initialState = {
  yearTotal: [],
  transactions: {},
  currentMonthName: '',
  currentMonthIndex: null,
  favoriteTransactions: [],
  visibleTransactions: [],
  currentYear: new Date().getFullYear()
}

export default function data (state = initialState, action) {
  switch (action.type) {
    case SET_YEAR_TOTAL:
      return { ...state, yearTotal: action.data }
    case REMOVE_CURRENT_USER:
      return initialState
    case SET_CURRENT_MONTH:
      return { ...state,
        currentMonthName: action.currentMonthName,
        currentMonthIndex: action.currentMonthIndex,
        currentYear: action.currentYear }
    case SET_YEAR_TRANSACTIONS:
      const nextTransactions = { ...state.transactions, [action.year]: action.data }
      return { ...state, transactions: nextTransactions }
    case SET_FAVORITE_TRANSACTION:
      nextFavoriteTransactions = state.favoriteTransactions.concat(action.transaction)
      return { ...state, favoriteTransactions: nextFavoriteTransactions }
    case DELETE_FAVORITE_TRANSACTION:
      nextFavoriteTransactions = state.favoriteTransactions.filter((transaction) =>
          transaction.id !== action.transaction.id)
      return { ...state, favoriteTransactions: nextFavoriteTransactions }
    case SET_VISIBLE_TRANSACTIONS:
      return { ...state, visibleTransactions: action.transactions }
    case REHYDRATE:
      var incoming = action.payload.myReducer
      if (incoming) return {...state, ...incoming, specialKey: processSpecial(incoming.specialKey)}
      return state
    default:
      return state
  }
}
