// import React from 'react';
import Pos from './views/Pos'
import CategorySetup from './views/Setup/CategorySetup'
import ProuductSetup from './views/Setup/ProuductSetup'
import TaxSetup from './views/Setup/TaxSetup'
import Employe from './views/Employe'
import ShopSetup from './views/Setup/Shop'
import UserSetup from './views/Setup/Users'
// import Dashbord from './views/Home'
import Reports from './views/Reports'
import Coustomers from './views/Customers'

const routes = [
  { path: '/', exact: true, name: 'Home' },
  // { path: '/Dashbord', name: 'Dashbord', component: Dashbord },
  { path: '/Pos', name: 'Pos', component: Pos },
  { path: '/Reports', name: 'Reports', component: Reports },
  { path: '/Coustomers', name: 'Coustomers', component: Coustomers },
  { path: '/CategorySetup', name: 'CategorySetup', component: CategorySetup },
  { path: '/ProuductSetup', name: 'ProuductSetup', component: ProuductSetup },
  { path: '/ShopSetup', name: 'ShopSetup', component: ShopSetup },
  { path: '/TaxSetup', name: 'TaxSetup', component: TaxSetup },
  { path: '/Employe', name: 'Employe', component: Employe },
  { path: '/UserSetup', name: 'Users', component: UserSetup },

];

export default routes;
