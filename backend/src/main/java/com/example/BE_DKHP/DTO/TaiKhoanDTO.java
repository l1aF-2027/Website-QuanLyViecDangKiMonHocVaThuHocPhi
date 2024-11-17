package com.example.BE_DKHP.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaiKhoanDTO {
    private int idTaiKhoan;
    private int idSinhVien;
    private String tenTaiKhoan;
    private String matKhau;
    private String vaiTro;
}
