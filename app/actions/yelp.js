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
