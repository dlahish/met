import React, { PropTypes, Component } from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableHighlight } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { MessageModal } from '../../components'
import * as settingsActionCreators from '../../actions/settings'
import * as accountActions from '../../actions/accounts'
import Icon from 'react-native-vector-icons/FontAwesome'
const smallRightArrow = (<Icon name='angle-right' size={22} />)
import SettingsList from 'react-native-settings-list'

function getSymbol(symbol) {
  if (typeof symbol === 'number') return String.fromCharCode(symbol)
  else return symbol
}

class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      modaltext: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.sceneName === 'settings' && nextProps.sceneName === 'settings' ||
        this.props.sceneIndex === 3 && nextProps.sceneIndex === 3) {
      if (nextProps.isSyncSuccessful === 'syncing') {
        return this.setModalVisible(true, 'Syncing...')
      }
      if (nextProps.isSyncSuccessful) {
        this.setModalVisible(true, 'Sync completed')
      } else {
        this.setModalVisible(true, 'Sync failed')
      }
    }
  }

  onSyncPress = () => {
    if (!this.props.synced) {
      this.setModalVisible(true, 'Syncing...')
      this.props.actions.settings.syncData()
    } else { this.setModalVisible(true, 'Data already synced') }
  }

  setModalVisible = (visible, text) => {
    this.setState({ modalVisible: visible, modaltext: text })
  }

  render() {
    const bgColor = '#DCE3F4'
    return (
      <View style={{backgroundColor:'#EFEFF4',flex:1, paddingTop: 64, paddingBottom: 50}}>
        <View style={{backgroundColor:'#EFEFF4',flex:1}}>
          <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
            <SettingsList.Header headerStyle={{marginTop:15}}/>
            <SettingsList.Item
              title='Currency Symbol'
              titleInfo={getSymbol(this.props.currencySymbol)}
              titleInfoStyle={styles.titleInfoStyle}
              onPress={() =>
                Actions.currencySymbols()}
            />
            <SettingsList.Item
              title='Edit Favorite Transaction'
              onPress={() => Actions.presetTransactions({editMode: false})}
            />
            <SettingsList.Item
              title='Categories'
              onPress={() => Actions.categories({editMode: false})}
            />
            <SettingsList.Item
              title='Custom Favorites'
              hasSwitch={true}
              hasNavArrow={false}
              switchState={this.props.customFavorites}
              switchOnValueChange={() => this.props.actions.settings.setCustomFavorites()}
            />
            <SettingsList.Item
              title='Sync Data'
              hasNavArrow={false}
              onPress={() => this.onSyncPress()}
            />
            <SettingsList.Header headerStyle={{marginTop:15}}/>
            <SettingsList.Item
              title='Log Out'
              hasNavArrow={false}
              onPress={() => this.props.actions.account.logoutAndUnauthUser()}
            />
          </SettingsList>
        </View>

        <MessageModal
          setModalVisible={this.setModalVisible.bind(this)}
          modalVisible={this.state.modalVisible}
          text={this.state.modaltext}
        />
      </View>
    )
  }
}

const styles = {
  titleInfoStyle: {
    color: 'black'
  }
}

export default connect(
  (state) => ({
    currencySymbol: state.settings.currencySymbol,
    customFavorites: state.settings.customFavorites,
    isSyncSuccessful: state.settings.isSyncSuccessful,
    synced: state.transactions.synced,
    sceneIndex: state.routes.scene.index,
    sceneName: state.routes.scene.name }),
  (dispatch) => ({
    actions: {
      settings: bindActionCreators(settingsActionCreators, dispatch),
      account:  bindActionCreators(accountActions, dispatch)
    }})
)(Settings)
