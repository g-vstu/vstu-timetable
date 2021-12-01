import {
    ADD_FILTER,
    HIDE_LOADER,
    SHOW_LOADER,
    GET_PATTERNS,
} from '../static/types';

const initialState = {
    patterns: [],
    filter: '',
    loading: false,
    alert: null,
};

export const editReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FILTER:
            return { ...state, filter: action.payload };
        case SHOW_LOADER:
            return { ...state, loading: true };
        case HIDE_LOADER:
            return { ...state, loading: false };
        case GET_PATTERNS:
            if (!state.filter.trim()) {
                return { ...state, patterns: action.payload };
            } else {
                return {
                    ...state,
                    patterns: action.payload.filter((item) => {
                        return item.lessonDay === state.filter;
                    }),
                };
            }
        default:
            return state;
    }
};
