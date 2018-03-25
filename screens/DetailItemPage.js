import React, { Component } from 'react';
import { Rating } from 'react-native-elements';
import DetailItem from '../components/DetailItem';
import {
  View,
  Text,
} from 'react-native';

export default class DetailItemPage extends Component {
  render() {
    const { item } = this.props.navigation.state.params

    return(
      <View style={{flex:1}}>
        <View style={{flex: 2}}>
          <DetailItem item={item} />
        </View>
      </View>
    )
  }
}
