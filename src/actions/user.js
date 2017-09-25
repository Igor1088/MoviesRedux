import * as types from '../constants/actionTypes';
import { API_KEY } from '../constants/config';
import Cookies from 'js-cookie';

function markAsFav() {
  return {
    type: types.MARK_AS_FAV_MOVIE
  }
}

function addToWatch() {
  return {
    type: types.ADD_TO_WATCHLIST
  }
}

export function markAsFavorite(id, media_type) {
  return function(dispatch, getState) {
    const movieInFav = getState().user.movies.movies.results.some( r => r.id === Number(id));
    const tvShowInFav = getState().user.tvShows.tvShows.results.some( r => r.id === Number(id));
    const isFavorite = media_type === 'movie' ? movieInFav : tvShowInFav;
    const like = isFavorite ? false : true;
    fetch(`https://api.themoviedb.org/3/account/${Cookies.get('user_id')}/favorite?api_key=${API_KEY}&session_id=${Cookies.get('session_id')}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'media_type': media_type,
        'media_id': id,
        'favorite': like
      })
    })
  }
}

export function addToWatchlist(id, media_type) {
  return function(dispatch, getState) {
    const movieInWatchlist = getState().user.watchlistMovies.watchlistMovies.results.some( r => r.id === Number(id));
    const tvShowInWatchlist = getState().user.watchlistTvShows.watchlistTvShows.results.some( r => r.id === Number(id));
    const inWatchlist = media_type === 'movie' ? movieInWatchlist : tvShowInWatchlist;
    const add = inWatchlist ? false : true;
    fetch(`https://api.themoviedb.org/3/account/${Cookies.get('user_id')}/watchlist?api_key=${API_KEY}&session_id=${Cookies.get('session_id')}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'media_type': media_type,
        'media_id': id,
        'watchlist': add
      })
    })
  }
}
