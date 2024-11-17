package com.example.BE_DKHP.Repository;

import com.example.BE_DKHP.Entities.Khoa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KhoaRepository extends JpaRepository<Khoa, Integer> {}
