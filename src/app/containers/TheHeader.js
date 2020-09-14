import React from 'react'
import {connect, useSelector, useDispatch } from 'react-redux'

import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,



} from '@coreui/react'
import CIcon from '@coreui/icons-react'


import { 

  TheHeaderDropdownNotif,
}  from './index'


const TheHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.changeState.sidebarShow)

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" src = {'http://localhost:4545/static/img/logoFullDark.png'} alt="Logo"/>
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3" >
    
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <TheHeaderDropdownNotif/>
      </CHeaderNav>
    </CHeader>
  )
}
const mapStateToProps = (state) => {
  return {
    Auth: state.Auth,
  }
}
export default connect(mapStateToProps)(TheHeader);

