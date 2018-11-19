import Moment from 'moment';

// let dateServer = value => {
//     return value.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')
// }
let datafmt = (input, fmtstring) => {
    // 使用momentjs这个日期格式化类库实现日期的格式化功能
    return Moment(input).format(fmtstring);
};
let NumFormat = value => {
    // 千分位格式化
    if (value === null || value === '' || value === undefined) return '0.00';

    var intPart = Number(value).toFixed(0); // 获取整数部分
    var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); // 将整数部分逢三一断

    var floatPart = '.00'; // 预定义小数部分
    var value2Array = value.split('.');

    // =2表示数据有小数位
    if (value2Array.length === 2) {
        floatPart = value2Array[1].toString(); // 拿到小数部分

        if (floatPart.length === 1) { // 补0,实际上用不着
            return intPartFormat + '.' + floatPart + '0';
        } else {
            return intPartFormat + '.' + floatPart;
        }
    } else {
        return intPartFormat + floatPart;
    }
};
let NumInt = value => {
    if (value === null || value === '' || value === undefined) {
        return '0';
    } else {
        let num = 0;
        if (value > 100000) {
            num = (value / 10000).toFixed(1) + '万';
        } else if (value > 100000000) {
            num = (value / 100000000).toFixed(1) + '亿';
        } else {
            num = value;
        }
        return num;
    }
};

let delHtmlDiv = value => {
    value = value.replace(/(\n)/g, "");
    value = value.replace(/(\t)/g, "");
    value = value.replace(/(\r)/g, "");
    value = value.replace(/<\/?[^>]*>/g, "");
    value = value.replace(/\s*/g, "");
    return value;
};
export { datafmt, NumFormat, NumInt, delHtmlDiv };

// Vue.filter('datafmt', function (input, fmtstring) {
// 	// 使用momentjs这个日期格式化类库实现日期的格式化功能
// 	return Moment(input / 1000).format(fmtstring);
// });


// Vue.filter('NumFormat', function (value) {
// 	if (value === null || value === '' || value === undefined) return '0.00';
//
// 	var intPart = Number(value).toFixed(0); // 获取整数部分
// 	var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); // 将整数部分逢三一断
//
// 	var floatPart = ".00"; // 预定义小数部分
// 	var value2Array = value.split(".");
//
// 	// =2表示数据有小数位
// 	if (value2Array.length === 2) {
// 		floatPart = value2Array[1].toString(); // 拿到小数部分
//
// 		if (floatPart.length === 1) { // 补0,实际上用不着
// 			return intPartFormat + "." + floatPart + '0';
// 		} else {
// 			return intPartFormat + "." + floatPart;
// 		}
// 	} else {
// 		return intPartFormat + floatPart;
// 	}
// });
// Vue.filter('NumInt', function (value) {
// 	if (value === null || value === '' || value === undefined) {
// 		return '0';
// 	} else {
// 		return parseInt(value);
// 	}
// });
