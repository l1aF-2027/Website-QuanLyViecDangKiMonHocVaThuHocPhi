package com.example.BE_DKHP.Service;

import com.example.BE_DKHP.Entities.LoaiMon;

import java.util.List;

public interface LoaiMonService {
    List<LoaiMon> findAll();
    LoaiMon findOne(Integer id);
    LoaiMon save(LoaiMon lm);
    void delete(Integer id);
    LoaiMon update(LoaiMon lm);
}
