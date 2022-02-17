import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
    className='w-10'
      alt="Loading..."
      style={{
        position: "absolute",
        left: '50%',
        marginLeft: '-50px',
      }}
     />
  </Fragment>
);

export default Spinner;