
export default [
  {
    _tag: 'CSidebarNavItem',
    name: 'HOME',
    to: '/Dashbord',
    icon: 'Store',
  
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'POS',
    to: '/Pos',
    icon: 'cashRegister',
  
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Petty Cash',
    to: '/PettyCash',
    icon: 'Expence',
  
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Coustomers',
    to: '/Coustomers',
    icon: 'Card',
  
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Recipts',
    to: '/Recipts',
    icon: 'receipt',
  
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Records',
    to: '/Reports',
    icon: 'Registration',
  
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Setup',
   
    icon: 'Settings',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Shop',
        to:'/ShopSetup'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Dine In',
        to: '/TableSetup',  
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Registers',
        to: '/Registers',  
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
      {
        _tag: 'CSidebarNavItem',
        name: 'Printer Setup',
        to: '/PrinterSetup',  
      },
      
    ],
    
  },

]
