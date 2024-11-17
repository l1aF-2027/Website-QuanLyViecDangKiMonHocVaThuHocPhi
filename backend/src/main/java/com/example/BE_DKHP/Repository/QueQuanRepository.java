package com.example.BE_DKHP.Repository;


import com.example.BE_DKHP.Entities.QueQuan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QueQuanRepository extends JpaRepository<QueQuan, Integer> {}
