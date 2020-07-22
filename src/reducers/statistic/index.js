import {
  COUNT_CONTESTANTS_BY_SEARCH,
  COUNT_EXAM_TURN_BY_SEARCH,
  GET_END_DATE,
  GET_INPUT_BY_SEARCH,
  GET_START_DATE,
  SEARCH_BY_CONTESTANTS,
  SELECT_MONTH,
  SELECT_TYPE,
  TOTAL_RECENTLY,
  TOTALS,
} from 'actions/statistic';
import moment from 'moment';

const initialState = {
  currentMonth: moment().month() + 1,
  currentType: 'day',
  totalPrivate: 0,
  totalFailed: 0,
  total: 0,
  totalRecently: 0,
  totalPublic: 0,
  totalBoth: 0,
  countExamTurn: 0,
  search: '',
  start_date: '01/04/2020',
  end_date: moment().format('DD/MM/YYYY'),
  countContestant: 0,
  searchContestant: '',
};

export default function statisticReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_MONTH:
      return Object.assign({}, state, {
        currentMonth: action.month,
      });
    case SELECT_TYPE:
      return Object.assign({}, state, {
        currentType: action.types,
      });

    case TOTAL_RECENTLY:
      return Object.assign({}, state, {
        totalRecently: action.totalRecently,
      });
    case TOTALS:
      return Object.assign({}, state, {
        total: action.total,
        totalPublic: action.totalPublic,
        totalPrivate: action.totalPrivate,
        totalBoth: action.totalBoth,
        totalFailed: action.totalFailed,
      });
    case COUNT_EXAM_TURN_BY_SEARCH:
      return Object.assign({}, state, {
        countExamTurn: action.countExamTurn,
      });
    case GET_INPUT_BY_SEARCH:
      return Object.assign({}, state, {
        search: action.search,
      });
    case SEARCH_BY_CONTESTANTS:
      return Object.assign({}, state, {
        searchContestant: action.searchContestant,
      });
    case COUNT_CONTESTANTS_BY_SEARCH:
      return Object.assign({}, state, {
        countContestant: action.countContestant,
      });
    case GET_START_DATE:
      return Object.assign({}, state, {
        start_date: action.start_date,
      });
    case GET_END_DATE:
      return Object.assign({}, state, {
        end_date: action.end_date,
      });
    default:
      return state;
  }
}
