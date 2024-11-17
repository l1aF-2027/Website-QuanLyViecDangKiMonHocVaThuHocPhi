package com.example.BE_DKHP.Service.Impl;

import com.example.BE_DKHP.DTO.NganhHocDTO;
import com.example.BE_DKHP.Entities.Khoa;
import com.example.BE_DKHP.Entities.NganhHoc;
import com.example.BE_DKHP.Repository.KhoaRepository;
import com.example.BE_DKHP.Repository.NganhHocRepository;
import com.example.BE_DKHP.Service.NganhHocService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NganhHocServiceImpl implements NganhHocService {
    @Autowired
    private NganhHocRepository nganhHocRepository;

    @Autowired
    private KhoaRepository khoaRepository;

    @Override
    public List<NganhHoc> findAll() {
        return nganhHocRepository.findAll();
    }

    @Override
    public NganhHoc findOne(Integer id) {
        return nganhHocRepository.findById(id).orElse(null);
    }

    @Override
    public NganhHoc save(NganhHocDTO nganhHocDTO) {
        NganhHoc nganhHoc = convertToEntity(nganhHocDTO);
        return nganhHocRepository.save(nganhHoc);
    }

    @Override
    public void delete(Integer id) {
        nganhHocRepository.deleteById(id);
    }

    @Override
    public NganhHoc update(NganhHocDTO nganhHocDTO) {
        if (nganhHocRepository.existsById(nganhHocDTO.getIdNganhHoc())) {
            NganhHoc nganhHoc = convertToEntity(nganhHocDTO);
            return nganhHocRepository.save(nganhHoc);
        } else {
            return null;
        }
    }

    private NganhHoc convertToEntity(NganhHocDTO nganhHocDTO) {
        Optional<Khoa> khoa = khoaRepository.findById(nganhHocDTO.getIdKhoa());
        if (khoa.isPresent()) {
            NganhHoc nganhHoc = new NganhHoc();
            nganhHoc.setIdNganhHoc(nganhHocDTO.getIdNganhHoc());
            nganhHoc.setTenNganhHoc(nganhHocDTO.getTenNganhHoc());
            nganhHoc.setKhoa(khoa.get());
            return nganhHoc;
        } else {
            throw new RuntimeException("Khoa not found with id: " + nganhHocDTO.getIdKhoa());
        }
    }
}
