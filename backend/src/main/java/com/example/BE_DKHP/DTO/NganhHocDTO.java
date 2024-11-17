package com.example.BE_DKHP.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NganhHocDTO {
    private int idNganhHoc;
    private String tenNganhHoc;
    private int idKhoa;
}
