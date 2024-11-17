import axios from 'axios';
import { BASE_PART } from 'src/App';
const apiUrl = BASE_PART + '/api/thamso';

export const getAllThamSo = () => {
  return axios.get(apiUrl);
};

export const createThamSo = (payload) => {
  return axios.post(apiUrl, payload);
};

export const updateThamSo = (payload) => {
  return axios.put(apiUrl + '/' + payload?.id, payload);
};

export const deleteThamSo = (id) => {
  return axios.delete(apiUrl + '/' + id);
};
