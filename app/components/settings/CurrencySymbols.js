import React, { PropTypes, Component } from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableHighlight } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { ListItem } from '../../components'

symbols = ['default',36,8364,8362,163,'CHF']

function getSymbol(symbol) {
  if (typeof symbol === 'number') return String.fromCharCode(symbol)
  else return symbol
}

export default CurrencySymbols = (props) => {
  onSymbolPress = (symbol) => {
    props.setCurrancySymbol(symbol)
    Actions.pop()
  }

  return (
    <ScrollView style={styles.container}>
      {symbols.map((symbol,i) =>
        <View style={styles.liContainer} key={i}>
          <View style={styles.li}>
            <TouchableHighlight onPress={() => this.onSymbolPress(symbol)}>
              <Text style={styles.liText}>{getSymbol(symbol)}</Text>
            </TouchableHighlight>
          </View>
        </View>
      )}
    </ScrollView>
  )
}

const styles = {
  container: {
    marginTop: 64,
    backgroundColor: '#EFEFF4',
    paddingTop: 15
  },
  li: {
    borderBottomColor: '#c8c7cc',
    borderBottomWidth: 0.5,
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
  },
  liContainer: {
    backgroundColor: '#fff',
    flex: 1,
    paddingLeft: 0,
    paddingLeft: 15
  },
  liText: {
    color: '#333',
    fontSize: 17,
    fontWeight: '400',
    marginBottom: -3.5,
    marginTop: -3.5,
  }
}
