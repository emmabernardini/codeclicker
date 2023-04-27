-- Revert codeclicker:1.init from pg

BEGIN;

DROP DOMAIN emailformat, positivnum;
DROP TABLE input, output, type, challenge_has_keyword, keyword, player_has_upgrade, player, challenge, upgrades;

COMMIT;
