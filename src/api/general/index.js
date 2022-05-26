import { api } from "..";

export function getAllSpecialties() {
    return api.get("/common-info/specialities");
}

export function getLessonTimes() {
    return api.get("/common-info/classes");
}

export function getAllDisciplines() {
    return api.get("/common-info/disciplines");
}

export function getLessonTypes() {
    return api.get("/common-info/types-of-classes");
}

export function getGroupsByParams(groupID, courseNUM) {
    return api.get(
        `/common-info/groups/search?q=сourse==${courseNUM};specialty.id==${groupID}`
    );
}

export function getGroupsAll() {
    return api.get("/common-info/groups");
}

export function getAllTeachers() {
    return api.get("/common-info/employees");
}

export function getLocationsByFrame(frame) {
    return api.get(`/common-info/classrooms/search?q=frame==${frame}`);
}

export function getLocationsAll() {
    return api.get("/common-info/classrooms");
}
