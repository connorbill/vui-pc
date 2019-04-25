import VuiHome from './views/VuiHome';
let route = [
  {
    path: '/',
    name: 'index',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: VuiHome
  },
  {
    path: '*',
    redirect: '/'
  }
];

export default route;
