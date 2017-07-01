import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import Item from '../components/Item';
import Loader from '../components/Loader';

let n = 1;
class MoviesTopRated extends Component {
  constructor(props) {
    super(props);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleClickPerv = this.handleClickPrev.bind(this);
  }
  componentDidMount() {
    this.props.fetchTopRatedMovies(n);
  }
  handleClickNext() {
    ++n;
    this.props.fetchTopRatedMovies(n);

  }
  handleClickPrev() {
    --n;
    this.props.fetchTopRatedMovies(n);

  }
  render() {
    let items;
    let total_pages = 0;
    if (this.props.movies.length !== 0) {
      total_pages = this.props.movies.movies.total_pages;
      items = this.props.movies.movies.results.map((movie) => {
        return <Item key={movie.id} id={movie.id} year={movie.release_date.substr(0,4)} poster={movie.poster_path} media="movie" title={movie.title} />;
      });
    }
    return (
      <div className="container">
        <h3>Top rated movies</h3>
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
    movies: state.movies
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTopRatedMovies: bindActionCreators(actions.fetchTopRatedMovies, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviesTopRated);
