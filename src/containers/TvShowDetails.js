import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import MainContent from '../components/MainContent';
import Actor from '../components/Actor';
import YouTube from '../components/YouTube';
import Item from '../components/Item';
import TvShowData from '../components/TvShowData';
import Season from '../components/Season';
import Loader from '../components/Loader';

class TvShowDetails extends Component {
  constructor(props) {
    super(props);

    this.handleClickFavorite = this.handleClickFavorite.bind(this);
    this.renderTvData = this.renderTvData.bind(this);
    this.handleClickWatchlist = this.handleClickWatchlist.bind(this);
  }

  componentDidMount() {
    this.props.fetchTvShowDetails(this.props.params.id);
  }

  componentDidUpdate (prevProps) {
    let oldId = prevProps.params.id
    let newId = this.props.params.id
    if (newId !== oldId) {
      this.props.fetchTvShowDetails(this.props.params.id)
    }
    ReactDOM.findDOMNode(this).scrollIntoView();
  }

  handleClickFavorite(){
    this.props.markAsFavorite(this.props.params.id, 'tv');
  }

  handleClickWatchlist(){
    this.props.addToWatchlist(this.props.params.id, 'tv');
  }

  renderTvData(tvData) {
    const title = tvData.name;
    const tvid = tvData.id;
    const poster_path = tvData.poster_path;
    const vote = tvData.vote_average;
    const overview = tvData.overview;
    const genres = tvData.genres.map(genre => genre.name);
    const release_date = tvData.first_air_date;
    const year = tvData.first_air_date.slice(0,4);
    const last_air_date = tvData.last_air_date;
    const runtime = tvData.episode_run_time;
    const network = tvData.networks[0].name;
    const status = tvData.status;
    const homepage = tvData.homepage;
    const cast = tvData.credits.cast.slice(0,12).map( actor => {
      return {
        name: actor.name,
        character: actor.character,
        poster: actor.profile_path,
        personID: actor.id
      }
    });
    const seasons = tvData.seasons.map( season => {
      return {
        poster: season.poster_path,
        air: season.air_date,
        season_number: season.season_number,
        num_of_episodes: season.episode_count,
        id: season.id
      }
    });
    const videos = tvData.videos.results.slice(0,2).map(video => {
      return {
        key: video.key
      }
    });
    const similar = tvData.similar.results.slice(0,6).map(similar => {
      return {
        id: similar.id,
        title: similar.name,
        poster_path: similar.poster_path
      }
    });
    let isFavorite;
    if(this.props.favTvShows) {
      isFavorite = this.props.favTvShows.tvShows.results.some(tv => tv.id === tvid) ? true : false;
    }
    const user = this.props.currentUser ? true : false;
    let inWatchlist;
    if(this.props.watchlistTvShows) {
      inWatchlist = this.props.watchlistTvShows.watchlistTvShows.results.some(tv => tv.id === tvid) ? true : false;
    }

    return (
      <div className="container" key={tvid}>
        <MainContent
          title={title}
          year={year}
          poster={poster_path}
          genres={genres}
          overview={overview}
          vote={vote}
          glyphicon="glyphicon glyphicon-star"
          maxVote="/10"
          heading="Overview"
          handleClickFavorite={this.handleClickFavorite}
          handleClickWatchlist={this.handleClickWatchlist}
          isFavorite={isFavorite}
          inWatchlist={inWatchlist}
          user={user}
          media="tv show"
        />
        <div className="row data1-container">
          <h4>Top Billed Cast</h4>
          {cast.map( (actor) => {
            return <Actor key={actor.personID} actor={actor} />;
          })}
        </div>
        <TvShowData
          status={status}
          runtime={runtime}
          network={network}
          release_date={release_date}
          last_air_date={last_air_date}
          homepage={homepage}
        />
        <div className="row data1-container">
          <h4>Seasons</h4>
          {
            seasons.map( (season)=> {
              return (
                <Season key={season.id} season={season} title={title} tvid={tvid} />
              );
            })
          }
        </div>
        <div className="row data2-container">
          <h4>Trailers</h4>
          {
            videos.map(video => {
              return <YouTube videoKey={video.key} key={video.key}/>;
            })
          }
        </div>
        <div className="row data1-container">
          <h4>Similar Tv Shows</h4>
          {similar.map( (tvshow, key) => {
            return <Item key={key} id={tvshow.id} poster={tvshow.poster_path} media="tv" title={tvshow.title} />;
          })}
        </div>
      </div>
    );
  }
  render() {
    let tvShowDetails;
    if(this.props.tvShow.length !== 0) {
      tvShowDetails = this.props.tvShow.map(this.renderTvData);
    }
    return (
      <div>
        {tvShowDetails ? tvShowDetails : <Loader />}
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    fetchTvShowDetails: bindActionCreators(actions.fetchTvShowDetails, dispatch),
    markAsFavorite: bindActionCreators(actions.markAsFavorite, dispatch),
    addToWatchlist: bindActionCreators(actions.addToWatchlist, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    tvShow: state.tvShowDetails,
    favTvShows: state.user.tvShows,
    currentUser: state.session.user,
    watchlistTvShows: state.user.watchlistTvShows
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(TvShowDetails);
