import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:5000/api', // Your Flask API base URL
});

export const fetchFacts = () => API.get('/facts');
export const fetchCenters = () => API.get('/centers');
export const fetchUser = (id) => API.get('/users/' + id);

export const createCenter = (newCenter) => API.post('/centers', newCenter);
export const updateCenter = (id, updatedCenter) => API.put('/centers/' + id, updatedCenter);
export const deleteCenter = (id) => API.delete('/centers/' + id);

export const createUser = (newUser) => API.post('/users', newUser);
export const updateUser = (id, updatedUser) => API.put('/users/' + id, updatedUser);
export const deleteUser = (id) => API.delete('/users/' + id);

export const createFact = (newFact) => API.post('/facts', newFact);
export const updateFact = (id, updatedFact) => API.put('/facts/' + id, updatedFact);
export const deleteFact = (id) => API.delete('/facts/' + id);

// export const login = (credentials) => API.post('/login', credentials);
// export const register = (credentials) => API.post('/register', credentials);
// export const logout = () => API.post('/logout');




// process user login
export const user = null;
