#!/bin/bash

echo "Starting mysql"
/etc/init.d/mysql start

echo "Creating voerr database"
mysql -uroot -e "create database voerr;"

echo "Creating voerr tables"
mysql -uroot voerr < /voerr/sql/voerr.sql

echo "Setup 'root' as password for user 'root'"
mysql -uroot -e "SET PASSWORD FOR 'root'@'localhost' = PASSWORD('root'); GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'root';"