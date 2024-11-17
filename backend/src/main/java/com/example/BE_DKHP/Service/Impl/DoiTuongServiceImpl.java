package com.example.BE_DKHP.Service.Impl;

import com.example.BE_DKHP.Entities.DoiTuong;
import com.example.BE_DKHP.Repository.DoiTuongRepository;
import com.example.BE_DKHP.Service.DoiTuongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoiTuongServiceImpl implements DoiTuongService {
    @Autowired
    private DoiTuongRepository dtRepository;

    @Override
    public List<DoiTuong> findAll() {
        return dtRepository.findAll();
    }

    @Override
    public DoiTuong findOne(Integer id) {
        return dtRepository.findById(id).orElse(null);
    }

    @Override
    public DoiTuong save(DoiTuong dt) {
        return dtRepository.save(dt);
    }

    @Override
    public void delete(Integer id) {
        dtRepository.deleteById(id);
    }

    @Override
    public DoiTuong update(DoiTuong dt) {
        if (dtRepository.existsById(dt.getIdDoiTuong())) {
            return dtRepository.save(dt);
        } else {
            return null;
        }
    }
}
