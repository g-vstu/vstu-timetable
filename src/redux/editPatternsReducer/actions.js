import {
    ADD_FILTER,
    CLEAR_PATTERNS_TO_SEND,
    DELETE_PATTERN,
    FILL_PATTERN,
    GET_PATTERNS,
    POST_PATTERNS_LIST,
} from '../static/types';
import { BASE_URL } from '../static/static';
import { showLoader, hideLoader, showAlert } from '../static/actions';

export function addFilter(filter, name) {
    return {
        type: ADD_FILTER,
        payload: filter,
        name,
    };
}

export function fillPattern(item) {
    return {
        type: FILL_PATTERN,
        payload: item,
    };
}

export function clearPatternToSend() {
    return {
        type: CLEAR_PATTERNS_TO_SEND,
        payload: [],
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

export function deletePattern(id) {
    return async (dispatch) => {
        try {
            dispatch(showLoader());
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            };

            const response = await fetch(
                `${BASE_URL}/timetable/patterns/${id}`,
                requestOptions
            );
            // const result = await response.json();
            dispatch({ type: DELETE_PATTERN, payload: response });
            dispatch(hideLoader());
            dispatch(showAlert('Данные удалены'));
        } catch (error) {
            console.error(error);
            dispatch(showAlert('Что-то пошло не так!'));
            dispatch(hideLoader());
        }
    };
}

export function postPatternsList(bodyItems) {
    return async (dispatch) => {
        try {
            dispatch(showLoader());
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyItems),
            };

            const response = await fetch(
                `${BASE_URL}/timetable/patterns/list`,
                requestOptions
            );
            const result = await response.json();
            dispatch({ type: POST_PATTERNS_LIST, payload: result });
            dispatch(hideLoader());
            if (!bodyItems.length) {
                dispatch(showAlert('Что-то пошло не так!'));
            } else {
                dispatch(showAlert('Данные успешно отправлены на сервер!'));
            }
        } catch (error) {
            console.log(error);
            dispatch(showAlert('Что-то пошло не так!'));
            dispatch(hideLoader());
        }
    };
}
