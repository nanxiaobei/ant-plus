import React from 'react';
import logo from '~/brand/logo.svg';
import { useConfig } from 'docz';

export const Logo = () => {
  const config = useConfig();
  return (
    <a className="css-2daqhl-Logo" href="/">
      <img src={logo} alt="logo" />
      <h1>{config.title}</h1>
    </a>
  );
};
