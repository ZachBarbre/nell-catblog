CREATE DATABASE catblog;

\c catblog

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR,
    is_admin BOOLEAN NOT NULL
);

CREATE TABLE blog_entries (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users (id),
    title VARCHAR NOT NULL,
    blog VARCHAR NOT NULL
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users (id),
    blog_id INT REFERENCES blog_entries (id),
    comment VARCHAR NOT NULL
);

INSERT INTO users (username, email, password, is_admin) 
VALUES (
    'Nell', 
    'nell@barbre.xyz',
    'nellthecat',
    true
);

INSERT INTO blog_entries (user_id, title, blog)
VALUES (
    1,
    'First!',
    'This is my first blog. Meow, Meow, Meow.' 
);

INSERT INTO comments (user_id, blog_id, comment)
VALUES (
    1,
    1, 
    'A comment on my first blog!'
);

