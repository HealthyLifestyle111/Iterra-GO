import React from "react";
import { Award } from "lucide-react";

export default function UniversityBlueprint({ setActiveSection }) {
  return (
    <div>
      <div style={{padding:32,borderRadius:20,background:"linear-gradient(135deg, rgba(218,165,112,0.20), rgba(245,222,179,0.10))",border:"2px solid rgba(218,165,112,0.4)",marginBottom:32,boxShadow:"0 12px 40px rgba(0,0,0,0.6)"}}>
        <div style={{textAlign:"center",marginBottom:20}}>
          <Award className="w-12 h-12" style={{color:"var(--rosegold)",margin:"0 auto 16px"}} />
          <h2 style={{fontSize:32,color:"var(--champagne)",fontWeight:700,marginBottom:8,letterSpacing:"0.5px"}}>iTerra University</h2>
          <p style={{fontSize:16,color:"var(--rosegold)",lineHeight:1.7,marginBottom:16}}>
            A Comprehensive Architecture for a Modern Wellness Empire
          </p>
          <p style={{fontSize:13,color:"rgba(245,222,179,0.85)",lineHeight:1.6,fontStyle:"italic"}}>
            The structured, prestigious luxury education system that transforms customers into leaders, leaders into influencers, and influencers into wellness professionals.
          </p>
        </div>
      </div>

      {/* PART I - THE CORE SYSTEM ARCHITECTURE */}
      <div style={{marginBottom:32}}>
        <div style={{padding:20,borderRadius:12,background:"rgba(218,165,112,0.12)",border:"1px solid rgba(218,165,112,0.25)",marginBottom:20}}>
          <h3 style={{fontSize:24,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>PART I — THE CORE SYSTEM ARCHITECTURE</h3>
          <p style={{fontSize:14,color:"var(--rosegold)",lineHeight:1.7}}>
            iTerra University is your central platform - a complete curriculum system with four integrated tracks.
          </p>
        </div>

        {/* Track A - Onboarding */}
        <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)",marginBottom:16}}>
          <h4 style={{fontSize:18,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>A. Onboarding Track (Foundation)</h4>
          <ul style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.9,paddingLeft:20}}>
            <li>iTerra Orientation</li>
            <li>doTERRA product fundamentals</li>
            <li>Safety, ethics & proper usage</li>
            <li>The iTerra Experience Method™ (story + experience selling)</li>
            <li>How referrals create real income</li>
          </ul>
          <button
            onClick={() => setActiveSection('tier1')}
            style={{marginTop:16,padding:"12px 18px",borderRadius:10,background:"rgba(245,222,179,0.1)",border:"1px solid rgba(245,222,179,0.2)",color:"var(--champagne)",fontWeight:700,cursor:"pointer",fontSize:13,width:"100%"}}
          >
            Access Onboarding Track (Tier 1) →
          </button>
        </div>

        {/* Track B - Influencer Integration */}
        <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)",marginBottom:16}}>
          <h4 style={{fontSize:18,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>B. Influencer Integration Track (Digital Expansion)</h4>
          <ul style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.9,paddingLeft:20}}>
            <li>The Psychology of Influence</li>
            <li>Creating magnetic personal narratives</li>
            <li>High-impact content (Instagram, TikTok, YouTube Shorts)</li>
            <li>Simple scripts for Reels, Stories, and Lives</li>
            <li>Strategic posting model (NOT daily content)</li>
            <li>Authenticity-driven influencer sales</li>
            <li>Turning engagement into conversation → into sales</li>
            <li>Cross-platform content repurposing</li>
            <li>Personal brand identity building</li>
          </ul>
          <button
            onClick={() => setActiveSection('tier2')}
            style={{marginTop:16,padding:"12px 18px",borderRadius:10,background:"rgba(245,222,179,0.1)",border:"1px solid rgba(245,222,179,0.2)",color:"var(--champagne)",fontWeight:700,cursor:"pointer",fontSize:13,width:"100%"}}
          >
            Access Influencer Track (Tier 2) →
          </button>
        </div>

        {/* Track C - Real-World Leadership */}
        <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)",marginBottom:16}}>
          <h4 style={{fontSize:18,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>C. Real-World Wellness Leadership Track (Offline Expansion)</h4>
          <ul style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.9,paddingLeft:20}}>
            <li>How to host scent bars & aromatherapy lounges</li>
            <li>How to run community-based wellness experiences</li>
            <li>Micro-events (5–20 people) that convert</li>
            <li>Scripted demos for home gatherings</li>
            <li>Pet aromatherapy demonstrations</li>
            <li>Real-world referral systems</li>
            <li>Wellness circles, tasting tables & hands-on sampling</li>
            <li>How to sell experiences, not products</li>
          </ul>
          <button
            onClick={() => window.open('https://healthlifestyleservices.com', '_blank')}
            style={{marginTop:16,padding:"12px 18px",borderRadius:10,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:13,width:"100%"}}
          >
            Enroll in Real-World Leadership Track →
          </button>
        </div>

        {/* Track D - Certification Track */}
        <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
          <h4 style={{fontSize:18,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>D. Certification Track (Authority Layer)</h4>
          <p style={{fontSize:14,color:"var(--rosegold)",lineHeight:1.7,marginBottom:14}}>
            This is what elevates iTerra above every other team. Professional credentials with curriculum, assessments, practical hours, case studies, digital badges, and printable certificates.
          </p>
          
          <div style={{display:"grid",gap:12,marginTop:16}}>
            <div style={{padding:16,borderRadius:10,background:"rgba(218,165,112,0.06)",border:"1px solid rgba(218,165,112,0.1)"}}>
              <h5 style={{fontSize:15,color:"var(--champagne)",fontWeight:700,marginBottom:8}}>Detox Specialist Certification</h5>
              <p style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.6,marginBottom:10}}>
                6-module professional training on 30-90 day protocols, supplement stacking, client intake, and program sales.
              </p>
              <button
                onClick={() => window.open('https://healthlifestyleservices.com', '_blank')}
                style={{padding:"10px 14px",borderRadius:8,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:12,width:"100%"}}
              >
                Enroll →
              </button>
            </div>

            <div style={{padding:16,borderRadius:10,background:"rgba(218,165,112,0.06)",border:"1px solid rgba(218,165,112,0.1)"}}>
              <h5 style={{fontSize:15,color:"var(--champagne)",fontWeight:700,marginBottom:8}}>Nutrition Certification (People + Pets)</h5>
              <p style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.6,marginBottom:10}}>
                Functional nutrition, metabolic wellness, supplement protocols for humans and companion animals.
              </p>
              <button
                onClick={() => window.open('https://healthlifestyleservices.com', '_blank')}
                style={{padding:"10px 14px",borderRadius:8,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:12,width:"100%"}}
              >
                Enroll →
              </button>
            </div>

            <div style={{padding:16,borderRadius:10,background:"rgba(218,165,112,0.06)",border:"1px solid rgba(218,165,112,0.1)"}}>
              <h5 style={{fontSize:15,color:"var(--champagne)",fontWeight:700,marginBottom:8}}>Aromatherapy Practitioner – Level 1</h5>
              <p style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.6,marginBottom:10}}>
                Essential oil chemistry, safety protocols, basic clinical applications, and client consultation fundamentals.
              </p>
              <button
                onClick={() => window.open('https://healthlifestyleservices.com', '_blank')}
                style={{padding:"10px 14px",borderRadius:8,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:12,width:"100%"}}
              >
                Enroll →
              </button>
            </div>

            <div style={{padding:16,borderRadius:10,background:"rgba(218,165,112,0.06)",border:"1px solid rgba(218,165,112,0.1)"}}>
              <h5 style={{fontSize:15,color:"var(--champagne)",fontWeight:700,marginBottom:8}}>Aromatherapy Master – Level 2</h5>
              <p style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.6,marginBottom:10}}>
                Advanced blending, therapeutic applications, practitioner business models, case studies.
              </p>
              <button
                onClick={() => window.open('https://healthlifestyleservices.com', '_blank')}
                style={{padding:"10px 14px",borderRadius:8,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:12,width:"100%"}}
              >
                Enroll →
              </button>
            </div>

            <div style={{padding:16,borderRadius:10,background:"rgba(218,165,112,0.06)",border:"1px solid rgba(218,165,112,0.1)"}}>
              <h5 style={{fontSize:15,color:"var(--champagne)",fontWeight:700,marginBottom:8}}>Aromatherapy Clinical – Level 3</h5>
              <p style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.6,marginBottom:10}}>
                Clinical integration for licensed professionals, evidence-based protocols, medical documentation.
              </p>
              <button
                onClick={() => window.open('https://healthlifestyleservices.com', '_blank')}
                style={{padding:"10px 14px",borderRadius:8,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:12,width:"100%"}}
              >
                Enroll →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PART II - THE SELLING SYSTEM */}
      <div style={{marginBottom:32,marginTop:40}}>
        <div style={{padding:20,borderRadius:12,background:"rgba(218,165,112,0.12)",border:"1px solid rgba(218,165,112,0.25)",marginBottom:20}}>
          <h3 style={{fontSize:24,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>PART II — THE SELLING SYSTEM</h3>
          <h4 style={{fontSize:20,color:"var(--rosegold)",fontWeight:700,marginBottom:12}}>The iTerra Experience Method™</h4>
          <p style={{fontSize:14,color:"var(--rosegold)",lineHeight:1.7,marginBottom:16}}>
            The central "sales ideology" for your organization. This replaces all MLM nonsense with luxury wellness brand storytelling.
          </p>
        </div>

        <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
          <h5 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,marginBottom:14}}>The iTerra Experience Method™ Teaches:</h5>
          <ul style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.9,paddingLeft:20,marginBottom:16}}>
            <li>Tell your story elegantly</li>
            <li>Lead with experience, not pressure</li>
            <li>Demonstrate oils in real time</li>
            <li>Let the sensory experience do the convincing</li>
            <li>Share authentic results without hype</li>
            <li>Turn daily wellness routines into content</li>
            <li>Turn content into conversations</li>
            <li>Turn conversations into enrollments</li>
            <li>Turn enrollments into long-term customers</li>
          </ul>
          <button
            onClick={() => window.open('https://healthlifestyleservices.com', '_blank')}
            style={{padding:"14px 20px",borderRadius:10,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:14,width:"100%"}}
          >
            Master The iTerra Experience Method™ →
          </button>
        </div>
      </div>

      {/* PART III - THE INFLUENCER FORMULA */}
      <div style={{marginBottom:32}}>
        <div style={{padding:20,borderRadius:12,background:"rgba(218,165,112,0.12)",border:"1px solid rgba(218,165,112,0.25)",marginBottom:20}}>
          <h3 style={{fontSize:24,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>PART III — THE INFLUENCER FORMULA</h3>
          <p style={{fontSize:14,color:"var(--rosegold)",lineHeight:1.7}}>
            A Complete Modern Methodology. Not daily. Not hustle culture. Strategic.
          </p>
        </div>

        <div style={{display:"grid",gap:16}}>
          <div style={{padding:18,borderRadius:10,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
            <h5 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>1. Build Your Digital Presence</h5>
            <p style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.7,marginBottom:10}}>
              Step-by-step scripts for: Bio setup • Visual aesthetic • Brand tone • Signature story • Content categories • Anti-MLM transparency protocols
            </p>
          </div>

          <div style={{padding:18,borderRadius:10,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
            <h5 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>2. High-Leverage Content Types</h5>
            <div style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.8,paddingLeft:16}}>
              • 3 weekly Reels<br/>
              • 2 weekly Stories<br/>
              • 1 weekly "value" post<br/>
              • 1 weekly testimonial<br/>
              • 1 weekly "experience" video
            </div>
          </div>

          <div style={{padding:18,borderRadius:10,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
            <h5 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>3. Monetization Framework</h5>
            <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.8}}>
              Attraction → Curiosity → DM → Experience → Enrollment<br/>
              Plus: Referral incentives • Shareable scent experiences • Repeat-customer cycle • Customer-to-affiliate conversion models
            </p>
          </div>

          <div style={{padding:18,borderRadius:10,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
            <h5 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>4. Influence Without Selling</h5>
            <p style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.7,marginBottom:10}}>
              Scripts for: Unboxing • First impressions • Daily rituals • Before/after experiences • Pets + people integrated content • "Silent selling" (show, don't push) • Soft-close CTAs
            </p>
          </div>

          <div style={{padding:18,borderRadius:10,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
            <h5 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>5. Scaling Influence to Real Life</h5>
            <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.8}}>
              Bring followers into events • Turn online connections into customers • Host pop-up aromatherapy activations • Sell through story-driven micro-events • Expand through community partners
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveSection('tier2')}
          style={{marginTop:20,padding:"14px 20px",borderRadius:10,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:14,width:"100%"}}
        >
          Access Complete Influencer Formula Training →
        </button>
      </div>

      {/* PART IV - THE OFFLINE COMMUNITY SYSTEM */}
      <div style={{marginBottom:32}}>
        <div style={{padding:20,borderRadius:12,background:"rgba(218,165,112,0.12)",border:"1px solid rgba(218,165,112,0.25)",marginBottom:20}}>
          <h3 style={{fontSize:24,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>PART IV — THE OFFLINE COMMUNITY SYSTEM</h3>
          <h4 style={{fontSize:18,color:"var(--rosegold)",fontWeight:700,marginBottom:12}}>The Real-World Growth Engine</h4>
          <p style={{fontSize:14,color:"var(--rosegold)",lineHeight:1.7}}>
            Experience-driven, sensory-led, relationship-first. This creates community gravity—real influence.
          </p>
        </div>

        <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)",marginBottom:16}}>
          <h5 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,marginBottom:14}}>Offline Event Components:</h5>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10,marginBottom:16}}>
            <div style={{padding:12,borderRadius:8,background:"rgba(218,165,112,0.06)",border:"1px solid rgba(218,165,112,0.1)",fontSize:13,color:"var(--champagne)",textAlign:"center"}}>Scent Bars</div>
            <div style={{padding:12,borderRadius:8,background:"rgba(218,165,112,0.06)",border:"1px solid rgba(218,165,112,0.1)",fontSize:13,color:"var(--champagne)",textAlign:"center"}}>Aroma Lounges</div>
            <div style={{padding:12,borderRadius:8,background:"rgba(218,165,112,0.06)",border:"1px solid rgba(218,165,112,0.1)",fontSize:13,color:"var(--champagne)",textAlign:"center"}}>Wellness Circles</div>
            <div style={{padding:12,borderRadius:8,background:"rgba(218,165,112,0.06)",border:"1px solid rgba(218,165,112,0.1)",fontSize:13,color:"var(--champagne)",textAlign:"center"}}>Pop-Up Stations</div>
            <div style={{padding:12,borderRadius:8,background:"rgba(218,165,112,0.06)",border:"1px solid rgba(218,165,112,0.1)",fontSize:13,color:"var(--champagne)",textAlign:"center"}}>Pet Wellness Clinics</div>
            <div style={{padding:12,borderRadius:8,background:"rgba(218,165,112,0.06)",border:"1px solid rgba(218,165,112,0.1)",fontSize:13,color:"var(--champagne)",textAlign:"center"}}>Detox Workshops</div>
            <div style={{padding:12,borderRadius:8,background:"rgba(218,165,112,0.06)",border:"1px solid rgba(218,165,112,0.1)",fontSize:13,color:"var(--champagne)",textAlign:"center"}}>Aroma Mornings</div>
            <div style={{padding:12,borderRadius:8,background:"rgba(218,165,112,0.06)",border:"1px solid rgba(218,165,112,0.1)",fontSize:13,color:"var(--champagne)",textAlign:"center"}}>Home Gatherings</div>
            <div style={{padding:12,borderRadius:8,background:"rgba(218,165,112,0.06)",border:"1px solid rgba(218,165,112,0.1)",fontSize:13,color:"var(--champagne)",textAlign:"center"}}>Boutique Partnerships</div>
            <div style={{padding:12,borderRadius:8,background:"rgba(218,165,112,0.06)",border:"1px solid rgba(218,165,112,0.1)",fontSize:13,color:"var(--champagne)",textAlign:"center"}}>Gym/Yoga/Salon Collab</div>
          </div>

          <div style={{padding:14,borderRadius:8,background:"rgba(230,183,165,0.08)",border:"1px solid rgba(230,183,165,0.15)"}}>
            <p style={{fontSize:13,color:"var(--champagne)",fontWeight:700,marginBottom:8}}>Every Event Includes:</p>
            <p style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.7}}>
              Scripted flow • Sensory demos • Experience moments • Essential oil touch-points • Strategic upsell option • Enrollment close • Post-event follow-up method
            </p>
          </div>
        </div>

        <button
          onClick={() => window.open('https://healthlifestyleservices.com', '_blank')}
          style={{padding:"14px 20px",borderRadius:10,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:14,width:"100%"}}
        >
          Access Event Training & Scripts →
        </button>
      </div>

      {/* PART V - INFRASTRUCTURE FOR BASE 44 */}
      <div style={{marginBottom:32}}>
        <div style={{padding:20,borderRadius:12,background:"rgba(218,165,112,0.12)",border:"1px solid rgba(218,165,112,0.25)",marginBottom:20}}>
          <h3 style={{fontSize:24,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>PART V — THE INFRASTRUCTURE</h3>
          <p style={{fontSize:14,color:"var(--rosegold)",lineHeight:1.7}}>
            Technology + Platform Build-out: What Base 44 is building for iTerra University
          </p>
        </div>

        <div style={{display:"grid",gap:16}}>
          <div style={{padding:18,borderRadius:10,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
            <h5 style={{fontSize:15,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>A. iTerra University Portal (LMS)</h5>
            <p style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.7}}>
              Custom-branded learning management system • Modules, video lessons, quizzes • Progress tracking • Certificates • Leaderboards • Affiliate training paths
            </p>
          </div>

          <div style={{padding:18,borderRadius:10,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
            <h5 style={{fontSize:15,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>B. Website Infrastructure</h5>
            <p style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.7,marginBottom:10}}>
              Complete site structure: Home • iTerra Philosophy • iTerra University • Certifications • People + Pet Wellness • Aromatherapy • Community Events • Enroll With iTerra • Ambassador Program • Resource Library • Member Login
            </p>
          </div>

          <div style={{padding:18,borderRadius:10,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
            <h5 style={{fontSize:15,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>C. Branding Framework</h5>
            <p style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.7}}>
              Brand palette (luxury neutrals + metallic accents) • Typography suite (serif + modern sans) • High-end photography style guide • Iconography for each certification • Signature textures & patterns
            </p>
          </div>

          <div style={{padding:18,borderRadius:10,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
            <h5 style={{fontSize:15,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>D. Automation + Client Flow</h5>
            <p style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.7}}>
              New member onboarding automation • Certification enrollment flow • Reminders + sequences • Influencer starter kit delivery • Event kit request workflows • Repeat-customer nurture funnels
            </p>
          </div>

          <div style={{padding:18,borderRadius:10,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
            <h5 style={{fontSize:15,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>E. Content Library Build</h5>
            <p style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.7}}>
              Ready-made social media scripts • Influencer templates • Story sequences • Event marketing kits • Email funnels • Product education videos • Downloadable handouts
            </p>
          </div>
        </div>
      </div>

      {/* PART VI - THE LEADERSHIP LATTICE */}
      <div style={{marginBottom:32}}>
        <div style={{padding:20,borderRadius:12,background:"rgba(218,165,112,0.12)",border:"1px solid rgba(218,165,112,0.25)",marginBottom:20}}>
          <h3 style={{fontSize:24,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>PART VI — THE LEADERSHIP LATTICE™</h3>
          <p style={{fontSize:14,color:"var(--rosegold)",lineHeight:1.7}}>
            A ranking system that runs on merit and education—not "recruiting."
          </p>
        </div>

        <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
          <h5 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,marginBottom:14}}>Leadership Levels:</h5>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:16}}>
            {['Advocate', 'Guide', 'Specialist', 'Practitioner', 'Mentor', 'Director', 'Master Director', 'Executive Director', 'Crown Director'].map((level, idx) => (
              <div key={idx} style={{padding:10,borderRadius:8,background:"rgba(218,165,112,0.06)",border:"1px solid rgba(218,165,112,0.1)",fontSize:12,color:"var(--champagne)",textAlign:"center",fontWeight:600}}>
                {idx + 1}. {level}
              </div>
            ))}
          </div>
          <div style={{padding:14,borderRadius:8,background:"rgba(230,183,165,0.08)",border:"1px solid rgba(230,183,165,0.15)"}}>
            <p style={{fontSize:13,color:"var(--champagne)",fontWeight:700,marginBottom:8}}>Each Level Unlocks:</p>
            <p style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.7}}>
              Advanced courses • Speaking opportunities • Community leadership roles • Commission enhancements • Exclusive trainings
            </p>
          </div>
        </div>
      </div>

      {/* PART VII - BASE 44 DELIVERABLES */}
      <div style={{marginBottom:32}}>
        <div style={{padding:20,borderRadius:12,background:"rgba(218,165,112,0.12)",border:"1px solid rgba(218,165,112,0.25)",marginBottom:20}}>
          <h3 style={{fontSize:24,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>PART VII — BASE 44 IMPLEMENTATION ROADMAP</h3>
          <p style={{fontSize:14,color:"var(--rosegold)",lineHeight:1.7}}>
            Everything Base 44 Must Build, Deliver, and Execute
          </p>
        </div>

        <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
          <h5 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,marginBottom:14}}>Complete Deliverables List:</h5>
          <div style={{display:"grid",gap:8}}>
            {[
              'Brand Strategy (tone, visuals, story, luxury positioning)',
              'Complete iTerra University Platform',
              'Full Curriculum Upload & LMS Build',
              'Certification Program Design & Formatting',
              'Website Build (Full Architecture)',
              'Influencer Systems Packaging',
              'Offline Event Kit Design',
              'All Marketing Templates',
              'The Automation Ecosystem',
              'Ambassador/Influencer Starter Kits',
              'Product Knowledge Library',
              'Recruitment & Training Funnels',
              'Social Media Script Packs',
              'iTerra Success Method™ Training',
              'Leadership Lattice Development',
              'Video Scriptwriting + Filming Schedule',
              'Launch Timeline & Marketing Rollout'
            ].map((item, idx) => (
              <div key={idx} style={{padding:12,borderRadius:8,background:"rgba(218,165,112,0.06)",border:"1px solid rgba(218,165,112,0.1)",fontSize:12,color:"var(--rosegold)",display:"flex",alignItems:"center",gap:10}}>
                <span style={{color:"var(--champagne)",fontWeight:700}}>{idx + 1}.</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PART VIII - THE EMPIRE STATEMENT */}
      <div style={{marginBottom:32}}>
        <div style={{padding:28,borderRadius:16,background:"linear-gradient(135deg, rgba(218,165,112,0.20), rgba(185,135,93,0.15))",border:"2px solid rgba(218,165,112,0.4)",boxShadow:"0 12px 40px rgba(0,0,0,0.6)"}}>
          <h3 style={{fontSize:26,color:"var(--champagne)",fontWeight:700,marginBottom:16,textAlign:"center"}}>PART VIII — THE EMPIRE STATEMENT</h3>
          
          <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.06)",border:"1px solid rgba(245,222,179,0.15)",marginBottom:20}}>
            <h4 style={{fontSize:16,color:"var(--rosegold)",fontWeight:700,marginBottom:12}}>This System Creates:</h4>
            <ul style={{fontSize:14,color:"var(--champagne)",lineHeight:2,paddingLeft:20}}>
              <li>A modern influencer meets luxury-wellness business</li>
              <li>A unified training ecosystem</li>
              <li>A prestigious certification institution</li>
              <li>A scalable team model</li>
              <li>A digital + physical expansion engine</li>
              <li>A retention machine</li>
              <li>A culture of mastery</li>
              <li>A brand that feels like Louis Vuitton + Goop + doTERRA + Clinical Academy combined</li>
            </ul>
          </div>

          <div style={{textAlign:"center",padding:24,borderRadius:12,background:"rgba(230,183,165,0.15)",border:"1px solid rgba(230,183,165,0.25)"}}>
            <p style={{fontSize:18,color:"var(--champagne)",fontWeight:700,lineHeight:1.8,marginBottom:16}}>
              This is not an MLM team.<br/>
              This is not an influencer program.<br/>
              This is not a hobby business.
            </p>
            <p style={{fontSize:28,color:"var(--rosegold)",fontWeight:700,letterSpacing:"1px",textShadow:"0 0 20px rgba(230,183,165,0.5)"}}>
              This is iTerra™
            </p>
            <p style={{fontSize:14,color:"var(--champagne)",marginTop:8,fontStyle:"italic"}}>
              A wellness empire designed to last.
            </p>
          </div>
        </div>
      </div>

      {/* CONTINUING EDUCATION & REPLAYS */}
      <div style={{padding:20,borderRadius:12,background:"rgba(230,183,165,0.08)",border:"1px solid rgba(230,183,165,0.15)",marginTop:32}}>
        <h4 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>📚 Continuing Education Credits</h4>
        <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:12}}>
          All iTerra University certifications provide CEU credits for licensed practitioners (RN, ND, RD, LMT, etc.). Maintain your licensure while expanding your wellness expertise.
        </p>
        <p style={{fontSize:11,color:"var(--rosegold)",fontStyle:"italic"}}>
          ✨ Monthly masterclasses count as CEU credits. Tier 3 members get unlimited free access.
        </p>
      </div>

      <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)",marginTop:20}}>
        <h4 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>📹 Masterclass Replay Library</h4>
        <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:14}}>
          Access past live trainings, webinars, and certification modules on-demand. Updated monthly with new content.
        </p>
        <button
          onClick={() => window.open('https://healthlifestyleservices.com', '_blank')}
          style={{padding:"12px 18px",borderRadius:10,background:"rgba(245,222,179,0.1)",border:"1px solid rgba(245,222,179,0.2)",color:"var(--champagne)",fontWeight:700,cursor:"pointer",fontSize:14,width:"100%"}}
        >
          View Replay Library →
        </button>
      </div>

      {/* ENROLLMENT & REFERRAL */}
      <div style={{padding:24,borderRadius:12,background:"rgba(230,183,165,0.12)",border:"1px solid rgba(230,183,165,0.25)",marginTop:32}}>
        <h4 style={{fontSize:18,color:"var(--champagne)",fontWeight:700,marginBottom:12,textAlign:"center"}}>💰 Earn Referral Income</h4>
        <p style={{fontSize:14,color:"var(--rosegold)",lineHeight:1.7,textAlign:"center"}}>
          Associates earn referral fees for every consultation and certification enrollment. Build passive income while helping others advance their wellness careers.
        </p>
      </div>
    </div>
  );
}