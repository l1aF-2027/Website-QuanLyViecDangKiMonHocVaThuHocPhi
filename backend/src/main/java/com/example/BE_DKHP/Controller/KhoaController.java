package com.example.BE_DKHP.Controller;

import com.example.BE_DKHP.Entities.Khoa;
import com.example.BE_DKHP.Service.KhoaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin
public class KhoaController {
    @Autowired
    private KhoaService khoaService;

    @GetMapping("getAllKhoa")
    public List<Khoa> getAllKhoa() {
        return khoaService.getAllKhoa();
    }

    @GetMapping("getKhoaById/{id}")
    public Khoa getKhoaById(@PathVariable int id) {
        return khoaService.getKhoaById(id);
    }

    @PostMapping("createKhoa")
    public Khoa saveKhoa(@RequestBody Khoa khoa) {
        return khoaService.addKhoa(khoa);
    }

    @PutMapping("updateKhoa")
    public Khoa updateKhoa(@RequestBody Khoa khoa) {
        return khoaService.updateKhoa(khoa);
    }

    @DeleteMapping("deleteKhoa/{id}")
    public void deleteKhoa(@PathVariable int id) {
        khoaService.deleteKhoa(id);
    }
}
