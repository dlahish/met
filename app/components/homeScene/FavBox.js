import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity
} from 'react-native'

export default class FavBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      boxAnim: new Animated.Value(0),
      boxXY1: {x: null, y: null},
      boxXY2: {x: null, y: null}
    }
  }

  getLayoutXY = (event, i) => {
    const {x, y, width, height} = event.nativeEvent.layout
    this.setState({ ['boxXY' + i]: {x, y} })
  }

  getAnimStyle = () => {
    // console.log('this.state.boxXY1.x', this.state.boxXY.x)
    // console.log('this.state.1boxXY1.y', this.state.boxXY.y)
    // console.log('this.state.boxXY2.x', this.state.boxXY.x)
    // console.log('this.state.boxXY2.y', this.state.boxXY.y)
    // console.log('this.props.incomeXY.x', this.props.incomeXY.x)
    // console.log('this.props.incomeXY.y', this.props.incomeXY.y)
    const xToIncom = this.props.incomeXY.x - this.state.boxXY1.x,
          yToIncom = this.props.incomeXY.y - this.state.boxXY1.y - 200
    return {
      transform: [{
        translateX: this.state.boxAnim.interpolate({
          inputRange: [0,1],
          outputRange: [0, xToIncom]
        })
      },
      {translateY: this.state.boxAnim.interpolate({
        inputRange: [0,1],
        outputRange: [0, yToIncom]
      })},
      {scale: this.state.boxAnim.interpolate({
        inputRange: [0,1],
        outputRange: [1, .1]
      })}]
    }
  }

  onBoxPress = () => {
    console.log('onBoxpress pressed ----')
    Animated.timing(this.state.boxAnim, { toValue: 1, duration: 1000 }).start()
  }

  render() {
    console.log('favbox. this.state', this.state)
    return(
      <TouchableOpacity onPress={() => this.onBoxPress()}>
        <Animated.View
          style={[styles.box, this.getAnimStyle()]}
          onLayout={(e) => this.getLayoutXY(e,1)}>
          <Text style={styles.text}>Hello FavBox</Text>
        </Animated.View>
        <Animated.View
          style={[styles.box, this.getAnimStyle()]}
          onLayout={(e) => this.getLayoutXY(e,2)}>
          <Text style={styles.text}>Hello FavBox</Text>
        </Animated.View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  box: {
    // position: 'absolute',
    height: 50,
    width: 50,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'gray'
  },
  text: {
    fontSize: 15
  }
})
