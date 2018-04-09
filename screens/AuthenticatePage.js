import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';

import ItemListPage from '../screens/ItemListPage';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import firebase from '../config/firebase';

const pageType = { register: 'Register', login: 'Login' };
export default class AuthenticatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageType: null
    };
  }

  render() {
    return (
      <ImageBackground
        source={require('../images/jiro-1888644_640.jpg')}
        style={styles.backgroundImage}>
        {this.state.pageType == pageType.register ? (
          <View>
            <RegisterForm registerUser={(email, password) => this.props.registerUser(email, password)} />
            {this.renderLink(pageType.login)}
          </View>
        ) : (
          <View>
            <LoginForm loginUser={(email, password) => this.props.loginUser(email, password)} />
            {this.renderLink(pageType.register)}
          </View>
        )}
        <Text
          style={{color: 'blue'}}
          onPress={() => this.props.loginUser('example.2@docomo.ne.jp', 'password')}>
          テストログイン
        </Text>
      </ImageBackground>
    );
  }

  renderLink(pageTypeVal) {
    return(
        <TouchableHighlight style={styles.button} onPress={() => this.setState({ pageType: pageTypeVal })} underlayColor='#99d9f4'>
          <Text
            style={styles.buttonText}
          >
            {pageTypeVal == pageType.register ? '新規登録する' : 'ログインする'}
          </Text>
        </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingLeft: 20,
    backgroundColor: '#ffffff',
  },
  button: {
    height: 18,
    width: 100,
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
  buttonText: {
    fontSize: 12,
    color: 'white',
    alignSelf: 'center'
  },
});
