
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  
  // Don't show layout on home page - it has its own complete design
  if (currentPageName === "Home" || location.pathname === "/" || location.pathname === createPageUrl("Home")) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen" style={{
      background: 'radial-gradient(ellipse at center, #2d1810 0%, #1a0f08 50%, #0d0704 100%)',
      fontFamily: "'Playfair Display', serif"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Cormorant+Garamond:wght@300;400;600&display=swap');
        
        :root {
          --champagne: #F5DEB3;
          --rosegold: #E6B7A5;
          --bronze: #B9875D;
          --gold: #DAA520;
        }

        body {
          font-family: 'Playfair Display', serif;
        }

        .sacred-bg {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 600px;
          opacity: 0.08;
          animation: flowerSpin 120s linear infinite;
          pointer-events: none;
          z-index: 0;
        }

        @keyframes flowerSpin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        .gold-dust {
          position: fixed;
          width: 2px;
          height: 2px;
          background: radial-gradient(circle, rgba(255, 215, 0, 0.8) 0%, rgba(255, 215, 0, 0.2) 70%);
          border-radius: 50%;
          pointer-events: none;
          animation: dustFloat 25s linear infinite;
          z-index: 1;
        }

        @keyframes dustFloat {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(50vw) rotate(360deg); opacity: 0; }
        }
      `}</style>

      {/* Sacred Geometry Background */}
      <div className="sacred-bg" aria-hidden="true">
        <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="200" r="60" fill="none" stroke="#CD7F32" strokeWidth="1.5" opacity="0.8"/>
          <circle cx="200" cy="140" r="60" fill="none" stroke="#CD7F32" strokeWidth="1.5" opacity="0.8"/>
          <circle cx="252" cy="170" r="60" fill="none" stroke="#CD7F32" strokeWidth="1.5" opacity="0.8"/>
          <circle cx="252" cy="230" r="60" fill="none" stroke="#CD7F32" strokeWidth="1.5" opacity="0.8"/>
          <circle cx="200" cy="260" r="60" fill="none" stroke="#CD7F32" strokeWidth="1.5" opacity="0.8"/>
          <circle cx="148" cy="230" r="60" fill="none" stroke="#CD7F32" strokeWidth="1.5" opacity="0.8"/>
          <circle cx="148" cy="170" r="60" fill="none" stroke="#CD7F32" strokeWidth="1.5" opacity="0.8"/>
        </svg>
      </div>

      {/* Gold Dust Particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="gold-dust"
          style={{
            left: `${Math.random() * 100}vw`,
            animationDelay: `${Math.random() * 25}s`,
            animationDuration: `${20 + Math.random() * 15}s`
          }}
        />
      ))}

      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/20 border-b border-[var(--champagne)]/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to={createPageUrl("Home")} className="flex items-center gap-2">
              <span className="text-2xl md:text-3xl font-bold tracking-wider" style={{ 
                color: 'var(--champagne)',
                fontFamily: "'Playfair Display', serif",
                textShadow: '0 0 20px rgba(245, 222, 179, 0.4)'
              }}>
                iTerra<span className="text-sm align-super" style={{ color: 'var(--rosegold)' }}>™</span>
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-8">
              <a
                href={createPageUrl("BackOffice") + "?demo=true"}
                className="text-[var(--champagne)] hover:text-[var(--rosegold)] transition-colors duration-300 text-sm tracking-wide"
              >
                Back Office Demo
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-20">
        {children}
      </main>
    </div>
  );
}
