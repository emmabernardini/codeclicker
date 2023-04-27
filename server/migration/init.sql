-- SQLBook: Code
CREATE ROLE codeclicker WITH
	LOGIN PASSWORD 'codeclicker';

CREATE DATABASE codeclicker
    WITH OWNER = codeclicker;