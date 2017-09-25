import React from 'react';
import MoviesInTheatres from '../containers/MoviesInTheatres';
import TvShowsAiringToday from '../containers/TvShowsAiringToday';

const Home = () => {
  return (
    <div>
      <MoviesInTheatres />
      <TvShowsAiringToday />
    </div>
  );
}

export default Home;
