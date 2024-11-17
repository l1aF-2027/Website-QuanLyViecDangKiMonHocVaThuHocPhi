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
public class DangKy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int soPhieuDk;

    @ManyToOne
    @JoinColumn(name = "idSinhVien")
    private SinhVien sinhVien;
    private Date ngayLapPhieuDk;

    @ManyToOne
    @JoinColumn(name = "idLopHoc")
    private LopHoc lopHoc;

}