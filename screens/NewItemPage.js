import React, { Component } from 'react';
import firebase from '../config/firebase';
import Evaluation from '../components/Evaluation';
import { formatDate } from '../functions/formatDate';

export default class NewItemPage extends Component<{}> {
  render() {
    return(
      <Evaluation save={(evaluation) => this.saveEvaluation(evaluation)} />
    )
  }

  saveEvaluation(evaluation) {
    firebase.database().ref(firebase.auth().currentUser.uid + '/evaluations').push({
      shopName:    evaluation.shopName,
      pigPoint:    evaluation.pigPoint,
      noodlePoint: evaluation.noodlePoint,
      soupPoint:   evaluation.soupPoint,
      totalPoint:  evaluation.totalPoint,
      date:        formatDate(evaluation.date, 'yyyy/MM/dd'),
      image:       evaluation.image
    });

    this.props.navigation.goBack();
  }
}
