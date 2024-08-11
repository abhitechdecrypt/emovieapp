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

  export const getCinemaList = async () => {
    try {
      const response = await axiosInstance.get(api.SUB_URL_MOVIES+api.LIST_CINEMA);
      return response?.data;
    } catch (error) {
      console.error('Get cinema list error:', error.response?.data || error.message);
      throw error; // Re-throw the error to be handled by the caller
    }
  }

  export const addMovies = async (data) => {
    try {
      const response = await axiosInstance.post(api.SUB_URL_MOVIES+api.ADD_MOVIES,data);
      return response.data;
    } catch (error) {
      console.error('Add movies error:', error.response?.data || error.message);
      throw error; // Re-throw the error to be handled by the caller
    }
  }
  export const blockUnblockCinema = async (id) => {
    try {
      const response = await axiosInstance.put(api.SUB_URL_MOVIES+api.BLOCK_UNBLOCK_CINEMA+"/"+id);
      return response.data;
    } catch (error) {
      console.error('Add movies error:', error.response?.data || error.message);
      throw error; // Re-throw the error to be handled by the caller
    }
  }