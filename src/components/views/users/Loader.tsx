import React, { Fragment } from 'react';
import filter from './filter.gif';

const Loader = () => (
  <Fragment>
    <img
      src={filter}
    className='w-6'
      alt="Loading..."
     />
  </Fragment>
);

export default Loader;