import * as types from '../constants/actionTypes';

const initialState = [];

export default function(state = initialState, action) {
  switch(action.type) {
    case types.FETCH_TV_SEASON:
      return setSeason(state, action);
  }
  return state;
}

function setSeason(state, action) {
  const { tvSeason } = action;
  return [ tvSeason ];
}
