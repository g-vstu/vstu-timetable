import { HIDE_ALERT, HIDE_LOADER, SHOW_ALERT, SHOW_LOADER } from './types';

// Экшн для показа загрузки
export function showLoader() {
    return {
        type: SHOW_LOADER,
    };
}

// экшн для скрытия загрузки
export function hideLoader() {
    return {
        type: HIDE_LOADER,
    };
}

// Экшн для показа алерта
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

// экшн для скрытия алерта
export function hideAlert() {
    return {
        type: HIDE_ALERT,
    };
}
