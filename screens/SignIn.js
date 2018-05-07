import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';
import {
  Card,
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage,
} from "react-native-elements";
import { firebase } from '../config/firebase';
import { userValidateWithSignIn } from '../functions/validate';
import { messageByErrorCodeWithSignIn } from '../config/firebaseErrorCode.js';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: { text: '', errorMessage: ''},
      password: { text: '', errorMessage: ''},
    };
  }

  render() {
    const { email, password } = this.state;

    return (
      <View style={{ paddingVertical: 20 }}>
        <Card>
          <FormLabel>メールアドレス</FormLabel>
          <FormValidationMessage>{email.errorMessage}</FormValidationMessage>
          <FormInput placeholder="" onChangeText={(text) => this.setState({ email: { text, errorMessage: '' } })} />

          <FormLabel>パスワード</FormLabel>
          <FormValidationMessage>{password.errorMessage}</FormValidationMessage>
          <FormInput secureTextEntry placeholder="パスワード" onChangeText={(text) => this.setState({ password: { text, errorMessage: '' } })} />

          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="サインイン"
            onPress={(e) => this.loginUser() }
          />

          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="アカウントをお持ちでない方はこちら"
            onPress={() => {
              this.props.navigation.navigate('SignUp');
            }}
          />

          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="transparent"
            textStyle={{ color: "#bcbec1" }}
            title="テストログイン"
            onPress={() => this.loginUser('example.2@docomo.ne.jp', 'password')}
          />

        </Card>
      </View>
    );
  }

  loginUser() {
    const stateParam = userValidateWithSignIn(this.state);
    const { email, password } = stateParam;

    if (email.errorMessage || password.errorMessage) {
      return this.setState(stateParam);
    }

    firebase.auth().signInWithEmailAndPassword(email.text, password.text).catch((error) => {
      var errorCode = error.code;

      const messageObj = messageByErrorCodeWithSignIn(errorCode);
      if (messageObj.length === 0) {
        alert("原因不明のエラーがはっせい");
      }

      if (messageObj.type == 'email') {
        this.setState({ email: Object.assign(this.state.email, { errorMessage: messageObj.message })});
      } else if (messageObj.type == 'password') {
        this.setState({ password: Object.assign(this.state.password, { errorMessage: messageObj.message })});
      }
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
