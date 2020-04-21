import React from 'react';
import logo from '~/brand/logo.svg';
import { useConfig } from 'docz';

export const Logo = () => {
  const { base, title } = useConfig();
  return (
    <a href={base}>
      <img src={logo} alt="logo" />
      <h1>{title}</h1>
    </a>
  );
};
