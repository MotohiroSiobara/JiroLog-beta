'use strict';

import React, { Component } from 'react';
import { formatDate } from '../functions/formatDate';
import {
  View,
  ActivityIndicator
} from 'react-native';

export default class ItemList extends Component<{}> {
  render() {
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size='large' />
      </View>
    );
  }
}
