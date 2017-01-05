import React, { Component } from 'react'
import { Platform, View, Text } from 'react-native'
import Home from './Home'
import ListContainer from '../../components/common/ListContainer'

export default class HomeView extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <ListContainer
          title='Home 22'
          backgroundColor="#5597B8"
          backgroundImage={require('../../../assets/met-background.png')}>
          <Home />
          {/* <View><Text>Hello World</Text></View> */}
        </ListContainer>
      </View>
    )
  }
}
