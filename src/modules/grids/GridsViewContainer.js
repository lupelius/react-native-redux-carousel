import { connect } from 'react-redux';
import { compose, withState } from 'recompose';

import GridView from './GridsView';
import { loadData, refreshData, onScroll, loadMoreData } from './GridsState';
import { setHTML, startStopPlaying } from '../profile/DetailState';

export default compose(
  connect(
    state => ({
      isLoading: state.grids.isLoading,
      data: state.grids.data,
      skip: state.grids.skip,
      hasScrolled: state.grids.hasScrolled,
      cryptos: state.grids.cryptos,
      cryptoPrices: state.grids.cryptoPrices,
      searchResults: state.grids.searchResults,
      searchResultIndex: state.grids.searchResultIndex,
      isPlaying: state.detail.isPlaying,
      html: state.detail.html,
    }),
    dispatch => ({
      loadData: (index,tabs) => dispatch(loadData(index,tabs)),
      loadMoreData: (skip,hasScrolled,isLoading,index,tabs) => dispatch(loadMoreData(skip,hasScrolled,isLoading,index,tabs)),
      refreshData: index => dispatch(refreshData(index)),
      onScroll: () => dispatch(onScroll()),
    }),
  ),
  withState('tabIndex', 'setTabIndex', 0),
  withState('tabs', 'setTabs', ['All News','Bitcoin','Ethereum','Ripple', 'Litecoin', 'EOS','Stellar','Cardano']),
)(GridView);
