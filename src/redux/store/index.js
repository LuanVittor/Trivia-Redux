import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducers from '../reducer';

const store = createStore(
  rootReducers,
  applyMiddleware(thunk),
);

if (window.Cypress) {
  window.store = store;
}

export default store;
