import axios from 'axios';
import { BASE_PART } from 'src/App';
const apiUrl = BASE_PART + '/api/taikhoan';

export const getAllTaiKhoan = () => {
  return axios.get(apiUrl);
};

export const createTaiKhoan = (payload) => {
  return axios.post(apiUrl, payload);
};

export const updateTaiKhoan = (payload) => {
  return axios.put(apiUrl + '/' + payload?.idTk, payload);
};

export const deleteTaiKhoan = (id) => {
  return axios.delete(apiUrl + '/' + id);
};

export const login = (payload) => {
  return axios.post(apiUrl + '/login', payload);
};
