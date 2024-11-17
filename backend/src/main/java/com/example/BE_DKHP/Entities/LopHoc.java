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
public class LopHoc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idLopHoc;

    @ManyToOne
    @JoinColumn(name = "id_chuong_trinh_hoc")
    private ChuongTrinhHoc chuongTrinhHoc;
    private String tenLop;
    private int siSoToiDa;
    private int siSoHienTai;

}