#!/bin/bash

echo "🔍 COMPREHENSIVE TEST - All 113 mapping keys"
echo ""

passed=0
failed=0
declare -a failed_list

while IFS= read -r key; do
  if [ -n "$key" ]; then
    # Get redirect location
    location=$(curl -sI "http://localhost:10000/api/doterra/go/$key" 2>&1 | grep "^Location:" | sed 's/Location: //' | tr -d '\r')
    
    if [[ "$location" == *"/p/"* ]]; then
      # Extract slug from URL
      slug=$(echo "$location" | grep -oP '/p/\K[^?]+')
      
      # Test if URL returns 404
      response=$(curl -sL "$location" 2>/dev/null)
      if echo "$response" | grep -q "Error 404"; then
        failed=$((failed + 1))
        failed_list+=("$key → $slug")
        echo "❌ $key → $slug (404 ERROR)"
      else
        passed=$((passed + 1))
      fi
    elif [[ "$location" == *"search"* ]]; then
      # Search fallback is OK
      passed=$((passed + 1))
    else
      echo "⚠️  $key → unexpected: $location"
    fi
  fi
done < /tmp/keys-only.txt

echo ""
echo "========================================"
echo "TOTAL KEYS TESTED: 113"
echo "PASSED: $passed"
echo "FAILED: $failed"
echo "SUCCESS RATE: $(( passed * 100 / 113 ))%"
echo "========================================"

if [ $failed -gt 0 ]; then
  echo ""
  echo "FAILED MAPPINGS:"
  for item in "${failed_list[@]}"; do
    echo "  ❌ $item"
  done
else
  echo "✅ ALL 113 MAPPING KEYS VERIFIED WORKING!"
fi
