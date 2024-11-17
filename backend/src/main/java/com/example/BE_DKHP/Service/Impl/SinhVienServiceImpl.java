package com.example.BE_DKHP.Service.Impl;

import com.example.BE_DKHP.DTO.SinhVienDTO;
import com.example.BE_DKHP.DTO.ThongTinDangKyDTO;
import com.example.BE_DKHP.DTO.TuitionCalculationDTO;
import com.example.BE_DKHP.Entities.DoiTuong;
import com.example.BE_DKHP.Entities.NganhHoc;
import com.example.BE_DKHP.Entities.QueQuan;
import com.example.BE_DKHP.Entities.SinhVien;
import com.example.BE_DKHP.Repository.DoiTuongRepository;
import com.example.BE_DKHP.Repository.NganhHocRepository;
import com.example.BE_DKHP.Repository.QueQuanRepository;
import com.example.BE_DKHP.Repository.SinhVienRepository;
import com.example.BE_DKHP.Service.SinhVienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SinhVienServiceImpl implements SinhVienService {
    @Autowired
    private SinhVienRepository sinhVienRepository;

    @Autowired
    private QueQuanRepository queQuanRepository;

    @Autowired
    private DoiTuongRepository doiTuongRepository;

    @Autowired
    private NganhHocRepository nganhHocRepository;

    @Override
    public List<SinhVien> findAll() {
        return sinhVienRepository.findAll();
    }

    @Override
    public SinhVien findOne(Integer id) {
        return sinhVienRepository.findById(id).orElse(null);
    }

    @Override
    public SinhVien save(SinhVienDTO sinhVienDTO) {
        SinhVien sinhVien = convertToEntity(sinhVienDTO);
        return sinhVienRepository.save(sinhVien);
    }

    @Override
    public void delete(Integer id) {
        sinhVienRepository.deleteById(id);
    }

    @Override
    public SinhVien update(SinhVienDTO sinhVienDTO) {
        if (sinhVienRepository.existsById(sinhVienDTO.getIdSinhVien())) {
            SinhVien sinhVien = convertToEntity(sinhVienDTO);
            return sinhVienRepository.save(sinhVien);
        } else {
            return null;
        }
    }

    @Override
    public List<ThongTinDangKyDTO> findRegistrationInfoByStudentId(Integer idSinhVien, Integer idHocKy) {
        return sinhVienRepository.findRegistrationInfoByStudentId(idSinhVien, idHocKy);
    }

    @Override
    public TuitionCalculationDTO calculateTotalTuition(Integer idSinhVien, Integer idHocKy) {
        return sinhVienRepository.calculateTotalTuition(idSinhVien, idHocKy);
    }

    @Override
    public List<SinhVien> findByLopHoc(Integer idLopHoc) {
        return sinhVienRepository.findByLopHocId(idLopHoc);
    }

    private SinhVien convertToEntity(SinhVienDTO sinhVienDTO) {
        Optional<QueQuan> queQuan = queQuanRepository.findById(sinhVienDTO.getIdQueQuan());
        Optional<DoiTuong> doiTuong = doiTuongRepository.findById(sinhVienDTO.getIdDoiTuong());
        Optional<NganhHoc> nganhHoc = nganhHocRepository.findById(sinhVienDTO.getIdNganhHoc());

        if (queQuan.isPresent() && doiTuong.isPresent() && nganhHoc.isPresent()) {
            SinhVien sinhVien = new SinhVien();
            sinhVien.setIdSinhVien(sinhVienDTO.getIdSinhVien());
            sinhVien.setHoTen(sinhVienDTO.getHoTen());
            sinhVien.setNgaySinh(sinhVienDTO.getNgaySinh());
            sinhVien.setGioiTinh(sinhVienDTO.getGioiTinh());
            sinhVien.setQueQuan(queQuan.get());
            sinhVien.setDoiTuong(doiTuong.get());
            sinhVien.setNganhHoc(nganhHoc.get());
            return sinhVien;
        } else {
            throw new RuntimeException("Related entities not found");
        }
    }
}
