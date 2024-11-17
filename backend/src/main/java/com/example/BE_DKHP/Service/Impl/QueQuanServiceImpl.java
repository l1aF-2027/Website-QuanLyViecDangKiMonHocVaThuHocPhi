package com.example.BE_DKHP.Service.Impl;

import com.example.BE_DKHP.Entities.QueQuan;
import com.example.BE_DKHP.Repository.QueQuanRepository;
import com.example.BE_DKHP.Service.QueQuanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QueQuanServiceImpl implements QueQuanService {
    @Autowired
    private QueQuanRepository qqRepository;

    @Override
    public List<QueQuan> findAll() {
        return qqRepository.findAll();
    }

    @Override
    public QueQuan findOne(Integer id) {
        return qqRepository.findById(id).orElse(null);
    }

    @Override
    public QueQuan save(QueQuan qq) {
        return qqRepository.save(qq);
    }

    @Override
    public void delete(Integer id) {
        qqRepository.deleteById(id);
    }

    @Override
    public QueQuan update(QueQuan qq) {
        if (qqRepository.existsById(qq.getIdQueQuan())) {
            return qqRepository.save(qq);
        } else {
            return null;
        }
    }
}
