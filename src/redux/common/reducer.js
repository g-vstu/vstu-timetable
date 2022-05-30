import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    alert: null,
};

const commonReducer = createSlice({
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
});
