#!/bin/bash

# Identify doTERRA URLs in code that use the /site/<SITE>/p/<slug> pattern
# These should be updated to use the backend resolver or canonical /p/<slug> URLs

echo "Searching for /site/.../p/ product URLs in code..."
echo ""

# Find all instances of /site/<site>/p/ pattern in source files
git grep -n 'doterra\.com/US/en/site/[^/]*/p/' -- '*.js' '*.jsx' '*.mjs' '*.ts' '*.tsx' 2>/dev/null | \
  grep -v 'node_modules' | \
  grep -v 'doterra-audit.json' | \
  grep -v 'doterra-links-extracted.json' | \
  head -50

echo ""
echo "---"
echo "These /site/<SITE>/p/<slug> URLs should be replaced with:"
echo "1. Frontend: Use doterraGoUrl(slug) which routes through the backend"
echo "2. Backend: Use canonical /US/en/p/<slug> URLs (without /site/ path)"
echo "3. Scripts: Use /US/en/p/<slug> for testing/validation"
