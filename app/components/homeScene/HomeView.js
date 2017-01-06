import React, { Component } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { ViewPager } from '../common/ViewPager'
import { Home } from './Home'

export default class HomeView extends Component {
  render() {
    return (
      // <View style={{flex: 1}}>
        <Home />
      // </View>
    )
  }
}

const styles = StyleSheet.create({

})
