'use strict';
import React, { Component } from 'react';
import { Card, Button, Text, FormLabel, FormInput } from "react-native-elements";
import ImagePicker from 'react-native-image-picker';
import { firebase, userDbUrl, getCurrentUser } from '../config/firebase';
const dismissKeyboard = require('react-native-dismiss-keyboard');

import {
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity
} from 'react-native';

export default class UserPage extends Component<{}> {
  constructor(props) {
    super(props);
    const { name, shopName, image } = this.props.navigation.state.params;
    this.state = {
      name,
      shopName,
      image
    }
  }

  render() {
    return (
      <TouchableOpacity 
        style={{ paddingVertical: 20, flex: 1 }} 
        onPress={() => dismissKeyboard() }
        underlayColor=""
      >
        <KeyboardAvoidingView behavior="position">
          <Card title="プロフィール編集">
            <View style={{ marginTop: 10 }}>
              {this.state.image ? (
                <View>
                  <Image
                  source={{uri: this.state.image}}
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
                  <Button title='写真を変更する' onPress={() => this.submitPicture()}></Button>
                </View>
              ) : (
                <Button title='写真を登録する' onPress={() => this.submitPicture()}></Button>
              )}
            </View>
            <FormLabel>名前</FormLabel>
            <FormInput placeholder='名前を入力' onChangeText={(text) => this.setState( { name: text })} value={this.state.name} />
            <FormLabel>好きな店舗</FormLabel>
            <FormInput placeholder='名前を入力' onChangeText={(text) => this.setState( { shopName: text })} value={this.state.shopName} />
            <Button
              buttonStyle={{ marginTop: 20 }}
              backgroundColor="#03A9F4"
              title="更新"
              onPress={() => this.save() }
            />
          </Card>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    );
  }

  async save() {
    dismissKeyboard();
    // uidで特定のuserを更新(ログイン時に作成しておく)
    const { image, name, shopName } = this.state;
    await firebase.database().ref(userDbUrl(getCurrentUser().uid)).set({
      name: name,
      image: image,
      shopName: shopName
    });

    await this.props.navigation.goBack();
  }

  submitPicture() {
    var options = {
      title: '写真を登録する',
      takePhotoButtonTitle: '写真を撮る',
      chooseFromLibraryButtonTitle: 'ライブラリから選択する',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
      }
      else if (response.error) {
      }
      else if (response.customButton) {
      }
      else {
        this.setState({
          image: response.uri
        });
      }
    });
  }
}
