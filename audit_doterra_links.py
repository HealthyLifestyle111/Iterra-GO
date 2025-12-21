#!/usr/bin/env python3
"""
Audit doTERRA replicated site links to find failing slugs.
Checks each slug from verifiedSlugs.json and reports 404s or home redirects.
"""

import json
import requests
import sys
from pathlib import Path

# Configuration
ASSOCIATE = 'jennawilliams1'
BASE_URL = 'https://www.doterra.com/US/en/site/'
TIMEOUT = 10

def load_verified_slugs():
    """Load verified slugs from JSON file."""
    slug_file = Path('verifiedSlugs.json')
    if not slug_file.exists():
        print(f"Error: {slug_file} not found")
        sys.exit(1)
    
    with open(slug_file, 'r') as f:
        return json.load(f)

def check_product_url(associate, slug, key):
    """Check if a product URL is valid."""
    product_url = f'{BASE_URL}{associate}/p/{slug}'
    home_url = f'{BASE_URL}{associate}'
    
    try:
        # Use HEAD request first (faster)
        response = requests.head(product_url, allow_redirects=True, timeout=TIMEOUT)
        
        # If HEAD doesn't work, try GET
        if response.status_code == 405:
            response = requests.get(product_url, allow_redirects=True, timeout=TIMEOUT)
        
        if response.status_code == 404:
            return {'key': key, 'slug': slug, 'reason': '404 Error', 'url': product_url}
        elif response.url == home_url or home_url in response.url:
            return {'key': key, 'slug': slug, 'reason': 'Redirected to Home', 'url': product_url}
        elif response.status_code != 200:
            return {'key': key, 'slug': slug, 'reason': f'Status {response.status_code}', 'url': product_url}
        
        # Success
        return None
        
    except requests.exceptions.Timeout:
        return {'key': key, 'slug': slug, 'reason': 'Timeout', 'url': product_url}
    except Exception as e:
        return {'key': key, 'slug': slug, 'reason': str(e), 'url': product_url}

def main():
    print(f"Auditing doTERRA links for associate: {ASSOCIATE}")
    print("=" * 60)
    
    verified_slugs = load_verified_slugs()
    total = len(verified_slugs)
    
    print(f"Checking {total} verified slugs...\n")
    
    failing_slugs = []
    success_count = 0
    
    for i, (key, slug) in enumerate(verified_slugs.items(), 1):
        # Progress indicator
        print(f"[{i}/{total}] Checking {key} ({slug})...", end=' ')
        
        result = check_product_url(ASSOCIATE, slug, key)
        
        if result:
            failing_slugs.append(result)
            print(f"❌ {result['reason']}")
        else:
            success_count += 1
            print("✅")
    
    print("\n" + "=" * 60)
    print(f"Results: {success_count} working, {len(failing_slugs)} failing")
    print("=" * 60)
    
    if failing_slugs:
        print("\n⚠️  Failing Slugs to Fix:\n")
        for fail in failing_slugs:
            print(f"  • {fail['key']}")
            print(f"    Slug: {fail['slug']}")
            print(f"    Reason: {fail['reason']}")
            print(f"    URL: {fail['url']}")
            print()
        
        # Save to file
        output_file = Path('failing_doterra_slugs.json')
        with open(output_file, 'w') as f:
            json.dump(failing_slugs, f, indent=2)
        
        print(f"💾 Failing slugs saved to: {output_file}")
        print("\nRecommended fixes:")
        print("- Update verifiedSlugs.json with correct slugs")
        print("- Map discontinued products to alternatives")
        print("- Remove invalid entries")
    else:
        print("\n✅ All slugs are working correctly!")
    
    return len(failing_slugs)

if __name__ == '__main__':
    exit_code = main()
    sys.exit(exit_code)
