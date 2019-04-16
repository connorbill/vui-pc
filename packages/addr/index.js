import VuiAddr from './src/addr';

/* istanbul ignore next */
VuiAddr.install = function(Vue) {
  Vue.component(VuiAddr.name, VuiAddr);
};

export default VuiAddr;
