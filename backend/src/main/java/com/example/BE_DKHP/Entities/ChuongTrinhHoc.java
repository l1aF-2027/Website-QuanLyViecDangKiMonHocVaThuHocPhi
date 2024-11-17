package com.example.BE_DKHP.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ChuongTrinhHoc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idChuongTrinhHoc;

    @ManyToOne
    @JoinColumn(name = "id_nganh_hoc")
    private NganhHoc nganhHoc;

    @ManyToOne
    @JoinColumn(name = "id_hoc_ky")
    private HocKy hocKy;

    @ManyToOne
    @JoinColumn(name = "id_mon_hoc")
    private MonHoc monHoc;
    private String ghiChu;
}