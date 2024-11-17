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
public class TaiKhoan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idTk;

    @ManyToOne
    @JoinColumn(name = "id_sinh_vien")
    private SinhVien sinhVien;
    private String tenTaiKhoan;
    private String matKhau;
    private String vaiTro;
}