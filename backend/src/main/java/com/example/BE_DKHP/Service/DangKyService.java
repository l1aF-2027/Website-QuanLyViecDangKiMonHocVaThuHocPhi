package com.example.BE_DKHP.Service;

import com.example.BE_DKHP.DTO.DangKyDTO;
import com.example.BE_DKHP.Entities.DangKy;

import java.util.List;

public interface DangKyService {
    List<DangKy> findAll();
    DangKy findOne(Integer id);
    DangKy save(DangKyDTO dangKyDTO) throws Exception;
    void delete(Integer id);
    DangKy update(DangKyDTO dangKyDTO) throws Exception;
}
