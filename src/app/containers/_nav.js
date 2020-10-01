
// let disabled = true
// const admin = sessionStorage.getItem("admin")
// if (admin) {
//   disabled = false
// }


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
        to: '/ShopSetup',
        // addLinkClass: 'c-disabled',
        // // 'disabled': disabled,
        icon: {
          name: 'cil-ApplicationsSettings',
          className: 'text-warning'
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Dine In',
        to: '/TableSetup',
        icon: {
          name: 'cil-ApplicationsSettings',
          className: 'text-warning'
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Registers',
        to: '/Registers',
        icon: {
          name: 'cil-ApplicationsSettings',
          className: 'text-warning'
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Category',
        to: '/CategorySetup',
        icon: {
          name: 'cil-ApplicationsSettings',
          className: 'text-warning'
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Prouducts',
        to: '/ProuductSetup',
        icon: {
          name: 'cil-ApplicationsSettings',
          className: 'text-warning'
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'TAX',
        to: '/TaxSetup',
        icon: {
          name: 'cil-ApplicationsSettings',
          className: 'text-warning'
        },
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Users',
        to: '/UserSetup',
        icon: {
          name: 'cil-ApplicationsSettings',
          className: 'text-warning'
        },

      },
      // {
      //   _tag: 'CSidebarNavItem',
      //   name: 'Preferences',
      //   to: '/Preferences',  
      // },
      {
        _tag: 'CSidebarNavItem',
        name: 'Printer Setup',
        to: '/PrinterSetup',
        icon: {
          name: 'cil-ApplicationsSettings',
          className: 'text-warning'
        },
      },

    ],

  },

]
