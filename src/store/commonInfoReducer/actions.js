import { hideLoader, showLoader, showAlert } from "../static/actions";
import {
    getAllDisciplines,
    getAllSpecialties,
    getAllTeachers,
    getGroupsAll,
    getGroupsByParams,
    getLessonTimes,
    getLessonTypes,
    getLocationsAll,
    getLocationsByFrame,
} from "../../api/general";
import {
    GET_ALL_GROUPS,
    GET_DISCIPLINES,
    GET_GROUPS,
    GET_LESSON_TIME,
    GET_LESSON_TYPE,
    GET_SPECIALTIES,
    GET_TEACHERS,
    GET_LOCATIONS,
} from "../static/types";
import {
    _transformDiscipline,
    _transformSpecialty,
    _transformPeriodClass,
    _transformTypeOfClass,
    _transformGroups,
    _transformTeachers,
    _transformLocations,
} from "./transformResults";

// Получение специальностей
export function getSpecialities() {
    return async (dispatch) => {
        await getAllSpecialties()
            .then((data) => {
                const result = data.map(_transformSpecialty);
                dispatch({ type: GET_SPECIALTIES, payload: result });
            })
            .catch((error) => {
                console.error(error);
                dispatch(showAlert("Что-то пошло не так", "warning"));
            });
    };
}

// Получение времени занятий
export function getLessonTime() {
    return async (dispatch) => {
        await getLessonTimes()
            .then((data) => {
                const result = data.map(_transformPeriodClass);
                dispatch({ type: GET_LESSON_TIME, payload: result });
            })
            .catch((error) => {
                console.error(error);
                dispatch(showAlert("Что-то пошло не так", "warning"));
            });
    };
}

// Получение дисциплин
export function getDisciplines() {
    return async (dispatch) => {
        await getAllDisciplines()
            .then((data) => {
                const result = data.map(_transformDiscipline);
                dispatch({ type: GET_DISCIPLINES, payload: result });
            })
            .catch((error) => {
                console.error(error);
                dispatch(showAlert("Что-то пошло не так", "warning"));
            });
    };
}

// Получение типов занятий
export function getLessonType() {
    return async (dispatch) => {
        await getLessonTypes()
            .then((data) => {
                const result = data.map(_transformTypeOfClass);
                dispatch({ type: GET_LESSON_TYPE, payload: result });
            })
            .catch((error) => {
                console.error(error);
                dispatch(showAlert("Что-то пошло не так", "warning"));
            });
    };
}

// Получение групп по специальности и курсу
export function getGroups(id, courseNum) {
    return async (dispatch) => {
        await getGroupsByParams(id, courseNum)
            .then((data) => {
                const result = data.map(_transformGroups);
                dispatch({ type: GET_GROUPS, payload: result });
            })
            .catch((error) => {
                console.error(error);
            });
    };
}

// Получение всех групп
export function getAllGroups() {
    return async (dispatch) => {
        await getGroupsAll()
            .then((data) => {
                dispatch({
                    type: GET_ALL_GROUPS,
                    payload: data.map(_transformGroups),
                });
            })
            .catch((error) => {
                console.error(error);
                dispatch(showAlert("Что-то пошло не так", "warning"));
            });
    };
}

// Получение преподавателей
export function getTeachers() {
    return async (dispatch) => {
        await getAllTeachers()
            .then((data) => {
                const result = data.map(_transformTeachers);
                dispatch({ type: GET_TEACHERS, payload: result });
            })
            .catch((error) => {
                console.error(error);
                dispatch(showAlert("Что-то пошло не так", "warning"));
            });
    };
}

// Получение аудиторий
export function getLocations(frame) {
    return async (dispatch) => {
        await getLocationsByFrame(frame)
            .then((data) => {
                const result = data.map(_transformLocations);
                dispatch({ type: GET_LOCATIONS, payload: result });
            })
            .catch((error) => {
                console.error(error);
                dispatch(showAlert("Что-то пошло не так", "warning"));
            });
    };
}

export function getAllLocations() {
    return async (dispatch) => {
        await getLocationsAll()
            .then((data) => {
                const result = data.map(_transformLocations);
                dispatch({ type: GET_LOCATIONS, payload: result });
            })
            .catch((error) => {
                console.error(error);
                dispatch(showAlert("Что-то пошло не так", "warning"));
            });
    };
}

// Фкункция для "активации" почти всех экшенов из этого файла
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
            dispatch(showAlert("Что-то пошло не так", "warning"));
            dispatch(hideLoader());
        }
    };
}
