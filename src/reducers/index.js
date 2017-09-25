import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import movies from './movies';
import movieDetails from './movieDetails';
import tvShows from './tvShows';
import tvShowDetails from './tvShowDetails';
import tvSeason from './tvSeason';
import search from './search';
import person from './person';
import episode from './episode';
import session from './session';
import user from './user';

const rootReducer = combineReducers({
  movies,
  movieDetails,
  tvShows,
  tvShowDetails,
  tvSeason,
  search,
  person,
  episode,
  session,
  user,
  routing: routerReducer
});

export default rootReducer;
