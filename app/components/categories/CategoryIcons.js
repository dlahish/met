import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as formActions from '../../actions/form'
import icons from './icons'
import {
  CustomNavBar
} from '../../components'

class CategoryIcons extends Component {
  onIconPress = (icon) => {
    this.props.setCategoryIcon(icon)
    Actions.pop()
  }

  render() {
    return (
      <View style={styles.container}>
        <CustomNavBar
          onLeftPress={Actions.pop}
          onRightPress={() => {}}
          title='Category Icons'
          leftButton='Cancel'
        />

        <ScrollView>
          <View style={styles.iconsContainer}>
            {icons.map((icon, i) => {
              return (
                <View key={i} style={styles.iconWrapper}>
                  <TouchableOpacity onPress={() => this.onIconPress(icon)}>
                    <Text><Icon name={icons[i]} size={36} color='black' style={{paddingLeft: 10}}/></Text>
                  </TouchableOpacity>
                </View>
              )
            })}
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default connect(
  (state) => ({}),
  (dispatch) => (bindActionCreators(formActions, dispatch))
)(CategoryIcons)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  iconsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconWrapper: {
    padding: 10
  }
})
