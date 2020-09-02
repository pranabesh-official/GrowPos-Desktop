import React, { createContext, Component } from 'react';
import { connect } from 'react-redux'
import { ThemeDark, danger } from '../../views/LayoutManeger/Themes'
import { withStyles } from '@material-ui/core/styles';

let context = null;
const { Provider, Consumer } = context = createContext()

const style = theme => ({
 
    root: {
        margin: 0,
        padding: theme.spacing(2),
        height: '18px',
        background: ThemeDark
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: danger,
        background: ThemeDark
    },
    content: {
        padding: 2,
    }
});

class ClientProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Tables: []
        }
    }
    componentDidMount() {
        const { Tables } = this.props.data
        this.setState({Tables})
    }
   
    render() { 
        return (
            <Provider
                value={{
                   ...this.state
                }}
            >
                <>
                    {this.props.children}
                  
                </>
            </Provider>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.DataStore,
    }
}


export { Consumer as ClientData, context as ClientHandeler }

export default connect(mapStateToProps)(withStyles(style, { withTheme: true })(ClientProvider))





