export const parsedCurrentYear = () => {
    var date = new Date();
    date.setDate(date.getDate() - 1);
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    date = yyyy;
    return date.toString();
};

export const parsedCurrentMonth = () => {
    var date = new Date();
    date.setDate(date.getDate() - 1);
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    date = mm;
    return date.toString();
};

export const parsedCurrentDay = () => {
    var date = new Date();
    date.setDate(date.getDate() - 1);
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    date = dd;
    return date.toString();
};

export const parsedDateYesterDay = () => {
    var date = new Date();
    date.setDate(date.getDate() - 1);
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    date = dd + '-' + mm + '-' + yyyy;
    return date.toString();
};

export const parsedDateToDay = () => {
    var date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    date = dd + '-' + mm + '-' + yyyy;
    return date.toString();
};

export const parsedDateToDayToString = date => {
    if (date === null || !date) {
        return '';
    }
    if (typeof date === 'string') {
        date = new Date(date);
    }
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();

    //var seconds = date.getSeconds();
    var minutes = date.getMinutes();
    var hour = date.getHours();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    date = dd + '-' + mm + '-' + yyyy + ' ' + hour + ':' + minutes;
    return date.toString();
};

export const parsedDate = strDate => {
    var strSplitDate = strDate.split(' ');
    var date = new Date(strSplitDate[0]);
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    date = dd + '-' + mm + '-' + yyyy;
    const retornar = date.toString();
    const currentDay = parsedCurrentDay();
    const currentMonth = parsedCurrentMonth();
    const currentYear = parsedCurrentYear();

    if (yyyy == currentYear && mm == currentMonth && dd == currentDay) {
        return 'hoy';
    } else {
        //Dias
        if (yyyy == currentYear && mm == currentMonth) {
            for (var i = 1; i < 10; i++) {
                if (dd == Number(currentDay) - i) {
                    return 'hace ' + i + (i == 1 ? ' día' : ' días');
                }
            }
            return 'este mes';
        } else if (yyyy == currentYear) {
            for (var j = 1; j < 5; j++) {
                if (mm == Number(currentMonth) - i) {
                    return 'hace ' + i + (i == 1 ? ' mes' : ' meses');
                }
            }
            return 'este año';
        } else if (yyyy < currentYear) {
            return 'hace más de 1 año';
        } else {
            return date.toString();
        }
    }
};


export function getTimeSince(date = null) {
    if (date !== null) {
        if (date instanceof Date) {

        } else {
            if (date.indexOf(".") !== -1) {
                date = date.split('.')[0];
            }
            if (date.indexOf(" ") !== -1) {
                date = date.split(' ')[0];
            }
            date = new Date(date);
        }
    } else {
        date = new Date();
    }
    const now_utc = new Date(new Date().toUTCString().substr(0, 25));
    var seconds = Math.floor((now_utc - date) / 1000);
    var interval = seconds / 31536000;
    if (interval > 1) {
        return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes";
    }
    if (Math.floor(seconds) <= 10) {
        return "just now";
    }
    return Math.floor(seconds) + " seconds";
};