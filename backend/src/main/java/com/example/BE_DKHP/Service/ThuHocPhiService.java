package com.example.BE_DKHP.Service;

import com.example.BE_DKHP.DTO.ThuHocPhiDTO;
import com.example.BE_DKHP.Entities.ThuHocPhi;

import java.util.List;

public interface ThuHocPhiService {
    List<ThuHocPhi> findAll();
    ThuHocPhi findOne(Integer id);
    ThuHocPhi save(ThuHocPhiDTO thuHocPhiDTO);
    void delete(Integer id);
    ThuHocPhi update(ThuHocPhiDTO thuHocPhiDTO);
    List<ThuHocPhi> findByHocKy(Integer idHocKy);
}
