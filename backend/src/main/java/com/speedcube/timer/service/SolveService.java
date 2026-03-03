package com.speedcube.timer.service;

import com.speedcube.timer.model.dto.CreateSolveDto;
import com.speedcube.timer.model.dto.SolveDto;
import com.speedcube.timer.model.entity.Solve;
import com.speedcube.timer.model.entity.User;
import com.speedcube.timer.model.enums.Penalty;
import com.speedcube.timer.repository.SolveRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SolveService {

    private final SolveRepository solveRepository;

    @Transactional
    public SolveDto createSolve(User user, CreateSolveDto dto) {
        Solve solve = Solve.builder()
                .user(user)
                .scramble(dto.getScramble())
                .totalTimeMillis(dto.getTotalTimeMillis())
                .penalty(dto.getPenalty() != null ? dto.getPenalty() : Penalty.NONE)
                .crossTimeMillis(dto.getCrossTimeMillis())
                .f2lTimeMillis(dto.getF2lTimeMillis())
                .ollTimeMillis(dto.getOllTimeMillis())
                .pllTimeMillis(dto.getPllTimeMillis())
                .timestamp(Instant.now())
                .build();

        solve = solveRepository.save(solve);
        return mapToDto(solve);
    }

    @Transactional(readOnly = true)
    public Page<SolveDto> getAllSolves(User user, Pageable pageable) {
        return solveRepository.findAllByUserIdOrderByTimestampDesc(user.getId(), pageable)
                .map(this::mapToDto);
    }

    @Transactional
    public void deleteSolve(User user, UUID id) {
        Solve solve = solveRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Solve not found"));
        if (!solve.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("Unauthorized");
        }
        solveRepository.deleteById(id);
    }

    @Transactional
    public SolveDto updatePenalty(User user, UUID id, Penalty penalty) {
        Solve solve = solveRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Solve not found"));
        if (!solve.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("Unauthorized");
        }
        solve.setPenalty(penalty);
        return mapToDto(solveRepository.save(solve));
    }

    @Transactional
    public void batchCreateSolves(User user, java.util.List<CreateSolveDto> dtos) {
        var solves = dtos.stream().map(dto -> Solve.builder()
                .user(user)
                .scramble(dto.getScramble())
                .totalTimeMillis(dto.getTotalTimeMillis())
                .penalty(dto.getPenalty() != null ? dto.getPenalty() : Penalty.NONE)
                .crossTimeMillis(dto.getCrossTimeMillis())
                .f2lTimeMillis(dto.getF2lTimeMillis())
                .ollTimeMillis(dto.getOllTimeMillis())
                .pllTimeMillis(dto.getPllTimeMillis())
                .timestamp(Instant.now())
                .build()).toList();
        solveRepository.saveAll(solves);
    }

    private SolveDto mapToDto(Solve solve) {
        return SolveDto.builder()
                .id(solve.getId())
                .scramble(solve.getScramble())
                .totalTimeMillis(solve.getTotalTimeMillis())
                .penalty(solve.getPenalty())
                .crossTimeMillis(solve.getCrossTimeMillis())
                .f2lTimeMillis(solve.getF2lTimeMillis())
                .ollTimeMillis(solve.getOllTimeMillis())
                .pllTimeMillis(solve.getPllTimeMillis())
                .timestamp(solve.getTimestamp())
                .build();
    }
}
