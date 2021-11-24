import { createStore } from 'redux';
import rootReducers from '../reducer';
// import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
  rootReducers,
  // composeWithDevTools
);

if (window.Cypress) {
  window.store = store;
}

export default store;
