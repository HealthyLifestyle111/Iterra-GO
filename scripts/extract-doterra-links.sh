#!/bin/bash

# Extract all doTERRA links from the codebase
# Output: JSON file with all found links and their locations

echo "Extracting doTERRA links from codebase..."

OUTPUT_FILE="doterra-links-extracted.json"

# Create temporary file for results
TEMP_FILE=$(mktemp)

# Search for doterra.com URLs in source files
echo "{" > "$TEMP_FILE"
echo '  "timestamp": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'",' >> "$TEMP_FILE"
echo '  "links": [' >> "$TEMP_FILE"

FIRST=true

# Find all doterra links in JavaScript/JSX files
while IFS= read -r line; do
  FILE=$(echo "$line" | cut -d: -f1)
  LINE_NUM=$(echo "$line" | cut -d: -f2)
  CONTENT=$(echo "$line" | cut -d: -f3-)
  
  # Extract URLs from the line
  URLS=$(echo "$CONTENT" | grep -oE 'https?://[^"'\''[:space:]]+doterra[^"'\''[:space:]]*')
  
  for URL in $URLS; do
    # Clean up URL (remove trailing characters)
    URL=$(echo "$URL" | sed 's/[,;)}]*$//')
    
    if [ "$FIRST" = true ]; then
      FIRST=false
    else
      echo "," >> "$TEMP_FILE"
    fi
    
    echo -n "    {" >> "$TEMP_FILE"
    echo -n '"file": "'"$FILE"'", ' >> "$TEMP_FILE"
    echo -n '"line": '"$LINE_NUM"', ' >> "$TEMP_FILE"
    echo -n '"url": "'"$URL"'"' >> "$TEMP_FILE"
    echo -n "}" >> "$TEMP_FILE"
  done
done < <(git grep -n "doterra\.com\|doterraeveryday\.com\|my\.doterra\.com" -- '*.js' '*.jsx' '*.mjs' '*.ts' '*.tsx' '*.json' 2>/dev/null || true)

echo "" >> "$TEMP_FILE"
echo "  ]," >> "$TEMP_FILE"

# Count links
LINK_COUNT=$(grep -c '"url"' "$TEMP_FILE" || echo "0")
echo '  "total": '"$LINK_COUNT" >> "$TEMP_FILE"

echo "}" >> "$TEMP_FILE"

# Move to output file
mv "$TEMP_FILE" "$OUTPUT_FILE"

echo "✅ Extraction complete!"
echo "📊 Total links found: $LINK_COUNT"
echo "📄 Results saved to: $OUTPUT_FILE"

# Show summary by domain
echo ""
echo "Summary by domain:"
grep -o '"url": "[^"]*"' "$OUTPUT_FILE" | \
  sed 's/"url": "https\?:\/\/\([^/]*\).*/\1/' | \
  sort | uniq -c | sort -rn

# Show unique URLs
echo ""
echo "Unique URLs:"
grep -o '"url": "[^"]*"' "$OUTPUT_FILE" | \
  sed 's/"url": "\([^"]*\)"/\1/' | \
  sort -u

echo ""
echo "Done! Review $OUTPUT_FILE for details."
