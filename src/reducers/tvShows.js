import * as types from '../constants/actionTypes';

const initialState = [];

export default function (state = initialState, action) {
  switch(action.type) {
    case types.FETCH_AIRING_TODAY_TV_SHOW:
        return setTvShow(state, action);
    case types.FETCH_TV_SHOWS:
        return setTvShow(state, action);

  }
  return state;
}

function setTvShow (state, action) {
  const { tvShows } = action;
  return { ...state, ...tvShows };
}
