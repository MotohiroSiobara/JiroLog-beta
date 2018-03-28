import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import { Root } from './config/router';
import RegisterForm from './components/RegisterForm';
console.ignoredYellowBox = ['Remote debugger'];
import firebase from './config/firebase';
import AuthenticatePage from './screens/AuthenticatePage';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLogin: false };
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.state.isLogin ? (
          <Root />
        ) : (
          <AuthenticatePage
            registerUser={(email, password) => this.registerUser(email, password)}
            loginUser={(email, password) => this.loginUser(email, password)} />
        )}
      </View>
    );
  }

  loginUser(email, password) {
    this.setState({ isLogin: true })
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }

  registerUser(email, password) {
    this.setState({ isLogin: true })
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.warn(errorMessage);
    });
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingLeft: 20,
    backgroundColor: '#ffffff',
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});
