import VuiHome from './views/VuiHome';
import ComponentPage from './views/ComponentPage';
import TableExample from './views/instence/TableExample';
import ButtonExample from './views/instence/ButtonExample';
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
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
];

export default route;
