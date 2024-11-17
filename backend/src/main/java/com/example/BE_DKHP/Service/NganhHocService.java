package com.example.BE_DKHP.Service;

import com.example.BE_DKHP.DTO.NganhHocDTO;
import com.example.BE_DKHP.Entities.NganhHoc;

import java.util.List;

public interface NganhHocService {
    List<NganhHoc> findAll();
    NganhHoc findOne(Integer id);
    NganhHoc save(NganhHocDTO nganhHocDTO);
    void delete(Integer id);
    NganhHoc update(NganhHocDTO nganhHocDTO);
}
