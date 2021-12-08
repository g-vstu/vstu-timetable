import { hideLoader, showLoader, showAlert } from '../static/actions';
import { BASE_URL } from '../static/static';
import {
    GET_DISCIPLINES,
    GET_GROUPS,
    GET_LESSON_TIME,
    GET_LESSON_TYPE,
    GET_SPECIALTIES,
    GET_TEACHERS,
} from '../static/types';
import {
    _transformDiscipline,
    _transformSpeciality,
    _transformPeriodClass,
    _transformTypeOfClass,
    _transformGroups,
    _tranfromTeachers,
} from './transformResults';

export function getSpecialities() {
    return async (dispatch) => {
        try {
            const response = await fetch(
                `${BASE_URL}/common-info/specialities`
            );

            const json = await response.json();
            const result = json.map(_transformSpeciality);

            dispatch({ type: GET_SPECIALTIES, payload: result });
        } catch (error) {
            console.log(error);
            dispatch(showAlert('Что-то пошло не так'));
        }
    };
}

export function getLessonTime() {
    return async (dispatch) => {
        try {
            const response = await fetch(`${BASE_URL}/common-info/classes`);

            const json = await response.json();
            const result = await json.map(_transformPeriodClass);

            dispatch({ type: GET_LESSON_TIME, payload: result });
        } catch (error) {
            console.log(error);
        }
    };
}

export function getDisciplines() {
    return async (dispatch) => {
        try {
            const response = await fetch(`${BASE_URL}/common-info/disciplines`);

            const json = await response.json();
            const result = json.map(_transformDiscipline);

            dispatch({ type: GET_DISCIPLINES, payload: result });
        } catch (error) {
            console.log(error);
        }
    };
}

export function getLessonType() {
    return async (dispatch) => {
        try {
            const response = await fetch(
                `${BASE_URL}/common-info/types-of-classes`
            );

            const json = await response.json();
            const result = json.map(_transformTypeOfClass);

            dispatch({ type: GET_LESSON_TYPE, payload: result });
        } catch (error) {
            console.log(error);
        }
    };
}

export function getGroups(id, courseNum) {
    return async (dispatch) => {
        try {
            const response = await fetch(
                `${BASE_URL}/common-info/groups/search?q=сourse==${courseNum};specialty.id==${id}`
            );

            const json = await response.json();
            const result = json.map(_transformGroups);

            dispatch({ type: GET_GROUPS, payload: result });
        } catch (error) {
            console.log(error);
        }
    };
}

export function getTeachers() {
    return async (dispatch) => {
        try {
            const response = await fetch(`${BASE_URL}/common-info/employees`);

            const json = await response.json();
            const result = json.map(_tranfromTeachers);

            dispatch({ type: GET_TEACHERS, payload: result });
        } catch (error) {
            console.log(error);
        }
    };
}

export function getCommonData() {
    return async (dispatch) => {
        try {
            dispatch(showLoader());
            dispatch(getSpecialities());
            dispatch(getLessonTime());
            dispatch(getDisciplines());
            dispatch(getLessonType());
            dispatch(getTeachers());
            dispatch(hideLoader());
        } catch (error) {
            dispatch(showAlert('Что-то пошло не так'));
            dispatch(hideLoader());
        }
    };
}
