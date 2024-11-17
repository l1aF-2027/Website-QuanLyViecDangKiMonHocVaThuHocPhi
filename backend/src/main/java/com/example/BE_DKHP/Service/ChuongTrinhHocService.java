package com.example.BE_DKHP.Service;

import com.example.BE_DKHP.DTO.ChuongTrinhHocDTO;
import com.example.BE_DKHP.Entities.ChuongTrinhHoc;
import com.example.BE_DKHP.Entities.MonHoc;

import java.util.List;

public interface ChuongTrinhHocService {
    List<ChuongTrinhHoc> findAll();
    ChuongTrinhHoc findOne(Integer id);
    ChuongTrinhHoc save(ChuongTrinhHocDTO chuongTrinhHocDTO);
    void delete(Integer id);
    ChuongTrinhHoc update(ChuongTrinhHocDTO chuongTrinhHocDTO);
    List<MonHoc> findMonHocByNganhHocAndHocKy(Integer idNganhHoc, Integer idHocKy);
}
