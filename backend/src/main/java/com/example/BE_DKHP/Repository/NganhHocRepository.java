package com.example.BE_DKHP.Repository;


import com.example.BE_DKHP.Entities.NganhHoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NganhHocRepository extends JpaRepository<NganhHoc, Integer> {}