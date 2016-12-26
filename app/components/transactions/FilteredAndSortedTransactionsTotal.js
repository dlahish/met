import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'
import I18n from 'react-native-i18n'
import { getSymbol } from '../../functions/transactionsScene'

export default FilteredAndSortedTransactionsTotal = (props) => {

  function getTotalBalace(transactions, type) {
    let totalBalance = 0
    transactions.forEach((transaction) => {
      if (type === 'income' && transaction.type === 'Income') totalBalance += transaction.amount
      else if (type === 'expense' && transaction.type === 'Expense') totalBalance += Math.abs(transaction.amount)
    })
    return I18n.toCurrency(Math.abs(totalBalance),
      {unit: getSymbol(props.currencySymbol),
      format: "%u %n",
      sign_first: false,
      precision: 0})
  }

  return (
    <View style={{paddingLeft: 10, paddingRight: 10}}>

        <View style={styles.balanceBox}>
            <View style={styles.balanceWrapper}>
              <Text style={styles.balanceText}>
                {getTotalBalace(props.transactions, 'income')}
              </Text>
            </View>
            <View style={[styles.balanceWrapper, styles.expenseWrapper]}>
              <Text style={styles.balanceText}>
                {getTotalBalace(props.transactions, 'expense')}
              </Text>
            </View>
        </View>

        <View style={{paddingLeft: 30, paddingBottom: 2, paddingTop: 2}}>
            <Text>{I18n.p(props.transactions.length, 'transactions')}</Text>
        </View>

    </View>
  )
}

FilteredAndSortedTransactionsTotal.PropTypes = {
  transactions: PropTypes.array
}

const styles = {
  balanceWrapper: {
    flex: 1,
    backgroundColor: '#3CB371',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 2,
    paddingBottom: 2,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  expenseWrapper: {
    backgroundColor: 'rgba(231,76,60,1)',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5
  },
  balanceBox: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 5
  },
  balanceText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600'
  }
}

I18n.fallbacks = true
I18n.translations.en = {
  transactions: {
    one: '1 transaction found',
    other: '{{count}} transactions found',
    zero: 'No transactions found'
  }
}
