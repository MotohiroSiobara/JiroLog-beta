'use strict';

import React, { Component } from 'react';
import firebase from '../config/firebase';

import {
  Text,
  View,
  ActivityIndicator,
  Button,
} from 'react-native';

export default class ItemListPage extends Component<{}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex:1}}>
        <Button title='ログアウト' onPress={() => this.logout()} style={{ marginTop: 50 }} />
      </View>
    );
  }

  logout() {
    console.warn("click");
    firebase.auth().signOut().then(function() {
      console.warn('aa');
    }).catch(function(error) {
      // An error happened.
    });
  }
}
