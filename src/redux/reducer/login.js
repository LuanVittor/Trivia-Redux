import { PLAYER } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
};

function login(state = INITIAL_STATE, action) {
  switch (action.type) {
  case PLAYER:
    return {
      ...state,
      name: action.name,
      email: action.email,
    };
  default:
    return state;
  }
}

export default login;
