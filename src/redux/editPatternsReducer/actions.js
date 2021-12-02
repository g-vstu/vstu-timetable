import { ADD_FILTER, FILL_PATTERN, GET_PATTERNS } from '../static/types';
import { BASE_URL } from '../static/static';
import { showLoader, hideLoader, showAlert } from '../static/actions';

export function addFilter(filter) {
    return {
        type: ADD_FILTER,
        payload: filter,
    };
}

export function fillPattern(item) {
    return {
        type: FILL_PATTERN,
        payload: item,
    };
}

export function getPatterns() {
    return async (dispatch) => {
        try {
            dispatch(showLoader());
            const response = await fetch(`${BASE_URL}/timetable/patterns`);
            const json = await response.json();
            dispatch({ type: GET_PATTERNS, payload: json });
            dispatch(hideLoader());
        } catch (error) {
            dispatch(showAlert('Что-то пошло не так'));
            dispatch(hideLoader());
        }
    };
}
