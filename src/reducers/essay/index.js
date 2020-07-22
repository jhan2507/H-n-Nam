import {
  SEARCH_ESSAY,
  TOTAL_ESSAY,
  SEARCH_CONTEST_CODE,
  SEARCH_EXAM,
  EXPORT_EXCEL,
} from '../../actions/essay';

const initialState = {
  username: '',
  // contest_code:'',
  // exam_code:'',
  totalEssay: 0,
  contestName: '',
  userId: '',
  examId: '',
};

export default function searchContestReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_ESSAY:
      return Object.assign({}, state, {
        username: action.username,
      });
    case TOTAL_ESSAY:
      return Object.assign({}, state, {
        totalEssay: action.totalEssay,
      });
    case SEARCH_CONTEST_CODE:
      return Object.assign({}, state, {
        contest_code: action.contest_code,
      });
    case SEARCH_EXAM:
      return Object.assign({}, state, {
        exam_code: action.exam_code,
      });
    case EXPORT_EXCEL:
      return Object.assign({}, state, {
        searchString: action.searchString,
        contest: action.contest,
        exam_round: action.exam_round,
      });

    default:
      return state;
  }
}
