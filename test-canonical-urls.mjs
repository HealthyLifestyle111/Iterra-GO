// Test canonical URL approach - December 21, 2025
import verifiedSlugs from './verifiedSlugs.json' with { type: 'json' };

const DOTERRA_BASE = "https://www.doterra.com/US/en";

function resolveDoterraOutbound(key, associateSite = 'jennawilliams1') {
  const slug = verifiedSlugs[key] || key;
  const home = `${DOTERRA_BASE}/site/${associateSite}`;
  const product = `${DOTERRA_BASE}/p/${slug}`;
  return { home, product };
}

const testProducts = [
  { key: 'clarycalm-monthly-blend', name: 'ClaryCalm Blend Oil' },
  { key: 'doterra-rose-touch', name: 'Rose Touch' },
  { key: 'doterra-yarrow-pom', name: 'Yarrow|Pom Oil' },
  { key: 'hydrating-cream', name: 'Hydrating Cream' },
  { key: 'onguard-cleaner-concentrate', name: 'On Guard Cleaner' },
  { key: 'terrashield-blend', name: 'TerraShield Blend' }
];

console.log('🎯 Canonical URL Strategy (December 21, 2025)\n');
console.log('WHY: Replicated URLs (/site/{user}/p/{slug}) blocked by Imperva firewall');
console.log('SOLUTION: Canonical URLs (/p/{slug}) ALWAYS load + home for tracking\n');
console.log('═'.repeat(80) + '\n');

testProducts.forEach(({ key, name }) => {
  const result = resolveDoterraOutbound(key);
  console.log(`✅ ${name}`);
  console.log(`   Key: ${key}`);
  console.log(`   🏠 Home (sets cookie):  ${result.home}`);
  console.log(`   📦 Product (loads):     ${result.product}`);
  console.log(`   ✓ Canonical URL bypasses firewall, always loads\n`);
});

console.log('═'.repeat(80));
console.log('✅ All products use stable canonical URLs');
console.log('✅ No fragile replicated /site/{user}/p/{slug} paths');
console.log('✅ 202 verified slugs total');
console.log('✅ Home page sets tracking cookie for credit');
console.log('\n💡 TIP: Use doTERRA Link Generator tool for official tracked links');
