import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import user from './user';
import message from './message';
import bars from './bars';
import searching from './searching';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  searching,
  user,
  bars,
  message,
  routing,
  form: formReducer
});

export default rootReducer;
