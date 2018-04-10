import React from 'react';
import {
  TabNavigator,
  StackNavigator,
  SwitchNavigator
} from 'react-navigation';
import { Icon } from 'react-native-elements';

import SignUp from '../screens/SignUp';
import SignIn from '../screens/SignIn';

import ItemListPage from '../screens/ItemListPage';
import DetailItemPage from '../screens/DetailItemPage';
import UserPage from '../screens/UserPage';

export const ItemStack = StackNavigator({
  ItemList: {
    screen: ItemListPage,
    navigationOptions: {
      title: '一覧ページ',
    },
  },
  DetailItem: {
    screen: DetailItemPage,
    navigationOptions: {
      title: '詳細ページ',
    },
  }
});

export const LoggedIn = TabNavigator({
  ListTab: {
    screen: ItemStack,
    navigationOptions: {
      tabBarLabel: '一覧',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
    },
  },
  UserTab: {
    screen: UserPage,
    navigationOptions: {
      tabBarLabel: 'Myページ',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
    },
  }
});

export const NotLoggedIn = StackNavigator({
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: '新規登録',
    },
  },
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: 'ログイン',
    },
  }
});

export const createRootNavigator = (beLoggedIn = false) => {
  return SwitchNavigator(
    {
      NotLoggedIn: {
        screen: NotLoggedIn
      },
      LoggedIn: {
        screen: LoggedIn
      }
    },
    {
      initialRouteName: beLoggedIn ? "LoggedIn" : "NotLoggedIn"
    }
  );
};
