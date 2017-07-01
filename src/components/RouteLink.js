import React from 'react';
import { Link } from 'react-router';

const RouteLink = (props) => {
  return (
    <Link {...props} activeStyle={{color: '#232526' }}
      className="link" style={{ color: '#27ae60', textDecoration: 'none'}}
    />
  );
};

export default RouteLink;
