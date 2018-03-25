import React, { Component } from 'react';
import { Rating } from 'react-native-elements';
// import { ImagePicker } from 'expo';

import {
  StyleSheet,
  PickerIOS,
  View,
  Text,
  DatePickerIOS,
  TextInput,
  ScrollView,
  Button,
  Image,
} from 'react-native';
import firebase from '../config/firebase';
import { formatDate } from '../functions/formatDate';
import Evaluation from './Evaluation';
import Modal from 'react-native-modalbox';

const db = firebase.database();
const ref = db.ref('evaluations');

export default class ModalEvaluation extends Component<{}> {
  render() {
    return(
      <Modal
        ref={'evalModal'}
        style={{}}
        isOpen={this.props.isOpen}
        onClosed={() => this.props.closeModal()}
        swipeArea={20}
       >
         <Evaluation save={(evaluation) => this.props.save(evaluation)} />
      </Modal>
    )
  }
}
