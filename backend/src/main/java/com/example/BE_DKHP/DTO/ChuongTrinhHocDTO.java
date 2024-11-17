package com.example.BE_DKHP.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChuongTrinhHocDTO {
    private int idChuongTrinhHoc;
    private int idNganhHoc;
    private int idHocKy;
    private int idMonHoc;
    private String ghiChu;
}
