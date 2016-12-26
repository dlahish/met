import React, { PropTypes } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Button from 'react-native-button'
import Icon from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux'

export default AddTransactionButtons = (props) => {
  handleButtonPress = (categoryType) => {
    props.setCategoryType(categoryType)
    Actions.newTransaction()
  }

  return (
    <View style={styles.container}>
        <Button
          style={styles.btnText}
  				containerStyle={[styles.btn, styles.bgGreen]}
          onPress={() => this.handleButtonPress('Income')}
        >
            <Icon name='md-add' style={{fontSize: 15, color: '#FFF'}}/>
            Income
        </Button>

        <Button
          style={styles.btnText}
          containerStyle={[styles.btn, styles.bgRed]}
          onPress={() => this.handleButtonPress('Expense')}
        >
            <Icon name='md-add' style={{fontSize: 15, color: '#FFF'}}/>
            Expense
        </Button>
    </View>
  )
}

AddTransactionButtons.propTypes = {
  setCategoryType: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  btnText: {
    fontSize: 15,
    fontWeight: '600',
    color: 'white',
    paddingLeft: 10
	},
	btn: {
    width: 120,
    height: 36,
		borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
	},
  bgGreen: {
    backgroundColor: '#3CB371'
	},
  bgRed: {
    backgroundColor: 'rgba(231,76,60,1)'
	},
})
