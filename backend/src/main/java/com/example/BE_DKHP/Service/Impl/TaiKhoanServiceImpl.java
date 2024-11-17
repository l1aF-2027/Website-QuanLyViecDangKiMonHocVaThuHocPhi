package com.example.BE_DKHP.Service.Impl;

import com.example.BE_DKHP.DTO.TaiKhoanDTO;
import com.example.BE_DKHP.Entities.SinhVien;
import com.example.BE_DKHP.Entities.TaiKhoan;
import com.example.BE_DKHP.Repository.SinhVienRepository;
import com.example.BE_DKHP.Repository.TaiKhoanRepository;
import com.example.BE_DKHP.Service.TaiKhoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaiKhoanServiceImpl implements TaiKhoanService {
    @Autowired
    private TaiKhoanRepository taiKhoanRepository;

    @Autowired
    private SinhVienRepository sinhVienRepository;

    @Override
    public List<TaiKhoan> findAll() {
        return taiKhoanRepository.findAll();
    }

    @Override
    public TaiKhoan findOne(Integer id) {
        return taiKhoanRepository.findById(id).orElse(null);
    }

    @Override
    public TaiKhoan save(TaiKhoanDTO taiKhoanDTO) {
        TaiKhoan taiKhoan = convertToEntity(taiKhoanDTO);
        return taiKhoanRepository.save(taiKhoan);
    }

    @Override
    public void delete(Integer id) {
        taiKhoanRepository.deleteById(id);
    }

    @Override
    public TaiKhoan update(TaiKhoanDTO taiKhoanDTO) {
        if (taiKhoanRepository.existsById(taiKhoanDTO.getIdTaiKhoan())) {
            TaiKhoan taiKhoan = convertToEntity(taiKhoanDTO);
            return taiKhoanRepository.save(taiKhoan);
        } else {
            return null;
        }
    }

    @Override
    public TaiKhoan checkLogin(String tenTaiKhoan, String matKhau) {
        TaiKhoan taiKhoan = taiKhoanRepository.findByTenTaiKhoanAndMatKhau(tenTaiKhoan, matKhau);
        return taiKhoan;
    }

    private TaiKhoan convertToEntity(TaiKhoanDTO taiKhoanDTO) {
        Optional<SinhVien> sinhVien = sinhVienRepository.findById(taiKhoanDTO.getIdSinhVien());
        if (sinhVien.isPresent()) {
            TaiKhoan taiKhoan = new TaiKhoan();
            taiKhoan.setIdTk(taiKhoanDTO.getIdTaiKhoan());
            taiKhoan.setSinhVien(sinhVien.get());
            taiKhoan.setTenTaiKhoan(taiKhoanDTO.getTenTaiKhoan());
            taiKhoan.setMatKhau(taiKhoanDTO.getMatKhau());
            taiKhoan.setVaiTro(taiKhoanDTO.getVaiTro());
            return taiKhoan;
        } else {
            throw new RuntimeException("SinhVien not found with id: " + taiKhoanDTO.getIdSinhVien());
        }
    }
}
