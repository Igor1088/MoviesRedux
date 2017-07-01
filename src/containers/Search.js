import React, { Component } from 'react';
import '../styles/search.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/';
import { browserHistory } from 'react-router';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(e) {
    this.setState({ term: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.fetchSearchResults(this.state.term);
    this.setState({ term: '' });
    browserHistory.push(`/search/${this.state.term}`);
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="navbar-form navbar-right">
        <div className="input-group">
          <input
            className="form-control"
            placeholder="Search"
            value={this.state.term}
            onChange={this.handleInputChange}
          />
          <div className="input-group-btn">
            <button className="btn btn-search" type="submit">
              <i className="glyphicon glyphicon-search"></i>
            </button>
          </div>
        </div>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchSearchResults: bindActionCreators(actions.fetchSearchResults, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Search);
