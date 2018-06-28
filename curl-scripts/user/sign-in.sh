#!/bin/bash
# https://aqueous-forest-96537.herokuapp.com/sign-in
# http://localhost:4741/sign-in

curl "https://aqueous-forest-96537.herokuapp.com/sign-in" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "'"${EMAIL}"'",
      "password": "'"${PASSWORD}"'"
    }
  }'

echo
