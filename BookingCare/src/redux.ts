import { logger } from 'redux-logger';
import thunkMiddleware  from 'redux-thunk';
// import { connectedRouterMiddleware } from 'connected-react-router';
// import { logger } from 'redux-logger';
// import thunkMiddleware from 'redux-thunk';
// import { createBrowserHistory, History as BrowserHistory } from 'history';

import { createStore, applyMiddleware, compose } from 'redux';
import { createStateSyncMiddleware } from 'redux-state-sync';
import { persistStore } from 'redux-persist';

import createRootReducer from './stores/reducers/rootReducer';
import { ActionTypes } from './stores/actions/actionTypes';

const environment = process.env.NODE_ENV || 'development';
let isDevelopment = environment === 'development';

//hide redux logs
isDevelopment = false;

// export const history: BrowserHistory = createBrowserHistory({
//   basename: process.env.REACT_APP_ROUTER_BASE_NAME
// });

const reduxStateSyncConfig = {
  whitelist: [ActionTypes.APP_START_UP_COMPLETE]
};

const rootReducer = createRootReducer(history as any);
// const middleware = [
//   connectedRouterMiddleware(history),
//   thunkMiddleware,
//   createStateSyncMiddleware(reduxStateSyncConfig)
// ];
const middleware: any[] = [
  thunkMiddleware,
  createStateSyncMiddleware(reduxStateSyncConfig)
];
if (isDevelopment) middleware.push(logger);

declare global {
  interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

const composeEnhancers = (isDevelopment && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const reduxStore = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export const dispatch = reduxStore.dispatch;

export const persistor = persistStore(reduxStore);

export default reduxStore;
