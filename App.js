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
import { firebase } from './config/firebase';
import Indicator from './components/Indicator';

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = { beLoggedIn: false, isLoading: true };

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ beLoggedIn: true, isLoading: false });
      } else {
        this.setState({ beLoggedIn: false, isLoading: false });
      }
    });
  }

  render() {
    const { isLoading, beLoggedIn } = this.state;

    if (isLoading) {
      return <Indicator />
    }

    const Root = createRootNavigator(beLoggedIn);
    return (
      <Root />
    );
  }
}