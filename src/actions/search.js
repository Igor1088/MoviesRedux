import * as types from '../constants/actionTypes';
import { API_KEY } from '../constants/config';

export function fetchSearchResults(query) {
  return function (dispatch) {
    fetch(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setSearchResults(data));
      })
  }
}

function setSearchResults(results) {
  return {
    type: types.FETCH_SEARCH_RESULTS,
    results
  }
}
