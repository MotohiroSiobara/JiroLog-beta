'use strict';

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableHighlight,
} from 'react-native';
import { Button, FormLabel, FormInput } from "react-native-elements";

import { Header } from 'react-native-elements';
import t from 'tcomb-form-native';

const Form = t.form.Form;
const LoginUser = t.struct({
  email: t.String,
  password: t.String,
});

const options = {
  fields: {
    password: {
      password: true,
      secureTextEntry: true,
    }
  }
};

export default class LoginForm extends Component {
  render() {
    return(
      <View>
        <FormLabel>Email</FormLabel>
        <FormInput placeholder="Email address..." />
        <FormLabel>Password</FormLabel>
        <FormInput secureTextEntry placeholder="Password..." />
        <FormLabel>Confirm Password</FormLabel>
        <FormInput secureTextEntry placeholder="Confirm Password..." />
        <Button
          buttonStyle={{ marginTop: 20 }}
          backgroundColor="#03A9F4"
          title="SIGN IN"
          onPress={() => {
            this.onPress();
          }}
        />
      </View>
    )
  }

  onPress() {
    var value = this.refs.form.getValue();
    if (value) {
      const password = value.password;
      const email = value.email;
      this.props.loginUser(email, password);
    }
  }
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor:'transparent',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
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
