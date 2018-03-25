import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import ItemListPage from '../screens/ItemListPage';
import DetailItemPage from '../screens/DetailItemPage';

export const ItemRoute = StackNavigator({
  ItemList: {
    screen: ItemListPage,
    navigationOptions: {
      title: '評価一覧',
    },
  },
  DetailItem: {
    screen: DetailItemPage,
    navigationOptions: {
      title: '詳細ページ',
    },
  },
});

export const Tabs = TabNavigator({
  ListTab: {
    screen: ItemRoute,
    navigationOptions: {
      tabBarLabel: '一覧',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
    },
  },
});

export const Root = StackNavigator({
  Tabs: {
    screen: Tabs,
  },
  ItemList: {
    screen: ItemRoute,
  },
}, {
  headerMode: 'none',
});
