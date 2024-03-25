import axios from "axios";
import { APIRequestBase } from "../models/request/base/APIRequestBase";
import APIResponse from "../models/response/APIResponse";

const API_URL = 'http://localhost:5209/api';

export const API = {
    get: async <TResponse>(url: string, params?: any): Promise<APIResponse<TResponse>> => {
        try {
            const response = await axios.get<TResponse>(API_URL + url, {
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
            const response = await axios.post<TResponse>(API_URL + url, data, {
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
            const response = await axios.put<TResponse>(API_URL + url, data, {
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
            const response = await axios.delete<TResponse>(API_URL + url, {
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