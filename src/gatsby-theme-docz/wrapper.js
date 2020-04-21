import React from 'react';
import { Helmet } from 'react-helmet-async';
import favicon from '~/brand/favicon.ico';
import './styles.less';
import './main.js';

const Wrapper = ({ children }) => (
  <>
    <Helmet>
      <link rel="icon" type="image/png" href={favicon} />
    </Helmet>
    {children}
  </>
);
export default Wrapper;
