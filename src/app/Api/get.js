import axios from 'axios'
const baseurl = 'http://127.0.0.1:5000/'

export const getData = (auth, url) => {
    const geyurl = baseurl + url
    const myHeaders = new Headers();
    myHeaders.append("x-access-token", auth);

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return new Promise((resolve, reject) => {
        fetch(geyurl, requestOptions)
            .then(response => response.text())
            .then(result => {        
                resolve(JSON.parse(result) )
            })
            .catch(error =>  reject(error));
    })

}

export const axoisgetData = (auth, url) => {
    let getitem = {
        method: 'get',
        url: baseurl + url,
        headers: {
            'x-access-token': auth,
            'Content-Type': 'application/json'
        },
    }
    return new Promise((resolve, reject) => {
        axios(getitem)
            .then(function (response) {
                resolve(response.data)

            })
            .catch(function (error) {
                reject(error)
                console.log(error)

            })

    })
}