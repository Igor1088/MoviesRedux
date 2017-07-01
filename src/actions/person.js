import * as types from '../constants/actionTypes';
import { API_KEY } from '../constants/config';

export function fetchPerson(personID) {
  return function (dispatch) {
    fetch(`https://api.themoviedb.org/3/person/${personID}?api_key=${API_KEY}&language=en-US&append_to_response=combined_credits,images`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setPerson(data));
      })
  }
}

function setPerson(person) {
  return {
    type: types.FETCH_PERSON,
    person
  }
}
