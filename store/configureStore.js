import { createStore, compose, applyMiddleware } from "redux";
// import { persistReducer } from 'redux-persist';
import { autoRehydrate } from "redux-persist-immutable";

// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import rootReducer from "./root-reducer";
import rootSaga from "./root-saga";
import createSagaMiddleware from "redux-saga";
import { persistStore } from "redux-persist-immutable";

// import logger from 'redux-logger';
// import reducers from '../reducers';
import { fromJS } from "immutable";
import defaultState from '../store/default-state'

const listMiddleware = [
  // promiseMiddleware(),
  // refreshTokenMiddleware,
];

if (__DEV__) {
  // listMiddleware.push(logger);
}

// const persistConfig = {
//   key: 'root',
//   storage,
//   // whitelist: [] // no state need to consist at the moment
// };
//
// const persistedReducer = persistReducer(persistConfig, reducers);
//
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // integrate into redux devtool
// const store = createStore(
//   persistedReducer,
//   {},
//   composeEnhancers(applyMiddleware(...listMiddleware)),
// );

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
      autoRehydrate()
    )
  );
  sagaMiddleware.run(rootSaga);
  return store;
}

const store = configureStore();
const persistor = persistStore(store);

export { persistor, store };

// export default store;
//
// const persistor = persistStore(store, null, () => { store.getState() });
// export {
//   persistor
// }

// const store = createStore(
//   reducers,
//   {},
//   compose(
//     applyMiddleware( promiseMiddleware(), refreshTokenMiddleware, saveLastRequestMiddleware, logger ),
//   )
// );
//
// export default store;

// const persistConfig = {
//   key: 'primary',
//   storage: AsyncStorage,
//   blacklist: ['navigation', 'project', 'auth']
// };
//
// let persistedReducer = persistReducer(persistConfig, reducers);
//
// export default () => {
//   // console.log(__DEV__);
//   // let middlewares = __DEV__ ? applyMiddleware(promiseMiddleware(), logger) : applyMiddleware(promiseMiddleware());
//
//   let store = createStore(
//     persistedReducer,
//     undefined,
//     compose(applyMiddleware(promiseMiddleware(), logger))
//   );
//
//   let persistor = persistStore(store, null, () => { store.getState() });
//
//   return {
//     store,
//     persistor
//   };
// }
