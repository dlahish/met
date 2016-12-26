import React, { Component, PropTypes } from 'react'
import Modal from 'react-native-modalbox'
import {VibrancyView} from 'react-native-blur'
import Spinner from 'react-native-loading-spinner-overlay'
import { Platform } from 'react-native'

export default class LoadingOverlay extends Component {
  render() {
    if (Platform.OS === 'ios') {
      return (
        <Modal
          isOpen={this.props.isLoading}
          style={[styles.modal]}
          position={"bottom"}
        >
          <VibrancyView blurType="light" style={styles.container}>
            <Spinner visible={true} />
          </VibrancyView>
        </Modal>
      )
    } else {
      return (
        <Modal
          isOpen={this.props.isLoading}
          style={[styles.modal]}
          position={"bottom"}
        >
          <Spinner visible={true} />
        </Modal>
      )
    }

  }
}

const styles = {
  modal: {
    backgroundColor: 'transparent'
  },
  container: {
    justifyContent: 'center',
    backgroundColor: 'transparent'
  }
}
