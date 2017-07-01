import React from 'react';
import Header from './Header';
import MoviesInTheatres from '../containers/MoviesInTheatres';
import TvShowsAiringToday from '../containers/TvShowsAiringToday';

const Home = () => {
  return (
    <div>
      <Header />
      <MoviesInTheatres />
      <TvShowsAiringToday />
    </div>
  );
}

export default Home;
