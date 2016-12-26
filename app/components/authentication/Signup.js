'use strict'
import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
	Dimensions,
	TouchableOpacity,
  ScrollView,
  Platform
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Actions } from 'react-native-router-flux'
import * as accountActions from '../../actions/accounts'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { LoadingOverlay } from '../../components'
var windowSize = Dimensions.get('window')

class Signin extends Component {
	constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
			passwordConfirm: '',
			passwordError: '',
			isLoading: false
    }
  }

	onFormSubmit = () => {
		if (this.state.password === this.state.passwordConfirm) {
				this.setState({ isLoading: true, passwordError: '' })
				this.props.signupAndAuthUser(this.state)
					.then(() => {
						if (!this.props.authError) {
							this.setState({
								isLoading: false,
								password: '',
								passwordConfirm: '',
								passwordError: '' })
							Actions.home()
						} else {
							this.setState({ isLoading: false })
						}
					})
		} else {
				this.setState({ passwordError: `Password doesn't match` })
		}
  }

  onInputChange = (field, value) => {
    this.setState({
      ...this.state,
      ...{[field]:value}
    })
  }

  onSigninPress = () => {
    this.props.setAuthError('')
    Actions.pop()
  }

  render() {
    const inputFieldHeight = Platform.OS === 'ios' ? {height: 20} : {height: 35}
    return (
        <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps={true}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.onSigninPress()}>
                      <Icon name='md-arrow-back' size={22} color='#FFF' style={{paddingBottom: 10, paddingTop: 10}}/>
                    </TouchableOpacity>
                    <Text style={styles.title}>Sign up</Text>
                </View>
                <View style={styles.inputs}>
                    <View style={styles.inputContainer}>
                        <Icon name='md-person' size={22} color='#FFF' style={styles.inputUsername}/>
                        <TextInput
                            style={[styles.input, styles.whiteFont, inputFieldHeight]}
                            placeholder="Email"
                            placeholderTextColor="#FFF"
                            value={this.state.email}
                            onChangeText={(value) => this.onInputChange('email', value)}
                            autoCapitalize='none'
                            returnKeyType='next'
                            onSubmitEditing={() => this.refs.passwordInput.focus()}
                            keyboardType='email-address'
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon name='md-lock' size={22} color='#FFF' style={styles.inputUsername}/>
                        <TextInput
                            ref='passwordInput'
                            password={true}
                            style={[styles.input, styles.whiteFont, inputFieldHeight]}
                            placeholder="Pasword"
                            placeholderTextColor="#FFF"
                            value={this.state.password}
                            onChangeText={(value) => this.onInputChange('password', value)}
                            autoCapitalize='none'
                            returnKeyType='next'
                            onSubmitEditing={() => this.refs.passwordInputConfirm.focus()}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Icon name='md-lock' size={22} color='#FFF' style={styles.inputUsername}/>
                        <TextInput
                            ref='passwordInputConfirm'
                            password={true}
                            style={[styles.input, styles.whiteFont, inputFieldHeight]}
                            placeholder="Pasword confirm"
                            placeholderTextColor="#FFF"
                            value={this.state.passwordConfirm}
                            onChangeText={(value) => this.onInputChange('passwordConfirm', value)}
                            autoCapitalize='none'
                            returnKeyType='done'
                            onSubmitEditing={this.onFormSubmit}
                        />
                    </View>
                    <View style={styles.forgotContainer}>
                        {this.state.passwordError.length > 0
                          ? <Text style={{color: 'red'}}>{this.state.passwordError}</Text>
                          : <Text style={{color: 'red'}}>{this.props.authError}</Text>}
                    </View>
                </View>
                <TouchableOpacity onPress={this.onFormSubmit}>
                  <View style={styles.signup}>
                      <Text style={styles.whiteFont}>Sign Up</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.signin}>
                    <Text style={styles.greyFont}>Already have an account?
                    <Text onPress={() => this.onSigninPress()} style={styles.whiteFont}>  Sign In</Text></Text>
                </View>
            </ScrollView>
            <KeyboardSpacer />
						<LoadingOverlay isLoading={this.state.isLoading} />
        </View>
    )
  }
}

export default connect(
	(state) => ({ authError: state.account.authError }),
	(dispatch) => (bindActionCreators(accountActions, dispatch))
)(Signin)

var styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      paddingTop: 20,
      flex: 1,
			backgroundColor: 'rgb(0, 153, 204)'
    },
    header: {
				paddingTop: 54,
        alignItems: 'flex-start',
        backgroundColor: 'transparent',
				marginLeft: 25
    },
		title: {
			fontSize: 35,
			fontWeight: '300',
			color: '#FFF'
		},
    signin: {
			justifyContent: 'center',
			alignItems: 'center',
    },
    signup: {
			backgroundColor: '#7e01a8',
			padding: 15,
			alignItems: 'center'
    },
    inputs: {
        marginTop: 10,
        marginBottom: 10,
        flex: .4
    },
    inputUsername: {
      marginLeft: 15,
      width: 20,
      height: 20
    },
    inputContainer: {
        padding: 10,
        borderWidth: 1,
        borderBottomColor: '#CCC',
        borderColor: 'transparent'
    },
    input: {
        position: 'absolute',
        left: 61,
        top: 12,
        right: 0,
        height: 20,
        fontSize: 14
    },
    forgotContainer: {
			flexDirection: 'row',
      justifyContent: 'space-between',
			alignItems: 'stretch',
      padding: 15,
			paddingLeft: 25
    },
    greyFont: {
      color: '#D8D8D8'
    },
    whiteFont: {
      color: '#FFF'
    }
})
