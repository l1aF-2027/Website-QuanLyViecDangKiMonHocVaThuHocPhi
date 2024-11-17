package com.example.BE_DKHP.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TuitionCalculationDTO {
    private double totalTuition;
    private double discountAmount;
    private double finalTuition;
}
