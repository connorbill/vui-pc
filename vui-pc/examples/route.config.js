import VuiHome from './views/VuiHome';
import TableExample from './views/instence/TableExample';
import ComponentPage from './views/ComponentPage';
let route = [
  {
    path: '/',
    name: 'index'
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
    children: [
      {
        path: 'table',
        name: 'ComponentTable',
        component: TableExample
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
];

export default route;
