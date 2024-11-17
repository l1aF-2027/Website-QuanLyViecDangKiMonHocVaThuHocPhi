package com.example.BE_DKHP.Controller;

import com.example.BE_DKHP.DTO.SinhVienDTO;
import com.example.BE_DKHP.DTO.ThongTinDangKyDTO;
import com.example.BE_DKHP.DTO.TuitionCalculationDTO;
import com.example.BE_DKHP.Entities.SinhVien;
import com.example.BE_DKHP.Service.SinhVienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/sinhvien")
public class SinhVienController {

    @Autowired
    private SinhVienService sinhVienService;

    @GetMapping
    public List<SinhVien> getAllSinhVien() {
        return sinhVienService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SinhVien> getSinhVienById(@PathVariable Integer id) {
        SinhVien sinhVien = sinhVienService.findOne(id);
        if (sinhVien == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(sinhVien);
    }

    @PostMapping
    public ResponseEntity<SinhVien> createSinhVien(@RequestBody SinhVienDTO sinhVienDTO) {
        SinhVien savedSinhVien = sinhVienService.save(sinhVienDTO);
        return ResponseEntity.ok().body(savedSinhVien);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SinhVien> updateSinhVien(@PathVariable Integer id, @RequestBody SinhVienDTO sinhVienDTO) {
        SinhVien existingSinhVien = sinhVienService.findOne(id);
        if (existingSinhVien == null) {
            return ResponseEntity.notFound().build();
        }
        sinhVienDTO.setIdSinhVien(id);
        SinhVien updatedSinhVien = sinhVienService.update(sinhVienDTO);
        return ResponseEntity.ok().body(updatedSinhVien);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSinhVien(@PathVariable Integer id) {
        SinhVien existingSinhVien = sinhVienService.findOne(id);
        if (existingSinhVien == null) {
            return ResponseEntity.notFound().build();
        }
        sinhVienService.delete(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/getDanhSachDK/{idSinhVien}/{idHocKy}")
    public ResponseEntity<List<ThongTinDangKyDTO>> findRegistrationInfoByStudentId(@PathVariable Integer idSinhVien,
                                                                                   @PathVariable Integer idHocKy) {
        List<ThongTinDangKyDTO> thongTinDangKyDTO = sinhVienService.findRegistrationInfoByStudentId(idSinhVien, idHocKy);
        if (thongTinDangKyDTO != null) {
            return ResponseEntity.ok(thongTinDangKyDTO);
        }
        return ResponseEntity.notFound().build();
    }
    @GetMapping("/tongtienhoc/{idSinhVien}/{idHocKy}")
    public ResponseEntity<TuitionCalculationDTO> getTotalTuitionByStudentId(@PathVariable Integer idSinhVien,
                                                                            @PathVariable Integer idHocKy) {
        TuitionCalculationDTO totalTuition = sinhVienService.calculateTotalTuition(idSinhVien, idHocKy);
        if (totalTuition != null) {
            return new ResponseEntity<>(totalTuition, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/thongKeSinhVien")
    public List<SinhVien> getStudentsByClass(@RequestParam Integer idLopHoc) {
        return sinhVienService.findByLopHoc(idLopHoc);
    }
}
