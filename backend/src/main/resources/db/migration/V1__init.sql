-- V1 init migration
-- Flyway test table
-- Real domain tables will be added in V2+ (auth domain first)

CREATE TABLE schema_check (
    id SERIAL PRIMARY KEY,
    note VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO schema_check (note) VALUES ('init migration ok');
