/* eslint-disable import/no-unresolved */
import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';

import colors from '../../styles/colors';

import GridsScreen from '../grids/GridsViewContainer';
import SearchScreen from '../search/SearchViewContainer';


const iconHome = require('../../../assets/images/tabbar/news.png');
const iconSearch = require('../../../assets/images/tabbar/search.png');

const styles = StyleSheet.create({
  tabBarItemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  tabBarIcon: {
    width: 20,
    height: 20,
  },
  tabBarIconFocused: {
    tintColor: colors.primary,
  },
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 70,
  },
});

export default createBottomTabNavigator(
  {
    News: {
      screen: GridsScreen,
      navigationOptions: {
        header: null,
      },
    },
    Search: {
      screen: SearchScreen,
      navigationOptions: null,
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      // eslint-disable-next-line react/prop-types
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconSource;
        switch (routeName) {
          case 'News':
            iconSource = iconHome;
            break;
          case 'Search':
            iconSource = iconSearch;
            break;
          default:
            iconSource = iconComponents;
        }
        return (
          <View style={styles.tabBarItemContainer}>
            <Image
              resizeMode="contain"
              source={iconSource}
              style={[styles.tabBarIcon, focused && styles.tabBarIconFocused]}
            />
          </View>
        );
      },
    }),
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: '#F6F6F2',
        color: '#7A7470'
      },
      labelStyle: {
        color: '#7A7470',
        marginTop: 4,
      },
    },
  },
);
