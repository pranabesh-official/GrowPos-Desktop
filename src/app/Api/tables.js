
import axios from 'axios'



const featchtable = (auth ) => {
    
    let gettabels = {
        method: 'get',
        url: 'http://127.0.0.1:5000/table',
        headers: {
            'x-access-token': auth
        }
    
    }
    return new Promise((resolve, reject) => {
        axios(gettabels)
        .then(function (response) {
            resolve(response.data)    
        })
        .catch(function (error) {
          reject(error)
          
        })
         
    })
}
export default featchtable