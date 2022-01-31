#!/bin/bash

name="plataforma_db"
name+="-"
name+=$(date +"%Y-%m-%d.%H:%M")
name+=".sql"
echo $name;
mysqldump --replace --skip-add-drop-table --skip-comments plataforma_db -p > "$name"
sed -i 's/CREATE TABLE/CREATE TABLE IF NOT EXISTS/g' "$name"
