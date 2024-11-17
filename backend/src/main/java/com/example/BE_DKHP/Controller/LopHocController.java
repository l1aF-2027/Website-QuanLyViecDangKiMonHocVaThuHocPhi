package com.example.BE_DKHP.Controller;

import com.example.BE_DKHP.DTO.LopHocDTO;
import com.example.BE_DKHP.Entities.LopHoc;
import com.example.BE_DKHP.Service.LopHocService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/lophoc")
public class LopHocController {

    @Autowired
    private LopHocService lopHocService;

    @GetMapping
    public List<LopHoc> getAllLopHoc() {
        return lopHocService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<LopHoc> getLopHocById(@PathVariable Integer id) {
        LopHoc lopHoc = lopHocService.findOne(id);
        if (lopHoc == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(lopHoc);
    }

    @PostMapping
    public ResponseEntity<LopHoc> createLopHoc(@RequestBody LopHocDTO lopHocDTO) {
        LopHoc savedLopHoc = lopHocService.save(lopHocDTO);
        return ResponseEntity.ok().body(savedLopHoc);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LopHoc> updateLopHoc(@PathVariable Integer id, @RequestBody LopHocDTO lopHocDTO) {
        LopHoc existingLopHoc = lopHocService.findOne(id);
        if (existingLopHoc == null) {
            return ResponseEntity.notFound().build();
        }
        lopHocDTO.setIdLopHoc(id);
        LopHoc updatedLopHoc = lopHocService.update(lopHocDTO);
        return ResponseEntity.ok().body(updatedLopHoc);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLopHoc(@PathVariable Integer id) {
        LopHoc existingLopHoc = lopHocService.findOne(id);
        if (existingLopHoc == null) {
            return ResponseEntity.notFound().build();
        }
        lopHocService.delete(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/findByNganhHocHocKyMonHoc")
    public ResponseEntity<List<LopHoc>> findByNganhHocHocKyMonHoc(
            @RequestParam Integer idNganhHoc,
            @RequestParam Integer idHocKy,
            @RequestParam Integer idMonHoc
    ) {
        List<LopHoc> lopHocs = lopHocService.findByNganhHocHocKyMonHoc(idNganhHoc, idHocKy, idMonHoc);
        if (lopHocs != null && !lopHocs.isEmpty()) {
            return ResponseEntity.ok(lopHocs);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/thongKeLopHoc")
    public List<LopHoc> getClassesBySemester(@RequestParam Integer idHocKy) {
        return lopHocService.findByHocKy(idHocKy);
    }
}
