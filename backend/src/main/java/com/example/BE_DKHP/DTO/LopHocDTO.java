package com.example.BE_DKHP.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LopHocDTO {
    private int idLopHoc;
    private int idChuongTrinhHoc;
    private String tenLop;
    private int siSoToiDa;
    private int siSoHienTai;
}
