import {
  GET_ACCOUNT_CODE,
  GET_INPUT,
  GET_ORGANIZATION,
  GET_USERNAME,
  SELECT_CONTEST,
  SELECT_ORG,
  TOTAL_ACCOUNT,
} from '../../actions/info';

const initialState = {
  totalAccount: 0,
  oid: 0,
  input: '',
  contestId: 0,
  name: '',
  organizations: '',
  code: '',
  total: 0,
};

export default function statisticReducer(state = initialState, action) {
  switch (action.type) {
    case TOTAL_ACCOUNT:
      return Object.assign({}, state, {
        total: action.total,
      });
    case SELECT_ORG:
      return Object.assign({}, state, {
        oid: action.oid,
      });
    case GET_INPUT:
      return Object.assign({}, state, {
        input: action.input,
      });
    case SELECT_CONTEST:
      return Object.assign({}, state, {
        contestId: action.contestId,
      });
    case GET_USERNAME:
      return Object.assign({}, state, {
        name: action.name,
      });
    case GET_ORGANIZATION:
      return Object.assign({}, state, {
        organizations: action.organizations,
      });
    case GET_ACCOUNT_CODE:
      return Object.assign({}, state, {
        code: action.code,
      });
    default:
      return state;
  }
}
