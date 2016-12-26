import { REHYDRATE } from 'redux-persist/constants'
import {
  SET_NEW_CATEGORY,
  CLEAR_FORM,
  SET_CATEGORY_TYPE,
  SET_TRANSACTIONS_SEARCH_VALUE,
  SET_CATEGORY_ICON
} from '../constants'

const initialState = {
  category: '',
  categoryType: 'Income',
  transactionsSearchValue: '',
  categoryIconName: ''
}

export default function accounts (state = initialState, action) {
  switch (action.type) {
    case SET_NEW_CATEGORY:
      return { ...state, category: action.category }
    case SET_CATEGORY_TYPE:
      return { ...state, categoryType: action.categoryType }
    case SET_TRANSACTIONS_SEARCH_VALUE:
      return { ...state, transactionsSearchValue: action.value }
    case SET_CATEGORY_ICON:
      return { ...state, categoryIconName: action.iconName }
    case CLEAR_FORM:
      return initialState
    case REHYDRATE:
      var incoming = action.payload.myReducer
      if (incoming) return {initialState, specialKey: processSpecial(incoming.specialKey)}
      return initialState
    default:
      return state
  }
}
