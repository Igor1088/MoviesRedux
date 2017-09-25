import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import ListItem from '../components/ListItem';
import Image from '../components/Image';
import MainContent from '../components/MainContent';
import Loader from '../components/Loader';

class Person extends Component {
  componentDidMount() {
    this.props.fetchPerson(this.props.params.id);
  }
  renderPersonData(personData, key) {
    const personID = personData.id;
    const name = personData.name;
    const biography = personData.biography;
    const birthday = personData.birthday;
    const placeOfBirth = personData.place_of_birth;
    const profilePath = personData.profile_path;
    const imdb = personData.imdb_id;
    const images = personData.images.profiles.slice(0,6).map(img => {
      return {
        poster: img.file_path
      }
    });
    const cast = personData.combined_credits.cast.map( cast => {
      return {
        character: cast.character,
        media_type: cast.media_type,
        title: cast.title ? cast.title : cast.name,
        poster: cast.poster_path,
        release_date: cast.release_date,
        id: cast.id,
      }
    });
    const crew = personData.combined_credits.crew.map( crew => {
      return {
        job: crew.job,
        title: crew.title ? crew.title : crew.name,
        media_type: crew.media_type,
        id: crew.id
      }
    });

    return (
      <div className="container" key={personID}>
        <MainContent
          title={name}
          poster={profilePath}
          overview={biography}
          info1={birthday}
          info2={placeOfBirth}
          info3="@imdb"
          imdb={imdb}
          heading="Biography"
          birthday="Birthday:"
          place="Place of birth:"
        />

        <div className="row data1-container">
          <h4>Photos</h4>
          {images.map( (img) => {
            return(
              <Image key={img.poster} specClass='img-actor' size="w185" poster={img.poster} grid="col-xs-6 col-sm-3 col-md-2"/>
            );
          })}
        </div>
        <div className="row data2-container">
          <h4>Known For</h4>
          <div className="col-xs-12 col-sm-6 col-md-6">
              {
                cast.map( (cast, key)=> {
                  return (
                    <ListItem
                      key={key}
                      id={cast.id}
                      media_type={cast.media_type}
                      title={cast.title}
                      role={cast.character}
                    />
                  );
                })
              }
        </div>
        <div className="col-xs-12 col-sm-6 col-md-6">
          <ul className="list-group">
        {
          crew.map( (crew, key)=> {
            return (
              <ListItem
                key={key}
                id={crew.id}
                media_type={crew.media_type}
                title={crew.title}
                role={crew.job}
              />
            );
          })
        }
      </ul>
      </div>
        </div>
      </div>
    );
  }
  render() {
    let personDetails;
    if(this.props.person.length !== 0) {
      personDetails = this.props.person.map(this.renderPersonData);
    }
    return (
      <div>
        {personDetails ? personDetails : <Loader />}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPerson: bindActionCreators(actions.fetchPerson, dispatch)
  };
}

function mapStateToProps(state) {
  return { person: state.person};
}

export default connect(mapStateToProps, mapDispatchToProps)(Person);
