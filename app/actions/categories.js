import {
  SAVE_CATEGORY_ICON,
  SET_CATEGORIES,
  DELETE_CATEGORY_ICON,
  SAVE_NEW_CATEGORY,
  FORCED_NEW_PROPS } from './../constants'
import {
  fetchCategories,
  deleteCategory
} from '../api/data'

function getToken(state) {
  return state.account.token
}

function setCategories(categories) {
  return {
    type: SET_CATEGORIES,
    categories
  }
}

export function deleteCategoryIcon(category) {
  return {
    type: DELETE_CATEGORY_ICON,
    category
  }
}

export function forcedNewProps() {
  return {
    type: FORCED_NEW_PROPS
  }
}

export function saveCategoryIcon(category) {
  return {
    type: SAVE_CATEGORY_ICON,
    iconName: category.iconName,
    name: category.name
  }
}

function saveNewCategory(category) {
  const categoryToReeucer = {
    name: category.name,
    type: category.type,
    iconName: category.iconName
  }
  return {
    type: SAVE_NEW_CATEGORY,
    category: categoryToReeucer
  }
}

export function addNewCategory(category) {
  return function(dispatch) {
    dispatch(saveNewCategory(category))
    dispatch(saveCategoryIcon(category))
  }
}

export function getCategories(token) {
  return function(dispatch, getState) {
    const token = getToken(getState())
    fetchCategories(token)
      .then((response) => {
        dispatch(setCategories(response.data.categories))
      })
      .catch((err) => console.log(err))
  }
}

export function removeCategory(category) {
  return function(dispatch, getState) {
    const token = getToken(getState())
    deleteCategory(token, category)
      .then((response) => {
        dispatch(deleteCategoryIcon(category))
        dispatch(getCategories(token))
      })
      .catch((err) => console.log(err))
  }
}
