const environment = import.meta.env.VITE_ENVIRONMENT || 'dev';
const baseURL = import.meta.env.VITE_BASEURL || 'http://localhost:3001';
export default {
  environment,
  baseURL,
}