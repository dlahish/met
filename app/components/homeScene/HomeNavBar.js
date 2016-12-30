import React, { Component, PropTypes } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native'
import {addBorder} from '../../components'

export default class HomeNavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentMonthAnim: new Animated.Value(Dimensions.get('window').width / 2),
      nextMonthAnim: new Animated.Value(this.width)
    }
    this.width = Dimensions.get('window').width
    this.months = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"]
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentMonthIndex > nextProps.currentMonthIndex) {
      this.state.currentMonthAnim.setValue(this.width / 2)
      this.state.nextMonthAnim.setValue(this.width * -2)
      Animated.parallel([
        Animated.timing(this.state.currentMonthAnim, { toValue: this.width * 2 }),
        Animated.timing(this.state.nextMonthAnim, { toValue: (this.width * -1) / 2 })
      ]).start()
    } else {
      this.state.currentMonthAnim.setValue(this.width / 2)
      this.state.nextMonthAnim.setValue(this.width)
      Animated.parallel([
        Animated.timing(this.state.currentMonthAnim, { toValue: this.width * -1 }),
        Animated.timing(this.state.nextMonthAnim, { toValue: (this.width * -1) / 2 })
      ]).start()
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.titleWrapper, {width: this.width, transform: [{translateX: this.state.currentMonthAnim}]}]}>
          <Text style={[styles.title]}>{this.months[this.props.currentMonthIndex]}</Text>
        </Animated.View>
        <Animated.View style={[styles.titleWrapper, {width: this.width, transform: [{translateX: this.state.nextMonthAnim}]}]}>
          <Text style={[styles.title]}>{this.months[this.props.currentMonthIndex]}</Text>
        </Animated.View>
      </View>
    )
  }
}

HomeNavBar.propTypes = {
  title: PropTypes.string.isRequired,
  currentMonthIndex: PropTypes.number.isRequired
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 64,
    backgroundColor: 'rgb(0, 153, 204)',
    borderBottomWidth: 0.5,
    borderBottomColor: '#828287',
    justifyContent: 'center'
  },
  titleWrapper: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    position: 'relative',
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
    fontWeight: '500',
    alignSelf: 'center'
  }
})
