package com.speedcube.timer.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StatsDto {
    private Integer totalSolves;
    private Integer bestTime;
    private Integer currentAo5;
    private Integer currentAo12;
    private Integer currentAo50;
    private Integer currentAo100;
    private Integer sessionMean;
    private Double standardDeviation;
    
    // Phase stats
    private Integer avgCrossTime;
    private Integer avgF2lTime;
    private Integer avgOllTime;
    private Integer avgPllTime;
    
    private Double crossPercentage;
    private Double f2lPercentage;
    private Double ollPercentage;
    private Double pllPercentage;
    
    private String slowestPhase;
}
