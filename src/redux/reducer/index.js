import { combineReducers } from 'redux';
import login from './login';
import getScore from './score';

const rootReducers = combineReducers({ login, getScore });

export default rootReducers;
