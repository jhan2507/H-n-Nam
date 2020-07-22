export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const LOGOUT = 'LOGOUT';

export const setCurrentUser = (userInfo) => ({
  type: SET_CURRENT_USER,
  userInfo,
});
export const logoutAction = () => ({
  type: LOGOUT,
});
