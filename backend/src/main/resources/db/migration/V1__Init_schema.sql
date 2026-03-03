CREATE TABLE app_user (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    city VARCHAR(255),
    country VARCHAR(255),
    role VARCHAR(50) NOT NULL,
    subscription_plan VARCHAR(50) NOT NULL,
    subscription_end_date TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE solve (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    scramble VARCHAR(255) NOT NULL,
    total_time_millis INT NOT NULL,
    penalty VARCHAR(20),
    cross_time_millis INT,
    f2l_time_millis INT,
    oll_time_millis INT,
    pll_time_millis INT,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    CONSTRAINT fk_solve_user FOREIGN KEY (user_id) REFERENCES app_user(id) ON DELETE CASCADE
);

CREATE INDEX idx_solve_timestamp ON solve(timestamp);
CREATE INDEX idx_solve_user_id ON solve(user_id);
