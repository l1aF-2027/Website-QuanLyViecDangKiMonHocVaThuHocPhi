package com.example.BE_DKHP.Repository;

import com.example.BE_DKHP.Entities.HocKy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HocKyRepository extends JpaRepository<HocKy, Integer> {}
