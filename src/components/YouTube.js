import React from 'react';
import '../styles/youtube.css';

const YouTube = (props) => {
    return (
      <div className="col-xs-12 col-sm-6 col-md-6">
        <div className="embed-responsive embed-responsive-16by9 video">
          <iframe className="embed-responsive-item" src={`//www.youtube.com/embed/${props.videoKey}`}></iframe>
        </div>
      </div>
    );
}

export default YouTube;
