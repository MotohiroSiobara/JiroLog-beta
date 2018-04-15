import React, { Component } from 'react';
import firebase from '../config/firebase';
import Evaluation from '../components/Evaluation';
import { formatDate } from '../functions/formatDate';

const db = firebase.database();
const ref = db.ref('evaluations');

export default class NewItemPage extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      evaluations: [],
      isLoading: true,
      isOpen: false,
      isAuthenticate: false
    }
  }

  componentWillMount() {
    // データベースに追加された時のeventハンドリング
    db.ref(firebase.auth().currentUser.uid + '/evaluations').on('child_added', snapshot => {
      this.setState({
        evaluations: [
          ...this.state.evaluations,
          {...snapshot.val(), key: snapshot.key}
        ]
      })
    });

    this.setState({ isLoading: false });

    // データベースから削除された時のeventハンドリング
    db.ref(firebase.auth().currentUser.uid + '/evaluations').on('child_removed', snapshot => {
      this.setState({
        evaluations: this.state.evaluations.filter((ev, index) => {
          return ev.key != snapshot.key
        })
      })
    })
  }

  render() {
    return(
      <Evaluation save={(evaluation) => this.saveEvaluation(evaluation)} />
    )
  }

  saveEvaluation(evaluation) {
    this.evaluationDBRef().push({
      shopName:    evaluation.shopName,
      pigPoint:    evaluation.pigPoint,
      noodlePoint: evaluation.noodlePoint,
      soupPoint:   evaluation.soupPoint,
      totalPoint:  evaluation.totalPoint,
      date:        formatDate(evaluation.date, 'yyyy/MM/dd'),
      image:       evaluation.image
    });

    this.props.navigation.navigate('ItemList');
  }

  evaluationDBRef() {
    return db.ref(firebase.auth().currentUser.uid + '/evaluations');
  }
}
