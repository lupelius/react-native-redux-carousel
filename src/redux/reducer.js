import { combineReducers } from 'redux';

import grids from '../modules/grids/GridsState';
import detail from '../modules/profile/DetailState';

export default combineReducers({
  grids,
  detail,
});
