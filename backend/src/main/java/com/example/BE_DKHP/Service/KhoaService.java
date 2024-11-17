package com.example.BE_DKHP.Service;

import com.example.BE_DKHP.Entities.Khoa;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface KhoaService {
    List<Khoa> getAllKhoa();
    Khoa getKhoaById(Integer id);
    Khoa addKhoa(Khoa khoa);
    Khoa updateKhoa(Khoa khoa);
    void deleteKhoa(Integer id);
}
