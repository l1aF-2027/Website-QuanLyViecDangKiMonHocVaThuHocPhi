package com.example.BE_DKHP.Service;

import com.example.BE_DKHP.Entities.ThamSo;

import java.util.List;

public interface ThamSoService {
    List<ThamSo> findAll();
    ThamSo findOne(Integer id);
    ThamSo save(ThamSo ts);
    void delete(Integer id);
    ThamSo update(ThamSo ts);
}
