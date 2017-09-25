import React from 'react';
import RouteLink from './RouteLink';
import '../styles/userItem.css';

const UserItem = (props) => {
  console.log(props);
  return (
    <div className="col-xs-12 col-sm-12 col-md-12 user-item">
      <div className="row">
        <div className="col-xs-3 col-sm-2 col-md-2">
          <img src={`https://image.tmdb.org/t/p/w154/${props.poster}`} className="img-responsive center-block item-image" alt="poster" />
        </div>
        <div className="col-xs-9 col-sm-10 col-md-10">
          <RouteLink to={`/${props.media}/${props.id}`} {...props}>
            <p className="item-title">{props.title}</p>
          </RouteLink>
          <p>djkasljdasdkasdjkll</p>
        </div>
      </div>

    </div>
  );
}

export default UserItem;
