package com.example.BE_DKHP.Repository;



import com.example.BE_DKHP.Entities.DangKy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DangKyRepository extends JpaRepository<DangKy, Integer> {}
