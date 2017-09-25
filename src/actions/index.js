import {
  fetchMovies,
  fetchInTheatres,
  fetchMovieDetails
} from './movies';

import {
  fetchTvShows,
  fetchAiringTodayTvShows,
  fetchTvShowDetails,
  fetchTvSeason,
  fetchEpisodeDetails
} from './tvShows';
import { fetchSearchResults } from './search';
import { fetchPerson } from './person';
import {
  login,
  logout,
  fetchFavoriteMovies,
  fetchFavoriteTvShows,
  fetchWatchlistMovies,
  fetchWatchlistTvShows
 } from './session';
import {
  markAsFavorite,
  addToWatchlist
 } from './user';

export {
  fetchInTheatres,
  fetchMovieDetails,
  fetchAiringTodayTvShows,
  fetchTvShowDetails,
  fetchTvSeason,
  fetchSearchResults,
  fetchPerson,
  fetchEpisodeDetails,
  login,
  logout,
  fetchFavoriteMovies,
  fetchFavoriteTvShows,
  markAsFavorite,
  addToWatchlist,
  fetchWatchlistMovies,
  fetchWatchlistTvShows,
  fetchMovies,
  fetchTvShows
}
