#!/bin/bash

# Extract all unique doTERRA URLs from source code
echo "🔍 Testing all doTERRA links..."
echo ""

# Get all unique doterra URLs
urls=$(git grep -h "https://.*doterra.com" src/ | \
  grep -oE 'https://[^"'\''> ]+doterra\.com[^"'\''> ]+' | \
  sort -u)

total=0
passed=0
failed=0

echo "Found $(echo "$urls" | wc -l) unique doTERRA URLs"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

while IFS= read -r url; do
  total=$((total + 1))
  status=$(curl -s -o /dev/null -w "%{http_code}" "$url" --max-time 10)
  
  if [ "$status" = "200" ] || [ "$status" = "302" ] || [ "$status" = "301" ]; then
    echo "✅ [$status] $url"
    passed=$((passed + 1))
  else
    echo "❌ [$status] $url"
    failed=$((failed + 1))
  fi
done <<< "$urls"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Results: $passed passed, $failed failed out of $total total"
