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
        return res.map(this._transformFaculties);
    };

    getFacultie = async (id) => {
        const fac = await this.getResource(`/common-info/faculties/${id}`);
        return this._transformFaculties(fac);
    };

    getDepartmentsById = async (id) => {
        const res = await this.getResource(
            `/common-info/departments/search?q=faculty.id==${id}`
        );
        return res.map(this._transformFaculties);
    };

    _transformFaculties = (item) => {
        return {
            id: item.id,
            name: item.name,
            shortName: item.shortName,
            dean: item.dean,
            discription: item.discription,
        };
    };
}
