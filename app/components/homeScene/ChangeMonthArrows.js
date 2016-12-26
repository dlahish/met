import React, { PropTypes } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
const rightArrow = (<Icon name='angle-right' size={22} />)
const leftArrow = (<Icon name='angle-left' size={22} />)

export default changeMonthArrows = (props) => {
  return (
    <View style={styles.container}>
        <View style={{paddingRight: 50}}>
            <TouchableOpacity onPress={() => props.onPressLeft()} style={{paddingHorizontal: 5}}>
                {leftArrow}
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity onPress={() => props.onPressRight()} style={{paddingHorizontal: 5}}>
                {rightArrow}
            </TouchableOpacity>
        </View>
    </View>
  )
}

changeMonthArrows.propTypes = {
  onPressLeft: PropTypes.func.isRequired,
  onPressRight: PropTypes.func.isRequired
}

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
}
