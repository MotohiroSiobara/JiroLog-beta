'use strict';

import React, { Component } from 'react';
import { firebase, evaluationDbUrl, getCurrentUser } from '../config/firebase';
import { formatDate } from '../functions/formatDate';
import ItemList from '../components/ItemList';

import {
  Text,
  View,
  ActivityIndicator,
  Button,
} from 'react-native';
import { Rating } from 'react-native-elements';

const db = firebase.database();

export default class ItemListPage extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      evaluations: [],
      isLoading: true,
      isAuthenticate: false
    }
  }

  componentWillMount() {
    db.ref(evaluationDbUrl(firebase.auth().currentUser.uid)).on('child_added', snapshot => {
      this.setState({
        evaluations: [
          ...this.state.evaluations,
          {...snapshot.val(), key: snapshot.key}
        ]
      })
    });

    this.setState({ isLoading: false });

    // データベースから削除された時のeventハンドリング
    db.ref(evaluationDbUrl(firebase.auth().currentUser.uid)).on('child_removed', snapshot => {
      this.setState({
        evaluations: this.state.evaluations.filter((ev, index) => {
          return ev.key != snapshot.key
        })
      })
    })
  }

  render() {
    const sortedItems = downSort(this.state.evaluations);

    return (
      <View style={{flex:1}}>
        <View style={{flex: 2}}>
          {this.renderIndicator()}
          <ItemList
            items={sortedItems}
            onPressItem={(evaluation) => this.moveToDetailPage(evaluation)}
            deleteItem={(index) => this.deleteEvaluation(index)}
          />
        </View>
      </View>
    );
  }

  deleteEvaluation(index) {
    const key = this.state.evaluations[index].key
    db.ref(evaluationDbUrl(firebase.auth().currentUser.uid)).child(key).set(null)
  }

  moveToDetailPage(evaluation) {
    this.props.navigation.navigate('DetailItem', { item: evaluation })
  }

  renderIndicator() {
    if(!this.state.isLoading) return null;
    return(
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

const downSort = (assoArray) => {
  const sortedAssoArray = assoArray.sort((a,b) => {
    if(a.date < b.date) return 1;
    if(a.date > b.date) return -1;
    return 0;
  });
  return sortedAssoArray;
}

const mergeKeyToValue = (obj) => {
  return(
    Object.keys(obj).map((key, _) => {
      return { ...obj[key], key }
    })
  )
}
