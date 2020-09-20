import React from 'react'
import {LogOut} from '../store/action/Auth'
import { connect } from 'react-redux'
import {

  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,

} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import { isElectron } from 'react-device-detect'
// import { Redirect } from "react-router-dom"


const TheHeaderDropdownNotif = (props) => {
  const logout = ()=>{
    props.LogOut()
  }
  const {currentUser} = props.Auth
  return (
    <CDropdown
      inNav
      className="c-header-nav-item mx-2"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <ArrowDropDownCircleIcon />
      </CDropdownToggle>
      <CDropdownMenu placement="bottom-end" className="pt-0">

        <CDropdownItem><CIcon name="cil-user" className="mr-2 text-success" />{currentUser.EmpolyeName}</CDropdownItem>
        {/* <CDropdownItem ><CIcon name="cil-settings" className="mr-2 text-info" />{userRole + '  settings'}</CDropdownItem> */}
        <CDropdownItem onClick={() => logout()}> <ExitToAppIcon color="secondary" className="mr-2 " />logout</CDropdownItem>

      </CDropdownMenu>
    </CDropdown>
  )
}

const mapStateToProps = (state) => {
  return {
    Auth: state.Auth,
  }
}
export default connect(mapStateToProps, { LogOut })(TheHeaderDropdownNotif);
