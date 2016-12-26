import React from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  PixelRatio
} from 'react-native'

var WidgetMixin = require('../WidgetMixin.js')


module.exports = React.createClass({
  mixins: [WidgetMixin],

  getDefaultProps() {
    return {
      type: 'RowWidgetWithTitle',
      onPress: () => {},
      disclosure: true,
    };
  },

  _renderDisclosure() {
    if (this.props.disclosure === true) {
      return (
        <Image
          style={this.getStyle('disclosure')}
          resizeMode={Image.resizeMode.contain}
          source={require('../icons/disclosure.png')}
        />
      );
    }
    return null;
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

  _renderMainContent() {
    let placeholderStyle = null
    let mainContent = this.props.mainContent
    if (this.props.mainContent.length === 0) {
      mainContent = this.props.placeholder
      placeholderStyle = {opacity: 0.5}
    }
    return (
      <TouchableHighlight
        style={{flex: 1, height: 40, justifyContent: 'center'}}
        onPress={() => {
          this.requestAnimationFrame(() => {
            this.props.onPress();
          });
        }}
        underlayColor={this.getStyle('underlayColor').pop()}
        {...this.props} // mainly for underlayColor
      >
        <Text style={[this.getStyle(['textInputInline']), placeholderStyle]} {...this.props}>{mainContent}</Text>
      </TouchableHighlight>
    )
  },

  render() {
    return (
      <View style={this.getStyle('rowContainer')}>
        <View style={this.getStyle('row')}>
          {this._renderImage()}
          {this._renderTitle()}
          {this._renderMainContent()}
          {this._renderDisclosure()}
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
    underlayColor: '#c7c7cc',
    textInputTitleInline: {
      width: 110,
      fontSize: 15,
      color: '#000',
      paddingLeft: 10,
    },
    textInputInline: {
      fontSize: 15,
      // marginLeft: 5,
      marginTop: 2,
    },
    disclosure: {
      transform: [{rotate: '-90deg'}],
      marginLeft: 10,
      marginRight: 10,
      width: 11,
    },
    title: {
      flex: 1,
      fontSize: 15,
      color: '#000',
      paddingLeft: 10,
    },
  },
});
