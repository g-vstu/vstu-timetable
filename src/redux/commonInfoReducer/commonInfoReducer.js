import {
    GET_DISCIPLINES,
    GET_GROUPS,
    GET_LESSON_TIME,
    GET_LESSON_TYPE,
    GET_SPECIALTIES,
    GET_TEACHERS,
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
        default:
            return state;
    }
};
