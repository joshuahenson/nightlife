import * as types from '../types';

export default function bars(state = [], action) {
  switch (action.type) {
    case types.ADD_BARS:
      return action.bars;
    default:
      return state;
  }
}
