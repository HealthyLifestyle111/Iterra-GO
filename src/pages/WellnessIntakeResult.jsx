import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { Loader2, Download, Send } from "lucide-react";

export default function WellnessIntakeResult() {
  const [intake, setIntake] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generatingRecommendations, setGeneratingRecommendations] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadIntakeAndGenerate() {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const intakeId = urlParams.get('id');
        
        if (!intakeId) {
          navigate(createPageUrl('WellnessIntake'));
          return;
        }

        const intakes = await base44.entities.WellnessIntake.filter({ id: intakeId });
        if (!intakes || intakes.length === 0) {
          navigate(createPageUrl('WellnessIntake'));
          return;
        }

        const loadedIntake = intakes[0];
        setIntake(loadedIntake);
        setLoading(false);

        if (!loadedIntake.recommendation || Object.keys(loadedIntake.recommendation).length === 0) {
          await generateRecommendations(loadedIntake);
        } else {
          setRecommendations(loadedIntake.recommendation);
        }
      } catch (err) {
        console.error('Error loading intake:', err);
        navigate(createPageUrl('WellnessIntake'));
      }
    }
    loadIntakeAndGenerate();
  }, [navigate]);

  const generateRecommendations = async (intakeData) => {
    setGeneratingRecommendations(true);
    try {
      const prompt = `You are a holistic wellness consultant. Based on this client's wellness intake, create a comprehensive personalized wellness program.

CLIENT PROFILE:
- Who: ${intakeData.who}${intakeData.pet_species ? ` (${intakeData.pet_species})` : ''}
- Age: ${intakeData.age || 'Not provided'}
- Experience Level: ${intakeData.experience || 'beginner'}
- Dosha: ${intakeData.dosha}
- Zodiac Sign: ${intakeData.zodiac_sign || 'Not provided'}

WELLNESS GOALS:
${intakeData.full_reset ? '- Full-body reset' : intakeData.wellness_goals ? intakeData.wellness_goals.join(', ') : 'General wellness'}

PREFERENCES:
- Approach: ${intakeData.approach || 'moderate'}
- Use Method: ${intakeData.use_method || 'all methods'}
- Aromatic Profile: ${intakeData.aromatic_profile ? intakeData.aromatic_profile.join(', ') : 'Not specified'}

${intakeData.mood_support ? `MOOD SUPPORT NEEDS: ${intakeData.mood_support.join(', ')}` : ''}
${intakeData.female_focus ? `FEMALE WELLNESS FOCUS: ${intakeData.female_focus.join(', ')}` : ''}
${intakeData.chakras ? `CHAKRAS NEEDING SUPPORT: ${intakeData.chakras.join(', ')}` : ''}
${intakeData.frequencies ? `HEALING FREQUENCIES: ${intakeData.frequencies.join(', ')}` : ''}

DIGESTIVE HEALTH:
- Bowel movements daily: ${intakeData.bowel_movements_daily || 'Not provided'}
${intakeData.digestive_concerns ? `- Concerns: ${intakeData.digestive_concerns.join(', ')}` : ''}
${intakeData.stool_type ? `- Bristol type: ${intakeData.stool_type}` : ''}

${intakeData.detox_duration ? `DETOX PLAN: ${intakeData.detox_duration} duration` : ''}
${intakeData.detox_support ? `DETOX FOCUS: ${intakeData.detox_support.join(', ')}` : ''}

ESSENTIAL OIL RECOMMENDATIONS - Recommend appropriate essential oils and wellness products:

SINGLE OILS:
- Lavender
- Peppermint
- Lemon
- Frankincense
- Tea Tree
- Orange
- Copaiba
- Clary Sage
- Rosemary
- Cedarwood

WELLNESS BLENDS (describe by ingredients, not brand names):
- Protective blend: Wild orange, clove, cinnamon, eucalyptus, rosemary
- Soothing blend: Wintergreen, camphor, peppermint, blue tansy, chamomile
- Digestive blend: Ginger, peppermint, tarragon, fennel, caraway
- Respiratory blend: Eucalyptus, peppermint, laurel leaf, lemon
- Grounding blend: Spruce, frankincense, blue tansy
- Calming blend: Lavender, copaiba, spearmint, magnolia
- Restful blend: Lavender, cedarwood, vetiver, sandalwood

Create a complete personalized wellness program with:
1. FOUNDATION PRACTICES (hydration goals, sleep protocol, exercise guidelines for their age/gender)
2. NUTRITIONAL GUIDANCE (macros, portion sizes, foods to emphasize, foods to avoid based on dosha)
3. ESSENTIAL OIL RECOMMENDATIONS - Recommend specific oils and blends by composition
4. DAILY ROUTINE (morning, midday, evening rituals with products)
5. WEEKLY PROTOCOLS (special practices, detox days, self-care rituals)

Recommend 5-8 oils/blends that are most relevant to their needs.

Be specific, practical, and actionable. Match their experience level and approach preference.`;

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: prompt,
        response_json_schema: {
          type: "object",
          properties: {
            pillar: { type: "string" },
            tier: { type: "string" },
            foundation_practices: {
              type: "object",
              properties: {
                hydration: { type: "string" },
                sleep: { type: "string" },
                movement: { type: "string" }
              }
            },
            nutrition: {
              type: "object",
              properties: {
                macros: { type: "string" },
                portions: { type: "string" },
                foods_to_emphasize: { type: "array", items: { type: "string" } },
                foods_to_avoid: { type: "array", items: { type: "string" } }
              }
            },
            essential_oils: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  purpose: { type: "string" },
                  usage: { type: "string" }
                }
              }
            },
            daily_routine: {
              type: "object",
              properties: {
                morning: { type: "string" },
                midday: { type: "string" },
                evening: { type: "string" }
              }
            },
            weekly_protocols: { type: "array", items: { type: "string" } },
            chakra: { type: "string" },
            frequency: { type: "string" }
          }
        }
      });

      await base44.entities.WellnessIntake.update(intakeData.id, {
        recommendation: response
      });

      setRecommendations(response);

      // Send notification to associate
      try {
        await base44.integrations.Core.SendEmail({
          to: "wellness@iterra.com", // Replace with actual associate email system
          subject: `New Wellness Intake: ${intakeData.email}`,
          body: `A new wellness intake has been submitted.

Client: ${intakeData.email}
Goals: ${intakeData.wellness_goals ? intakeData.wellness_goals.join(', ') : 'Full reset'}
Dosha: ${intakeData.dosha}

View full intake and recommendations in the Back Office.`
        });
      } catch (emailErr) {
        console.error('Failed to send notification:', emailErr);
      }

    } catch (err) {
      console.error('Error generating recommendations:', err);
    } finally {
      setGeneratingRecommendations(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  if (loading) {
    return (
      <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"radial-gradient(ellipse at center, #2d1810 0%, #1a0f08 50%, #0d0704 100%)"}}>
        <div style={{textAlign:"center"}}>
          <Loader2 className="w-8 h-8 animate-spin" style={{color:"var(--champagne)",margin:"0 auto 16px"}} />
          <p style={{color:"var(--rosegold)",fontSize:14}}>Loading your wellness profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{minHeight:"100vh",background:"radial-gradient(ellipse at center, #2d1810 0%, #1a0f08 50%, #0d0704 100%)",padding:"40px 20px"}}>
      <div style={{maxWidth:"900px",margin:"0 auto"}}>
        {/* Header with Actions */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:32}} className="no-print">
          <div>
            <h1 style={{fontFamily:"'Playfair Display', serif",fontSize:32,color:"var(--champagne)",marginBottom:8,textShadow:"0 0 20px rgba(245,222,179,0.3)"}}>
              Your Personalized Wellness Program
            </h1>
            <p style={{color:"var(--rosegold)",fontSize:14}}>
              Created {new Date(intake?.created_date).toLocaleDateString()}
            </p>
          </div>
          <div style={{display:"flex",gap:12}}>
            <button
              onClick={handlePrint}
              style={{padding:"10px 18px",borderRadius:10,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(245,222,179,0.12)",color:"var(--champagne)",cursor:"pointer",display:"flex",alignItems:"center",gap:8,fontSize:14}}
            >
              <Download className="w-4 h-4" />
              Print / Save PDF
            </button>
            <button
              onClick={() => navigate(createPageUrl('Dashboard'))}
              style={{padding:"10px 18px",borderRadius:10,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:14}}
            >
              Go to Dashboard
            </button>
          </div>
        </div>

        {/* Generating Recommendations State */}
        {generatingRecommendations && (
          <div style={{padding:32,borderRadius:16,background:"rgba(218,165,112,0.08)",border:"1px solid rgba(218,165,112,0.12)",textAlign:"center",marginBottom:24}}>
            <Loader2 className="w-8 h-8 animate-spin" style={{color:"var(--rosegold)",margin:"0 auto 16px"}} />
            <h3 style={{fontSize:18,color:"var(--champagne)",marginBottom:8,fontWeight:700}}>Creating Your Personalized Program</h3>
            <p style={{fontSize:14,color:"var(--rosegold)",lineHeight:1.6}}>
              Our AI wellness consultant is analyzing your intake and crafting a comprehensive program tailored specifically for you...
            </p>
          </div>
        )}

        {/* Client Profile Summary */}
        <div style={{padding:24,borderRadius:16,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(245,222,179,0.06)",marginBottom:24}}>
          <h2 style={{fontSize:20,color:"var(--champagne)",marginBottom:16,fontWeight:700}}>Your Profile</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:16}}>
            <div>
              <div style={{fontSize:11,color:"var(--rosegold)",marginBottom:4,fontWeight:600}}>Dosha</div>
              <div style={{fontSize:14,color:"var(--champagne)",textTransform:"capitalize"}}>{intake?.dosha}</div>
            </div>
            {intake?.zodiac_sign && (
              <div>
                <div style={{fontSize:11,color:"var(--rosegold)",marginBottom:4,fontWeight:600}}>Zodiac Sign</div>
                <div style={{fontSize:14,color:"var(--champagne)"}}>{intake.zodiac_sign}</div>
              </div>
            )}
            <div>
              <div style={{fontSize:11,color:"var(--rosegold)",marginBottom:4,fontWeight:600}}>Approach</div>
              <div style={{fontSize:14,color:"var(--champagne)",textTransform:"capitalize"}}>{intake?.approach || 'moderate'}</div>
            </div>
            <div>
              <div style={{fontSize:11,color:"var(--rosegold)",marginBottom:4,fontWeight:600}}>Experience</div>
              <div style={{fontSize:14,color:"var(--champagne)",textTransform:"capitalize"}}>{intake?.experience || 'beginner'}</div>
            </div>
          </div>
          {intake?.wellness_goals && intake.wellness_goals.length > 0 && (
            <div style={{marginTop:16,paddingTop:16,borderTop:"1px solid rgba(245,222,179,0.08)"}}>
              <div style={{fontSize:11,color:"var(--rosegold)",marginBottom:8,fontWeight:600}}>Wellness Goals</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                {intake.wellness_goals.map((goal, i) => (
                  <span key={i} style={{padding:"6px 12px",borderRadius:20,background:"rgba(218,165,112,0.15)",border:"1px solid rgba(218,165,112,0.3)",fontSize:12,color:"var(--champagne)",textTransform:"capitalize"}}>
                    {goal}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* AI-Generated Recommendations */}
        {recommendations && (
          <>
            {/* Foundation Practices */}
            {recommendations.foundation_practices && (
              <div style={{padding:24,borderRadius:16,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(245,222,179,0.06)",marginBottom:24}}>
                <h2 style={{fontSize:20,color:"var(--champagne)",marginBottom:16,fontWeight:700}}>🌱 Foundation Practices</h2>
                <div style={{display:"grid",gap:16}}>
                  {recommendations.foundation_practices.hydration && (
                    <div style={{padding:16,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
                      <h4 style={{fontSize:15,color:"var(--rosegold)",marginBottom:8,fontWeight:600}}>💧 Hydration Protocol</h4>
                      <p style={{fontSize:13,color:"var(--champagne)",lineHeight:1.6,margin:0}}>{recommendations.foundation_practices.hydration}</p>
                    </div>
                  )}
                  {recommendations.foundation_practices.sleep && (
                    <div style={{padding:16,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
                      <h4 style={{fontSize:15,color:"var(--rosegold)",marginBottom:8,fontWeight:600}}>😴 Sleep Guidelines</h4>
                      <p style={{fontSize:13,color:"var(--champagne)",lineHeight:1.6,margin:0}}>{recommendations.foundation_practices.sleep}</p>
                    </div>
                  )}
                  {recommendations.foundation_practices.movement && (
                    <div style={{padding:16,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
                      <h4 style={{fontSize:15,color:"var(--rosegold)",marginBottom:8,fontWeight:600}}>🏃 Movement & Exercise</h4>
                      <p style={{fontSize:13,color:"var(--champagne)",lineHeight:1.6,margin:0}}>{recommendations.foundation_practices.movement}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Nutrition Guidance */}
            {recommendations.nutrition && (
              <div style={{padding:24,borderRadius:16,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(245,222,179,0.06)",marginBottom:24}}>
                <h2 style={{fontSize:20,color:"var(--champagne)",marginBottom:16,fontWeight:700}}>🥗 Nutritional Guidance</h2>
                <div style={{display:"grid",gap:16}}>
                  {recommendations.nutrition.macros && (
                    <div>
                      <h4 style={{fontSize:14,color:"var(--rosegold)",marginBottom:8,fontWeight:600}}>Macronutrient Balance</h4>
                      <p style={{fontSize:13,color:"var(--champagne)",lineHeight:1.6,margin:0}}>{recommendations.nutrition.macros}</p>
                    </div>
                  )}
                  {recommendations.nutrition.portions && (
                    <div>
                      <h4 style={{fontSize:14,color:"var(--rosegold)",marginBottom:8,fontWeight:600}}>Portion Guidelines</h4>
                      <p style={{fontSize:13,color:"var(--champagne)",lineHeight:1.6,margin:0}}>{recommendations.nutrition.portions}</p>
                    </div>
                  )}
                  {recommendations.nutrition.foods_to_emphasize && recommendations.nutrition.foods_to_emphasize.length > 0 && (
                    <div>
                      <h4 style={{fontSize:14,color:"var(--rosegold)",marginBottom:8,fontWeight:600}}>Foods to Emphasize</h4>
                      <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                        {recommendations.nutrition.foods_to_emphasize.map((food, i) => (
                          <span key={i} style={{padding:"6px 12px",borderRadius:8,background:"rgba(74,222,128,0.1)",border:"1px solid rgba(74,222,128,0.2)",fontSize:12,color:"var(--champagne)"}}>
                            {food}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {recommendations.nutrition.foods_to_avoid && recommendations.nutrition.foods_to_avoid.length > 0 && (
                    <div>
                      <h4 style={{fontSize:14,color:"var(--rosegold)",marginBottom:8,fontWeight:600}}>Foods to Minimize</h4>
                      <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                        {recommendations.nutrition.foods_to_avoid.map((food, i) => (
                          <span key={i} style={{padding:"6px 12px",borderRadius:8,background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.2)",fontSize:12,color:"var(--champagne)"}}>
                            {food}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* doTERRA Product Recommendations */}
            {recommendations.essential_oils && recommendations.essential_oils.length > 0 && (
              <div style={{padding:24,borderRadius:16,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(245,222,179,0.06)",marginBottom:24}}>
                <h2 style={{fontSize:20,color:"var(--champagne)",marginBottom:16,fontWeight:700}}>✨ Your Essential Oil Wellness Kit</h2>
                <div style={{display:"grid",gap:12}}>
                  {recommendations.essential_oils.map((product, i) => (
                    <div key={i} style={{padding:16,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
                      <h4 style={{fontSize:15,color:"var(--champagne)",fontWeight:600,marginBottom:8}}>{product.name}</h4>
                      <p style={{fontSize:13,color:"var(--rosegold)",marginBottom:8,lineHeight:1.5}}>{product.purpose}</p>
                      <div style={{fontSize:12,color:"var(--champagne)",padding:10,borderRadius:8,background:"rgba(218,165,112,0.08)",fontStyle:"italic"}}>
                        <strong>How to use:</strong> {product.usage}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Daily Routine */}
            {recommendations.daily_routine && (
              <div style={{padding:24,borderRadius:16,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(245,222,179,0.06)",marginBottom:24}}>
                <h2 style={{fontSize:20,color:"var(--champagne)",marginBottom:16,fontWeight:700}}>🌅 Daily Routine</h2>
                <div style={{display:"grid",gap:16}}>
                  {recommendations.daily_routine.morning && (
                    <div style={{padding:16,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
                      <h4 style={{fontSize:15,color:"var(--rosegold)",marginBottom:8,fontWeight:600}}>🌄 Morning Ritual</h4>
                      <p style={{fontSize:13,color:"var(--champagne)",lineHeight:1.6,margin:0,whiteSpace:"pre-wrap"}}>{recommendations.daily_routine.morning}</p>
                    </div>
                  )}
                  {recommendations.daily_routine.midday && (
                    <div style={{padding:16,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
                      <h4 style={{fontSize:15,color:"var(--rosegold)",marginBottom:8,fontWeight:600}}>☀️ Midday Practice</h4>
                      <p style={{fontSize:13,color:"var(--champagne)",lineHeight:1.6,margin:0,whiteSpace:"pre-wrap"}}>{recommendations.daily_routine.midday}</p>
                    </div>
                  )}
                  {recommendations.daily_routine.evening && (
                    <div style={{padding:16,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
                      <h4 style={{fontSize:15,color:"var(--rosegold)",marginBottom:8,fontWeight:600}}>🌙 Evening Wind-Down</h4>
                      <p style={{fontSize:13,color:"var(--champagne)",lineHeight:1.6,margin:0,whiteSpace:"pre-wrap"}}>{recommendations.daily_routine.evening}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Weekly Protocols */}
            {recommendations.weekly_protocols && recommendations.weekly_protocols.length > 0 && (
              <div style={{padding:24,borderRadius:16,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(245,222,179,0.06)",marginBottom:24}}>
                <h2 style={{fontSize:20,color:"var(--champagne)",marginBottom:16,fontWeight:700}}>📅 Weekly Wellness Protocols</h2>
                <div style={{display:"grid",gap:12}}>
                  {recommendations.weekly_protocols.map((protocol, i) => (
                    <div key={i} style={{padding:14,borderRadius:10,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)",display:"flex",alignItems:"start",gap:12}}>
                      <div style={{fontSize:16,marginTop:2}}>•</div>
                      <p style={{fontSize:13,color:"var(--champagne)",lineHeight:1.6,margin:0,flex:1}}>{protocol}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Footer Actions */}
        <div style={{display:"flex",justifyContent:"center",gap:16,marginTop:40,paddingTop:32,borderTop:"1px solid rgba(245,222,179,0.08)"}} className="no-print">
          <button
            onClick={handlePrint}
            style={{padding:"12px 24px",borderRadius:12,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(245,222,179,0.12)",color:"var(--champagne)",cursor:"pointer",fontSize:14,fontWeight:600}}
          >
            <Download className="w-4 h-4 inline mr-2" />
            Save as PDF
          </button>
          <button
            onClick={() => navigate(createPageUrl('Dashboard'))}
            style={{padding:"12px 24px",borderRadius:12,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:14}}
          >
            Go to Dashboard
          </button>
        </div>
      </div>

      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background: white !important;
          }
        }
      `}</style>
    </div>
  );
}