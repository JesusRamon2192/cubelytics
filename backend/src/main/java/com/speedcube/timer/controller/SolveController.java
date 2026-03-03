package com.speedcube.timer.controller;

import com.speedcube.timer.model.dto.CreateSolveDto;
import com.speedcube.timer.model.dto.SolveDto;
import com.speedcube.timer.model.enums.Penalty;
import com.speedcube.timer.model.entity.User;
import com.speedcube.timer.service.SolveService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/solves")
@RequiredArgsConstructor
public class SolveController {

    private final SolveService solveService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SolveDto createSolve(@AuthenticationPrincipal User user, @Valid @RequestBody CreateSolveDto dto) {
        return solveService.createSolve(user, dto);
    }

    @GetMapping
    public Page<SolveDto> getSolves(@AuthenticationPrincipal User user,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return solveService.getAllSolves(user, PageRequest.of(page, size));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteSolve(@AuthenticationPrincipal User user, @PathVariable UUID id) {
        solveService.deleteSolve(user, id);
    }

    @PatchMapping("/{id}/penalty")
    public SolveDto updatePenalty(@AuthenticationPrincipal User user, @PathVariable UUID id,
            @RequestParam Penalty penalty) {
        return solveService.updatePenalty(user, id, penalty);
    }

    @PostMapping("/batch")
    @ResponseStatus(HttpStatus.CREATED)
    public void batchCreateSolves(@AuthenticationPrincipal User user,
            @RequestBody java.util.List<CreateSolveDto> dtos) {
        solveService.batchCreateSolves(user, dtos);
    }
}
