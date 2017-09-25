import React, { Component } from 'react';
import '../styles/search.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/';
import { browserHistory } from 'react-router';
import Autosuggest from 'react-autosuggest';
import { API_KEY } from '../constants/config';


let results = [{'original_title': 'title'}];


// Teach Autosuggest how to calculate suggestions for any given input value.
function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return results.filter(res => regex.test(res.title ? res.title : res.name));
}

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
function getSuggestionValue(suggestion) {
  return suggestion.title ? suggestion.title : suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.title ? suggestion.title : suggestion.name}</span>
  );
}



class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      suggestions: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.fetchResults = this.fetchResults.bind(this);
  }

  fetchResults(query) {
    fetch(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`)
      .then((response) => response.json())
      .then((data) => {
        results = data.results;
      })
  }

  onChange = (event, { newValue }) => {
    if(newValue.length !== 0) {
      this.fetchResults(newValue);
    }
    this.setState({
      value: newValue
    });
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  }

  handleKeyUp() {
    this.fetchResults(this.state.value);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.fetchSearchResults(this.state.value);
    this.setState({ value: '' });
    browserHistory.push(`/search/${this.state.value}`);
  }
  render() {
    const { value, suggestions, isLoading } = this.state;
    const inputProps = {
      placeholder: "Search...",
      value,
      onChange: this.onChange
    };

    return (
      <form onSubmit={this.handleSubmit} className="navbar-form navbar-left" onKeyUp={this.handleKeyUp}>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchSearchResults: bindActionCreators(actions.fetchSearchResults, dispatch)
  }
}

function mapStateToProps(state) {
  return {
    search: state.search
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
