import {
    ADD_FILTER,
    CLEAR_PATTERNS_TO_SEND,
    DELETE_PATTERN,
    FILL_PATTERN,
    GET_PATTERNS,
    PATCH_PATTERNS_LIST,
    POST_PATTERNS_LIST,
} from "../static/types";
import { showLoader, hideLoader, showAlert } from "../static/actions";
import {
    addPatternsList,
    deletePatternById,
    getAllPatterns,
    updatePattern,
} from "../../api/timetable";

// функция фильтра для отображения занятий в расписании
export function addFilter(filter, name) {
    return {
        type: ADD_FILTER,
        payload: filter,
        name,
    };
}

// экшен добавления заполненного занятия в массив
export function fillPattern(item) {
    return {
        type: FILL_PATTERN,
        payload: item,
    };
}

// функция очистки массива занятий
export function clearPatternToSend() {
    return {
        type: CLEAR_PATTERNS_TO_SEND,
        payload: [],
    };
}

// функция получения занятий с сервера timetable
export function getPatterns() {
    return async (dispatch) => {
        dispatch(showLoader());
        await getAllPatterns()
            .then((data) => {
                dispatch({ type: GET_PATTERNS, payload: data });
                dispatch(hideLoader());
            })
            .catch((error) => {
                console.error(error);
                dispatch(showAlert("Что-то пошло не так", "warning"));
                dispatch(hideLoader());
            });
    };
}

// функция удаления занятия
export function deletePattern(id) {
    return async (dispatch) => {
        dispatch(showLoader());
        await deletePatternById(id)
            .then((data) => {
                dispatch({ type: DELETE_PATTERN, payload: data });
                dispatch(hideLoader());
            })
            .catch((error) => {
                console.error(error);
                dispatch(showAlert("Что-то пошло не так!", "warning"));
                dispatch(hideLoader());
            });
    };
}

// функция редактирования занятия
export function patchPattern(id, bodyItems) {
    return async (dispatch) => {
        dispatch(showLoader());
        await updatePattern(id, JSON.stringify(bodyItems))
            .then((data) => {
                dispatch({ type: PATCH_PATTERNS_LIST, payload: data });
                dispatch(hideLoader());
                dispatch(showAlert("Данные успешно обновлены!", "success"));
            })
            .catch((error) => {
                console.error(error);
                dispatch(showAlert("Что-то пошло не так!", "warning"));
                dispatch(hideLoader());
            });
    };
}

// функция отправки массива занятий на сервер timetable
export function postPatternsList(bodyItems) {
    return async (dispatch) => {
        dispatch(showLoader());
        await addPatternsList(JSON.stringify(bodyItems))
            .then(() => {
                dispatch({ type: POST_PATTERNS_LIST });
                dispatch(
                    showAlert("Данные успешно отправлены на сервер!", "success")
                );
                dispatch(hideLoader());
            })
            .catch((error) => {
                console.error(error);
                dispatch(showAlert("Что-то пошло не так!", "warning"));
                dispatch(hideLoader());
            });
    };
}
