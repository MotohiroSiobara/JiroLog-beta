import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';

import RegisterForm from '../components/RegisterForm';
import firebase from '../config/firebase';

export default class SignUp extends Component {
  render() {
    return (
      <ImageBackground
        source={require('../images/jiro-1888644_640.jpg')}
        style={styles.backgroundImage}>
        <View>
          <RegisterForm registerUser={(email, password) => this.registerUser(email, password)} />
            <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('SignIn')} underlayColor='#99d9f4'>
            <Text
              style={styles.buttonText}
            >
              すでにアカウントをお持ちの方はこちら
            </Text>
          </TouchableHighlight>
        </View>
        <Text
          style={{color: 'blue'}}
          onPress={() => this.loginUser('example.2@docomo.ne.jp', 'password')}>
          テストログイン
        </Text>
      </ImageBackground>
    );
  }

  async registerUser(email, password) {
    await firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.warn(errorMessage);
    });
    this.loginUser(email, password);
  }

  async loginUser(email, password) {
    await firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
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
    height: 18,
    width: 100,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
  buttonText: {
    fontSize: 12,
    color: 'white',
    alignSelf: 'center'
  },
});
