import statistic from './statistic';
import user from './user';
import info from './info';
import essay from './essay';
import { combineReducers } from 'redux';

export default combineReducers({
  statistic,
  user,
  info,
  essay,
});
