const redux = require('redux');
const actions = require('../actions');
const { combineReducers } = redux;
const { UPDATE_TEXT } = actions;

function text(state = '', action) {
  switch(action.type) {
    case UPDATE_TEXT:
      return action.text
    default:
      return state;
  }
}

const appStateReducer = combineReducers({
  text,
})

module.exports = appStateReducer;
