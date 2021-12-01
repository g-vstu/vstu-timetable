export default class TimetableService {
    constructor() {
        this._apiBase = 'http://192.168.11.252:8082';
    }

    // GET
    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        return await res.json();
    };

    getAllFaculties = async () => {
        const res = await this.getResource(`/common-info/faculties`);

        return res.map(this._transformFacultyResult);
    };

    getFaculty = async (id) => {
        const fac = await this.getResource(`/common-info/faculties/${id}`);

        return this._transformFacultyResult(fac);
    };

    getDepartmentsByFacultyId = async (id) => {
        const res = await this.getResource(
            `/common-info/departments/search?q=faculty.id==${id}`
        );
        return res.map(this._transformDepartmentResult);
    };

    getGroupsByDepartmentId = async (id) => {
        const res = await this.getResource(
            `/common-info/groups/search?q=department.id==${id}`
        );

        return res.map(this._transformGroupResult);
    };

    getGroupsByCourseAndSpecialty = async (id, courseNum) => {
        const res = await this.getResource(
            `/common-info/groups/search?q=сourse==${courseNum};specialty.id==${id}`
        );

        return res.map(this._transformGroupResult);
    };

    getTeachers = async () => {
        const res = await this.getResource(`/common-info/employees`);

        return res.map(this._tranfromTeachers);
    };

    // POST
    postResource = async (bodyItems) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyItems),
        };

        const res = await fetch(
            `${this._apiBase}/timetable/patterns`,
            requestOptions
        );

        return await res.json();
    };

    // TRANSFORM DATE
    _transformFacultyResult = (item) => {
        return {
            id: item.id,
            name: item.name,
            shortName: item.shortName,
            dean: item.dean,
            discription: item.discription,
        };
    };

    _transformDepartmentResult = (item) => {
        return {
            id: item.id,
            name: item.name,
            shortName: item.shortName,
            departmentAuditoriumNumber: item.departmentAuditoriumNumber,
        };
    };

    _transformGroupResult = (item) => {
        return {
            id: item.id,
            name: item.name,
            yearStart: item.yearStart,
            yearEnd: item.yearEnd,
            сourse: item.сourse,
        };
    };

    _tranfromTeachers = (item) => {
        return {
            id: item.id,
            surname: item.surname,
            name: item.name,
            patronymic: item.patronymic,
            degree: item.degree,
            position: item.position,
            photo: item.photo,
        };
    };
}
