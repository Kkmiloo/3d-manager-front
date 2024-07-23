import axios from 'axios';

const url = import.meta.env.VITE_BACKEND_URI;

const backendApi = axios.create({ baseURL: url });

export { backendApi };
