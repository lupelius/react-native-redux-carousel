/* eslint-disable no-unused-expressions */
import React from 'react';

import {
  StyleSheet,
  SafeAreaView,
  Text,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import GridItem from './GridItem';
import colors from '../../styles/colors';
import { getWidth } from '../../utils';
import GridsHeader from '../../components/header/GridsHeader';
const staticButtons = ['All News'];

export default class GridsScreen extends React.PureComponent {
  componentDidMount() {
    this.props.loadData(this.props.tabIndex, this.props.tabs);
    // eslint-disable-next-line no-unused-expressions
  }
  
  _openArticle = article => {
    this.props.navigation.navigate({
      routeName: 'Profile',
      params: { ...article },
    });
  };
  
  // eslint-disable-next-line no-unused-vars
  renderItem = ({ item, index }) => (
    <GridItem 
      i={item} 
      index={index} 
      _openArticle={this._openArticle}
    />
  );

  render() {
    const groupedData = (this.props.data || []);

    return (
      <SafeAreaView style={styles.container}>
        <GridsHeader
          isLoading={this.props.isLoading}
          staticButtons={staticButtons}
        />
        { groupedData.length === 0 && !this.props.isLoading &&
          (
            <Text style={styles.emptyMessage}>
              No messages...
            </Text>
          )
        }
        <Carousel
          ref={(c) => { this._carousel = c; }}
          style={{ backgroundColor: colors.white}}
          data={groupedData}
          scrollEndDragDebounceValue={0}
          renderItem={this.renderItem}
          refreshing={this.props.isLoading}
          onRefresh={() => this.props.refreshData(this.props.tabIndex)}
          onScroll={this.props.onScroll}
          onEndReached={() => groupedData.length > 9 && this.props.loadMoreData(
            this.props.skip,
            this.props.hasScrolled,
            this.props.isLoading,
            this.props.tabIndex,
            this.props.tabs
            )}
          onEndReachedThreshold={0.9}
          removeClippedSubviews
          sliderWidth={getWidth()}
          itemWidth={getWidth()-60}
          refreshControl={
            <></>
          }
          extraData={this.props}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent:'space-between',
  },
  emptyMessage: {
    fontSize:20,
    height:100,
    width:getWidth()-100,
    marginVertical:getWidth() - 100,
    marginHorizontal:50
  }
});
