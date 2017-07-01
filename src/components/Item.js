import React from 'react';
import RouteLink from './RouteLink';
import '../styles/item.css';

const Item = (props) => {
  return (
    <div className="col-xs-6 col-sm-3 col-md-2 item">
      <RouteLink to={`/${props.media}/${props.id}`} {...props}>
        <img src={`https://image.tmdb.org/t/p/w154/${props.poster}`} className="img-responsive center-block item-image" alt="poster" />
        <p className="item-title">{props.title}</p>
      </RouteLink>
    </div>
  );
}

export default Item;
