import { Reducer } from 'redux';
import { ActionTypes } from '../actions/actionTypes';

interface UserState {
  isLoggedIn: boolean;
  userInfo: any;
}

const initialState: UserState = {
  isLoggedIn: false,
  userInfo: null
};

const userReducer: Reducer<UserState, { type: string; userInfo: any }> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ActionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.userInfo
      };
    // case actionTypes.USER_LOGIN_FAIL:
    //   return {
    //     ...state,
    //     isLoggedIn: false,
    //     userInfo: null
    //   };
    // case actionTypes.PROCESS_LOGOUT:
    //   return {
    //     ...state,
    //     isLoggedIn: false,
    //     userInfo: null
    //   };
    default:
      return state;
  }
};

export default userReducer;
