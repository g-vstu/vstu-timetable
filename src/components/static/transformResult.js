function _transformFacultyResult(item) {
    return {
        id: item.id,
        name: item.name,
        shortName: item.shortName,
        dean: item.dean,
        discription: item.discription,
    };
}

function _transformDepartmentResult(item) {
    return {
        id: item.id,
        name: item.name,
        shortName: item.shortName,
        departmentAuditoriumNumber: item.departmentAuditoriumNumber,
    };
}

function _transformSpecialityResult(item) {
    return {
        id: item.id,
        name: item.name,
        shortName: item.shortName,
        codeSpeciality: item.codeSpeciality,
        trainingPeriod: item.trainingPeriod,
        qualification: item.qualification,
        discription: item.discription,
    };
}

function _transformDisciplineResult(item) {
    return {
        id: item.id,
        name: item.name,
        shortName: item.shortName,
    };
}

function _transformGroupResult(item) {
    return {
        id: item.id,
        name: item.name,
        yearStart: item.yearStart,
        yearEnd: item.yearEnd,
        course: item.course,
    };
}

function _transformPeriodClassResult(item) {
    return {
        id: item.id,
        numberClass: item.numberClass,
        timeStart: item.timeStart,
        timeStop: item.timeStop,
    };
}

function _transformTypeOfClass(item) {
    return {
        id: item.id,
        name: item.name,
    };
}
