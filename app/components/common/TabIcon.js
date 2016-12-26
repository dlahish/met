import React, { PropTypes, Component } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { Text, View, StyleSheet } from 'react-native'

const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string
};

function isSelected(selected) {
  if (selected) return '#rgb(0, 153, 204)'
  else return '#BBBBBB'
}

function getIconName(sceneKey) {
  switch(sceneKey) {
    case 'home': return 'ios-home'
    case 'transactions': return 'ios-paper'
    case 'categories': return 'ios-pricetags'
    case 'settings': return 'ios-settings'
    case 'reminders': return 'ios-cash'
    default: return 'ios-home'
  }
}

class TabIcon extends Component {
  render() {
    let color = isSelected(this.props.selected)
    let iconName = getIconName(this.props.sceneKey)
    return (
      <View style={styles.container}>
        <Icon name={iconName} size={26} color={color} />
        <Text style={styles.text}>{this.props.title}</Text>
      </View>
    )
  }
}

const styles = {
  container: {
    alignItems: 'center'
  },
  text: {
    fontSize: 10
  }
}

TabIcon.propTypes = propTypes;

export default TabIcon;
