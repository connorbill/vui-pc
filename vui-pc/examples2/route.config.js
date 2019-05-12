import VuiHome from './views/VuiHome';
import ComponentPage from './views/ComponentPage';
import TableExample from './views/instence/TableExample';
import ButtonExample from './views/instence/ButtonExample';
import UploadExample from './views/instence/UploadExample';
import AddrExample from './views/instence/AddrExample';
import CheckboxExample from './views/instence/CheckboxExample';
import DatePickerExample from './views/instence/DatePickerExample';
import DialogExample from './views/instence/DialogExample';
import FormExample from './views/instence/FormExample';
import InputExample from './views/instence/InputExample';
import PageExample from './views/instence/PageExample';
import RadioExample from './views/instence/RadioExample';
import ScrollbarExample from './views/instence/ScrollbarExample';
import SelectExample from './views/instence/SelectExample';
let route = [
  {
    path: '/',
    name: 'index',
    redirect: '/component/button'
  },
  {
    path: '/home',
    name: 'home',
    component: VuiHome
  },
  {
    path: '/component',
    name: 'ComponentPage',
    component: ComponentPage,
    redirect: '/component/button',
    children: [
      {
        path: 'table',
        name: 'TableExample',
        component: TableExample
      },
      {
        path: 'button',
        name: 'ButtonExample',
        component: ButtonExample
      },
      {
        path: 'upload',
        name: 'UploadExample',
        component: UploadExample
      },
      {
        path: 'addr',
        name: 'AddrExample',
        component: AddrExample
      },
      {
        path: 'checkbox',
        name: 'CheckboxExample',
        component: CheckboxExample
      },
      {
        path: 'datepicker',
        name: 'DatePickerExample',
        component: DatePickerExample
      },
      {
        path: 'dialog',
        name: 'DialogExample',
        component: DialogExample
      },
      {
        path: 'form',
        name: 'FormExample',
        component: FormExample
      },
      {
        path: 'input',
        name: 'InputExample',
        component: InputExample
      },
      {
        path: 'page',
        name: 'PageExample',
        component: PageExample
      },
      {
        path: 'radio',
        name: 'RadioExample',
        component: RadioExample
      },
      {
        path: 'scrollbar',
        name: 'ScrollbarExample',
        component: ScrollbarExample
      },
      {
        path: 'select',
        name: 'SelectExample',
        component: SelectExample
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
];

export default route;
