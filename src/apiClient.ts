import axios from 'axios';

export const ApiClient = {
    get() { return axios; },
    setToken(token: string) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
}