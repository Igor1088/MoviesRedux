import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './styles/index.css';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';
import Home from './components/Home';
import MovieDetails from './containers/MovieDetails';
import TvShowDetails from './containers/TvShowDetails';
import SearchResults from './containers/SearchResults';
import Person from './containers/Person';
import TvSeason from './containers/TvSeason';
import User from './containers/User';
import Favorites from './components/Favorites';
import Watchlist from './components/Watchlist';
import Movies from './containers/Movies';
import TvShows from './containers/TvShows';

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="moviespopular" component={Movies} />
        <Route path="topratedmovies" component={Movies} />
        <Route path="upcomingmovies" component={Movies} />
        <Route path="movie/:id" component={MovieDetails} />
        <Route path="tvshowspopular" component={TvShows} />
        <Route path="topratedtvshows" component={TvShows} />
        <Route path="ontv" component={TvShows} />
        <Route path="tv/:id" component={TvShowDetails} />
        <Route path="search/:term" component={SearchResults} />
        <Route path="person/:id" component={Person} />
        <Route path="tv/:title/:tvid/season/:seasonnumber" component={TvSeason} />
        <Route path="user" component={User}>
          <IndexRoute component={Favorites} />
          <Route path="/user/favorites" component={Favorites}/>
          <Route path="/user/watchlist" component={Watchlist}/>
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
