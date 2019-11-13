/* eslint-disable no-unused-vars */
import React from 'react';
import { View,StyleSheet,Text } from 'react-native';
import LogoLoader from './LogoLoader';
import moment from 'moment';
import { isRatioXOrMore } from '../../utils';

export default React.memo(({
  isLoading,
}) => (
  <View style={styles.topShelfWrapper}>
    <View style={styles.topShelf}>
      <LogoLoader isLoading={isLoading} />
      <Text>{moment().format("DD MMMM YYYY").toString()}</Text>
    </View>
  </View>
));

const styles = StyleSheet.create({
  topShelfWrapper: {
    height:isRatioXOrMore() ? 92 - 14 : 92 - 28,
    paddingHorizontal: 22,
    paddingVertical: isRatioXOrMore() ? 18 : 4,
  },
  topShelf: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

