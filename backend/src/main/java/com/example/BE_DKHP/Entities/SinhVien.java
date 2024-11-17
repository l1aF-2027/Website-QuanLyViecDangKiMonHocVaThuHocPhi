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
public class SinhVien {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idSinhVien;
    private String hoTen;
    private Date ngaySinh;
    private String gioiTinh;

    @ManyToOne
    @JoinColumn(name = "id_que_quan")
    private QueQuan queQuan;

    @ManyToOne
    @JoinColumn(name = "id_doi_tuong")
    private DoiTuong doiTuong;

    @ManyToOne
    @JoinColumn(name = "id_nganh_hoc")
    private NganhHoc nganhHoc;
}