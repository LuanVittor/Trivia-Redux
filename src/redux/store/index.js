import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducers from '../reducer';

const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(thunk)),
);

if (window.Cypress) {
  window.store = store;
}

export default store;
