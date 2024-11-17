import axios from 'axios';
import { BASE_PART } from 'src/App';
const apiUrl = BASE_PART + '/dangky';

export const getAllDangKy = () => {
  return axios.get(apiUrl);
};

export const createDangKy = (payload) => {
  return axios.post(apiUrl, payload);
};

export const updateDangKy = (payload) => {
  return axios.put(apiUrl, payload);
};

export const deleteDangKy = (id) => {
  return axios.delete(apiUrl + '/' + id);
};
