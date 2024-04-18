import axios from 'axios';

const BASE_URL = process.env.VUE_APP_BACKEND_API_BASE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL
});

export const fetchMessage = async () => {
    try {
      const response = await apiClient.get('/');
      return response.data;
    } catch (error) {
        console.error('Failed to fetch data', error);
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
        throw error;
      }
      
  };
  
