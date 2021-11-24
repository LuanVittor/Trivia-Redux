import { PLAYER, REQUEST_API_SUCCESS } from '../actions';

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
  case REQUEST_API_SUCCESS:
    return {
      ...state,
      token: action.api.token,
    };
  default:
    return state;
  }
}

export default login;
