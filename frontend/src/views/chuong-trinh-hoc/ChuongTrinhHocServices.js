import axios from 'axios';
import { BASE_PART } from 'src/App';
const apiUrl = BASE_PART + '/chuongtrinhhoc';

export const getAllChuongTrinhHoc = () => {
  return axios.get(apiUrl);
};

export const createChuongTrinhHoc = (payload) => {
  return axios.post(apiUrl, payload);
};

export const updateChuongTrinhHoc = (payload) => {
  return axios.put(apiUrl, payload);
};

export const deleteChuongTrinhHoc = (id) => {
  return axios.delete(apiUrl + '/' + id);
};

export const getMonHocByHocKy = (payload) => {
  let config = {
    params: {
      ...payload,
    },
  };
  return axios.get(apiUrl + '/monhoc', config);
};
