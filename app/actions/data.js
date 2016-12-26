import {
  SET_TOTAL_BALANCE,
  SET_YEAR_TOTAL,
  SET_CURRENT_MONTH,
  SET_YEAR_TRANSACTIONS,
  SET_FAVORITE_TRANSACTION,
  DELETE_FAVORITE_TRANSACTION,
  SET_VISIBLE_TRANSACTIONS,
  SET_FETCHED_TRANSACTIONS
} from './../constants'

import { addNewTransaction } from './transactions'

import {
  fetchYearTotal,
  saveNewTransaction,
  fetchTransactions,
  deleteTransaction,
  saveFavoriteTransaction,
  deleteFavoriteTransaction,
  sendUpdateTransaction
} from '../api/data'

export function setVisibleTransactions(transactions) {
  return {
    type: SET_VISIBLE_TRANSACTIONS,
    transactions
  }
}

export function setMonth(type, currentMonthIndex, yearTotal, transactions) {
  return function(dispatch) {
    if (type === 'next' && currentMonthIndex === 11) { return }
    if (type === 'previous' && currentMonthIndex === 0) { return }
    if (type === 'next' && currentMonthIndex < 11) {
      dispatch(setCurrentMonth(currentMonthIndex + 1))
      dispatch(getVisibleTransactions(transactions, currentMonthIndex + 1))
    } else if (currentMonthIndex > 0) {
      dispatch(setCurrentMonth(currentMonthIndex - 1))
      dispatch(getVisibleTransactions(transactions, currentMonthIndex - 1))
    }
  }
}
export function getVisibleTransactions(transactions, currentMonthIndex) {
  return function(dispatch) {
    let visibleTransactions = []
    if (transactions) {
      const filteredTransactions = transactions.filter((transaction) => {
        const transactionMonth = new Date(transaction.date).getMonth()
        return transactionMonth === currentMonthIndex
      })
      visibleTransactions = filteredTransactions.sort((a,b) => {
        a.date < b.date ? 1 : a.date > b.date ? -1 : 0
      })
    }
    dispatch((setVisibleTransactions(visibleTransactions)))
  }
}

function setSyncedTransactions(transactions) {
  if (!transactions) return
  return {
    type: SET_FETCHED_TRANSACTIONS,
    transactions
  }
}

export function getTransactions(year, token, currentMonthIndex = new Date().getMonth()) {
  return function(dispatch) {
    fetchTransactions(token, year)
      .then((response) => {
        dispatch(setSyncedTransactions(response.data.data))
      })
      .catch((err) => console.log(err))

  }
}

export function setCurrentMonth(monthIndex = new Date().getMonth()) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"]
  const currentYear = new Date().getFullYear()
  return {
    type: SET_CURRENT_MONTH,
    currentMonthName: monthNames[monthIndex],
    currentMonthIndex: monthIndex,
    currentYear
  }
}

function setFavoriteTransaction(transaction, favoriteTransactionsId) {
  transaction.id = favoriteTransactionsId
  return {
    type: SET_FAVORITE_TRANSACTION,
    transaction
  }
}

export function addNewFavoriteTransaction(favTransaction) {
  return function(dispatch) {
    const date = new Date()
    favTransaction = { ...favTransaction, date: date }
    dispatch(addNewTransaction(favTransaction))
  }
}

export function removeFavoriteTransaction(transaction) {
  return {
    type: DELETE_FAVORITE_TRANSACTION,
    transaction
  }
}

export function addFavoriteTransaction(transaction) {
  return function(dispatch, getState) {
    const state = getState()
    favoriteTransactionsId = state.data.favoriteTransactions.length + 1
    dispatch(setFavoriteTransaction(transaction, favoriteTransactionsId))
  }
}
