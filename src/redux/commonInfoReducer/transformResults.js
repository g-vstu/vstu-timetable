export const _transformDiscipline = (item) => {
    return {
        key: item.id,
        value: item.name,
        label: item.name,
    };
};

export const _transformSpeciality = (item) => {
    return {
        key: item.id,
        value: item.id,
        label: item.name,
    };
};

export const _transformPeriodClass = (item) => {
    return {
        key: item.id,
        value: item.numberClass,
        label: `${item.timeStart} - ${item.timeStop}`,
    };
};

export const _transformTypeOfClass = (item) => {
    return {
        key: item.id,
        value: item.name,
        label: item.name,
    };
};

export const _transformGroups = (item) => {
    return {
        key: item.id,
        value: item.name,
        label: item.name,
        сourse: item.сourse,
    };
};

export const _tranfromTeachers = (item) => {
    return {
        key: item.id,
        value: `${item.surname} ${item.name} ${item.patronymic}`,
        label: `${item.surname} ${item.name} ${item.patronymic}`,
    };
};
