import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";

export default function MeditationPlayer({ meditation }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(meditation.duration || 300);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(Math.floor(audio.duration));
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  const togglePlay = async () => {
    if (!audioRef.current) return;
    
    try {
      if (!isPlaying) {
        await audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    } catch (err) {
      console.error('Playback error:', err);
      setIsPlaying(false);
    }
  };

  const restart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
      setCurrentTime(0);
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = (e) => {
    setCurrentTime(Math.floor(e.target.currentTime));
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      background: "linear-gradient(135deg, rgba(218,165,112,0.15), rgba(185,135,93,0.08))",
      border: "1px solid rgba(218,165,112,0.3)",
      borderRadius: 20,
      padding: 30,
      boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
      maxHeight: "90vh",
      overflowY: "auto"
    }}>
      {/* Breathing Animation */}
      <div style={{
        width: "100%",
        height: 300,
        borderRadius: 16,
        marginBottom: 20,
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #1a4d2e 0%, #0d2818 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <style>{`
          @keyframes breathe {
            0%, 100% { 
              transform: scale(0.6);
              opacity: 0.4;
            }
            50% { 
              transform: scale(1);
              opacity: 0.8;
            }
          }
          @keyframes breatheText {
            0%, 45% { 
              opacity: 0;
            }
            50%, 95% { 
              opacity: 1;
            }
            100% { 
              opacity: 0;
            }
          }
          .breathe-circle {
            animation: breathe 8s ease-in-out infinite;
          }
          .breathe-in {
            animation: breatheText 8s ease-in-out infinite;
          }
          .breathe-out {
            animation: breatheText 8s ease-in-out infinite;
            animation-delay: 4s;
          }
        `}</style>

        <div style={{
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(218,165,112,0.6), rgba(185,135,93,0.3))",
          border: "2px solid rgba(218,165,112,0.4)",
          position: "relative"
        }} className="breathe-circle">
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            color: "var(--champagne)",
            fontWeight: 600
          }}>
            <span className="breathe-in">Breathe In</span>
            <span className="breathe-out" style={{ position: "absolute" }}>Breathe Out</span>
          </div>
        </div>


      </div>

      {/* Description */}
      <p style={{ 
        fontSize: 14, 
        color: "var(--rosegold)", 
        lineHeight: 1.6, 
        marginBottom: 20,
        textAlign: "center"
      }}>
        {meditation.description}
      </p>

      {/* Progress Bar */}
      <div style={{ marginBottom: 20 }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
          fontSize: 13,
          color: "var(--champagne)"
        }}>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <div style={{
          width: "100%",
          height: 6,
          background: "rgba(245,222,179,0.2)",
          borderRadius: 999,
          overflow: "hidden"
        }}>
          <div style={{
            width: `${(currentTime / duration) * 100}%`,
            height: "100%",
            background: "linear-gradient(90deg, var(--bronze), var(--rosegold))",
            borderRadius: 999,
            transition: "width 0.3s ease"
          }} />
        </div>
      </div>

      {/* Controls */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 16
      }}>
        <button
          onClick={restart}
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "rgba(245,222,179,0.1)",
            border: "1px solid rgba(245,222,179,0.3)",
            color: "var(--champagne)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        <button
          onClick={togglePlay}
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--bronze), var(--rosegold))",
            border: "none",
            color: "#1b0b06",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 20px rgba(218,165,112,0.4)"
          }}
        >
          {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7" style={{ marginLeft: 3 }} />}
        </button>

        <button
          onClick={toggleMute}
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "rgba(245,222,179,0.1)",
            border: "1px solid rgba(245,222,179,0.3)",
            color: "var(--champagne)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>

      {/* Audio Info */}
      {meditation.audioUrl && (
        <div style={{
          marginTop: 20,
          padding: 14,
          borderRadius: 10,
          background: "rgba(100,140,100,0.12)",
          border: "1px solid rgba(100,140,100,0.25)",
          textAlign: "center"
        }}>
          <p style={{fontSize: 12, color: "var(--champagne)", lineHeight: 1.6, margin: 0}}>
            🎧 <strong>Guided Meditation with Forest Ambience</strong> – Press play to begin your journey into deep stillness.
          </p>
        </div>
      )}

      {/* Audio element - must stay mounted */}
      <audio
        ref={audioRef}
        src="https://www.bensound.com/bensound-music/bensound-relaxing.mp3"
        preload="metadata"
        onEnded={handleEnded}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(Math.floor(audioRef.current.duration));
            audioRef.current.volume = 0.7;
          }
        }}
        style={{ display: 'none' }}
      />

      {/* Full Meditation Script */}
      {meditation.script && (
        <div style={{
          marginTop: 24,
          padding: 20,
          borderRadius: 12,
          background: "rgba(61,36,21,0.4)",
          border: "1px solid rgba(245,222,179,0.1)"
        }}>
          <h4 style={{ 
            fontSize: 14, 
            color: "var(--rosegold)", 
            marginBottom: 12,
            fontWeight: 600 
          }}>
            Meditation Script
          </h4>
          <div style={{ 
            fontSize: 13, 
            color: "var(--champagne)", 
            lineHeight: 1.8,
            fontStyle: "italic",
            maxHeight: 400,
            overflowY: "scroll",
            overflowX: "hidden",
            whiteSpace: "pre-line",
            paddingRight: 10
          }}>
            {meditation.script}
          </div>
        </div>
      )}

      {/* Recommended Forest Oils - Full Collection */}
      {meditation.oils && meditation.oils.length > 0 && (
        <div style={{
          marginTop: 20,
          padding: 20,
          borderRadius: 12,
          background: "rgba(245,222,179,0.04)",
          border: "1px solid rgba(245,222,179,0.08)"
        }}>
          <h4 style={{ 
            fontSize: 15, 
            color: "var(--champagne)", 
            marginBottom: 12,
            fontWeight: 700 
          }}>
            🌲 Forest Aromatics Collection
          </h4>
          <p style={{fontSize: 12, color: "var(--rosegold)", marginBottom: 16, lineHeight: 1.6}}>
            Choose one or blend several. Diffuse before meditation or apply topically (diluted) to pulse points.
          </p>

          <div style={{marginBottom: 16}}>
            <div style={{fontSize: 12, color: "var(--rosegold)", fontWeight: 600, marginBottom: 8}}>🌿 Grounding Blends:</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["Balance Grounding Blend", "Anchor Grounding Blend", "Northern Escape Blend"].map((oil, i) => (
                <span key={i} style={{padding: "6px 12px", borderRadius: 20, background: "rgba(139,111,71,0.2)", border: "1px solid rgba(139,111,71,0.4)", fontSize: 11, color: "var(--champagne)"}}>
                  {oil}
                </span>
              ))}
            </div>
          </div>

          <div style={{marginBottom: 16}}>
            <div style={{fontSize: 12, color: "var(--rosegold)", fontWeight: 600, marginBottom: 8}}>🌲 Cedar, Cypress & Pine:</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["Cedarwood", "Cypress", "Arborvitae", "Hinoki", "Saw Palmetto"].map((oil, i) => (
                <span key={i} style={{padding: "6px 12px", borderRadius: 20, background: "rgba(160,120,80,0.2)", border: "1px solid rgba(160,120,80,0.4)", fontSize: 11, color: "var(--champagne)"}}>
                  {oil}
                </span>
              ))}
            </div>
          </div>

          <div style={{marginBottom: 16}}>
            <div style={{fontSize: 12, color: "var(--rosegold)", fontWeight: 600, marginBottom: 8}}>🎄 Fir & Spruce Trees:</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["Douglas Fir", "Siberian Fir", "White Fir", "Black Spruce"].map((oil, i) => (
                <span key={i} style={{padding: "6px 12px", borderRadius: 20, background: "rgba(100,140,100,0.2)", border: "1px solid rgba(100,140,100,0.4)", fontSize: 11, color: "var(--champagne)"}}>
                  {oil}
                </span>
              ))}
            </div>
          </div>

          <div style={{marginBottom: 16}}>
            <div style={{fontSize: 12, color: "var(--rosegold)", fontWeight: 600, marginBottom: 8}}>🪵 Sacred Woods:</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["Frankincense", "Sandalwood", "Vetiver"].map((oil, i) => (
                <span key={i} style={{padding: "6px 12px", borderRadius: 20, background: "rgba(139,111,71,0.25)", border: "1px solid rgba(139,111,71,0.5)", fontSize: 11, color: "var(--champagne)"}}>
                  {oil}
                </span>
              ))}
            </div>
          </div>

          <div style={{marginBottom: 16}}>
            <div style={{fontSize: 12, color: "var(--rosegold)", fontWeight: 600, marginBottom: 8}}>🍋 Elevating Citrus & Mint (to uplift):</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["Lemon", "Wild Orange", "Grapefruit", "Peppermint", "Spearmint"].map((oil, i) => (
                <span key={i} style={{padding: "6px 12px", borderRadius: 20, background: "rgba(255,215,0,0.15)", border: "1px solid rgba(255,215,0,0.3)", fontSize: 11, color: "var(--champagne)"}}>
                  {oil}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div style={{fontSize: 12, color: "var(--rosegold)", fontWeight: 600, marginBottom: 8}}>💜 Deeply Soothing (for calm):</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["Lavender", "Serenity Blend", "Copaiba", "Roman Chamomile", "Ylang Ylang"].map((oil, i) => (
                <span key={i} style={{padding: "6px 12px", borderRadius: 20, background: "rgba(138,43,226,0.15)", border: "1px solid rgba(138,43,226,0.3)", fontSize: 11, color: "var(--champagne)"}}>
                  {oil}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}