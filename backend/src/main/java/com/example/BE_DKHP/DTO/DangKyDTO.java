package com.example.BE_DKHP.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DangKyDTO {
    private int soPhieuDK;
    private int idSinhVien;
    private Date ngayLapPhieuDK;
    private int idLopHoc;
}
