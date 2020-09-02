import React from 'react';

const Pos = React.lazy(() => import('./views/Pos'));
const CategorySetup = React.lazy(() => import('./views/Setup/CategorySetup'));
const ProuductSetup = React.lazy(() => import('./views/Setup/ProuductSetup'));
// const TableSetup = React.lazy(() => import('./views/Setup/TableSetup'));
const TaxSetup = React.lazy(() => import('./views/Setup/TaxSetup'));
const Employe = React.lazy(() => import('./views/Employe'));
const ShopSetup = React.lazy(() => import('./views/Setup/Shop'));


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/Pos', name: 'Pos', component: Pos },
  { path: '/CategorySetup', name: 'CategorySetup', component: CategorySetup },
  { path: '/CategorySetup', name: 'Addcategory', component: CategorySetup },
  { path: '/CategorySetup', name: 'AddSource', component: CategorySetup },
  { path: '/ProuductSetup', name: 'ProuductSetup', component: ProuductSetup },
  
  { path: '/ShopSetup', name: 'ShopSetup', component: ShopSetup },
  { path: '/TaxSetup', name: 'TaxSetup', component: TaxSetup },
  { path: '/Employe', name: 'Employe', component: Employe },
];

export default routes;
