import * as types from '../types';

function updateBar(state, action) {
  switch (action.type) {
    case types.INCREASE_COUNT:
      if (action.locationId === state.id) {
        return Object.assign({}, state, {
          count: state.count + 1
        });
      }
      return state;
    case types.DECREASE_COUNT:
      if (action.locationId === state.id) {
        return Object.assign({}, state, {
          count: state.count - 1
        });
      }
      return state;
    case types.ADD_USER:
      if (action.locationId === state.id) {
        return Object.assign({}, state, {
          userGoing: true
        });
      }
      return state;
    case types.REMOVE_USER:
      if (action.locationId === state.id) {
        return Object.assign({}, state, {
          userGoing: false
        });
      }
      return state;
    default:
      return state;
  }
}

export default function bars(state = [], action) {
  switch (action.type) {
    case types.ADD_BARS:
      return action.bars;
    case types.INCREASE_COUNT:
    case types.DECREASE_COUNT:
    case types.ADD_USER:
    case types.REMOVE_USER:
      return state.map(bar => updateBar(bar, action));
    default:
      return state;
  }
}
