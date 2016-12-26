import React, { Component, PropTypes } from 'react'
import { View, Text, ScrollView, TouchableHighlight, LayoutAnimation } from 'react-native'
// import Button from 'react-native-button'
import Button from './Button'
import Icon from 'react-native-vector-icons/Ionicons'
const editIcon = (<Icon name='ios-remove-circle' size={22} color='red' />)
const plusIconBlack = (<Icon name='md-add' size={22} color='#CCC' />)
import CheckBox from 'react-native-checkbox'

export default class ItemRow extends Component {
  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  getIcon() {
    if (this.props.icon === 'checkBox') {
      return <CheckBox
        label=''
        checked={this.props.completed}
        checkboxStyle={{width: 18, height: 18}}
        onChange={() => this.props.onCheckRow(this.props.item.id)}
      />
    } else if (this.props.icon) {
      return <Icon name={this.props.icon} size={22} color='black' />
    } else {
      return <View style={{width: 19}}/>
    }
  }

  getCompletedStyles = (type) => {
    if (this.props.completed) {
      switch (type) {
        case 'amount': return { color: 'black', textDecorationLine: 'line-through', opacity: 0.6 }
        case 'text': return { textDecorationLine: 'line-through', opacity: 0.6 }
      }
    }
  }

  render() {
    const {
      item,
      itemIndex,
      editMode,
      selected,
      mainText,
      rightText,
      rightTextStyle,
      secondaryText,
      onSelecetItem,
      onDeleteItem } = this.props
    const rowIcon = this.getIcon()
    let deleteButtonWidth, sameRow
    selected ? deleteButtonWidth = 100 : deleteButtonWidth = 0

    return(
      <View style={styles.itemRow}>
        <View style={[styles.container]}>
          {editMode && selected
            ? <View></View>
            : editMode ?
              <View style={styles.iconWrapper}>
                <Button onPress={() => onSelecetItem(itemIndex, selected, item)}>
                  <View>{editIcon}</View>
                </Button>
              </View>
            : <View style={styles.iconWrapper}>{rowIcon}</View>}

          <TouchableHighlight
            style={styles.textWrapper}
            onPress={() => onSelecetItem(itemIndex, selected, item)}
            underlayColor='#FFF'
          >
            <View>
              <View style={styles.mainAndRightText}>
                <View>
                  <Text style={[styles.mainText, this.getCompletedStyles('text')]}>{mainText}</Text>
                </View>
                <View>
                  <Text style={[styles.mainText, rightTextStyle, this.getCompletedStyles('amount')]}>{rightText}</Text>
                </View>
              </View>
              {secondaryText
                ? <View>
                    <Text style={[styles.secondaryText, this.getCompletedStyles('text')]}>{secondaryText}</Text>
                  </View>
                : <View style={{paddingBottom: 2}}></View>}
            </View>
          </TouchableHighlight>
        </View>

        <View >
          {editMode && selected
            ? <TouchableHighlight
              style={[styles.deleteWrapper, {width: deleteButtonWidth}]}
              onPress={() => onDeleteItem(item)}
              >
                <Text style={{fontSize: 15}}>Delete</Text>
              </TouchableHighlight>
            : <View></View>}
        </View>
      </View>
    )
  }
}

  const styles = {
    itemRow: {
      flexDirection: 'row',
      paddingLeft: 10
    },
    container: {
      flex: 1,
      flexDirection: 'row',
    },
    textWrapper: {
      flex: 1,
      borderBottomColor: '#c8c7cc',
      borderBottomWidth: 0.5,
      paddingTop: 8,
      paddingRight: 15,
      paddingBottom: 8
    },
    mainText: {
      color: '#333',
      fontSize: 17,
      fontWeight: '400'
    },
    iconWrapper: {
      paddingRight: 10,
      alignItems: 'center',
      justifyContent: 'center'
    },
    itemTypeWrapper: {
      flexDirection: 'row',
      marginBottom: 15
    },
    itemTypeButton: {
      flex:1,
      alignItems: 'center',
      paddingTop: 5,
      paddingBottom: 5
    },
    deleteWrapper: {
      flex: 1,
      width: 0,
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center'
    },
    mainAndRightText: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    secondaryText: {
      fontSize: 12
    }
  }
