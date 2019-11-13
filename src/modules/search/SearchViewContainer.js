// @flow
import { connect } from 'react-redux';
import { compose } from 'recompose';

import SearchView from './SearchView';
import { loadsearchResultsData, changeSearchResult, clearSearchResultsLoaded } from '../grids/GridsState';

export default compose(
  connect(
    state => ({
      isLoading: state.grids.isLoading,
      searchResults: state.grids.searchResults,
    }),
    dispatch => ({
      loadsearchResultsData: search => dispatch(loadsearchResultsData(search)),
      changeSearchResult: index => dispatch(changeSearchResult(index)),
      clearSearchResultsLoaded: () => dispatch(clearSearchResultsLoaded()),
    }),
  ),
)(SearchView);
