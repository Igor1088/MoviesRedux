import * as types from '../constants/actionTypes';
import { API_KEY } from '../constants/config';

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


export function fetchPopularMovies(page) {
  return function (dispatch) {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setPopularMovies(data));
      })
  }
}

function setPopularMovies(movies) {
  return {
    type: types.FETCH_POPULAR_MOVIES,
    movies
  }
}

export function fetchTopRatedMovies(page) {
  return function (dispatch) {
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setTopRatedMovies(data));
      })
  }
}

function setTopRatedMovies(movies) {
  return {
    type: types.FETCH_TOP_RATED_MOVIES,
    movies
  }
}

export function fetchUpcomingMovies(page) {
  return function (dispatch) {
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setUpcomingMovies(data));
      })
  }
}

function setUpcomingMovies(movies) {
  return {
    type: types.FETCH_UPCOMING_MOVIES,
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
