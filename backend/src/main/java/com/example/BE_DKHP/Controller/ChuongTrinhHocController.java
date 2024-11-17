package com.example.BE_DKHP.Controller;

import com.example.BE_DKHP.DTO.ChuongTrinhHocDTO;
import com.example.BE_DKHP.Entities.ChuongTrinhHoc;
import com.example.BE_DKHP.Entities.MonHoc;
import com.example.BE_DKHP.Service.ChuongTrinhHocService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/chuongtrinhhoc")
public class ChuongTrinhHocController {

    @Autowired
    private ChuongTrinhHocService chuongTrinhHocService;

    @GetMapping
    public ResponseEntity<List<ChuongTrinhHoc>> findAll() {
        return ResponseEntity.ok(chuongTrinhHocService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChuongTrinhHoc> findOne(@PathVariable Integer id) {
        ChuongTrinhHoc chuongTrinhHoc = chuongTrinhHocService.findOne(id);
        if (chuongTrinhHoc != null) {
            return ResponseEntity.ok(chuongTrinhHoc);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<ChuongTrinhHoc> save(@RequestBody ChuongTrinhHocDTO chuongTrinhHocDTO) {
        ChuongTrinhHoc chuongTrinhHoc = chuongTrinhHocService.save(chuongTrinhHocDTO);
        if (chuongTrinhHoc != null) {
            return ResponseEntity.ok(chuongTrinhHoc);
        }
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        chuongTrinhHocService.delete(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping
    public ResponseEntity<ChuongTrinhHoc> update(@RequestBody ChuongTrinhHocDTO chuongTrinhHocDTO) {
        ChuongTrinhHoc chuongTrinhHoc = chuongTrinhHocService.update(chuongTrinhHocDTO);
        if (chuongTrinhHoc != null) {
            return ResponseEntity.ok(chuongTrinhHoc);
        }
        return ResponseEntity.badRequest().build();
    }
    @GetMapping("/monhoc")
    public ResponseEntity<List<MonHoc>> findMonHocByNganhHocAndHocKy(
            @RequestParam Integer idNganhHoc,
            @RequestParam Integer idHocKy
    ) {
        List<MonHoc> monHocs = chuongTrinhHocService.findMonHocByNganhHocAndHocKy(idNganhHoc, idHocKy);
        if (monHocs != null && !monHocs.isEmpty()) {
            return ResponseEntity.ok(monHocs);
        }
        return ResponseEntity.notFound().build();
    }
}
