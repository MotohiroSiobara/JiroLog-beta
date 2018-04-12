'use strict';

import React, { Component } from 'react';
import { formatDate } from '../functions/formatDate';
import Swipeout from 'react-native-swipeout';
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  FlatList,
  Text,
} from 'react-native';
import { Rating } from 'react-native-elements';

export default class ItemList extends Component<{}> {
  _keyExtractor = (item, index) => index.toString();

  _renderItem = ({item, index}) => (
    <ListItem
      item={item}
      index={index}
      onPressItem={(index) => this.onPressItem(index, item)}
      deleteItem={(index) => this.props.deleteItem(index)}
    />
  );

  render() {
    return (
      <FlatList
        style={{ marginTop: 20 }}
        data={this.props.items}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }

  onPressItem = (index, item) => {
    this.props.onPressItem(item);
  };
}

class ListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.index);
  }

  render() {
    const item = this.props.item;
    const image = item.image ? item.image : "http://2.bp.blogspot.com/-09XFbYdTmLs/VwIgXThmQWI/AAAAAAAA5bg/3TdIOG1frrEsHFWOGi5GTqD4X5k8qrxJQ/s800/ramen_moyashi.png"

    return (
      <Swipeout right={[{text: 'delete', onPress: () => this.props.deleteItem(this.props.index), backgroundColor: 'red'}]} backgroundColor='white' autoClose={true}>
        <TouchableHighlight
          onPress={this._onPress}
          underlayColor='#dddddd'>
          <View>
            <View style={styles.rowContainer}>
              <Image style={styles.thumb} source={{ uri: image }} />
              <View style={styles.textContainer}>
                <Text style={styles.shopName}>{item.shopName}</Text>
                <Rating
                  type="star"
                  readonly
                  startingValue={item.totalPoint}
                  imageSize={20}
                  onFinishRating={(rating) => this.ratingCompletedByTotal(rating)}
                  style={{ paddingVertical: 10 }}
                />
                <Text>{item.date}</Text>
              </View>
            </View>
            <View style={styles.separator}/>
          </View>
        </TouchableHighlight>
      </Swipeout>
    );
  }
}

const styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  shopName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
});
