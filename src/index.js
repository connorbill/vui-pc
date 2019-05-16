/* Automatically generated by './build/bin/build-entry.js' */

import Input from '../packages/input/index.js';
import InputGreat from '../packages/input-great/index.js';
import Button from '../packages/button/index.js';
import Addr from '../packages/addr/index.js';
import Checkbox from '../packages/checkbox/index.js';
import CheckboxGroup from '../packages/checkbox-group/index.js';
import DatePicker from '../packages/date-picker/index.js';
import Dialog from '../packages/dialog/index.js';
import Radio from '../packages/radio/index.js';
import RadioGroup from '../packages/radio-group/index.js';
import Select from '../packages/select/index.js';
import Option from '../packages/option/index.js';
import OptionGroup from '../packages/option-group/index.js';
import Table from '../packages/table/index.js';
import TableLr from '../packages/table-lr/index.js';
import Upload from '../packages/upload/index.js';
import Pagination from '../packages/pagination/index.js';
import Scrollbar from '../packages/scrollbar/index.js';
import Tooltip from '../packages/tooltip/index.js';
import Autocomplete from '../packages/autocomplete/index.js';
import IconLoading from '../packages/icon-loading/index.js';
import Popover from '../packages/popover/index.js';
import MessageBox from '../packages/message-box/index.js';
import Alert from '../packages/alert/index.js';
import Notification from '../packages/notification/index.js';
import Loading from '../packages/loading/index.js';
import Message from '../packages/message/index.js';
import Dropdown from '../packages/dropdown/index.js';
import DropdownMenu from '../packages/dropdown-menu/index.js';
import DropdownItem from '../packages/dropdown-item/index.js';
import Icon from '../packages/icon/index.js';

const components = [
  Input,
  InputGreat,
  Button,
  Addr,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  Dialog,
  Radio,
  RadioGroup,
  Select,
  Option,
  OptionGroup,
  Table,
  TableLr,
  Upload,
  Pagination,
  Scrollbar,
  Tooltip,
  Autocomplete,
  IconLoading,
  Popover,
  Alert,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Icon
];

const install = function(Vue, opts = {}) {

  components.forEach(component => {
    Vue.component(component.name, component);
  });

  Vue.use(Loading.directive);

  Vue.prototype.$VUI = {
    size: opts.size || '',
    zIndex: opts.zIndex || 2000
  };

  Vue.prototype.$loading = Loading.service;
  Vue.prototype.$msgbox = MessageBox;
  Vue.prototype.$alert = MessageBox.alert;
  Vue.prototype.$confirm = MessageBox.confirm;
  Vue.prototype.$prompt = MessageBox.prompt;
  Vue.prototype.$notify = Notification;
  Vue.prototype.$message = Message;

};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '0.9.9',
  install,
  Input,
  InputGreat,
  Button,
  Addr,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  Dialog,
  Radio,
  RadioGroup,
  Select,
  Option,
  OptionGroup,
  Table,
  TableLr,
  Upload,
  Pagination,
  Scrollbar,
  Tooltip,
  Autocomplete,
  IconLoading,
  Popover,
  MessageBox,
  Alert,
  Notification,
  Message,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Icon
};
