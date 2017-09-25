import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/index';
import RouteLink from '../components/RouteLink';

function Login({ onLogin }) {
  return (
    <RouteLink onClick={onLogin} to='/user'>
      Login
    </RouteLink>
  );
}

function Logout({ onLogout }) {
  return (
    <RouteLink onClick={onLogout} to='/'>
      Logout
    </RouteLink>
  );
}

function User(user) {
  const gravatarHash = user.user ? user.user.avatar.gravatar.hash: 'HASH';
  return (
    <RouteLink to='/user'><img className="img-circle" height="25" src={`https://secure.gravatar.com/avatar/${gravatarHash}`}/> {user.user.username} </RouteLink>
  );
}

function SessionAction({ currentUser, onLogin, onLogout }) {
  return (
    <div>
      { currentUser ? <User user={currentUser} /> : ''}
      { currentUser ? <Logout onLogout={onLogout} /> : <Login onLogin={onLogin} /> }
    </div>
  );
}

function Auth({ currentUser, onLogin, onLogout }) {
  return (
    <div className="container">
      <div className="auth">
        <SessionAction currentUser={currentUser} onLogin={onLogin} onLogout={onLogout} />
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    onLogin: bindActionCreators(actions.login, dispatch),
    onLogout: bindActionCreators(actions.logout, dispatch),
  };
}

function mapStateToProps(state, props) {
  return {
    currentUser: state.session.user
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
