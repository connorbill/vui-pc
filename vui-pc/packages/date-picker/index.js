import VuiDatePicker from './src/date-picker';

/* istanbul ignore next */
VuiDatePicker.install = function(Vue) {
  Vue.component(VuiDatePicker.name, VuiDatePicker);
};

export default VuiDatePicker;
