var vuiCheck = {
  isObject: {},
  isString: {},
  isArray: {},
  checkLicense: {},
  checkCardID: {},
  checkInt: {},
  checkLength: {},
  checkMobile: {},
  checkNumber: {},
  checkDecimalPoint: {},
  checkIsValue: {},
  trimSpace: {},
  numInt: {},
  numTwoDec: {},
  numThou: {},
  doDeep: {},
  deepFreeze: {},
  judgeValue: {},
  isRight: {},
  matchType: {}
};
!(function(global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    // 1
    // factory(mod.exports);
    // global.vuiCheck = mod.exports;
    // 2
    global.vuiCheck = factory(mod.exports);
  }
})(this, function(exports) {
  'user strict';

  /*
  * 公用函数
  *
  * */

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

  function judgeValue(obj) {
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
          console.log(errTip);
          if (!errTip) {
            return rule[i].tip;
          }
        }
      }
    }
  }

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
          vueIns.$refs[v].forEach(function(el) {
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

  function matchType(fileName) {
    // 后缀获取 
    var suffix = '';
    // 获取类型结果 
    var result = '';
    try {
      var flieArr = fileName.split('.');
      suffix = flieArr[flieArr.length - 1];
    } catch (err) {
      suffix = '';
    }
    // fileName无后缀返回
    false
    if (!suffix) {
      result = false;
      return result;
    }
    // 图片格式 
    var imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];   // 进行图片匹配 
    result = imglist.some(function(item) {
      return item == suffix;
    });
    if (result) {
      result = 'image';
      return result;
    }
    ;   // 匹配txt 
    var txtlist = ['txt'];
    result = txtlist.some(function(item) {
      return item == suffix;
    });
    if (result) {
      result = 'txt';
      return result;
    }
    ;   // 匹配
    excel
    var excelist = ['xls', 'xlsx'];
    result = excelist.some(function(item) {
      return item == suffix;
    });
    if (result) {
      result = 'excel';
      return result;
    }
    ;   // 匹配 word 
    var wordlist = ['doc', 'docx'];
    result = wordlist.some(function(item) {
      return item == suffix;
    });
    if (result) {
      result = 'word';
      return result;
    }
    ;   // 匹配 pdf 
    var pdflist = ['pdf'];
    result = pdflist.some(function(item) {
      return item == suffix;
    });
    if (result) {
      result = 'pdf';
      return result;
    }
    ;   // 匹配 ppt 
    var pptlist = ['ppt', 'pptx'];
    result = pptlist.some(function(item) {
      return item == suffix;
    });
    if (result) {
      result = 'ppt';
      return result;
    }
    ;   // 匹配 视频 
    var videolist = ['mp4', 'm2v', 'mkv'];
    result = videolist.some(function(item) {
      return item == suffix;
    });
    if (result) {
      result = 'video';
      return result;
    }
    ;   // 匹配 音频 
    var radiolist = ['mp3', 'wav', 'wmv'];
    result = radiolist.some(function(item) {
      return item == suffix;
    });
    if (result) {
      result = 'radio';
      return result;
    }   // 匹配 压缩文件 
    var ziplist = ['rar', 'zip', 'arj', 'gz', 'z', '7z', 'ace', 'bz2', 'cab', 'lz', 'lzh', 'tar', 'uue', 'xz', 'zipx'];
    result = ziplist.some(function(item) {
      return item == suffix;
    });
    if (result) {
      result = 'zip';
      return result;
    }   // 其他 文件类型 
    result = 'other';
    return result;
  }


  //1
  // exports.checkIsValue = checkIsValue;
  // 2
  return {
    isObject: isObject,
    isString: isString,
    isArray: isArray,
    checkLicense: checkLicense,
    checkCardID: checkCardID,
    checkInt: checkInt,
    checkLength: checkLength,
    checkMobile: checkMobile,
    checkNumber: checkNumber,
    checkDecimalPoint: checkDecimalPoint,
    checkIsValue: checkIsValue,
    trimSpace: trimSpace,
    numInt: numInt,
    numTwoDec: numTwoDec,
    numThou: numThou,
    doDeep: doDeep,
    deepFreeze: deepFreeze,
    judgeValue: judgeValue,
    isRight: isRight,
    matchType: matchType
  };
});


/*
* // filter 过滤器
* */

var vuiFilter = {
  numThou: function(num) {
    // 千分位格式化 保留两位小数
    if (num && num != null) {
      num = String(num);
      var left = num.split('.')[0], right = num.split('.')[1];
      right = right ? (right.length >= 2 ? '.' + right.substr(0, 2) : '.' + right + '0') : '.00';
      var temp = left.split('').reverse().join('').match(/(\d{1,3})/g);
      return (Number(num) < 0 ? '-' : '') + temp.join(',').split('').reverse().join('') + right;
    } else if (num === 0) {
      return '0.00';
    } else {
      return '';
    }
  },
  numTwoDec: function(value) {
    // 保留两位小数
    if (value === null || value === '' || value === undefined) {
      return '0.00';
    }
    var num = (Math.round(value * 100) / 100).toFixed(2);
    return num;
  },
  timeFormat: function(input, fmtstring) {
    // 时间戳格式化 依赖于 moment.min.js
    if (input) {
      return moment(input).format(fmtstring);
    } else {
      return '';
    }
  },
  numIntAbbr: function(value) {
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
  },
  numInt: function(value) {
    if (value === null || value === '' || value === undefined) {
      return '0';
    } else {
      var num = 0;
      num = value;
      return num;
    }
  }
};

Object.keys(vuiFilter).forEach(key => {
  Vue.filter(key, vuiFilter[key]);
});


/*
* v-multi-ref 指令， 绑定ref到dom元素或者组件上
* */
function addRef(el, binding, vnode) {
  // const ref = binding.arg
  var ref = binding.arg;
  if (binding.value !== '' && binding.value !== null && binding.value !== undefined) {
    ref = binding.value;
  }
  const vm = vnode.context;
  const thing = vnode.componentInstance || vnode.elm;
  if (!vm.$refs.hasOwnProperty(ref)) {
    vm.$refs[ref] = [];
  }
  const index = vm.$refs[ref].indexOf(thing);
  if (index == -1) {
    vnode.context.$refs[ref].push(thing);
  }
}

function removeRef(el, { arg: ref }, { context: vm }, vnode) {
  if (vm.$refs.hasOwnProperty(ref)) {
    const arr = vm.$refs[ref];
    const thing = vnode.componentInstance || vnode.elm;
    const index = arr.indexOf(thing);
    if (index) {
      arr.splice(index, 1);
    }
  }
}

Vue.directive('multi-ref', {
  bind: addRef,
  update: addRef,
  unbind: removeRef
});
