import * as types from '../constants/actionTypes';
import { API_KEY } from '../constants/config';

export function fetchMovies(page, path) {
  let category;
  if(path === '/topratedmovies') {
    category = 'top_rated'
  } else if (path === '/upcomingmovies') {
    category = 'upcoming';
  } else if (path === '/moviespopular'){
    category = 'popular'
  }
  return function (dispatch) {
    fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=en-US&page=${page}`)
      .then( response => response.json())
      .then( data => {
        dispatch(setMovies(data));
      })
  }
}

function setMovies(movies) {
  return {
    type: types.FETCH_MOVIES,
    movies
  }
}


export function fetchInTheatres(){
  return function (dispatch) {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setTheatresMovies(data));
      })
  }
}

function setTheatresMovies(movies) {
  return {
    type: types.FETCH_IN_THEATRES,
    movies
  }
}

export function fetchMovieDetails(movieID) {
  return function(dispatch) {
    fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}&append_to_response=credits,videos,images,reviews,similar`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setMovieDetails(data));
      })
  }
}

function setMovieDetails(movie) {
  return {
    type: types.FETCH_MOVIE_DETAILS,
    movie
  }
}