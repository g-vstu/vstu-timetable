export default class TimetableService {
    constructor() {
        this._apiBase = 'http://192.168.11.252:8082';
    }

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

    getSpecialitiesByFacultyId = async (id) => {
        const res = await this.getResource(
            `/common-info/specialities/search?q=faculty.id==${id}`
        );

        return res.map(this._transformSpecialityResult);
    };

    // getGroupsBySpecialityId = async (id) => {
    //     const res = await this.getResource(`/common-info`);

    //     return res.map(this._transformResult);
    // };

    getGroupsByDepartmentId = async (id) => {
        const res = await this.getResource(
            `/common-info/groups/search?q=department.id==${id}`
        );

        return res.map(this._transformGroupResult);
    };

    getDisciplinesByDepartmentFacultyId = async (id) => {
        const res = await this.getResource(
            `/common-info/disciplines/search?q=department.faculty.id==${id}`
        );

        return res.map(this._transformDisciplineResult);
    };

    getPeriodClass = async () => {
        const res = await this.getResource(`/common-info/classes`);

        return res.map(this._transformPeriodClassResult);
    };

    getTypeOfClass = async () => {
        const res = await this.getResource(`/common-info/types-of-classes`);

        return res.map(this._transformTypeOfClass);
    };

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

    _transformSpecialityResult = (item) => {
        return {
            id: item.id,
            name: item.name,
            shortName: item.shortName,
            codeSpeciality: item.codeSpeciality,
            trainingPeriod: item.trainingPeriod,
            qualification: item.qualification,
            discription: item.discription,
        };
    };

    _transformDisciplineResult = (item) => {
        return {
            id: item.id,
            name: item.name,
            shortName: item.shortName,
        };
    };

    _transformGroupResult = (item) => {
        return {
            id: item.id,
            name: item.name,
            yearStart: item.yearStart,
            yearEnd: item.yearEnd,
            course: item.course,
        };
    };

    _transformPeriodClassResult = (item) => {
        return {
            id: item.id,
            numberClass: item.numberClass,
            timeStart: item.timeStart,
            timeStop: item.timeStop,
        };
    };

    _transformTypeOfClass = (item) => {
        return {
            id: item.id,
            name: item.name,
        };
    };
}
