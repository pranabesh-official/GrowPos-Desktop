import axios from 'axios'
const baseurl = 'http://127.0.0.1:5000/'

export const postData = (auth, url, senddata) => {
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
    return new Promise((resolve, reject) => {
        axios(postitem)
            .then(function (response) {
                console.log(response)
                resolve(response.data)

            })
            .catch(function (error) {
                console.log(error)
                reject(error)


            })

    })
}