import VuiDialog from './src/dialog';

/* istanbul ignore next */
VuiDialog.install = function(Vue) {
  Vue.component(VuiDialog.name, VuiDialog);
};

export default VuiDialog;
