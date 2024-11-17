package com.example.BE_DKHP.Repository;


import com.example.BE_DKHP.Entities.LoaiMon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoaiMonRepository extends JpaRepository<LoaiMon, Integer> {}
