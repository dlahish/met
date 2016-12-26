import React from 'react'
import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  li: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomColor: '#c8c7cc',
    borderBottomWidth: 0.5,
    paddingTop: 15,
    paddingBottom: 15,
  },
  liContainer: {
    backgroundColor: '#fff',
    paddingLeft: 0,
  },
  liIndent: {
    flex: 1,
  },
  liText: {
    color: '#333',
    fontSize: 17,
    fontWeight: '400',
    marginBottom: -3.5,
    marginTop: -3.5,
  },
  icon: {
    paddingRight: 10,
    color: '#333',
    fontSize: 17,
    fontWeight: '400'
  }
})

module.exports = styles
