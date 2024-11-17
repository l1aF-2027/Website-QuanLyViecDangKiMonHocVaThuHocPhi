package com.example.BE_DKHP.Repository;

import com.example.BE_DKHP.Entities.ThamSo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThamSoRepository extends JpaRepository<ThamSo, Integer> {}
