import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';

import { Card, Button, FormLabel, FormInput, FormValidationMessage } from "react-native-elements";
import { firebase } from '../config/firebase';
import { userValidateWithSignUp } from '../functions/validate';
import { messageByErrorCodeWithSignUp } from '../config/firebaseErrorCode.js';

export default class SignUp extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      email: { text: '', errorMessage: ''},
      password: { text: '', errorMessage: ''},
      confirmPassword: { text: '', errorMessage: ''}
    }
  }

  render() {
    const { email, password, confirmPassword } = this.state;

    return (
      <ImageBackground
        source={require('../images/jiro-1888644_640.jpg')}
        style={styles.backgroundImage}>
        <View style={{ paddingVertical: 20 }}>
          <Card>
            <FormLabel>メールアドレス</FormLabel>
            <FormValidationMessage>{email.errorMessage}</FormValidationMessage>
            <FormInput placeholder="" onChangeText={(text) => this.setState({ email: { text, errorMessage: '' } })} />


            <FormLabel>パスワード</FormLabel>
            <FormValidationMessage>{password.errorMessage}</FormValidationMessage>
            <FormInput secureTextEntry placeholder="" onChangeText={(text) => this.setState({ password: { text, errorMessage: '' } })} shake={false} />

            <FormLabel>パスワード(確認)</FormLabel>
            <FormValidationMessage>{confirmPassword.errorMessage}</FormValidationMessage>
            <FormInput secureTextEntry placeholder="" onChangeText={(text) => this.setState({ confirmPassword: { text, errorMessage: '' } })} />

            <Button
              buttonStyle={{ marginTop: 20 }}
              backgroundColor="#03A9F4"
              title="サインアップ"
              onPress={() => this.registerUser() }
            />

            <Button
              buttonStyle={{ marginTop: 20 }}
              backgroundColor="#03A9F4"
              title="アカウントをお持ちの方はこちら"
              onPress={() => {
                this.props.navigation.navigate('SignIn');
              }}
            />

            <Button
              buttonStyle={{ marginTop: 20 }}
              backgroundColor="transparent"
              textStyle={{ color: "#bcbec1" }}
              title="テストログイン"
              onPress={() => this.loginUser('siobara.motohiro@gmail.com', 'password')}
            />

          </Card>
        </View>
      </ImageBackground>
    );
  }

  registerUser() {
    const stateParam = userValidateWithSignUp(this.state);
    const { email, password, confirmPassword } = stateParam;

    if (email.errorMessage || password.errorMessage || confirmPassword.errorMessage) {
      return this.setState(stateParam);
    }

    firebase.auth().createUserWithEmailAndPassword(email.text, password.text).then(() => {
      firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
        name: '',
        email: email,
        image: '',
        shopName: ''
      }).then(() => {
        this.loginUser(email, password);
      });
    }).catch(error => {
      var errorCode = error.code;

      const messageObj = messageByErrorCodeWithSignUp(errorCode);
      if (messageObj.length === 0) {
        alert("原因不明のエラーがはっせい");
      }

      if (messageObj.type == 'email') {
        this.setState({ email: Object.assign(this.state.email, { errorMessage: messageObj.message })});
      } else if (messageObj.type == 'password') {
        this.setState({ password: Object.assign(this.state.password, { errorMessage: messageObj.message })});
      } else if (messageObj.type == 'all') {
        alert(messageObj.message);
      }
    });
  }

  loginUser(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
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
