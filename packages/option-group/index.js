import VuiOptionGroup from '../select-great/src/option-group';

/* istanbul ignore next */
VuiOptionGroup.install = function(Vue) {
  Vue.component(VuiOptionGroup.name, VuiOptionGroup);
};

export default VuiOptionGroup;
