import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    days: [
        { value: "MONDAY", label: "Понедельник" },
        { value: "TUESDAY", label: "Вторник" },
        { value: "WEDNESDAY", label: "Среда" },
        { value: "THURSDAY", label: "Четверг" },
        { value: "FRIDAY", label: "Пятница" },
        { value: "SATURDAY", label: "Суббота" },
        { value: "SUNDAY", label: "Воскресенье" },
    ],
    specialities: [],
    courses: [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5" },
        { value: "6", label: "6" },
    ],
    lessonTime: [],
    periodicity: [
        { value: null, label: "Всегда" },
        { value: 1, label: "1 неделя" },
        { value: 2, label: "2 неделя" },
        { value: 3, label: "3 неделя" },
        { value: 4, label: "4 неделя" },
        { value: true, label: "Числитель" },
        { value: false, label: "Знаменатель" },
    ],
    lessonFrame: [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 4, label: 4 },
        { value: 5, label: 5 },
    ],
    locations: [],
    disciplines: [],
    lessonType: [],
    groups: [],
    subGroups: [
        { value: 0, label: "Все" },
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
    ],
    teachers: [],
    loading: false,
    alert: null,
};

const commonReducer = createSlice({
    name: "common",
    initialState,
    reducers: {},
});
