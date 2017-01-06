import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'

export default class ViewPagerContent extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <ScrollView
        onScroll={this.props.handleScroll}
        scrollEventThrottle={100}
        style={styles.content}>
        {/* {this.props.children} */}
        <View><Text>Hello Content</Text></View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({

})
