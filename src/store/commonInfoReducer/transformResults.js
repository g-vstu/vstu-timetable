// Файл с трансформацией ответов от бэка для дальнейшего использования в селектах

export const _transformDiscipline = (item) => {
    return {
        key: item.id,
        value: item.name,
        label: item.shortName,
        tooltip: `Наименование дисциплины: ${item.name}`,
    };
};

export const _transformSpecialty = (item) => {
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
        label: `${item.timeStart.slice(0, -3)} - ${item.timeStop.slice(0, -3)}`,
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

export const _transformTeachers = (item) => {
    return {
        key: item.id,
        value: `${item.surname} ${item.name} ${item.patronymic}`,
        label: `${item.surname} ${item.name} ${item.patronymic}`,
    };
};

export const _transformLocations = (item) => {
    return {
        key: item.id,
        value: item.location,
        frame: item.frame,
        label: `Ауд. ${item.location}(${item.typeClassRoom.name})`,
        tooltip: `№ аудитории: ${item.location},
            Тип аудитории: ${item.typeClassRoom.name}, 
            Кол-во мест: ${item.seats}`,
    };
};
