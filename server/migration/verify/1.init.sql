-- Verify codeclicker:1.init on pg

BEGIN;

SELECT id, label, subtitle, img_name, base_cost, is_active, flat_bonus FROM "upgrade";

SELECT id, title, description, instruction, precode FROM "challenge";

SELECT id, username, email, password, exp, click_value, click_counter, passive_value, last_challenge_id, created_at, updated_at FROM "player";

SELECT id, level, player_id, upgrade_id, created_at, updated_at FROM "player_has_upgrade";

SELECT id, label FROM "keyword";

SELECT id, challenge_id, keyword_id FROM "challenge_has_keyword";

SELECT id, label FROM "type";
SELECT id, value, type_id, challenge_id FROM "output";
SELECT id, value, type_id, challenge_id FROM "input";


ROLLBACK;
