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
public class NganhHoc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idNganhHoc;
    private String tenNganhHoc;

    @ManyToOne
    @JoinColumn(name = "id_khoa")
    private Khoa khoa;
}