import axios from 'axios';

const instance = axios.create({
  baseURL: 'localhost:3001'
});

export default instance;
