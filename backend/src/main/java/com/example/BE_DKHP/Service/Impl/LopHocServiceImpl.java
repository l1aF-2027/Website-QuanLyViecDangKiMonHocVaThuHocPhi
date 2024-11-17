package com.example.BE_DKHP.Service.Impl;

import com.example.BE_DKHP.DTO.LopHocDTO;
import com.example.BE_DKHP.Entities.ChuongTrinhHoc;
import com.example.BE_DKHP.Entities.LopHoc;
import com.example.BE_DKHP.Repository.ChuongTrinhHocRepository;
import com.example.BE_DKHP.Repository.LopHocRepository;
import com.example.BE_DKHP.Service.LopHocService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LopHocServiceImpl implements LopHocService {
    @Autowired
    private LopHocRepository lopHocRepository;

    @Autowired
    private ChuongTrinhHocRepository chuongTrinhHocRepository;

    @Override
    public List<LopHoc> findAll() {
        return lopHocRepository.findAll();
    }

    @Override
    public LopHoc findOne(Integer id) {
        return lopHocRepository.findById(id).orElse(null);
    }

    @Override
    public LopHoc save(LopHocDTO lopHocDTO) {
        LopHoc lopHoc = convertToEntity(lopHocDTO);
        return lopHocRepository.save(lopHoc);
    }

    @Override
    public void delete(Integer id) {
        lopHocRepository.deleteById(id);
    }

    @Override
    public LopHoc update(LopHocDTO lopHocDTO) {
        if (lopHocRepository.existsById(lopHocDTO.getIdLopHoc())) {
            LopHoc lopHoc = convertToEntity(lopHocDTO);
            return lopHocRepository.save(lopHoc);
        } else {
            return null;
        }
    }

    @Override
    public List<LopHoc> findByHocKy(Integer idHocKy) {
        return lopHocRepository.dsLopHoc(idHocKy);
    }

    @Override
    public List<LopHoc> findByNganhHocHocKyMonHoc(Integer idNganhHoc, Integer idHocKy, Integer idMonHoc) {
        return lopHocRepository.findByNganhHocHocKyMonHoc(idNganhHoc, idHocKy, idMonHoc);
    }

    private LopHoc convertToEntity(LopHocDTO lopHocDTO) {
        Optional<ChuongTrinhHoc> chuongTrinhHoc = chuongTrinhHocRepository.findById(lopHocDTO.getIdChuongTrinhHoc());
        if (chuongTrinhHoc.isPresent()) {
            LopHoc lopHoc = new LopHoc();
            lopHoc.setIdLopHoc(lopHocDTO.getIdLopHoc());
            lopHoc.setChuongTrinhHoc(chuongTrinhHoc.get());
            lopHoc.setTenLop(lopHocDTO.getTenLop());
            lopHoc.setSiSoToiDa(lopHocDTO.getSiSoToiDa());
            lopHoc.setSiSoHienTai(lopHocDTO.getSiSoHienTai());
            return lopHoc;
        } else {
            throw new RuntimeException("ChuongTrinhHoc not found with id: " + lopHocDTO.getIdChuongTrinhHoc());
        }
    }
}
