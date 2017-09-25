import * as types from '../constants/actionTypes';

const initialState = {
  movies: null,
  tvShows: null,
  watchlistMovies: null,
  watchlistTvShows: null
};

export default function(state = initialState, action) {
  switch(action.type) {
    case types.SET_FAVORITE_MOVIES:
      return setFavMovies(state, action);
    case types.SET_FAVORITE_TV_SHOWS:
      return setFavTvShows(state, action);
    case types.SET_WATCHLIST_MOVIES:
      return setWatchlistMovies(state, action);
    case types.SET_WATCHLIST_TV_SHOWS:
      return setWatchlistTvShows(state, action);
  }
  return state;
}

function setFavMovies(state, movies) {
  // const { movies } = action;
  return { ...state, movies };
}

function setFavTvShows(state, tvShows) {
  return { ...state, tvShows };
}

function setWatchlistMovies(state, watchlistMovies) {
  return { ...state, watchlistMovies };
}

function setWatchlistTvShows(state, watchlistTvShows) {
  return { ...state, watchlistTvShows };
}
