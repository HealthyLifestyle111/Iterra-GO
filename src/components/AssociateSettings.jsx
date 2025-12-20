import React, { useState } from "react";
import { getActiveAssociate, setActiveAssociate } from "../lib/activeAssociate";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function AssociateSettings() {
  const current = getActiveAssociate();
  const [id, setId] = useState(current.id);
  const [referralUrl, setReferralUrl] = useState(current.referralUrl || "");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  function save() {
    setError("");
    setMsg("");

    // Validate
    if (!id.trim()) {
      setError("Associate ID is required");
      return;
    }

    // Validate referral URL if provided
    if (referralUrl.trim()) {
      try {
        const url = new URL(referralUrl);
        if (!url.hostname.includes("doterra.com")) {
          setError("Referral URL must be from doterra.com");
          return;
        }
      } catch {
        setError("Invalid referral URL format");
        return;
      }
    }

    setActiveAssociate({ id: id.trim(), referralUrl: referralUrl.trim() });
    setMsg("✓ Saved! All product links will now credit this associate.");
    
    // Clear message after 3 seconds
    setTimeout(() => setMsg(""), 3000);
  }

  function reset() {
    const defaultAssociate = { id: "jennawilliams1", referralUrl: "", shareLinks: {} };
    setActiveAssociate(defaultAssociate);
    setId(defaultAssociate.id);
    setReferralUrl("");
    setMsg("Reset to default associate (jennawilliams1)");
    setError("");
  }

  return (
    <div style={{
      maxWidth: 600,
      margin: "0 auto",
      padding: 24,
      background: "rgba(245,222,179,0.04)",
      border: "1px solid rgba(245,222,179,0.12)",
      borderRadius: 12
    }}>
      <h2 style={{
        fontSize: 24,
        color: "var(--champagne)",
        marginBottom: 8
      }}>
        Associate Settings
      </h2>
      <p style={{
        color: "var(--rosegold)",
        fontSize: 14,
        marginBottom: 24,
        opacity: 0.8
      }}>
        Configure which doTERRA associate receives credit for product links
      </p>

      {error && (
        <div style={{
          padding: 12,
          borderRadius: 8,
          background: "rgba(255,0,0,0.1)",
          border: "1px solid rgba(255,0,0,0.3)",
          marginBottom: 16,
          display: "flex",
          gap: 8,
          alignItems: "center"
        }}>
          <AlertCircle className="w-4 h-4" style={{color: "#ff6b6b"}} />
          <span style={{color: "#ffb3b3", fontSize: 13}}>{error}</span>
        </div>
      )}

      {msg && (
        <div style={{
          padding: 12,
          borderRadius: 8,
          background: "rgba(0,255,0,0.1)",
          border: "1px solid rgba(0,255,0,0.3)",
          marginBottom: 16,
          display: "flex",
          gap: 8,
          alignItems: "center"
        }}>
          <CheckCircle2 className="w-4 h-4" style={{color: "#4ade80"}} />
          <span style={{color: "#86efac", fontSize: 13}}>{msg}</span>
        </div>
      )}

      <div style={{display: "grid", gap: 20}}>
        <div>
          <label style={{
            display: "block",
            color: "var(--rosegold)",
            fontSize: 12,
            marginBottom: 6,
            fontWeight: 600
          }}>
            Associate ID / Username *
          </label>
          <Input
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="jennawilliams1"
            style={{
              background: "rgba(245,222,179,0.04)",
              border: "1px solid rgba(245,222,179,0.12)",
              color: "var(--champagne)"
            }}
          />
          <p style={{
            fontSize: 11,
            color: "var(--rosegold)",
            opacity: 0.6,
            marginTop: 4
          }}>
            Your doTERRA username or site ID
          </p>
        </div>

        <div>
          <label style={{
            display: "block",
            color: "var(--rosegold)",
            fontSize: 12,
            marginBottom: 6,
            fontWeight: 600
          }}>
            doTERRA Referral Link (Recommended)
          </label>
          <Input
            value={referralUrl}
            onChange={(e) => setReferralUrl(e.target.value)}
            placeholder="https://www.doterra.com/US/en/site/yourusername"
            style={{
              background: "rgba(245,222,179,0.04)",
              border: "1px solid rgba(245,222,179,0.12)",
              color: "var(--champagne)"
            }}
          />
          <p style={{
            fontSize: 11,
            color: "var(--rosegold)",
            opacity: 0.6,
            marginTop: 4
          }}>
            Your personal doTERRA referral or enrollment link
          </p>
        </div>

        <div style={{display: "flex", gap: 12, marginTop: 8}}>
          <Button
            onClick={save}
            style={{
              flex: 1,
              padding: 14,
              borderRadius: 12,
              background: "linear-gradient(90deg,var(--bronze),var(--rosegold))",
              border: 0,
              color: "#1b0b06",
              fontWeight: 700,
              fontSize: 14
            }}
          >
            Save Settings
          </Button>
          <Button
            onClick={reset}
            style={{
              padding: 14,
              borderRadius: 12,
              background: "rgba(245,222,179,0.08)",
              border: "1px solid rgba(245,222,179,0.2)",
              color: "var(--rosegold)",
              fontWeight: 600,
              fontSize: 14
            }}
          >
            Reset to Default
          </Button>
        </div>
      </div>

      <div style={{
        marginTop: 24,
        padding: 16,
        background: "rgba(0,0,0,0.2)",
        borderRadius: 8,
        border: "1px solid rgba(245,222,179,0.08)"
      }}>
        <p style={{
          fontSize: 12,
          color: "var(--rosegold)",
          opacity: 0.7,
          lineHeight: 1.6
        }}>
          <strong>How it works:</strong> All product links in the app will automatically use your associate information for proper credit tracking. If you provide a referral link, new customers will be directed through your enrollment page first.
        </p>
      </div>
    </div>
  );
}
