package com.example.BE_DKHP.Service.Impl;

import com.example.BE_DKHP.DTO.ChuongTrinhHocDTO;
import com.example.BE_DKHP.Entities.ChuongTrinhHoc;
import com.example.BE_DKHP.Entities.HocKy;
import com.example.BE_DKHP.Entities.MonHoc;
import com.example.BE_DKHP.Entities.NganhHoc;
import com.example.BE_DKHP.Repository.ChuongTrinhHocRepository;
import com.example.BE_DKHP.Repository.HocKyRepository;
import com.example.BE_DKHP.Repository.MonHocRepository;
import com.example.BE_DKHP.Repository.NganhHocRepository;
import com.example.BE_DKHP.Service.ChuongTrinhHocService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChuongTrinhHocServiceImpl implements ChuongTrinhHocService {
    @Autowired
    private ChuongTrinhHocRepository chuongTrinhHocRepository;

    @Autowired
    private NganhHocRepository nganhHocRepository;

    @Autowired
    private HocKyRepository hocKyRepository;

    @Autowired
    private MonHocRepository monHocRepository;

    @Override
    public List<ChuongTrinhHoc> findAll() {
        return chuongTrinhHocRepository.findAll();
    }

    @Override
    public ChuongTrinhHoc findOne(Integer id) {
        return chuongTrinhHocRepository.findById(id).orElse(null);
    }

    @Override
    public ChuongTrinhHoc save(ChuongTrinhHocDTO chuongTrinhHocDTO) {
        ChuongTrinhHoc chuongTrinhHoc = new ChuongTrinhHoc();
        NganhHoc nganhHoc = nganhHocRepository.findById(chuongTrinhHocDTO.getIdNganhHoc()).orElse(null);
        HocKy hocKy = hocKyRepository.findById(chuongTrinhHocDTO.getIdHocKy()).orElse(null);
        MonHoc monHoc = monHocRepository.findById(chuongTrinhHocDTO.getIdMonHoc()).orElse(null);

        if (nganhHoc != null && hocKy != null && monHoc != null) {
            chuongTrinhHoc.setNganhHoc(nganhHoc);
            chuongTrinhHoc.setHocKy(hocKy);
            chuongTrinhHoc.setMonHoc(monHoc);
            chuongTrinhHoc.setGhiChu(chuongTrinhHocDTO.getGhiChu());
            return chuongTrinhHocRepository.save(chuongTrinhHoc);
        }
        return null;
    }

    @Override
    public void delete(Integer id) {
        chuongTrinhHocRepository.deleteById(id);
    }

    @Override
    public ChuongTrinhHoc update(ChuongTrinhHocDTO chuongTrinhHocDTO) {
        ChuongTrinhHoc chuongTrinhHoc = chuongTrinhHocRepository.findById(chuongTrinhHocDTO.getIdChuongTrinhHoc()).orElse(null);
        NganhHoc nganhHoc = nganhHocRepository.findById(chuongTrinhHocDTO.getIdNganhHoc()).orElse(null);
        HocKy hocKy = hocKyRepository.findById(chuongTrinhHocDTO.getIdHocKy()).orElse(null);
        MonHoc monHoc = monHocRepository.findById(chuongTrinhHocDTO.getIdMonHoc()).orElse(null);

        if (chuongTrinhHoc != null && nganhHoc != null && hocKy != null && monHoc != null) {
            chuongTrinhHoc.setNganhHoc(nganhHoc);
            chuongTrinhHoc.setHocKy(hocKy);
            chuongTrinhHoc.setMonHoc(monHoc);
            chuongTrinhHoc.setGhiChu(chuongTrinhHocDTO.getGhiChu());
            return chuongTrinhHocRepository.save(chuongTrinhHoc);
        }
        return null;
    }

    @Override
    public List<MonHoc> findMonHocByNganhHocAndHocKy(Integer idNganhHoc, Integer idHocKy) {
        NganhHoc nganhHoc = nganhHocRepository.findById(idNganhHoc).orElse(null);
        HocKy hocKy = hocKyRepository.findById(idHocKy).orElse(null);

        if (nganhHoc != null && hocKy != null) {
            return chuongTrinhHocRepository.findMonHocByNganhHocAndHocKy(nganhHoc, hocKy);
        }

        return null;
    }
}
