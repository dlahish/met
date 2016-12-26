import React, { PropTypes } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

export default CustomNavBar = (props) =>
  <View style={styles.container}>
    <View style={styles.leftSection}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.onLeftPress()}
      >
        <Text style={[styles.buttonText, {paddingRight: 10}]}>
          {props.leftButton}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.onSecondLeftPress()}
      >
        <Text style={styles.buttonText}>
          {props.secondLeftButton}
        </Text>
      </TouchableOpacity>
    </View>
    <View style={styles.titleWrapper}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
    <View style={styles.rightSection}>
      <TouchableOpacity
          style={styles.button}
          onPress={() => props.onRightPress()}
        >
          <Text style={styles.buttonText}>
            {props.rightButton}
          </Text>
      </TouchableOpacity>
    </View>
  </View>

CustomNavBar.propTypes = {
  onLeftPress: PropTypes.func.isRequired,
  onRightPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  leftButton: PropTypes.node,
  rightButton: PropTypes.node
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 64,
    backgroundColor: 'rgb(0, 153, 204)',
    borderBottomWidth: 0.5,
    borderBottomColor: '#828287'
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 8
  },
  rightSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 8
  },
  titleWrapper: {
    paddingTop: 20,
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
    fontWeight: '500',
    alignSelf: 'center',
  },
  button: {
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#FFF',
    fontSize: 17,
  }
})
