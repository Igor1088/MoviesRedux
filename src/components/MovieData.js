import React from 'react';

const MovieData = (props) => {
  return (
    <div className="row data2-container">
      <h4>Movie Data</h4>
      <div className="col-xs-6 col-sm-3 col-md-2">
        <p className="data-head">Production:</p>
        <p>{props.production}</p>
      </div>
      <div className="col-xs-6 col-sm-3 col-md-2">
        <p className="data-head">Runtime:</p>
        <p>{props.runtime} min</p>
      </div>
      <div className="col-xs-6 col-sm-3 col-md-2">
        <p className="data-head">Budget:</p>
        <p>${props.budget}</p>
      </div>
      <div className="col-xs-6 col-sm-3 col-md-2">
        <p className="data-head">Box Office:</p>
        <p>${props.revenue}</p>
      </div>
      <div className="col-xs-6 col-sm-3 col-md-2">
        <p className="data-head">Release date:</p>
        <p>{props.release_date}</p>
      </div>
      <div className="col-xs-6 col-sm-3 col-md-2">
        <p className="data-head">Imdb:</p>
        <a href={`http://www.imdb.com/title/${props.imdb}`} target="_blank" rel="noopener noreferrer">@Imdb</a>
      </div>
    </div>
  );
}

export default MovieData;
