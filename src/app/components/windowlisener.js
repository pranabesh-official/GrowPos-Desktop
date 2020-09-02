import { WindowResizeListener } from 'react-window-resize-listener'
import ReactDOM from 'react-dom'
import React from 'react'
 
ReactDOM.render(
  <div>
    <WindowResizeListener onResize={windowSize => {
      console.log('Window height', windowSize.windowHeight)
      console.log('Window width', windowSize.windowWidth)
    }}/>
  </div>,
  document.getElementById('myContent')
)