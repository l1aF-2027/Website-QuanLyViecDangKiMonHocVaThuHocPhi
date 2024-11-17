import axios from 'axios';
import { BASE_PART } from 'src/App';
const apiUrl = BASE_PART;

export const getAllKhoa = () => {
  return axios.get(apiUrl + '/getAllKhoa');
};

export const createKhoa = (payload) => {
  return axios.post(apiUrl + '/createKhoa', payload);
};

export const updateKhoa = (payload) => {
  return axios.put(apiUrl + '/updateKhoa', payload);
};

export const deleteKhoa = (id) => {
  return axios.delete(apiUrl + '/deleteKhoa/' + id);
};
