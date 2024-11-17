import axios from 'axios';
import { BASE_PART } from 'src/App';
const apiUrl = BASE_PART + '/api/doituong';

export const getAllDoiTuong = () => {
  return axios.get(apiUrl);
};

export const createDoiTuong = (payload) => {
  return axios.post(apiUrl, payload);
};

export const updateDoiTuong = (payload) => {
  return axios.put(apiUrl + '/' + payload?.idDoiTuong, payload);
};

export const deleteDoiTuong = (id) => {
  return axios.delete(apiUrl + '/' + id);
};
