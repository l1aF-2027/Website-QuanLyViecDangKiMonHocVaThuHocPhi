package com.example.BE_DKHP.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class HocKy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idHocKy;
    private String tenHocKy;
    private int namHoc;
}