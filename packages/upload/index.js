import VuiUpload from './src/upload';

/* istanbul ignore next */
VuiUpload.install = function(Vue) {
  Vue.component(VuiUpload.name, VuiUpload);
};

export default VuiUpload;
