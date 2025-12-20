import { useState, useEffect } from "react";
import { getActiveAssociate } from "../lib/activeAssociate";
import { Button } from "../components/ui/button";
import { Copy, CheckCircle2 } from "lucide-react";
import products from "../data/products.json";

/**
 * Share Preview / Debug Page
 * Hidden admin route for troubleshooting attribution
 * 
 * Shows:
 * - Current active associate
 * - Sample outbound links for top products
 * - Copy-to-clipboard helpers
 * 
 * Mount at: /admin/links or similar
 */
export default function AdminDebug() {
  const [associate, setAssociate] = useState(null);
  const [copied, setCopied] = useState("");

  useEffect(() => {
    setAssociate(getActiveAssociate());
  }, []);

  async function copyToClipboard(text, label) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(""), 2000);
    } catch (err) {
      alert("Failed to copy: " + err.message);
    }
  }

  if (!associate) {
    return <div className="p-8">Loading...</div>;
  }

  // Top 10 products for preview
  const topProducts = [
    "lemon", "lavender", "peppermint", "frankincense", 
    "wild-orange", "oregano", "eucalyptus", "melaleuca",
    "home-essentials-kit", "deep-blue"
  ];

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Link Attribution Debug
          </h1>
          <p className="text-neutral-600">
            Verify your associate configuration and preview outbound links.
          </p>
        </div>

        {/* Active Associate Info */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-neutral-900 mb-4">
            Active Associate
          </h2>
          
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-neutral-600">ID</label>
              <div className="flex items-center gap-2 mt-1">
                <code className="flex-1 px-3 py-2 bg-neutral-100 rounded font-mono text-sm">
                  {associate.id}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(associate.id, "id")}
                >
                  {copied === "id" ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-600">
                Referral URL
              </label>
              <div className="flex items-center gap-2 mt-1">
                <code className="flex-1 px-3 py-2 bg-neutral-100 rounded font-mono text-sm break-all">
                  {associate.referralUrl || <span className="text-red-600">❌ Not set</span>}
                </code>
                {associate.referralUrl && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(associate.referralUrl, "referral")}
                  >
                    {copied === "referral" ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-600">
                Custom Share Links
              </label>
              <div className="mt-1 px-3 py-2 bg-neutral-100 rounded">
                {Object.keys(associate.shareLinks || {}).length > 0 ? (
                  <pre className="text-xs font-mono">
                    {JSON.stringify(associate.shareLinks, null, 2)}
                  </pre>
                ) : (
                  <span className="text-sm text-neutral-500">None configured</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sample Links */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
          <h2 className="text-xl font-bold text-neutral-900 mb-4">
            Sample Product Links
          </h2>
          
          <div className="space-y-3">
            {topProducts.map(productId => {
              const product = products[productId];
              if (!product) return null;

              // Build the link that would be generated
              let link;
              if (associate.shareLinks?.[productId]) {
                link = associate.shareLinks[productId];
              } else if (associate.id && associate.referralUrl) {
                link = `${window.location.origin}/go/${associate.id}/${productId}`;
              } else {
                link = product.canonicalUrl;
              }

              return (
                <div key={productId} className="border border-neutral-200 rounded p-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-neutral-900 mb-1">
                        {product.name}
                      </div>
                      <code className="text-xs text-neutral-600 block break-all">
                        {link}
                      </code>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(link, productId)}
                    >
                      {copied === productId ? (
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Attribution Status */}
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h3 className="font-bold text-amber-900 mb-2">Attribution Status</h3>
          <p className="text-sm text-amber-800">
            {associate.referralUrl ? (
              <>
                ✅ <strong>Configured correctly.</strong> Links will route through your referral URL for proper doTERRA attribution.
              </>
            ) : (
              <>
                ⚠️ <strong>No referral URL set.</strong> You may not receive credit for purchases. Set your referral link in settings.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
