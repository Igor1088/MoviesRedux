import React from 'react';
import RouteLink from './RouteLink';

const Season = (props) => {
  const placeholder = 'http://placehold.it/154x230';
  const path = props.season.poster ? `https://image.tmdb.org/t/p/w185/${props.season.poster}` : placeholder;
  return (
    <div className="col-xs-6 col-sm-3 col-md-2 item">
        <RouteLink to={`/tv/${props.title}/${props.tvid}/season/${props.season.season_number}`}>
          <img className="actor" src={path} alt="season" />
          <p className="bold">Season {props.season.season_number === 0 ? 'specials' : props.season.season_number}</p>
        </RouteLink>
        <p>{props.season.num_of_episodes} Episodes</p>
    </div>
  );
}

export default Season;
