package com.example.BE_DKHP.Repository;


import com.example.BE_DKHP.Entities.DoiTuong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoiTuongRepository extends JpaRepository<DoiTuong, Integer> {}