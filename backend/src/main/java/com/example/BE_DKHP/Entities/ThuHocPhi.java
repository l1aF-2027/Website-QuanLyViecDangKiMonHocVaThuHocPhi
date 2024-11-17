package com.example.BE_DKHP.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ThuHocPhi {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int soPhieuThuHp;

    @ManyToOne
    @JoinColumn(name = "id_sinh_vien")
    private SinhVien sinhVien;
    private Date ngayLapPhieuThuHp;
    private int soTienDk;
    private int soTienDong;
    private int soTienConLai;

    @ManyToOne
    @JoinColumn(name = "id_hoc_ky")
    private HocKy hocKy;
}