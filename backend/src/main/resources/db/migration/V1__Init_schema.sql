CREATE TABLE solve (
    id UUID PRIMARY KEY,
    scramble VARCHAR(255) NOT NULL,
    total_time_millis INT NOT NULL,
    penalty VARCHAR(20),
    cross_time_millis INT,
    f2l_time_millis INT,
    oll_time_millis INT,
    pll_time_millis INT,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE INDEX idx_solve_timestamp ON solve(timestamp);
