#!/usr/bin/bash 

docker exec it $CONTAINER_NAME mysql --protocol=tcp -u$DB_USER -p"$DB_PASSWORD" < init.sql 

docker exec it $CONTAINER_NAME mysql --protocol=tcp -u$DB_USER -p"$DB_PASSWORD" auth_db < auth.sql 

docker exec it $CONTAINER_NAME mysql --protocol=tcp -u$DB_USER -p"$DB_PASSWORD" kgs_db < kgs.sql 

docker exec it $CONTAINER_NAME mysql --protocol=tcp -u$DB_USER -p"$DB_PASSWORD" url_hash_db < db.sql 


python3 kgs/generate_keys.py
