// import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import appReducer from './appReducer';
import userReducer from './userReducer';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistCommonConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2
};

const userPersistConfig = {
  ...persistCommonConfig,
  key: 'user',
  whitelist: ['isLoggedIn', 'userInfo']
};

const rootReducer = (history: History) =>
  combineReducers({
    // router: connectRouter(history),
    // user: persistReducer(userPersistConfig, userReducer),
    user: persistReducer(userPersistConfig, userReducer),
    app: appReducer
  });

export default rootReducer;
