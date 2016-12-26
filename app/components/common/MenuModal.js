import React, { Component, PropTypes } from 'react'
import { View, Text, ScrollView, TouchableHighlight } from 'react-native'
import Modal from 'react-native-modalbox'
// import Slider from 'react-native-slider'
import Button from 'react-native-button'

export default class MenuModal extends Component {
  render() {
    const {
      isOpen,
      closeModal,
      button1,
      button2,
      button3,
      button1OnPress,
      button2OnPress,
      button3OnPress
    } = this.props
    const cancelButton = <Button
                            onPress={() => closeModal()}
                            containerStyle={[styles.btnContainer, {marginTop: 10, borderRadius: 5}]}
                            style={styles.btnText}>Cancel
                          </Button>
    let buttons = [cancelButton]
    if (button1) {
      const btn1 = <Button
                    onPress={() => button1OnPress()}
                    containerStyle={[styles.btnContainer, {borderBottomRightRadius: 5, borderBottomLeftRadius: 5}]}
                    style={styles.btnText}>{button1}
                  </Button>
      buttons.unshift(btn1)
    }
    if (button2) {
      const btn2 = <Button
                    onPress={() => button2OnPress()}
                    containerStyle={styles.btnContainer}
                    style={styles.btnText}>{button2}
                  </Button>
      buttons.unshift(btn2)
    }
    if (button3) {
      const btn3 = <Button
                    onPress={() => button3OnPress()}
                    containerStyle={styles.btnContainer}
                    style={styles.btnText}>{button3}
                  </Button>
      buttons.unshift(btn3)
    }



    return (
      <Modal
        isOpen={isOpen}
        onClosed={closeModal}
        style={[styles.modal, styles.modal]}
        position={"bottom"}
      >
        <View style={styles.title}><Text>Sort by</Text></View>
        {buttons.map((btn, i) => <View key={i}>{btn}</View>)}
      </Modal>
    )
  }
}

const styles = {
  modal: {
    height: 300,
    backgroundColor: "transparent",
    justifyContent: 'flex-end',
    paddingBottom: 70
  },
  btnContainer: {
    padding: 10,
    height: 45,
    marginTop: 0.5,
    marginLeft: 40,
    marginRight: 40,
    overflow: 'hidden',
    backgroundColor: '#FFF'
  },
  btnText: {
    color: "black",
    fontSize: 18
  },
  title: {
    backgroundColor: '#FFF',
    marginLeft: 40,
    marginRight: 40,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    padding: 7,
    justifyContent: 'center',
    alignItems: 'center'
  }
}
