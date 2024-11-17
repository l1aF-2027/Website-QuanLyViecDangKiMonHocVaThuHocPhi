import axios from 'axios';
import { BASE_PART } from 'src/App';
const apiUrl = BASE_PART + '/api/thuhocphi';

export const getAllThuHocPhi = () => {
  return axios.get(apiUrl);
};

export const createThuHocPhi = (payload) => {
  return axios.post(apiUrl, payload);
};

export const updateThuHocPhi = (payload) => {
  return axios.put(apiUrl + '/' + payload?.soPhieuThuHp, payload);
};

export const deleteThuHocPhi = (id) => {
  return axios.delete(apiUrl + '/' + id);
};

export const getHocPhIByHocKy = (id) => {
  return axios.get(apiUrl + '/thongke/' + id);
};
