import { createStore, compose, applyMiddleware } from 'redux';
// import { persistReducer } from 'redux-persist';
import { autoRehydrat, persistStore } from 'redux-persist-immutable';
import { fromJS } from 'immutable';
import createFilter from '@actra-development-oss/redux-persist-transform-filter-immutable';


import createSagaMiddleware from 'redux-saga';
import { AsyncStorage } from 'react-native';
import rootReducer from './root-reducer';
import rootSaga from './root-saga';


import defaultState from './default-state';
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
// import logger from 'redux-logger';
// import reducers from '../reducers';

const listMiddleware = [
  // promiseMiddleware(),
  // refreshTokenMiddleware,
];

if (__DEV__) {
  // listMiddleware.push(logger);
}


export function configureStore(initialState = fromJS(defaultState)) {
  const sagaMiddleware = createSagaMiddleware();
  // const persistedReducer = persistReducer(persistConfig, rootReducer);
  const composeEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancer(
      applyMiddleware(...listMiddleware, sagaMiddleware),
      autoRehydrate(),
    ),
  );
  sagaMiddleware.run(rootSaga);
  return store;
}

const myFilter = createFilter('auth', ['userToken']);

const store = configureStore();
persistStore(store, {
  storage: AsyncStorage,
  transforms: [myFilter],
  whitelist: ['auth'],
});

export { store };
