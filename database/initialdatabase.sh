#!/bin/bash

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"usuario":"Admin","passwd":"atechatech"}' \
  http://192.168.49.3:3001/usuarios/create
