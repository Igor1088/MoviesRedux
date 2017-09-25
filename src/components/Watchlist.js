import React from 'react';
import WatchlistMovies from '../containers/WatchlistMovies';
import WatchlistTvShows from '../containers/WatchlistTvShows';

const Watchlist = (props) => {
  return (
    <div className="container">
      <h3>My Watchlist</h3>
      <WatchlistMovies />
      <WatchlistTvShows />
    </div>
  );
}

export default Watchlist;
