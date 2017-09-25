import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../constants/actionTypes';
import FavMovies from './FavoriteMovies';
import FavTvShows from './FavoriteTvShows';
import WatchlistMovies from './WatchlistMovies';
import WatchlistTvShows from './WatchlistTvShows';
import '../styles/user.css';
import { Link } from 'react-router';

class User extends Component {
  render() {
    let username = this.props.currentUser ? this.props.currentUser.username : '';
    let name = this.props.currentUser ? this.props.currentUser.name : '';
    const gravatarHash = this.props.currentUser ? this.props.currentUser.avatar.gravatar.hash : 'HASH';
    return (
      <div className="container">
        <div className="container">
          <div className="row">
            <div className="col-xs-2 col-sm-2 col-md-2 user_avatar">
              <img className="img-responsive img-circle" src={`https://secure.gravatar.com/avatar/${gravatarHash}`}/>
            </div>
            <div className="col-xs-10 col-sm-10 col-md-10">
              <h3 id="username">{username}<span>({name})</span></h3>
            </div>
          </div>
        </div>
        <div>
          <ul className="nav nav-pills">
            <li><Link to="/user/favorites">Favorites</Link></li>
            <li><Link to="/user/watchlist">Watchlist</Link></li>
          </ul>
        <div className="container data1-container user-container">
          {this.props.children}
        </div>
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.session.user
  }
}

export default connect(mapStateToProps)(User);
