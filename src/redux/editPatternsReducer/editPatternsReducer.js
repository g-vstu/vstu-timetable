import {
    ADD_FILTER,
    HIDE_LOADER,
    SHOW_LOADER,
    GET_PATTERNS,
    FILL_PATTERN,
    POST_PATTERNS_LIST,
    DELETE_PATTERN,
    CLEAR_PATTERNS_TO_SEND,
    PATCH_PATTERNS_LIST,
} from '../static/types';

const initialState = {
    patterns: [],
    patternsToSend: [],
    filter: {
        day: '',
        group: '',
        frame: '',
    },
    loading: false,
    alert: null,
};

export const editPatternsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FILTER:
            return {
                ...state,
                filter: { ...state.filter, [action.name]: action.payload },
            };
        case SHOW_LOADER:
            return { ...state, loading: true };
        case HIDE_LOADER:
            return { ...state, loading: false };
        case GET_PATTERNS:
            if (!state.filter.day.trim()) {
                return {
                    ...state,
                    patterns: [],
                    // patterns: action.payload.sort(function (a, b) {
                    //     return a.lessonNumber - b.lessonNumber;
                    // }),
                };
            } else {
                if (!state.filter.group.trim()) {
                    return {
                        ...state,
                        patterns: action.payload
                            .sort(function (a, b) {
                                return a.lessonNumber - b.lessonNumber;
                            })
                            .filter((item) => {
                                return item.lessonDay === state.filter.day;
                            }),
                    };
                } else {
                    return {
                        ...state,
                        patterns: action.payload
                            .sort(function (a, b) {
                                return a.lessonNumber - b.lessonNumber;
                            })
                            .filter((item) => {
                                return item.lessonDay === state.filter.day;
                            })
                            .filter((item) => {
                                return item.groupName === state.filter.group;
                            }),
                    };
                }
            }
        case FILL_PATTERN:
            return {
                ...state,
                patternsToSend: [...state.patternsToSend, action.payload],
            };
        case CLEAR_PATTERNS_TO_SEND:
            return {
                ...state,
                patternsToSend: action.payload,
            };
        case POST_PATTERNS_LIST:
            return {
                ...state,
            };
        case PATCH_PATTERNS_LIST:
            return {
                ...state,
            };
        case DELETE_PATTERN:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};
