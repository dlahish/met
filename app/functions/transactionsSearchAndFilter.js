export function searchTransactions(transactions, searchValue) {
  if (searchValue.length === 0) return transactions

  let filteredTransactions = transactions.filter((transaction) => {
    if (transaction.category.slice(0, searchValue.length) === searchValue) return true
    if (transaction.notes) {
      if (transaction.notes.slice(0, searchValue.length) === searchValue) return true
    }
    let transactionAmount = Math.abs(transaction.amount).toString()
    if (transactionAmount === searchValue) return true
  })

  return filteredTransactions
}

export function sortTransactions(transactions, filter, direction) {

  function compare(a,b) {
    if (direction) {
      if (a[filter] < b[filter])
        return -1;
      if (a[filter] > b[filter])
        return 1;
      return 0;
    } else {
      if (a[filter] > b[filter])
        return -1;
      if (a[filter] < b[filter])
        return 1;
      return 0;
    }
  }

  if (filter.length === 0) return transactions
  return transactions.sort((a,b) => compare(a,b))
}
