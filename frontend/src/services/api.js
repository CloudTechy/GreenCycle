import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:5000/api', // Your Flask API base URL
});

export const fetchFacts = () => API.get('/facts');
export const fetchCenters = () => API.get('/centers');
