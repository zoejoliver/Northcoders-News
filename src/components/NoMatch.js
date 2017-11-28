import React from 'react';
import {Link} from 'react-router-dom';

const NoMatch = () => {
  return (
    <div>
      <h2>No Match</h2>
      <br />
      <Link to='/'>Go back to the homepage</Link>
    </div>
  );
};

export default NoMatch;