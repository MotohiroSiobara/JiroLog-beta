import React from 'react';
import { Icon } from 'react-native-elements';
import {
  TabNavigator,
  StackNavigator,
  SwitchNavigator
} from 'react-navigation';

import SignUp from '../screens/SignUp';
import SignIn from '../screens/SignIn';

import ItemListPage from '../screens/ItemListPage';
import DetailItemPage from '../screens/DetailItemPage';
import NewItemPage from '../screens/NewItemPage';
import UserPage from '../screens/UserPage';
import EditUserPage from '../screens/EditUserPage';
import ChartPage from '../screens/ChartPage';

// グラフページ
export const ChartStack = StackNavigator({
  ItemList: {
    screen: ChartPage,
    navigationOptions: ({ navigation }) => ({
      title: 'グラフページ'
    }),
  },
});


// ItemListページ
export const ItemStack = StackNavigator({
  ItemList: {
    screen: ItemListPage,
    navigationOptions: ({ navigation }) => ({
      title: '一覧ページ',
      headerRight: (
        <Icon name="add" size={35} onPress={() => navigation.navigate('NewItem')} />
      )
    }),
  },
  DetailItem: {
    screen: DetailItemPage,
    navigationOptions: {
      title: '詳細ページ',
    },
  },
  NewItem: {
    screen: NewItemPage,
    navigationOptions: {
      title: '新規登録',
    },
  }
});

export const UserStack = StackNavigator({
  Profile: {
    screen: UserPage,
    navigationOptions: {
      title: 'Myページ',
    },
  },
  EditProfile: {
    screen: EditUserPage,
    navigationOptions: {
      title: 'プロフィール編集',
    },
  },
});

export const LoggedIn = TabNavigator({
  ChartTab: {
    screen: ChartStack,
    navigationOptions: {
      tabBarLabel: 'グラフ',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
    },
  },
  ListTab: {
    screen: ItemStack,
    navigationOptions: {
      tabBarLabel: '一覧',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
    },
  },
  UserTab: {
    screen: UserStack,
    navigationOptions: {
      tabBarLabel: 'Myページ',
      tabBarIcon: ({ tintColor }) => <Icon name="face" size={35} color={tintColor} />,
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
        screen: LoggedIn,
        navigationOptions: {
          title: 'グラフページ',
        },
      }
    },
    {
      initialRouteName: beLoggedIn ? "LoggedIn" : "NotLoggedIn"
    }
  );
};
