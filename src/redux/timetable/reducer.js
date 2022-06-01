import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    deletePatternById,
    getAllPatterns,
    updatePattern,
} from "../../api/timetable";

const initialState = {
    patterns: [],
    patternsToSend: [],
    filter: {
        day: "",
        group: "",
        frame: "",
    },
    loading: false,
    alert: null,
};

export const getPatterns = createAsyncThunk(
    "timetable/getPatterns",
    async () => {
        const response = await getAllPatterns();
        return response;
    }
);

export const patchPattern = createAsyncThunk(
    "timetable/patchPattern",
    async ({ id, bodyItems }) => {
        const response = await updatePattern(id, JSON.stringify(bodyItems));
        return response;
    }
);

export const deletePattern = createAsyncThunk(
    "timetable/deletePattern",
    async (id) => {
        const response = await deletePatternById(id);
        return response;
    }
);

const timetableReducer = createSlice({
    name: "timetable",
    initialState,
    reducers: {
        addFilter: (state, action) => {
            const { filter, name } = action.payload;
            state.filter = { ...state.filter, [name]: filter };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getPatterns.fulfilled, (state, action) => {
            if (!state.filter.day.trim()) {
                state.patterns = [];
            } else {
                if (!state.filter.group.trim()) {
                    state.patterns = action.payload
                        .sort(function (a, b) {
                            return a.lessonNumber - b.lessonNumber;
                        })
                        .filter((item) => {
                            return item.lessonDay === state.filter.day;
                        });
                } else {
                    state.patterns = action.payload
                        .sort(function (a, b) {
                            return a.lessonNumber - b.lessonNumber;
                        })
                        .filter((item) => {
                            return item.lessonDay === state.filter.day;
                        })
                        .filter((item) => {
                            return item.groupName === state.filter.group;
                        });
                }
            }
        });
        builder.addCase(deletePattern.fulfilled, (state) => state);
        builder.addCase(patchPattern.fulfilled, (state) => state);
    },
});

export const { addFilter } = timetableReducer.actions;

export default timetableReducer.reducer;
