import React from 'react';
import '../styles/mediaItem.css';

const MediaItem = (props) => {
  const placeholder = 'http://placehold.it/185x104';
  const path = props.episode.poster ? `https://image.tmdb.org/t/p/w185/${props.episode.poster}` : placeholder;
  return (
    <div className="media media-item">
      <div className="media-left">
        <img src={path} className="media-object media-img" alt="poster" />
        <p><span className="bold">Air date:</span> {props.episode.air_date}</p>
      </div>
      <div className="media-body">
        <h4 className="media-heading">Episode {props.episode.episode_number} - {props.episode.name}</h4>
        <p><span className="glyphicon glyphicon-star"></span>{props.episode.vote}/10</p>
        <h5>Overview</h5>
        <p>{props.episode.overview}</p>
      </div>
    </div>
  );
}

export default MediaItem;
