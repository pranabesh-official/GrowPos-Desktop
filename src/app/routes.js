// import React from 'react';
import Pos from './views/Pos'
import CategorySetup from './views/Setup/CategorySetup'
import ProuductSetup from './views/Setup/ProuductSetup'
import TaxSetup from './views/Setup/TaxSetup'
import ShopSetup from './views/Setup/Shop'
import UserSetup from './views/Setup/Users'
import Dashbord from './views/Home'
import Reports from './views/Reports'
import Coustomers from './views/Customers'
import TableSetup from './views/Setup/TableSetup'
import Registers from './views/Setup/Registers'
import PrinterSetup from "./views/Setup/ReciptPrinter";
import PettyCash from './views/PettyCash'
import Recipts from './views/Recipts'
// import Preferences from './views/Setup/Preferences'



const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/Dashbord', name: 'Dashbord', component: Dashbord },
  { path: '/Pos', name: 'Pos', component: Pos },
  { path: '/Reports', name: 'Reports', component: Reports },
  { path: '/Recipts', name: 'Recipts', component: Recipts },
  { path: '/PettyCash', name: 'PettyCash', component: PettyCash },
  { path: '/Coustomers', name: 'Coustomers', component: Coustomers },
  { path: '/PrinterSetup', name: 'PrinterSetup', component: PrinterSetup },
  { path: '/CategorySetup', name: 'CategorySetup', component: CategorySetup },
  { path: '/ProuductSetup', name: 'ProuductSetup', component: ProuductSetup },
  { path: '/ShopSetup', name: 'ShopSetup', component: ShopSetup },
  { path: '/Registers', name: 'Registers', component: Registers },
  // { path: '/Preferences', name: 'Preferences', component: Preferences },
  { path: '/TableSetup', name: 'TableSetup', component: TableSetup },
  { path: '/TaxSetup', name: 'TaxSetup', component: TaxSetup },
  { path: '/UserSetup', name: 'Users', component: UserSetup },

];

export default routes;
