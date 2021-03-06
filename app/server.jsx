import axios from 'axios';
import React from 'react';
import Helmet from 'react-helmet';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import createRoutes from './routes';
import configureStore from './store/configureStore';
import preRenderMiddleware from './middlewares/preRenderMiddleware';

const clientConfig = {
  host: process.env.HOSTNAME || 'localhost',
  port: process.env.PORT || '3000'
};

// configure baseURL for axios requests (for serverside API calls)
axios.defaults.baseURL = `http://${clientConfig.host}:${clientConfig.port}`;


// const analtyicsScript =
//   typeof trackingID === "undefined" ? ``
//   :
//   `<script>
//     (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
//     (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
//     m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
//     })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
//     ga('create', ${trackingID}, 'auto');
//     ga('send', 'pageview');
//   </script>`;
//
//
// /*
//  * To Enable Google analytics simply replace the hashes with your tracking ID
//  * and move the constant to above the analtyicsScript constant.
//  *
//  * Currently because the ID is declared beneath where is is being used, the
//  * declaration will get hoisted to the top of the file.
//  * however the assignement  does not, so it is undefined for the type check above.
//  * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var#var_hoisting
//  */
// const trackingID  = "'UA-########-#'";
// add to body below
// ${analtyicsScript}


/*
 * Export render function to be used in server/config/routes.js
 * We grab the state passed in from the server and the req object from Express/Koa
 * and pass it into the Router.run function.
 */
export default function render(req, res) {
  const authenticated = req.isAuthenticated();
  const history = createMemoryHistory();
  const store = configureStore({
    user: {
      authenticated,
      isLogin: true,
      isWaiting: false,
      userId: req.user ? req.user._id : '',
      userName: req.user ? req.user.profile.name : ''
    }
  }, history);
  const routes = createRoutes(store);

  /*
   * From the react-router docs:
   *
   * This function is to be used for server-side rendering. It matches a set of routes to
   * a location, without rendering, and calls a callback(err, redirect, props)
   * when it's done.
   *
   * The function will create a `history` for you, passing additional `options` to create it.
   * These options can include `basename` to control the base name for URLs, as well as the pair
   * of `parseQueryString` and `stringifyQuery` to control query string parsing and serializing.
   * You can also pass in an already instantiated `history` object, which can be constructured
   * however you like.
   *
   * The three arguments to the callback function you pass to `match` are:
   * - err:       A javascript Error object if an error occured, `undefined` otherwise.
   * - redirect:  A `Location` object if the route is a redirect, `undefined` otherwise
   * - props:     The props you should pass to the routing context if the route matched,
   *              `undefined` otherwise.
   * If all three parameters are `undefined`, this means that there was no route found matching the
   * given location.
   */
  const head = Helmet.rewind();
  match({routes, location: req.url}, (err, redirect, props) => {
    if (err) {
      res.status(500).json(err);
    } else if (redirect) {
      res.redirect(302, redirect.pathname + redirect.search);
    } else if (props) {
      // This method waits for all render component
      // promises to resolve before returning to browser
      preRenderMiddleware(
        store.dispatch,
        props.components,
        props.params
      )
      .then(() => {
        const initialState = store.getState();
        const componentHTML = renderToString(
          <Provider store={store}>
            <RouterContext {...props} />
          </Provider>
        );

        res.status(200).send(`
          <!doctype html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
              ${head.title.toString()}
              <meta name="description" content="">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <link href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/darkly/bootstrap.min.css" rel="stylesheet">
              <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">
              <link href="/assets/styles/styles.css" rel="stylesheet">
              <link rel="shortcut icon" href="http://res.cloudinary.com/henson/image/upload/v1464461170/favicon_kpdqcs.png" type="image/png" />
            </head>
            <body>
              <div id="app" class="container">${componentHTML}</div>
              <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};</script>
              <script type="text/javascript" charset="utf-8" src="/assets/app.js"></script>
            </body>
          </html>
        `);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
    } else {
      res.sendStatus(404);
    }
  });
}
