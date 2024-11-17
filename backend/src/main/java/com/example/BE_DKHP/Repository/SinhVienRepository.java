package com.example.BE_DKHP.Repository;

import com.example.BE_DKHP.DTO.ThongTinDangKyDTO;
import com.example.BE_DKHP.DTO.TuitionCalculationDTO;
import com.example.BE_DKHP.Entities.SinhVien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SinhVienRepository extends JpaRepository<SinhVien, Integer> {
    @Query("SELECT new com.example.BE_DKHP.DTO.ThongTinDangKyDTO(dk.soPhieuDk, lop.tenLop, mon.tinChi, mon.tenMonHoc, " +
            "CASE " +
            "WHEN lm.tenLoaiMon = 'LT' THEN mon.tinChi * ts.tienHocMoiTinChiLyThuyet " +
            "WHEN lm.tenLoaiMon = 'TH' THEN mon.tinChi * ts.tienHocMoiTinChiThucHanh " +
            "END) " +
            "FROM DangKy dk " +
            "JOIN dk.lopHoc lop " +
            "JOIN lop.chuongTrinhHoc cth " +
            "JOIN cth.monHoc mon " +
            "JOIN mon.loaiMon lm " +
            "JOIN ThamSo ts ON 1=1 " +
            "WHERE dk.sinhVien.idSinhVien = :idSinhVien AND cth.hocKy.idHocKy = :idHocKy")
    List<ThongTinDangKyDTO> findRegistrationInfoByStudentId(Integer idSinhVien, Integer idHocKy);


    @Query("SELECT new com.example.BE_DKHP.DTO.TuitionCalculationDTO(" +
            "COALESCE(SUM(mon.tinChi * ts.tienHocMoiTinChiLyThuyet), 0), " +
            "COALESCE(SUM(mon.tinChi * ts.tienHocMoiTinChiLyThuyet * dt.tileGiamHocPhi / 100), 0), " +
            "COALESCE(SUM(mon.tinChi * ts.tienHocMoiTinChiLyThuyet * (1 - dt.tileGiamHocPhi / 100.0)), 0)) " +
            "FROM DangKy dk " +
            "JOIN dk.lopHoc lop " +
            "JOIN lop.chuongTrinhHoc cth " +
            "JOIN cth.monHoc mon " +
            "JOIN ThamSo ts ON 1=1" +
            "JOIN dk.sinhVien sv " +
            "JOIN sv.doiTuong dt " +
            "WHERE dk.sinhVien.idSinhVien = :idSinhVien " +
            "AND cth.hocKy.idHocKy = :idHocKy")
    TuitionCalculationDTO calculateTotalTuition( Integer idSinhVien, Integer idHocKy);

    @Query("SELECT sv FROM SinhVien sv WHERE sv.idSinhVien IN (SELECT dk.sinhVien.idSinhVien FROM DangKy dk WHERE dk.lopHoc.idLopHoc = :idLopHoc)")
    List<SinhVien> findByLopHocId(Integer idLopHoc);

}