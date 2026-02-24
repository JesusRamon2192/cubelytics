package com.speedcube.timer.controller;

import com.speedcube.timer.model.dto.CreateSolveDto;
import com.speedcube.timer.model.dto.SolveDto;
import com.speedcube.timer.model.enums.Penalty;
import com.speedcube.timer.service.SolveService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
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
    public SolveDto createSolve(@Valid @RequestBody CreateSolveDto dto) {
        return solveService.createSolve(dto);
    }

    @GetMapping
    public Page<SolveDto> getSolves(@RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "20") int size) {
        return solveService.getAllSolves(PageRequest.of(page, size));
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteSolve(@PathVariable UUID id) {
        solveService.deleteSolve(id);
    }

    @PatchMapping("/{id}/penalty")
    public SolveDto updatePenalty(@PathVariable UUID id, @RequestParam Penalty penalty) {
        return solveService.updatePenalty(id, penalty);
    }
}
