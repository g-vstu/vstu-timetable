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
    },
});

export const { fillPattern } = patternsReducer.actions;

export default patternsReducer.reducer;
