import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Tile, List, ListItem, Raiting } from 'react-native-elements';

export default class DetailItem extends Component {
  render() {
    const { item } = this.props
    const image = item.image ? item.image : "file:///var/mobile/Containers/Data/Application/9429384A-D46F-4A38-859D-7B98ACC71D9A/Library/Caches/ExponentExperienceData/%2540anonymous%252Fjirolog-ad8dd64a-dcde-4c1a-bbac-21426834bb45/ImagePicker/6DA81E26-0B64-425D-92AF-A77863522079.jpg";

    return(
      <ScrollView>
        <Tile
          imageSrc={{ uri: image }}
          featured
          title={item.shopName}
          caption={item.date}
        />

        <List>
          <ListItem
            title="店名"
            rightTitle={item.shopName}
            hideChevron
          />
        </List>

        <List>
          <ListItem
            title="日付"
            rightTitle={item.date}
            hideChevron
          />
        </List>

        <List>
          <ListItem
            title="豚"
            rightTitle={String(item.pigPoint)}
            hideChevron
          />
        </List>

        <List>
          <ListItem
            title="麺"
            rightTitle={String(item.noodlePoint)}
            hideChevron
          />
        </List>

        <List>
          <ListItem
            title="スープ"
            rightTitle={String(item.soupPoint)}
            hideChevron
          />
        </List>

        <List>
          <ListItem
            title="トータル"
            rightTitle={String(item.totalPoint)}
            hideChevron
          />
        </List>
      </ScrollView>
    )
  }
}
