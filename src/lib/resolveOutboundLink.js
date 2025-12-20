/**
 * Resolve the correct outbound link for a product, with associate attribution
 * 
 * @param {Object} params
 * @param {Object} params.associate - Associate object with id, referralUrl, shareLinks
 * @param {string} params.productId - Product ID from catalog
 * @param {Object} params.products - Product catalog
 * @returns {string} URL to navigate to
 */
export function resolveOutboundLink({ associate, productId, products }) {
  const product = products[productId];
  if (!product) {
    console.warn(`Unknown productId: ${productId}`);
    // Fallback to search
    return `https://www.doterra.com/US/en/search?q=${encodeURIComponent(productId)}`;
  }

  // Use associate-provided Link Generator URL if available (best case)
  const creditedLink = associate?.shareLinks?.[productId];
  if (creditedLink) {
    return creditedLink;
  }

  // Otherwise route through your own redirect endpoint
  // This will handle activation tracking and proper attribution
  if (associate?.id) {
    return `/go/${encodeURIComponent(associate.id)}/${encodeURIComponent(productId)}`;
  }

  // No associate - just use canonical URL
  return product.canonicalUrl;
}
