import * as types from '../constants/actionTypes';

const initialState = {
  user: null,
  session: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.SET_SESSION:
      return setSession(state, action.session);
    case types.SET_USER:
      return setUser(state, action.user);
    case types.RESET_SESSION:
      return initialState;
  }
  return state;
}

function setSession(state, session) {
  return { ...state, session };
}

function setUser(state, user) {
  return { ...state, user};
}
