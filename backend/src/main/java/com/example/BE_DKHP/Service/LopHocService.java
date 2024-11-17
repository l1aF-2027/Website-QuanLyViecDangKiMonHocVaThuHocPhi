package com.example.BE_DKHP.Service;

import com.example.BE_DKHP.DTO.LopHocDTO;
import com.example.BE_DKHP.Entities.LopHoc;

import java.util.List;

public interface LopHocService {
    List<LopHoc> findAll();
    LopHoc findOne(Integer id);
    LopHoc save(LopHocDTO lopHocDTO);
    void delete(Integer id);
    LopHoc update(LopHocDTO lopHocDTO);
    List<LopHoc> findByHocKy(Integer idHocKy);
    List<LopHoc> findByNganhHocHocKyMonHoc(Integer idNganhHoc, Integer idHocKy, Integer idMonHoc);
}
