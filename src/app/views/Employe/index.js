import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import AddEmploye from './AddEmploye'
import EmployeProvider from '../../LocalDB/EmoloyeDB'
import { Tab } from 'semantic-ui-react'

// import { View } from 'react-desktop/macOs';


class Employe extends Component {
  constructor(props) {
    super(props)
    this.updateDimensions = this.updateDimensions.bind(this);
    this.state = {
      width: 0,
      height: 0,
    };
  }

  render() {
    localStorage.setItem('lastPage', '/CategorySetup')
    // const { height } = this.state
    const panes = [
      {
        menuItem: 'Add Employe',
        render: () => (
          <Tab.Pane attached={false}>
            <Grid container direction='column'>
              <EmployeProvider>
                <AddEmploye />
              </EmployeProvider>
            </Grid>
          </Tab.Pane>
        )
      },
      // {
      //   menuItem: 'Products',
      //   render: () => (
      //     <Tab.Pane attached={false} active={true} style={{ padding: '0px' }}>
      //       <View padding="0px" margin="0px" width='100%' height={`${height - 75}px`}>
      //         <Grid container direction="column" style={style}  >
      //           <DataProvider>
      //             <ViweProduct />
      //           </DataProvider>
      //         </Grid>
      //       </View>
      //     </Tab.Pane>
      //   )
      // }
    ]
    // const style = {
    //   background: "white",
    //   display: 'flex',
    //   flexWrap: 'wrap',
    //   width: '100%',
    //   height: '100%',
    //   variant: "scrollable",
    // }
    return (
      <Grid container spacing={1} style={{ padding: '5px' }}>
        <Grid item xs={12} sm={12} >
          <Tab
            menu={{ borderless: true, attached: false, tabular: false, }}
            panes={panes}
          />
        </Grid>
      </Grid>
    );
  }
  updateDimensions = () => {
    this.setState({ width: document.getElementById('Content').clientWidth, height: document.getElementById('Content').clientHeight });
    // this.reset()
  };
  componentDidMount() {
    if (this.state.width !== document.getElementById('Content').clientWidth) {
      this.updateDimensions()
    }
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    // this.reset()
    window.removeEventListener('resize', this.updateDimensions);
  }

}


export default Employe
