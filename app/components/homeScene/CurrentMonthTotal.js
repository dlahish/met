'use strict'

import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import I18n from 'react-native-i18n'
import ReactNativeI18n from 'react-native-i18n'

function getTotalBalace(transactions, type, currencySymbol) {
  let totalBalance = 0, income = 0, expense = 0
  transactions.forEach((transaction) => {
    if (transaction.type === 'Income') income += transaction.amount
    else expense += Math.abs(transaction.amount)
  })
  if (type === 'income') totalBalance = income
  else if (type === 'expense') totalBalance = expense
  else totalBalance = income - expense
  return I18n.toCurrency(totalBalance,
    {unit: getSymbol(currencySymbol),
    format: "%u %n",
    sign_first: false,
    precision: 0})
}

function getSymbol(symbol) {
  if (symbol === 'default') return null
  if (typeof symbol === 'number') return String.fromCharCode(symbol)
  else return symbol
}

export default class CurrentMonthTotal extends Component {
  render() {
    return (
      <View style={styles.container}>
          <View style={styles.titleWrapper}>
              <Text style={styles.titleText}>Month Balance</Text>
          </View>

          <View style={styles.line}></View>

          <View style={styles.textContainer}>
            <Text style={styles.text}>
              Income
            </Text>
            <View>
              <Text style={styles.text}>
                {getTotalBalace(this.props.transactions, 'income', this.props.currencySymbol)}
              </Text>
            </View>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.text}>
              Expense
            </Text>
            <View>
              <Text style={styles.text}>
                {getTotalBalace(this.props.transactions, 'expense', this.props.currencySymbol)}
              </Text>
            </View>
          </View>

          <View style={[styles.line, {marginHorizontal: 15}]}></View>

          <View style={styles.textContainer}>
            <Text style={styles.text}>
              Total
            </Text>
            <View>
              <Text style={styles.text}>
                {getTotalBalace(this.props.transactions, 'balance', this.props.currencySymbol)}
              </Text>
            </View>
          </View>

      </View>
    )
  }
}

CurrentMonthTotal.propTypes = {
  currencySymbol: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  transactions: PropTypes.array
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    backgroundColor: '#eaeaea',
  },
  titleWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  titleText: {
    color: 'black',
    fontSize: 15,
    fontWeight: '400'
  },
  line: {
    height: 1,
    backgroundColor: '#b3b3b3'
  },
  textContainer: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between'
  },
  text: {
    color: 'black',
    fontSize: 17,
    fontWeight: '400'
  }
})

I18n.fallbacks = true

I18n.translations = {
  en: {
    greeting: 'Hi!'
  }
  // [deviceLocale]: {
  //   number: {
  //     currency: {
  //       format: {
  //         format: "%u %n",
  //         unit: "USD",
  //         delimiter: ".",
  //         separator: ",",
  //         precision: 2
  //       }
  //     }
  //   }
  // }
}
