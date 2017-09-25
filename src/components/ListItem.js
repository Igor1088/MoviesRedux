import React from 'react';
import RouteLink from './RouteLink';
import '../styles/listItem.css';

const ListItem = (props) => {
  return (
    <li className="list-group-item list-item">
         <RouteLink to={`/${props.media_type}/${props.id}`}>{props.title}</RouteLink> - {props.role}
    </li>
  );
}

export default ListItem;
