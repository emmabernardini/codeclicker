-- Deploy codeclicker:1.init to pg

BEGIN;

-- XXX Add DDLs here.
CREATE DOMAIN emailformat AS TEXT
CHECK(VALUE ~ '^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$');

CREATE DOMAIN positivnum AS decimal CHECK (VALUE >= 0.0);

CREATE TABLE upgrade (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label TEXT NOT NULL UNIQUE,
    subtitle TEXT NOT NULL,
    img_name TEXT NOT NULL,
    is_active BOOL NOT NULL,
    base_cost positivnum NOT NULL,
    flat_bonus positivnum NOT NULL
);

CREATE TABLE challenge (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT 'Courage, tu vas y arriver !',
    instruction TEXT NOT NULL,
    precode TEXT NOT NULL
);

CREATE TABLE player (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    email emailformat NOT NULL UNIQUE,
    password TEXT NOT NULL UNIQUE,
    exp positivnum NOT NULL DEFAULT 0,
    click_value positivnum NOT NULL DEFAULT 1,
    passive_value positivnum NOT NULL DEFAULT 0,
    click_counter positivnum NOT NULL DEFAULT 0,
    last_challenge_id INT REFERENCES challenge(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ
);

CREATE TABLE player_has_upgrade (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    level INT NOT NULL DEFAULT 1,
    player_id INT NOT NULL REFERENCES player(id) ON DELETE CASCADE,
    upgrade_id INT NOT NULL REFERENCES upgrade(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ
);

CREATE TABLE keyword (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label TEXT NOT NULL
);

CREATE TABLE challenge_has_keyword (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    challenge_id INT NOT NULL REFERENCES challenge(id) ON DELETE CASCADE,
    keyword_id INT NOT NULL REFERENCES keyword(id)
);

CREATE TABLE type (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label TEXT NOT NULL
);

CREATE TABLE output (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    value TEXT NOT NULL,
    type_id INT NOT NULL REFERENCES type(id),
    challenge_id INT NOT NULL REFERENCES challenge(id) ON DELETE CASCADE
);

CREATE TABLE input (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    value TEXT NOT NULL,
    ordonned INT NOT NULL DEFAULT 1,
    type_id INT NOT NULL REFERENCES type(id),
    output_id INT NOT NULL REFERENCES output(id) ON DELETE CASCADE
);

COMMIT;
