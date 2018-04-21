'use strict';

import React, { Component } from 'react';
import firebase from '../config/firebase';
import { Card, Button, Text } from "react-native-elements";

import {
  View,
} from 'react-native';

export default class UserPage extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = { count: 0 } // 再レンダリングを促したい場合のためのstate
  }

  render() {
    return (
      <View style={{ paddingVertical: 20 }}>
        <Card title="User Name">
          <View
            style={{
              backgroundColor: "#bcbec1",
              alignItems: "center",
              justifyContent: "center",
              width: 80,
              height: 80,
              borderRadius: 40,
              alignSelf: "center",
              marginBottom: 20
            }}
          >
            <Text style={{ color: "white", fontSize: 28 }}>JD</Text>
          </View>
          <Button
            style={{ marginBottom: 10}}
            backgroundColor="#03A9F4"
            title="プロフィールを編集する"
            onPress={() => this.props.navigation.navigate('EditProfile')}
          />
          <Button
            backgroundColor="#03A9F4"
            title="SIGN OUT"
            onPress={() => this.logout()}
          />
        </Card>
      </View>
    );
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this.setState({ count: this.state.count + 1 });
    }).catch(function(error) {
      // An error happened.
    });
  }
}
