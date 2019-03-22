import { fromJS } from 'immutable';


export default (state = new fromJS({}), action) => {
  switch (action.type) {
    default:
      return state
  }
}
