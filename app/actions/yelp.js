import axios from 'axios';
import * as types from '../types';
import {generalErrorMessage, dismissMessage} from './messages';

export function addBars(bars) {
  return {
    type: types.ADD_BARS,
    bars
  };
}

export function searching(boolean) {
  return {
    type: types.SEARCHING,
    boolean
  };
}

export function searchLocation(location, userId) {
  return dispatch => {
    dispatch(searching(true));
    axios.get('/searchBars', {
      params: {
        location,
        userId
      }
    })
      .then(res => {
        dispatch(searching(false));
        dispatch(addBars(res.data));
      });
  };
}

export function increaseCount(locationId, userId) {
  return {
    type: types.INCREASE_COUNT,
    locationId,
    userId
  };
}

export function decreaseCount(locationId, userId) {
  return {
    type: types.DECREASE_COUNT,
    locationId,
    userId
  };
}

// Add true to bar reducer if user is going
export function addUser(locationId, userId) {
  return {
    type: types.ADD_USER,
    locationId,
    userId
  };
}

export function removeUser(locationId, userId) {
  return {
    type: types.REMOVE_USER,
    locationId,
    userId
  };
}

export function userIsGoing(locationId, userId) {
  return dispatch => {
    dispatch(increaseCount(locationId, userId));
    dispatch(addUser(locationId, userId));
    axios.post('/addUser', {locationId, userId})
      .then()
      .catch(() => {
        dispatch(decreaseCount(locationId, userId));
        dispatch(removeUser(locationId, userId));
        dispatch(generalErrorMessage());
        setTimeout(() => {
          dispatch(dismissMessage());
        }, 5000);
      });
  };
}

export function userNotGoing(locationId, userId) {
  return dispatch => {
    dispatch(decreaseCount(locationId, userId));
    dispatch(removeUser(locationId, userId));
    axios.post('/removeUser', {locationId, userId})
      .then()
      .catch(() => {
        dispatch(increaseCount(locationId, userId));
        dispatch(addUser(locationId, userId));
        dispatch(generalErrorMessage());
        setTimeout(() => {
          dispatch(dismissMessage());
        }, 5000);
      });
  };
}
