import React, { Component } from 'react';
import '../styles/mainContent.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

function FavoriteBtn({isFavorite, onClick}) {
  return (
    <div>
      {
        isFavorite ?
        <button className="btn btn-favorite-active" onClick={onClick}><span className="glyphicon glyphicon-heart" aria-hidden="true"></span> Remove from favorites</button> :
        <button className="btn btn-favorite" onClick={onClick}><span className="glyphicon glyphicon-heart-empty" aria-hidden="true"></span> Add to favorites</button>
      }
    </div>
  );
}

function WatchlistBtn({inWatchlist, onClick}) {
  return (
    <div>
      {
        inWatchlist ?
        <button className="btn btn-watchlist-active" onClick={onClick}><span className="glyphicon glyphicon-minus" aria-hidden="true"></span> Remove from watchlist</button> :
        <button className="btn btn-watchlist" onClick={onClick}><span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Add to watchlist</button>
      }
    </div>
  );
}

class MainContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      liked: false,
      inWatchlist: false
    }

    this.handleClickFavorite = this.handleClickFavorite.bind(this);
    this.handleClickWatchlist = this.handleClickWatchlist.bind(this);
  }

  componentDidMount() {
    this.setState({
      liked: this.props.isFavorite,
      inWatchlist: this.props.inWatchlist
    });
  }

  handleClickFavorite() {
    this.props.handleClickFavorite();
    this.setState({ liked: !this.state.liked });
  }

  handleClickWatchlist() {
    this.props.handleClickWatchlist();
    this.setState({ inWatchlist: !this.state.inWatchlist });
  }

  render() {
    const placeholder = 'http://placehold.it/293x441';
    const data = this.props;
    const path = data.poster ? `https://image.tmdb.org/t/p/w500/${data.poster}` : placeholder;
    const btnFav = data.user ? <FavoriteBtn isFavorite={this.state.liked} onClick={this.handleClickFavorite} /> : `Login to add ${data.media} to favorites and/or watchlist`;
    const btnWatch = data.user ? <WatchlistBtn inWatchlist={this.state.inWatchlist} onClick={this.handleClickWatchlist}/> : '';
    return (
      <div className="row main">
        <div className="col-xs-12 col-sm-6 col-md-4">
          <img src={path} id="movie-img" alt="movie poster" />
          <p><span className="bold">{data.birthday}</span> {data.info1}</p>
          <p><span className="bold">{data.place}</span> {data.info2}</p>
          <a href={`http://www.imdb.com/name/${data.imdb}`} target="_blank" rel="noopener noreferrer">{data.info3}</a>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-8" id="movie-overview">
          <h2>{data.title} <span className="year">{data.year}</span></h2>
          <div className="row">
            <div className="col-sm-3">
              <p className="vote"><span className={data.glyphicon}></span> {data.vote}<span className="smallVote">{data.maxVote}</span></p>
            </div>
            <div className="col-sm-9">
              <ul>
                {data.genres ? ( data.genres.map((g, key) => {
                    return <li className="genres" key={key}>{g}</li>
                  })) : ""
                }
              </ul>
            </div>
          </div>
          <blockquote><p className="tagline"><em>{data.tagline ? data.tagline : ""}</em></p></blockquote>
          <h4>{data.heading}</h4>
          <p>{data.overview}</p>
          <div className="btn-toolbar buttons-container" role="toolbar" aria-label="...">
            <div className="btn-group" role="group" aria-label="...">
              { (data.birthday || data.season) ? '' : btnFav }
            </div>
            <div className="btn-group" role="group" aria-label="...">
              { data.birthday ? '' : btnWatch }
            </div>
          </div>
        </div>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    fetchFavoriteMovies: bindActionCreators(actions.fetchFavoriteMovies, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(MainContent);
// const MainContent = (props) => {
//   const placeholder = 'http://placehold.it/293x441';
//   const path = props.poster ? `https://image.tmdb.org/t/p/w500/${props.poster}` : placeholder;
//   return (
//     <div className="row main">
//       <div className="col-xs-12 col-sm-6 col-md-4">
//         <img src={path} id="movie-img" alt="movie poster" />
//         <p><span className="bold">{props.birthday}</span> {props.info1}</p>
//         <p><span className="bold">{props.place}</span> {props.info2}</p>
//         <a href={`http://www.imdb.com/name/${props.imdb}`} target="_blank" rel="noopener noreferrer">{props.info3}</a>
//         <FavoriteBtn isFavorite={this.state.liked} onClick={this.handleClick} />
//       </div>
//       <div className="col-xs-12 col-sm-6 col-md-8" id="movie-overview">
//         <h2>{props.title} <span className="year">{props.year}</span></h2>
//         <div className="row">
//           <div className="col-sm-3">
//             <p className="vote"><span className={props.glyphicon}></span> {props.vote}<span className="smallVote">{props.maxVote}</span></p>
//           </div>
//           <div className="col-sm-9">
//             <ul>
//               {props.genres ? ( props.genres.map((g, key) => {
//                   return <li className="genres" key={key}>{g}</li>
//                 })) : ""
//               }
//             </ul>
//           </div>
//         </div>
//         <blockquote><p className="tagline"><em>{props.tagline ? props.tagline : ""}</em></p></blockquote>
//         <h4>{props.heading}</h4>
//         <p>{props.overview}</p>
//       </div>
//     </div>
//   );
// }

// export default MainContent;
