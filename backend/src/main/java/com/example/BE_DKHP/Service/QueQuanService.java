package com.example.BE_DKHP.Service;

import com.example.BE_DKHP.Entities.QueQuan;

import java.util.List;

public interface QueQuanService {
    List<QueQuan> findAll();
    QueQuan findOne(Integer id);
    QueQuan save(QueQuan qq);
    void delete(Integer id);
    QueQuan update(QueQuan qq);
}
