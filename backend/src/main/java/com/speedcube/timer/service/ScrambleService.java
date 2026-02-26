package com.speedcube.timer.service;

import com.speedcube.timer.model.dto.ScrambleDto;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Random;

@Service
public class ScrambleService {

    private static final String[] MOVES = { "U", "D", "L", "R", "F", "B" };
    private static final String[] MODIFIERS = { "", "'", "2" };
    private static final int DEFAULT_LENGTH = 21;

    private final Random random = new Random();

    public ScrambleDto generateScramble() {
        String scramble = generateScrambleString(DEFAULT_LENGTH);

        // Construct the VisualCube URL with the WCA standard orientation
        String encodedScramble = URLEncoder.encode(scramble, StandardCharsets.UTF_8);
        String imageUrl = "https://visualcube.api.cubing.net/visualcube.php?fmt=svg&bg=t&size=150&pzl=3&sch=wrgyob&alg="
                + encodedScramble;

        return new ScrambleDto(scramble, imageUrl);
    }

    private String generateScrambleString(int length) {
        StringBuilder scramble = new StringBuilder();
        int lastMove = -1;
        int secondLastMove = -1;

        for (int i = 0; i < length; i++) {
            int move;
            do {
                move = random.nextInt(MOVES.length);
            } while (move == lastMove ||
                    (move / 2 == lastMove / 2 && move == secondLastMove));

            secondLastMove = lastMove;
            lastMove = move;

            String modifier = MODIFIERS[random.nextInt(MODIFIERS.length)];
            scramble.append(MOVES[move]).append(modifier);

            if (i < length - 1) {
                scramble.append(" ");
            }
        }

        return scramble.toString();
    }
}
