import React, { Component, PropTypes } from 'react'
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native'

function isSelected(selected, type) {
  if (type === 'button') {
    if (selected) return styles.selectedButton
    else return styles.defaultButton
  } else {
    if (selected) return styles.selectedButtonText
    else return styles.defaultButtonText
  }
}

export default CategorySelector = (props) => {
  const {
    incomeSelected,
    expenseSelected,
    onTypeChange
  } = props

  return (
    <View style={[styles.container]}>
      <TouchableHighlight
        style={[styles.categoryTypeButton, styles.leftButton, isSelected(incomeSelected, 'button')]}
        onPress={()=> onTypeChange('Income')}
      >
        <Text style={isSelected(incomeSelected, 'text')}>Income</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={[styles.categoryTypeButton, styles.rightButton, isSelected(expenseSelected, 'button')]}
        onPress={() => onTypeChange('Expense')}
      >
        <Text style={isSelected(expenseSelected, 'text')}>Expense</Text>
      </TouchableHighlight>
    </View>
  )
}

const styles = {
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#eaeaea',
  },
  categoryTypeButton: {
    borderColor: '#c8c7cc',
    borderWidth: 1.5,
    flex:1,
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5
  },
  defaultButton: {
    backgroundColor: '#eaeaea'
  },
  defaultButtonText: {
    fontSize: 15,
    fontWeight: '500'
  },
  selectedButton: {
    backgroundColor: 'rgb(0, 153, 204)'
  },
  selectedButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#FFF'
  },
  leftButton: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderRightWidth: 0
  },
  rightButton: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderLeftWidth: 0
  }
}
