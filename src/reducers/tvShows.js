import * as types from '../constants/actionTypes';

const initialState = [];

export default function (state = initialState, action) {
  switch(action.type) {
    case types.FETCH_POPULAR_TV_SHOW:
      return setTvShow(state, action);
    case types.FETCH_TOP_RATED_TV_SHOW:
        return setTvShow(state, action);
    case types.FETCH_AIRING_TODAY_TV_SHOW:
        return setTvShow(state, action);
    case types.FETCH_TV_SHOWS_ON_TV:
        return setTvShow(state, action);

  }
  return state;
}

function setTvShow (state, action) {
  const { tvShow } = action;
  return { ...state, tvShow };
}
