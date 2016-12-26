import React from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  PixelRatio
} from 'react-native'
import DatePicker from 'react-native-datepicker'

var WidgetMixin = require('../WidgetMixin.js');
var TimerMixin = require('react-timer-mixin');


module.exports = React.createClass({
  mixins: [TimerMixin,WidgetMixin],

  getDefaultProps() {
    return {
      type: 'RowWidget',
      onPress: () => {},
      disclosure: true,
    };
  },

  _renderTitle() {
    if (this.props.title !== '') {
      return (
        <Text
          numberOfLines={1}
          style={this.getStyle(['textInputTitleInline'])}
        >
          {this.props.title}
        </Text>
      );
    }
    return (
      <View style={this.getStyle(['spacer'])}/>
    );
  },

  render() {
    return (
      <View style={this.getStyle(['rowContainer'])}>
        <View style={this.getStyle(['row'])}>
          {this._renderImage()}
          {this._renderTitle()}
          <DatePicker
            style={{flex: 1}}
            date={this.props.date}
            mode="date"
            placeholder={this.props.placeholder}
            format="DD-MM-YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            // iconSource={require('./google_calendar.png')}
            onDateChange={(date) => this.props.onDateChange(date)}
            customStyles={{
              dateTouchBody: {
                flex:  1,
                alignItems: 'center',
                justifyContent: 'flex-start'
              },
              dateInput: {
                flex: 0,
                borderWidth: 0,
                marginRight: 10
              }
            }}
          />
        </View>
      </View>
    );
  },

  defaultStyles: {
    rowImage: {
      height: 20,
      width: 20,
      marginLeft: 10,
    },
    rowContainer: {
      backgroundColor: '#FFF',
      borderBottomWidth: 1 / PixelRatio.get(),
      borderColor: '#c8c7cc',
    },
    row: {
      flexDirection: 'row',
      height: 44,
      alignItems: 'center',
    },
    textInputTitleInline: {
      width: 110,
      fontSize: 15,
      color: '#000',
      paddingLeft: 10,
    },
    underlayColor: '#c7c7cc',
    disclosure: {
      transform: [{rotate: '-90deg'}],
      marginLeft: 10,
      marginRight: 10,
      width: 11,
    },
    spacer: {
      width: 10,
    },
    title: {
      fontSize: 15,
      color: '#000',
      paddingLeft: 10,
    },
  },
});
