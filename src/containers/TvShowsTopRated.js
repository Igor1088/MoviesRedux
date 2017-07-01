import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import Item from '../components/Item';
import Loader from '../components/Loader';

let n = 1;
class TvShowsTopRated extends Component {
  constructor(props) {
    super(props);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleClickPerv = this.handleClickPrev.bind(this);
  }
  componentDidMount() {
    this.props.fetchTopRatedTvShows(n);
  }
  handleClickNext() {
    ++n;
    this.props.fetchTopRatedTvShows(n);

  }
  handleClickPrev() {
    --n;
    this.props.fetchTopRatedTvShows(n);

  }
  render() {
    let items;
    let total_pages = 0;
    if (this.props.tvShow.length !== 0) {
      total_pages = this.props.tvShow.tvShow.total_pages;
      items = this.props.tvShow.tvShow.results.map((tvshow) => {
        return <Item key={tvshow.id} id={tvshow.id} year={tvshow.first_air_date.substr(0,4)} poster={tvshow.poster_path} media="tv" title={tvshow.name}/>;
      });
    }
    return (
      <div className="container">
        <h3>Top Rated TV Shows</h3>
        <div className="row">
          {items ? items : <Loader />}
        </div>
        <div className="buttons-container">
          {
            (n > 1) ?  <button className="btn btn-default" onClick={() => this.handleClickPrev()}>prev</button> : <button className="btn btn-default disabled">prev</button>
          }
          <span className="page">page {n}</span>
          {
            (n < total_pages) ? <button className="btn btn-default" onClick={() => this.handleClickNext()}>next</button> : <button className="btn btn-default disabled">next</button>
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tvShow: state.tvShows
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTopRatedTvShows: bindActionCreators(actions.fetchTopRatedTvShows, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TvShowsTopRated);
