import React, { Component } from 'react'
import { Button, DatePicker } from '../../components'
import {
  Modal,
  StyleSheet,
  Switch,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'

export default class DatePickerModal extends Component {
  state = {
    animationType: 'none',
    modalVisible: false,
    transparent: true
  }

  render() {
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
              <DatePicker
                onDateChange={this.props.onDateChange}
                timeZoneOffsetInHours={this.props.timeZoneOffsetInHours}
                date={this.props.date}
              />
              <Button
                onPress={this.props.setModalVisible.bind(this, false)}
                style={styles.modalButton}>
                Close
              </Button>
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
    padding: 20
  },
  modalButton: {
    marginTop: 10,
  },
});
