package com.example.BE_DKHP.Service.Impl;

import com.example.BE_DKHP.DTO.DangKyDTO;
import com.example.BE_DKHP.Entities.DangKy;
import com.example.BE_DKHP.Entities.LopHoc;
import com.example.BE_DKHP.Entities.SinhVien;
import com.example.BE_DKHP.Repository.DangKyRepository;
import com.example.BE_DKHP.Repository.LopHocRepository;
import com.example.BE_DKHP.Repository.SinhVienRepository;
import com.example.BE_DKHP.Service.DangKyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DangKyServiceImpl implements DangKyService {
    @Autowired
    private DangKyRepository dangKyRepository;

    @Autowired
    private SinhVienRepository sinhVienRepository;

    @Autowired
    private LopHocRepository lopHocRepository;

    @Override
    public List<DangKy> findAll() {
        return dangKyRepository.findAll();
    }

    @Override
    public DangKy findOne(Integer id) {
        return dangKyRepository.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public DangKy save(DangKyDTO dangKyDTO) throws Exception {
        SinhVien sinhVien = sinhVienRepository.findById(dangKyDTO.getIdSinhVien()).orElse(null);
        LopHoc lopHoc = lopHocRepository.findById(dangKyDTO.getIdLopHoc()).orElse(null);

        if (sinhVien == null) {
            throw new Exception("Sinh viên không tồn tại");
        }

        if (lopHoc == null) {
            throw new Exception("Lớp học không tồn tại");
        }

        // Kiểm tra số lượng hiện tại của lớp học
        if (lopHoc.getSiSoHienTai() >= lopHoc.getSiSoToiDa()) {
            throw new Exception("Lớp học đã đầy");
        }

        DangKy dangKy = new DangKy();
        dangKy.setSinhVien(sinhVien);
        dangKy.setLopHoc(lopHoc);
        dangKy.setNgayLapPhieuDk(dangKyDTO.getNgayLapPhieuDK());

        // Cập nhật số sinh viên hiện tại của lớp học
        lopHoc.setSiSoHienTai(lopHoc.getSiSoHienTai() + 1);
        lopHocRepository.save(lopHoc);

        return dangKyRepository.save(dangKy);
    }


    @Override
    @Transactional
    public void delete(Integer id) {
        DangKy dangKy = dangKyRepository.findById(id).orElse(null);
        if (dangKy != null) {
            LopHoc lopHoc = dangKy.getLopHoc();
            // Giảm số sinh viên hiện tại của lớp học khi xóa đăng ký
            if (lopHoc != null) {
                lopHoc.setSiSoHienTai(lopHoc.getSiSoHienTai() - 1);
                lopHocRepository.save(lopHoc);
            }
            dangKyRepository.deleteById(id);
        }
    }

    @Override
    @Transactional
    public DangKy update(DangKyDTO dangKyDTO) throws Exception {
        DangKy dangKy = dangKyRepository.findById(dangKyDTO.getSoPhieuDK()).orElse(null);
        SinhVien sinhVien = sinhVienRepository.findById(dangKyDTO.getIdSinhVien()).orElse(null);
        LopHoc lopHoc = lopHocRepository.findById(dangKyDTO.getIdLopHoc()).orElse(null);

        if (dangKy == null) {
            throw new Exception("Đăng ký không tồn tại");
        }

        if (sinhVien == null) {
            throw new Exception("Sinh viên không tồn tại");
        }

        if (lopHoc == null) {
            throw new Exception("Lớp học không tồn tại");
        }

        // Kiểm tra số lượng hiện tại của lớp học
        if (lopHoc.getSiSoHienTai() >= lopHoc.getSiSoToiDa()) {
            throw new Exception("Lớp học đã đầy");
        }

        dangKy.setSinhVien(sinhVien);
        dangKy.setLopHoc(lopHoc);
        dangKy.setNgayLapPhieuDk(dangKyDTO.getNgayLapPhieuDK());

        // Cập nhật số sinh viên hiện tại của lớp học
        lopHoc.setSiSoHienTai(lopHoc.getSiSoHienTai() + 1);
        lopHocRepository.save(lopHoc);

        return dangKyRepository.save(dangKy);
    }

}
