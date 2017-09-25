import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import Item from '../components/Item';

class TvShowsAiringToday extends Component {
  componentDidMount() {
    this.props.fetchAiringTodayTvShows();
  }
  render() {
    let items;
    if (this.props.tvShows.length !== 0) {
      items = this.props.tvShows.results.slice(0,18).map((tvshow) => {
        return <Item key={tvshow.id} id={tvshow.id} poster={tvshow.poster_path} media="tv" title={tvshow.name}/>;
      });
    }
    return (
      <div className="container">
        <h3>TV Shows Airing Today</h3>
        <div className="row">
          {items}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tvShows: state.tvShows
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAiringTodayTvShows: bindActionCreators(actions.fetchAiringTodayTvShows, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TvShowsAiringToday);
