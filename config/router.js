import React from 'react';
import {
  TabNavigator,
  StackNavigator,
  SwitchNavigator
} from 'react-navigation';
import { Icon } from 'react-native-elements';

import LogoutButton from '../components/LogoutButton';
import UserPage from '../screens/UserPage';
import AuthenticatePage from '../screens/AuthenticatePage';
import RoutePage from '../screens/RoutePage';

import SignUp from '../screens/SignUp';
import SignIn from '../screens/SignIn';

import ItemListPage from '../screens/ItemListPage';
import DetailItemPage from '../screens/DetailItemPage';


export const ItemStack = StackNavigator({
  ItemList: {
    screen: ItemListPage,
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
});

export const NotLoggedIn = StackNavigator({
  SignUp: {
    screen: SignUp,
  },
  SignIn: {
    screen: SignIn
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
