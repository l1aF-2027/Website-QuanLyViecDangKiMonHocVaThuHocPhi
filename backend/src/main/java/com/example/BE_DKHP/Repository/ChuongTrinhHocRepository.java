package com.example.BE_DKHP.Repository;

import com.example.BE_DKHP.Entities.ChuongTrinhHoc;
import com.example.BE_DKHP.Entities.HocKy;
import com.example.BE_DKHP.Entities.MonHoc;
import com.example.BE_DKHP.Entities.NganhHoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChuongTrinhHocRepository extends JpaRepository<ChuongTrinhHoc, Integer> {
    @Query("SELECT ch.monHoc FROM ChuongTrinhHoc ch WHERE ch.nganhHoc = :nganhHoc AND ch.hocKy = :hocKy")
    List<MonHoc> findMonHocByNganhHocAndHocKy(NganhHoc nganhHoc, HocKy hocKy);
}
