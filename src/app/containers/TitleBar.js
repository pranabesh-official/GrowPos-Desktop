import React, { PureComponent } from 'react';
import { TitleBar } from 'react-desktop/windows';

import { isElectron } from 'react-device-detect'
if(isElectron){
  var { remote   } = window.require('electron');
}


class Titlebar extends PureComponent {
  static defaultProps = {
    color: '#ffffff',
    theme: 'light'
  };

  constructor(props) {
    super(props);
    this.state = { isMaximized: true };
  }

  close = () =>{
    const window = remote.getCurrentWindow();
    window.close();
  }
  minimize = () => {
    const window = remote.getCurrentWindow();
    window.minimize()
  }
  toggleMaximize = () => {
    this.setState({ isMaximized: !this.state.isMaximized })
    const window = remote.getCurrentWindow();
    if (!window.isMaximized()) {
        window.maximize();          
    } else {
        window.unmaximize();
    }
  };

  render() {
    
    return (
      <TitleBar
        title="    "
        controls
        isMaximized={this.state.isMaximized}
        theme={this.props.theme}
        background={this.props.color}
        onCloseClick={this.close }
        onMinimizeClick={this.minimize}
        onMaximizeClick={this.toggleMaximize}
        onRestoreDownClick={this.toggleMaximize}
        id={"remote"}
      />
    );
  }
}



export default React.memo(Titlebar)