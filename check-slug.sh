#!/bin/bash
# Quick check if a slug works
SLUG="$1"
URL="https://www.doterra.com/US/en/p/${SLUG}"
RESULT=$(curl -sL "$URL" | grep -i "Error 404\|Oops! Looks like something went wrong")
if [ -z "$RESULT" ]; then
  echo "✅ $SLUG works"
  exit 0
else
  echo "❌ $SLUG is BROKEN"
  exit 1
fi
