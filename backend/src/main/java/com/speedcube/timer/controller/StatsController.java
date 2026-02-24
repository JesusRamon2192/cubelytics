package com.speedcube.timer.controller;

import com.speedcube.timer.model.dto.StatsDto;
import com.speedcube.timer.service.StatsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/stats")
@RequiredArgsConstructor
public class StatsController {

    private final StatsService statsService;

    @GetMapping
    public StatsDto getStats() {
        return statsService.getStats();
    }
}
