// @flow

'use strict'

import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'

class MetHeaderIOS extends Component {
  render() {
    const {title, foreground } = this.props
    const titleColor = foreground === 'dark' ? 'black' : 'white'
    const content = React.Children.count(this.props.children) === 0
      ? <Text style={[styles.titleText, {color: titleColor}]}>
          {title}
        </Text>
      : this.props.children

    return (
      <View style={[styles.header, this.props.style]}>
        <View style={styles.leftItem}>
          <ItemWrapperIOS color={'black'} />
        </View>
        <View
          accessible={true}
          accessibilityLabel={'title'}
          accessibilityTraits="header"
          style={styles.centerItem}>
          {content}
        </View>
        <View style={styles.rightItem}>
          <ItemWrapperIOS color={'red'}/>
        </View>
      </View>
    )
  }
}

class MetHeaderAndroid extends Component {
  render() {
    return (
      <View style={[styles.header, this.props.style]}>

      </View>
    )
  }
}

class ItemWrapperIOS extends Component {
  render() {
    const {item, color} = this.props;
    if (!item) {
      return null;
    }

    let content;
    const {title, icon, layout, onPress} = item;

    if (layout !== 'icon' && title) {
      content = (
        <Text style={[styles.itemText, {color}]}>
          {title.toUpperCase()}
        </Text>
      );
    } else if (icon) {
      content = <Image source={icon} />;
    }

    return (
      <TouchableOpacity
        accessibilityLabel={title}
        accessibilityTraits="button"
        onPress={onPress}
        style={styles.itemWrapper}>
        {content}
      </TouchableOpacity>
    );
  }
}

var STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 25
var HEADER_HEIGHT = Platform.OS === 'ios' ? 44 + STATUS_BAR_HEIGHT : 56 + STATUS_BAR_HEIGHT

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
    paddingTop: STATUS_BAR_HEIGHT,
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftItem: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerItem: {
    flex: 2,
    alignItems: 'center',
  },
  rightItem: {
    flex: 1,
    alignItems: 'flex-end',
  },
})

const Header = Platform.OS === 'ios' ? MetHeaderIOS : MetHeaderAndroid

export default Header
