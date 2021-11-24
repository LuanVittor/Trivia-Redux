<<<<<<< HEAD
import { createStore } from 'redux';
import rootReducers from '../reducer';
// import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
  rootReducers,
  // composeWithDevTools
=======
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducers from '../reducer';

const store = createStore(
  rootReducers,
  applyMiddleware(thunk),
>>>>>>> 9ce1b3963f2e1420c90201934002454f7157d8b9
);

if (window.Cypress) {
  window.store = store;
}

export default store;
