package com.example.BE_DKHP.Controller;

import com.example.BE_DKHP.DTO.DangKyDTO;
import com.example.BE_DKHP.Entities.DangKy;
import com.example.BE_DKHP.Service.DangKyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/dangky")
public class DangKyController {

    @Autowired
    private DangKyService dangKyService;

    @GetMapping
    public ResponseEntity<List<DangKy>> findAll() {
        return ResponseEntity.ok(dangKyService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DangKy> findOne(@PathVariable Integer id) {
        DangKy dangKy = dangKyService.findOne(id);
        if (dangKy != null) {
            return ResponseEntity.ok(dangKy);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<DangKy> save(@RequestBody DangKyDTO dangKyDTO) throws Exception {
        DangKy dangKy = dangKyService.save(dangKyDTO);
        if (dangKy != null) {
            return ResponseEntity.ok(dangKy);
        }
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        dangKyService.delete(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping
    public ResponseEntity<DangKy> update(@RequestBody DangKyDTO dangKyDTO) throws Exception {
        DangKy dangKy = dangKyService.update(dangKyDTO);
        if (dangKy != null) {
            return ResponseEntity.ok(dangKy);
        }
        return ResponseEntity.badRequest().build();
    }
}
