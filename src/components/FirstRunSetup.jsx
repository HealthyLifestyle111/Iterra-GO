import { useState, useEffect } from "react";
import { getActiveAssociate, setActiveAssociate } from "../lib/activeAssociate";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { AlertCircle, CheckCircle2, ExternalLink } from "lucide-react";

/**
 * First-run setup gate - ensures users configure their associate info
 * Shows once if no referralUrl is set (unless dismissed)
 */
export default function FirstRunSetup() {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [referralUrl, setReferralUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Check if setup is needed
    const associate = getActiveAssociate();
    const dismissed = localStorage.getItem("iterra_setup_dismissed");
    
    // Show modal if no referralUrl AND not dismissed
    if (!associate.referralUrl && !dismissed) {
      setId(associate.id);
      setOpen(true);
    }
  }, []);

  function handleSave() {
    setError("");
    setSuccess(false);

    // Validate
    if (!id?.trim()) {
      setError("Associate ID is required");
      return;
    }

    if (!referralUrl?.trim()) {
      setError("Referral link is required to ensure you get credit");
      return;
    }

    if (!referralUrl.includes("doterra.com") && !referralUrl.includes("doterra.me")) {
      setError("Must be a valid doTERRA referral link");
      return;
    }

    // Save
    setActiveAssociate({ id: id.trim(), referralUrl: referralUrl.trim() });
    setSuccess(true);

    // Close after brief delay
    setTimeout(() => {
      setOpen(false);
    }, 1500);
  }

  function handleSkip() {
    // Mark as dismissed (but warn them)
    if (confirm("⚠️ Skipping setup means you won't get credit for purchases. Continue anyway?")) {
      localStorage.setItem("iterra_setup_dismissed", "1");
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Welcome to iTerra</DialogTitle>
          <DialogDescription className="text-sm text-neutral-600">
            Set up your doTERRA associate info to ensure you get credit for all purchases.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700">
              Associate ID / Username
            </label>
            <Input
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="jennawilliams1"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700">
              doTERRA Referral Link <span className="text-red-600">*</span>
            </label>
            <Input
              value={referralUrl}
              onChange={(e) => setReferralUrl(e.target.value)}
              placeholder="https://referral.doterra.me/..."
              className="w-full"
            />
            <p className="text-xs text-neutral-500 flex items-center gap-1">
              <ExternalLink className="w-3 h-3" />
              Required to ensure proper doTERRA attribution
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md">
              <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
              <p className="text-sm text-green-700">Saved! You're all set.</p>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-rosegold to-champagne text-bronze font-bold"
            >
              Save & Continue
            </Button>
            <Button
              onClick={handleSkip}
              variant="outline"
              className="text-neutral-600"
            >
              Skip
            </Button>
          </div>

          <p className="text-xs text-neutral-500 text-center">
            You can change these settings anytime in your account.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
