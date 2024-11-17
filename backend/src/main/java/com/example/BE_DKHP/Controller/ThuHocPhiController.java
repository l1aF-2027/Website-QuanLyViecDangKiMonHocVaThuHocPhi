package com.example.BE_DKHP.Controller;

import com.example.BE_DKHP.DTO.ThuHocPhiDTO;
import com.example.BE_DKHP.Entities.ThuHocPhi;
import com.example.BE_DKHP.Service.ThuHocPhiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/thuhocphi")
public class ThuHocPhiController {

    @Autowired
    private ThuHocPhiService thuHocPhiService;

    @GetMapping
    public List<ThuHocPhi> getAllThuHocPhi() {
        return thuHocPhiService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ThuHocPhi> getThuHocPhiById(@PathVariable Integer id) {
        ThuHocPhi thuHocPhi = thuHocPhiService.findOne(id);
        if (thuHocPhi == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(thuHocPhi);
    }

    @PostMapping
    public ResponseEntity<ThuHocPhi> createThuHocPhi(@RequestBody ThuHocPhiDTO thuHocPhiDTO) {
        ThuHocPhi savedThuHocPhi = thuHocPhiService.save(thuHocPhiDTO);
        return ResponseEntity.ok().body(savedThuHocPhi);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ThuHocPhi> updateThuHocPhi(@PathVariable Integer id, @RequestBody ThuHocPhiDTO thuHocPhiDTO) {
        ThuHocPhi existingThuHocPhi = thuHocPhiService.findOne(id);
        if (existingThuHocPhi == null) {
            return ResponseEntity.notFound().build();
        }
        thuHocPhiDTO.setSoPhieuThuHp(id);
        ThuHocPhi updatedThuHocPhi = thuHocPhiService.update(thuHocPhiDTO);
        return ResponseEntity.ok().body(updatedThuHocPhi);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteThuHocPhi(@PathVariable Integer id) {
        ThuHocPhi existingThuHocPhi = thuHocPhiService.findOne(id);
        if (existingThuHocPhi == null) {
            return ResponseEntity.notFound().build();
        }
        thuHocPhiService.delete(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/thongke/{idHocKy}")
    public ResponseEntity<List<ThuHocPhi>> thongKeHocPhi(@PathVariable int idHocKy) {
        List<ThuHocPhi> danhSachHocPhi = thuHocPhiService.findByHocKy(idHocKy);
        return ResponseEntity.ok(danhSachHocPhi);
    }
}
