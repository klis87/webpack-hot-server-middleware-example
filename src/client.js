import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import Layout from './layout';

const renderApp = () => {
  render(
    <Layout />,
    document.getElementById('root')
  );
};

renderApp();

if (module.hot) {
  module.hot.accept('./layout', renderApp);
}
