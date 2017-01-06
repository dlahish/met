import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'

export default class ViewPagerContent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ScrollView
        onScroll={(e) => this.props.onScroll(e)}
        scrollEventThrottle={100}
        style={styles.content}>
        {this.props.children}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1
  }
})
