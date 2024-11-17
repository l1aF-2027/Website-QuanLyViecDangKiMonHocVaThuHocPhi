package com.example.BE_DKHP.Service;
import com.example.BE_DKHP.Entities.HocKy;

import java.util.List;

public interface HocKyService {
    List<HocKy> findAll();
    HocKy findOne(Integer id);
    HocKy save(HocKy hk);
    void delete(Integer id);
    HocKy update(HocKy hk);
}

