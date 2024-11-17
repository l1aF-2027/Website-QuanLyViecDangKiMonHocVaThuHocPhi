package com.example.BE_DKHP.Service;

import com.example.BE_DKHP.DTO.TaiKhoanDTO;
import com.example.BE_DKHP.Entities.TaiKhoan;

import java.util.List;

public interface TaiKhoanService {
    List<TaiKhoan> findAll();
    TaiKhoan findOne(Integer id);
    TaiKhoan save(TaiKhoanDTO taiKhoanDTO);
    void delete(Integer id);
    TaiKhoan update(TaiKhoanDTO taiKhoanDTO);
    TaiKhoan checkLogin(String tenTaiKhoan, String matKhau);
}
