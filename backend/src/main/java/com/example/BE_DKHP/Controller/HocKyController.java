package com.example.BE_DKHP.Controller;

import com.example.BE_DKHP.Entities.HocKy;
import com.example.BE_DKHP.Service.HocKyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class HocKyController {

    @Autowired
    private HocKyService hocKyService;

    @GetMapping("getAllHocKy")
    public List<HocKy> getAllHocKy() {
        return hocKyService.findAll();
    }

    @GetMapping("getHocKyById/{id}")
    public ResponseEntity<HocKy> getHocKyById(@PathVariable Integer id) {
        HocKy hocKy = hocKyService.findOne(id);
        if (hocKy == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(hocKy);
    }

    @PostMapping("createHocKy")
    public ResponseEntity<HocKy> createHocKy(@RequestBody HocKy hocKy) {
        HocKy savedHocKy = hocKyService.save(hocKy);
        return ResponseEntity.ok().body(savedHocKy);
    }

    @PutMapping("updateHocKy")
    public ResponseEntity<HocKy> updateHocKy(@RequestBody HocKy hocKy) {
        HocKy existingHocKy = hocKyService.findOne(hocKy.getIdHocKy());
        if (existingHocKy == null) {
            return ResponseEntity.notFound().build();
        }
        HocKy updatedHocKy = hocKyService.update(hocKy);
        return ResponseEntity.ok().body(updatedHocKy);
    }

    @DeleteMapping("deleteHocKy/{id}")
    public ResponseEntity<Void> deleteHocKy(@PathVariable Integer id) {
        HocKy existingHocKy = hocKyService.findOne(id);
        if (existingHocKy == null) {
            return ResponseEntity.notFound().build();
        }
        hocKyService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
