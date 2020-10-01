import React from 'react'
// import DataProvider from '../LocalDB'
import { ThemeBackground } from '../views/LayoutManeger/Themes'
import { isElectron } from 'react-device-detect'
// import ShopProvider from '../LocalDB/ShopDB'
import {
  TheContent,
  TheSidebar,
  Titlebar,
  TheHeader,
  TheFooter
} from './index'
import { connect } from 'react-redux'
import { theme } from '../Themes'
import { ThemeProvider } from '@material-ui/core/styles';
import '../root.css'


const TheLayout = (props) => {

  return (
    <ThemeProvider theme={theme}>
      <div className="c-app c-default-layout" >
        <TheSidebar />
        <div className="c-wrapper">
          {isElectron && <Titlebar />}
            <TheHeader />
          <div className="c-body" id='Content' style={{ background: ThemeBackground }}>
            <TheContent />
          </div>
            <TheFooter />
        </div>
      </div>
    </ThemeProvider>
  )

}




const mapStateToProps = (state) => {
  return {
    Auth: state.Auth,
  }
}

export default connect(mapStateToProps)(TheLayout);

