import React from 'react'
import DataProvider from '../LocalDB'
import { ThemeBackground } from '../views/LayoutManeger/Themes'
import { isElectron } from 'react-device-detect'
import ShopProvider from '../LocalDB/ShopDB'
import {
  TheContent,
  TheSidebar,
  Titlebar,
  TheHeader,
  TheFooter
} from './index'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom"

const Layout = () => {

  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        {isElectron && <Titlebar />}
        <ShopProvider>
          <TheHeader />
        </ShopProvider>
        <div className="c-body" id='Content' style={{ background: ThemeBackground }}>
          <TheContent />
        </div>
        <DataProvider>
          <TheFooter />
        </DataProvider>
      </div>
    </div>

  )

}

const TheLayout = (props) => {
  const { logIn } = props.Auth
  return (
    <>
      {logIn ?
        <Layout />
        :
        <Redirect to={'/login'} />
      }
    </>
  )

}

const mapStateToProps = (state) => {
  return {
    Auth: state.Auth,
  }
}

export default connect(mapStateToProps)(TheLayout);

