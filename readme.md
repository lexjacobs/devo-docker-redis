## start mysql container


docker run -p 3306:3306 -d --name mymysql -e MYSQL_ROOT_PASSWORD=root --rm -v /Users/aj/develop/devo-docker-redis/db/schema.sql:/docker-entrypoint-initdb.d/init.sql mysql:5.7

## start redis container

docker run -p 6379:6379 -d --name myredis --rm redis:latest

## seed mysql container

npm run seed

## start server

npm run start

## check out db

docker exec -it mymysql sh

```
# mysql -u root -p
use redis_test
select * from words limit 10;
```
