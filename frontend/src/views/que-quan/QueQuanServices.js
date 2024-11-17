import axios from 'axios';
import { BASE_PART } from 'src/App';
const apiUrl = BASE_PART + '/api/quequan';

export const getAllQueQuan = () => {
  return axios.get(apiUrl);
};

export const createQueQuan = (payload) => {
  return axios.post(apiUrl, payload);
};

export const updateQueQuan = (payload) => {
  return axios.put(apiUrl + '/' + payload?.idQueQuan, payload);
};

export const deleteQueQuan = (id) => {
  return axios.delete(apiUrl + '/' + id);
};
