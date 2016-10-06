import * as types from '../types';

export default function searching(state = false, action) {
  switch (action.type) {
    case types.SEARCHING:
      return action.boolean;
    default:
      return state;
  }
}
