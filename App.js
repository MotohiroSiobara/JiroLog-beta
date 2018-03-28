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
    this.state = { loginCount: 0 };
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.componentByAuth()}
      </View>
    );
  }

  componentByAuth() {
    if (firebase.auth().currentUser) {
      return <Root />
    } else {
      return(
        <AuthenticatePage
          registerUser={(email, password) => this.registerUser(email, password)}
          loginUser={(email, password) => this.loginUser(email, password)} />
      )
    }
  }

  async loginUser(email, password) {
    await firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
    await this.setState({ loginCount: this.state.loginCount + 1 });
  }

  async registerUser(email, password) {
    await firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.warn(errorMessage);
    });
    this.loginUser(email, password);
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
