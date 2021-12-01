import {
    ADD_FILTER,
    GET_PATTERNS,
    HIDE_ALERT,
    HIDE_LOADER,
    SHOW_ALERT,
    SHOW_LOADER,
} from './static/types';
import { BASE_URL } from './static/static';

export function addFilter(filter) {
    return {
        type: ADD_FILTER,
        payload: filter,
    };
}

export function showLoader() {
    return {
        type: SHOW_LOADER,
    };
}

export function hideLoader() {
    return {
        type: HIDE_LOADER,
    };
}

export function showAlert(text) {
    return (dispatch) => {
        dispatch({
            type: SHOW_ALERT,
            payload: text,
        });

        setTimeout(() => {
            dispatch(hideAlert());
        }, 4000);
    };
}

export function hideAlert() {
    return {
        type: HIDE_ALERT,
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
            console.log('ops');
        }
    };
}
