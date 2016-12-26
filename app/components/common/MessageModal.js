import React, { Component } from 'react'
import { Button } from '../../components'
import {
  Modal,
  StyleSheet,
  Switch,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'

export default class MessageModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      animationType: 'none',
      modalVisible: false,
      transparent: true
    }
  }

  getButtons = () => {
    if (this.props.button) {
      return <View style={{flexDirection: 'row', paddingTop: 10}}>
        <Button
          onPress={this.props.setModalVisible.bind(this, false)}
          style={styles.modalButton}>
          Cancel
        </Button>
        <Button
          onPress={this.props.onButtonPress.bind(this, true)}
          style={styles.modalButton}>
          {this.props.buttonText}
        </Button>
      </View>
    } else {
      return <Button
        // onPress={this.props.setModalVisible.bind(this, false)}
        onPress={() => this.props.setModalVisible(false)}
        style={styles.modalButton}>
        Close
      </Button>
    }
  }

  render() {
    const buttons = this.getButtons()
    return (
      <View>
        <Modal
          animationType={this.state.animationType}
          transparent={this.state.transparent}
          visible={this.props.modalVisible}
          onRequestClose={() => {this.setModalVisible(false)}}
        >
          <View style={[styles.container]}>
            <View style={[styles.innerContainer]}>
              <View>
                <Text>{this.props.text}</Text>
              </View>
              {buttons}
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'column',
    height: 100
  },
  modalButton: {
    marginTop: 10,
  },
});
