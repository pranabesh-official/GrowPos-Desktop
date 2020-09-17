
export default [
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'HOME',
  //   to: '/Dashbord',
  //   icon: 'cil-home',
  
  // },
  {
    _tag: 'CSidebarNavItem',
    name: 'POS',
    to: '/Pos',
    icon: 'sygnet',
  
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Reports',
    icon: 'cil-print',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'All Reports',
       
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Setup',
   
    icon: 'cil-settings',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Shop',
        to:'/ShopSetup'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Category',
        to:'/CategorySetup'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Prouducts',
        to:'/ProuductSetup'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'TAX',
        to:'/TaxSetup'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Users',
        to: '/UserSetup',  
      },
      // {
      //   _tag: 'CSidebarNavItem',
      //   name: 'DEVLOPER SETUP',
      //   to: '/Employe',  
      // },
    ],
    
  },

]
