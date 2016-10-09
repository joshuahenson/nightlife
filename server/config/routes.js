/**
 * Routes for express app
 */
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers } from '../db';

const usersController = controllers && controllers.users;
const yelpController = controllers && controllers.yelp;

export default (app) => {
  // user routes
  if (usersController) {
    app.post('/login', usersController.login);
    app.post('/signup', usersController.signUp);
    app.post('/logout', usersController.logout);
  } else {
    console.warn(unsupportedMessage('users routes'));
  }

  // yelp routes
  if (yelpController) {
    app.get('/searchBars', yelpController.searchBars);
    app.post('/addUser', yelpController.addUser);
    app.post('/removeUser', yelpController.removeUser);
  } else {
    console.warn(unsupportedMessage('yelp routes'));
  }
};
