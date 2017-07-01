import * as types from '../constants/actionTypes';

const initialState = [];

export default function(state = initialState, action) {
  switch(action.type){
    case types.FETCH_EPISODE_DETAILS:
      return setEpisode(state, action);
  }
  return state;
}

function setEpisode(state, action) {
  const { episode } = action;
  return [ episode ];
}
