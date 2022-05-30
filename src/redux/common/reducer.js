import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    alert: null,
};

const commonReducer = createSlice({
    name: "general",
    initialState,
    reducers: {
        showLoader: (state) => {
            state.loading = true;
        },
        hideLoader: (state) => {
            state.loading = false;
        },
        showAlert: (state, action) => {
            const { text, status } = action.payload;
            state.alert = { text, status };
        },
        hideAlert: (state) => {
            state.alert = null;
        },
    },
});

export const { showLoader, showAlert, hideLoader, hideAlert } =
    commonReducer.actions;

export default commonReducer.reducer;
