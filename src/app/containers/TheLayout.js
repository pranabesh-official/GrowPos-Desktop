import React from 'react'
import DataProvider from '../LocalDB'
import {ThemeBackground} from '../views/LayoutManeger/Themes'
import { isElectron } from 'react-device-detect'
import {
  TheContent,
  TheSidebar,
  Titlebar,
  TheHeader,
  TheFooter
} from './index'

const TheLayout = () => {

  return (

    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        {isElectron && <Titlebar />}
        <TheHeader />
        <div className="c-body" id='Content' style={{background:ThemeBackground}}>
          <TheContent />
        </div>
        <DataProvider>
          <TheFooter />
        </DataProvider>
      </div>
    </div>

  )

}

export default TheLayout
