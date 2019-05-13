import VuiButton from './src/button';

/* istanbul ignore next */
VuiButton.install = function(Vue) {
  Vue.component(VuiButton.name, VuiButton);
};

export default VuiButton;
