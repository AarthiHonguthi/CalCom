-- Run this in your SQL Tool (pgAdmin / psql)

CREATE DATABASE cal_clone;

-- Connect to the new database before running the rest!
-- \c cal_clone; 

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL
);

CREATE TABLE event_types (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    duration INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE availability (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) UNIQUE,
    schedule JSONB NOT NULL DEFAULT '{}'
);

CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    event_type_id INTEGER REFERENCES event_types(id),
    booker_name VARCHAR(100) NOT NULL,
    booker_email VARCHAR(100) NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    status VARCHAR(20) DEFAULT 'confirmed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Data
INSERT INTO users (username, email) VALUES ('admin', 'admin@cal.com');
INSERT INTO availability (user_id, schedule) VALUES (1, '{
    "1": [{"start": "09:00", "end": "17:00"}], 
    "2": [{"start": "09:00", "end": "17:00"}], 
    "3": [{"start": "09:00", "end": "17:00"}], 
    "4": [{"start": "09:00", "end": "17:00"}], 
    "5": [{"start": "09:00", "end": "17:00"}]
}');