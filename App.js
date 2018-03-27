import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Root } from './config/router';
import RegisterForm from './components/RegisterForm';
console.ignoredYellowBox = ['Remote debugger'];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLogin: false };
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.state.isLogin ? (<Root />) : (<RegisterForm />)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
});
