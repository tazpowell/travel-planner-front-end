#!/bin/bash
# https://aqueous-forest-96537.herokuapp.com

curl "https://aqueous-forest-96537.herokuapp.com/sign-out" \
  --include \
  --request DELETE \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=${TOKEN}"

echo
