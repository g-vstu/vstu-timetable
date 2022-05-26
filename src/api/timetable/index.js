import axios from "axios";
import { api } from "..";

export function getAllPatterns() {
    return api.get("/timetable/patterns");
}

export function deletePatternById(id) {
    return api.delete(`/timetable/patterns/${id}`);
}

export function updatePattern(patternID, updateContent) {
    return api.patch(`/timetable/patterns/${patternID}`, updateContent);
}

export function addPatternsList(content) {
    return api.patch("/timetable/patterns/list/2", content);
}
