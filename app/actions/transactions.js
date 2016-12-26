import {
  SAVE_NEW_TRANSACTION,
  DELETE_TRANSACTION,
  UPDATE_TRANSACTION
} from './../constants'

import {
  setVisibleTransactions,
  getVisibleTransactions
} from './data'

function saveNewTransaction(transaction) {
  let transactionToReducer = {
    date: new Date(transaction.date).toISOString(),
    amount: parseInt(transaction.amount),
    category: transaction.category,
    notes: transaction.notes,
    type: transaction.type
  }
  return {
    type: SAVE_NEW_TRANSACTION,
    transaction: transactionToReducer
  }
}

function deleteTransaction(transaction) {
  return {
    type: DELETE_TRANSACTION,
    transaction
  }
}

export function addNewTransaction(transaction) {
  return function(dispatch, getState) {
    const state = getState()
    dispatch(saveNewTransaction(transaction))
  }
}

export function removeTransaction(transaction) {
  return function(dispatch, getState) {
    const state = getState()
    dispatch(deleteTransaction(transaction))
  }
}

export function updateTransaction(transaction, currentMonthIndex) {
  let _id, id
  if (transaction.id !== undefined) id = transaction.id
  else _id = transaction._id
  let transactionToReducer = {
    _id,
    id,
    date: new Date(transaction.date).toISOString(),
    amount: parseInt(transaction.amount),
    category: transaction.category,
    notes: transaction.notes,
    type: transaction.type
  }
  return {
    type: UPDATE_TRANSACTION,
    transaction: transactionToReducer
  }
}
