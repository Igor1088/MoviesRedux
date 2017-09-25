import React from 'react';
import '../styles/image.css';

const Image = (props) => {
  return (
      <img className={`img-responsive center-block ${props.specClass} ${props.grid}`} src={`https://image.tmdb.org/t/p/${props.size}/${props.poster}`} alt="poster" />
  );
}

export default Image;
