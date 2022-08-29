import React, { Fragment } from 'react';
import loader from './loader.gif';

const PageLoading = () => (
  <Fragment>
    <img
      src={loader}
    className='h-20 w-20'
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


    