import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
    className='ml-80 w-10 block'
      alt="Loading..."
     />
  </Fragment>
);

export default Spinner;