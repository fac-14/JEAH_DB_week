BEGIN;

DROP TABLE IF EXISTS users, offers, requests, skills;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL
);

INSERT INTO users (name, email) VALUES 
('Jessie', 'jessie@jessiebeech.com'),
('Harry', 'harry@gmail.com'), 
('Armand', 'armand@hotmale.com');

CREATE TABLE IF NOT EXISTS skills (
  id SERIAL PRIMARY KEY,
  skill VARCHAR(100) NOT NULL
);

INSERT INTO skills (skill) VALUES 
('Friendship'), 
('CSS'), 
('Drinking Beer');

CREATE TABLE IF NOT EXISTS offers (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  skill_id INTEGER NOT NULL
);

INSERT INTO offers (user_id, skill_id) VALUES 
(1, 2), 
(3, 1);


CREATE TABLE IF NOT EXISTS requests (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  skill_id INTEGER NOT NULL
);  

INSERT INTO requests (user_id, skill_id) VALUES 
(1, 1), 
(2, 3);

COMMIT;