import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
const rightArrow = (<Icon name='angle-right' size={24} />)
const leftArrow = (<Icon name='angle-left' size={24} />)
import { Actions } from 'react-native-router-flux'

export default MonthHeader = (props) =>
  <View style={styles.monthHeaderContainer}>
    <View style={{flex: 1, alignItems: 'flex-start', paddingLeft: 10}}>
      <TouchableOpacity onPress={() => props.onSortPress()}>
        <Text style={styles.monthText}>Sort</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.monthHeader}>
      <View style={{paddingRight: 15, justifyContent: 'center'}}>
        <TouchableOpacity onPress={() => props.onPressLeft()} style={{paddingHorizontal: 5}}>
          {leftArrow}
        </TouchableOpacity>
      </View>

      <Text style={styles.monthText}>
        {props.currentMonthName}
      </Text>

      <View style={{paddingLeft: 15, justifyContent: 'center'}}>
        <TouchableOpacity onPress={() => props.onPressRight()} style={{paddingHorizontal: 5}}>
          {rightArrow}
        </TouchableOpacity>
      </View>
    </View>

    <View style={{flex: 1, alignItems: 'flex-end', paddingRight: 10}}>
      <TouchableOpacity onPress={() => props.onExportPress()}>
        <Text style={styles.monthText}>Export</Text>
      </TouchableOpacity>
    </View>
  </View>

const styles = {
  monthHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  monthHeader: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  monthText: {
    alignSelf: 'center',
    fontSize: 17,
  }
}
