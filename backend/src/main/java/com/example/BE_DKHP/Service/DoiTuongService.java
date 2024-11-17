package com.example.BE_DKHP.Service;

import com.example.BE_DKHP.DTO.ChuongTrinhHocDTO;
import com.example.BE_DKHP.Entities.ChuongTrinhHoc;
import com.example.BE_DKHP.Entities.DoiTuong;

import java.util.List;

public interface DoiTuongService {
    List<DoiTuong> findAll();
    DoiTuong findOne(Integer id);
    DoiTuong save(DoiTuong dt);
    void delete(Integer id);
    DoiTuong update(DoiTuong dt);

    interface ChuongTrinhHocService {
        List<ChuongTrinhHoc> findAll();
        ChuongTrinhHoc findOne(Integer id);
        ChuongTrinhHoc save(ChuongTrinhHocDTO chuongTrinhHocDTO);
        void delete(Integer id);
        ChuongTrinhHoc update(ChuongTrinhHocDTO chuongTrinhHocDTO);
    }
}
