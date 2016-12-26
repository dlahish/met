import React, { Component } from 'react'
import { View, Text, StyleSheet, NetInfo } from 'react-native'
import { Router, Scene, Switch, Actions, ActionConst } from 'react-native-router-flux'
import { bindActionCreators } from 'redux'
import * as accountActions from '../actions/accounts'
import * as dataActions from '../actions/data'
import * as settingsActions from '../actions/settings'
import changeConnectionStatus from '../actions/connection'
import { fetchIfCurrentUser } from '../actions/accounts'
import Button from 'react-native-button'
import { connect } from 'react-redux'
import {
  Home,
  Signin,
  Signup,
  TabIcon,
  NewTransaction,
  CategoryList,
  Transactions,
  Categories,
  NewCategory,
  Settings,
  Transaction,
  CurrencySymbols,
  PresetTransactions,
  Loader,
  Reminders,
  NewReminder,
  CategoryIcons
} from '../components'
import Icon from 'react-native-vector-icons/FontAwesome'
const plusIcon = (<Icon name='plus' size={26} color='#FFF' />)

const RouterWithRedux = connect()(Router)

class Routes extends Component {
  componentDidMount() {
    this.props.actions.account.checkIfAuthed()
    this.props.actions.data.setCurrentMonth()
    NetInfo.isConnected.addEventListener(
        'change',
        this._handleConnectivityChange.bind(this)
    )
    NetInfo.isConnected.fetch().done(
        (isConnected) => { this.props.actions.changeConnectionStatus(isConnected) }
    )
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
        'change',
        this._handleConnectivityChange
    )
  }

  _handleConnectivityChange(isConnected) {
    this.props.actions.changeConnectionStatus(isConnected)
  }

  render() {
    return (
      this.props.loading ?
          <Loader /> :
          <RouterWithRedux
            navigationBarStyle={styles.navBar}
            titleStyle={styles.navBarTitleStlye}
            leftButtonIconStyle={{tintColor: '#FFF'}}
          >
            <Scene
              key="root"
              component={connect(state => ({isAuthed: state.account.isAuthed}))(Switch)}
              selector={(props) => props.isAuthed ? 'authed' : 'authentication'}
              tabs={true}
            >
              <Scene key="authentication" >
                <Scene key="signin" title="Signin" component={Signin} hideNavBar={true}/>
                <Scene key="signup" title="Signup" component={Signup} />
              </Scene>

              <Scene key="authed">
                <Scene key="tabbar" tabs={true} tabBarStyle={styles.tabBar}>

                  <Scene
                    key="home"
                    title="Home"
                    component={Home}
                    icon={TabIcon}
                    hideNavBar={true}
                  />

                  <Scene key="transactions"
                    component={Transactions}
                    removeTransaction={this.props.actions.data.removeTransaction}
                    icon={TabIcon}
                    title='Transactions'
                    leftTitle='Edit'
                    leftButtonStyle={{paddingTop: 10}}
                    leftButtonTextStyle={{color: '#FFF'}}
                    onLeft={() => Actions.editTransactions({editMode: true, selectedItemIndex: false})}
                    rightTitle={plusIcon}
                    onRight={() => Actions.newTransaction()}
                  >
                    <Scene key="viewTransactions" />
                    <Scene key="editTransactions"
                      leftTitle='Done'
                      onLeft={() => Actions.viewTransactions({
                        editMode: false,
                        selectedItemIndex: false})}
                      rightTitle=''
                      onRight={() => {}}
                      hideTabBar={true}
                    />
                  </Scene>

                  <Scene key="reminders" component={Reminders} icon={TabIcon} title='Reminders' />

                  <Scene key="settings" component={Settings} icon={TabIcon} title='Settings' />

                </Scene>

                <Scene
                  key="presetTransactions"
                  component={connect(state =>
                    ({favoriteTransactions: state.data.favoriteTransactions}))(PresetTransactions)}
                  removeFavoriteTransaction={this.props.actions.data.removeFavoriteTransaction}
                  hideNavBar={true}
                >
                  <Scene key="viewFavoriteTransactions" />
                  <Scene key="editFavoriteTransactions" />
                </Scene>
                <Scene
                  key="currencySymbols"
                  title="Currency Symbols"
                  component={CurrencySymbols}
                  hideNavBar={false}
                  setCurrancySymbol={this.props.actions.settings.setCurrancySymbol}
                  backTitle='Back'
                  onLeft={() => Actions.settings()}
                  leftButtonTextStyle={{color: '#fff'}}
                />

                <Scene
                  key="newCategory"
                  title="New Category"
                  component={NewCategory}
                  hideNavBar={true}
                  type={ActionConst.POP}
                  direction="vertical"
                />

                <Scene
                  key="newReminder"
                  component={NewReminder}
                  icon={TabIcon}
                  title='New Reminder'
                  hideNavBar={true}
                />

                <Scene
                  key="newTransaction"
                  component={NewTransaction}
                  hideNavBar={true}
                  removeTransaction={this.props.actions.data.removeTransaction}
                  title="New Transaction"
                >
                  <Scene key="viewNewTransaction" />
                  <Scene key="newFavoriteTransaction" />
                </Scene>

                <Scene
                  key="categoryList"
                  title="Categories"
                  component={CategoryList}
                  hideNavBar={false}
                  hideBackImage={true}
                  backTitle='Back'
                  backButtonTextStyle={{color: 'white'}}
                  onBack={() => Actions.pop()}
                />

                <Scene key="categories"
                  component={Categories}
                  title='Categories'
                  hideTabBar={false}
                  hideNavBar={true}
                >
                    <Scene key="viewCategories" />
                    <Scene key="editCategory"
                      title='Edit Categories'
                      backTitle='Done'
                      leftTitle='Done'
                      leftButtonImage={false}
                      leftButtonTextStyle={{color: '#fff'}}
                      onBack={() => Actions.viewCategories({
                        editMode: false, deleteButtonWidth: 0, selectedCategoryIndex: null})}
                      hideTabBar={true}
                    />
                </Scene>

                <Scene key="categoryIcons" title="Category Icons" component={CategoryIcons} />
              </Scene>
            </Scene>
          </RouterWithRedux>
    )
  }
}

export default connect(
  (state) => ({
    token: state.account.token,
    loading: !state.storage.storageLoaded,
    isConnected: state.isConnected
  }),
  (dispatch) => ({
    actions: {
      account: bindActionCreators(accountActions, dispatch),
      data: bindActionCreators(dataActions, dispatch),
      settings: bindActionCreators(settingsActions, dispatch),
      changeConnectionStatus: (isConnected) => dispatch(changeConnectionStatus(isConnected))
    }
  }))(Routes)

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#rgb(0, 153, 204)',
  },
  tabBar: {
    borderTopColor: '#BBB',
    borderTopWidth: 1,
    backgroundColor: '#FFF'
  },
  navBarTitleStlye: {
    color: '#FFF',
    fontWeight: '600'
  }
})
