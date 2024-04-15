import axios from "axios";
import { APIRequestBase } from "../models/request/base/APIRequestBase";
import APIResponse from "../models/response/APIResponse";
import RefreshTokenRequest from "../models/request/Auth/RefreshTokenRequest";
import Auth from "../Auth";

const API_URL = 'http://localhost:5209/api';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error.response.status);
    if (error.response.status === 401) {
      try {
        const request = {
          accessToken: localStorage.getItem('accessToken') ?? '',
          refreshToken: localStorage.getItem('refreshToken') ?? ''
        };

        const response = await Auth.refreshToken(request as RefreshTokenRequest);
        window.location.reload();
        
      } catch (refreshError) {
        console.log('Silent refresh failed');
      }
    }
    return Promise.reject(error);
  }
);

export const API = {
    get: async <TResponse>(url: string, params?: any): Promise<APIResponse<TResponse>> => {
        try {
            const response = await axiosInstance.get<TResponse>(API_URL + url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                },
                params
            });
            return { success: true, data: response.data, statusCode: response.status };
        } catch (error: any) {
            return { success: false, error: error.response?.data, statusCode: error.response?.status };
        }
    },

    post: async <TRequest extends APIRequestBase, TResponse>(
        url: string,
        data?: TRequest,
        headers?: { [key: string]: string }
    ): Promise<APIResponse<TResponse>> => {
        try {
            const response = await axiosInstance.post<TResponse>(API_URL + url, data, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                    ...headers
                }
            });
            return { success: true, data: response.data, statusCode: response.status };
        } catch (error: any) {
            return { success: false, error: error.response?.data, statusCode: error.response?.status };
        }
    },

    put: async <TRequest extends APIRequestBase, TResponse>(
        url: string,
        data: TRequest
    ): Promise<APIResponse<TResponse>> => {
        try {
            const response = await axiosInstance.put<TResponse>(API_URL + url, data, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }
            });
            return { success: true, data: response.data, statusCode: response.status };
        } catch (error: any) {
            return { success: false, error: error.response?.data, statusCode: error.response?.status };
        }
    },

    delete: async <TResponse>(url: string): Promise<APIResponse<TResponse>> => {
        try {
            const response = await axiosInstance.delete<TResponse>(API_URL + url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }
            });
            return { success: true, data: response.data, statusCode: response.status };
        } catch (error: any) {
            return { success: false, error: error.response?.data, statusCode: error.response?.status };
        }
    },
};

export default API;