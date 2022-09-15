import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const patternsReducer = createSlice({
    name: "patternList",
    initialState,
    reducers: {
        fillPattern: (state, action) => {
            const { name, pattern } = action.payload;
            state[name] = pattern;
        },
        clearPatterns: (state) => {
            Object.getOwnPropertyNames(state).forEach(function (prop) {
                delete state[prop];
            });
            state = {};
        },
        deletePattern: (state, action) => void delete state[action.payload],
    },
});

export const { fillPattern, clearPatterns, deletePattern } =
    patternsReducer.actions;

export default patternsReducer.reducer;
