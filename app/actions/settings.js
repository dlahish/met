import {
  SET_CURRENCY_SYMBOL,
  SET_CUSTOM_FAVORITES,
  SET_FETCHED_TRANSACTIONS,
  SYNC_DATA,
  CHANGE_SYNC_STATUS } from '../constants'
import { updateCollection } from '../api/data'

export function updateSyncedTransactions(transactions) {
  return {
    type: SET_FETCHED_TRANSACTIONS,
    transactions
  }
}

export function syncData() { return { type: SYNC_DATA } }

export function changeSyncStatus(status) {
  return {
    type: CHANGE_SYNC_STATUS,
    isSyncSuccessful: status
  }
}

export function setCurrancySymbol(symbol) {
  return {
    type: SET_CURRENCY_SYMBOL,
    symbol
  }
}

export function setCustomFavorites() {
  return {
    type: SET_CUSTOM_FAVORITES
  }
}
