import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

export const setupAxiosInterceptors = (getToken: () => Promise<string | null>) => {
  axiosInstance.interceptors.request.use(
    async (config) => {
      try {
        const token = await getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Could not get Clerk token", error);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};