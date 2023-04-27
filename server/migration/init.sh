# Choix utilisateur (spedata pour tout créer, puis on bascule)
export PGUSER=spedata

# Suppression user et DB pour repartir à 0
dropdb codeclicker
dropuser codeclicker

# Création db et user via un script SQL
psql -f init.sql -d postgres

# Suppression du .plan pour repartir à 0
rm sqitch.plan

# Init project avec postgres
sqitch init codeclicker --engine pg

