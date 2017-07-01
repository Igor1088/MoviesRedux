import * as types from '../constants/actionTypes';
import { API_KEY } from '../constants/config';

export function fetchPopularTvShows(page) {
  return function(dispatch) {
    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setPopularTvShows(data));
      })
  }
}

function setPopularTvShows(tvShow) {
  return {
    type: types.FETCH_POPULAR_TV_SHOW,
    tvShow
  }
}

export function fetchTopRatedTvShows(page) {
  return function(dispatch) {
    fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setTopRatedTvShows(data));
      })
  }
}

function setTopRatedTvShows(tvShow) {
  return {
    type: types.FETCH_TOP_RATED_TV_SHOW,
    tvShow
  }
}

export function fetchAiringTodayTvShows() {
  return function(dispatch) {
    fetch(`https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setAiringTvShows(data));
      })
  }
}

function setAiringTvShows(tvShow) {
  return {
    type: types.FETCH_AIRING_TODAY_TV_SHOW,
    tvShow
  }
}


export function fetchTvShowsOnTv(page) {
  return function(dispatch) {
    fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setTvShowsOnTv(data));
      })
  }
}

function setTvShowsOnTv(tvShow) {
  return {
    type: types.FETCH_TV_SHOWS_ON_TV,
    tvShow
  }
}

export function fetchTvShowDetails(tvShowId) {
  return function (dispatch) {
    fetch(`https://api.themoviedb.org/3/tv/${tvShowId}?api_key=${API_KEY}&language=en-US&append_to_response=credits,images,similar,videos`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setTvShowDetails(data));
      })
  }
}

function setTvShowDetails(tvShow) {
  return {
    type: types.FETCH_TV_SHOW_DETAILS,
    tvShow
  }
}

export function fetchTvSeason(tvShowId,seasonNumber) {
  return function (dispatch) {
    fetch(`https://api.themoviedb.org/3/tv/${tvShowId}/season/${seasonNumber}?api_key=${API_KEY}&language=en-US&append_to_response=credits`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setTvSeason(data));
      })
  }
}

function setTvSeason(tvSeason) {
  return {
    type: types.FETCH_TV_SEASON,
    tvSeason
  }
}

export function fetchEpisodeDetails(tvShowId, seasonNumber, episodeNumber) {
  return function (dispatch) {
    fetch()
      .then(response => response.json())
      .then(data => {
        dispatch(setEpisodeDetails(data));
      })
  }
}

function setEpisodeDetails(episode) {
  return {
    type: types.FETCH_EPISODE_DETAILS,
    episode
  }
}
