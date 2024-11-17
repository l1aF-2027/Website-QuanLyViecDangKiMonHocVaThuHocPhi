package com.example.BE_DKHP.Repository;

import com.example.BE_DKHP.Entities.LopHoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LopHocRepository extends JpaRepository<LopHoc, Integer> {
    @Query("SELECT lh FROM LopHoc lh " +
            "WHERE lh.chuongTrinhHoc.nganhHoc.idNganhHoc = :idNganhHoc " +
            "AND lh.chuongTrinhHoc.hocKy.idHocKy = :idHocKy " +
            "AND lh.chuongTrinhHoc.monHoc.idMonHoc = :idMonHoc")
    List<LopHoc> findByNganhHocHocKyMonHoc(Integer idNganhHoc, Integer idHocKy, Integer idMonHoc);

    @Query("SELECT lh FROM LopHoc lh WHERE lh.chuongTrinhHoc.hocKy.idHocKy = :idHocKy")
    List<LopHoc> dsLopHoc(Integer idHocKy);
}
