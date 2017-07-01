import React from 'react';
import '../styles/mainContent.css';

const MainContent = (props) => {
  const placeholder = 'http://placehold.it/293x441';
  const path = props.poster ? `https://image.tmdb.org/t/p/w500/${props.poster}` : placeholder;
  return (
    <div className="row main">
      <div className="col-xs-12 col-sm-6 col-md-4">
        <img src={path} id="movie-img" alt="movie poster" />
        <p><span className="bold">{props.birthday}</span> {props.info1}</p>
        <p><span className="bold">{props.place}</span> {props.info2}</p>
        <a href={`http://www.imdb.com/name/${props.imdb}`} target="_blank" rel="noopener noreferrer">{props.info3}</a>
      </div>
      <div className="col-xs-12 col-sm-6 col-md-8" id="movie-overview">
        <h2>{props.title} <span className="year">{props.year}</span></h2>
        <div className="row">
          <div className="col-sm-3">
            <p className="vote"><span className={props.glyphicon}></span> {props.vote}<span className="smallVote">{props.maxVote}</span></p>
          </div>
          <div className="col-sm-9">
            <ul>
              {props.genres ? ( props.genres.map((g, key) => {
                  return <li className="genres" key={key}>{g}</li>
                })) : ""
              }
            </ul>
          </div>
        </div>
        <blockquote><p className="tagline"><em>{props.tagline ? props.tagline : ""}</em></p></blockquote>
        <h4>{props.heading}</h4>
        <p>{props.overview}</p>
      </div>
    </div>
  );
}

export default MainContent;
