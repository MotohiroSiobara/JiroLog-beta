import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';

import LoginForm from '../components/LoginForm';
import firebase from '../config/firebase';

export default class SignIn extends Component {
  render() {
    return (
      <ImageBackground
        source={require('../images/jiro-1888644_640.jpg')}
        style={styles.backgroundImage}>
        <View>
          <LoginForm loginUser={(email, password) => this.loginUser(email, password)} />
          <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('SignUp')} underlayColor='#99d9f4'>
            <Text
              style={styles.buttonText}
            >
              アカウントをお持ちでない方はこちら
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
    width: 300,
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
