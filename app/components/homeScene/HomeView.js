import React, { Component } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import ViewPager from '../common/ViewPager'
import Home from './Home'

export default class HomeView extends Component {
  render() {
    return (
      <ViewPager>
        <Home />
      </ViewPager>
    )
  }
}

const styles = StyleSheet.create({

})
