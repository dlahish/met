import React, { Component, PropTypes } from 'react'
import { View, Text, TouchableHighlight, StyleSheet, ScrollView } from 'react-native'
import { ListItem } from '../../components'
import { Actions } from 'react-native-router-flux'
import FavBox from './FavBox'

function renderFavoriteTransactions(favTransaction, i, onAddNewFavortieTransaction,
favTransactionsLength, customFavorites, incomeXY, expenseXY) {
  onItemPress = (favTransaction) => {
    if (customFavorites) {
      let customFavTransaction = favTransaction
      customFavTransaction.date = new Date()
      Actions.newTransaction({editMode: true, transaction: customFavTransaction})
    } else {
      onAddNewFavortieTransaction(favTransaction)
    }
  }
  const favTransactionText = getFavortieTransactionText(favTransaction),
        iconColor = getAddButtonColor(favTransaction)
  return (
      <View key={i}>
          {/* <ListItem
            icon='plus'
            iconStyle={{color: iconColor}}
            text={favTransactionText}
            info={favTransaction.amount}
            styleInfo={{color: iconColor}}
            underlayColor="#a9d9d4"
            onPress={() => onItemPress(favTransaction)}
          /> */}
          <FavBox
            incomeXY={incomeXY}
            expenseXY={expenseXY}
            text={favTransactionText}
            info={favTransaction.amount}
            color={iconColor}
            onBoxPress={() => onItemPress(favTransaction)}
          />

          {/* {favTransactionsLength < 5 && i === favTransactionsLength-1 ?
            <ListItem
              icon='plus'
              iconStyle={{opacity: 0.6}}
              text='Add new preset transaction'
              styleText={{opacity: 0.6}}
              onPress={() => Actions.presetTransactions()}
            /> : null} */}
      </View>
  )
}

function getFavortieTransactionText(favTransaction) {
  if (!favTransaction.notes) return favTransaction.category
  else return `${favTransaction.category}, ${favTransaction.notes}`
}

function getAddButtonColor(favTransaction) {
  if (favTransaction.amount > 0) return '#2ecc71'
  else return '#ff4d4d'
}

export default DisplayFavoriteTransactions = (props) => {
  const p = props
  return (
    <View style={styles.favBoxes}>
      {p.favoriteTransactions.length > 0
        ? p.favoriteTransactions.map((transaction, i) => {
            return renderFavoriteTransactions(transaction,
              i, p.onAddNewFavortieTransaction, p.favoriteTransactions.length, p.customFavorites,
              p.incomeXY, p.expenseXY)
          })
        : <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.messageBox}>
              <Text style={{fontSize: 15}}>Go to setting to add favorite transactions</Text>
            </View>
          </View>}
    </View>
  )
}

DisplayFavoriteTransactions.propTypes = {
  favoriteTransactions: PropTypes.array,
  customFavorites: PropTypes.bool.isRequired,
  onAddNewFavortieTransaction: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  messageBox: {
    backgroundColor: '#eaeaea',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: 'black',
    padding: 10
  },
  favBoxes: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  }
})
