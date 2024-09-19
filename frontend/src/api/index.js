import axios from 'axios';

const apiBase = axios.create({
    baseURL: process.env.REACT_APP_URL_SERVER
})


//teste
export default apiBase;