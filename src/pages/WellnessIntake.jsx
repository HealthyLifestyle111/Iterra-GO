import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function WellnessIntake() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    who: '',
    age: '',
    goals: [],
    fullReset: false,
    approach: '',
    approach_plus: '',
    experience: '',
    use: [],
    aromas: [],
    moodcues: [],
    female_focus: [],
    pregnant: false,
    cycleDay: 14,
    
    cycle_status: '',
    cycle_length: 28,
    flow_days: 5,
    pms_symptoms: [],
    
    dosha: '',
    dosha_quiz: {
      body_frame: '',
      weight: '',
      skin: '',
      hair: '',
      temp: '',
      digestion: '',
      sleep: '',
      energy: '',
      stress_response: '',
      speech: ''
    },
    zodiac: '',
    chakras: [],
    chakra_quiz: {
      symptoms: [],
      color_drawn: []
    },
    frequencies: [],

    wellness_head: 0,
    wellness_eyes: 0,
    wellness_ears: 0,
    wellness_nose: 0,
    wellness_mouth: 0,
    wellness_skin: 0,
    wellness_heart: 0,
    wellness_lungs: 0,
    wellness_digestive: 0,
    wellness_joints: 0,
    wellness_energy: 0,
    wellness_mind: 0,
    wellness_emotions: 0,
    wellness_weight: 0,

    protein_frequency: '',
    vegetable_frequency: '',
    fruit_frequency: '',
    grain_frequency: '',
    healthy_fats: '',
    eating_pattern: '',

    fruits_servings: 0,
    veggies_servings: 0,
    protein_servings: 0,
    grains_servings: 0,
    dairy_servings: 0,

    diet_types: [],
    food_cravings: [],

    water_oz: 64,
    water_type: '',
    caffeine_intake: '',
    alcohol_intake: '',

    tre_window: 12,
    first_meal_time: '',
    last_meal_time: '',

    bm_frequency: 1,
    stool_type: '',
    digest_flags: [],

    supplements_list: '',
    medications_list: '',

    detox_duration: '',
    detox_ready: 5,
    detox_options: [],
    sleep_hours: 7,
    sleep_quality: 5,
    stress_level: 4,
    energy_level: 6,
    food_sensitivities: [],

    commitment_level: '',
    motivation_type: '',
    support_preference: '',
    accountability_need: '',
    learning_style: '',
    time_availability: '',
    obstacles: [],
    success_metrics: [],

    bedtime: '',
    wake_time: '',
    sleep_latency: '',
    night_wakings: '',
    sleep_environment: [],
    bedtime_routine: [],
    sleep_challenges: [],

    terms_accepted: false
  });

  const [expandedSections, setExpandedSections] = useState({ '0': true });
  const [doshaGuess, setDoshaGuess] = useState('—');
  const [cellSaltInfo, setCellSaltInfo] = useState({ salt: '', why: '' });

  useEffect(() => {
    const savedData = localStorage.getItem('iterra_intake');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(prev => ({ ...prev, ...parsedData }));
        if (parsedData.email) {
          setExpandedSections(prev => ({ ...prev, '24': true }));
        }
      } catch (error) {
        console.error("Failed to parse saved intake data:", error);
      }
    }
  }, []);

  useEffect(() => {
    const quiz = formData.dosha_quiz;
    const counts = { vata: 0, pitta: 0, kapha: 0 };

    const scoring = {
      body_frame: { thin: 'vata', medium: 'pitta', heavy: 'kapha' },
      weight: { lose_easily: 'vata', steady: 'pitta', gain_easily: 'kapha' },
      skin: { dry: 'vata', sensitive: 'pitta', oily: 'kapha' },
      hair: { dry_thin: 'vata', fine: 'pitta', thick: 'kapha' },
      temp: { cold: 'vata', warm: 'pitta', cool: 'kapha' },
      digestion: { irregular: 'vata', strong: 'pitta', slow: 'kapha' },
      sleep: { light: 'vata', moderate: 'pitta', deep: 'kapha' },
      energy: { bursts: 'vata', moderate: 'pitta', steady: 'kapha' },
      stress_response: { anxious: 'vata', irritable: 'pitta', withdrawn: 'kapha' },
      speech: { fast: 'vata', sharp: 'pitta', slow: 'kapha' }
    };

    Object.keys(quiz).forEach(key => {
      const answer = quiz[key];
      if (scoring[key] && scoring[key][answer]) {
        counts[scoring[key][answer]]++;
      }
    });

    const max = Math.max(counts.vata, counts.pitta, counts.kapha);
    if (max > 0) {
      const guess = Object.keys(counts).find(k => counts[k] === max);
      setDoshaGuess(guess.charAt(0).toUpperCase() + guess.slice(1));
      setFormData(prev => ({ ...prev, dosha: guess }));
    }
  }, [formData.dosha_quiz]);

  useEffect(() => {
    const zodiacCellSalts = {
      'Aries': {
        salt: 'Kali Phosphoricum',
        why: 'Nerve nutrient. Aries rules the brain and head, making this sign prone to mental stress, headaches, and insomnia. Kali Phos supports nervous system function and mental clarity.'
      },
      'Taurus': {
        salt: 'Natrum Sulphuricum',
        why: 'Water eliminator. Taurus rules the neck and throat, prone to fluid retention and congestion. Natrum Sulph aids water balance and lymphatic drainage.'
      },
      'Gemini': {
        salt: 'Kali Muriaticum',
        why: 'Fibrin regulator. Gemini rules lungs and arms, prone to respiratory issues. Kali Mur helps break down mucus and supports healthy respiration.'
      },
      'Cancer': {
        salt: 'Calcarea Fluorica',
        why: 'Tissue elasticity. Cancer rules chest and stomach, governing digestion and emotional security. Calc Fluor maintains tissue flexibility and supports digestive health.'
      },
      'Leo': {
        salt: 'Magnesia Phosphorica',
        why: 'Muscle relaxant. Leo rules the heart and spine. Mag Phos relieves muscle cramps, spasms, and supports cardiovascular rhythm.'
      },
      'Virgo': {
        salt: 'Kali Sulphuricum',
        why: 'Oxygen carrier. Virgo rules intestines and governs assimilation. Kali Sulph supports skin health, oxygenation, and digestive enzyme function.'
      },
      'Libra': {
        salt: 'Natrum Phosphoricum',
        why: 'Acid neutralizer. Libra rules kidneys and seeks balance. Natrum Phos regulates pH, supports hormone balance, and aids kidney function.'
      },
      'Scorpio': {
        salt: 'Calcarea Sulphurica',
        why: 'Blood purifier. Scorpio rules reproductive organs and transformation. Calc Sulph supports detoxification, wound healing, and cellular cleansing.'
      },
      'Sagittarius': {
        salt: 'Silicea',
        why: 'Cleanser and strengthener. Sagittarius rules hips, liver, and seeks expansion. Silicea strengthens connective tissue, supports detox pathways, and aids structural integrity.'
      },
      'Capricorn': {
        salt: 'Calcarea Phosphorica',
        why: 'Bone builder. Capricorn rules knees, bones, and skeletal structure. Calc Phos supports bone density, recovery, and structural resilience.'
      },
      'Aquarius': {
        salt: 'Natrum Muriaticum',
        why: 'Water distributor. Aquarius rules ankles and circulation, governing fluid balance. Natrum Mur regulates water distribution, supports emotional balance, and prevents retention.'
      },
      'Pisces': {
        salt: 'Ferrum Phosphoricum',
        why: 'Oxygen carrier and inflammation fighter. Pisces rules feet and immune system. Ferrum Phos boosts vitality, supports early-stage inflammation response, and enhances oxygenation.'
      }
    };

    if (formData.zodiac && zodiacCellSalts[formData.zodiac]) {
      setCellSaltInfo(zodiacCellSalts[formData.zodiac]);
    } else {
      setCellSaltInfo({ salt: '—', why: '' });
    }
  }, [formData.zodiac]);

  useEffect(() => {
    setFormData(prev => ({ ...prev, chakras: prev.chakra_quiz.symptoms }));
  }, [formData.chakra_quiz.symptoms]);

  const toggleSection = (id) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCheckbox = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      alert('Please provide your email address (Section 24)');
      return;
    }

    if (formData.aromas.length === 0) {
      alert('Please select at least one aromatic preference (Section 5)');
      return;
    }

    if (!formData.dosha) {
      alert('Please complete the Ayurvedic Dosha Discovery (Section 8)');
      return;
    }

    if (!formData.terms_accepted) {
      alert('Please read and accept the Educational Disclaimer before submitting (Section 24)');
      return;
    }

    try {
      const wellnessTotalScore = Object.keys(formData).filter(k => k.startsWith('wellness_')).reduce((sum, k) => sum + formData[k], 0);

      const intakePayload = {
        email: formData.email,
        who: formData.who,
        age: parseInt(formData.age) || null,
        wellness_goals: formData.goals,
        full_reset: formData.fullReset,
        approach: formData.approach,
        experience: formData.experience,
        use_method: formData.use.join(', '),
        aromatic_profile: formData.aromas,
        mood_support: formData.moodcues,
        female_focus: formData.female_focus,
        pregnant: formData.pregnant,
        cycle_day: formData.cycleDay,
        
        cycle_status: formData.cycle_status,
        cycle_length: formData.cycle_length,
        flow_days: formData.flow_days,
        pms_symptoms: formData.pms_symptoms,
        
        dosha: formData.dosha,
        zodiac_sign: formData.zodiac,
        chakras: formData.chakra_quiz.symptoms,
        frequencies: formData.frequencies,

        wellness_total_score: wellnessTotalScore,

        protein_frequency: formData.protein_frequency,
        vegetable_frequency: formData.vegetable_frequency,
        fruit_frequency: formData.fruit_frequency,
        grain_frequency: formData.grain_frequency,
        healthy_fats: formData.healthy_fats,
        eating_pattern: formData.eating_pattern,

        fruits_servings: formData.fruits_servings,
        veggies_servings: formData.veggies_servings,
        protein_servings: formData.protein_servings,
        grains_servings: formData.grains_servings,
        dairy_servings: formData.dairy_servings,

        diet_types: formData.diet_types,

        water_intake_oz: formData.water_oz,
        water_type: formData.water_type,
        caffeine_intake: formData.caffeine_intake,
        alcohol_intake: formData.alcohol_intake,

        tre_window: formData.tre_window,
        first_meal_time: formData.first_meal_time,
        last_meal_time: formData.last_meal_time,

        bowel_movements_daily: formData.bm_frequency,
        stool_type: formData.stool_type,
        digestive_concerns: formData.digest_flags,

        supplements_list: formData.supplements_list,
        medications_list: formData.medications_list,

        detox_duration: formData.detox_duration,
        detox_readiness: formData.detox_ready,
        detox_support: formData.detox_options,
        sleep_hours: formData.sleep_hours,
        sleep_quality: formData.sleep_quality,
        
        bedtime: formData.bedtime,
        wake_time: formData.wake_time,
        sleep_latency: formData.sleep_latency,
        night_wakings: formData.night_wakings,
        sleep_environment: formData.sleep_environment,
        bedtime_routine: formData.bedtime_routine,
        sleep_challenges: formData.sleep_challenges,
        
        stress_level: formData.stress_level,
        energy_level: formData.energy_level,
        food_sensitivities: formData.food_sensitivities,

        commitment_level: formData.commitment_level,
        motivation_type: formData.motivation_type,
        support_preference: formData.support_preference,
        accountability_need: formData.accountability_need,
        learning_style: formData.learning_style,
        time_availability: formData.time_availability,
        obstacles: formData.obstacles,
        success_metrics: formData.success_metrics,

        intake_data: formData,
        terms_accepted: formData.terms_accepted,
        status: 'pending'
      };

      await base44.entities.WellnessIntake.create(intakePayload);

      alert('✨ Wellness intake submitted successfully! We\'ll be in touch soon with your personalized recommendations.');
      navigate(createPageUrl("Home"));
      localStorage.removeItem('iterra_intake');
      localStorage.removeItem('iterra_intake_prev');
    } catch (error) {
      console.error("Error submitting intake:", error);
      alert("There was an error submitting your intake. Please try again or contact us directly.");
    }
  };

  const goalOptions = [
    "longevity", "detox", "energy", "sleep", "digestive", "mood", "cognitive", "mental",
    "cardio", "respiratory", "immune", "skin", "weight", "rhythm", "mobility", "recovery",
    "home", "seasonal"
  ];

  return (
    <div className="min-h-screen py-12 px-4" style={{
      background: 'radial-gradient(1400px 1200px at 50% -260px, rgba(218,165,127,.22), transparent 60%), radial-gradient(900px 900px at 85% 115%, rgba(218,165,127,.15), transparent 60%), linear-gradient(135deg, #201614, #2b1f1c)'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:wght@400;600;700&display=swap');

        :root {
          --champagne: #F7E7CE;
          --rosegold: #DAA57F;
          --bronze: #B9875D;
        }

        @keyframes flowerSpin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes dustFloat {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(50vw) rotate(360deg); opacity: 0; }
        }

        .gold-dust-particle {
          position: fixed;
          width: 3px;
          height: 3px;
          background: radial-gradient(circle, rgba(185, 135, 93, 0.9) 0%, rgba(185, 135, 93, 0.3) 70%);
          border-radius: 50%;
          pointer-events: none;
          animation: dustFloat 25s linear infinite;
          z-index: 5;
        }

        .intake-card {
          backdrop-filter: blur(16px);
          background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02));
          border: 1px solid rgba(255,255,255,0.24);
          border-radius: 26px;
          box-shadow: 0 12px 60px rgba(0,0,0,0.30), 0 0 30px rgba(218,165,127,.55);
        }

        .section-header {
          cursor: pointer;
          padding: 15px 18px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: 12px;
          transition: all 0.2s;
          color: var(--champagne);
        }

        .section-header:hover {
          background: linear-gradient(180deg, rgba(218,165,127,.14), rgba(218,165,127,.06));
        }

        .section-content {
          padding: 0 18px 16px 18px;
          background: rgba(0,0,0,.15);
        }

        .option-label {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 12px;
          border-radius: 12px;
          background: rgba(255,255,255,.045);
          border: 1px solid rgba(255,255,255,.18);
          transition: all .2s ease;
          color: var(--champagne);
          cursor: pointer;
        }

        .option-label:hover {
          border-color: var(--rosegold);
          background: linear-gradient(180deg, rgba(218,165,127,.14), rgba(218,165,127,.06));
        }

        .option-label.checked {
          border-color: var(--rosegold);
          box-shadow: 0 0 0 2px rgba(218,165,127,.35) inset;
          background: linear-gradient(180deg, rgba(218,165,127,.22), rgba(218,165,127,.10));
        }

        input[type="checkbox"], input[type="radio"] {
          accent-color: var(--rosegold);
        }

        input, select, textarea {
          color: var(--champagne);
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,0.24);
          border-radius: 12px;
          padding: 10px;
          width: 100%;
        }

        input::placeholder {
          color: rgba(247,231,206,0.5);
        }

        select option {
          background: #2b1f1c;
          color: var(--champagne);
        }

        input:focus, select:focus, textarea:focus {
          outline: none;
          border-color: var(--rosegold);
          box-shadow: 0 0 0 2px rgba(218,165,127,.25);
        }

        .range-slider {
          width: 100%;
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          background: linear-gradient(90deg, rgba(218,165,127,.45), rgba(205,127,50,.65));
          border-radius: 6px;
          outline: none;
          box-shadow: inset 0 0 8px rgba(0,0,0,.25);
        }

        .range-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: linear-gradient(180deg, #F7E7CE, #DAA57F);
          box-shadow: 0 0 14px rgba(218,165,127,.9);
          cursor: pointer;
        }

        .range-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border: none;
          border-radius: 50%;
          background: linear-gradient(180deg, #F7E7CE, #DAA57F);
          box-shadow: 0 0 14px rgba(218,165,127,.9);
          cursor: pointer;
        }

        label {
          color: var(--champagne);
        }

        p {
          color: var(--champagne);
        }

        b, strong {
          color: var(--champagne);
        }
        
        .range-value {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--rosegold);
          text-shadow: 0 0 8px rgba(218,165,127,.6);
          padding: 4px 12px;
          background: rgba(218,165,127,.15);
          borderRadius: 8px;
          display: inline-block;
          marginLeft: 8px;
        }
      `}</style>

      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        height: '500px',
        opacity: 0.12,
        animation: 'flowerSpin 120s linear infinite',
        zIndex: 1,
        pointerEvents: 'none',
        filter: 'drop-shadow(0 0 40px rgba(218,165,127,.6)) drop-shadow(0 0 80px rgba(218,165,127,.4))'
      }}>
        <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="200" r="60" fill="none" stroke="#CD7F32" strokeWidth="1.5" opacity="0.8"/>
          <circle cx="200" cy="140" r="60" fill="none" stroke="#CD7F32" strokeWidth="1.5" opacity="0.8"/>
          <circle cx="252" cy="170" r="60" fill="none" stroke="#CD7F32" strokeWidth="1.5" opacity="0.8"/>
          <circle cx="252" cy="230" r="60" fill="none" stroke="#CD7F32" strokeWidth="1.5" opacity="0.8"/>
          <circle cx="200" cy="260" r="60" fill="none" stroke="#CD7F32" strokeWidth="1.5" opacity="0.8"/>
          <circle cx="148" cy="230" r="60" fill="none" stroke="#CD7F32" strokeWidth="1.5" opacity="0.8"/>
          <circle cx="148" cy="170" r="60" fill="none" stroke="#CD7F32" strokeWidth="1.5" opacity="0.8"/>
          <circle cx="200" cy="80" r="60" fill="none" stroke="#CD7F32" strokeWidth="1.5" opacity="0.6"/>
          <circle cx="252" cy="110" r="60" fill="none" stroke="#CD7F32" strokeWidth="1.5" opacity="0.6"/>
          <circle cx="304" cy="140" r="60" fill="none" stroke="#CD7F32" strokeWidth="1.5" opacity="0.6"/>
          <circle cx="304" cy="200" r="60" fill="none" stroke="#CD7F32" strokeWidth="1.5" opacity="0.6"/>
          <circle cx="304" cy="260" r="60" fill="none" stroke="#CD7F32" strokeWidth="1.5" opacity="0.6"/>
          <circle cx="252" cy="290" r="60" fill="none" stroke="#CD7F32" strokeWidth="1.5" opacity="0.6"/>
          <circle cx="200" cy="320" r="60" fill="none" stroke="#CD7F32" strokeWidth="1.5" opacity="0.6"/>
          <circle cx="148" cy="290" r="60" fill="none" stroke="#CD7F32" strokeWidth="1.5" opacity="0.6"/>
          <circle cx="96" cy="260" r="60" fill="none" stroke="#CD7F32" strokeWidth="1.5" opacity="0.6"/>
          <circle cx="96" cy="200" r="60" fill="none" stroke="#CD7F32" strokeWidth="1.5" opacity="0.6"/>
          <circle cx="96" cy="140" r="60" fill="none" stroke="#CD7F32" strokeWidth="1.5" opacity="0.6"/>
          <circle cx="148" cy="110" r="60" fill="none" stroke="#CD7F32" strokeWidth="1.5" opacity="0.6"/>
        </svg>
      </div>

      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="gold-dust-particle"
          style={{
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * 100}vh`,
            animationDelay: `${Math.random() * 25}s`,
            animationDuration: `${20 + Math.random() * 15}s`
          }}
        />
      ))}

      <div className="max-w-6xl mx-auto" style={{ position: 'relative', zIndex: 10 }}>
        <Button
          variant="ghost"
          onClick={() => navigate(createPageUrl("Home"))}
          className="mb-8 text-[var(--champagne)] hover:text-[var(--rosegold)] hover:bg-transparent"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Button>

        <div className="text-center mb-8">
          <h1 style={{
            fontFamily: "'Cinzel', serif",
            letterSpacing: '.04em',
            color: 'var(--champagne)',
            fontSize: 'clamp(2rem, 5vw, 2.5rem)',
            margin: '0 0 6px 0',
            textShadow: '0 0 22px rgba(247, 231, 206, 0.5)'
          }}>
            Wellness Intake Portal
          </h1>
          <p style={{
            fontSize: 'clamp(0.9rem, 2vw, 1rem)',
            letterSpacing: '2px',
            color: 'var(--rosegold)',
            textShadow: '0 0 10px rgba(218, 165, 127, 0.5)'
          }}>
            Sacred Wellness Discovery
          </p>
        </div>

        <form onSubmit={handleSubmit} className="intake-card p-6 md:p-8">
          {/* SECTION 1: WHO IS THIS FOR */}
          <div style={{
            background: 'rgba(255,255,255,.03)',
            border: '1px solid rgba(255,255,255,0.24)',
            borderRadius: '16px',
            marginBottom: '14px',
            overflow: 'hidden'
          }}>
            <div className="section-header" onClick={() => toggleSection('0')}>
              <span>1 - Who is this intake for?</span>
              <span style={{ color: 'var(--rosegold)', transition: 'transform 0.2s', transform: expandedSections['0'] ? 'rotate(90deg)' : 'rotate(0)' }}>▸</span>
            </div>
            {expandedSections['0'] && (
              <div className="section-content">
                <p style={{ opacity: 0.7, marginBottom: '16px', fontSize: '0.85rem', lineHeight: '1.6' }}>
                  This wellness intake is for adults aged 18 and over.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '20px' }}>
                  {[
                    { value: 'male', label: 'Male' },
                    { value: 'female', label: 'Female' }
                  ].map(opt => (
                    <label key={opt.value} className={`option-label ${formData.who === opt.value ? 'checked' : ''}`}>
                      <input type="radio" name="who" value={opt.value} checked={formData.who === opt.value}
                        onChange={(e) => setFormData(prev => ({ ...prev, who: e.target.value }))} />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>

                {formData.who && (
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 600 }}>
                      Age: <span className="range-value">{formData.age || '18'}</span>
                    </label>
                    <input
                      type="range"
                      min="18"
                      max="100"
                      value={formData.age || 18}
                      onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                      className="range-slider"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* SECTION 2: GOALS */}
          <div style={{
            background: 'rgba(255,255,255,.03)',
            border: '1px solid rgba(255,255,255,0.24)',
            borderRadius: '16px',
            marginBottom: '14px',
            overflow: 'hidden'
          }}>
            <div className="section-header" onClick={() => toggleSection('2')}>
              <span>2 - Goals <span style={{ opacity: 0.6, fontSize: '0.9rem' }}>(select up to 3, or choose Full Reset)</span></span>
              <span style={{ color: 'var(--rosegold)', transition: 'transform 0.2s', transform: expandedSections['2'] ? 'rotate(90deg)' : 'rotate(0)' }}>▸</span>
            </div>
            {expandedSections['2'] && (
              <div className="section-content">
                <label className={`option-label ${formData.fullReset ? 'checked' : ''}`} style={{ marginBottom: '16px' }}>
                  <input type="checkbox" checked={formData.fullReset}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullReset: e.target.checked }))} />
                  <span>Full-Body Reset (skip specific goals)</span>
                </label>

                {!formData.fullReset && (
                  <>
                    <p style={{ opacity: 0.7, marginBottom: '12px' }}>Or select up to 3 specific wellness goals:</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                      {goalOptions.map(goal => (
                        <label key={goal} className={`option-label ${formData.goals.includes(goal) ? 'checked' : ''}`}>
                          <input type="checkbox" checked={formData.goals.includes(goal)}
                            onChange={() => handleCheckbox('goals', goal)}
                            disabled={formData.goals.length >= 3 && !formData.goals.includes(goal)} />
                          <span style={{ textTransform: 'capitalize' }}>{goal.replace(/_/g, ' ')}</span>
                        </label>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* SECTION 3: APPROACH */}
          <div style={{
            background: 'rgba(255,255,255,.03)',
            border: '1px solid rgba(255,255,255,0.24)',
            borderRadius: '16px',
            marginBottom: '14px',
            overflow: 'hidden'
          }}>
            <div className="section-header" onClick={() => toggleSection('3')}>
              <span>3 - Approach & Experience</span>
              <span style={{ color: 'var(--rosegold)', transition: 'transform 0.2s', transform: expandedSections['3'] ? 'rotate(90deg)' : 'rotate(0)' }}>▸</span>
            </div>
            {expandedSections['3'] && (
              <div className="section-content">
                <p style={{ opacity: 0.7, marginBottom: '12px', fontSize: '0.85rem' }}>How do you prefer to approach wellness?</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                  {['gentle', 'moderate', 'deep'].map(opt => (
                    <label key={opt} className={`option-label ${formData.approach === opt ? 'checked' : ''}`}>
                      <input type="radio" name="approach" value={opt} checked={formData.approach === opt}
                        onChange={(e) => setFormData(prev => ({ ...prev, approach: e.target.value }))} />
                      <span style={{ textTransform: 'capitalize' }}>{opt}</span>
                    </label>
                  ))}
                </div>

                <p style={{ opacity: 0.7, marginBottom: '12px', fontSize: '0.85rem' }}>Past experience with essential oils or natural wellness?</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                  {['beginner', 'intermediate', 'advanced'].map(opt => (
                    <label key={opt} className={`option-label ${formData.experience === opt ? 'checked' : ''}`}>
                      <input type="radio" name="experience" value={opt} checked={formData.experience === opt}
                        onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))} />
                      <span style={{ textTransform: 'capitalize' }}>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SECTION 4: PREFERRED OIL APPLICATIONS */}
          <div style={{
            background: 'rgba(255,255,255,.03)',
            border: '1px solid rgba(255,255,255,0.24)',
            borderRadius: '16px',
            marginBottom: '14px',
            overflow: 'hidden'
          }}>
            <div className="section-header" onClick={() => toggleSection('4')}>
              <span>4 - Preferred Oil Applications <span style={{ opacity: 0.6, fontSize: '0.9rem' }}>(select all that apply)</span></span>
              <span style={{ color: 'var(--rosegold)', transition: 'transform 0.2s', transform: expandedSections['4'] ? 'rotate(90deg)' : 'rotate(0)' }}>▸</span>
            </div>
            {expandedSections['4'] && (
              <div className="section-content">
                <p style={{ opacity: 0.7, marginBottom: '12px', fontSize: '0.85rem' }}>How do you prefer to use essential oils?</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                  {[
                    { value: 'diffuse', label: 'Diffuse' },
                    { value: 'topical', label: 'Topical' },
                    { value: 'internal', label: 'Internal' },
                    { value: 'aromatic', label: 'Aromatic' }
                  ].map(opt => (
                    <label key={opt.value} className={`option-label ${formData.use.includes(opt.value) ? 'checked' : ''}`}>
                      <input type="checkbox" checked={formData.use.includes(opt.value)}
                        onChange={() => handleCheckbox('use', opt.value)} />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
                <p style={{ marginTop: '12px', padding: '10px', background: 'rgba(218,165,127,.08)', borderRadius: '8px', fontSize: '0.75rem', color: 'var(--champagne)', opacity: 0.8 }}>
                  <strong>Note:</strong> Castor oil can enhance absorption of topical essential oils. Internal use refers to approved methods like adding to water or food, not limited to capsules.
                </p>
              </div>
            )}
          </div>

          {/* SECTION 5: AROMATIC PROFILE (REQUIRED) */}
          <div style={{
            background: 'rgba(255,255,255,.03)',
            border: '1px solid rgba(255,255,255,0.24)',
            borderRadius: '16px',
            marginBottom: '14px',
            overflow: 'hidden'
          }}>
            <div className="section-header" onClick={() => toggleSection('5')}>
              <span>5 - Aromatic profile <span style={{ color: 'var(--rosegold)', fontWeight: 700 }}>(required)</span></span>
              <span style={{ color: 'var(--rosegold)', transition: 'transform 0.2s', transform: expandedSections['5'] ? 'rotate(90deg)' : 'rotate(0)' }}>▸</span>
            </div>
            {expandedSections['5'] && (
              <div className="section-content">
                <p style={{ opacity: 0.7, marginBottom: '12px' }}>Select the aromas you're drawn to. This drives curation.</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
                  {['floral', 'citrus', 'spice', 'herbal', 'woody', 'minty'].map(aroma => (
                    <label key={aroma} className={`option-label ${formData.aromas.includes(aroma) ? 'checked' : ''}`}>
                      <input type="checkbox" checked={formData.aromas.includes(aroma)}
                        onChange={() => handleCheckbox('aromas', aroma)} />
                      <span style={{ textTransform: 'capitalize' }}>
                        {aroma === 'floral' && '🌸'} {aroma === 'citrus' && '🍊'} {aroma === 'spice' && '🌶️'}
                        {aroma === 'herbal' && '🌿'} {aroma === 'woody' && '🌲'} {aroma === 'minty' && '🍃'} {aroma}
                      </span>
                    </label>
                  ))}
                </div>
                <p style={{ fontSize: '0.7rem', opacity: 0.7, marginTop: '12px', fontStyle: 'italic', color: 'var(--champagne)' }}>
                  Note: If taking prescription medications, consult your healthcare provider about potential interactions with citrus oils, especially grapefruit.
                </p>
              </div>
            )}
          </div>

          {/* SECTION 6: MOOD & EMOTIONAL */}
          <div style={{
            background: 'rgba(255,255,255,.03)',
            border: '1px solid rgba(255,255,255,0.24)',
            borderRadius: '16px',
            marginBottom: '14px',
            overflow: 'hidden'
          }}>
            <div className="section-header" onClick={() => toggleSection('6')}>
              <span>6 - Mood & Emotional Support</span>
              <span style={{ color: 'var(--rosegold)', transition: 'transform 0.2s', transform: expandedSections['6'] ? 'rotate(90deg)' : 'rotate(0)' }}>▸</span>
            </div>
            {expandedSections['6'] && (
              <div className="section-content">
                <p style={{ opacity: 0.7, marginBottom: '12px', fontSize: '0.85rem' }}>Select mood/emotional states you'd like to support:</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
                  {['stress_reduction', 'focus', 'motivation', 'anxious', 'sad', 'overwhelmed', 'restless', 'irritable', 'foggy', 'unmotivated', 'joyful', 'peaceful', 'energized', 'confident', 'creative', 'grounded'].map(mood => (
                    <label key={mood} className={`option-label ${formData.moodcues.includes(mood) ? 'checked' : ''}`}>
                      <input type="checkbox" checked={formData.moodcues.includes(mood)}
                        onChange={() => handleCheckbox('moodcues', mood)} />
                      <span style={{ textTransform: 'capitalize' }}>{mood.replace(/_/g, ' ')}</span>
                    </label>
                  ))}
                </div>
                <p style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '12px', fontStyle: 'italic' }}>
                  Aligned with emotional wellness support for holistic balance.
                </p>
              </div>
            )}
          </div>

          {/* SECTION 7: MENSTRUAL CYCLE QUESTIONNAIRE (FEMALE ONLY) */}
          {formData.who === 'female' && (
            <div style={{
              background: 'rgba(255,255,255,.03)',
              border: '1px solid rgba(255,255,255,0.24)',
              borderRadius: '16px',
              marginBottom: '14px',
              overflow: 'hidden'
            }}>
              <div className="section-header" onClick={() => toggleSection('7')}>
                <span>7 - Menstrual Cycle & Hormonal Wellness</span>
                <span style={{ color: 'var(--rosegold)', transition: 'transform 0.2s', transform: expandedSections['7'] ? 'rotate(90deg)' : 'rotate(0)' }}>▸</span>
              </div>
              {expandedSections['7'] && (
                <div className="section-content">
                  <p style={{ opacity: 0.8, marginBottom: '16px', fontSize: '0.85rem', lineHeight: '1.6', padding: '12px', background: 'rgba(218,165,127,.08)', borderRadius: '8px' }}>
                    <b>Cycle Support:</b> Understanding your cycle patterns helps us provide personalized support for hormonal balance, from teens to menopause.
                  </p>

                  <p style={{ opacity: 0.7, marginBottom: '12px', fontSize: '0.85rem', fontWeight: 600 }}>Cycle Status:</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '20px' }}>
                    {[
                      { value: 'premenarche', label: 'Pre-Menarche (Teens)' },
                      { value: 'regular', label: 'Regular Cycles' },
                      { value: 'irregular', label: 'Irregular' },
                      { value: 'perimenopause', label: 'Perimenopause' },
                      { value: 'menopause', label: 'Menopause/Post' }
                    ].map(opt => (
                      <label key={opt.value} className={`option-label ${formData.cycle_status === opt.value ? 'checked' : ''}`}>
                        <input type="radio" name="cycle_status" value={opt.value} checked={formData.cycle_status === opt.value}
                          onChange={(e) => setFormData(prev => ({ ...prev, cycle_status: e.target.value }))} />
                        <span style={{ fontSize: '0.85rem' }}>{opt.label}</span>
                      </label>
                    ))}
                  </div>

                  {formData.cycle_status && !['menopause'].includes(formData.cycle_status) && (
                    <div style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>
                        Cycle Length (days): <span className="range-value">{formData.cycle_length}</span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="45"
                        value={formData.cycle_length}
                        onChange={(e) => setFormData(prev => ({ ...prev, cycle_length: parseInt(e.target.value) }))}
                        className="range-slider"
                      />
                    </div>
                  )}

                  {formData.cycle_status && !['menopause'].includes(formData.cycle_status) && (
                    <div style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>
                        Flow Days: <span className="range-value">{formData.flow_days}</span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={formData.flow_days}
                        onChange={(e) => setFormData(prev => ({ ...prev, flow_days: parseInt(e.target.value) }))}
                        className="range-slider"
                      />
                    </div>
                  )}

                  <>
                    <p style={{ opacity: 0.7, marginTop: '16px', marginBottom: '12px', fontSize: '0.85rem' }}>Specific female focuses:</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                      {['PMS', 'cramps', 'mood_swings', 'hot_flashes', 'irregular_cycle'].map(focus => (
                        <label key={focus} className={`option-label ${formData.female_focus.includes(focus) ? 'checked' : ''}`}>
                          <input type="checkbox" checked={formData.female_focus.includes(focus)}
                            onChange={() => handleCheckbox('female_focus', focus)} />
                          <span style={{ textTransform: 'capitalize' }}>{focus.replace(/_/g, ' ')}</span>
                        </label>
                      ))}
                    </div>

                    <label className={`option-label ${formData.pregnant ? 'checked' : ''}`} style={{ marginBottom: '12px' }}>
                      <input type="checkbox" checked={formData.pregnant}
                        onChange={(e) => setFormData(prev => ({ ...prev, pregnant: e.target.checked }))} />
                      <span>Currently pregnant or nursing</span>
                    </label>

                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', opacity: 0.9 }}>
                        Cycle day (1-28): <b>{formData.cycleDay}</b>
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="28"
                        value={formData.cycleDay}
                        onChange={(e) => setFormData(prev => ({ ...prev, cycleDay: parseInt(e.target.value) }))}
                        className="range-slider"
                      />
                    </div>
                  </>

                  <p style={{ opacity: 0.7, marginBottom: '12px', fontSize: '0.85rem', fontWeight: 600, marginTop: '20px' }}>
                    Experiences (check any that apply):
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '20px' }}>
                    {[
                      { value: 'cramps', label: 'Cramps/Pain' },
                      { value: 'bloating', label: 'Bloating' },
                      { value: 'mood_swings', label: 'Mood Swings' },
                      { value: 'fatigue', label: 'Fatigue' },
                      { value: 'headaches', label: 'Headaches' },
                      { value: 'acne', label: 'Acne' },
                      { value: 'irregular_bleeding', label: 'Irregular Bleeding' },
                      { value: 'hot_flashes', label: 'Hot Flashes' },
                      { value: 'night_sweats', label: 'Night Sweats' },
                      { value: 'sleep_issues', label: 'Sleep Issues' }
                    ].map(symptom => (
                      <label key={symptom.value} className={`option-label ${formData.pms_symptoms.includes(symptom.value) ? 'checked' : ''}`}>
                        <input type="checkbox" checked={formData.pms_symptoms.includes(symptom.value)}
                          onChange={() => {
                            const newSymptoms = formData.pms_symptoms.includes(symptom.value)
                              ? formData.pms_symptoms.filter(s => s !== symptom.value)
                              : [...formData.pms_symptoms, symptom.value];
                            setFormData(prev => ({ ...prev, pms_symptoms: newSymptoms }));
                          }} />
                        <span style={{ fontSize: '0.85rem' }}>{symptom.label}</span>
                      </label>
                    ))}
                  </div>

                  <div style={{
                    padding: '16px',
                    background: 'rgba(218,165,127,.12)',
                    borderRadius: '10px',
                    marginTop: '16px',
                    border: '1px solid rgba(218,165,127,.25)'
                  }}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--champagne)', lineHeight: '1.6', marginBottom: '12px', fontWeight: 600 }}>
                      🧬 Professional Cycle Tracking & Hormonal Support
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--rosegold)', lineHeight: '1.6', marginBottom: '12px' }}>
                      Order your at-home hormone testing kit and receive personalized guidance from a licensed natural healthcare practitioner. Real support, real results.
                    </p>
                    <a 
                      href="https://healthlifestyleservices.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{
                        display: 'block',
                        padding: '10px 16px',
                        borderRadius: '8px',
                        background: 'linear-gradient(90deg, var(--rosegold), var(--bronze))',
                        color: '#1b0b06',
                        textAlign: 'center',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        textDecoration: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      Order At-Home Hormone Tracking Kit →
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SECTION 8: AYURVEDIC DOSHA DISCOVERY QUESTIONNAIRE (REQUIRED) */}
          <div style={{
            background: 'rgba(255,255,255,.03)',
            border: '1px solid rgba(255,255,255,0.24)',
            borderRadius: '16px',
            marginBottom: '14px',
            overflow: 'hidden'
          }}>
            <div className="section-header" onClick={() => toggleSection('8')}>
              <span>8 - Ayurvedic Dosha Discovery <span style={{ color: 'var(--rosegold)', fontWeight: 700 }}>(required)</span></span>
              <span style={{ color: 'var(--rosegold)', transition: 'transform 0.2s', transform: expandedSections['8'] ? 'rotate(90deg)' : 'rotate(0)' }}>▸</span>
            </div>
            {expandedSections['8'] && (
              <div className="section-content">
                <p style={{ opacity: 0.7, marginBottom: '16px', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  <b>What this does:</b> This questionnaire helps determine your primary Ayurvedic constitution (dosha). Your dosha guides timing, formats, and scent direction for precision wellness curation.
                </p>

                <div style={{ marginBottom: '16px' }}>
                  <p style={{ marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>My body frame is naturally:</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                    {[
                      { value: 'thin', label: 'Thin/Light' },
                      { value: 'medium', label: 'Medium' },
                      { value: 'heavy', label: 'Solid/Heavy' }
                    ].map(opt => (
                      <label key={opt.value} className={`option-label ${formData.dosha_quiz.body_frame === opt.value ? 'checked' : ''}`}>
                        <input type="radio" name="body_frame" value={opt.value}
                          checked={formData.dosha_quiz.body_frame === opt.value}
                          onChange={(e) => setFormData(prev => ({ ...prev, dosha_quiz: { ...prev.dosha_quiz, body_frame: e.target.value }}))} />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <p style={{ marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>My weight tends to:</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                    {[
                      { value: 'lose_easily', label: 'Hard to gain' },
                      { value: 'steady', label: 'Stay steady' },
                      { value: 'gain_easily', label: 'Gain easily' }
                    ].map(opt => (
                      <label key={opt.value} className={`option-label ${formData.dosha_quiz.weight === opt.value ? 'checked' : ''}`}>
                        <input type="radio" name="weight" value={opt.value}
                          checked={formData.dosha_quiz.weight === opt.value}
                          onChange={(e) => setFormData(prev => ({ ...prev, dosha_quiz: { ...prev.dosha_quiz, weight: e.target.value }}))} />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <p style={{ marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>My skin is typically:</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                    {[
                      { value: 'dry', label: 'Dry/Rough' },
                      { value: 'sensitive', label: 'Sensitive/Warm' },
                      { value: 'oily', label: 'Oily/Moist' }
                    ].map(opt => (
                      <label key={opt.value} className={`option-label ${formData.dosha_quiz.skin === opt.value ? 'checked' : ''}`}>
                        <input type="radio" name="skin" value={opt.value}
                          checked={formData.dosha_quiz.skin === opt.value}
                          onChange={(e) => setFormData(prev => ({ ...prev, dosha_quiz: { ...prev.dosha_quiz, skin: e.target.value }}))} />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <p style={{ marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>My hair is:</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                    {[
                      { value: 'dry_thin', label: 'Dry/Thin' },
                      { value: 'fine', label: 'Fine/Early gray' },
                      { value: 'thick', label: 'Thick/Oily' }
                    ].map(opt => (
                      <label key={opt.value} className={`option-label ${formData.dosha_quiz.hair === opt.value ? 'checked' : ''}`}>
                        <input type="radio" name="hair" value={opt.value}
                          checked={formData.dosha_quiz.hair === opt.value}
                          onChange={(e) => setFormData(prev => ({ ...prev, dosha_quiz: { ...prev.dosha_quiz, hair: e.target.value }}))} />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <p style={{ marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>I prefer temperatures that are:</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                    {[
                      { value: 'cold', label: 'Warm (I get cold)' },
                      { value: 'warm', label: 'Cool (I get hot)' },
                      { value: 'cool', label: 'Moderate' }
                    ].map(opt => (
                      <label key={opt.value} className={`option-label ${formData.dosha_quiz.temp === opt.value ? 'checked' : ''}`}>
                        <input type="radio" name="temp" value={opt.value}
                          checked={formData.dosha_quiz.temp === opt.value}
                          onChange={(e) => setFormData(prev => ({ ...prev, dosha_quiz: { ...prev.dosha_quiz, temp: e.target.value }}))} />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <p style={{ marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>My digestion is:</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                    {[
                      { value: 'irregular', label: 'Irregular/Variable' },
                      { value: 'strong', label: 'Strong/Fast' },
                      { value: 'slow', label: 'Slow/Steady' }
                    ].map(opt => (
                      <label key={opt.value} className={`option-label ${formData.dosha_quiz.digestion === opt.value ? 'checked' : ''}`}>
                        <input type="radio" name="digestion" value={opt.value}
                          checked={formData.dosha_quiz.digestion === opt.value}
                          onChange={(e) => setFormData(prev => ({ ...prev, dosha_quiz: { ...prev.dosha_quiz, digestion: e.target.value }}))} />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <p style={{ marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>My sleep pattern is:</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                    {[
                      { value: 'light', label: 'Light/Interrupted' },
                      { value: 'moderate', label: 'Moderate/Sound' },
                      { value: 'deep', label: 'Deep/Long' }
                    ].map(opt => (
                      <label key={opt.value} className={`option-label ${formData.dosha_quiz.sleep === opt.value ? 'checked' : ''}`}>
                        <input type="radio" name="sleep" value={opt.value}
                          checked={formData.dosha_quiz.sleep === opt.value}
                          onChange={(e) => setFormData(prev => ({ ...prev, dosha_quiz: { ...prev.dosha_quiz, sleep: e.target.value }}))} />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <p style={{ marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>My energy level is:</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                    {[
                      { value: 'bursts', label: 'Comes in bursts' },
                      { value: 'moderate', label: 'Moderate/Intense' },
                      { value: 'steady', label: 'Steady/Enduring' }
                    ].map(opt => (
                      <label key={opt.value} className={`option-label ${formData.dosha_quiz.energy === opt.value ? 'checked' : ''}`}>
                        <input type="radio" name="energy" value={opt.value}
                          checked={formData.dosha_quiz.energy === opt.value}
                          onChange={(e) => setFormData(prev => ({ ...prev, dosha_quiz: { ...prev.dosha_quiz, energy: e.target.value }}))} />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <p style={{ marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Under stress, I tend to become:</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                    {[
                      { value: 'anxious', label: 'Anxious/Worried' },
                      { value: 'irritable', label: 'Irritable/Angry' },
                      { value: 'withdrawn', label: 'Withdrawn/Depressed' }
                    ].map(opt => (
                      <label key={opt.value} className={`option-label ${formData.dosha_quiz.stress_response === opt.value ? 'checked' : ''}`}>
                        <input type="radio" name="stress_response" value={opt.value}
                          checked={formData.dosha_quiz.stress_response === opt.value}
                          onChange={(e) => setFormData(prev => ({ ...prev, dosha_quiz: { ...prev.dosha_quiz, stress_response: e.target.value }}))} />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <p style={{ marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>My speech pattern is:</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                    {[
                      { value: 'fast', label: 'Fast/Talkative' },
                      { value: 'sharp', label: 'Sharp/Precise' },
                      { value: 'slow', label: 'Slow/Melodious' }
                    ].map(opt => (
                      <label key={opt.value} className={`option-label ${formData.dosha_quiz.speech === opt.value ? 'checked' : ''}`}>
                        <input type="radio" name="speech" value={opt.value}
                          checked={formData.dosha_quiz.speech === opt.value}
                          onChange={(e) => setFormData(prev => ({ ...prev, dosha_quiz: { ...prev.dosha_quiz, speech: e.target.value }}))} />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {Object.values(formData.dosha_quiz).some(val => val !== '') && (
                  <div style={{
                    marginTop: '20px',
                    padding: '16px',
                    background: 'rgba(218,165,127,.12)',
                    borderRadius: '12px',
                    border: '2px solid rgba(218,165,127,.35)'
                  }}>
                    <p style={{ marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>Your Primary Dosha:</p>
                    <p style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--rosegold)', marginBottom: '8px' }}>
                      {doshaGuess}
                    </p>
                    <p style={{ fontSize: '0.8rem', opacity: 0.8, lineHeight: '1.5' }}>
                      {doshaGuess === 'Vata' && 'Vata types are creative, energetic, and quick-thinking. Balance with warmth, routine, and grounding practices.'}
                      {doshaGuess === 'Pitta' && 'Pitta types are focused, driven, and intense. Balance with cooling, calming practices and moderate intensity.'}
                      {doshaGuess === 'Kapha' && 'Kapha types are steady, nurturing, and calm. Balance with stimulation, variety, and energizing practices.'}
                      {doshaGuess === '—' && 'Complete more questions for a dosha suggestion.'}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* SECTION 9: ZODIAC & CELL SALT WITH FULL EXPLANATION */}
          <div style={{
            background: 'rgba(255,255,255,.03)',
            border: '1px solid rgba(255,255,255,0.24)',
            borderRadius: '16px',
            marginBottom: '14px',
            overflow: 'hidden'
          }}>
            <div className="section-header" onClick={() => toggleSection('9')}>
              <span>9 - Zodiac & Cell Salt Therapy</span>
              <span style={{ color: 'var(--rosegold)', transition: 'transform 0.2s', transform: expandedSections['9'] ? 'rotate(90deg)' : 'rotate(0)' }}>▸</span>
            </div>
            {expandedSections['9'] && (
              <div className="section-content">
                <p style={{ opacity: 0.8, marginBottom: '16px', fontSize: '0.85rem', lineHeight: '1.6', padding: '12px', background: 'rgba(218,165,127,.08)', borderRadius: '8px' }}>
                  <b>What are Cell Salts?</b> Dr. Wilhelm Heinrich Schüßler discovered 12 mineral tissue salts essential for cellular health. Each zodiac sign corresponds to a specific cell salt deficiency pattern. These homeopathic minerals support cellular function, vitality, and constitutional balance. Your zodiac-linked cell salt can be used as a foundational wellness support.
                </p>

                <p style={{ opacity: 0.7, marginBottom: '12px', fontSize: '0.85rem' }}>Select your zodiac sign:</p>
                <select
                  value={formData.zodiac}
                  onChange={(e) => setFormData(prev => ({ ...prev, zodiac: e.target.value }))}
                  style={{ marginBottom: '16px' }}
                >
                  <option value="">Choose...</option>
                  {['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'].map(sign => (
                    <option key={sign} value={sign}>{sign}</option>
                  ))}
                </select>

                {cellSaltInfo.salt && (
                  <div style={{
                    padding: '16px',
                    background: 'rgba(218,165,127,.12)',
                    borderRadius: '12px',
                    border: '2px solid rgba(218,165,127,.35)'
                  }}>
                    <p style={{ marginBottom: '8px', opacity: 0.8, fontSize: '0.85rem' }}>Your Zodiac Cell Salt:</p>
                    <p style={{ fontWeight: 'bold', color: 'var(--champagne)', fontSize: '1.2rem', marginBottom: '10px' }}>{cellSaltInfo.salt}</p>
                    <p style={{ fontSize: '0.8rem', opacity: 0.85, lineHeight: '1.6', color: 'var(--champagne)' }}>
                      <b>Why this salt?</b> {cellSaltInfo.why}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* SECTION 10: CHAKRA SYMPTOM QUESTIONNAIRE */}
          <div style={{
            background: 'rgba(255,255,255,.03)',
            border: '1px solid rgba(255,255,255,0.24)',
            borderRadius: '16px',
            marginBottom: '14px',
            overflow: 'hidden'
          }}>
            <div className="section-header" onClick={() => toggleSection('10')}>
              <span>10 - Chakra Symptom Assessment</span>
              <span style={{ color: 'var(--rosegold)', transition: 'transform 0.2s', transform: expandedSections['10'] ? 'rotate(90deg)' : 'rotate(0)' }}>▸</span>
            </div>
            {expandedSections['10'] && (
              <div className="section-content">
                <p style={{ opacity: 0.7, marginBottom: '16px', fontSize: '0.85rem' }}>
                  Select any symptoms or experiences you're currently dealing with:
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                  {[
                    { value: 'fear_insecurity', label: '🔴 Fear / Insecurity (Root)', chakra: 'root' },
                    { value: 'financial_stress', label: '🔴 Financial Stress (Root)', chakra: 'root' },
                    { value: 'guilt_shame', label: '🟠 Guilt / Shame (Sacral)', chakra: 'sacral' },
                    { value: 'low_creativity', label: '🟠 Low Creativity (Sacral)', chakra: 'sacral' },
                    { value: 'low_confidence', label: '🟡 Low Confidence (Solar)', chakra: 'solar_plexus' },
                    { value: 'digestive_issues', label: '🟡 Digestive Issues (Solar)', chakra: 'solar_plexus' },
                    { value: 'grief_heartbreak', label: '🟢 Grief / Heartbreak (Heart)', chakra: 'heart' },
                    { value: 'difficulty_loving', label: '🟢 Difficulty Loving (Heart)', chakra: 'heart' },
                    { value: 'communication_issues', label: '🔵 Communication Issues (Throat)', chakra: 'throat' },
                    { value: 'throat_problems', label: '🔵 Throat Problems (Throat)', chakra: 'throat' },
                    { value: 'lack_intuition', label: '🟣 Lack of Intuition (Third Eye)', chakra: 'third_eye' },
                    { value: 'headaches', label: '🟣 Frequent Headaches (Third Eye)', chakra: 'third_eye' },
                    { value: 'disconnection', label: '⚪ Spiritual Disconnection (Crown)', chakra: 'crown' },
                    { value: 'confusion', label: '⚪ Mental Confusion (Crown)', chakra: 'crown' }
                  ].map(symptom => (
                    <label key={symptom.value} className={`option-label ${formData.chakra_quiz.symptoms.includes(symptom.value) ? 'checked' : ''}`}>
                      <input type="checkbox" checked={formData.chakra_quiz.symptoms.includes(symptom.value)}
                        onChange={() => {
                          const newSymptoms = formData.chakra_quiz.symptoms.includes(symptom.value)
                            ? formData.chakra_quiz.symptoms.filter(s => s !== symptom.value)
                            : [...formData.chakra_quiz.symptoms, symptom.value];
                          setFormData(prev => ({ ...prev, chakra_quiz: { ...prev.chakra_quiz, symptoms: newSymptoms }}));
                        }} />
                      <span style={{ fontSize: '0.85rem' }}>{symptom.label}</span>
                    </label>
                  ))}
                </div>

                <p style={{ opacity: 0.7, marginBottom: '12px', fontSize: '0.85rem', marginTop: '20px' }}>
                  Which colors are you most drawn to right now?
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px' }}>
                  {[
                    { value: 'red', label: '🔴 Red', chakra: 'root' },
                    { value: 'orange', label: '🟠 Orange', chakra: 'sacral' },
                    { value: 'yellow', label: '🟡 Yellow', chakra: 'solar_plexus' },
                    { value: 'green', label: '🟢 Green', chakra: 'heart' },
                    { value: 'blue', label: '🔵 Blue', chakra: 'throat' },
                    { value: 'indigo', label: '🟣 Indigo', chakra: 'third_eye' },
                    { value: 'violet', label: '⚪ Violet', chakra: 'crown' }
                  ].map(color => (
                    <label key={color.value} className={`option-label ${formData.chakra_quiz.color_drawn.includes(color.value) ? 'checked' : ''}`}>
                      <input type="checkbox" checked={formData.chakra_quiz.color_drawn.includes(color.value)}
                        onChange={() => {
                          const newColors = formData.chakra_quiz.color_drawn.includes(color.value)
                            ? formData.chakra_quiz.color_drawn.filter(c => c !== color.value)
                            : [...formData.chakra_quiz.color_drawn, color.value];
                          setFormData(prev => ({ ...prev, chakra_quiz: { ...prev.chakra_quiz, color_drawn: newColors }}));
                        }} />
                      <span>{color.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SECTION 11: VIBRATIONAL WELLNESS & SOUND THERAPY */}
          <div style={{
            background: 'rgba(255,255,255,.03)',
            border: '1px solid rgba(255,255,255,0.24)',
            borderRadius: '16px',
            marginBottom: '14px',
            overflow: 'hidden'
          }}>
            <div className="section-header" onClick={() => toggleSection('11')}>
              <span>11 - Vibrational Wellness & Sound Therapy</span>
              <span style={{ color: 'var(--rosegold)', transition: 'transform 0.2s', transform: expandedSections['11'] ? 'rotate(90deg)' : 'rotate(0)' }}>▸</span>
            </div>
            {expandedSections['11'] && (
              <div className="section-content">
                <p style={{ opacity: 0.8, marginBottom: '16px', fontSize: '0.85rem', lineHeight: '1.6', padding: '12px', background: 'rgba(218,165,127,.08)', borderRadius: '8px' }}>
                  <b>What is Vibrational Wellness?</b> Everything in the universe vibrates at specific frequencies, including our bodies. Sound therapy uses specific Hz frequencies to support energetic balance and harmony. These frequencies work with your body's natural resonance to promote holistic wellness. Select the frequencies that resonate with your current intentions.
                </p>

                <p style={{ opacity: 0.7, marginBottom: '12px', fontSize: '0.85rem' }}>Which vibrational frequencies are you drawn to right now?</p>
                <div style={{ display: 'grid', gap: '16px' }}>
                  {[
                    { value: '528Hz_love', label: '528 Hz — Love & DNA Repair', desc: 'Heart opening, transformation', info: 'Known as the "Love Frequency," 528 Hz is associated with DNA repair, healing, and transformation. It supports heart chakra opening and deep cellular wellness.', youtube: 'https://www.youtube.com/results?search_query=528hz+solfeggio+meditation' },
                    { value: '432Hz_calm', label: '432 Hz — Deep Calm', desc: 'Universal harmony, peace', info: 'The "Natural Frequency" — mathematically consistent with nature. Supports deep relaxation, stress reduction, and alignment with natural rhythms.', youtube: 'https://www.youtube.com/results?search_query=432hz+healing+frequency' },
                    { value: '396Hz_release', label: '396 Hz — Release & Liberation', desc: 'Fear release, grounding', info: 'The "Liberation Frequency" supports release of fear, guilt, and negative patterns. Associated with root chakra grounding and emotional freedom.', youtube: 'https://www.youtube.com/results?search_query=396hz+root+chakra+meditation' },
                    { value: '639Hz_connect', label: '639 Hz — Connection', desc: 'Relationships, communication', info: 'The "Heart Connection Frequency" enhances relationships, communication, and compassion. Supports harmonious connections with self and others.', youtube: 'https://www.youtube.com/results?search_query=639hz+heart+chakra+meditation' },
                    { value: '741Hz_express', label: '741 Hz — Expression', desc: 'Self-expression, creativity', info: 'The "Throat Chakra Frequency" supports authentic self-expression, creativity, and speaking your truth with clarity and confidence.', youtube: 'https://www.youtube.com/results?search_query=741hz+throat+chakra+meditation' },
                    { value: '852Hz_awaken', label: '852 Hz — Spiritual Awakening', desc: 'Intuition, higher consciousness', info: 'The "Third Eye Frequency" enhances intuition, spiritual awareness, and connection to higher consciousness. Supports inner wisdom and clarity.', youtube: 'https://www.youtube.com/results?search_query=852hz+third+eye+meditation' }
                  ].map(freq => (
                    <div key={freq.value} style={{ padding: '12px', background: 'rgba(245,222,179,0.04)', borderRadius: '8px', border: '1px solid rgba(245,222,179,0.08)' }}>
                      <label className={`option-label ${formData.frequencies.includes(freq.value) ? 'checked' : ''}`} style={{ marginBottom: formData.frequencies.includes(freq.value) ? '12px' : '0' }}>
                        <input type="checkbox" checked={formData.frequencies.includes(freq.value)}
                          onChange={() => handleCheckbox('frequencies', freq.value)} />
                        <span style={{ fontWeight: 600 }}>{freq.label}</span>
                      </label>
                      {formData.frequencies.includes(freq.value) && (
                        <div style={{ padding: '12px', background: 'rgba(218,165,127,.08)', borderRadius: '8px', marginTop: '8px', border: '1px solid rgba(218,165,127,.15)' }}>
                          <p style={{ fontSize: '0.75rem', color: 'var(--champagne)', lineHeight: '1.6', marginBottom: '8px' }}>
                            <strong>About:</strong> {freq.info}
                          </p>
                          <a
                            href={freq.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-block',
                              fontSize: '0.75rem',
                              color: 'var(--rosegold)',
                              textDecoration: 'underline',
                              cursor: 'pointer'
                            }}
                          >
                            🎵 Listen on YouTube →
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SECTION 12: NUTRITIONAL DEFICIENCY INDICATORS */}
          <div style={{
            background: 'rgba(255,255,255,.03)',
            border: '1px solid rgba(255,255,255,0.24)',
            borderRadius: '16px',
            marginBottom: '14px',
            overflow: 'hidden'
          }}>
            <div className="section-header" onClick={() => toggleSection('12')}>
              <span>12 - Nutritional Deficiency Indicators</span>
              <span style={{ color: 'var(--rosegold)', transition: 'transform 0.2s', transform: expandedSections['12'] ? 'rotate(90deg)' : 'rotate(0)' }}>▸</span>
            </div>
            {expandedSections['12'] && (
              <div className="section-content">
                <p style={{ opacity: 0.8, marginBottom: '16px', fontSize: '0.85rem', lineHeight: '1.6', padding: '12px', background: 'rgba(218,165,127,.08)', borderRadius: '8px' }}>
                  <b>About This Assessment:</b> Based on clinical nutrition research, certain physical experiences may indicate nutritional gaps. This is NOT a diagnostic tool and does not diagnose conditions. We're simply noting frequency of experiences that nutritionists associate with potential nutrient insufficiency. Rate: 0 = Never, 1 = Occasionally, 2 = Frequently, 3 = Often
                </p>

                {[
                  { key: 'wellness_head', label: 'Head tension or pressure', deficiency: '(May indicate: Magnesium, B vitamins, or hydration needs)' },
                  { key: 'wellness_eyes', label: 'Eye dryness or light sensitivity', deficiency: '(May indicate: Vitamin A, Omega-3 fatty acids)' },
                  { key: 'wellness_ears', label: 'Ear sensitivity or ringing', deficiency: '(May indicate: B12, Zinc, Magnesium)' },
                  { key: 'wellness_nose', label: 'Nasal dryness or congestion patterns', deficiency: '(May indicate: Vitamin C, Quercetin, adequate hydration)' },
                  { key: 'wellness_mouth', label: 'Mouth dryness or taste changes', deficiency: '(May indicate: Zinc, B vitamins, hydration)' },
                  { key: 'wellness_skin', label: 'Skin dryness or slow healing', deficiency: '(May indicate: Essential fatty acids, Vitamins A/C/E, Zinc)' },
                  { key: 'wellness_heart', label: 'Heart rhythm awareness or palpitations', deficiency: '(May indicate: Magnesium, Potassium, CoQ10)' },
                  { key: 'wellness_lungs', label: 'Breath depth limitations', deficiency: '(May indicate: Iron, B12, Magnesium)' },
                  { key: 'wellness_digestive', label: 'Digestive discomfort patterns', deficiency: '(May indicate: Digestive enzymes, Probiotics, Fiber)' },
                  { key: 'wellness_joints', label: 'Joint stiffness or discomfort', deficiency: '(May indicate: Omega-3s, Vitamin D, Collagen)' },
                  { key: 'wellness_energy', label: 'Energy dips or fatigue', deficiency: '(May indicate: Iron, B vitamins, Vitamin D)' },
                  { key: 'wellness_mind', label: 'Mental fog or concentration challenges', deficiency: '(May indicate: B vitamins, Omega-3s, Iron)' },
                  { key: 'wellness_emotions', label: 'Mood fluctuations', deficiency: '(May indicate: Omega-3s, B vitamins, Vitamin D)' },
                  { key: 'wellness_weight', label: 'Unexpected weight changes', deficiency: '(May indicate: Thyroid nutrients - Iodine, Selenium, Zinc)' }
                ].map(marker => (
                  <div key={marker.key} style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px', fontSize: '0.9rem', gap: '4px' }}>
                      <div>
                        {marker.label}: <span className="range-value">{formData[marker.key]}</span>
                      </div>
                      <span style={{ fontSize: '0.7rem', opacity: 0.7, fontStyle: 'italic' }}>{marker.deficiency}</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="3"
                      value={formData[marker.key]}
                      onChange={(e) => setFormData(prev => ({ ...prev, [marker.key]: parseInt(e.target.value) }))}
                      className="range-slider"
                    />
                  </div>
                ))}

                <div style={{
                  marginTop: '24px',
                  padding: '16px',
                  background: 'rgba(218,165,127,.08)',
                  borderRadius: '8px'
                }}>
                  <p style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '6px' }}>
                    Total Indicator Score: <span style={{ color: 'var(--rosegold)', fontSize: '1.3rem' }}>
                      {Object.keys(formData).filter(k => k.startsWith('wellness_')).reduce((sum, k) => sum + formData[k], 0)}
                    </span>
                  </p>
                  <p style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                    Higher scores may suggest areas where nutritional support could be beneficial. Always consult with a qualified nutritionist or healthcare provider for personalized guidance.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* SECTION 13: NOURISHMENT RHYTHM ASSESSMENT */}
          <div style={{
            background: 'rgba(255,255,255,.03)',
            border: '1px solid rgba(255,255,255,0.24)',
            borderRadius: '16px',
            marginBottom: '14px',
            overflow: 'hidden'
          }}>
            <div className="section-header" onClick={() => toggleSection('13')}>
              <span>13 - Nourishment Rhythm Assessment</span>
              <span style={{ color: 'var(--rosegold)', transition: 'transform 0.2s', transform: expandedSections['13'] ? 'rotate(90deg)' : 'rotate(0)' }}>▸</span>
            </div>
            {expandedSections['13'] && (
              <div className="section-content">
                <p style={{ opacity: 0.7, marginBottom: '16px', fontSize: '0.85rem' }}>
                  Help us understand your nutritional balance by selecting how often you include each food group:
                </p>

                {[
                  { key: 'protein_frequency', label: 'Quality Protein (animal or plant-based)', options: ['every_meal', 'twice_daily', 'once_daily', 'few_times_week', 'rarely'] },
                  { key: 'vegetable_frequency', label: 'Vegetables (especially leafy greens)', options: ['every_meal', 'twice_daily', 'once_daily', 'few_times_week', 'rarely'] },
                  { key: 'fruit_frequency', label: 'Fresh Fruits', options: ['multiple_daily', 'once_daily', 'few_times_week', 'weekly', 'rarely'] },
                  { key: 'grain_frequency', label: 'Whole Grains/Complex Carbs', options: ['every_meal', 'once_daily', 'few_times_week', 'weekly', 'avoid'] },
                  { key: 'healthy_fats', label: 'Healthy Fats (avocado, nuts, olive oil)', options: ['every_meal', 'once_daily', 'few_times_week', 'weekly', 'rarely'] }
                ].map(item => (
                  <div key={item.key} style={{ marginBottom: '20px' }}>
                    <p style={{ marginBottom: '10px', fontSize: '0.85rem', fontWeight: 600 }}>{item.label}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
                      {item.options.map(opt => (
                        <label key={opt} className={`option-label ${formData[item.key] === opt ? 'checked' : ''}`}>
                          <input type="radio" name={item.key} value={opt} checked={formData[item.key] === opt}
                            onChange={(e) => setFormData(prev => ({ ...prev, [item.key]: e.target.value }))} />
                          <span style={{ fontSize: '0.8rem' }}>{opt.replace(/_/g, ' ')}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                <p style={{ opacity: 0.7, marginBottom: '12px', fontSize: '0.85rem', marginTop: '24px' }}>Typical eating pattern:</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                  {['3_meals', '2_meals_snacks', 'grazing', 'omad', 'intermittent_fasting', 'intuitive'].map(pattern => (
                    <label key={pattern} className={`option-label ${formData.eating_pattern === pattern ? 'checked' : ''}`}>
                      <input type="radio" name="eating_pattern" value={pattern} checked={formData.eating_pattern === pattern}
                        onChange={(e) => setFormData(prev => ({ ...prev, eating_pattern: e.target.value }))} />
                      <span style={{ textTransform: 'capitalize' }}>{pattern.replace(/_/g, ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SECTION 14: SERVINGS PER WEEK */}
          <div style={{
            background: 'rgba(255,255,255,.03)',
            border: '1px solid rgba(255,255,255,0.24)',
            borderRadius: '16px',
            marginBottom: '14px',
            overflow: 'hidden'
          }}>
            <div className="section-header" onClick={() => toggleSection('14')}>
              <span>14 - Food Group Servings</span>
              <span style={{ color: 'var(--rosegold)', transition: 'transform 0.2s', transform: expandedSections['14'] ? 'rotate(90deg)' : 'rotate(0)' }}>▸</span>
            </div>
            {expandedSections['14'] && (
              <div className="section-content">
                <p style={{ opacity: 0.7, marginBottom: '16px', fontSize: '0.85rem' }}>
                  How many servings per week do you consume?
                </p>

                {[
                  { key: 'fruits_servings', label: 'Fruits (1 serving = 1 cup or 1 medium fruit)', max: 35 },
                  { key: 'veggies_servings', label: 'Vegetables (1 serving = 1 cup)', max: 50 },
                  { key: 'protein_servings', label: 'Protein (1 serving = 3-4 oz)', max: 30 },
                  { key: 'grains_servings', label: 'Grains/Starches (1 serving = 1/2 cup)', max: 30 },
                  { key: 'dairy_servings', label: 'Dairy (1 serving = 1 cup)', max: 25 }
                ].map(food => (
                  <div key={food.key} style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem' }}>
                      {food.label}: <b style={{ color: 'var(--rosegold)' }}>{formData[food.key]}/week</b>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max={food.max}
                      value={formData[food.key]}
                      onChange={(e) => setFormData(prev => ({ ...prev, [food.key]: parseInt(e.target.value) }))}
                      className="range-slider"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SECTION 15: DIET PATTERNS & CRAVINGS */}
          <div style={{
            background: 'rgba(255,255,255,.03)',
            border: '1px solid rgba(255,255,255,0.24)',
            borderRadius: '16px',
            marginBottom: '14px',
            overflow: 'hidden'
          }}>
            <div className="section-header" onClick={() => toggleSection('15')}>
              <span>15 - Diet Patterns & Cravings</span>
              <span style={{ color: 'var(--rosegold)', transition: 'transform 0.2s', transform: expandedSections['15'] ? 'rotate(90deg)' : 'rotate(0)' }}>▸</span>
            </div>
            {expandedSections['15'] && (
              <div className="section-content">
                <p style={{ opacity: 0.7, marginBottom: '12px', fontSize: '0.85rem' }}>Select all dietary patterns that apply to you:</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '20px' }}>
                  {['omnivore', 'vegetarian', 'vegan', 'pescatarian', 'keto', 'paleo', 'mediterranean', 'intermittent_fasting', 'carnivore', 'whole30'].map(diet => (
                    <label key={diet} className={`option-label ${formData.diet_types.includes(diet) ? 'checked' : ''}`}>
                      <input type="checkbox" checked={formData.diet_types.includes(diet)}
                        onChange={() => {
                          const newDiets = formData.diet_types.includes(diet)
                            ? formData.diet_types.filter(d => d !== diet)
                            : [...formData.diet_types, diet];
                          setFormData(prev => ({ ...prev, diet_types: newDiets }));
                        }} />
                      <span style={{ textTransform: 'capitalize' }}>{diet.replace(/_/g, ' ')}</span>
                    </label>
                  ))}
                </div>

                <p style={{ opacity: 0.7, marginBottom: '12px', fontSize: '0.85rem' }}>What do you crave most often?</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px' }}>
                  {['sweet', 'salty', 'bitter', 'sour', 'spicy', 'crunchy', 'creamy', 'carbs', 'caffeine', 'chocolate'].map(craving => (
                    <label key={craving} className={`option-label ${formData.food_cravings.includes(craving) ? 'checked' : ''}`}>
                      <input type="checkbox" checked={formData.food_cravings.includes(craving)}
                        onChange={() => handleCheckbox('food_cravings', craving)} />
                      <span style={{ textTransform: 'capitalize' }}>{craving}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SECTION 16: HYDRATION & BEVERAGES */}
          <div style={{
            background: 'rgba(255,255,255,.03)',
            border: '1px solid rgba(255,255,255,0.24)',
            borderRadius: '16px',
            marginBottom: '14px',
            overflow: 'hidden'
          }}>
            <div className="section-header" onClick={() => toggleSection('16')}>
              <span>16 - Hydration & Beverages</span>
              <span style={{ color: 'var(--rosegold)', transition: 'transform 0.2s', transform: expandedSections['16'] ? 'rotate(90deg)' : 'rotate(0)' }}>▸</span>
            </div>
            {expandedSections['16'] && (
              <div className="section-content">
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem' }}>
                    Daily water intake (ounces): <b style={{ color: 'var(--rosegold)' }}>{formData.water_oz} oz</b>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="150"
                    step="8"
                    value={formData.water_oz}
                    onChange={(e) => setFormData(prev => ({ ...prev, water_oz: parseInt(e.target.value) }))}
                    className="range-slider"
                  />
                </div>

                <p style={{ opacity: 0.7, marginBottom: '12px', fontSize: '0.85rem' }}>Water type/source:</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                  {['tap', 'filtered', 'spring', 'alkaline', 'distilled', 'sparkling', 'reverse_osmosis'].map(type => (
                    <label key={type} className={`option-label ${formData.water_type === type ? 'checked' : ''}`}>
                      <input type="radio" name="water_type" value={type} checked={formData.water_type === type}
                        onChange={(e) => setFormData(prev => ({ ...prev, water_type: e.target.value }))} />
                      <span style={{ textTransform: 'capitalize' }}>{type.replace(/_/g, ' ')}</span>
                    </label>
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="Caffeine intake (e.g., 2 cups coffee, 1 green tea daily)"
                  value={formData.caffeine_intake}
                  onChange={(e) => setFormData(prev => ({ ...prev, caffeine_intake: e.target.value }))}
                  style={{ marginBottom: '12px' }}
                />

                <input
                  type="text"
                  placeholder="Alcohol intake (e.g., 2-3 glasses wine/week, none)"
                  value={formData.alcohol_intake}
                  onChange={(e) => setFormData(prev => ({ ...prev, alcohol_intake: e.target.value }))}
                />
              </div>
            )}
          </div>

          {/* SECTION 17: TIME RESTRICTED EATING (TRE) */}
          <div style={{
            background: 'rgba(255,255,255,.03)',
            border: '1px solid rgba(255,255,255,0.24)',
            borderRadius: '16px',
            marginBottom: '14px',
            overflow: 'hidden'
          }}>
            <div className="section-header" onClick={() => toggleSection('17')}>
              <span>17 - Time Restricted Eating (TRE)</span>
              <span style={{ color: 'var(--rosegold)', transition: 'transform 0.2s', transform: expandedSections['17'] ? 'rotate(90deg)' : 'rotate(0)' }}>▸</span>
            </div>
            {expandedSections['17'] && (
              <div className="section-content">
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem' }}>
                    Eating window (hours per day): <b style={{ color: 'var(--rosegold)' }}>{formData.tre_window}h</b>
                  </label>
                  <input
                    type="range"
                    min="4"
                    max="16"
                    value={formData.tre_window}
                    onChange={(e) => setFormData(prev => ({ ...prev, tre_window: parseInt(e.target.value) }))}
                    className="range-slider"
                  />
                  <p style={{ fontSize: '0.7rem', opacity: 0.7, marginTop: '4px' }}>
                    Example: 12h = eating from 8am-8pm, 16h = no fasting
                  </p>
                </div>

                <input
                  type="text"
                  placeholder="Time of first meal (e.g., 7:30 AM)"
                  value={formData.first_meal_time}
                  onChange={(e) => setFormData(prev => ({ ...prev, first_meal_time: e.target.value }))}
                  style={{ marginBottom: '12px' }}
                />

                <input
                  type="text"
                  placeholder="Time of last meal (e.g., 7:00 PM)"
                  value={formData.last_meal_time}
                  onChange={(e) => setFormData(prev => ({ ...prev, last_meal_time: e.target.value }))}
                />
              </div>
            )}
          </div>

          {/* SECTION 18: FOOD SENSITIVITIES */}
          <div style={{
            background: 'rgba(255,255,255,.03)',
            border: '1px solid rgba(255,255,255,0.24)',
            borderRadius: '16px',
            marginBottom: '14px',
            overflow: 'hidden'
          }}>
            <div className="section-header" onClick={() => toggleSection('18')}>
              <span>18 - Food Sensitivities & Allergies</span>
              <span style={{ color: 'var(--rosegold)', transition: 'transform 0.2s', transform: expandedSections['18'] ? 'rotate(90deg)' : 'rotate(0)' }}>▸</span>
            </div>
            {expandedSections['18'] && (
              <div className="section-content">
                <p style={{ opacity: 0.7, marginBottom: '12px', fontSize: '0.85rem' }}>Select any known sensitivities or allergies:</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
                  {['gluten', 'dairy', 'eggs', 'soy', 'nuts', 'shellfish', 'nightshades', 'histamine', 'fodmap', 'corn', 'sugar', 'none'].map(sens => (
                    <label key={sens} className={`option-label ${formData.food_sensitivities.includes(sens) ? 'checked' : ''}`}>
                      <input type="checkbox" checked={formData.food_sensitivities.includes(sens)}
                        onChange={() => handleCheckbox('food_sensitivities', sens)} />
                      <span style={{ textTransform: 'capitalize' }}>{sens}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SECTION 19: SUPPLEMENTS & MEDICATIONS */}
          <div style={{
            background: 'rgba(255,255,255,.03)',
            border: '1px solid rgba(255,255,255,0.24)',
            borderRadius: '16px',
            marginBottom: '14px',
            overflow: 'hidden'
          }}>
            <div className="section-header" onClick={() => toggleSection('19')}>
              <span>19 - Supplements & Medications</span>
              <span style={{ color: 'var(--rosegold)', transition: 'transform 0.2s', transform: expandedSections['19'] ? 'rotate(90deg)' : 'rotate(0)' }}>▸</span>
            </div>
            {expandedSections['19'] && (
              <div className="section-content">
                <textarea
                  placeholder="List current supplements (name, dosage, frequency)&#10;Example: Vitamin D3 5000 IU daily, Magnesium 400mg before bed, Probiotics 50 billion CFU"
                  value={formData.supplements_list}
                  onChange={(e) => setFormData(prev => ({ ...prev, supplements_list: e.target.value }))}
                  rows={5}
                  style={{ marginBottom: '12px' }}
                />
                <textarea
                  placeholder="List current medications (name, dosage, purpose)&#10;Example: Synthroid 50mcg for hypothyroid, Metformin 500mg for blood sugar"
                  value={formData.medications_list}
                  onChange={(e) => setFormData(prev => ({ ...prev, medications_list: e.target.value }))}
                  rows={5}
                />
              </div>
            )}
          </div>

          {/* SECTION 20: GUT HEALTH & DIGESTION */}
          <div style={{
            background: 'rgba(255,255,255,.03)',
            border: '1px solid rgba(255,255,255,0.24)',
            borderRadius: '16px',
            marginBottom: '14px',
            overflow: 'hidden'
          }}>
            <div className="section-header" onClick={() => toggleSection('20')}>
              <span>20 - Gut Health & Digestion</span>
              <span style={{ color: 'var(--rosegold)', transition: 'transform 0.2s', transform: expandedSections['20'] ? 'rotate(90deg)' : 'rotate(0)' }}>▸</span>
            </div>
            {expandedSections['20'] && (
              <div className="section-content">
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--champagne)', opacity: 0.9 }}>
                    Bowel movements per day: <b style={{ color: 'var(--rosegold)' }}>{formData.bm_frequency}</b>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    value={formData.bm_frequency}
                    onChange={(e) => setFormData(prev => ({ ...prev, bm_frequency: parseInt(e.target.value) }))}
                    className="range-slider"
                  />
                </div>

                <p style={{ color: 'var(--champagne)', opacity: 0.7, marginBottom: '12px', fontSize: '0.85rem' }}>Stool consistency (Bristol scale):</p>
                <select
                  value={formData.stool_type}
                  onChange={(e) => setFormData(prev => ({ ...prev, stool_type: e.target.value }))}
                  style={{ marginBottom: '16px' }}
                >
                  <option value="">Choose...</option>
                  <option value="type1">Type 1: Hard lumps (severe constipation)</option>
                  <option value="type2">Type 2: Lumpy sausage (mild constipation)</option>
                  <option value="type3">Type 3: Cracked sausage (normal)</option>
                  <option value="type4">Type 4: Smooth snake (ideal)</option>
                  <option value="type5">Type 5: Soft blobs (lacking fiber)</option>
                  <option value="type6">Type 6: Mushy (mild diarrhea)</option>
                  <option value="type7">Type 7: Liquid (severe diarrhea)</option>
                </select>

                <p style={{ color: 'var(--champagne)', opacity: 0.7, marginBottom: '12px', fontSize: '0.85rem' }}>Digestive concerns:</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
                  {['bloating', 'gas', 'constipation', 'diarrhea', 'reflux', 'cramps', 'nausea', 'food_intolerance', 'ibs', 'none'].map(flag => (
                    <label key={flag} className={`option-label ${formData.digest_flags.includes(flag) ? 'checked' : ''}`}>
                      <input type="checkbox" checked={formData.digest_flags.includes(flag)}
                        onChange={() => handleCheckbox('digest_flags', flag)} />
                      <span style={{ textTransform: 'capitalize' }}>{flag.replace(/_/g, ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SECTION 21: SLEEP HYGIENE & PATTERNS */}
          <div style={{
            background: 'rgba(255,255,255,.03)',
            border: '1px solid rgba(255,255,255,0.24)',
            borderRadius: '16px',
            marginBottom: '14px',
            overflow: 'hidden'
          }}>
            <div className="section-header" onClick={() => toggleSection('21')}>
              <span>21 - Sleep Hygiene & Patterns</span>
              <span style={{ color: 'var(--rosegold)', transition: 'transform 0.2s', transform: expandedSections['21'] ? 'rotate(90deg)' : 'rotate(0)' }}>▸</span>
            </div>
            {expandedSections['21'] && (
              <div className="section-content">
                <p style={{ opacity: 0.8, marginBottom: '16px', fontSize: '0.85rem', lineHeight: '1.6', padding: '12px', background: 'rgba(218,165,127,.08)', borderRadius: '8px' }}>
                  <b>Sleep Quality Assessment:</b> Quality sleep is foundational to wellness. This assessment helps us understand your sleep patterns and environment to provide personalized support.
                </p>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>
                    Average hours of sleep per night: <span className="range-value">{formData.sleep_hours}h</span>
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="12"
                    value={formData.sleep_hours}
                    onChange={(e) => setFormData(prev => ({ ...prev, sleep_hours: parseInt(e.target.value) }))}
                    className="range-slider"
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>
                    Sleep quality (1=Poor, 10=Excellent): <span className="range-value">{formData.sleep_quality}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.sleep_quality}
                    onChange={(e) => setFormData(prev => ({ ...prev, sleep_quality: parseInt(e.target.value) }))}
                    className="range-slider"
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <p style={{ marginBottom: '10px', fontSize: '0.9rem', fontWeight: 600 }}>Typical bedtime:</p>
                  <input
                    type="text"
                    placeholder="e.g., 10:30 PM"
                    value={formData.bedtime || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, bedtime: e.target.value }))}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <p style={{ marginBottom: '10px', fontSize: '0.9rem', fontWeight: 600 }}>Typical wake time:</p>
                  <input
                    type="text"
                    placeholder="e.g., 6:30 AM"
                    value={formData.wake_time || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, wake_time: e.target.value }))}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <p style={{ marginBottom: '10px', fontSize: '0.9rem', fontWeight: 600 }}>How long does it typically take you to fall asleep?</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
                    {['0-15 min', '15-30 min', '30-60 min', 'over 1 hour'].map(time => (
                      <label key={time} className={`option-label ${formData.sleep_latency === time ? 'checked' : ''}`}>
                        <input type="radio" name="sleep_latency" value={time} checked={formData.sleep_latency === time}
                          onChange={(e) => setFormData(prev => ({ ...prev, sleep_latency: e.target.value }))} />
                        <span style={{ fontSize: '0.85rem' }}>{time}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <p style={{ marginBottom: '10px', fontSize: '0.9rem', fontWeight: 600 }}>How often do you wake during the night?</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
                    {['rarely', '1-2 times', '3-4 times', '5+ times'].map(freq => (
                      <label key={freq} className={`option-label ${formData.night_wakings === freq ? 'checked' : ''}`}>
                        <input type="radio" name="night_wakings" value={freq} checked={formData.night_wakings === freq}
                          onChange={(e) => setFormData(prev => ({ ...prev, night_wakings: e.target.value }))} />
                        <span style={{ fontSize: '0.85rem', textTransform: 'capitalize' }}>{freq}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <p style={{ marginBottom: '10px', fontSize: '0.9rem', fontWeight: 600 }}>Sleep environment (select all that apply):</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
                    {['dark_room', 'quiet', 'cool_temp', 'comfortable_bed', 'screens_in_room', 'partner_snores', 'pets_in_bed', 'street_noise'].map(env => (
                      <label key={env} className={`option-label ${(formData.sleep_environment || []).includes(env) ? 'checked' : ''}`}>
                        <input type="checkbox" checked={(formData.sleep_environment || []).includes(env)}
                          onChange={() => {
                            const current = formData.sleep_environment || [];
                            const newEnv = current.includes(env)
                              ? current.filter(e => e !== env)
                              : [...current, env];
                            setFormData(prev => ({ ...prev, sleep_environment: newEnv }));
                          }} />
                        <span style={{ fontSize: '0.8rem' }}>{env.replace(/_/g, ' ')}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <p style={{ marginBottom: '10px', fontSize: '0.9rem', fontWeight: 600 }}>Pre-bedtime routine (select all that apply):</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
                    {['screen_time', 'reading', 'meditation', 'bath_shower', 'aromatherapy', 'herbal_tea', 'light_snack', 'exercise', 'no_routine'].map(routine => (
                      <label key={routine} className={`option-label ${(formData.bedtime_routine || []).includes(routine) ? 'checked' : ''}`}>
                        <input type="checkbox" checked={(formData.bedtime_routine || []).includes(routine)}
                          onChange={() => {
                            const current = formData.bedtime_routine || [];
                            const newRoutine = current.includes(routine)
                              ? current.filter(r => r !== routine)
                              : [...current, routine];
                            setFormData(prev => ({ ...prev, bedtime_routine: newRoutine }));
                          }} />
                        <span style={{ fontSize: '0.8rem' }}>{routine.replace(/_/g, ' ')}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>
                    Current stress level (1=Low, 10=High): <span className="range-value">{formData.stress_level}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.stress_level}
                    onChange={(e) => setFormData(prev => ({ ...prev, stress_level: parseInt(e.target.value) }))}
                    className="range-slider"
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>
                    Daytime energy level (1=Low, 10=High): <span className="range-value">{formData.energy_level}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.energy_level}
                    onChange={(e) => setFormData(prev => ({ ...prev, energy_level: parseInt(e.target.value) }))}
                    className="range-slider"
                  />
                </div>

                <div>
                  <p style={{ marginBottom: '10px', fontSize: '0.9rem', fontWeight: 600 }}>Sleep challenges (select all that apply):</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
                    {['difficulty_falling_asleep', 'staying_asleep', 'early_waking', 'restless_sleep', 'snoring', 'night_sweats', 'racing_thoughts', 'nightmares', 'none'].map(challenge => (
                      <label key={challenge} className={`option-label ${(formData.sleep_challenges || []).includes(challenge) ? 'checked' : ''}`}>
                        <input type="checkbox" checked={(formData.sleep_challenges || []).includes(challenge)}
                          onChange={() => {
                            const current = formData.sleep_challenges || [];
                            const newChallenges = current.includes(challenge)
                              ? current.filter(c => c !== challenge)
                              : [...current, challenge];
                            setFormData(prev => ({ ...prev, sleep_challenges: newChallenges }));
                          }} />
                        <span style={{ fontSize: '0.8rem' }}>{challenge.replace(/_/g, ' ')}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SECTION 22: GOALS & ACHIEVEMENT SUPPORT */}
          <div style={{
            background: 'rgba(255,255,255,.03)',
            border: '1px solid rgba(255,255,255,0.24)',
            borderRadius: '16px',
            marginBottom: '14px',
            overflow: 'hidden'
          }}>
            <div className="section-header" onClick={() => toggleSection('22')}>
              <span>22 - Goals & Support Preferences</span>
              <span style={{ color: 'var(--rosegold)', transition: 'transform 0.2s', transform: expandedSections['22'] ? 'rotate(90deg)' : 'rotate(0)' }}>▸</span>
            </div>
            {expandedSections['22'] && (
              <div className="section-content">
                <p style={{ opacity: 0.8, marginBottom: '16px', fontSize: '0.85rem', lineHeight: '1.6', padding: '12px', background: 'rgba(218,165,127,.08)', borderRadius: '8px' }}>
                  <b>Why This Matters:</b> Understanding your commitment style, motivation, and support needs helps us create a personalized approach that honors your unique journey and sets you up for lasting success.
                </p>

                <div style={{ marginBottom: '20px' }}>
                  <p style={{ marginBottom: '10px', fontSize: '0.9rem', fontWeight: 600 }}>What is your commitment level to this wellness journey?</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
                    {['exploring', 'ready_to_start', 'committed', 'all_in'].map(level => (
                      <label key={level} className={`option-label ${formData.commitment_level === level ? 'checked' : ''}`}>
                        <input type="radio" name="commitment_level" value={level} checked={formData.commitment_level === level}
                          onChange={(e) => setFormData(prev => ({ ...prev, commitment_level: e.target.value }))} />
                        <span style={{ textTransform: 'capitalize', fontSize: '0.85rem' }}>{level.replace(/_/g, ' ')}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <p style={{ marginBottom: '10px', fontSize: '0.9rem', fontWeight: 600 }}>What best describes your motivation style?</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
                    {['self_motivated', 'needs_structure', 'goal_driven', 'habit_based', 'inspiration_driven'].map(type => (
                      <label key={type} className={`option-label ${formData.motivation_type === type ? 'checked' : ''}`}>
                        <input type="radio" name="motivation_type" value={type} checked={formData.motivation_type === type}
                          onChange={(e) => setFormData(prev => ({ ...prev, motivation_type: e.target.value }))} />
                        <span style={{ textTransform: 'capitalize', fontSize: '0.85rem' }}>{type.replace(/_/g, ' ')}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <p style={{ marginBottom: '10px', fontSize: '0.9rem', fontWeight: 600 }}>How do you prefer to work?</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
                    {['independently', 'one_on_one', 'small_group', 'community', 'hybrid'].map(pref => (
                      <label key={pref} className={`option-label ${formData.support_preference === pref ? 'checked' : ''}`}>
                        <input type="radio" name="support_preference" value={pref} checked={formData.support_preference === pref}
                          onChange={(e) => setFormData(prev => ({ ...prev, support_preference: e.target.value }))} />
                        <span style={{ textTransform: 'capitalize', fontSize: '0.85rem' }}>{pref.replace(/_/g, ' ')}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <p style={{ marginBottom: '10px', fontSize: '0.9rem', fontWeight: 600 }}>How much accountability support do you need?</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
                    {['minimal', 'moderate', 'frequent', 'intensive'].map(need => (
                      <label key={need} className={`option-label ${formData.accountability_need === need ? 'checked' : ''}`}>
                        <input type="radio" name="accountability_need" value={need} checked={formData.accountability_need === need}
                          onChange={(e) => setFormData(prev => ({ ...prev, accountability_need: e.target.value }))} />
                        <span style={{ textTransform: 'capitalize' }}>{need}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <p style={{ marginBottom: '10px', fontSize: '0.9rem', fontWeight: 600 }}>What is your learning style?</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
                    {['visual', 'auditory', 'hands_on', 'reading', 'mixed'].map(style => (
                      <label key={style} className={`option-label ${formData.learning_style === style ? 'checked' : ''}`}>
                        <input type="radio" name="learning_style" value={style} checked={formData.learning_style === style}
                          onChange={(e) => setFormData(prev => ({ ...prev, learning_style: e.target.value }))} />
                        <span style={{ textTransform: 'capitalize', fontSize: '0.85rem' }}>{style.replace(/_/g, ' ')}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <p style={{ marginBottom: '10px', fontSize: '0.9rem', fontWeight: 600 }}>Time you can realistically dedicate daily:</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
                    {['5_10_min', '15_20_min', '30_45_min', '1_hour_plus', 'varies'].map(time => (
                      <label key={time} className={`option-label ${formData.time_availability === time ? 'checked' : ''}`}>
                        <input type="radio" name="time_availability" value={time} checked={formData.time_availability === time}
                          onChange={(e) => setFormData(prev => ({ ...prev, time_availability: e.target.value }))} />
                        <span style={{ fontSize: '0.85rem' }}>{time.replace(/_/g, ' ')}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <p style={{ marginBottom: '10px', fontSize: '0.9rem', fontWeight: 600 }}>What obstacles have prevented you from reaching wellness goals in the past? (select all that apply)</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
                    {['lack_of_time', 'lack_of_support', 'overwhelm', 'inconsistency', 'unclear_direction', 'cost', 'health_limitations', 'motivation', 'information_overload'].map(obstacle => (
                      <label key={obstacle} className={`option-label ${formData.obstacles.includes(obstacle) ? 'checked' : ''}`}>
                        <input type="checkbox" checked={formData.obstacles.includes(obstacle)}
                          onChange={() => {
                            const newObstacles = formData.obstacles.includes(obstacle)
                              ? formData.obstacles.filter(o => o !== obstacle)
                              : [...formData.obstacles, obstacle];
                            setFormData(prev => ({ ...prev, obstacles: newObstacles }));
                          }} />
                        <span style={{ textTransform: 'capitalize', fontSize: '0.85rem' }}>{obstacle.replace(/_/g, ' ')}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <p style={{ marginBottom: '10px', fontSize: '0.9rem', fontWeight: 600 }}>How will you measure success? (select your top priorities)</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
                    {['how_i_feel', 'energy_levels', 'sleep_quality', 'body_changes', 'lab_markers', 'daily_habits', 'mental_clarity', 'emotional_balance', 'pain_reduction', 'performance'].map(metric => (
                      <label key={metric} className={`option-label ${formData.success_metrics.includes(metric) ? 'checked' : ''}`}>
                        <input type="checkbox" checked={formData.success_metrics.includes(metric)}
                          onChange={() => {
                            const newMetrics = formData.success_metrics.includes(metric)
                              ? formData.success_metrics.filter(m => m !== metric)
                              : [...formData.success_metrics, metric];
                            setFormData(prev => ({ ...prev, success_metrics: newMetrics }));
                          }} />
                        <span style={{ textTransform: 'capitalize', fontSize: '0.85rem' }}>{metric.replace(/_/g, ' ')}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SECTION 23: DETOX & PURIFICATION */}
          <div style={{
            background: 'rgba(255,255,255,.03)',
            border: '1px solid rgba(255,255,255,0.24)',
            borderRadius: '16px',
            marginBottom: '14px',
            overflow: 'hidden'
          }}>
            <div className="section-header" onClick={() => toggleSection('23')}>
              <span>23 - Detox & Purification</span>
              <span style={{ color: 'var(--rosegold)', transition: 'transform 0.2s', transform: expandedSections['23'] ? 'rotate(90deg)' : 'rotate(0)' }}>▸</span>
            </div>
            {expandedSections['23'] && (
              <div className="section-content">
                <p style={{ color: 'var(--champagne)', opacity: 0.7, marginBottom: '12px', fontSize: '0.85rem' }}>Detox duration preference:</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                  {['3_day', '7_day', '14_day', '30_day', 'ongoing'].map(dur => (
                    <label key={dur} className={`option-label ${formData.detox_duration === dur ? 'checked' : ''}`}>
                      <input type="radio" name="detox_duration" value={dur} checked={formData.detox_duration === dur}
                        onChange={(e) => setFormData(prev => ({ ...prev, detox_duration: e.target.value }))} />
                      <span style={{ color: 'var(--champagne)' }}>{dur.replace(/_/g, ' ')}</span>
                    </label>
                  ))}
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--champagne)', opacity: 0.9 }}>
                    Readiness for detox (1-10): <b style={{ color: 'var(--rosegold)' }}>{formData.detox_ready}</b>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.detox_ready}
                    onChange={(e) => setFormData(prev => ({ ...prev, detox_ready: parseInt(e.target.value) }))}
                    className="range-slider"
                  />
                </div>

                <p style={{ color: 'var(--champagne)', opacity: 0.7, marginBottom: '12px', fontSize: '0.85rem' }}>Purification support areas:</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
                  {['liver', 'kidney', 'lymph', 'skin', 'gut', 'full_system'].map(opt => (
                    <label key={opt} className={`option-label ${formData.detox_options.includes(opt) ? 'checked' : ''}`}>
                      <input type="checkbox" checked={formData.detox_options.includes(opt)}
                        onChange={() => handleCheckbox('detox_options', opt)} />
                      <span style={{ textTransform: 'capitalize', color: 'var(--champagne)' }}>{opt.replace(/_/g, ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SECTION 24: EMAIL & TERMS (REQUIRED) */}
          <div style={{
            background: 'rgba(255,255,255,.03)',
            border: '1px solid rgba(255,255,255,0.24)',
            borderRadius: '16px',
            marginBottom: '14px',
            overflow: 'hidden'
          }}>
            <div className="section-header" onClick={() => toggleSection('24')}>
              <span>24 - Email & Educational Disclaimer <span style={{ color: 'var(--rosegold)', fontWeight: 700 }}>(required)</span></span>
              <span style={{ color: 'var(--rosegold)', transition: 'transform 0.2s', transform: expandedSections['24'] ? 'rotate(90deg)' : 'rotate(0)' }}>▸</span>
            </div>
            {expandedSections['24'] && (
              <div className="section-content">
                <p style={{ opacity: 0.7, marginBottom: '12px', fontSize: '0.85rem' }}>
                  We'll send your personalized wellness plan to this address.
                </p>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                  style={{ marginBottom: '20px' }}
                />

                <div style={{
                  padding: '20px',
                  background: 'rgba(218,165,127,.10)',
                  border: '2px solid rgba(218,165,127,.40)',
                  borderRadius: '12px',
                  marginBottom: '16px'
                }}>
                  <p style={{
                    color: 'var(--champagne)',
                    fontSize: '0.85rem',
                    lineHeight: '1.7',
                    marginBottom: '12px',
                    fontWeight: 600
                  }}>
                    ⚠️ IMPORTANT EDUCATIONAL DISCLAIMER
                  </p>
                  <p style={{
                   color: 'var(--champagne)',
                   fontSize: '0.78rem',
                   lineHeight: '1.6',
                   marginBottom: '10px'
                  }}>
                   <strong>Educational & Wellness Purposes Only:</strong> This intake and all recommendations provided are for educational and general wellness information only. This is NOT medical advice, diagnosis, or treatment. We are not healthcare providers and do not diagnose, treat, or cure any condition.
                  </p>
                  <p style={{
                   color: 'var(--champagne)',
                   fontSize: '0.78rem',
                   lineHeight: '1.6',
                   marginBottom: '10px'
                  }}>
                   <strong>Consult Your Healthcare Provider:</strong> Always consult with a qualified, licensed healthcare professional before starting any wellness program, making dietary changes, or using botanical products—especially if you are pregnant, nursing, taking medications, or have any health concerns.
                  </p>
                  <p style={{
                   color: 'var(--champagne)',
                   fontSize: '0.78rem',
                   lineHeight: '1.6',
                   marginBottom: '10px'
                  }}>
                   <strong>Essential Oil Safety:</strong> Essential oils and botanical products are highly concentrated. Keep out of reach of children and pets. Always dilute properly before topical use. Use extreme caution around infants, young children, pregnant/nursing individuals, and pets.
                  </p>
                  <p style={{
                   color: 'var(--champagne)',
                   fontSize: '0.78rem',
                   lineHeight: '1.6',
                   marginBottom: '10px'
                  }}>
                   <strong>Privacy & Data Sharing:</strong> Your information will be shared with your designated wellness associate for the purpose of creating personalized wellness recommendations. Your data will NOT be sold or shared with third parties. By submitting this intake, you consent to allowing your wellness associate to access and use this information solely for providing you with customized wellness support and product recommendations.
                  </p>
                  <p style={{
                   color: 'var(--champagne)',
                   fontSize: '0.78rem',
                   lineHeight: '1.6'
                  }}>
                   <strong>No Guarantees:</strong> Individual results may vary. These statements have not been evaluated by the FDA. Products and recommendations are not intended to diagnose, treat, cure, or prevent any disease.
                  </p>
                </div>

                <label className={`option-label ${formData.terms_accepted ? 'checked' : ''}`} style={{
                  padding: '16px',
                  background: formData.terms_accepted ? 'rgba(218,165,127,.15)' : 'rgba(255,255,255,.045)',
                  border: formData.terms_accepted ? '2px solid var(--rosegold)' : '1px solid rgba(255,255,255,.18)',
                  cursor: 'pointer'
                }}>
                  <input
                    type="checkbox"
                    checked={formData.terms_accepted}
                    onChange={(e) => setFormData(prev => ({ ...prev, terms_accepted: e.target.checked }))}
                    required
                  />
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                    I have read and agree to the educational disclaimer above. I understand this is for wellness information only and not medical advice.
                  </span>
                </label>
              </div>
            )}
          </div>

          {/* Disclaimer - BEFORE buttons */}
          <div style={{
            marginTop: '32px',
            marginBottom: '18px',
            opacity: 0.75,
            fontSize: '0.84rem',
            textAlign: 'center',
            color: 'var(--champagne)',
            fontStyle: 'italic'
          }}>
            Educational purposes only — not medical advice. Always consult your healthcare provider.
          </div>

          {/* Action Buttons - Snapshot/Rollback/Reset */}
          <div style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '18px'
          }}>
            <button
              type="button"
              onClick={() => {
                const snapshot = JSON.stringify(formData);
                const prev = localStorage.getItem('iterra_intake');
                if (prev) localStorage.setItem('iterra_intake_prev', prev);
                localStorage.setItem('iterra_intake', snapshot);
                alert('✅ Snapshot saved! You can roll back if needed.');
              }}
              style={{
                borderRadius: '999px',
                padding: '10px 14px',
                border: '1px solid rgba(246,230,206,.35)',
                background: 'transparent',
                color: 'var(--champagne)',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.9rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(218,165,127,.15)';
                e.currentTarget.style.borderColor = 'var(--rosegold)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(246,230,206,.35)';
              }}
            >
              💾 Save Snapshot
            </button>

            <button
              type="button"
              onClick={() => {
                const prev = localStorage.getItem('iterra_intake_prev');
                if (!prev) {
                  alert('No previous snapshot found');
                  return;
                }
                const data = JSON.parse(prev);
                setFormData(data);
                localStorage.setItem('iterra_intake', prev);
                localStorage.removeItem('iterra_intake_prev');
                alert('⏮️ Rolled back to previous snapshot');
              }}
              style={{
                borderRadius: '999px',
                padding: '10px 14px',
                border: '1px solid rgba(246,230,206,.35)',
                background: 'transparent',
                color: 'var(--champagne)',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.9rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(218,165,127,.15)';
                e.currentTarget.style.borderColor = 'var(--rosegold)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(246,230,206,.35)';
              }}
            >
              ⏮️ Rollback
            </button>

            <button
              type="button"
              onClick={() => {
                if (!confirm('Clear all form data? This cannot be undone.')) return;
                setFormData({
                  email: '', who: '', age: '', goals: [],
                  fullReset: false,
                  approach: '', approach_plus: '', experience: '', use: [], aromas: [],
                  moodcues: [], female_focus: [], pregnant: false, cycleDay: 14,
                  cycle_status: '', cycle_length: 28, flow_days: 5, pms_symptoms: [],
                  dosha: '',
                  dosha_quiz: {
                    body_frame: '', weight: '', skin: '', hair: '', temp: '',
                    digestion: '', sleep: '', energy: '', stress_response: '', speech: ''
                  },
                  zodiac: '', chakras: [],
                  chakra_quiz: { symptoms: [], color_drawn: [] },
                  frequencies: [],
                  wellness_head: 0, wellness_eyes: 0, wellness_ears: 0, wellness_nose: 0, wellness_mouth: 0, wellness_skin: 0,
                  wellness_heart: 0, wellness_lungs: 0, wellness_digestive: 0, wellness_joints: 0, wellness_energy: 0,
                  wellness_mind: 0, wellness_emotions: 0, wellness_weight: 0,
                  protein_frequency: '', vegetable_frequency: '', fruit_frequency: '',
                  grain_frequency: '', healthy_fats: '', eating_pattern: '',
                  fruits_servings: 0, veggies_servings: 0, protein_servings: 0,
                  grains_servings: 0, dairy_servings: 0,
                  diet_types: [], food_cravings: [],
                  water_oz: 64, water_type: '', caffeine_intake: '', alcohol_intake: '',
                  tre_window: 12, first_meal_time: '', last_meal_time: '',
                  bm_frequency: 1, stool_type: '', digest_flags: [],
                  supplements_list: '', medications_list: '',
                  detox_duration: '', detox_ready: 5, detox_options: [], sleep_hours: 7,
                  sleep_quality: 5, stress_level: 4, energy_level: 6,
                  food_sensitivities: [],
                  bedtime: '',
                  wake_time: '',
                  sleep_latency: '',
                  night_wakings: '',
                  sleep_environment: [],
                  bedtime_routine: [],
                  sleep_challenges: [],
                  commitment_level: '', motivation_type: '', support_preference: '',
                  accountability_need: '', learning_style: '', time_availability: '',
                  obstacles: [], success_metrics: [],
                  terms_accepted: false
                });
                localStorage.removeItem('iterra_intake');
                localStorage.removeItem('iterra_intake_prev');
                alert('🔄 Form cleared and reset');
              }}
              style={{
                borderRadius: '999px',
                padding: '10px 14px',
                border: '1px solid rgba(246,230,206,.35)',
                background: 'transparent',
                color: 'var(--champagne)',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.9rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(218,165,127,.15)';
                e.currentTarget.style.borderColor = 'var(--rosegold)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(246,230,206,.35)';
              }}
            >
              🔄 Start Over
            </button>
          </div>

          {/* Submit Button */}
          <button type="submit" style={{
            marginTop: '12px',
            width: '100%',
            padding: '14px 18px',
            borderRadius: '999px',
            border: '1px solid var(--rosegold)',
            color: 'var(--champagne)',
            background: 'transparent',
            fontWeight: 800,
            letterSpacing: '.02em',
            cursor: 'pointer',
            transition: 'all .25s ease',
            fontFamily: "'Cinzel', serif",
            boxShadow: '0 0 20px rgba(218,165,127,.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(90deg, var(--rosegold), #E6B7A9)';
            e.currentTarget.style.color = '#2b1f1c';
            e.currentTarget.style.boxShadow = '0 0 30px rgba(218,165,127,.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--champagne)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(218,165,127,.3)';
          }}>
            Submit Wellness Intake 🪷
          </button>
        </form>
      </div>
    </div>
  );
}