package com.example.BE_DKHP.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SinhVienDTO {
    private int idSinhVien;
    private String hoTen;
    private Date ngaySinh;
    private String gioiTinh;
    private int idQueQuan;
    private int idDoiTuong;
    private int idNganhHoc;

}
