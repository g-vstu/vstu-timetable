import {
    GET_DISCIPLINES,
    GET_GROUPS,
    GET_LESSON_TIME,
    GET_LESSON_TYPE,
    GET_SPECIALTIES,
    GET_TEACHERS,
    HIDE_ALERT,
    HIDE_LOADER,
    SHOW_ALERT,
    SHOW_LOADER,
} from '../static/types';

const initialState = {
    days: [
        { value: 'MONDAY', label: 'Понедельник' },
        { value: 'TUESDAY', label: 'Вторник' },
        { value: 'WEDNESDAY', label: 'Среда' },
        { value: 'THURSDAY', label: 'Четверг' },
        { value: 'FRIDAY', label: 'Пятница' },
        { value: 'SATURDAY', label: 'Суббота' },
        { value: 'SUNDAY', label: 'Воскресенье' },
    ],
    specialities: [],
    courses: [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6' },
    ],
    lessonTime: [],
    periodicity: [
        { value: null, label: 'Всегда' },
        { value: 1, label: '1 неделя' },
        { value: 2, label: '2 неделя' },
        { value: 3, label: '3 неделя' },
        { value: 4, label: '4 неделя' },
        { value: true, label: 'Числитель' },
        { value: false, label: 'Знаменатель' },
    ],
    lessonFrame: [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
        { value: 5, label: 5 },
    ],
    disciplines: [],
    lessonType: [],
    groups: [],
    subGroups: [
        { value: 0, label: 'Все' },
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
    ],
    teachers: [],
    loading: false,
    alert: null,
};

export const commonInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SPECIALTIES:
            return { ...state, specialities: action.payload };
        case GET_DISCIPLINES:
            return { ...state, disciplines: action.payload };
        case GET_LESSON_TIME:
            return { ...state, lessonTime: action.payload };
        case GET_LESSON_TYPE:
            return { ...state, lessonType: action.payload };
        case GET_TEACHERS:
            return { ...state, teachers: action.payload };
        case GET_GROUPS:
            return { ...state, groups: action.payload };
        case SHOW_LOADER:
            return { ...state, loading: true };
        case HIDE_LOADER:
            return { ...state, loading: false };
        case SHOW_ALERT:
            return { ...state, alert: action.payload };
        case HIDE_ALERT:
            return { ...state, alert: null };
        default:
            return state;
    }
};
