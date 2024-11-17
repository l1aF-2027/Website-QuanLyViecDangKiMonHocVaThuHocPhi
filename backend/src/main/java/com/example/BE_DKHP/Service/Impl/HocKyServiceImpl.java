package com.example.BE_DKHP.Service.Impl;

import com.example.BE_DKHP.Entities.HocKy;
import com.example.BE_DKHP.Repository.HocKyRepository;
import com.example.BE_DKHP.Service.HocKyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HocKyServiceImpl implements HocKyService {
    @Autowired
    private HocKyRepository hkRepository;

    @Override
    public List<HocKy> findAll() {
        return hkRepository.findAll();
    }

    @Override
    public HocKy findOne(Integer id) {
        return hkRepository.findById(id).orElse(null);
    }

    @Override
    public HocKy save(HocKy hk) {
        return hkRepository.save(hk);
    }

    @Override
    public void delete(Integer id) {
        hkRepository.deleteById(id);
    }

    @Override
    public HocKy update(HocKy hk) {
        if (hkRepository.existsById(hk.getIdHocKy())) {
            return hkRepository.save(hk);
        } else {
            return null;
        }
    }
}
