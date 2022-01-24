import { combineReducers } from 'redux';

import { commonInfoReducer } from './commonInfoReducer/commonInfoReducer';
import { editPatternsReducer } from './editPatternsReducer/editPatternsReducer';

// обьединённый редусер
export const rootReducer = combineReducers({
    common: commonInfoReducer,
    edit: editPatternsReducer,
});
