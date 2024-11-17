package com.example.BE_DKHP.Controller;

import com.example.BE_DKHP.Entities.QueQuan;
import com.example.BE_DKHP.Service.QueQuanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/quequan")
public class QueQuanController {

    @Autowired
    private QueQuanService queQuanService;

    @GetMapping
    public List<QueQuan> getAllQueQuan() {
        return queQuanService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<QueQuan> getQueQuanById(@PathVariable Integer id) {
        QueQuan queQuan = queQuanService.findOne(id);
        if (queQuan == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(queQuan);
    }

    @PostMapping
    public ResponseEntity<QueQuan> createQueQuan(@RequestBody QueQuan queQuan) {
        QueQuan savedQueQuan = queQuanService.save(queQuan);
        return ResponseEntity.ok().body(savedQueQuan);
    }

    @PutMapping("/{id}")
    public ResponseEntity<QueQuan> updateQueQuan(@PathVariable Integer id, @RequestBody QueQuan queQuan) {
        QueQuan existingQueQuan = queQuanService.findOne(id);
        if (existingQueQuan == null) {
            return ResponseEntity.notFound().build();
        }
        queQuan.setIdQueQuan(id);
        QueQuan updatedQueQuan = queQuanService.update(queQuan);
        return ResponseEntity.ok().body(updatedQueQuan);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQueQuan(@PathVariable Integer id) {
        QueQuan existingQueQuan = queQuanService.findOne(id);
        if (existingQueQuan == null) {
            return ResponseEntity.notFound().build();
        }
        queQuanService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
