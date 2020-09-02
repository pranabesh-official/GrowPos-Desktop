import React, { createContext, Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
// import dataUrl from './dataUrl'
// import { v5 as uuid5 } from 'uuid';
// import io from 'socket.io-client'
// const socket = io.connect('http://localhost:4000')

const baseurl = 'http://127.0.0.1:5000/'
const auth = sessionStorage.getItem('token')
let EmployeContex = null;
const { Provider, Consumer } = EmployeContex = createContext()


class EmployeProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            GenderOptions: [
                { name: 'Male', id: 1 },
                { name: 'Female', id: 2 },

            ],
            TypeOptions: [
                { name: 'Exprerienceed', id: 1 },
                { name: 'Interned', id: 3 }
            ],
            DepartmentOptions: [
                { name: 'ADMIN', id: 1 },
                { name: 'CASHIER', id: 2 }
            ],
            users: []

        }
        this.handlesubmit = this.handlesubmit.bind(this)
        this.handleremove = this.handleremove.bind(this)
        this.stateReset = this.stateReset.bind(this)
        this.stateReset = this.getUsers.bind(this)
    }
    componentDidMount() {
        this.getUsers().then((data)=>{
            this.setState({ users: data })
        })
        
    }
    getUsers(){
        let getitem = {
            method: 'get',
            url: baseurl + 'user',
            headers: {
                'x-access-token': auth,
                'Content-Type': 'application/json'
            },
        }
        return new Promise((resolve, reject) => {
            axios(getitem)
                .then(({data})=> {
                    resolve(data)
                })
                .catch((error)=> {
                    reject(error)
                    console.log(error)
                })
        })
    }

    handlesubmit(url, senddata) {
        const data = JSON.stringify(senddata)
        let postitem = {
            method: 'post',
            url: baseurl + url,
            headers: {
                'x-access-token': auth,
                'Content-Type': 'application/json'
            },
            data: data
        }
        axios(postitem)
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            })

    }

    handleremove(url, id) {

    }
    stateReset() {

    }

    render() {
        console.log(this.state.users)
        return (
            <Provider
                value={{
                    ...this.props.data,
                    ...this.state,
                    handlesubmit: this.handlesubmit,
                    handleremove: this.handleremove
                }}
            >
                <div>
                    {this.props.children}
                </div>
            </Provider>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.apiData,
        sync: state.SyncData
    }
}
export { Consumer as EmployeConsumer, EmployeContex }

export default connect(mapStateToProps)(EmployeProvider) 