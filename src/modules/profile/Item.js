import React from 'react';
import moment from 'moment';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList
} from 'react-native';

import colors from '../../styles/colors';
import { getHeight, getWidth, capitalizeFirstLetter, imageRandomiser } from '../../utils';

export default class Item extends React.Component {
  render () {
    // eslint-disable-next-line prefer-destructuring
    const item = this.props.item;
    return (
      <View style={{height: getHeight() - 230}}>
        <View style={styles.gridMetaContainer}>
          <View style={{flexDirection: 'row',justifyContent: 'flex-start', alignContent: 'flex-start'}}>
            <Image
              source={item.avatar ? {uri: item.avatar} : imageRandomiser(item.id)}
              style={styles.gridImage10th}
              item={item}
            />
          </View>
        </View>
        <View>
          <View>
            <View>
              <Text style={{...styles.gridBrand, fontSize: this.props.fontSize + 8}}>{capitalizeFirstLetter(`${item.firstName} ${item.lastName}`) }</Text>
              
              <Text style={{...styles.gridTitle, fontSize: this.props.fontSize + 4}}>{item.message}</Text>
              <Text style={{...styles.itemDate, fontSize: this.props.fontSize}}>{ moment(item.timestamp).fromNow() }</Text>
            </View>
          </View>
        </View>
        <View style={styles.gridHr} />
        <Text>
          Other messages by this user:
        </Text>
        <FlatList
          keyExtractor={(_item, index) => index.toString()}
          data={(this.props.messagesByUser)}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={20}
          renderItem={({item, index}) => {
              return (
                <View
                  style={styles.badge}
                  key={index}
                >
                  <Text style={styles.badgeText} numberOfLines={5} >
                    {item.message}
                  </Text>
                </View>
              );
            }
          }
          style={styles.container}
          horizontal
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal:0,
  },
  itemDate: {
    color: colors.grey,
  },
  gridSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gridSubContainer10th: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  posterImage: {
    height: 30,
    width: 30,
    borderRadius: 30,
  },
  gridImage: {
    height: 100,
    width: 100,
    marginLeft: 8,
    borderRadius: 4,
  },
  gridImage10th: {
    height: getWidth(),
    width: getWidth(),
    marginBottom: 8,
    borderRadius: 4,
  },
  gridBrand: {
    paddingVertical:6,
    paddingHorizontal:4,
  },
  gridTitle: {
    paddingHorizontal:6,
    color: 'black'
  },
  gridHr: {
    flex: 1,
    height: 1,
    backgroundColor: '#e3e3e3',
    marginTop: 14,
  },
  gridMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  badge: {
    backgroundColor: '#130eec',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal:2,
    marginVertical:3,
    width: 200,
  },
  badgeText: {
    color: 'white',
    flexWrap: 'wrap',
  }
});
