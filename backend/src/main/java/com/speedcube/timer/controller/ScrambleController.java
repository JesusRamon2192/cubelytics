package com.speedcube.timer.controller;

import com.speedcube.timer.model.dto.ScrambleDto;
import com.speedcube.timer.service.ScrambleService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/scramble")
public class ScrambleController {

    private final ScrambleService scrambleService;

    public ScrambleController(ScrambleService scrambleService) {
        this.scrambleService = scrambleService;
    }

    @GetMapping
    public ScrambleDto getScramble() {
        return scrambleService.generateScramble();
    }
}
