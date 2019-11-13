import React from 'react';
import { Image, View, Text } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import GridsScreen from '../grids/GridsViewContainer';
import Detail from '../profile/DetailViewContainer';
import SearchDetail from '../search/SearchViewContainer';

const stackNavigator = createStackNavigator(
  {
    Main: {
      screen: MainTabNavigator,
      navigationOptions: {
        header:null,
      },
    },
    News: {
      screen: GridsScreen,
      navigationOptions: {
        title: 'News',
      },
    },
    Profile: {
      screen: Detail,
      navigationOptions: {
        header: null,
      },
    },
    Search: {
      screen: SearchDetail,
      navigationOptions: {
        header: null,
      }
    },
  },
);

export default createAppContainer(stackNavigator);
