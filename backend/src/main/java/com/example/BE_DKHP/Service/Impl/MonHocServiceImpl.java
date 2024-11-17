package com.example.BE_DKHP.Service.Impl;

import com.example.BE_DKHP.DTO.MonHocDTO;
import com.example.BE_DKHP.Entities.LoaiMon;
import com.example.BE_DKHP.Entities.MonHoc;
import com.example.BE_DKHP.Repository.LoaiMonRepository;
import com.example.BE_DKHP.Repository.MonHocRepository;
import com.example.BE_DKHP.Service.MonHocService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MonHocServiceImpl implements MonHocService {
    @Autowired
    private MonHocRepository monHocRepository;

    @Autowired
    private LoaiMonRepository loaiMonRepository;

    @Override
    public List<MonHoc> findAll() {
        return monHocRepository.findAll();
    }

    @Override
    public MonHoc findOne(Integer id) {
        return monHocRepository.findById(id).orElse(null);
    }

    @Override
    public MonHoc save(MonHocDTO monHocDTO) {
        MonHoc monHoc = convertToEntity(monHocDTO);
        return monHocRepository.save(monHoc);
    }

    @Override
    public void delete(Integer id) {
        monHocRepository.deleteById(id);
    }

    @Override
    public MonHoc update(MonHocDTO monHocDTO) {
        if (monHocRepository.existsById(monHocDTO.getIdMonHoc())) {
            MonHoc monHoc = convertToEntity(monHocDTO);
            return monHocRepository.save(monHoc);
        } else {
            return null;
        }
    }

    private MonHoc convertToEntity(MonHocDTO monHocDTO) {
        Optional<LoaiMon> loaiMon = loaiMonRepository.findById(monHocDTO.getIdLoaiMon());
        if (loaiMon.isPresent()) {
            MonHoc monHoc = new MonHoc();
            monHoc.setIdMonHoc(monHocDTO.getIdMonHoc());
            monHoc.setTenMonHoc(monHocDTO.getTenMonHoc());
            monHoc.setLoaiMon(loaiMon.get());
            monHoc.setSoTiet(monHocDTO.getSoTiet());
            monHoc.setTinChi(monHocDTO.getTinChi());
            return monHoc;
        } else {
            throw new RuntimeException("LoaiMon not found with id: " + monHocDTO.getIdLoaiMon());
        }
    }
}
