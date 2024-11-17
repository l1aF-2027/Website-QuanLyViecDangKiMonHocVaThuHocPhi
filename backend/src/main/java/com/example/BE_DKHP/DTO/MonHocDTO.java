package com.example.BE_DKHP.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MonHocDTO {
    private int idMonHoc;
    private String tenMonHoc;
    private int idLoaiMon;
    private int soTiet;
    private int tinChi;
}
