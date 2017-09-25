import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import Item from '../components/Item';
import Loader from '../components/Loader';
import { Pagination } from 'react-bootstrap';

let n = 1;
let heading;
function setHeading(path) {
  if(path === '/topratedtvshows') {
    heading = 'Top Rated TV Shows'
  } else if (path === '/ontv') {
    heading = 'Currently Airing TV Shows';
  } else if (path === '/tvshowspopular'){
    heading = 'Popular TV Shows'
  }
}
class TvShowsPopular extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    let path = this.props.route.locationBeforeTransitions.pathname;
    setHeading(path);
    this.props.fetchTvShows(n, path);
  }
  componentDidUpdate(prevProps) {
    let path = this.props.route.locationBeforeTransitions.pathname;
    let oldPath = prevProps.location.pathname;
    let newPath = this.props.location.pathname;
    setHeading(path);
    if (newPath !== oldPath) {
      this.props.fetchTvShows(n, path);
    }
    n = 1;
    ReactDOM.findDOMNode(this).scrollIntoView();
  }
  handleClick(e) {
    let path = this.props.route.locationBeforeTransitions.pathname;
    n = e;
    this.props.fetchTvShows(e, path);
  }
  render() {
    let items;
    let total_pages = 0;
    if (this.props.tvShows.length !== 0) {
      total_pages = this.props.tvShows.total_pages;
      total_pages = total_pages > 1000 ? 1000 : total_pages;
      items = this.props.tvShows.results.map((tvshow) => {
        return <Item key={tvshow.id} id={tvshow.id} poster={tvshow.poster_path} media="tv" title={tvshow.name}/>;
      });
    }
    return (
      <div className="container">
        <h3>{heading}</h3>
        <div className="row">
          {items ? items : <Loader />}
        </div>
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          items={total_pages}
          maxButtons={5}
          activePage={n}
          onSelect={this.handleClick} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tvShows: state.tvShows,
    route: state.routing
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTvShows: bindActionCreators(actions.fetchTvShows, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TvShowsPopular);
