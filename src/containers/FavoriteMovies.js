import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/index';
import Item from '../components/Item';


class FavoriteMovies extends Component {
  componentDidMount() {
    if(this.props.currentUser) {
      this.props.fetchFavoriteMovies();
    }
  }

  render() {
    let movies;
    if(this.props.currentUser) {
      if(this.props.favMovies) {
        movies = this.props.favMovies.movies.results.map( movie => {
          return (
            <Item key={movie.id} id={movie.id} poster={movie.poster_path} media="movie" title={movie.title} />
          );
        });
      }
    }
    return (
      <div className="container user-container">
        <h4>Movies</h4>
        {movies}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchFavoriteMovies: bindActionCreators(actions.fetchFavoriteMovies, dispatch)
  }
}

function mapStateToProps(state) {
  return {
    favMovies: state.user.movies,
    currentUser: state.session.user
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteMovies);
