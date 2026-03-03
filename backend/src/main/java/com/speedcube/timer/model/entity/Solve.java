package com.speedcube.timer.model.entity;

import com.speedcube.timer.model.enums.Penalty;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "solve")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Solve {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String scramble;

    @Column(name = "total_time_millis", nullable = false)
    private Integer totalTimeMillis;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private Penalty penalty;

    @Column(name = "cross_time_millis")
    private Integer crossTimeMillis;

    @Column(name = "f2l_time_millis")
    private Integer f2lTimeMillis;

    @Column(name = "oll_time_millis")
    private Integer ollTimeMillis;

    @Column(name = "pll_time_millis")
    private Integer pllTimeMillis;

    @Column(nullable = false)
    private Instant timestamp;
}
