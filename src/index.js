import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './styles/index.css';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import configureStore from './store/configureStore';
import Home from './components/Home';
import MoviesPopular from './containers/MoviesPopular';
import MoviesTopRated from './containers/MoviesTopRated';
import MovieDetails from './containers/MovieDetails';
import MoviesUpcoming from './containers/MoviesUpcoming';
import TvShowsPopular from './containers/TvShowsPopular';
import TopRatedTvShows from './containers/TvShowsTopRated';
import TvShowsOnTv from './containers/TvShowsOnTv';
import TvShowDetails from './containers/TvShowDetails';
import SearchResults from './containers/SearchResults';
import Person from './containers/Person';
import TvSeason from './containers/TvSeason';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="moviespopular" component={MoviesPopular} />
        <Route path="topratedmovies" component={MoviesTopRated} />
        <Route path="upcomingmovies" component={MoviesUpcoming} />
        <Route path="movie/:id" component={MovieDetails} />
        <Route path="tvshowspopular" component={TvShowsPopular} />
        <Route path="topratedtvshows" component={TopRatedTvShows} />
        <Route path="ontv" component={TvShowsOnTv} />
        <Route path="tv/:id" component={TvShowDetails} />
        <Route path="search/:term" component={SearchResults} />
        <Route path="person/:id" component={Person} />
        <Route path="tv/:title/:tvid/season/:seasonnumber" component={TvSeason} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
