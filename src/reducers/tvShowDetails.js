import * as types from '../constants/actionTypes';

const initialState = [];

export default function(state = initialState, action) {
  switch(action.type) {
    case types.FETCH_TV_SHOW_DETAILS:
      return setTvShow(state, action);
  }
  return state;
}

function setTvShow(state, action) {
  const { tvShow } = action;
  return [ tvShow ] ;
}
