package com.speedcube.timer.model.dto;

import com.speedcube.timer.model.enums.Penalty;
import lombok.Builder;
import lombok.Data;
import java.time.Instant;
import java.util.UUID;

@Data
@Builder
public class SolveDto {
    private UUID id;
    private String scramble;
    private Integer totalTimeMillis;
    private Penalty penalty;
    private Integer crossTimeMillis;
    private Integer f2lTimeMillis;
    private Integer ollTimeMillis;
    private Integer pllTimeMillis;
    private Instant timestamp;
}
