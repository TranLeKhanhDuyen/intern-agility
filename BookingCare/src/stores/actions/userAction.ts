import { ActionTypes } from './actionTypes';

export const addUserSuccess = () => {
  type: ActionTypes.ADD_USER_SUCCESS;
};

export const userLoginSuccess = (userInfo: string) => ({
  type: ActionTypes.USER_LOGIN_SUCCESS,
  userInfo: userInfo
});

export const userLoginFail = (userInfo: string) => ({
  type: ActionTypes.USER_LOGIN_FAIL,
  userInfo: userInfo
});

export const processLogout = (userInfo: string) => ({
  type: ActionTypes.PROCESS_LOGOUT,
  userInfo: userInfo
});
