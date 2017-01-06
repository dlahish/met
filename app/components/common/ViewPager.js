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
    console.log('nativeEvent contentOffset', e.nativeEvent.contentOffset)
    // this.state.scrollValue.setValue(e.nativeEvent)
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.headers}>

        </View>
        <ViewPagerContent
          onScroll={this.handleScroll}
          style={styles.content}>
          {/* {this.props.children} */}
          <View><Text>Hello Content</Text></View>
        </ViewPagerContent>
      </View>
    )
  }
}

const styles = StyleSheet.create({

})
