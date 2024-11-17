import axios from 'axios';
import { BASE_PART } from 'src/App';
const apiUrl = BASE_PART + '/api/nganhhoc';

export const getAllNganhHoc = () => {
  return axios.get(apiUrl);
};

export const createNganhHoc = (payload) => {
  return axios.post(apiUrl, payload);
};

export const updateNganhHoc = (payload) => {
  return axios.put(apiUrl + '/' + payload?.idNganhHoc, payload);
};

export const deleteNganhHoc = (id) => {
  return axios.delete(apiUrl + '/' + id);
};
