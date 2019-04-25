import VuiSelect from './src/select';

/* istanbul ignore next */
VuiSelect.install = function(Vue) {
  Vue.component(VuiSelect.name, VuiSelect);
};

export default VuiSelect;
