import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class MetText extends Component {
  render() {
    return (
      <View>
        <Text style={[styles.text, this.props.styles]}>
          {this.props.children}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Gill Sans',
    fontSize: 16
  }
})

//Optima, Menlo
