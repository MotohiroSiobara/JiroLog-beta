import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Image,
  ImageBackground
} from 'react-native';
import { createRootNavigator } from './config/router';
import firebase from './config/firebase';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { beLoggedIn: false };
    firebase.auth().signOut();
    firebase.auth().onAuthStateChanged((user) => {
      console.warn(user);
      if (user) {
        this.setState({ beLoggedIn: true });
      } else {
        this.setState({ beLoggedIn: false });
      }
    });
  }

  render() {
    const Root = createRootNavigator(this.state.beLoggedIn);
    return (
      <View style={{flex: 1}}>
        <Root />
      </View>
    );
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
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
});
