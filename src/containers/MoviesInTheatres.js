import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import Item from '../components/Item';

class MoviesInTheatres extends Component {
  componentDidMount() {
    this.props.fetchInTheatres();
  }
  render() {
    let items;
    if (this.props.movies.length !== 0) {
      items = this.props.movies.movies.results.slice(0,18).map((movie) => {
        return <Item key={movie.id} id={movie.id} year={movie.release_date.substr(0,4)} poster={movie.poster_path} media="movie" title={movie.title} />;
      });
    }
    return (
      <div className="container">
        <h3>In Theaters</h3>
        <div className="row">
          {items}
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
    fetchInTheatres: bindActionCreators(actions.fetchInTheatres, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviesInTheatres);
