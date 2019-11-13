/* eslint-disable no-unused-vars */
import React from 'react';
import { StyleSheet,Text,Image } from 'react-native';

export default React.memo(({
  isLoading,
}) => (
  <>
    {
      isLoading ? (
        <Text>Loading...</Text>
        ) : (
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.posterImage}
        />
    )}
  </>
));

const styles = StyleSheet.create({
  posterImage: {
    width: 99,
    height: 23,
  },
  gif: {
    width: 80,
    height: 80,
    position: 'absolute',
    top: -15.89,
    bottom: 0,
    left: -15.6,
    right: 0,
  },
});