import { combineReducers } from 'redux-immutable';
import { reduceReducers } from '../utils/reduceReducers';
// import * as reducer from "../reducers";
// import authReducer  from '../reducers/auth-reducer';
// import counterReducer from '../reducers/counter-reducer';
import dataReducer from './data-reducer';
// import { toJS } from 'immutable';
import defaultState from './default-state';
// add new reducer

const reducers = {
  // auth: authReducer,
  // counter: counterReducer,
};

const defaultReducer = (s = {}) => s;

// https://github.com/reduxjs/redux/issues/1994 prevent this warning
// Preserve initial state for not-yet-loaded reducers
// http://nicolasgallagher.com/redux-modules-and-code-splitting/
// better than using reduce
const preserveInitialStateReducers = reducers => {
  const reducerNames = Object.keys(reducers);
  const preservedReducers = {};
  Object.keys(defaultState).forEach(key => {
    if (!reducerNames.includes(key)) {
      preservedReducers[key] = defaultReducer;
    }
  });

  return preservedReducers;
};

const finalCombinedReducers = combineReducers({
  ...preserveInitialStateReducers(reducers),
});

const rootReducer = reduceReducers(finalCombinedReducers, dataReducer);
// const rootReducer = finalCombinedReducers;
export default rootReducer;
