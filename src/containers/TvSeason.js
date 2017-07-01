import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import MainContent from '../components/MainContent';
import MediaItem from '../components/MediaItem';
import RouteLink from '../components/RouteLink';
import Loader from '../components/Loader';

let show_name;

class TvSeason extends Component {
  componentDidMount() {
    this.props.fetchTvSeason(this.props.params.tvid, this.props.params.seasonnumber);
    show_name = this.props.params.title;
  }

  renderData(season) {
      const overview = season.overview;
      const name = season.name;
      const poster = season.poster_path;
      const seasonID = season.id;
      const episodes = season.episodes.map(episode => {
        return {
          air_date: episode.air_date,
          episode_number: episode.episode_number,
          name: episode.name,
          overview: episode.overview,
          vote: episode.vote_average.toFixed(1),
          poster: episode.still_path,
          id: episode.id
        }
      });
      const cast = season.credits.cast.map(cast => {
        return {
          character: cast.character,
          personID: cast.id,
          name: cast.name,
          poster: cast.profile_path
        }
      });
      const crew = season.credits.crew.map(crew => {
        return {
          job: crew.job,
          personID: crew.id,
          name: crew.name,
          poster: crew.profile_path
        }
      });
      const placeholder = 'http://placehold.it/185x104';
      const placeholderCredits = 'http://placehold.it/45x68';

      return (
        <div className="container" key={seasonID}>
          <div className="row main">

            <MainContent
              title={show_name}
              year={name}
              poster={poster}
              overview={overview}
            />
          </div>
          <div className="episodes-container">
            <h4>Episodes</h4>
            {
              episodes.map(episode => {
                return <MediaItem episode={episode} key={episode.id} />;
              })
            }
          </div>
          <div className="row">
            <div className="col-md-6">
              <h4>Cast</h4>
              {
                cast.map((cast) => {
                  const path = cast.poster ? `https://image.tmdb.org/t/p/w45/${cast.poster}` : placeholder;
                  return (
                    <div className="media media-cast" key={cast.personID}>
                      <div className="media-left">
                        <img src={path} className="media-object media-img" alt="poster" />
                      </div>
                      <div className="media-body">
                        <RouteLink to={`/person/${cast.personID}`}>
                          <h4 className="media-heading">{cast.name}</h4>
                        </RouteLink>
                        <p>{cast.character}</p>
                      </div>
                    </div>
                  );
                })
              }
            </div>
            <div className="col-md-6">
              <h4>Crew</h4>
              {
                crew.map((crew) => {
                  const path = crew.poster ? `https://image.tmdb.org/t/p/w45/${crew.poster}` : placeholderCredits;
                  return (
                    <div className="media media-cast" key={crew.personID}>
                      <div className="media-left">
                        <img src={path} className="media-object media-img" alt="poster"/>
                      </div>
                      <div className="media-body">
                        <RouteLink to={`/person/${crew.personID}`}>
                          <h4 className="media-heading">{crew.name}</h4>
                        </RouteLink>
                        <p>{crew.job}</p>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
        </div>
      );
  }

  render() {
    let tvSeasonDetails;
    if(this.props.tvSeason.length !== 0) {
      tvSeasonDetails = this.props.tvSeason.map(this.renderData);
    }
    return (
      <div>
        {tvSeasonDetails ? tvSeasonDetails : <Loader />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { tvSeason: state.tvSeason };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTvSeason: bindActionCreators(actions.fetchTvSeason, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TvSeason);
