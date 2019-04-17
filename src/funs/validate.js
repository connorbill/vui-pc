import {checkLength, checkNumber} from './check-fun';

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
        if (!errTip) {
          return rule[i].tip;
        }
      }
    }
  }
}

export { judgeValue };

