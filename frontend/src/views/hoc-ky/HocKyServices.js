import axios from 'axios';
import { BASE_PART } from 'src/App';
const apiUrl = BASE_PART;

export const getAllHocKy = () => {
  return axios.get(apiUrl + '/getAllHocKy');
};

export const createHocKy = (payload) => {
  return axios.post(apiUrl + '/createHocKy', payload);
};

export const updateHocKy = (payload) => {
  return axios.put(apiUrl + '/updateHocKy', payload);
};

export const deleteHocKy = (id) => {
  return axios.delete(apiUrl + '/deleteHocKy/' + id);
};
