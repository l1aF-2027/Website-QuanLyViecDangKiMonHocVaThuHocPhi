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
public class MonHoc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idMonHoc;
    private String tenMonHoc;

    @ManyToOne
    @JoinColumn(name = "id_loai_mon")
    private LoaiMon loaiMon;
    private int soTiet;
    private int tinChi;
}