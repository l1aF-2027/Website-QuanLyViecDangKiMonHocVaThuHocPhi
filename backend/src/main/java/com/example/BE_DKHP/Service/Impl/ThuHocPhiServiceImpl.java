package com.example.BE_DKHP.Service.Impl;

import com.example.BE_DKHP.DTO.ThuHocPhiDTO;
import com.example.BE_DKHP.Entities.HocKy;
import com.example.BE_DKHP.Entities.SinhVien;
import com.example.BE_DKHP.Entities.ThuHocPhi;
import com.example.BE_DKHP.Repository.HocKyRepository;
import com.example.BE_DKHP.Repository.SinhVienRepository;
import com.example.BE_DKHP.Repository.ThuHocPhiRepository;
import com.example.BE_DKHP.Service.ThuHocPhiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ThuHocPhiServiceImpl implements ThuHocPhiService {
    @Autowired
    private ThuHocPhiRepository thuHocPhiRepository;

    @Autowired
    private SinhVienRepository sinhVienRepository;

    @Autowired
    private HocKyRepository hocKyRepository;

    @Override
    public List<ThuHocPhi> findAll() {
        return thuHocPhiRepository.findAll();
    }

    @Override
    public ThuHocPhi findOne(Integer id) {
        return thuHocPhiRepository.findById(id).orElse(null);
    }

    @Override
    public ThuHocPhi save(ThuHocPhiDTO thuHocPhiDTO) {
        ThuHocPhi thuHocPhi = convertToEntity(thuHocPhiDTO);
        return thuHocPhiRepository.save(thuHocPhi);
    }

    @Override
    public void delete(Integer id) {
        thuHocPhiRepository.deleteById(id);
    }

    @Override
    public ThuHocPhi update(ThuHocPhiDTO thuHocPhiDTO) {
        if (thuHocPhiRepository.existsById(thuHocPhiDTO.getSoPhieuThuHp())) {
            ThuHocPhi thuHocPhi = convertToEntity(thuHocPhiDTO);
            return thuHocPhiRepository.save(thuHocPhi);
        } else {
            return null;
        }
    }

    @Override
    public List<ThuHocPhi> findByHocKy(Integer idHocKy) {
        return thuHocPhiRepository.findByIDHocKy(idHocKy);
    }

    private ThuHocPhi convertToEntity(ThuHocPhiDTO thuHocPhiDTO) {
        Optional<SinhVien> sinhVien = sinhVienRepository.findById(thuHocPhiDTO.getIdSinhVien());
        Optional<HocKy> hocKy = hocKyRepository.findById(thuHocPhiDTO.getIdHocKy());

        if (sinhVien.isPresent() && hocKy.isPresent()) {
            ThuHocPhi thuHocPhi = new ThuHocPhi();
            thuHocPhi.setSoPhieuThuHp(thuHocPhiDTO.getSoPhieuThuHp());
            thuHocPhi.setSinhVien(sinhVien.get());
            thuHocPhi.setNgayLapPhieuThuHp(thuHocPhiDTO.getNgayLapPhieuThuHp());
            thuHocPhi.setSoTienDk(thuHocPhiDTO.getSoTienDk());
            thuHocPhi.setSoTienDong(thuHocPhiDTO.getSoTienDong());
            thuHocPhi.setSoTienConLai(thuHocPhiDTO.getSoTienConLai());
            thuHocPhi.setHocKy(hocKy.get());
            return thuHocPhi;
        } else {
            throw new RuntimeException("Related entities not found");
        }
    }
}
