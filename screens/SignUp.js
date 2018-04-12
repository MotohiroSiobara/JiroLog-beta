import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';

//import RegisterForm from '../components/RegisterForm';
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import firebase from '../config/firebase';

export default class SignUp extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  render() {
    return (
      <ImageBackground
        source={require('../images/jiro-1888644_640.jpg')}
        style={styles.backgroundImage}>
        <View style={{ paddingVertical: 20 }}>
          <Card>
            <FormLabel>Email</FormLabel>
            <FormInput placeholder="Email address..." onChangeText={(text) => this.setState({ email: text })} />
            <FormLabel>Password</FormLabel>
            <FormInput secureTextEntry placeholder="Password..." onChangeText={(text) => this.setState({ password: text })} />
            <FormLabel>Confirm Password</FormLabel>
            <FormInput secureTextEntry placeholder="Confirm Password..." onChangeText={(text) => this.setState({ confirmPassword: text })} />

            <Button
              buttonStyle={{ marginTop: 20 }}
              backgroundColor="#03A9F4"
              title="SIGN UP"
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
              onPress={() => this.loginUser('example.2@docomo.ne.jp', 'password')}
            />

          </Card>
        </View>
      </ImageBackground>
    );
  }

  async registerUser() {
    const { email, password, confirmPassword } = this.state;
    if (password == confirmPassword) {
      await firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.warn(errorMessage);
      });
      this.loginUser(email, password);
    }
  }

  async loginUser(email, password) {
    await firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
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
