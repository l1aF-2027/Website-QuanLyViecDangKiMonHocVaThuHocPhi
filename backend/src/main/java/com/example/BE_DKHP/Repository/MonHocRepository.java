package com.example.BE_DKHP.Repository;


import com.example.BE_DKHP.Entities.MonHoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MonHocRepository extends JpaRepository<MonHoc, Integer> {}