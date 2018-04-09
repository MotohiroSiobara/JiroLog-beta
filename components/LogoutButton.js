import React, { Component } from 'react';
import { Button } from 'react-native';

import firebase from '../config/firebase';

export default class LogoutButton extends Component {
  render() {
    return(
      <Button>サインアウト</Button>
    )
  }
}
