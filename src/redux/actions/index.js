export const PLAYER = 'PLAYER';
export const REQUEST_API_SUCCESS = 'REQUEST_API_SUCCESS';
export const SCORE = 'SCORE';

export const player = (name, email) => ({ type: PLAYER, name, email });

export const apiSuccess = (api) => ({ type: REQUEST_API_SUCCESS, api });

export const scores = (score) => ({ type: SCORE, score });
