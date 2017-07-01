import * as types from '../constants/actionTypes';

const initialState = [];

export default function(state = initialState, action) {
  switch(action.type) {
    case types.FETCH_MOVIE_DETAILS:
      return setMovie(state, action);
  }
  return state;
}

function setMovie(state, action) {
  const { movie } = action;
  return [ movie ];
}
