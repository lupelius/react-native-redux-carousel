import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  StatusBar,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SearchBar, Icon } from 'react-native-elements';
import { getWidth, getHeight, debounced/* , throttled */ } from '../../utils';

export default class SearchView extends React.Component {
  state = {
    search: '',
  };

_debounced = debounced(this.props.loadsearchResultsData,600);

  componentDidMount() {
    this.props.changeSearchResult(-1);
    this.props.clearSearchResultsLoaded();
  }

  componentWillUnmount() {
    this.props.clearSearchResultsLoaded();
  }

  updateSearch = search => {
    this.setState({ search });
    this.props.loadsearchResultsData(search);
    if (search.length > 2) {
      // api call to get tags
      this._debounced(search);
    }
  };

  render() {
    const { search } = this.state;
    
    return (
      <View style={[styles.container,]}>
        <StatusBar hidden />
        <View
          style={styles.topButtonContainer}
        >
          <Icon 
            reverse
            name='close'
            type='material'
            color='#666666'
            backgroundColor='black'
            style={styles.closeButton}
            light={false}
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
        <SearchBar
          platform={Platform.OS}
          placeholder="Search emails..."
          containerStyle={{ backgroundColor: "white" }}
          inputContainerStyle={{ backgroundColor: "white", }}
          leftIconContainerStyle={{display:'none'}}
          inputStyle={styles.searchBar}
          placeholderTextColor='#666666'
          onChangeText={/* throttled( */this.updateSearch/* ,600) */}
          value={search}
          showLoading={this.props.isLoading}
        />
        <FlatList
          keyExtractor={(_item, index) => index.toString()}
          data={(this.props.searchResults || [])}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <Text
              style={styles.text}
            >
              {item.email}
            </Text>
          )}

        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: 'space-between',
    height: getHeight(),
    width: getWidth(),
  },
  item: {
    textAlign: 'left',
    paddingVertical: 16,
    width: getWidth()-56,
  },
  closeButton: {
    marginRight: 22,
  },
  searchBar: {
    height:40, 
    fontSize:30,
    width: getWidth() - 33,
  },
  text: {
    color: '#666666',
    fontSize: 24,
    lineHeight: 34,
  },
  topButtonContainer: {
    flexDirection: 'row',
    height:60,
    width:getWidth() - 32,
    justifyContent: 'flex-end',
  }
});
