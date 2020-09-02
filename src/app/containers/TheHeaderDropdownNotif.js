import React from 'react'
import {CurrentUser, logout} from '../Utils/Auth'
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

if (isElectron) {
  // var { ipcRenderer } = window.require('electron');
}

const TheHeaderDropdownNotif = () => {
  const User = CurrentUser()

  return (
    <CDropdown
      inNav
      className="c-header-nav-item mx-2"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <ArrowDropDownCircleIcon />
      </CDropdownToggle>
      <CDropdownMenu placement="bottom-end" className="pt-0">

        <CDropdownItem><CIcon name="cil-user" className="mr-2 text-success" />{User.Name}</CDropdownItem>
        {/* <CDropdownItem ><CIcon name="cil-settings" className="mr-2 text-info" />{userRole + '  settings'}</CDropdownItem> */}
        <CDropdownItem onClick={() => logout()}> <ExitToAppIcon color="secondary" className="mr-2 " />logout</CDropdownItem>

      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdownNotif