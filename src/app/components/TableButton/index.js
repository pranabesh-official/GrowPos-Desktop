import React, {Component} from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './layout.css'

// import tableOfline from './ttable.svg';
import tableonline from './tonline.png'

class TableButton extends Component{

    constructor(props){

        super(props)

        this.state={
           
        }      
    }
    render(){
        const MyButton = styled(Button)({
            background: 'palegreen',
               
        });

        if(this.props.status === 1){
            return(
                <Button
                variant="contained"
                color="secondary"
                
                startIcon={<img src={tableonline} alt="tableonline" className='buttonimg' /> }
                >
                   {this.props.no }
                </Button>
            ) 
        }else{
            return(
                <MyButton
                variant="contained"
                startIcon={<img src={tableonline} alt="tableOfline" className='buttonimg' />}
                >
                {this.props.no }
                </MyButton>
            ) 
        }
    }
}

export default TableButton ;