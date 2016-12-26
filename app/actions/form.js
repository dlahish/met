import {
  SET_NEW_CATEGORY,
  CLEAR_FORM,
  SET_CATEGORY_TYPE,
  SET_TRANSACTIONS_SEARCH_VALUE,
  SET_CATEGORY_ICON
} from '../constants'

export function setCategoryIcon(iconName) {
  return {
    type: SET_CATEGORY_ICON,
    iconName
  }
}

export function setNewCategory(category) {
  return {
    type: SET_NEW_CATEGORY,
    category
  }
}

export function clearForm() {
  return {
    type: CLEAR_FORM
  }
}

export function setCategoryType(categoryType) {
  return {
    type: SET_CATEGORY_TYPE,
    categoryType
  }
}

export function setTransactionsSearchValue(value) {
  return {
    type: SET_TRANSACTIONS_SEARCH_VALUE,
    value
  }
}
