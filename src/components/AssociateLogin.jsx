import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, Loader2 } from "lucide-react";

export default function AssociateLogin({ onClose, onSuccess }) {
  const [step, setStep] = useState('login'); // 'login' | 'verify' | 'reset'
  const [email, setEmail] = useState('');
  const [charterCode, setCharterCode] = useState('');
  const [associateId, setAssociateId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // First check if user exists
      const users = await base44.entities.User.filter({ email: email });
      
      if (users.length === 0) {
        setError('No account found. Please contact your upline to get registered.');
        setLoading(false);
        return;
      }

      const user = users[0];

      // Check if user has backoffice access
      if (!user.backoffice_access) {
        setError('Your account does not have back office access. Contact your upline.');
        setLoading(false);
        return;
      }

      // Verify charter code
      if (user.charter_code !== charterCode) {
        setError('Invalid charter code. Please try again or use "Forgot Charter Code".');
        setLoading(false);
        return;
      }

      // Success - redirect to login page
      base44.auth.redirectToLogin(window.location.origin + '/BackOffice');
      
    } catch (err) {
      setError('Login failed. Please try again.');
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const users = await base44.entities.User.filter({ email: email, associate_id: associateId });
      
      if (users.length === 0) {
        setError('No account found with that email and associate ID.');
        setLoading(false);
        return;
      }

      // Send recovery email via integration
      await base44.integrations.Core.SendEmail({
        to: email,
        subject: 'iTerra™ Charter Code Recovery',
        body: `Your charter code is: ${users[0].charter_code}\n\nAssociate ID: ${users[0].associate_id}\n\nKeep this secure.`
      });

      setStep('login');
      setError('');
      alert('Charter code sent to your email!');
      
    } catch (err) {
      setError('Recovery failed. Contact your upline for assistance.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",backdropFilter:"blur(6px)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{width:"min(450px,90vw)",background:"linear-gradient(180deg, rgba(48,20,14,0.95), rgba(30,12,8,0.90))",border:"1px solid rgba(245,222,179,0.12)",borderRadius:16,padding:32,boxShadow:"0 20px 60px rgba(0,0,0,.7)"}}>
        <button onClick={onClose} style={{float:"right",background:"transparent",border:0,color:"var(--champagne)",fontSize:20,cursor:"pointer"}}>✕</button>
        
        <h2 style={{fontSize:24,color:"var(--champagne)",marginBottom:6,textAlign:"center"}}>
          {step === 'reset' ? 'Recover Charter Code' : 'Associate Portal'}
        </h2>
        <p style={{color:"var(--rosegold)",textAlign:"center",marginBottom:24,fontSize:13}}>
          {step === 'reset' ? 'Enter your email and associate ID' : 'Secure access for wellness advocates'}
        </p>

        {error && (
          <div style={{padding:12,borderRadius:8,background:"rgba(255,0,0,0.1)",border:"1px solid rgba(255,0,0,0.3)",marginBottom:16,display:"flex",gap:8,alignItems:"center"}}>
            <AlertCircle className="w-4 h-4" style={{color:"#ff6b6b"}} />
            <span style={{color:"#ffb3b3",fontSize:13}}>{error}</span>
          </div>
        )}

        {step === 'login' && (
          <form onSubmit={handleLogin} style={{display:"grid",gap:16}}>
            <div>
              <label style={{display:"block",color:"var(--rosegold)",fontSize:12,marginBottom:6,fontWeight:600}}>Email Address</label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.12)",color:"var(--champagne)"}}
              />
            </div>
            <div>
              <label style={{display:"block",color:"var(--rosegold)",fontSize:12,marginBottom:6,fontWeight:600}}>Charter Code</label>
              <Input
                type="password"
                required
                value={charterCode}
                onChange={(e) => setCharterCode(e.target.value)}
                placeholder="Enter your secure charter code"
                style={{background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.12)",color:"var(--champagne)"}}
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              style={{padding:14,borderRadius:12,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,fontSize:16,marginTop:8}}
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin inline mr-2" />Verifying...</> : 'Access Back Office →'}
            </Button>
            <button
              type="button"
              onClick={() => setStep('reset')}
              style={{background:"transparent",border:0,color:"var(--rosegold)",fontSize:13,cursor:"pointer",textDecoration:"underline",marginTop:8}}
            >
              Forgot charter code?
            </button>
          </form>
        )}

        {step === 'reset' && (
          <form onSubmit={handleReset} style={{display:"grid",gap:16}}>
            <div>
              <label style={{display:"block",color:"var(--rosegold)",fontSize:12,marginBottom:6,fontWeight:600}}>Email Address</label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.12)",color:"var(--champagne)"}}
              />
            </div>
            <div>
              <label style={{display:"block",color:"var(--rosegold)",fontSize:12,marginBottom:6,fontWeight:600}}>Associate ID</label>
              <Input
                type="text"
                required
                value={associateId}
                onChange={(e) => setAssociateId(e.target.value)}
                placeholder="12345678"
                style={{background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.12)",color:"var(--champagne)"}}
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              style={{padding:14,borderRadius:12,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,fontSize:16,marginTop:8}}
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin inline mr-2" />Sending...</> : 'Send Recovery Email'}
            </Button>
            <button
              type="button"
              onClick={() => { setStep('login'); setError(''); }}
              style={{background:"transparent",border:0,color:"var(--rosegold)",fontSize:13,cursor:"pointer",textDecoration:"underline",marginTop:8}}
            >
              ← Back to login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}