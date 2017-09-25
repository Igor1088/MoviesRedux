import Cookies from 'js-cookie';
import * as types from '../constants/actionTypes';
import { API_KEY } from '../constants/config';

function setUser(user) {
  return {
    type: types.SET_USER,
    user
  };
}

function setSession(session) {
  return {
    type: types.SET_SESSION,
    session
  }
}

function resetSession() {
  return {
    type: types.RESET_SESSION
  };
}

function setFavoriteMovies(movies) {
  return {
    type: types.SET_FAVORITE_MOVIES,
    movies
  }
}

function setFavoriteTvShows(tvShows) {
  return {
    type: types.SET_FAVORITE_TV_SHOWS,
    tvShows
  }
}

function setWatchlistMovies(watchlistMovies) {
  return {
    type: types.SET_WATCHLIST_MOVIES,
    watchlistMovies
  }
}

function setWatchlistTvShows(watchlistTvShows) {
  return {
    type: types.SET_WATCHLIST_TV_SHOWS,
    watchlistTvShows
  }
}






export function req() {
  let win = window.open('', '_blank');
  return function (dispatch) {
    fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        Cookies.set("Token", data.request_token);
        win.location=`https://www.themoviedb.org/authenticate/${Cookies.get("Token")}`;
        let timer = setInterval(function() {
        if (win.closed) {
            clearInterval(timer);
            dispatch(fetchSession(Cookies.get("Token")));
        }
    }, 0);
      });
  }
}

export function login() {
  let win = window.open('', '_blank');
  return function (dispatch) {
    fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        Cookies.set("Token", data.request_token);
        win.location=`https://www.themoviedb.org/authenticate/${data.request_token}`;
        let timer = setInterval(function() {
        if (win.closed) {
            clearInterval(timer);
            dispatch(fetchSession(data.request_token));
        }
    }, 0);
      });
  }
}


export function fetchSession(token) {
  let ses_id;
  return function (dispatch) {
    fetch(`https://api.themoviedb.org/3/authentication/session/new?api_key=0686d17be03e6555d7455752e3fb4b0a&request_token=${token}`)
      .then((response) => response.json())
      .then((data) => {
        Cookies.remove('session_id', data.session_id);
        Cookies.set('session_id', data.session_id);
        dispatch(setSession(data));
        ses_id = data.session_id;
      })
      setTimeout(function() {
        dispatch(fetchUser(ses_id));
      }, 1000);
  }
}


export const logout = () => (dispatch) => {
  Cookies.remove("Token");
  Cookies.remove("session_id");
  Cookies.remove("user_id");
  dispatch(resetSession());
};

function fetchUser(session_id) {
  let ses_id;
  let d_id;
  return function(dispatch) {
    fetch(`https://api.themoviedb.org/3/account?api_key=${API_KEY}&session_id=${session_id}`)
    .then(response => response.json())
    .then(data => {
      Cookies.remove('user_id', data.id);
      Cookies.set('user_id', data.id);
      dispatch(setUser(data));
      ses_id = session_id;
      d_id = data.id;
    })
    setTimeout(function() {
      dispatch(fetchFavoriteMovies(Cookies.get('user_id'), ses_id));
      dispatch(fetchFavoriteTvShows(Cookies.get('user_id'), ses_id));
      dispatch(fetchWatchlistMovies(Cookies.get('user_id'), ses_id));
      dispatch(fetchWatchlistTvShows(Cookies.get('user_id'), ses_id));
    }, 1000);
  }
}

export function fetchFavoriteMovies() {
  return function(dispatch) {
    fetch(`https://api.themoviedb.org/3/account/${Cookies.get('user_id')}/favorite/movies?api_key=${API_KEY}&session_id=${Cookies.get('session_id')}&language=en-US&sort_by=created_at.asc&page=1`)
      .then(response => response.json())
      .then(data => {
        dispatch(setFavoriteMovies(data));
      })
  }
}


export function fetchFavoriteTvShows() {
  return function(dispatch) {
    fetch(`https://api.themoviedb.org/3/account/${Cookies.get('user_id')}/favorite/tv?api_key=${API_KEY}&session_id=${Cookies.get('session_id')}&language=en-US&sort_by=created_at.asc&page=1`)
      .then(response => response.json())
      .then(data => {
        dispatch(setFavoriteTvShows(data));
      })
  }
}

export function fetchWatchlistMovies() {
  return function(dispatch) {
    fetch(`https://api.themoviedb.org/3/account/${Cookies.get('user_id')}/watchlist/movies?api_key=${API_KEY}&session_id=${Cookies.get('session_id')}&language=en-US&sort_by=created_at.asc&page=1`)
      .then(response => response.json())
      .then(data => {
        dispatch(setWatchlistMovies(data));
      })
  }
}

export function fetchWatchlistTvShows() {
  return function(dispatch) {
    fetch(`https://api.themoviedb.org/3/account/${Cookies.get('user_id')}/watchlist/tv?api_key=${API_KEY}&session_id=${Cookies.get('session_id')}&language=en-US&sort_by=created_at.asc&page=1`)
      .then(response => response.json())
      .then(data => {
        dispatch(setWatchlistTvShows(data));
      })
  }
}
