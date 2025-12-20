import { useState } from "react";
import { getActiveAssociate } from "../lib/activeAssociate";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { AlertCircle, ExternalLink } from "lucide-react";

/**
 * Safety interstitial for outbound doTERRA links
 * Warns users if they haven't set their referralUrl yet
 * 
 * Usage:
 *   const guardedLink = useOutboundLinkGuard();
 *   onClick={() => guardedLink(url, onProceed)}
 */
export function useOutboundLinkGuard() {
  const [showDialog, setShowDialog] = useState(false);
  const [pendingUrl, setPendingUrl] = useState("");
  const [pendingCallback, setPendingCallback] = useState(null);

  function guardedNavigate(url, callback) {
    const associate = getActiveAssociate();
    
    // If referralUrl exists, proceed immediately
    if (associate.referralUrl) {
      if (callback) callback();
      else window.open(url, "_blank");
      return;
    }

    // Otherwise show warning
    setPendingUrl(url);
    setPendingCallback(() => callback);
    setShowDialog(true);
  }

  function handleProceed() {
    if (pendingCallback) {
      pendingCallback();
    } else if (pendingUrl) {
      window.open(pendingUrl, "_blank");
    }
    setShowDialog(false);
  }

  function handleSetup() {
    setShowDialog(false);
    // Open settings (you can customize this to your settings route)
    window.location.hash = "#settings";
  }

  const Dialog_Component = () => (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            Referral Link Not Set
          </DialogTitle>
          <DialogDescription>
            You haven't configured your doTERRA referral link yet.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <p className="text-sm text-neutral-700">
            Without a referral link, you may not receive proper credit for purchases made through this link.
          </p>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
            <p className="text-xs text-amber-800">
              <strong>Recommended:</strong> Set your referral link now to ensure attribution.
            </p>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              onClick={handleSetup}
              className="flex-1 bg-gradient-to-r from-rosegold to-champagne text-bronze font-bold"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Set Referral Link
            </Button>
            <Button
              onClick={handleProceed}
              variant="outline"
              className="text-neutral-600"
            >
              Continue Anyway
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return { guardedNavigate, GuardDialog: Dialog_Component };
}
