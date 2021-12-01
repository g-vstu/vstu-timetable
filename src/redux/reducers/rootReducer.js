import { combineReducers } from 'redux';
import { editReducer } from './editReducer';

export const rootReducer = combineReducers({
    edit: editReducer,
});
