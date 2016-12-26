import React, { Component } from 'react'
import { DatePickerIOS, StyleSheet, View, Dimensions } from 'react-native'

export default class DatePickerExample extends Component {
  render() {
    var width = Dimensions.get('window').width;
    return (
      <View>
        <DatePickerIOS
          date={this.props.date}
          mode="date"
          timeZoneOffsetInMinutes={this.props.timeZoneOffsetInHours * 60}
          onDateChange={this.props.onDateChange}
          style={{ width: width * .8 }}
        />
      </View>
    );
  }
}
