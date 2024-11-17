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
@Table(name = "LoaiMon")
public class LoaiMon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idLoaiMon;
    private String tenLoaiMon;
}