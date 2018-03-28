import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

import ItemListPage from '../screens/ItemListPage';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
console.ignoredYellowBox = ['Remote debugger'];
import firebase from '../config/firebase';

const pageType = { register: 'Register', login: 'Login' }
export default class AuthenticatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageType: pageType.register
    };
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.state.pageType == pageType.register ? (
          <View>
            <RegisterForm registerUser={(email, password) => this.props.registerUser(email, password)} />
            <View style={styles.container}>
              {this.renderLink(pageType.login)}
            </View>
          </View>
        ) : (
          <View>
            <LoginForm loginUser={(email, password) => this.props.loginUser(email, password)} />
            <View style={styles.container}>
              {this.renderLink(pageType.register)}
            </View>
          </View>
        )}
      </View>
    );
  }

  renderLink(pageTypeVal) {
    return(
      <Text
        style={{color: 'blue'}}
        onPress={() => this.setState({ pageType: pageTypeVal })}>
        {pageTypeVal == pageType.register ? '新規登録' : 'ログインする'}
      </Text>
    )
  }

  registerUser(email, password) {
    this.setState({ isLogin: true })
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
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
