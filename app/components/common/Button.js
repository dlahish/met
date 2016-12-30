import React, { Component } from 'react'
import { TouchableHighlight, Text, StyleSheet, View } from 'react-native'

export default class Button extends Component {
  state = {
    active: false,
  }

  _onHighlight = () => {
    this.setState({active: true});
  };

  _onUnhighlight = () => {
    this.setState({active: false});
  };

  render() {
    var colorStyle = {
      color: this.state.active ? '#fff' : '#000',
    };
    return (
      <TouchableHighlight
        onHideUnderlay={this._onUnhighlight}
        onPress={this.props.onPress}
        onShowUnderlay={this._onHighlight}
        style={[styles.button, this.props.style]}
        underlayColor="#a9d9d4">
          {/* <View style={[styles.buttonText, colorStyle]}>{this.props.children}</View> */}
          <View style={styles.buttonWrapper}>
            {typeof this.props.children === 'string'
              ? <Text style={styles.buttonText}>{this.props.children}</Text>
              :  this.props.children}
          </View>
      </TouchableHighlight>
    );
  }
}

var styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    flex: 1,
    height: 44,
    alignSelf: 'stretch',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18
  }
})
