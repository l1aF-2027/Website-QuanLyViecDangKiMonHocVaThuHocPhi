package com.example.BE_DKHP.Service.Impl;

import com.example.BE_DKHP.Entities.LoaiMon;
import com.example.BE_DKHP.Repository.LoaiMonRepository;
import com.example.BE_DKHP.Service.LoaiMonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoaiMonServiceImpl implements LoaiMonService {
    @Autowired
    private LoaiMonRepository lmRepository;

    @Override
    public List<LoaiMon> findAll() {
        return lmRepository.findAll();
    }

    @Override
    public LoaiMon findOne(Integer id) {
        return lmRepository.findById(id).orElse(null);
    }

    @Override
    public LoaiMon save(LoaiMon lm) {
        return lmRepository.save(lm);
    }

    @Override
    public void delete(Integer id) {
        lmRepository.deleteById(id);
    }

    @Override
    public LoaiMon update(LoaiMon lm) {
        if (lmRepository.existsById(lm.getIdLoaiMon())) {
            return lmRepository.save(lm);
        } else {
            return null;
        }
    }
}
