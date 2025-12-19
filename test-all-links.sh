#!/bin/bash

echo "=== Testing doTERRA Link Resolver ==="
echo "Testing sample of all product categories..."
echo ""

test_product() {
    local slug="$1"
    local expected="$2"
    local result=$(curl -sI "http://localhost:10000/api/doterra/go/$slug" | grep -i "^Location:" | awk '{print $2}' | tr -d '\r')
    
    if [[ "$result" == *"$expected"* ]]; then
        echo "✅ $slug → $expected"
    else
        echo "❌ $slug → FAILED (got: $result)"
    fi
}

echo "Single Oils:"
test_product "lemon" "lemon-oil"
test_product "lavender" "lavender-oil"
test_product "peppermint" "peppermint-oil"
test_product "frankincense" "frankincense-oil"
test_product "bergamot" "bergamot-oil"
test_product "wild-orange" "wild-orange-oil"

echo ""
echo "Blends:"
test_product "on-guard" "on-guard-oil"
test_product "adaptiv-calming-blend" "adaptiv-oil"
test_product "breathe-respiratory-blend" "breathe-respiratory-blend-oil"
test_product "balance-grounding-blend" "balance-grounding-blend-oil"

echo ""
echo "Touch Rollers:"
test_product "frankincense-touch" "frankincense-touch"
test_product "rose-touch" "doterra-rose-touch"
test_product "lavender-touch" "lavender-touch"

echo ""
echo "Supplements:"
test_product "ddr-prime-softgels" "ddr-prime-softgels"
test_product "turmeric-dual-chamber-capsules" "turmeric-dual-chamber-capsules"
test_product "yarrow-pom-capsules" "yarrow-pom-capsules"
test_product "copaiba-softgels" "copaiba-softgels"

echo ""
echo "Skincare:"
test_product "yarrow-pom-active-botanical-duo" "yarrow-pom-active-botanical-duo"
test_product "immortelle-anti-aging-blend" "immortelle-anti-aging-blend"
test_product "anti-aging-moisturizer" "anti-aging-moisturizer"

echo ""
echo "Cleaning Products:"
test_product "on-guard-cleaner-concentrate" "on-guard-cleaner-concentrate"
test_product "on-guard-foaming-hand-wash" "on-guard-foaming-hand-wash"
test_product "abode-multi-purpose-cleaner" "abode-multi-purpose-cleaner"

echo ""
echo "Diffusers:"
test_product "petal-diffuser" "petal-diffuser"
test_product "laluz-diffuser" "laluz-diffuser"
test_product "lumo-diffuser" "lumo-diffuser"

echo ""
echo "Special Mappings:"
test_product "melaleuca" "doterra-tea-tree"
test_product "sandalwood-indian" "sandalwood-oil"

echo ""
echo "Kits:"
test_product "foundational-wellness-bundle" "foundational-wellness-bundle"
test_product "home-essentials-kit" "home-essentials-enrollment-kit"
test_product "metapwr-metabolic-system" "metapwr-metabolic-system"

echo ""
echo "=== Test Complete ==="
