import axios from 'axios';
import { BASE_PART } from 'src/App';
const apiUrl = BASE_PART + '/api/monhoc';

export const getAllMonHoc = () => {
  return axios.get(apiUrl);
};

export const createMonHoc = (payload) => {
  return axios.post(apiUrl, payload);
};

export const updateMonHoc = (payload) => {
  return axios.put(apiUrl + '/' + payload?.idMonHoc, payload);
};

export const deleteMonHoc = (id) => {
  return axios.delete(apiUrl + '/' + id);
};
