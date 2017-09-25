import React from 'react';
import FavoriteMovies from '../containers/FavoriteMovies';
import FavoriteTvShows from '../containers/FavoriteTvShows';

const Favorites = (props) => {
  return (
    <div className="container">
      <h3>My Favorites</h3>
      <FavoriteMovies />
      <FavoriteTvShows />
    </div>
  );
}

export default Favorites;
