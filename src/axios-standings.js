import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://blockudoku-35c3b.firebaseio.com/'
});

export default instance;