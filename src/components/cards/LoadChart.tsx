import React, { Fragment } from 'react';
import loader from './loadchart.gif';

const chartLoader = () => (
  <Fragment>
    <img
      src={loader}
    className='w-22'
      alt="Loading..."
      style={{
        position: "absolute",
        left: '50%',
        marginLeft: '-50px',
      }}
     />
  </Fragment>
);

export default chartLoader;