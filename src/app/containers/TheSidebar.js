import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'


import CIcon from '@coreui/icons-react'


import navigation from './_nav'



const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.changeState.sidebarShow)


  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: 'set', sidebarShow: val })}
      minimize={true}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon
          name="logo"
          src={'http://localhost:4545/static/img/logoFullLite.png'}
          height={35}
          className="c-sidebar-brand-full"
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="logo"
          src={'http://localhost:4545/static/img/logo.png'}
          height={35}
        />

      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
