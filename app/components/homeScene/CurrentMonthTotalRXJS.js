'use strict'

import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import I18n from 'react-native-i18n'
import ReactNativeI18n from 'react-native-i18n'
import Rx from 'rxjs/Rx'

function getTotalBalace(transactions, type, currencySymbol, getNumberOnly) {
  let totalBalance = 0, income = 0, expense = 0
  // console.log('get total balance', transactions);
  if (transactions) {
    transactions.forEach((transaction) => {
      if (transaction.type === 'Income') income += transaction.amount
      else expense += Math.abs(transaction.amount)
    })
    if (type === 'income') totalBalance = income
    else if (type === 'expense') totalBalance = expense
    else totalBalance = income - expense

    if (getNumberOnly) return totalBalance

    return I18n.toCurrency(totalBalance,
      {unit: getSymbol(currencySymbol),
      format: "%u %n",
      sign_first: false,
      precision: 0})
  }
}

function getSymbol(symbol) {
  if (symbol === 'default') return null
  if (typeof symbol === 'number') return String.fromCharCode(symbol)
  else return symbol
}

export default class CurrentMonthTotal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      income: getTotalBalace(this.props.transactions, 'income', null, true),
      expense: getTotalBalace(this.props.transactions, 'expense', null, true)
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.income !== getTotalBalace(nextProps.transactions, 'income', null, true)) {
      console.log('income is different');
      Rx.Observable.range(this.state.income, getTotalBalace(nextProps.transactions, 'income', null, true) - this.state.income)
        .concatMap(x =>
          Rx.Observable.of(x)
            .delay(1)
        )
        .do(x => console.log('outside delay', x))
        .map(x => this.setState({ income: x }))
        .subscribe()
    } else {
      this.setState({
        income: getTotalBalace(nextProps.transactions, 'income', null, true),
        expense: getTotalBalace(nextProps.transactions, 'expense', null, true)
      })
    }
  }

  render() {
    console.log('this.state', this.state)
    return (
      <View style={styles.container}
        ref={(CurrentMonthTotal) => { this.CurrentMonthTotal = CurrentMonthTotal}}
        onLayout={(e) => this.props.getLayoutXY(e)}>
          <View style={styles.titleWrapper}>
              <Text style={styles.titleText}>Month Balance</Text>
          </View>

          <View style={styles.line}></View>

          <View style={styles.textContainer} ref='view22'>
            <Text style={styles.text}>
              Income
            </Text>
            <View>
              <Text style={styles.text} ref='incomeAmount'>
                {this.state.income}
              </Text>
            </View>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.text}>
              Expense
            </Text>
            <View>
              <Text style={styles.text}>
                {this.state.expense}
              </Text>
            </View>
          </View>

          <View style={[styles.line, {marginHorizontal: 15}]}></View>

          <View style={styles.textContainer}>
            <Text style={styles.text}>
              Total
            </Text>
            <View ref='view33'>
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
