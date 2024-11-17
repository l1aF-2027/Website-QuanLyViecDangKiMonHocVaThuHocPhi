import axios from 'axios';
import { BASE_PART } from 'src/App';
const apiUrl = BASE_PART + '/api/loaimon';

export const getAllLoaiMonHoc = () => {
  return axios.get(apiUrl);
};

export const createLoaiMonHoc = (payload) => {
  return axios.post(apiUrl, payload);
};

export const updateLoaiMonHoc = (payload) => {
  return axios.put(apiUrl + '/' + payload?.idLoaiMon, payload);
};

export const deleteLoaiMonHoc = (id) => {
  return axios.delete(apiUrl + '/' + id);
};
