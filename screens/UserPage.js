'use strict';

import React, { Component } from 'react';
import firebase from '../config/firebase';
import { Card, Button, Text } from "react-native-elements";
import Indicator from '../components/Indicator';

import {
  View,
  Image,
  ActivityIndicator
} from 'react-native';

export default class UserPage extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      shopName: '',
      image: '',
      isLoading: true
    }
  }

  componentWillMount() {
    firebase.database().ref('users/' + firebase.auth().currentUser.uid).on('value', (snapshot) => {
      const { name, shopName, image } = snapshot.val();
      this.setState({
        name: name,
        shopName: shopName,
        image: image,
        isLoading: false
      });
    });
  }

  render() {
    const { name, shopName, image, isLoading } = this.state

    if (isLoading) {
      return <Indicator />
    }

    return (
      <View style={{ paddingVertical: 20 }}>
        <Card title={name}>
          <Image
            source={{ uri: image }}
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 80,
              height: 80,
              borderRadius: 40,
              alignSelf: "center",
              marginBottom: 20
            }}
          />
          <Button
            style={{ marginBottom: 10}}
            backgroundColor="#03A9F4"
            title="プロフィールを編集する"
            onPress={() => this.props.navigation.navigate('EditProfile', { name, shopName, image })}
          />
          <Button
            backgroundColor="#03A9F4"
            title="サインアウト"
            onPress={() => this.logout()}
          />
        </Card>
      </View>
    );
  }

  logout() {
    this.setState({ isLoading: true });
    firebase.auth().signOut().then(() => {
      this.setState({ isLoading: false });
    }).catch(function(error) {
    });
  }
}
