package com.example.BE_DKHP.Service.Impl;

import com.example.BE_DKHP.Entities.ThamSo;
import com.example.BE_DKHP.Repository.ThamSoRepository;
import com.example.BE_DKHP.Service.ThamSoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ThamSoServiceImpl implements ThamSoService {
    @Autowired
    private ThamSoRepository tsRepository;

    @Override
    public List<ThamSo> findAll() {
        return tsRepository.findAll();
    }

    @Override
    public ThamSo findOne(Integer id) {
        return tsRepository.findById(id).orElse(null);
    }

    @Override
    public ThamSo save(ThamSo ts) {
        return tsRepository.save(ts);
    }

    @Override
    public void delete(Integer id) {
        tsRepository.deleteById(id);
    }

    @Override
    public ThamSo update(ThamSo ts) {
        if (tsRepository.existsById(ts.getId())) {
            return tsRepository.save(ts);
        } else {
            return null;
        }
    }
}
