package com.example.BE_DKHP.Controller;

import com.example.BE_DKHP.DTO.MonHocDTO;
import com.example.BE_DKHP.Entities.MonHoc;
import com.example.BE_DKHP.Service.MonHocService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/monhoc")
public class MonHocController {

    @Autowired
    private MonHocService monHocService;

    @GetMapping
    public List<MonHoc> getAllMonHoc() {
        return monHocService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MonHoc> getMonHocById(@PathVariable Integer id) {
        MonHoc monHoc = monHocService.findOne(id);
        if (monHoc == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(monHoc);
    }

    @PostMapping
    public ResponseEntity<MonHoc> createMonHoc(@RequestBody MonHocDTO monHocDTO) {
        MonHoc savedMonHoc = monHocService.save(monHocDTO);
        return ResponseEntity.ok().body(savedMonHoc);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MonHoc> updateMonHoc(@PathVariable Integer id, @RequestBody MonHocDTO monHocDTO) {
        MonHoc existingMonHoc = monHocService.findOne(id);
        if (existingMonHoc == null) {
            return ResponseEntity.notFound().build();
        }
        monHocDTO.setIdMonHoc(id);
        MonHoc updatedMonHoc = monHocService.update(monHocDTO);
        return ResponseEntity.ok().body(updatedMonHoc);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMonHoc(@PathVariable Integer id) {
        MonHoc existingMonHoc = monHocService.findOne(id);
        if (existingMonHoc == null) {
            return ResponseEntity.notFound().build();
        }
        monHocService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
