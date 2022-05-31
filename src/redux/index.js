import { configureStore } from "@reduxjs/toolkit";

import general from "./general/reducer";
import common from "./common/reducer";
import timetable from "./timetable/reducer";
import patternList from "./patternList/reducer";

export const store = configureStore({
    reducer: {
        general,
        common,
        timetable,
        patternList,
    },
});
