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
  if(path === '/topratedmovies') {
    heading = 'Top rated movies'
  } else if (path === '/upcomingmovies') {
    heading = 'Upcoming movies';
  } else if (path === '/moviespopular'){
    heading = 'Popular movies'
  }
}
class MoviesTopRated extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    let path = this.props.route.locationBeforeTransitions.pathname;

    setHeading(path);
    this.props.fetchMovies(n, path);
  }

  componentDidUpdate(prevProps) {
    let path = this.props.route.locationBeforeTransitions.pathname;
    let oldPath = prevProps.location.pathname;
    let newPath = this.props.location.pathname;
    setHeading(path);
    if (newPath !== oldPath) {
      this.props.fetchMovies(n, path);
    }
    n = 1;
    ReactDOM.findDOMNode(this).scrollIntoView();
  }
  handleClick(e) {
    let path = this.props.route.locationBeforeTransitions.pathname;
    n = e;
    this.props.fetchMovies(e, path);
  }
  render() {
    let items;
    let total_pages = 0;
    if (this.props.movies.length !== 0) {
      total_pages = this.props.movies.total_pages;
      total_pages = total_pages > 1000 ? 1000 : total_pages;
      items = this.props.movies.results.map((movie) => {
        return <Item key={movie.id} id={movie.id} poster={movie.poster_path} media="movie" title={movie.title} />;
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
    movies: state.movies,
    route: state.routing
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchMovies: bindActionCreators(actions.fetchMovies, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviesTopRated);
