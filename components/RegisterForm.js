'use strict';

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  Text,
  TouchableHighlight,
} from 'react-native';

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

export default class RegisterForm extends Component {
  render() {
    return(
      <View>
        <Header
          centerComponent={{ text: '新規登録', style: { color: '#fff' } }}
        />
        <View style={styles.container}>
          <Form
            ref="form"
            type={LoginUser}
            options={options}
          />
          <TouchableHighlight style={styles.button} onPress={() => this.onPress()} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  onPress() {
    var value = this.refs.form.getValue();
    if (value) {
      const password = value.password;
      const email = value.email;
      this.props.registerUser(email, password);
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
