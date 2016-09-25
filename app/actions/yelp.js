/* eslint-disable import/prefer-default-export */ // Will add more exports later
import axios from 'axios';
import * as types from '../types';

export function searchLocation(location) {
  return dispatch => { // TODO: dispatch action
    axios.get(`/searchBars?location=${location}`)
      .then(res => console.log(res.data));
  };
}
