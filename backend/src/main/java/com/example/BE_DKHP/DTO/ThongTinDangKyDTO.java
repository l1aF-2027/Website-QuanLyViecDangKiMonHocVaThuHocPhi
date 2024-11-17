package com.example.BE_DKHP.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ThongTinDangKyDTO {
    private int soPhieuDK;
    private String tenLop;
    private Integer soTinChi;
    private String tenMonHoc;
    private Integer soTienHocPhi;
}
