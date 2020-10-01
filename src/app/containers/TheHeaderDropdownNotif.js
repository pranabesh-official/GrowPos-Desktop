import React, {  useState } from 'react'
import { LogOut, getProfileFetch } from '../store/action/Auth'
import { connect } from 'react-redux'
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import { Redirect } from 'react-router-dom'
import { Settings, VerifiedUserSharp } from '@material-ui/icons';
import User from '../components/User'
import { Avatar } from '@material-ui/core'


const TheHeaderDropdownNotif = (props) => {
  const {  currentUser } = props.Auth
  const [openPopup, setOpenPopup] = useState(false)
  const logout = async () => {
    await props.LogOut()
  }

  return (
    <CDropdown
      inNav
      className="c-header-nav-item mx-2"
      style={{ borderRadius: 0 }}
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <VerifiedUserSharp />
      </CDropdownToggle>
      <CDropdownMenu placement="bottom-end" className="pt-0">
        <CDropdownItem
          // tag="div"
          color="light"
        > <Avatar
            color='primary'
            className="mr-2 "
            alt={currentUser && `${currentUser.EmpolyeName}`}
            src={'avatar'}
            sizes='small'
          /><strong>{currentUser && currentUser.EmpolyeName} </strong></CDropdownItem>
        <CDropdownItem onClick={() => setOpenPopup(true)}> <Settings color="primary" className="mr-2 " />User Settings</CDropdownItem>
        <CDropdownItem onClick={() => logout()}> <ExitToAppIcon color="secondary" className="mr-2 " />logout</CDropdownItem>
      </CDropdownMenu>
      <User
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      />
    </CDropdown>

  )
}

const mapStateToProps = (state) => {
  return {
    Auth: state.Auth,
  }
}
export default connect(mapStateToProps, { LogOut, getProfileFetch })(TheHeaderDropdownNotif);
