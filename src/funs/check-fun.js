function isRight(obj, that) {
  var valiRes = true;
  var vueIns = that;
  var check = obj;
  for (var key in check) {
    var v = check[key];
    if (Array.isArray(vueIns.$refs[v])) {
      if (vueIns.$refs[v].length > 0) {
        vueIns.$refs[v].forEach(function(el) {
          var elDom = el.$el;
          if (elDom.isConnected) {
            var vali = el.checkValue();
            if (vali && !vali.isRight) {
              valiRes = false;
            }
          } else {
            valiRes = true;
          }
        });
      }
    } else {
      if (vueIns.$refs[v]) {
        if (vueIns.$refs[v].$el.isConnected) {
          var vali = vueIns.$refs[v].checkValue();
          if (vali && !vali.isRight) {
            valiRes = false;
          }
        } else {
          valiRes = true;
        }
      }
    }
  }
  return valiRes;
}

function doDeep(o) {
  var prop, propKey;
  Object.freeze(o);// 首先冻结第一层对象
  for (propKey in o) {
    prop = o[propKey];
    if (!o.hasOwnProperty(propKey) || !(typeof prop === 'object') || Object.isFrozen(prop)) {
      continue;
    }
    doDeep(prop);// 递归
  }
  return o;
}

function deepFreeze(o) {
  var preCode = new Date().getTime();
  if (o.preCode) {
    preCode = o.preCode;
    // preCode = '';
  }
  // preCode = '';
  var ref = {};
  var rule = o.rule;
  Object.keys(rule).forEach(function(key) {
    ref[key] = key + preCode;
  });
  o.ref = ref;
  o = doDeep(o);
  return o;
}

function isObject(obj) {
  // 判断是否 对象
  return (typeof obj === 'object') && obj.constructor === Object;
}

function isString(obj) {
  // 判断是否 字符串
  return (typeof obj === 'string') && obj.constructor === String;
}

function isArray(obj) {
  // 判断是否是数组
  return obj && (typeof obj === 'object') && (obj.constructor === Array);
}

function checkLicense(num) {
  // 判断是否是营业执照号
  var regIdNo = /^[0-9a-zA-Z]{10,18}$/;
  if (!regIdNo.test(num)) {
    return false;
  } else {
    return true;
  }
}

function checkMobile(num) {
  // 判断是否是手机号
  var regIdNo = /^[1][2,3,4,5,6,7,8,9,0][0-9]{9}$/;
  if (!regIdNo.test(num)) {
    return false;
  } else {
    return true;
  }
}

function checkCardID(num) {
  // 判断是否是身份证
  var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (!regIdNo.test(num)) {
    return false;
  } else {
    return true;
  }
}

function checkInt(num) {
  // 判断是否是整数
  if (!/^\d+$/.test(num)) {
    return false;
  } else {
    return true;
  }
}

function checkLength(str) {
  // 字符串长度计算
  var realLength = 0;
  if (str) {
    var len = trimSpace(str).length;
    realLength = len;
  }
  return realLength;
}

function trimSpace(str, is_global) {
  // 去掉空格 is_global=='g'，全局空格，不传参数去掉前后空格
  var result = '';
  if (str) {
    result = str.replace(/(^\s+)|(\s+$)/g, '');
  }
  if (is_global) {
    if (is_global.toLowerCase() === 'g') {
      result = result.replace(/\s/g, '');
    }
  }
  return result;
}

function checkNumber(num) {
  // 判断是否是数字
  var regu = /^(\-|\+)?\d+(\.\d+)?$/;
  if (regu.test(num) || regu.test(num) || regu.test(num)) {
    return true;
  } else {
    return false;
  }
}

function checkDecimalPoint(num) {
  // 判断是否是两位小数，是-> 返回true
  if (/^(\-|\+)?\d+(\.\d{1,2})?$/.test(num)) {
    return true;
  } else {
    return false;
  }
}

function checkIsValue(value) {
  if (value === null || value === '' || value === undefined) {
    return false;
  } else {
    return true;
  }
}

function numInt(value) {
  if (value === null || value === '' || value === undefined) {
    return '0';
  } else {
    var num = 0;
    if (value > 100000) {
      num = (value / 10000).toFixed(2) + '万';
    } else if (value > 100000000) {
      num = (value / 100000000).toFixed(2) + '亿';
    } else {
      num = value;
    }
    return num;
  }
}

// function timeFormat(input, fmtstring) {
//   // 时间戳格式化 依赖于 moment.min.js
//   return moment(input).format(fmtstring);
// }
function numTwoDec(value) {
  if (value === '' || value === null || value === undefined) {
    value = 0;
  }
  // 保留两位小数 四舍五入
  var num = (Math.round(value * 100) / 100).toFixed(2);
  return num;
}

function numThou(num) {
  // 千分位格式化 保留两位小数
  if (num && num != null) {
    num = String(num);
    var left = num.split('.')[0];
    var right = num.split('.')[1];
    right = right ? (right.length >= 2 ? '.' + right.substr(0, 2) : '.' + right + '0') : '.00';
    var temp = left.split('').reverse().join('').match(/(\d{1,3})/g);
    return (Number(num) < 0 ? '-' : '') + temp.join(',').split('').reverse().join('') + right;
  } else if (num === 0) {
    return '0.00';
  } else {
    return '';
  }
}

export {
  isRight, checkLength, trimSpace, checkNumber, doDeep, deepFreeze, isObject,
  isString, isArray, checkLicense, checkMobile, checkCardID, checkInt, checkDecimalPoint,
  numInt, numTwoDec, numThou, checkIsValue
};
