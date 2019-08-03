export function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

export function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export function isIdNum(obj) {
    let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    return reg.test(obj);
}

export function getUrlQuery(key) {
    var url = window.location.href;
    var parameter = url.substring(url.indexOf('?') + 1);
    parameter = parameter.split('&');
    var reg = new RegExp(`${key}=`,"g");
    var menuCode = "";
    for (var i = 0; i < parameter.length; i++) {
        reg.lastIndex = 0;
        if (reg.test(parameter[i])) {
            menuCode = parameter[i].replace(`${key}=`, "");
            break;
        }
    }
    return menuCode;
}

export function getRandomArray(arr, count) {
    let shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}

