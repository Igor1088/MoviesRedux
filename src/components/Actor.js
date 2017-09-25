import React from 'react';
import RouteLink from './RouteLink';
import '../styles/actor.css';

const Actor = (props) => {
  const placeholder = 'http://placehold.it/154x230';
  const path = props.actor.poster ? `https://image.tmdb.org/t/p/w185/${props.actor.poster}` : placeholder;

  return (
    <div className="col-xs-6 col-sm-3 col-md-2 cast">
      <RouteLink to={`/person/${props.actor.personID}`}>
        <img className="actor" src={path} alt="actor" />
        <p className="actorName">{props.actor.name}</p>
      </RouteLink>
      <p className="character">{props.actor.character}</p>
    </div>
  );
}

export default Actor;
