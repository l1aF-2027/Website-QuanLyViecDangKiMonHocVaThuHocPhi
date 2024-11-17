package com.example.BE_DKHP.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ThuHocPhiDTO {
    private int soPhieuThuHp;
    private int idSinhVien;
    private Date ngayLapPhieuThuHp;
    private int soTienDk;
    private int soTienDong;
    private int soTienConLai;
    private int idHocKy;
}
