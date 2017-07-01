import React, { Component } from 'react';
import { connect } from 'react-redux';
import RouteLink from '../components/RouteLink';

class SearchResults extends Component {
  renderSearch(searchData, key) {
    let image, title, poster_path, media_type;
    const searchID = searchData.id;
    if(searchData.media_type === 'movie') {
      poster_path = searchData.poster_path;
      title = searchData.title;
      media_type = 'movie';
    }
    if(searchData.media_type === 'tv') {
      poster_path = searchData.poster_path;
      title = searchData.name;
      media_type = 'tv';
    }
    if(searchData.media_type === 'person') {
      poster_path = searchData.profile_path;
      title = searchData.name;
      media_type = 'person';
    }
    image = `https://image.tmdb.org/t/p/w154/${poster_path}`;
    if(!searchData.poster_path && !searchData.profile_path) {
      image = 'http://placehold.it/154x230';
    }
    return (
      <div className="col-xs-6 col-sm-3 col-md-2 item" key={searchID} id="item">
        <RouteLink to={`/${media_type}/${searchData.id}`}>
          <img src={image} alt="result"/>
          <p>{title}</p>
        </RouteLink>
      </div>
    );
  }
  render() {
    let items;
    if(this.props.search.length !==0 ) {
      items = this.props.search[0].results.map(this.renderSearch);
    }
    return (
      <div className="container">
        <h3>Results</h3>
        <div className="row">
          {items}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    search: state.search
  }
}

export default connect(mapStateToProps)(SearchResults);
