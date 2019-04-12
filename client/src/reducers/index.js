import user from './user_reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    user
});

export default rootReducer;