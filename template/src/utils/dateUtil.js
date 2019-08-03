/**
 * 日期解析，字符串转日期
 * @param dateString 可以为2017-02-16，2017/02/16，2017.02.16
 * @returns {Date} 返回对应的日期对象
 */
function dateParse(dateString){
    if (typeof dateString === 'number') {
        if (/^\d+$/.test(dateString)) {
            return dateString;
        } else {
            throw new Error('Invalid date string. Valid ones like 2019-01-02 01:00:00 or 2019-01-02T01:00:00');
        }
    } else if (typeof dateString === 'string' && dateString.indexOf(' ') === 10) {
        return Date.parse(dateString.replace(' ', 'T'));
    } else if (typeof dateString === 'string' && dateString.indexOf('T') === 10) {
        return Date.parse(dateString);
    } else {
        throw new Error('Invalid date string. Valid ones like 2019-01-02 01:00:00 or 2019-01-02T01:00:00');
    }
}

/**
 * 日期比较大小
 * compareDateString大于dateString，返回1；
 * 等于返回0；
 * compareDateString小于dateString，返回-1
 * @param dateString 日期
 * @param compareDateString 比较的日期
 */
export function dateCompare(dateString, compareDateString){
    if(isEmpty(dateString)){
        alert("dateString不能为空");
        return;
    }
    if(isEmpty(compareDateString)){
        alert("compareDateString不能为空");
        return;
    }
    let dateTime = dateParse(dateString);
    let compareDateTime = dateParse(compareDateString);
    if(compareDateTime > dateTime){
        return 1;
    }else if(compareDateTime === dateTime){
        return 0;
    }else{
        return -1;
    }
}


function isEmpty(dateString) {
    return !dateString || dateString === undefined || dateString === '';
}

/**
 * 判断日期是否在区间内，在区间内返回true，否返回false
 * @param dateString 日期字符串
 * @param startDateString 区间开始日期字符串
 * @param endDateString 区间结束日期字符串
 * @returns {Number}
 */
export function isDateBetween(dateString, startDateString, endDateString){
    if(isEmpty(dateString)){
        alert("dateString不能为空");
        return;
    }
    if(isEmpty(startDateString)){
        alert("startDateString不能为空");
        return;
    }
    if(isEmpty(endDateString)){
        alert("endDateString不能为空");
        return;
    }
    let flag = false;
    let startFlag = (dateCompare(dateString, startDateString) < 1);
    let endFlag = (dateCompare(dateString, endDateString) > -1);
    if(startFlag && endFlag){
        flag = true;
    }
    return flag;
}

/**
 * 判断日期区间[startDateCompareString,endDateCompareString]是否完全在别的日期区间内[startDateString,endDateString]
 * 即[startDateString,endDateString]区间是否完全包含了[startDateCompareString,endDateCompareString]区间
 * 在区间内返回true，否返回false
 * @param startDateString 新选择的开始日期，如输入框的开始日期
 * @param endDateString 新选择的结束日期，如输入框的结束日期
 * @param startDateCompareString 比较的开始日期
 * @param endDateCompareString 比较的结束日期
 * @returns {Boolean}
 */
export function isDatesBetween(startDateString, endDateString,
                        startDateCompareString, endDateCompareString){
    if(isEmpty(startDateString)){
        alert("startDateString不能为空");
        return;
    }
    if(isEmpty(endDateString)){
        alert("endDateString不能为空");
        return;
    }
    if(isEmpty(startDateCompareString)){
        alert("startDateCompareString不能为空");
        return;
    }
    if(isEmpty(endDateCompareString)){
        alert("endDateCompareString不能为空");
        return;
    }
    let flag = false;
    let startFlag = (dateCompare(startDateCompareString, startDateString) < 1);
    let endFlag = (dateCompare(endDateCompareString, endDateString) > -1);
    if(startFlag && endFlag){
        flag = true;
    }
    return flag;
}

