package com.example.BE_DKHP.Controller;

import com.example.BE_DKHP.Entities.DoiTuong;
import com.example.BE_DKHP.Service.DoiTuongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/doituong")
public class DoiTuongController {

    @Autowired
    private DoiTuongService doiTuongService;

    @GetMapping
    public List<DoiTuong> getAllDoiTuong() {
        return doiTuongService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DoiTuong> getDoiTuongById(@PathVariable Integer id) {
        DoiTuong doiTuong = doiTuongService.findOne(id);
        if (doiTuong == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(doiTuong);
    }

    @PostMapping
    public ResponseEntity<DoiTuong> createDoiTuong(@RequestBody DoiTuong doiTuong) {
        DoiTuong savedDoiTuong = doiTuongService.save(doiTuong);
        return ResponseEntity.ok().body(savedDoiTuong);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DoiTuong> updateDoiTuong(@PathVariable Integer id, @RequestBody DoiTuong doiTuong) {
        DoiTuong existingDoiTuong = doiTuongService.findOne(id);
        if (existingDoiTuong == null) {
            return ResponseEntity.notFound().build();
        }
        doiTuong.setIdDoiTuong(id);
        DoiTuong updatedDoiTuong = doiTuongService.update(doiTuong);
        return ResponseEntity.ok().body(updatedDoiTuong);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDoiTuong(@PathVariable Integer id) {
        DoiTuong existingDoiTuong = doiTuongService.findOne(id);
        if (existingDoiTuong == null) {
            return ResponseEntity.notFound().build();
        }
        doiTuongService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
