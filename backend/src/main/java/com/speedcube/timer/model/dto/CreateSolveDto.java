package com.speedcube.timer.model.dto;

import com.speedcube.timer.model.enums.Penalty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateSolveDto {
    @NotBlank
    private String scramble;

    @NotNull
    private Integer totalTimeMillis;

    private Penalty penalty;
    private Integer crossTimeMillis;
    private Integer f2lTimeMillis;
    private Integer ollTimeMillis;
    private Integer pllTimeMillis;
}
