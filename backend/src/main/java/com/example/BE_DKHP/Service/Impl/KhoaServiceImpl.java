package com.example.BE_DKHP.Service.Impl;

import com.example.BE_DKHP.Entities.Khoa;
import com.example.BE_DKHP.Repository.KhoaRepository;
import com.example.BE_DKHP.Service.KhoaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class KhoaServiceImpl implements KhoaService {
    @Autowired
    private KhoaRepository khoaRepository;
    @Override
    public List<Khoa> getAllKhoa() {
        return khoaRepository.findAll();
    }

    @Override
    public Khoa getKhoaById(Integer id) {
        return khoaRepository.findById(id).orElse(null);
    }

    @Override
    public Khoa addKhoa(Khoa khoa) {
        return khoaRepository.save(khoa);
    }

    @Override
    public Khoa updateKhoa(Khoa khoa) {
        if (khoaRepository.existsById(khoa.getIdKhoa())) {
            return khoaRepository.save(khoa);
        } else {
            return null;
        }
    }


    @Override
    public void deleteKhoa(Integer id) {
        khoaRepository.deleteById(id);
    }
}
