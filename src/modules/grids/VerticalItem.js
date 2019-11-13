import React from 'react';
import moment from 'moment';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import { 
  getWidth, 
  capitalizeFirstLetter,
  imageRandomiser, 
  isRatioXOrMore, 
  getSharePressAction,
} from '../../utils';
import AnimatedView from '../../components/AnimatedView';

export default class VerticalItem extends React.PureComponent {
  render () {
    // eslint-disable-next-line prefer-destructuring
    const item = this.props.item;
    return (
      <AnimatedView wh={widthOfCard} onPress={this.props.onPress} _id={item.id}>
        <View style={styles.container}>
          <View style={styles.gridSubContainer10th}>
            <View style={styles.gridImage10th}>
              <Image
                source={item.avatar ? {uri: item.avatar} : imageRandomiser(item.id)}
                style={{width: widthOfCard, height: 200,}}
                item={item}
              />
            </View>
          </View>
          <Text style={styles.gridTitle} numberOfLines={isRatioXOrMore() ? 3 : 2}>{`${item.firstName} ${item.lastName}`}</Text>
          <Text style={styles.gridDesc} numberOfLines={isRatioXOrMore() ? 3 : 2}>
            {`${item.firstName} said: ${item.message}`}
          </Text>
          <View style={styles.gridMetaContainer}>
            <View style={styles.gridHr} />
          </View>
          <View style={styles.gridMetaContainer}>
            <View style={styles.brandSection}>
              <View style={{flexDirection:'column',height:20,}}>
                <Text style={styles.gridBrand} numberOfLines={1}>{capitalizeFirstLetter(item.email) }</Text>
                <Text style={{...styles.itemDate,marginTop:-7,}} numberOfLines={1} ellipsizeMode='tail'>{ `${moment(item.timestamp).fromNow()}` }</Text>
              </View>
            </View>
            <View style={{...styles.shareContainerV}}>
              <View style={styles.shareContainerH}>
                <TouchableOpacity 
                  onPress={() => getSharePressAction(item)}
                  style={styles.shareArea}
                >
                  <View style={styles.shareButton}>
                    <Image
                      source={require('../../../assets/images/icons/share.png')} 
                      style={styles.icon}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </AnimatedView>
    );
  }
}
const widthOfCard = getWidth()-60;
const styles = StyleSheet.create({
  container: {
    width: widthOfCard,
    alignSelf: 'baseline',
    marginTop:1,
    paddingBottom: 18,
    shadowOffset:{  width: 0,  height: 4,  },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 18,
    backgroundColor: 'white',
    borderRadius: 14,
  },
  itemDate: {
    color: '#666666',
    paddingVertical:7,
    paddingHorizontal:4,
    fontSize: 12,
  },
  gridSubContainer10th: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  posterImage: {
    height: 10,
    width: 10,
    borderRadius: 30,
  },
  gridImageScaledDown: {
    height: widthOfCard - 60,
  },
  gridImageScaledUp: {
    height: widthOfCard,
  },
  gridImage10th: {
    width: widthOfCard,
    height: 200,
    marginBottom: 8,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    overflow: 'hidden',
  },
  gridBrand: {
    fontSize: 12,
    paddingVertical:7,
    paddingHorizontal:4,
  },
  brandSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start', 
    alignContent: 'flex-start',
  },
  gridTitle: {
    fontSize: 20,
    paddingHorizontal: 16,
    color: '#111111',
    marginBottom: 8,
  },
  gridDesc: {
    fontSize: 14,
    lineHeight: 18,
    paddingHorizontal: 16,
    color: '#666666'
  },
  gridMetaContainer: {
    width: widthOfCard,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  gridHr: {
    flex: 1,
    height: 1,
    backgroundColor: '#e3e3e3',
    marginVertical: 5,
  },
  shareContainerV: {
    flexDirection: 'column',
    justifyContent:'space-around',
  },
  shareContainerH: {
    flexDirection: 'row',
    justifyContent:'space-around',
  },
  bookmarkArea: {
    marginRight: 7,
  },
  shareArea: {
    width: 40,
    height: 40,
  },
  shareButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F1F1F1',
    borderRadius: 20,
    paddingVertical:12,
    paddingHorizontal:12,
    width:40,
    height:40,
  },
  icon: {
    width:16,
    height:16,
    marginRight: 8,
    tintColor: '#7A7470'
  },
});
