import { axiosInstance } from "./AxiosInstance";
import * as api from'./API_CONSTANT';


export const login = async (data) => {
    try {
      const response = await axiosInstance.post(api.SUB_URL_USERS+api.USER_LOGIN,data);      
      console.log(response);
      
      return response.data;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw error; // Re-throw the error to be handled by the caller
    }
  };


  export const register = async (data) => {
    try {
      const response = await axiosInstance.post("http://localhost:8083/api/v1/movies/register",data);
      return response.data;
    } catch (error) {
      console.error('Register error:', error.response?.data || error.message);
      throw error; // Re-throw the error to be handled by the caller
    }
  };

  export const getMovies = async () => {
    try {
      const response = await axiosInstance.get("http://localhost:8083/api/v1/movies");
      return response.data;
    } catch (error) {
      console.error('Get movies error:', error.response?.data || error.message);
      throw error; // Re-throw the error to be handled by the caller
    }
  };
