import React, { Component, PropTypes } from 'react'
import { View, Text, TouchableOpacity, Animated, Easing } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
const rightArrow = (<Icon name='angle-right' size={24} />)
const leftArrow = (<Icon name='angle-left' size={24} />)

export default class changeMonthArrows extends Component {
  constructor(props) {
    super(props)
    this.state = {
      leftButtonAnim: new Animated.Value(0),
      rightButtonAnim: new Animated.Value(0)
    }
  }

  animSetup(buttonDirection, translateX) {
    return Animated.sequence([
      Animated.timing(this.state[`${buttonDirection}ButtonAnim`], { toValue: translateX, duration: 150 }),
      Animated.timing(this.state[`${buttonDirection}ButtonAnim`], { toValue: 0, duration: 150 })
    ])
  }

  onPress = (buttonDirection) => {
    if (buttonDirection === 'left') {
      this.animSetup(buttonDirection, -10).start()
      this.props.onPressLeft()
    } else {
      this.animSetup(buttonDirection, 10).start()
      this.props.onPressRight()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={{transform: [{translateX: this.state.leftButtonAnim}]}}>
            <TouchableOpacity onPress={() => this.onPress('left')} style={{paddingHorizontal: 5}}>
                {leftArrow}
            </TouchableOpacity>
        </Animated.View>
        <View style={styles.seperator}/>
        <Animated.View style={{transform: [{translateX: this.state.rightButtonAnim}]}}>
            <TouchableOpacity onPress={() => this.onPress('right')} style={{paddingHorizontal: 5}}>
                {rightArrow}
            </TouchableOpacity>
        </Animated.View>
      </View>
    )
  }
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
  },
  seperator: {
    width: 50
  }
}
