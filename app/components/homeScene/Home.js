'use strict'

import React, { Component, PropTypes } from 'react'
import { View, Text, TouchableHighlight, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Actions } from 'react-native-router-flux'
import {
  CurrentMonthTotal,
  AddTransactionButtons,
  ChangeMonthArrows,
  DisplayFavoriteTransactions,
  LoadingOverlay,
  ProgressBar
} from '../../components'
import * as accountActions from '../../actions/accounts'
import * as dataActions from '../../actions/data'
import * as formActions from '../../actions/form'
import * as settingsActions from '../../actions/settings'
import * as transactionsActions from '../../actions/transactions'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
			isLoading: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.transactions.length !== nextProps.transactions.length
    || this.props.forcedNewProps !== nextProps.forcedNewProps) {
      this.props.actions.data.getVisibleTransactions(nextProps.transactions, this.props.currentMonthIndex)
    }
    this.setState({ isLoading: false })
  }

  onAddNewFavortieTransaction = (favTransaction) => {
    this.setState({ isLoading: true })
    delete favTransaction['id']
    this.props.actions.data.addNewFavoriteTransaction(favTransaction)
  }

  render() {
    return (
      <View style={styles.container}>

          <CustomNavBar
            onLeftPress={() => {}}
            onRightPress={() => {}}
            title={this.props.currentMonthName}
          />

          <View style={styles.monthSummary}>
              <ChangeMonthArrows
                onPressLeft={() =>
                  this.props.actions.data.setMonth('previous',
                                                    this.props.currentMonthIndex,
                                                    this.props.yearTotal,
                                                    this.props.transactions)}
                onPressRight={() => this.props.actions.data.setMonth('next',
                                                                      this.props.currentMonthIndex,
                                                                      this.props.yearTotal,
                                                                      this.props.transactions)}
              />

              <ProgressBar transactions={this.props.visibleTransactions}/>

              <CurrentMonthTotal
                currencySymbol={this.props.currencySymbol}
                transactions={this.props.visibleTransactions}
              />
          </View>

          <View style={[styles.titleWrapper, {borderBottomWidth: 1, borderBottomColor: '#b3b3b3'}]}>
              <Text style={styles.titleText}>Favorites</Text>
          </View>

          <View style={styles.favoriteTransactions}>
              <DisplayFavoriteTransactions
                favoriteTransactions={this.props.favoriteTransactions}
                onAddNewFavortieTransaction={this.onAddNewFavortieTransaction}
                customFavorites={this.props.customFavorites}
              />
          </View>

          <View style={styles.addTransactionButtonsWrapper}>
              <AddTransactionButtons setCategoryType={this.props.actions.form.setCategoryType}/>
          </View>

          <LoadingOverlay isLoading={this.state.isLoading} />
      </View>
    )
  }
}

Home.propTypes = {
  currentMonthIndex: PropTypes.number,
  currentMonthName: PropTypes.string,
  yearTotal: PropTypes.array,
  transactions: PropTypes.array,
  currencySymbol: PropTypes.node,
  favoriteTransactions: PropTypes.array,
  forcedNewProps: PropTypes.bool
}

export default connect(
  (state) => ({
    currentMonthIndex: state.data.currentMonthIndex,
    currentMonthName: state.data.currentMonthName,
    currencySymbol: state.settings.currencySymbol,
    favoriteTransactions: state.data.favoriteTransactions,
    yearTotal: state.data.yearTotal,
    transactions: state.transactions.transactions,
    visibleTransactions: state.data.visibleTransactions,
    customFavorites: state.settings.customFavorites,
    forcedNewProps: state.transactions.forcedNewProps
  }),
  (dispatch) => ({
    actions: {
      account: bindActionCreators(accountActions, dispatch),
      data: bindActionCreators(dataActions, dispatch),
      form: bindActionCreators(formActions, dispatch),
      settings: bindActionCreators(settingsActions, dispatch),

      transactions: bindActionCreators(transactionsActions, dispatch),
    }
  })
)(Home)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingBottom: 65,
    backgroundColor: '#FFF'
	},
  monthSummary: {
    paddingTop: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea'
  },
  favoriteTransactions: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15
  },
  titleWrapper: {
    backgroundColor: '#eaeaea',
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  titleText: {
    color: 'black',
    fontSize: 15,
    fontWeight: '400'
  }
})
