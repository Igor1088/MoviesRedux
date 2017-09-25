import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/index';
import Item from '../components/Item';


class WatchlistTVShows extends Component {
  componentDidMount() {
    if(this.props.currentUser) {
      this.props.fetchWatchlistTvShows();
    }
  }

  render() {
    let movies;
    if(this.props.currentUser) {
      if(this.props.watchlistTvShows) {
        movies = this.props.watchlistTvShows.watchlistTvShows.results.map( tv => {
          return <Item key={tv.id} id={tv.id} poster={tv.poster_path} media="tv" title={tv.name} />;
        });
      }
    }
    return (
      <div className="container user-container">
        <h4>Tv Shows</h4>
        {movies}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchWatchlistTvShows: bindActionCreators(actions.fetchWatchlistTvShows, dispatch)
  }
}

function mapStateToProps(state) {
  return {
    watchlistTvShows: state.user.watchlistTvShows,
    currentUser: state.session.user
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistTVShows);
