import axios from 'axios';
import { BASE_PART } from 'src/App';
const apiUrl = BASE_PART + '/api/lophoc';

export const getAllLopHoc = () => {
  return axios.get(apiUrl);
};

export const createLopHoc = (payload) => {
  return axios.post(apiUrl, payload);
};

export const updateLopHoc = (payload) => {
  return axios.put(apiUrl + '/' + payload?.idLopHoc, payload);
};

export const deleteLopHoc = (id) => {
  return axios.delete(apiUrl + '/' + id);
};
export const getByNganhHocHocKyMonHoc = (payload) => {
  let config = {
    params: {
      ...payload,
    },
  };
  return axios.get(apiUrl + '/findByNganhHocHocKyMonHoc', config);
};

export const getClassesBySemester = (payload) => {
  let config = {
    params: { idHocKy: payload },
  };
  return axios.get(apiUrl + '/thongKeLopHoc', config);
};
