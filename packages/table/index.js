import VuiTable from './src/table';

/* istanbul ignore next */
VuiTable.install = function(Vue) {
  Vue.component(VuiTable.name, VuiTable);
};

export default VuiTable;
