package com.speedcube.timer.service;

import com.speedcube.timer.model.dto.StatsDto;
import com.speedcube.timer.model.entity.Solve;
import com.speedcube.timer.model.enums.Penalty;
import com.speedcube.timer.repository.SolveRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StatsService {

    private final SolveRepository solveRepository;

    @Transactional(readOnly = true)
    public StatsDto getStats() {
        List<Solve> allSolves = solveRepository.findAllByOrderByTimestampDesc(PageRequest.of(0, 5000)).getContent();
        if (allSolves.isEmpty()) {
            return StatsDto.builder().totalSolves(0).build();
        }

        List<Solve> validSolves = allSolves.stream()
                .filter(s -> s.getPenalty() != Penalty.DNF)
                .toList();

        int totalCount = allSolves.size();
        Integer bestTime = validSolves.stream().map(this::getAdjustedTime).min(Integer::compareTo).orElse(null);
        Integer sessionMean = calculateMean(validSolves);

        Integer currentAo5 = calculateAverage(allSolves, 5);
        Integer currentAo12 = calculateAverage(allSolves, 12);
        Integer currentAo50 = calculateAverage(allSolves, 50);
        Integer currentAo100 = calculateAverage(allSolves, 100);

        Double standardDeviation = calculateStdDev(validSolves, sessionMean);

        // Phase stats
        Integer avgCrossTime = calculateMeanPhase(validSolves, 1);
        Integer avgF2lTime = calculateMeanPhase(validSolves, 2);
        Integer avgOllTime = calculateMeanPhase(validSolves, 3);
        Integer avgPllTime = calculateMeanPhase(validSolves, 4);

        int totalAvgPhases = (avgCrossTime != null ? avgCrossTime : 0) +
                             (avgF2lTime != null ? avgF2lTime : 0) +
                             (avgOllTime != null ? avgOllTime : 0) +
                             (avgPllTime != null ? avgPllTime : 0);

        Double crossPct = null, f2lPct = null, ollPct = null, pllPct = null;
        String slowest = "NONE";

        if (totalAvgPhases > 0) {
            crossPct = avgCrossTime != null ? (avgCrossTime * 100.0) / totalAvgPhases : null;
            f2lPct = avgF2lTime != null ? (avgF2lTime * 100.0) / totalAvgPhases : null;
            ollPct = avgOllTime != null ? (avgOllTime * 100.0) / totalAvgPhases : null;
            pllPct = avgPllTime != null ? (avgPllTime * 100.0) / totalAvgPhases : null;

            int maxAvg = 0;
            if (avgCrossTime != null && avgCrossTime > maxAvg) { maxAvg = avgCrossTime; slowest = "CROSS"; }
            if (avgF2lTime != null && avgF2lTime > maxAvg) { maxAvg = avgF2lTime; slowest = "F2L"; }
            if (avgOllTime != null && avgOllTime > maxAvg) { maxAvg = avgOllTime; slowest = "OLL"; }
            if (avgPllTime != null && avgPllTime > maxAvg) { maxAvg = avgPllTime; slowest = "PLL"; }
        }

        return StatsDto.builder()
                .totalSolves(totalCount)
                .bestTime(bestTime)
                .currentAo5(currentAo5)
                .currentAo12(currentAo12)
                .currentAo50(currentAo50)
                .currentAo100(currentAo100)
                .sessionMean(sessionMean)
                .standardDeviation(standardDeviation)
                .avgCrossTime(avgCrossTime)
                .avgF2lTime(avgF2lTime)
                .avgOllTime(avgOllTime)
                .avgPllTime(avgPllTime)
                .crossPercentage(crossPct)
                .f2lPercentage(f2lPct)
                .ollPercentage(ollPct)
                .pllPercentage(pllPct)
                .slowestPhase(slowest)
                .build();
    }

    private Integer getAdjustedTime(Solve solve) {
        if (solve.getPenalty() == Penalty.DNF) return Integer.MAX_VALUE;
        if (solve.getPenalty() == Penalty.PLUS_TWO) return solve.getTotalTimeMillis() + 2000;
        return solve.getTotalTimeMillis();
    }

    private Integer calculateMean(List<Solve> solves) {
        if (solves.isEmpty()) return null;
        long sum = solves.stream().mapToLong(this::getAdjustedTime).sum();
        return (int) (sum / solves.size());
    }

    private Integer calculateMeanPhase(List<Solve> solves, int phase) {
        List<Integer> times = solves.stream().map(s -> {
            switch(phase) {
                case 1: return s.getCrossTimeMillis();
                case 2: return s.getF2lTimeMillis();
                case 3: return s.getOllTimeMillis();
                case 4: return s.getPllTimeMillis();
                default: return null;
            }
        }).filter(t -> t != null).toList();

        if (times.isEmpty()) return null;
        long sum = times.stream().mapToLong(Integer::longValue).sum();
        return (int) (sum / times.size());
    }

    private Double calculateStdDev(List<Solve> solves, Integer mean) {
        if (solves.size() < 2 || mean == null) return null;
        double variance = solves.stream()
                .map(this::getAdjustedTime)
                .mapToDouble(t -> Math.pow(t - mean, 2))
                .average()
                .orElse(0.0);
        return Math.sqrt(variance);
    }

    private Integer calculateAverage(List<Solve> allDesc, int n) {
        if (allDesc.size() < n) return null;
        List<Solve> lastN = allDesc.subList(0, n);

        int dnfCount = (int) lastN.stream().filter(s -> s.getPenalty() == Penalty.DNF).count();
        if (dnfCount > 1) return null; // DNF

        List<Integer> times = new ArrayList<>();
        for (Solve s : lastN) {
            times.add(getAdjustedTime(s));
        }

        Collections.sort(times);
        int trimCount = (int) Math.ceil(n * 0.05);
        if (trimCount == 0 && n >= 5) trimCount = 1; // Standard WCA trims 1 best/worst for Ao5
        
        long sum = 0;
        int count = 0;
        for (int i = trimCount; i < n - trimCount; i++) {
            sum += times.get(i);
            count++;
        }
        
        return count == 0 ? null : (int) (sum / count);
    }
}
