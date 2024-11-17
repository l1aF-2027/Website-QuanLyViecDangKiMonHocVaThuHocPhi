package com.example.BE_DKHP.Service;

import com.example.BE_DKHP.DTO.MonHocDTO;
import com.example.BE_DKHP.Entities.MonHoc;

import java.util.List;

public interface MonHocService {
    List<MonHoc> findAll();
    MonHoc findOne(Integer id);
    MonHoc save(MonHocDTO monHocDTO);
    void delete(Integer id);
    MonHoc update(MonHocDTO monHocDTO);
}
