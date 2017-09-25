import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/index';
import Item from '../components/Item';


class FavoriteTvShows extends Component {
  componentDidMount() {
    if(this.props.currentUser) {
      this.props.fetchFavoriteTvShows();
    }
  }
  render() {
    let tvShows;
    if(this.props.currentUser) {
        if(this.props.favTvShows) {
          tvShows = this.props.favTvShows.tvShows.results.map( tvshow => {
            return <Item key={tvshow.id} id={tvshow.id} poster={tvshow.poster_path} media="tv" title={tvshow.name} />;
          });
        }
    }
    return (
      <div className="container user-container">
        <h4>Tv Shows</h4>
        {tvShows}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchFavoriteTvShows: bindActionCreators(actions.fetchFavoriteTvShows, dispatch)
  }
}

function mapStateToProps(state) {
  return {
    favTvShows: state.user.tvShows,
    currentUser: state.session.user
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteTvShows);
