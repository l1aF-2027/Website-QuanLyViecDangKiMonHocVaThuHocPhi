package com.example.BE_DKHP.Service;

import com.example.BE_DKHP.DTO.SinhVienDTO;
import com.example.BE_DKHP.DTO.ThongTinDangKyDTO;
import com.example.BE_DKHP.DTO.TuitionCalculationDTO;
import com.example.BE_DKHP.Entities.SinhVien;

import java.util.List;

public interface SinhVienService {
    List<SinhVien> findAll();
    SinhVien findOne(Integer id);
    SinhVien save(SinhVienDTO sinhVienDTO);
    void delete(Integer id);
    SinhVien update(SinhVienDTO sinhVienDTO);
    List<ThongTinDangKyDTO> findRegistrationInfoByStudentId(Integer idSinhVien, Integer idHocKy);
    TuitionCalculationDTO calculateTotalTuition(Integer idSinhVien, Integer idHocKy);
    List<SinhVien> findByLopHoc(Integer idLopHoc);
}
