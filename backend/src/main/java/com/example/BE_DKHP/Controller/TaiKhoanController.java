package com.example.BE_DKHP.Controller;

import com.example.BE_DKHP.DTO.TaiKhoanDTO;
import com.example.BE_DKHP.Entities.TaiKhoan;
import com.example.BE_DKHP.Service.TaiKhoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/taikhoan")
public class TaiKhoanController {

    @Autowired
    private TaiKhoanService taiKhoanService;

    @GetMapping
    public List<TaiKhoan> getAllTaiKhoan() {
        return taiKhoanService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaiKhoan> getTaiKhoanById(@PathVariable Integer id) {
        TaiKhoan taiKhoan = taiKhoanService.findOne(id);
        if (taiKhoan == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(taiKhoan);
    }

    @PostMapping
    public ResponseEntity<TaiKhoan> createTaiKhoan(@RequestBody TaiKhoanDTO taiKhoanDTO) {
        TaiKhoan savedTaiKhoan = taiKhoanService.save(taiKhoanDTO);
        return ResponseEntity.ok().body(savedTaiKhoan);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaiKhoan> updateTaiKhoan(@PathVariable Integer id, @RequestBody TaiKhoanDTO taiKhoanDTO) {
        TaiKhoan existingTaiKhoan = taiKhoanService.findOne(id);
        if (existingTaiKhoan == null) {
            return ResponseEntity.notFound().build();
        }
        taiKhoanDTO.setIdTaiKhoan(id);
        TaiKhoan updatedTaiKhoan = taiKhoanService.update(taiKhoanDTO);
        return ResponseEntity.ok().body(updatedTaiKhoan);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTaiKhoan(@PathVariable Integer id) {
        TaiKhoan existingTaiKhoan = taiKhoanService.findOne(id);
        if (existingTaiKhoan == null) {
            return ResponseEntity.notFound().build();
        }
        taiKhoanService.delete(id);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody TaiKhoan taiKhoan) {
        String tenTaiKhoan = taiKhoan.getTenTaiKhoan();
        String matKhau = taiKhoan.getMatKhau();

        TaiKhoan loggedInTaiKhoan = taiKhoanService.checkLogin(tenTaiKhoan, matKhau);

        if (loggedInTaiKhoan != null) {
            return new ResponseEntity<>(loggedInTaiKhoan, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Sai tên tài khoản hoặc mật khẩu!", HttpStatus.UNAUTHORIZED);
        }
    }
}
