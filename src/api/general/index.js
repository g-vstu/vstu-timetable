import { api, api2 } from "..";

export function getAllSpecialties() {
    return api2.get("/specialities?query=");
}

export function getLessonTimes() {
    return api.get("/common-info/classes");
}

export function getAllDisciplines() {
    return api2.get("/disciplines?query=");
}

export function getLessonTypes() {
    return api.get("/common-info/types-of-classes");
}

export function getGroupsByParams(groupID, courseNUM) {
    return api2.get(
        `/groups?query=course==${courseNUM};speciality.id==${groupID}`
        // `/common-info/groups/search?q=сourse==${courseNUM};specialty.id==${groupID}`
    );
}

export function getGroupsAll() {
    return api2.get("/groups?query=");
}

export function getAllTeachers() {
    return api2.get("/teachers?query=");
}

export function getLocationsByFrame(frame) {
    return api.get(`/common-info/classrooms/search?q=frame==${frame}`);
}

export function getLocationsAll() {
    return api.get("/common-info/classrooms");
}
