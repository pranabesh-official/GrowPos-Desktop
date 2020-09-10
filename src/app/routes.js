// import React from 'react';
import Pos from './views/Pos'
import CategorySetup from './views/Setup/CategorySetup'
import ProuductSetup from './views/Setup/ProuductSetup'
import TaxSetup from './views/Setup/TaxSetup'
import Employe from './views/Employe'
import ShopSetup from './views/Setup/Shop'




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
