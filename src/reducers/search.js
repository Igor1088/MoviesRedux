import * as types from '../constants/actionTypes';

const initialState = [];

export default function (state = initialState, action) {
  switch(action.type) {
    case types.FETCH_SEARCH_RESULTS:
      return setResults(state, action);
  }
  return state;
}

function setResults(state, action) {
  const { results } = action;
  return [ results ];
}
