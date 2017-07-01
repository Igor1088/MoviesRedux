import React from 'react';

const TvShowData = (props) => {
  return (
    <div className="row data2-container">
      <h4>TV Show Data</h4>
      <div className="col-xs-6 col-sm-3 col-md-2">
        <p className="data-head">Status</p>
        <p>{props.status}</p>
      </div>
      <div className="col-xs-6 col-sm-3 col-md-2">
        <p className="data-head">Runtime</p>
        <p>
          {props.runtime.map((r, key) => {
            return <span key={key}>{r}min </span>
          })}
        </p>
      </div>
      <div className="col-xs-6 col-sm-3 col-md-2">
        <p className="data-head">Network</p>
        <p>{props.network}</p>
      </div>
      <div className="col-xs-6 col-sm-3 col-md-2">
        <p className="data-head">First air date</p>
        <p>{props.release_date}</p>
      </div>
      <div className="col-xs-6 col-sm-3 col-md-2">
        <p className="data-head">Last air date</p>
        <p>{props.last_air_date}</p>
      </div>
      <div className="col-xs-6 col-sm-3 col-md-2">
        <p className="data-head">Homepage</p>
        <a href={props.homepage} target="_blank" rel="noopener noreferrer">Go to</a>
      </div>
    </div>
  );
}

export default TvShowData;
