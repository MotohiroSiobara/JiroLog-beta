import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Root } from './config/router';
console.ignoredYellowBox = ['Remote debugger'];

export default class App extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Root />
      </View>
    );
  }
}

const styles = StyleSheet.create({
});
