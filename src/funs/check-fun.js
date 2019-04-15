function isRight(obj, that) {
  var valiRes = true;
  var vueIns = that;
  var check = obj;
  for (var key in check) {
    var v = check[key];
    // keys.push(key);
    // values.push(obj[key]);//取得value
    if (Array.isArray(vueIns.$refs[v])) {
      // console.log(this.$refs[v]);
      if (vueIns.$refs[v].length > 0) {
        vueIns.$refs[v].forEach(function(el, index) {
          // console.log(el)
          var vali = el.checkValue();
          if (vali && !vali.isRight) {
            valiRes = false;
          }
        });
      }
    } else {
      if (vueIns.$refs[v]) {
        // console.log(this.$refs[v])
        var vali = vueIns.$refs[v].checkValue();
        if (vali && !vali.isRight) {
          valiRes = false;
        }
      }
    }
  }
  return valiRes;
}

function judgeValue(obj) {
  /**
   *
   * 优点：
   * 1 浏览器删除dom元素 或 修改 dom元素（比如将input 修改成div）,仍然绕不过校验
   * 2 浏览器打开console,修改不了校验规则变量，从而在console上不能绕过校验
   * 3 相对0.1.0版本更简洁
   *
   *
   新参数
   require： true, 表示必输项 tip ： 提示语句
   decimal：0表示整数，2代表保留2位以内的小数，以此类推
   strMax ：最大字符， strMin： 最小字符长度
   numMax： 数值最大， numMin： 最小数值
   define: 自定义校验规则, 可写多个
   总共如下几种情况：
   [
   {require: true, tip: '年龄不能为空'},
   {strMax: 5, strMin: 2, tip:'长度在 2 到 5 个字符'},
   {numMax: 100000000000, numMin: 0, tip: '请输入0到12位数值'},
   {decimal: 0, tip: '请输入整数'},
   {define: '$checkCardID', tip:'请输入正确的身份证号码'},
   {define: '$checkNumber', tip:'请输入正确的数值'}
   ],

   */
  // console.log(obj)
  var value = obj.value;
  var rule = obj.rule;
  // 新增自定义提示语句
  if (rule && rule.length > 0) {
    for (var i = 0; i < rule.length; i++) {
      if (value === '' || value === null || value === undefined || Array.isArray(value) && value.length === 0) {
        if (rule[i].require) return rule[i].tip;
        continue;
      }
      if (rule[i].strMax || rule[i].strMin) {
        if (checkLength(value) > rule[i].strMax || checkLength(value) < rule[i].strMin) return rule[i].tip;
      }
      if (rule[i].numMax || rule[i].numMin || rule[i].decimal >= 0) {
        var decimalLen = '';
        var decimalStr = value.toString().split('.')[1];
        if (decimalStr) decimalLen = value.toString().split('.')[1].length;
        if (!checkNumber(value)) return rule[i].tip;
        if (decimalLen && decimalLen > rule[i].decimal) return rule[i].tip;
        if (value > rule[i].numMax || value < rule[i].numMin) return rule[i].tip;
      }
      if (rule[i].define) {
        var errTip = rule[i].define(value);
        if (!errTip) {
          return rule[i].tip;
        }
      }
    }
  }
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
    preCode = o.preCode ;
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

export { isRight, judgeValue, checkLength, trimSpace, checkNumber, doDeep, deepFreeze, isObject,
  isString, isArray, checkLicense, checkMobile, checkCardID, checkInt, checkDecimalPoint,
  numInt, numTwoDec, numThou
};
