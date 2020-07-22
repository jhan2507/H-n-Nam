export const SELECT_MONTH = 'SELECT_MONTH';
export const SELECT_TYPE = 'SELECT_TYPE';
export const TOTAL = 'TOTAL';
export const TOTAL_RECENTLY = 'TOTAL_RECENTLY';
export const COUNT_EXAM_TURN_BY_SEARCH = 'COUNT_EXAM_TURN_BY_SEARCH';
export const GET_INPUT_BY_SEARCH = 'GET_INPUT_BY_SEARCH';
export const SEARCH_BY_CONTESTANTS = 'SEARCH_BY_CONTESTANTS';
export const COUNT_CONTESTANTS_BY_SEARCH = 'COUNT_CONTESTANTS_BY_SEARCH';
export const TOTALS = 'TOTALS';
export const GET_START_DATE = 'GET_START_DATE';
export const GET_END_DATE = 'GET_END_DATE';
export const CLEAR = 'CLEAR';
export const selectMonthChart = (month) => ({ type: SELECT_MONTH, month });
export const selectType = (types) => ({ type: SELECT_TYPE, types });
export const totals = (
  total,
  totalPublic,
  totalPrivate,
  totalBoth,
  totalFailed,
) => ({
  type: TOTALS,
  total,
  totalPublic,
  totalPrivate,
  totalBoth,
  totalFailed,
});

export const selectTotalRecently = (totalRecently) => ({
  type: TOTAL_RECENTLY,
  totalRecently,
});
export const getCountExamTurnBySearch = (countExamTurn) => ({
  type: COUNT_EXAM_TURN_BY_SEARCH,
  countExamTurn,
});
export const getInputBySearch = (search) => ({
  type: GET_INPUT_BY_SEARCH,
  search,
});
export const getCountContestantsBySearch = (countContestant) => ({
  type: COUNT_CONTESTANTS_BY_SEARCH,
  countContestant,
});
export const searchByContestants = (searchContestant) => ({
  type: SEARCH_BY_CONTESTANTS,
  searchContestant,
});
export const getStartDate = (start_date) => ({
  type: GET_START_DATE,
  start_date,
});
export const getEndDate = (end_date) => ({
  type: GET_END_DATE,
  end_date,
});
