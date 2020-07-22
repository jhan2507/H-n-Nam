import { LOGOUT, SET_CURRENT_USER } from 'actions/user/index';

const initialState = {
  userInfo: {},
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return Object.assign({}, state, { userInfo: action.userInfo });
    case LOGOUT:
      return Object.assign({}, state, { userInfo: {} });
    default:
      return state;
  }
}
