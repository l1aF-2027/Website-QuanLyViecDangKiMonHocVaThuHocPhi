import axios from 'axios';
import { BASE_PART } from 'src/App';
const apiUrl = BASE_PART + '/api/sinhvien';

export const getAllSinhVien = () => {
  return axios.get(apiUrl);
};

export const createSinhVien = (payload) => {
  return axios.post(apiUrl, payload);
};

export const updateSinhVien = (payload) => {
  return axios.put(apiUrl + '/' + payload?.idSinhVien, payload);
};

export const deleteSinhVien = (id) => {
  return axios.delete(apiUrl + '/' + id);
};

export const getDanhSachDK = (id, idHocKy) => {
  return axios.get(apiUrl + `/getDanhSachDK/${id}/${idHocKy}`);
};

export const getStudentsByClass = (payload) => {
  let config = {
    params: { idLopHoc: payload },
  };
  return axios.get(apiUrl + '/thongKeSinhVien', config);
};
export const getTotalTuitionByStudentId = (idSinhVien, idHocKy) => {
  return axios.get(apiUrl + `/tongtienhoc/${idSinhVien}/${idHocKy}`);
};
