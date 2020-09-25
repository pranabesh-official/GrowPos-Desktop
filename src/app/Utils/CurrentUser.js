import axios from 'axios';

export const CurrentUser = () => {
    const token = sessionStorage.getItem("token")
    const config = {
        method: 'get',
        url: 'http://localhost:4545/users/me',
        headers: {
            'Authorization':`Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    };
    
    axios(config)
            .then(({ data }) => {
                return data
            })
            .catch((err) => {
                console.log('Error:', err)
                return null
            });

     
}
