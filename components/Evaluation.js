import React, { Component } from 'react';
import { Rating } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
//import CustomDatePicker from './CustomDatePicker';
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

export default class EvaluationPage extends Component<{}> {
  constructor(props) {
    super(props)
    this.state = {
      shopName: "三田本店",
      pigPoint: 0,
      noodlePoint: 0,
      soupPoint: 0,
      totalPoint: 0,
      date: new Date(),
      image: '',
    }
  }

  render() {
    const shopNameList = ["三田本店", "目黒店", "仙川店", "歌舞伎町店", "品川店", "新宿小滝橋通り店", "環七新代田店", "八王子野猿街道店2", "池袋東口店", "新小金井街道店", "亀戸店", "京急川崎店", "府中店", "松戸駅前店", "めじろ台法政大学前店", "荻窪店", "上野毛店", "京成大久保店", "環七一之江店", "相模大野店", "横浜関内店", "神田神保町店", "小岩店", "ひばりヶ丘駅前店", "桜台駅前店", "栃木街道店", "立川店", "大宮店　-閉店-", "千住大橋駅前店", "茨城守谷店", "湘南藤沢店", "西台駅前店", "中山駅前店", "新橋店", "仙台店", "赤羽店　-閉店-", "札幌店", "会津若松駅前店", "JR西口蒲田店", "新潟店", "川越店", "京都店"]

    return(
      <ScrollView style={styles.view}>
        <PickerIOS
          style={styles.picker}
          selectedValue={this.state.shopName}
          onValueChange={(itemValue, itemIndex) => this.setState({shopName: itemValue})}>
          {shopNameList.map((name, index) => {
            return(<PickerIOS.Item label={name} value={name} key={name} />)
          })}
        </PickerIOS>

        <DatePickerIOS
          mode='date'
          locale='ja'
          date={this.state.date}
          onDateChange={(newDate) => this.setDate(newDate)}
        />
    
        <CustomDatePicker />
        <View style={styles.rowView}>
          <Text style={styles.label}>豚</Text>
          <Rating
            type="star"
            fractions={0}
            startingValue={this.state.pigPoint}
            imageSize={40}
            onFinishRating={(rating) => this.ratingCompletedByPig(rating)}
            style={{ paddingVertical: 10 }}
          />
        </View>

        <View style={styles.rowView}>
          <Text style={styles.label}>麺</Text>
          <Rating
            type="star"
            fractions={0}
            startingValue={this.state.noodlePoint}
            imageSize={40}
            onFinishRating={(rating) => this.ratingCompletedByNoodle(rating)}
            style={{ paddingVertical: 10 }}
          />
        </View>

        <View style={styles.rowView}>
          <Text style={styles.label}>スープ</Text>
          <Rating
            type="star"
            fractions={0}
            startingValue={this.state.soupPoint}
            imageSize={40}
            onFinishRating={(rating) => this.ratingCompletedBySoup(rating)}
            style={{ paddingVertical: 10 }}
          />
        </View>

        <View style={styles.rowView}>
          <Text style={styles.label}>トータル</Text>
          <Rating
            type="star"
            fractions={0}
            startingValue={this.state.totalPoint}
            imageSize={40}
            onFinishRating={(rating) => this.ratingCompletedByTotal(rating)}
            style={{ paddingVertical: 10 }}
          />
        </View>
        <View style={styles.rowView}>
          {this.state.image ? (
            <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} />
        ) : (
          <Button title='写真を登録する' onPress={() => this.submitPicture()}></Button>
          )}
        </View>
        <Button
          onPress={(e) => this.saveEvaluate(e)}
          title="評価する"
          color="#ff0000"
          accessibilityLabel="Learn more about this purple button"
        />
      </ScrollView>
    )
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

  renderImage() {
    if(this.state.image) {
      return(
        <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} />
      )
    }
    return null;
  }

  async camera() {
    let result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  }

  async pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  }

  saveEvaluate(e) {
    this.props.save(this.state)
  }

  ratingCompletedByPig(rating) {
    this.setState({ pigPoint: rating })
  }

  ratingCompletedByNoodle(rating) {
    this.setState({ noodlePoint: rating })
  }

  ratingCompletedBySoup(rating) {
    this.setState({ soupPoint: rating })
  }

  ratingCompletedByTotal(rating) {
    this.setState({ totalPoint: rating })
  }

  setDate(newDate) {
    this.setState({ date: newDate })
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
  },
  columnView: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
  },
  rowView: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
  },
  label: {
    height: 50,
    width: 100,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'justify',
  },
});
