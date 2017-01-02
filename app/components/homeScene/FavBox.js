import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  findNodeHandle
} from 'react-native'
import { MetText } from '../../components'
var RCTUIManager = require('NativeModules').UIManager

export default class FavBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      boxAnim: new Animated.Value(0),
      boxScale: new Animated.Value(0),
      boxXY: {x: null, y: null}
    }
  }

  componentWillReceiveProps(nextProps) {
    var handle = findNodeHandle(this.refs.box);
    RCTUIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
      if (this.state.boxXY.x !== pageX || this.state.boxXY.y !== pageY) {
        if (this.state.width === width) {
          this.setState({ boxXY: {x: pageX, y: pageY} })
        }
      }
    })
  }

  getLayoutXY = (event) => {
    var handle = findNodeHandle(this.refs.box);
    RCTUIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
      this.setState({ boxXY: {x: pageX, y: pageY}, width })
    })
  }

  getAnimStyle = (amount) => {
    let targetX, targetY
    if (amount > 0) {
      targetX = this.props.incomeXY.x - this.state.boxXY.x
      targetY = this.props.incomeXY.y - this.state.boxXY.y
    } else {
      targetX = this.props.expenseXY.x - this.state.boxXY.x
      targetY = this.props.expenseXY.y - this.state.boxXY.y
    }
    return {
      transform: [
        {translateX: this.state.boxAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, targetX]
          })
        },
        {translateY: this.state.boxAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, targetY]
        })},
        {scale: this.state.boxScale.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0]
        })}
      ]
    }
  }

  onBoxPress = () => {
    Animated.parallel([
      Animated.timing(this.state.boxAnim, { toValue: 1, duration: 600 }),
      Animated.timing(this.state.boxScale, { toValue: 1, duration: 600 })
    ]).start(() => {
      this.props.onBoxPress()
      this.state.boxAnim.setValue(0)
      Animated.spring(this.state.boxScale, {
        toValue: 0,
        friction: 3
      }).start()
    })
  }

  render() {
    return(
      <TouchableOpacity onPress={() => this.onBoxPress()}>
        <Animated.View
          ref='box'
          style={[styles.box, {backgroundColor: this.props.color}, this.getAnimStyle(this.props.info)]}
          onLayout={(e) => this.getLayoutXY(e,1)}>
          <MetText styles={styles.text}>{this.props.text} {this.props.info}</MetText>
        </Animated.View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'pink',
    borderRadius: 3,
    padding: 5,
    margin: 5
  },
  text: {
    fontSize: 18
  }
})
