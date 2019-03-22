import { combineReducers } from "redux-immutable";
import { reduceReducers } from "../utils/reduceReducers";
import reducer from "../reducers";
import dataReducer from "./data-reducer";
// import { toJS } from 'immutable';
import defaultState from '../store/default-state'
// add new reducer

const reducers = {
  auth: reducer
};

const defaultReducer = (s = {}) => s;

// https://github.com/reduxjs/redux/issues/1994 prevent this warning
// Preserve initial state for not-yet-loaded reducers
// http://nicolasgallagher.com/redux-modules-and-code-splitting/
// better than using reduce
const preserveInitialStateReducers = reducers => {
  const reducerNames = Object.keys(reducers);
  Object.keys(defaultState).forEach(key => {
    if (!reducerNames.includes(key)) {
      reducers[key] = defaultReducer;
    }
  });

  return {
    ...reducers
  };
};

const finalCombinedReducers = combineReducers({
  ...preserveInitialStateReducers(reducers)
}); // eslint-disable-line

const rootReducer = reduceReducers(finalCombinedReducers, dataReducer);
// const rootReducer = finalCombinedReducers;
export default rootReducer;
