package com.example.BE_DKHP.Repository;

import com.example.BE_DKHP.Entities.TaiKhoan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TaiKhoanRepository extends JpaRepository<TaiKhoan, Integer> {
    @Query("SELECT tk FROM TaiKhoan tk WHERE tk.tenTaiKhoan = :tenTaiKhoan AND tk.matKhau = :matKhau")
    TaiKhoan findByTenTaiKhoanAndMatKhau(String tenTaiKhoan, String matKhau);
}