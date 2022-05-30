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
    _tranfromTeachers,
    _transformDiscipline,
    _transformGroups,
    _transformLocations,
    _transformPeriodClass,
    _transformSpeciality,
    _transformTypeOfClass,
} from "../../store/commonInfoReducer/transformResults";
import {
    hideAlert,
    hideLoader,
    showAlert,
    showLoader,
} from "../../store/static/actions";

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
    loading: false,
    alert: null,
};

export const getSpecialties = createAsyncThunk(
    "general/getSpecialties",
    async () => {
        const response = await getAllSpecialties();
        return response.map(_transformSpeciality);
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

export const getAllGroups = createAsyncThunk("general/getGroups", async () => {
    const response = await getGroupsAll();
    return response.map(_transformGroups);
});

export const getTeachers = createAsyncThunk("general/getTeachers", async () => {
    const response = await getAllTeachers();
    return response.map(_tranfromTeachers);
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

export const getCommonData = createAsyncThunk(
    "general/getCommonData",
    async (dispatch) => {
        // dispatch(getSpecialties());
        // dispatch(getLessonTime());
        // dispatch(getDisciplines());
        // dispatch(getLessonType());
        // dispatch(getTeachers());
    }
);

const generalReducer = createSlice({
    name: "general",
    initialState,
    reducers: {
        showLoader: (state, action) => {
            state.loading = true;
        },
        hideLoader: (state, action) => {
            state.loading = false;
        },
        showAlert: (state, action) => {
            const { text, status } = action.payload;
            state.alert = { text, status };
        },
        hideAlert: (state, action) => {
            state.alert = null;
        },
    },
    extraReducers: (builder) => {
        // builder.addCase(getSpecialties.pending, () => {
        //     showLoader();
        // });
        // builder.addCase(getSpecialties.rejected, () => {
        //     showAlert("Что-то пошло не так", "warning");
        //     setTimeout(() => {
        //         hideAlert();
        //     }, 3000);
        // });
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
        // builder.addCase(getAllGroups.fulfilled, (state, action) => {
        //     state.groups = action.payload;
        // });
        builder.addCase(getTeachers.fulfilled, (state, action) => {
            state.teachers = action.payload;
        });
        builder.addCase(getLocations.fulfilled, (state, action) => {
            state.locations = action.payload;
        });
        builder.addCase(getAllLocations.fulfilled, (state, action) => {
            state.locations = action.payload;
        });
        builder.addCase(getCommonData.fulfilled, (state, action) => {
            // state.locations = action.payload;
            getSpecialties();
            getLessonTime();
            getDisciplines();
            getLessonType();
            getTeachers();
        });
    },
});

export default generalReducer.reducer;
