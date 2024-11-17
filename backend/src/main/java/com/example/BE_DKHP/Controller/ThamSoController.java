package com.example.BE_DKHP.Controller;

import com.example.BE_DKHP.Entities.ThamSo;
import com.example.BE_DKHP.Service.ThamSoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/thamso")
public class ThamSoController {

    @Autowired
    private ThamSoService thamSoService;

    @GetMapping
    public List<ThamSo> getAllThamSo() {
        return thamSoService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ThamSo> getThamSoById(@PathVariable Integer id) {
        ThamSo thamSo = thamSoService.findOne(id);
        if (thamSo == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(thamSo);
    }

    @PostMapping
    public ResponseEntity<ThamSo> createThamSo(@RequestBody ThamSo thamSo) {
        ThamSo savedThamSo = thamSoService.save(thamSo);
        return ResponseEntity.ok().body(savedThamSo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ThamSo> updateThamSo(@PathVariable Integer id, @RequestBody ThamSo thamSo) {
        ThamSo existingThamSo = thamSoService.findOne(id);
        if (existingThamSo == null) {
            return ResponseEntity.notFound().build();
        }
        thamSo.setId(id);
        ThamSo updatedThamSo = thamSoService.update(thamSo);
        return ResponseEntity.ok().body(updatedThamSo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteThamSo(@PathVariable Integer id) {
        ThamSo existingThamSo = thamSoService.findOne(id);
        if (existingThamSo == null) {
            return ResponseEntity.notFound().build();
        }
        thamSoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
