#!/bin/bash
slugs=(
"abode-multi-purpose-cleaner"
"adaptiv-calming-blend-capsules"
"adaptiv-oil"
"aromatouch-massage-blend-oil"
"balance-grounding-blend-oil"
"bergamot-oil"
"breathe-respiratory-blend-oil"
"carrier-oils"
"cassia-oil"
"cedarwood-oil"
"cheer-uplifting-blend-oil"
"citrus-bliss-oil"
"clary-sage-oil"
"clarycalm-monthly-blend"
"console-comforting-blend-oil"
"copaiba-oil"
"copaiba-softgels"
"correct-x"
"ddr-prime-softgels"
"deep-blue-oil"
"deep-blue-polyphenol-complex"
"deep-blue-soothing-blend"
"digestzen-oil"
"digestzen-terrazyme"
"digestzen-touch"
"doterra-on-guard-foaming-hand-wash"
"doterra-on-guard-laundry-detergent"
"doterra-on-guard-natural-whitening-toothpaste"
"doterra-on-guard-sanitizing-mist"
"doterra-onguard-mouthwash"
"doterra-rose-touch"
"doterra-tea-tree"
"doterra-yarrow-pom"
"elevation-joyful-blend"
"essential-oil-accessories"
"essential-oil-bottles-5ml-amber"
"essential-oil-roller-bottles"
"eucalyptus-oil"
"family-essentials-kit-and-petal-diffuser"
"foundational-wellness-bundle"
"frankincense-oil"
"frankincense-touch"
"geranium-oil"
"ginger-oil"
"glass-spray-bottles"
"grapefruit-oil"
"greens-digestive-health-supplement"
"home-essentials-enrollment-kit"
"hydrating-cream"
"immortelle-anti-aging-blend"
)

echo "🔍 TESTING FIRST 50 SLUGS..."
echo ""
broken=()
for slug in "${slugs[@]}"; do
  if curl -sL "https://www.doterra.com/US/en/p/$slug" 2>/dev/null | grep -q "Error 404"; then
    echo "❌ $slug"
    broken+=("$slug")
  else
    echo "✅ $slug"
  fi
  sleep 0.1
done

echo ""
echo "=== BROKEN SLUGS IN FIRST 50: ${#broken[@]} ==="
for slug in "${broken[@]}"; do
  echo "  $slug"
done
