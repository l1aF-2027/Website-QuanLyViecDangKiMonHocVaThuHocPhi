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
public class DoiTuong {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idDoiTuong;
    private String tenLoaiDoiTuong;
    private int tileGiamHocPhi;
}