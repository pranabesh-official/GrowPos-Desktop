import React, { Suspense } from 'react';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux'
import Layout from './Layout'

class Pos extends React.Component {
    constructor(props) {
        super(props)
        this.state = { width: 0, height: 0 };
    }


    render() {
        localStorage.setItem('lastPage', '/Pos')
        const loading = (
            <div className="pt-3 text-center">
                <div className="sk-spinner sk-spinner-pulse"></div>
            </div>
        )
        const { height } = this.state
        return (
            <Suspense fallback={loading}>
                <Card style={{ width: '100%', height: height }} >
                    <Layout />
                </Card>
            </Suspense>
        );
    }

    updateDimensions = () => {
        this.setState({ width: document.getElementById('Content').clientWidth, height: document.getElementById('Content').clientHeight });
    };
    componentDidMount() {
        sessionStorage.setItem('route', '/Pos')
        if (this.state.width !== document.getElementById('Content').clientWidth) {
            this.updateDimensions()
        }
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

}
const mapStateToProps = (state) => {
    return {

    }
}
export default connect(mapStateToProps)(Pos)