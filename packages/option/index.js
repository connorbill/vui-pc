import VuiOption from '../select-great/src/option';

/* istanbul ignore next */
VuiOption.install = function(Vue) {
  Vue.component(VuiOption.name, VuiOption);
};

export default VuiOption;
