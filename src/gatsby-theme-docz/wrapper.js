import React from 'react';
import { Helmet } from 'react-helmet-async';
import favicon from 'root/brand/favicon.ico';

const Wrapper = ({ children }) => (
  <>
    <Helmet>
      <link rel="icon" type="image/png" href={favicon} />
    </Helmet>
    {children}
  </>
);
export default Wrapper;
