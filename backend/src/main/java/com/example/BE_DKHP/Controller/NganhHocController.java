package com.example.BE_DKHP.Controller;

import com.example.BE_DKHP.DTO.NganhHocDTO;
import com.example.BE_DKHP.Entities.NganhHoc;
import com.example.BE_DKHP.Service.NganhHocService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/nganhhoc")
public class NganhHocController {

    @Autowired
    private NganhHocService nganhHocService;

    @GetMapping
    public List<NganhHoc> getAllNganhHoc() {
        return nganhHocService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<NganhHoc> getNganhHocById(@PathVariable Integer id) {
        NganhHoc nganhHoc = nganhHocService.findOne(id);
        if (nganhHoc == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(nganhHoc);
    }

    @PostMapping
    public ResponseEntity<NganhHoc> createNganhHoc(@RequestBody NganhHocDTO nganhHocDTO) {
        NganhHoc savedNganhHoc = nganhHocService.save(nganhHocDTO);
        return ResponseEntity.ok().body(savedNganhHoc);
    }

    @PutMapping("/{id}")
    public ResponseEntity<NganhHoc> updateNganhHoc(@PathVariable Integer id, @RequestBody NganhHocDTO nganhHocDTO) {
        NganhHoc existingNganhHoc = nganhHocService.findOne(id);
        if (existingNganhHoc == null) {
            return ResponseEntity.notFound().build();
        }
        nganhHocDTO.setIdNganhHoc(id);
        NganhHoc updatedNganhHoc = nganhHocService.update(nganhHocDTO);
        return ResponseEntity.ok().body(updatedNganhHoc);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNganhHoc(@PathVariable Integer id) {
        NganhHoc existingNganhHoc = nganhHocService.findOne(id);
        if (existingNganhHoc == null) {
            return ResponseEntity.notFound().build();
        }
        nganhHocService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
