import React from 'react';
import '../styles/image.css';

const Image = (props) => {
  return (
    <div className={`${props.grid} photo-container`}>
      <img className={`img-responsive center-block ${props.specClass}`} src={`https://image.tmdb.org/t/p/${props.size}/${props.poster}`} alt="poster" />
    </div>
  );
}

export default Image;
