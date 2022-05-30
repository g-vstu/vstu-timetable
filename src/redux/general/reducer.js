import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
    _transformTeachers,
    _transformDiscipline,
    _transformGroups,
    _transformLocations,
    _transformPeriodClass,
    _transformSpecialty,
    _transformTypeOfClass,
} from "../../store/commonInfoReducer/transformResults";

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
    specialties: [],
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
};

export const getSpecialties = createAsyncThunk(
    "general/getSpecialties",
    async () => {
        const response = await getAllSpecialties();
        return response.map(_transformSpecialty);
    }
);

export const getLessonTime = createAsyncThunk(
    "general/getLessonTime",
    async () => {
        const response = await getLessonTimes();
        return response.map(_transformPeriodClass);
    }
);

export const getDisciplines = createAsyncThunk(
    "general/getDisciplines",
    async () => {
        const response = await getAllDisciplines();
        return response.map(_transformDiscipline);
    }
);

export const getLessonType = createAsyncThunk(
    "general/getLessonType",
    async () => {
        const response = await getLessonTypes();
        return response.map(_transformTypeOfClass);
    }
);

export const getGroups = createAsyncThunk(
    "general/getGroups",
    async ({ id, courseNum }) => {
        const response = await getGroupsByParams(id, courseNum);
        return response.map(_transformGroups);
    }
);

export const getAllGroups = createAsyncThunk(
    "general/getAllGroups",
    async () => {
        const response = await getGroupsAll();
        return response.map(_transformGroups);
    }
);

export const getTeachers = createAsyncThunk("general/getTeachers", async () => {
    const response = await getAllTeachers();
    return response.map(_transformTeachers);
});

export const getLocations = createAsyncThunk(
    "general/getLocations",
    async (frame) => {
        const response = await getLocationsByFrame(frame);
        return response.map(_transformLocations);
    }
);

export const getAllLocations = createAsyncThunk(
    "general/getAllLocations",
    async () => {
        const response = await getLocationsAll();
        return response.map(_transformLocations);
    }
);

const generalReducer = createSlice({
    name: "general",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSpecialties.fulfilled, (state, action) => {
            state.specialties = action.payload;
            // hideLoader();
        });
        builder.addCase(getLessonTime.fulfilled, (state, action) => {
            state.lessonTime = action.payload;
        });
        builder.addCase(getDisciplines.fulfilled, (state, action) => {
            state.disciplines = action.payload;
        });
        builder.addCase(getLessonType.fulfilled, (state, action) => {
            state.lessonType = action.payload;
        });
        builder.addCase(getGroups.fulfilled, (state, action) => {
            state.groups = action.payload;
        });
        builder.addCase(getAllGroups.fulfilled, (state, action) => {
            state.groups = action.payload;
        });
        builder.addCase(getTeachers.fulfilled, (state, action) => {
            state.teachers = action.payload;
        });
        builder.addCase(getLocations.fulfilled, (state, action) => {
            state.locations = action.payload;
        });
        builder.addCase(getAllLocations.fulfilled, (state, action) => {
            state.locations = action.payload;
        });
    },
});

export default generalReducer.reducer;
