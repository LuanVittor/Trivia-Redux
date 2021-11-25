import { SCORE } from '../actions';

const INITIAL_STATE = {
  score: 0,
};

function getScore(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SCORE:
    return {
      ...state,
      score: action.score,
    };
  default:
    return state;
  }
}

export default getScore;
