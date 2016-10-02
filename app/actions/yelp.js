import axios from 'axios';
import * as types from '../types';

export function addBars(bars) {
  return {
    type: types.ADD_BARS,
    bars
  };
}

export function searchLocation(location) {
  return dispatch => {
    axios.get(`/searchBars?location=${location}`)
      .then(res => dispatch(addBars(res.data)));
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

export function toggleGoing(userId, boolean, locationId) {
  return dispatch => {
    if (boolean) {
      dispatch(decreaseCount(locationId, userId));
      dispatch(removeUser(locationId, userId));
    } else {
      dispatch(increaseCount(locationId, userId));
      dispatch(addUser(locationId, userId));
    }
    // TODO: save db and catch error optimistic update
    // axios.post('/updateUserGoing', {userId, boolean})
    //   .then()
    //   .catch()
  };
}
