import React, {  useContext } from 'react'
import {ShopHandeler} from '../LocalDB/ShopDB'
import { LogOut, getProfileFetch } from '../store/action/Auth'
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



const TheHeaderDropdownNotif = (props) => {
  const {current} = useContext(ShopHandeler)
  // console.log('TheHeaderDropdownNotif',current)
  const logout = () => {
    props.LogOut()
  }
 

  // useEffect(() => {
  //   if (!currentUser) {
  //     getProfileFetch()
  //   }
  // }, [currentUser])

  return (
    <CDropdown
      inNav
      className="c-header-nav-item mx-2"
      style={{borderRadius:0}}
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <ArrowDropDownCircleIcon />
      </CDropdownToggle>
      <CDropdownMenu placement="bottom-end" className="pt-0">
        <CDropdownItem><CIcon name="cil-user" className="mr-2 text-success" />{current && current.EmpolyeName}</CDropdownItem>
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
export default connect(mapStateToProps, { LogOut, getProfileFetch })(TheHeaderDropdownNotif);
