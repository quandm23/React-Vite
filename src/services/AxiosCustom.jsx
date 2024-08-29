import axios from 'axios';
export const instance = axios.create({
    // baseURL: 'http://localhost:8080/',
    baseURL: import.meta.env.VITE_BACKEND_URL
  });
  

  // Add a request interceptor
  instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    if(window !== "undefined" && window && window.localStorage && window.localStorage.getItem("access_token")){
      config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('access_token');
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if(response && response.data ) return response.data;
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if(error.response.data) return error.response.data;
    return Promise.reject(error);
  });