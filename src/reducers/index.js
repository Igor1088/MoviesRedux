import { combineReducers } from 'redux';
import movies from './movies';
import movieDetails from './movieDetails';
import tvShows from './tvShows';
import tvShowDetails from './tvShowDetails';
import tvSeason from './tvSeason';
import search from './search';
import person from './person';
import episode from './episode';

const rootReducer = combineReducers({
  movies,
  movieDetails,
  tvShows,
  tvShowDetails,
  tvSeason,
  search,
  person,
  episode
});

export default rootReducer;
