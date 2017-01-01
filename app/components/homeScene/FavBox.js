import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  findNodeHandle
} from 'react-native'
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

  getLayoutXY = (event) => {
    var view = this.refs.box
    var handle = findNodeHandle(view);
    RCTUIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
       this.setState({ boxXY: {x: pageX, y: pageY} })
    })
  }

  getAnimStyle = (i) => {
    const xToIncom = this.props.incomeXY.x - this.state.boxXY.x,
          yToIncom = this.props.incomeXY.y - this.state.boxXY.y
    return {
      transform: [
        {translateX: this.state.boxAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, xToIncom]
          })
        },
        {translateY: this.state.boxAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, yToIncom]
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
          style={[styles.box, this.getAnimStyle(1)]}
          onLayout={(e) => this.getLayoutXY(e,1)}>
          <Text style={styles.text}>{this.props.text} - {this.props.info}</Text>
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
    padding: 5
  },
  text: {
    fontSize: 18
  }
})
