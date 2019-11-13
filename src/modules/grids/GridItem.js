import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import VerticalItem from './VerticalItem';

const GridItem = React.memo(({
  i,
  _openArticle,
}) => (
  <View style={styles.wrapper}>
    <View style={{...styles.shareContainerV, flex:1}}>
      <View style={styles.shareContainerH}>
        <View style={styles.gridContainer}>
          <VerticalItem 
            item={i}
            onPress={() => _openArticle(i)}
          />
        </View>
      </View>
    </View>
  </View>
))
export default GridItem;

const styles = StyleSheet.create({
    wrapper: {
      flex:1,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    gridContainer: {
      backgroundColor: 'white',
      paddingVertical: 6,
    },
    shareContainerV: {
      flexDirection: 'column',
      justifyContent:'space-around',
    },
    shareContainerH: {
      flexDirection: 'row',
      justifyContent:'space-around',
    },
});
