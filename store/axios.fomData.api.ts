import axios from "axios";
import { SERVER_URL } from "./shop.api";

if (typeof window !== "undefined"){
    const headers = {
    'Content-Type': 'multipart/form-data',
    'Authorization': 'Bearer ' + localStorage.getItem('accessToken') ?? ''
};
}

const headers = {
    'Content-Type': 'multipart/form-data',
    'Authorization': ''
};

const vkHeaders = {
    'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
    'Host':'<calculated when request is sent>',
    'Content-Length':'<calculated when request is sent>'
};

const axiosFormDataApi = axios.create({
    withCredentials: true,
    baseURL: SERVER_URL,
    headers: headers
});


export const axiosVkUserData = axios.create({
    
    baseURL: 'https://api.vk.com',
    headers: vkHeaders
});

export default axiosFormDataApi
