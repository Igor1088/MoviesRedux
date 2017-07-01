import * as types from '../constants/actionTypes';

const initialState = [];

export default function(state = initialState, action) {
  switch(action.type) {
    case types.FETCH_IN_THEATRES:
      return setMovies(state, action);
  }
  return state;
}

function setMovies(state, action) {
  const { movies } = action;
  return [ ...state, movies ];
}
