import axios from 'axios'



export const featchitem= (auth ) => {
    
    let getitem = {
        method: 'get',
        url: 'http://127.0.0.1:5000/item',
        headers: {
            'x-access-token': auth
        }
    
    }
    return new Promise((resolve, reject) => {
        axios(getitem)
        .then(function (response) {
            resolve(response.data)    
        })
        .catch(function (error) {
          reject(error)
          
        })
         
    })
}
