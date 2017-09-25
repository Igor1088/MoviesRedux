import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import Item from '../components/Item';
import Actor from '../components/Actor';
import MovieData from '../components/MovieData';
import MainContent from '../components/MainContent';
import YouTube from '../components/YouTube';
import Image from '../components/Image';
import Loader from '../components/Loader';

class MovieDetails extends Component {
  constructor(props) {
    super(props);

    this.handleClickFavorite = this.handleClickFavorite.bind(this);
    this.handleClickWatchlist = this.handleClickWatchlist.bind(this);
    this.renderMovieData = this.renderMovieData.bind(this);
  }

  componentDidMount() {
    this.props.fetchMovieDetails(this.props.params.id);
  }

  componentDidUpdate (prevProps) {
    let oldId = prevProps.params.id
    let newId = this.props.params.id
    if (newId !== oldId) {
      this.props.fetchMovieDetails(this.props.params.id)
    }
    ReactDOM.findDOMNode(this).scrollIntoView();
  }

  handleClickFavorite(){
    this.props.markAsFavorite(this.props.params.id, 'movie');
  }

  handleClickWatchlist(){
    this.props.addToWatchlist(this.props.params.id, 'movie');
  }

  renderMovieData(movieData) {
    const title = movieData.title;
    const poster_path = movieData.poster_path;
    const movie_id = movieData.id;
    const vote = movieData.vote_average;
    const year = movieData.release_date.slice(0, 4);
    const overview = movieData.overview;
    const imdbLink = movieData.imdb_id;
    const budget = movieData.budget;
    const revenue = movieData.revenue;
    const genres = movieData.genres.map(genre => genre.name);
    const release_date = movieData.release_date;
    const runtime = movieData.runtime;
    const tagline = movieData.tagline;
    const productionCompanies = movieData.production_companies[0].name;
    const cast = movieData.credits.cast.slice(0,6).map( actor => {
      return {
        name: actor.name,
        character: actor.character,
        poster: actor.profile_path,
        personID: actor.id
      }
    });
    const images = movieData.images.backdrops.slice(0,9).map(img => {
      return {
        backdrop: img.file_path
      }
    });
    const videos = movieData.videos.results.slice(0,2).map(video => {
      return {
        key: video.key
      }
    });
    const similar = movieData.similar.results.slice(0,12).map(similar => {
      return {
        id: similar.id,
        title: similar.title,
        poster_path: similar.poster_path
      }
    });
    let isFavorite;
    if(this.props.favMovies) {
      isFavorite = this.props.favMovies.movies.results.some(movie => movie.id === movie_id) ? true : false;
    }
    const user = this.props.currentUser ? true : false;
    let inWatchlist;
    if(this.props.watchlistMovies) {
      inWatchlist = this.props.watchlistMovies.watchlistMovies.results.some(movie => movie.id === movie_id) ? true : false;
    }

    return (
      <div className="container" key={movieData.id}>
        <MainContent
          title={title}
          year={year}
          poster={poster_path}
          genres={genres}
          overview={overview}
          tagline={tagline}
          vote={vote}
          glyphicon="glyphicon glyphicon-star"
          maxVote="/10"
          heading="Overview"
          handleClickFavorite={this.handleClickFavorite}
          handleClickWatchlist={this.handleClickWatchlist}
          isFavorite={isFavorite}
          inWatchlist={inWatchlist}
          user={user}
          media="movie"
        />
        <div className="row data1-container">
          <h4>Top Billed Cast</h4>
          {cast.map( (actor) => {
            return <Actor key={actor.personID} actor={actor} />;
          })}
        </div>
        <MovieData
          production={productionCompanies}
          runtime={runtime}
          budget={budget}
          revenue={revenue}
          release_date={release_date}
          imdb={imdbLink}
        />
        <div className="row data1-container">
          <h4>Trailers</h4>
          {
            videos.map(video => {
              return <YouTube videoKey={video.key} key={video.key} />;
            })
          }
        </div>
        <div className="row data2-container">
          <h4>Photos</h4>
          <div className="photo-container">
          {images.map( (img) => {
            return(
              <Image key={img.backdrop} size="w780" poster={img.backdrop}  specClass="photo"/>
            );
          })}
          </div>
        </div>
        <div className="row data1-container">
          <h4>Similar movies</h4>
          {similar.map( (movie) => {
            return <Item key={movie.id} id={movie.id} poster={movie.poster_path} media="movie" title={movie.title} />;
          })}
        </div>
      </div>
    );
  }
  render() {
    let movieDetails;
      if(this.props.movie.length !== 0) {
        movieDetails = this.props.movie.map(this.renderMovieData);
    }
    let fav;
    if(this.props.favMovies) {
      fav = this.props.favMovies.movies.results.some(movie => movie.id === Number(this.props.params.id)) ? true : false;
    }
    return (
      <div>
        {movieDetails ? movieDetails : <Loader />}
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    fetchMovieDetails: bindActionCreators(actions.fetchMovieDetails, dispatch),
    markAsFavorite: bindActionCreators(actions.markAsFavorite, dispatch),
    addToWatchlist: bindActionCreators(actions.addToWatchlist, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    movie: state.movieDetails,
    favMovies: state.user.movies,
    currentUser: state.session.user,
    watchlistMovies: state.user.watchlistMovies
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);
