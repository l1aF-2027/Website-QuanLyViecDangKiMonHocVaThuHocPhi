package com.example.BE_DKHP.Repository;


import com.example.BE_DKHP.Entities.ThuHocPhi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ThuHocPhiRepository extends JpaRepository<ThuHocPhi, Integer> {
    @Query("SELECT t FROM ThuHocPhi t WHERE t.hocKy.idHocKy = :idHocKy")
    List<ThuHocPhi> findByIDHocKy(Integer idHocKy);
}