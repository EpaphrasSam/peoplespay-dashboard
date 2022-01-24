import React, { Fragment } from 'react';
import smile from './smile.gif';

const PageLoading = () => (
  <Fragment>
    <img
      src={smile}
    className='h-10 w-10'
      alt="Loading"
      style={{
        position: "absolute",
        top: "50%",
        left: '50%',
        marginLeft: '-50px',
        marginTop: "-50px"
      }}
     />
  </Fragment>
);

export default PageLoading;


    