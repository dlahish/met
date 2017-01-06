import React, { Component } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import ViewPagerContent from './ViewPagerContent'
import { Home } from '../../components'

export default class ViewPager extends Component {
  constructor() {
    super()
    this.state = {
      scrollAnim: new Animated.Value(0)
    }
  }

  handleScroll = (e) => {
    this.state.scrollAnim.setValue(e.nativeEvent.contentOffset.y)
  }

  render() {
    const transform = {
      // transform: [{
      //   opacity: this.state.scrollAnim.interpolate({
      //     inputRange: [0, 100],
      //     outputRange: [1, 0]
      //   })
      // }]
      opacity: this.state.scrollAnim.interpolate({
        inputRange: [-100, 0, 100],
        outputRange: [0, 1, 0]
      })
    }

    return (
      <View style={{flex: 1}}>
        <Animated.View style={[styles.headers, transform]}>

        </Animated.View>
        <ViewPagerContent
          onScroll={this.handleScroll}
          style={styles.content}>
          {this.props.children}
        </ViewPagerContent>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  headers: {
    height: 56,
    backgroundColor: 'blue'
  },
  content: {
    flex: 1,
  }
})
