import React from 'react';
import { renderToString } from 'react-dom/server';

import Layout from './layout';

export default options => (req, res, next) => {
  const html = renderToString(
    <Layout />
  );

  // using html webpack plugin would be better here
  const template = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Diet</title>
    </head>
    <body>
      <div id="root">${html}</div>
      <script type="text/javascript" src="/static/js/manifest.js"></script>
      <script type="text/javascript" src="/static/js/vendor.js"></script>
      <script type="text/javascript" src="/static/js/main.js"></script>
    </body>
    </html>
  `;

  res.status(200).send(template);
};
