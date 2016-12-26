export function setAmountColor(type) {
  if (type === 'Income' || type === 'lent') return {color: 'green'}
  else return {color: 'red'}
}

export function setMainText(transaction) {
  if (transaction.notes) return transaction.notes
  else return transaction.category
}

export function getSymbol(symbol) {
  if (symbol === 'default') return null
  if (typeof symbol === 'number') return String.fromCharCode(symbol)
  else return symbol
}
