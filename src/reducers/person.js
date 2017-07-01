import * as types from '../constants/actionTypes';

const initialState = [];

export default function(state = initialState, action) {
  switch(action.type) {
    case types.FETCH_PERSON:
      return setPerson(state, action);
  }
  return state;
}

function setPerson(state, action) {
  const { person } = action;
  return [ person ] ;
}
