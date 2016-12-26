import React from 'react'
import {Text, TouchableHighlight, View} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Spinner from 'react-native-spinkit'

var styles = require('./ListItemStyles.js')

var Listitem = React.createClass({
  getInitialState: function() {
    return {
      showSpinner: false
    }
  },

  getDefaultProps: function() {
    return {
      onPress: null,
      text: null,
      underlayColor: "rgba(0,0,0,.015)",
    }
  }
, _handlePress: function() {
    var onPress = this.props.onPress
    if (onPress) {
      this.setState({showSpinner: true})
      this.stopSpinner()
      onPress()
    }
  },

  stopSpinner: function() {
    setTimeout(function(){
             this.setState({showSpinner: false});
        }.bind(this),1200);
  }

, render: function() {
    var self = this
    var p = self.props

    //  style container (for backgroundColor and indent)
    var styleLiContainer = [styles.liContainer]
    if (p.backgroundColor) styleLiContainer.push([{ backgroundColor: p.backgroundColor }])
    if (p.indent > -1) styleLiContainer.push([{ paddingLeft: p.indent }])

    var listitemChild = <Text style={[styles.liText, p.styleText]}>{p.text}</Text>
    var listitemInfo = <Text style={[styles.liText, p.styleInfo]}>{p.info}</Text>

    if (p.children) var listitemChild = <View>{p.children}</View>

    var listitem = <View style={[styles.li, p.style]}>
                     <View>
                        {listitemChild}
                     </View>
                     <View>
                        {listitemInfo}
                     </View>
                   </View>

    return (
      p.onPress && p.icon ?
        <View style={[styleLiContainer, {flexDirection: 'row'}]}>
          {this.state.showSpinner
          ? <Spinner
            style={{marginTop: 15, marginRight: 9, marginBottom: 17}}
            // style={styles.spinner}
            isVisible={this.state.showSpinner}
            size={15}
            type='Circle'
            color='#555'/>
          :
          <TouchableHighlight
            underlayColor={p.underlayColor}
            onPress={self._handlePress}
          >
            <Icon name={p.icon} style={[styles.li, styles.icon, p.iconStyle]}/>
          </TouchableHighlight> }
          <View style={{flex: 1}}>
              {listitem}
          </View>
        </View>
      : <View style={styleLiContainer}>{listitem}</View>
    )
  }
})

module.exports = Listitem
