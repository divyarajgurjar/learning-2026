CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE NOT NULL,
    
    refresh_token TEXT, 
    verification_token TEXT NOT NULL,
    reset_password_token TEXT,
    reset_password_expires_in TIMESTAMP,


    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
DROP TABLE users

SELECT * FROM users
-- Also, let's link seats to users for later
ALTER TABLE seats ADD COLUMN user_id INTEGER REFERENCES users(id);
