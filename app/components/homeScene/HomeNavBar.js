import React, { Component, PropTypes } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native'
import {addBorder} from '../../components'

export default class HomeNavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentMonthAnim: new Animated.Value(0),
      nextMonthAnim: new Animated.Value(100)
    }
    this.width = Dimensions.get('window').width
    this.months = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"]
  }

  componentWillReceiveProps(nextProps) {
    this.state.currentMonthAnim.setValue(0)
    this.state.nextMonthAnim.setValue(100)
    Animated.parallel([
      Animated.timing(this.state.currentMonthAnim, { toValue: -250 }),
      Animated.timing(this.state.nextMonthAnim, { toValue: 0 })
    ]).start()
  }

  render() {
    const nextMonth = this.props.currentMonthIndex <= 11 ? this.months[this.props.currentMonthIndex +1] : null
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.titleWrapper, {width: this.width, transform: [{translateX: this.state.currentMonthAnim}]}, addBorder(2, 'black')]}>
          <Text style={[styles.title]}>{this.months[this.props.currentMonthIndex]}</Text>
        </Animated.View>
        <Animated.View style={[styles.titleWrapper, {transform: [{translateX: this.state.nextMonthAnim}]}, addBorder(2, 'red')]}>
          <Text style={[styles.title]}>{nextMonth}</Text>
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    position: 'relative',
    // top: 25,
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
    fontWeight: '500',
    alignSelf: 'center'
  }
})
