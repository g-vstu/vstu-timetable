import { configureStore } from "@reduxjs/toolkit";

import general from "./general/reducer";

export const store = configureStore({
    reducer: {
        common: general,
    },
});
