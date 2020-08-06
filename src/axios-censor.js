import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://neutrinoapi.net/'
});

export default instance;