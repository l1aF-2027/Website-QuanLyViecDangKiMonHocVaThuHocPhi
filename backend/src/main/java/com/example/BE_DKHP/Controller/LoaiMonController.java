package com.example.BE_DKHP.Controller;

import com.example.BE_DKHP.Entities.LoaiMon;
import com.example.BE_DKHP.Service.LoaiMonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/loaimon")
public class LoaiMonController {

    @Autowired
    private LoaiMonService loaiMonService;

    @GetMapping
    public List<LoaiMon> getAllLoaiMon() {
        return loaiMonService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LoaiMon> getLoaiMonById(@PathVariable Integer id) {
        LoaiMon loaiMon = loaiMonService.findOne(id);
        if (loaiMon == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(loaiMon);
    }

    @PostMapping
    public ResponseEntity<LoaiMon> createLoaiMon(@RequestBody LoaiMon loaiMon) {
        LoaiMon savedLoaiMon = loaiMonService.save(loaiMon);
        return ResponseEntity.ok().body(savedLoaiMon);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LoaiMon> updateLoaiMon(@PathVariable Integer id, @RequestBody LoaiMon loaiMon) {
        LoaiMon existingLoaiMon = loaiMonService.findOne(id);
        if (existingLoaiMon == null) {
            return ResponseEntity.notFound().build();
        }
        loaiMon.setIdLoaiMon(id);
        LoaiMon updatedLoaiMon = loaiMonService.update(loaiMon);
        return ResponseEntity.ok().body(updatedLoaiMon);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLoaiMon(@PathVariable Integer id) {
        LoaiMon existingLoaiMon = loaiMonService.findOne(id);
        if (existingLoaiMon == null) {
            return ResponseEntity.notFound().build();
        }
        loaiMonService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
