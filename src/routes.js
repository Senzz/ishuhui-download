const routes = [
  {
    path: '/',
    exact: true,
    models: () => [import('./pages/Home/models/home.js')],
    component: () => import('./pages/Home')
  }, {
    path: '/book/:id',
    exact: true,
    component: () => import('./pages/Book/Book')
  }
];

export default routes;