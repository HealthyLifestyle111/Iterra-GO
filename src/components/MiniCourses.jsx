import React, { useState } from "react";
import { PlayCircle, Lock, CheckCircle } from "lucide-react";

export default function MiniCourses({ userTier }) {
  const [expandedCourse, setExpandedCourse] = useState(null);
  
  const tierLevels = { tier1: 1, tier2: 2, tier3: 3, professional: 4 };
  const hasAccess = (requiredTier) => tierLevels[userTier] >= tierLevels[requiredTier];

  const courses = [
    {
      id: "vedic-eating",
      title: "Vedic Eating & Circadian Rhythms",
      duration: "8 min",
      requiredTier: "tier2",
      description: "Align eating patterns with the sun's cycle for optimal digestion and energy",
      content: `**VEDIC EATING PRINCIPLES:**

**Eating with the Sun:**
• Largest meal at noon (12-1pm) when digestive fire (Agni) peaks
• Lighter breakfast (7-8am) to gently awaken digestion
• Minimal dinner (6-7pm) before sunset to allow overnight repair
• Avoid eating after 8pm - body shifts to detox mode

**The 3-Hour Rule:**
• Space meals 3-4 hours apart for complete digestion
• No snacking between meals (disrupts digestive process)
• Sip warm water between meals to support Agni

**Seasonal Eating (Ritucharya):**
• Spring: Light, bitter greens, detoxifying foods
• Summer: Cooling foods, sweet fruits, coconut
• Fall: Grounding roots, warming spices, ghee
• Winter: Nourishing soups, hearty grains, warming oils

**Dosha-Specific Meal Timing:**
• Vata: Regular meal times critical, warm cooked foods
• Pitta: Can handle larger meals, avoid skipping meals (increases heat)
• Kapha: Can skip breakfast, benefit from fasting, need stimulating spices

**Essential Oils for Digestive Fire:**
• Ginger: 1 drop in warm water before meals (ignites Agni)
• Fennel: 1 drop after meals (reduces bloating)
• Cardamom: Add to meals for digestive support`
    },
    {
      id: "chakra-basics",
      title: "Understanding Chakras & Essential Oils",
      duration: "7 min",
      requiredTier: "tier2",
      description: "Energy centers, blockages, and oils that support each chakra",
      content: `**THE 7 CHAKRAS & ESSENTIAL OIL SUPPORT:**

**Root Chakra (Muladhara) - Red - Safety & Grounding:**
• Location: Base of spine
• Blocked: Fear, insecurity, financial stress
• Oils: Balance Blend, Vetiver, Cedarwood, Patchouli
• Application: Apply to feet, diffuse for grounding

**Sacral Chakra (Svadhisthana) - Orange - Creativity & Sensuality:**
• Location: Lower abdomen
• Blocked: Guilt, low creativity, emotional numbness
• Oils: Wild Orange, Ylang Ylang, Jasmine, Cinnamon
• Application: Apply to lower abdomen, diffuse for creativity

**Solar Plexus (Manipura) - Yellow - Confidence & Power:**
• Location: Upper abdomen
• Blocked: Low self-esteem, digestive issues, control issues
• Oils: Ginger, Peppermint, DigestZen, Lemon
• Application: Apply to stomach area, take internally for digestion

**Heart Chakra (Anahata) - Green - Love & Compassion:**
• Location: Center of chest
• Blocked: Grief, inability to forgive, loneliness
• Oils: Rose, Geranium, Lavender, Eucalyptus
• Application: Apply over heart, diffuse for emotional opening

**Throat Chakra (Vishuddha) - Blue - Communication & Truth:**
• Location: Throat
• Blocked: Fear of speaking, lying, gossip
• Oils: Peppermint, Spearmint, Basil, Cypress
• Application: Apply to throat area, diffuse before important conversations

**Third Eye (Ajna) - Indigo - Intuition & Wisdom:**
• Location: Between eyebrows
• Blocked: Lack of intuition, confusion, headaches
• Oils: Frankincense, Sandalwood, Clary Sage, Rosemary
• Application: Apply to forehead, diffuse during meditation

**Crown Chakra (Sahasrara) - Violet/White - Spiritual Connection:**
• Location: Top of head
• Blocked: Spiritual disconnection, close-mindedness
• Oils: Frankincense, Myrrh, Sandalwood, Lavender
• Application: Apply to crown, diffuse for spiritual practices`
    },
    {
      id: "detox-science",
      title: "Detox Science 101",
      duration: "10 min",
      requiredTier: "tier2",
      description: "Understanding liver detox pathways and cellular cleansing",
      content: `**LIVER DETOXIFICATION PATHWAYS:**

**Phase I - Cytochrome P450 System:**
• Converts fat-soluble toxins to intermediate forms
• Requires: B vitamins, antioxidants
• Essential oils: Lemon (supports liver enzymes), Grapefruit (cytochrome activation)
• Duration: Immediate but creates free radicals if Phase II is weak

**Phase II - Conjugation:**
• Binds toxins to molecules for safe elimination
• Requires: Amino acids (glycine, glutathione), sulfur compounds
• Essential oils: Turmeric (glutathione support), Rosemary (detox enzyme activation)
• Supplements: NAC, milk thistle, cruciferous vegetables

**Phase III - Elimination:**
• Removes bound toxins through bile, urine, stool
• Requires: Hydration, fiber, healthy gut function
• Essential oils: Peppermint (bile flow), DigestZen (gut motility)
• Critical: Daily bowel movements essential (if constipated, toxins reabsorb)

**The 4 Elimination Channels:**
1. Bowels (primary) - Must move 1-3x daily
2. Kidneys/Urine - Hydration critical
3. Skin/Sweat - Dry brushing, sauna, exercise
4. Lungs/Breath - Deep breathing, cardio

**Detox Timeline (Cellular Turnover):**
• Days 1-7: Water weight, initial cleanse
• Days 8-21: Liver enzyme upregulation, habit formation
• Days 22-42: Gut lining renewal (6 complete cycles), taste bud reset
• Days 43-90: Liver cell turnover (10-15%), red blood cell renewal (50%), sustained metabolic shift

**Essential Oil Detox Protocol:**
• Morning: 2 drops Lemon in water (liver support)
• Noon: 1 drop Peppermint (metabolism, digestion)
• Evening: DigestZen capsule (gut health, elimination)`
    },
    {
      id: "mood-mastery",
      title: "Mood Mastery with Aromatherapy",
      duration: "6 min",
      requiredTier: "tier2",
      description: "Emotional regulation, cortisol management, natural mood support",
      content: `**AROMATHERAPY FOR EMOTIONAL WELLNESS:**

**Understanding the Limbic System:**
• Smell bypasses conscious thought → direct to emotion center
• Olfactory bulb connects to amygdala (fear/memory) and hippocampus (memory formation)
• Essential oils create instant emotional shifts within 30-90 seconds
• Can anchor new emotional patterns through scent association

**Cortisol Regulation Protocols:**
• **Morning Cortisol Boost (healthy):** Wild Orange, Peppermint, Grapefruit diffused
• **Midday Stress Reset:** Lavender + Bergamot pulse points
• **Evening Cortisol Reduction:** Cedarwood, Vetiver, Frankincense diffused 30 min before bed

**Specific Emotional States & Oil Solutions:**

**Anxiety/Panic:**
• Acute: Lavender aromatic inhalation (2-3 deep breaths from hands)
• Daily: Bergamot pulse points (FCF-free for daytime), Adaptiv capsules
• Severe: Vetiver + Frankincense diffused, grounding through feet

**Depression/Sadness:**
• Elevation Blend diffused daily
• Wild Orange + Peppermint for energy lift
• Rose or Jasmine for heart opening

**Anger/Irritability:**
• Lavender + Cedarwood for cooling
• Ylang Ylang for emotional release
• Balance Blend for grounding reactivity

**Fear/Insecurity:**
• Frankincense for spiritual grounding
• Balance Blend on feet for safety feeling
• Vetiver for deep root chakra support

**Creating Emotional Anchors:**
• Use specific oil blend during positive experiences
• Brain associates scent with positive state
• Re-diffuse when needing that emotional state
• Example: Elevation during morning gratitude = anchor for joy`
    },
    {
      id: "product-stacking",
      title: "Advanced Product Stacking & Synergy",
      duration: "9 min",
      requiredTier: "tier2",
      description: "Combining products for amplified results and protocol design",
      content: `**SYNERGISTIC PRODUCT STACKING:**

**The Synergy Principle:**
• 1 + 1 = 3 when products work together
• Proper stacking amplifies results 200-300%
• Timing, delivery method, and combinations matter

**STACK #1: Ultimate Immune Support**
• On Guard Softgels (internal protection)
• Frankincense (cellular immune support)
• Copaiba (inflammation modulation)
• Lifelong Vitality Pack (nutritional foundation)
• Protocol: LLV morning, On Guard 2x daily, Frankincense + Copaiba topical on feet
• Result: 70% fewer sick days reported

**STACK #2: Complete Pain Relief System**
• Deep Blue Polyphenol Complex (internal anti-inflammatory)
• Copaiba Softgels (CB2 receptor pain modulation)
• Deep Blue Rub (topical cooling relief)
• Turmeric Dual Chamber (curcumin + essential oils)
• Protocol: Turmeric AM, Copaiba AM/PM, Deep Blue topical 3-4x daily as needed
• Result: 50-70% pain reduction in 8 weeks

**STACK #3: Hormonal Balance (Women)**
• Phytoestrogen Complex (foundational hormone support)
• ClaryCalm (monthly cycle comfort)
• Bone Nutrient Complex (peri/post menopause)
• Adaptiv Capsules (stress hormone regulation)
• Protocol: Phytoestrogen daily, ClaryCalm days 15-28, Bone Nutrient if 35+
• Result: 60% reduction in PMS/menopause symptoms

**STACK #4: Metabolic Optimization**
• MetaPWR System (metabolism, collagen, gum)
• Lifelong Vitality Pack (cellular energy)
• Turmeric (insulin sensitivity)
• Lemon + Grapefruit in water (fat metabolism)
• Protocol: LLV AM, MetaPWR before meals, citrus water 3x daily
• Result: 3-8 lbs weight loss monthly + sustained energy

**STACK #5: Sleep Mastery**
• Serenity Softgels (internal sleep support)
• Lavender + Cedarwood + Vetiver diffused
• Serenity topical on feet
• Adaptiv Capsules (if stress-related insomnia)
• Protocol: Adaptiv 1 hour before bed, diffuse blend 30 min before, Serenity softgel + topical at bedtime
• Result: Sleep latency reduced 50%, quality scores improve 40%

**Timing Protocols:**
• Fat-soluble supplements (LLV, DDR Prime): Take WITH fatty meal for absorption
• Water-soluble (B vitamins): Take AM on empty stomach
• Calming oils/supplements: Evening for best results
• Energizing: Morning to avoid sleep disruption`
    },
    {
      id: "diy-blending",
      title: "DIY Custom Blend Mastery",
      duration: "7 min",
      requiredTier: "tier2",
      description: "Create professional custom blends with proper dilution and formulation",
      content: `**PROFESSIONAL BLENDING TECHNIQUES:**

**Dilution Ratios by Use:**
• Facial serum: 1-2% (3-6 drops per oz)
• Body massage oil: 2-5% (6-15 drops per oz)
• Targeted pain relief: 5-10% (15-30 drops per oz)
• Aromatherapy perfume: 10-20% (30-60 drops per oz)
• Neat (undiluted): Only certain oils, only certain areas

**Carrier Oil Selection:**
• Fractionated Coconut Oil: Lightweight, no scent, long shelf life
• Jojoba: Mimics skin sebum, anti-aging, stable
• Sweet Almond: Nourishing, affordable, light
• Rosehip Seed: Vitamin A, anti-aging, expensive (use in facial blends)
• Argan: Vitamin E, skin elasticity, luxury blends

**The Blend Architecture:**
• Top Note (30%): First scent you smell, evaporates quickly - citrus, mints
• Middle Note (50%): Heart of blend, lasts hours - florals, herbs
• Base Note (20%): Anchors blend, lasts days - woods, resins, roots

**Example Custom Blend Recipes:**

**"Executive Calm" Roll-On (10mL):**
• 8 drops Frankincense (base - grounding)
• 6 drops Lavender (middle - calming)
• 4 drops Bergamot (top - uplifting)
• Fill rest with FCO
• Use: Pulse points before meetings, stressful situations

**"Athletic Recovery" Massage Oil (4oz):**
• 20 drops Deep Blue blend (pain relief)
• 15 drops Copaiba (inflammation)
• 10 drops Wintergreen (cooling)
• 8 drops Marjoram (muscle tension)
• Fill with FCO
• Use: Post-workout massage into sore muscles

**"Cellular Renewal" Facial Serum (1oz):**
• 15 drops Frankincense (cellular health)
• 10 drops Rose (skin barrier)
• 8 drops Sandalwood (anti-inflammatory)
• 5 drops Myrrh (hydration)
• Base: 50% Rosehip + 50% Jojoba
• Use: Nightly after cleansing

**Safety & Shelf Life:**
• Label with ingredients and date
• Store in dark glass bottles (amber or cobalt)
• Keep in cool, dark place
• Shelf life: 6-12 months (check carrier oil oxidation)
• Vitamin E oil: Add 2-3 drops per oz as natural preservative`
    },
    {
      id: "doshas-deep",
      title: "Ayurvedic Doshas Deep-Dive",
      duration: "10 min",
      requiredTier: "tier2",
      description: "Complete dosha profiles, imbalance signs, and balancing protocols",
      content: `**COMPLETE DOSHA SYSTEM:**

**VATA (Air + Space) - The Creative Force:**
**Physical:** Thin frame, dry skin/hair, cold hands/feet, light sleep, variable appetite
**Mental:** Quick thinker, creative, enthusiastic, anxious when imbalanced
**Imbalanced:** Anxiety, insomnia, constipation, dry skin, scattered mind, weight loss
**Balancing Protocol:**
• Routine & warmth essential
• Warm, cooked, grounding foods
• Early bedtime (10pm), consistent meal times
• Oils: Grounding (Balance), warming (Ginger, Cinnamon), calming (Lavender, Vetiver)
• Avoid: Raw/cold foods, excessive travel, over-stimulation

**PITTA (Fire + Water) - The Transformative Force:**
**Physical:** Medium build, warm body temp, strong appetite, sensitive skin, sharp features
**Mental:** Focused, driven, organized, irritable when imbalanced
**Imbalanced:** Inflammation, acid reflux, skin rashes, anger, perfectionism, burnout
**Balancing Protocol:**
• Cooling & moderation essential
• Sweet, cooling foods; avoid spicy/acidic
• Moderate exercise (not excessive), nature time
• Oils: Cooling (Peppermint, Spearmint), soothing (Lavender, Rose), calming (Sandalwood)
• Avoid: Competitive environments, skipping meals, excess heat

**KAPHA (Earth + Water) - The Stable Force:**
**Physical:** Solid build, smooth/oily skin, thick hair, deep sleep, slow digestion
**Mental:** Calm, nurturing, steady, lethargic when imbalanced
**Imbalanced:** Weight gain, congestion, depression, oversleeping, attachment
**Balancing Protocol:**
• Stimulation & variety essential
• Light, warm, spicy foods; reduce dairy/wheat
• Vigorous exercise, wake early (6am), occasional fasting
• Oils: Stimulating (Peppermint, Eucalyptus, Grapefruit), warming (Ginger, Cinnamon, Black Pepper)
• Avoid: Oversleeping, heavy foods, sedentary lifestyle

**Daily Dosha Routine Recommendations:**
• Vata: Warm oil massage (Sesame oil + Vetiver), consistent routine
• Pitta: Coconut oil cooling massage, moderate schedules
• Kapha: Dry brushing + stimulating oils, varied activities`
    },
    {
      id: "frequency-healing",
      title: "Sound Frequency Healing & Essential Oils",
      duration: "6 min",
      requiredTier: "tier2",
      description: "Solfeggio frequencies, vibrational wellness, oil pairing",
      content: `**SOUND FREQUENCY HEALING:**

**How Frequencies Work:**
• Everything vibrates at specific Hz
• Body's cells respond to external frequencies
• Essential oils have measurable frequencies (MHz)
• Combining sound + scent = amplified healing

**Essential Oil Frequencies (MHz):**
• Rose: 320 MHz (highest measured)
• Lavender: 118 MHz
• Frankincense: 147 MHz
• Peppermint: 78 MHz
• Baseline healthy human: 62-68 MHz
• Disease state: Below 58 MHz

**The 6 Solfeggio Frequencies & Oil Pairings:**

**396 Hz - Liberation from Fear:**
• Chakra: Root
• Effect: Release guilt, fear, negative patterns
• Oils: Balance Blend, Vetiver, Cedarwood
• Protocol: Diffuse oils while listening to 396 Hz meditation

**417 Hz - Facilitating Change:**
• Chakra: Sacral
• Effect: Undo negative situations, facilitate change
• Oils: Wild Orange, Ylang Ylang, Ginger
• Protocol: Apply oils to sacral area during 417 Hz soundbath

**528 Hz - Transformation & DNA Repair:**
• Chakra: Solar Plexus/Heart
• Effect: Cellular healing, miracles, transformation
• Oils: Frankincense (DNA support), Rose, Helichrysum
• Protocol: Apply over heart, listen to 528 Hz for 20 min

**639 Hz - Connecting & Relationships:**
• Chakra: Heart
• Effect: Harmonious relationships, forgiveness
• Oils: Rose, Geranium, Lavender
• Protocol: Heart-opening meditation with oils + 639 Hz

**741 Hz - Expression & Solutions:**
• Chakra: Throat
• Effect: Self-expression, problem-solving, detoxification
• Oils: Peppermint, Basil, Spearmint
• Protocol: Apply to throat, listen before creative work

**852 Hz - Awakening Intuition:**
• Chakra: Third Eye
• Effect: Spiritual awareness, inner strength
• Oils: Frankincense, Sandalwood, Clary Sage
• Protocol: Apply to third eye, meditation with 852 Hz

**432 Hz - Natural Tuning (The Universe's Frequency):**
• Effect: Alignment with nature, deep relaxation
• Oils: Any grounding blend
• Protocol: Full-body aromatherapy + 432 Hz music for sleep`
    },
    {
      id: "cell-salts",
      title: "Cell Salts & Zodiac Wellness",
      duration: "5 min",
      requiredTier: "tier2",
      description: "The 12 tissue salts, zodiac correspondences, cellular health",
      content: `**DR. SCHÜSSLER'S 12 TISSUE SALTS:**

**What Are Cell Salts?**
• Homeopathic mineral preparations
• 12 salts essential for cellular function
• Each zodiac sign has constitutional deficiency pattern
• Support foundational cellular health

**The 12 Cell Salts & Their Functions:**

1. **Calc Fluor** (Calcium Fluoride) - Tissue elasticity, teeth, bones
2. **Calc Phos** (Calcium Phosphate) - Bone builder, growth, recovery
3. **Calc Sulph** (Calcium Sulfate) - Blood purifier, skin health
4. **Ferrum Phos** (Iron Phosphate) - Oxygen carrier, inflammation fighter
5. **Kali Mur** (Potassium Chloride) - Fibrin regulator, mucus dissolver
6. **Kali Phos** (Potassium Phosphate) - Nerve nutrient, mental clarity
7. **Kali Sulph** (Potassium Sulfate) - Oxygen distributor, skin health
8. **Mag Phos** (Magnesium Phosphate) - Muscle relaxant, cramp relief
9. **Nat Mur** (Sodium Chloride) - Water distributor, emotional balance
10. **Nat Phos** (Sodium Phosphate) - Acid neutralizer, pH balance
11. **Nat Sulph** (Sodium Sulfate) - Water eliminator, liver support
12. **Silicea** (Silica) - Cleanser, strengthener, connective tissue

**Zodiac-Linked Protocols:**
• Aries (Kali Phos): Mental stress, headaches → Peppermint, Frankincense oils
• Taurus (Nat Sulph): Fluid retention → Grapefruit, Lemon detox
• Gemini (Kali Mur): Respiratory → Breathe blend, Eucalyptus
• Cancer (Calc Fluor): Digestive → DigestZen, Ginger
• Leo (Mag Phos): Heart, muscle → Marjoram, Lavender
• Virgo (Kali Sulph): Skin, digestion → Tea Tree, Turmeric
• Libra (Nat Phos): Kidney, balance → Geranium, Juniper Berry
• Scorpio (Calc Sulph): Detox, transformation → Lemon, Rosemary
• Sagittarius (Silicea): Liver, structure → Helichrysum, Cypress
• Capricorn (Calc Phos): Bones, joints → Wintergreen, Copaiba
• Aquarius (Nat Mur): Circulation, emotions → Rose, Ylang Ylang
• Pisces (Ferrum Phos): Immunity, vitality → On Guard, Frankincense

**How to Use:**
• Take cell salt 3-5 pellets under tongue 3x daily
• Pair with corresponding essential oils for amplified support
• Best on empty stomach (20 min before meals)`
    },
    {
      id: "seasonal-wellness",
      title: "Seasonal Wellness Transitions",
      duration: "8 min",
      requiredTier: "tier1",
      description: "Align wellness with nature's rhythms through the year",
      content: `**SEASONAL WELLNESS PROTOCOLS:**

**SPRING (March-May) - Detox & Renewal:**
**Focus:** Liver cleanse, allergy support, energy awakening
**Essential Oils:** Lemon, Grapefruit, Lavender, Breathe blend
**Protocol:**
• Morning detox water: 2 drops Lemon in glass water
• Diffuse Breathe blend for seasonal allergies
• Liver support: Lemon + Turmeric capsules
**Foods:** Bitter greens, asparagus, strawberries, light meals
**Activity:** Increase movement, outdoor walks, gardening

**SUMMER (June-August) - Cooling & Protection:**
**Focus:** Heat management, sun protection, sustained energy
**Essential Oils:** Peppermint, Lavender, Melaleuca, Frankincense
**Protocol:**
• Cooling mist: Peppermint + Lavender in spray bottle for skin
• After-sun: Lavender + Frankincense in aloe
• Energy hydration: Lemon + Lime in water bottle
**Foods:** Cucumbers, watermelon, coconut, cooling herbs
**Activity:** Early morning or evening exercise, swimming

**FALL (September-November) - Immune Building & Grounding:**
**Focus:** Immune preparation, transition support, grounding
**Essential Oils:** On Guard, Frankincense, Cinnamon, Balance
**Protocol:**
• Immune boost: On Guard Softgels daily
• Grounding: Balance blend on feet AM/PM
• Respiratory prep: Breathe blend diffused
**Foods:** Root vegetables, squash, apples, warming spices
**Activity:** Strength training, cozy indoor movement

**WINTER (December-February) - Rest & Immunity:**
**Focus:** Deep rest, illness prevention, inner reflection
**Essential Oils:** Frankincense, On Guard, Serenity, Eucalyptus
**Protocol:**
• Daily immunity: On Guard + Frankincense on feet
• Sleep support: Serenity diffused nightly
• Respiratory: Breathe or Eucalyptus steam
**Foods:** Bone broths, stews, winter citrus, fermented foods
**Activity:** Restorative yoga, meditation, adequate sleep

**Transition Protocols (2 weeks before season change):**
• Begin shifting oils to next season's focus
• Adjust meal timing and food types gradually
• Support body through seasonal shift with adaptogens`
    },
    {
      id: "pet-safety-deep",
      title: "Advanced Pet Safety & Species Protocols",
      duration: "9 min",
      requiredTier: "tier2",
      description: "Deep-dive on pet metabolism, toxicity signs, emergency protocols",
      content: `**SPECIES-SPECIFIC METABOLISM:**

**DOGS - Generally Safe with Proper Dilution:**
• Liver enzymes: Can metabolize most oils
• Safe dilution: 1:3 to 1:4 (1 drop oil to 3-4 drops carrier)
• Internal use: 1 drop per 50 lbs body weight
• Topical tolerance: Good when properly diluted
• Toxic oils: Pennyroyal, Wormwood, Birch (avoid completely)

**CATS - CRITICAL METABOLIC DEFICIT:**
• LACK glucuronyl transferase enzyme (cannot process phenols)
• Safe ONLY: Frankincense, Copaiba (aromatic only, separate room)
• Dilution if topical: 0.5-2% maximum (extreme caution)
• NEVER internal use
• Toxic: Tea Tree, Oregano, Thyme, Clove, Wintergreen, Birch, Citrus (high amounts)
• Hydrosols preferred over essential oils

**HORSES - Excellent Tolerance:**
• Large body mass = higher tolerance
• Topical dilution: 1:1 to neat (undiluted on hooves)
• Can apply neat to hoof wall and frog
• Steam inhalation protocols safe
• Let horse smell first - if they turn away, don't use

**RABBITS - EXTREMELY SENSITIVE:**
• Aromatic ONLY in separate room
• Hydrosols only, no direct essential oil exposure
• Fresh air most important
• Watch for respiratory distress

**BIRDS - HIGHLY SENSITIVE RESPIRATORY:**
• Aromatic only, separate room with escape
• 10-15 min maximum diffusion
• Safe: Lavender, Chamomile, Frankincense (heavily diluted)
• NEVER confine bird with diffuser running

**TOXICITY SIGNS (ALL SPECIES):**
• Early (30 min - 2 hours): Drooling, pawing at mouth, vomiting, lethargy
• Severe (2-12 hours): Tremors, difficulty breathing, seizures, collapse
• EMERGENCY: Remove from exposure, wash skin, call poison control, vet immediately

**ASPCA Poison Control: (888) 426-4435**`
    },
    {
      id: "baby-safety",
      title: "Baby & Pregnancy Safety Protocols",
      duration: "7 min",
      requiredTier: "tier2",
      description: "Safe oils for pregnancy, infants, and children by age",
      content: `**PREGNANCY & INFANT SAFETY:**

**Pregnancy Trimester Guidelines:**

**First Trimester (Weeks 1-12) - MOST RESTRICTIVE:**
• AVOID: Clary Sage, Rosemary, Basil, Thyme, Wintergreen, Birch
• Safe aromatic: Lavender, Grapefruit, Lemon (diffused)
• Safe topical (diluted 1:4): Lavender, Frankincense
• Internal use: Generally avoid (consult OB)

**Second Trimester (Weeks 13-26) - MODERATE CAUTION:**
• Expanded safe list: Add Wild Orange, Peppermint (for nausea), Ginger
• Dilution: 1:3 for topical
• Gentle diffusion acceptable
• Avoid: Still no uterine stimulants (Clary Sage)

**Third Trimester (Weeks 27-40) - PREPARE FOR LABOR:**
• Clary Sage: Can use in final weeks (NOT before 37 weeks)
• Lavender: Perineal massage with carrier oil
• Peppermint: Nausea, cooling
• Frankincense: Emotional support, grounding

**Labor & Delivery:**
• Clary Sage: Diffuse to support contractions
• Lavender: Calming between contractions
• Peppermint: Nausea relief
• Frankincense: Grounding, spiritual connection

**INFANT SAFETY (0-12 months):**
• **0-3 months:** Aromatic ONLY, never topical or internal
• **3-6 months:** Heavily diluted topical (1:10) on feet only
• **6-12 months:** Expand to 1:8 dilution
• Safe oils: Lavender, Roman Chamomile, Dill
• AVOID: Peppermint (can slow breathing), Eucalyptus, Rosemary

**CHILDREN BY AGE:**
• **1-2 years:** 1:6 dilution, aromatic safe for most oils
• **3-5 years:** 1:5 dilution, expanded oil selection
• **6-10 years:** 1:4 dilution, most oils safe
• **10+ years:** 1:3 dilution, approaching adult protocols

**Breastfeeding:**
• Avoid Peppermint near breast (reduces milk supply)
• Fennel can increase milk supply (1 drop in capsule)
• Dilute all topical oils
• Safe: Lavender, Frankincense, Citrus (diluted)`
    },
    {
      id: "lab-basics",
      title: "Understanding Functional Labs",
      duration: "10 min",
      requiredTier: "tier3",
      description: "Reading lab results, functional ranges vs standard, optimization protocols",
      content: `**FUNCTIONAL LAB INTERPRETATION BASICS:**

**Standard Labs vs Functional Ranges:**
• Standard = disease diagnosis (thyroid TSH: 0.4-4.5)
• Functional = optimal wellness (thyroid TSH: 1.0-2.0)
• Goal: Optimize BEFORE disease develops

**KEY METABOLIC MARKERS:**

**Fasting Glucose:**
• Standard: <100 mg/dL
• Functional optimal: 75-85 mg/dL
• Over 90: Investigate insulin resistance
• Support: MetaPWR system, Cinnamon, time-restricted eating

**Hemoglobin A1C:**
• Standard: <5.7%
• Functional optimal: <5.3%
• 5.4-5.6: Pre-diabetes risk
• Support: Turmeric, Cinnamon, metabolic protocols

**Thyroid Panel (Complete):**
• TSH optimal: 1.0-2.0 mIU/L
• Free T3: Upper half of range
• Free T4: Mid-range
• Thyroid antibodies: <35 IU/mL
• Support if suboptimal: Iodine-rich foods, selenium, Frankincense, reduce stress

**Sex Hormones (Women):**
• Estradiol: Varies by cycle phase
• Progesterone: Should be 10:1 ratio to estrogen (luteal phase)
• Testosterone: 20-80 ng/dL optimal
• Support: Phytoestrogen Complex, ClaryCalm, Maca

**Inflammatory Markers:**
• hs-CRP optimal: <1.0 mg/L (standard <3.0)
• Homocysteine optimal: <7 µmol/L
• Support: Turmeric, Copaiba, Omega-3s, anti-inflammatory diet

**Nutrient Levels:**
• Vitamin D: 50-80 ng/mL (not just >30)
• B12: >500 pg/mL
• Ferritin: 50-100 ng/mL (women), 100-200 (men)
• Magnesium RBC: Upper half of range

**When to Flag for Practitioner (Jenna Williams):**
• Multiple markers suboptimal
• Conflicting results needing interpretation
• Desire for custom supplement stacking
• Need for follow-up testing recommendations

**Tier 3 Benefit:** Priority lab review with personalized protocols beyond standard doTERRA products (may include Fullscript professional supplements, custom compounding)`
    },
    {
      id: "business-scripts",
      title: "Sales Scripts That Don't Feel Salesy",
      duration: "8 min",
      requiredTier: "tier1",
      description: "Authentic enrollment conversations and objection handling",
      content: `**THE AUTHENTIC ENROLLMENT METHOD:**

**Core Principle:** You're sharing a solution to a problem they already have. Not convincing, not manipulating - serving.

**The 3-Question Framework:**

**Question 1: "What's going on with [their issue]?"**
• Gets them talking about their pain point
• Builds trust through listening
• Reveals what they ACTUALLY need

**Question 2: "Have you tried anything for that?"**
• Shows what hasn't worked
• Creates contrast for your solution
• Demonstrates you care about their journey

**Question 3: "Would you be open to trying something natural?"**
• Soft invitation, not pushy
• Positions oils as alternative approach
• Easy yes/no, low pressure

**Complete Conversation Example:**

You: "Hey! How have you been?"
Them: "Honestly, exhausted. I can't sleep and I'm stressed all the time."

You: "Oh man, I totally get that. What's going on - work stress?"
Them: "Yeah, plus the kids, and I just can't shut my brain off at night."

You: "Have you tried anything for the sleep stuff?"
Them: "Melatonin, but it makes me groggy. And my doctor wants me on anxiety meds but I don't want that."

You: "Okay so you want something natural that actually works but doesn't have side effects?"
Them: "Exactly."

You: "Perfect. So I've been using essential oils for that exact thing - Lavender for sleep, Adaptiv for the racing thoughts. Research-backed, no side effects, works in like 30 seconds. Would you be open to trying a sample? I'll literally just give you some for free and you tell me if it helps."
Them: "Yeah, sure!"

**[3 days later - follow-up text]:**

You: "Did you try the Lavender?"
Them: "OMG yes! I slept SO much better. Where do I get more?"

You: "Awesome! So you have two options - I can sell you a bottle at retail for $30, OR you can open a free wholesale account and get 25% off everything forever. Most people do the wholesale even if they never plan to sell anything. Want me to send you the link?"

**Objection Handling Scripts:**

**"I can't afford it right now":**
"I totally understand - what if we started with just ONE oil that would make the biggest difference for you? Lavender is $24 wholesale and will last you 3-4 months. That's $6-8 a month for better sleep. Does that work?"

**"I need to think about it":**
"Of course! What specific questions do you have? I don't want you feeling pressured - I just want you to have the info you need to decide."

**"My friend sells these":**
"Oh awesome! Are they taking good care of you? ... Yeah? Then stick with them! If you ever need anything they don't have, I'm here."

**"I heard these are a scam/pyramid scheme":**
"I was skeptical too. Here's the difference: pyramid schemes make money from recruiting. This company makes money from selling actual products - I have customers who order every month and never recruit anyone. I can send you the FTC guidelines if you want to see how it's regulated. Fair?"`
    },
    {
      id: "autoship-retention",
      title: "Customer Retention & Autoship Mastery",
      duration: "6 min",
      requiredTier: "tier1",
      description: "Keep customers ordering month after month for residual income",
      content: `**THE RETENTION PROBLEM:**
• Average MLM customer retention: 40-60%
• Top earners' retention: 75-85%
• Difference = predictable residual income

**WHY CUSTOMERS QUIT ORDERING:**
1. They ran out and forgot to reorder (50%)
2. Didn't see results fast enough (20%)
3. Too expensive / budget changed (15%)
4. Bad experience with sponsor (10%)
5. Tried something else (5%)

**THE AUTOSHIP RETENTION SYSTEM:**

**Week 1: The Onboarding Experience**
• Call new customer within 24 hours of order
• "Hey! Just wanted to make sure your order went through and see if you have any questions about how to use everything."
• SEND: Welcome email with usage guides, your contact info, first-time user tips
• ADD: To your customer VIP group (Facebook, WhatsApp, etc.)

**Week 2: The Check-In**
• Text or email: "How's the [product] working for you?"
• ADDRESS: Any issues immediately (wrong oil, not seeing results, need different protocol)
• EDUCATE: Share tips, recipes, usage ideas

**Week 3: The Value-Add**
• Send free content: DIY recipe, wellness tip, exclusive discount
• Make them feel VIP: "You're one of my favorite customers - here's a sneak peek at next month's promo"
• BUILD: Relationship beyond transactions

**Week 4: The Autoship Setup**
• "Hey! Your order should be running low soon. Want me to set you up on autoship so you never run out? You get free shipping + extra rewards points. I can adjust it anytime you want."
• EXPLAIN: Can skip months, change products, cancel anytime (removes fear)
• INCENTIVE: "Plus I'll throw in a free sample of [new product] with your first autoship order"

**Month 2-3: The Expansion**
• Once they love Product #1, introduce complementary products
• "You're loving Lavender for sleep - have you tried adding Serenity Softgels? My customers who stack them see even better results."
• Increase order size gradually

**Month 4+: The Referral Engine**
• "Has anyone asked what you're using? I'd love to send them a sample and we can split the credit if they order!"
• Turn happy customers into referral partners
• Offer incentive: $10 credit per referral

**Retention Rescue Protocols:**

**When They Want to Cancel:**
• "I totally understand - what's not working? Let me see if I can fix it before you cancel."
• Often it's just wrong product for their needs
• Swap products, adjust dosing, send free samples
• "How about we pause for one month instead of canceling? I'll check in with you and if you still want to cancel then, no problem."

**When They Go Dark (Haven't Ordered in 2 Months):**
• Personal text: "Hey! I noticed you haven't ordered - everything okay? Did the oils not work for you?"
• OFFER: Free sample of something new, special discount, personal phone call
• WIN-BACK: 40% of dormant customers reactivate with personal outreach

**VIP Customer Program (For High-Value Customers):**
• Monthly personal check-in calls
• Exclusive early access to new products
• Free samples with every order
• Birthday/holiday gifts
• These 20% of customers drive 80% of your income - treat them like gold`
    },
    {
      id: "instagram-2026",
      title: "Instagram Reels Strategy 2026",
      duration: "7 min",
      requiredTier: "tier2",
      description: "Viral content formulas for wellness businesses using current algorithms",
      content: `**INSTAGRAM REELS DOMINATION 2026:**

**Why Reels = Growth:**
• Instagram prioritizes Reels 10x over static posts
• Average reach: Static post 10-15% of followers, Reels 40-300%
• Viral potential: One good Reel can add 1,000+ followers overnight

**The Viral Formula (What Actually Works in 2026):**

**Hook (First 1-3 seconds):**
• Must stop scroll immediately
• Use: Bold text overlay, surprising statement, pattern interrupt
• Examples:
  - "I quit my $80k job for this... 🤯"
  - "3 oils literally EVERY mom needs"
  - "This one oil changed my sleep in 3 days"

**Content (Next 10-20 seconds):**
• Deliver on the hook promise
• Fast-paced, value-dense, no fluff
• Overlay text for watch-without-sound

**Call-to-Action (Final 5 seconds):**
• Clear next step
• "DM me 'oils' for the full guide"
• "Save this for later!"
• "Share with someone who needs this"

**Top 10 Viral Reel Formats for Wellness:**

1. **"POV: When you discover [oil benefit]"** - Trending audio + relatable scenario
2. **"3 oils I wish I knew about sooner"** - Listicle format, quick cuts
3. **"Watch me make [DIY recipe]"** - Hands-only, ASMR-style, trending audio
4. **"Trying [wellness protocol] for 7 days - Day 1"** - Series format, builds anticipation
5. **"Things I learned as a wellness coach"** - Educational authority positioning
6. **"Get ready with me - wellness edition"** - Morning routine, oil integration
7. **"Before/After [wellness journey]"** - Transformation (compliant disclaimers)
8. **"Replying to common questions"** - Use Instagram comment reply feature
9. **"Debunking [wellness myth]"** - Educational, builds trust
10. **"If you [relatable problem], try [oil solution]"** - Problem-solution format

**Posting Strategy:**
• Frequency: 4-7 Reels per week (consistency beats perfection)
• Timing: Post 8-10am or 6-8pm (when your audience is scrolling)
• Hashtags: 5-10 relevant hashtags (not spam)
• Sound: Use trending audio (90% of viral Reels use trending sounds)

**Compliance on Reels:**
• Include #ad or #[Company]Distributor in caption
• Text overlay: "I'm an independent distributor" (if business opportunity content)
• Disclaimer: "These statements not evaluated by FDA" (if making health claims)

**Reels That Generate Sales:**
• Educational Reels (build authority) → DMs asking questions → Sales
• Don't hard-sell in Reels - provide value, let them come to you`
    },
    {
      id: "doterra-products",
      title: "doTERRA Product Catalog Mastery",
      duration: "10 min",
      requiredTier: "tier1",
      description: "Complete product line knowledge, benefits, usage, pricing",
      content: `**TOP 20 ESSENTIAL OILS - MASTER THESE FIRST:**

1. **Lavender** - The Swiss Army Knife
   - Uses: Sleep, anxiety, burns, skin, cleaning
   - Dosing: 2-4 drops topical, diffuse, or internal
   - Price: ~$30/15mL

2. **Peppermint** - Energy & Digestion
   - Uses: Headaches, energy, focus, digestion, cooling
   - Dosing: 1-2 drops (powerful), avoid eyes
   - Price: ~$28/15mL

3. **Lemon** - Cleanse & Detox
   - Uses: Detox water, cleaning, mood uplift
   - Dosing: 2 drops in water, dilute for topical (photosensitive)
   - Price: ~$15/15mL

4. **Frankincense** - King of Oils
   - Uses: Cellular health, meditation, skin rejuvenation
   - Dosing: 1-2 drops under tongue or topical
   - Price: ~$95/15mL

5. **Tea Tree (Melaleuca)** - Antimicrobial
   - Uses: Acne, cuts, fungal issues, cleaning
   - Dosing: 1-2 drops topical (dilute for sensitive skin)
   - Price: ~$30/15mL

**ESSENTIAL BLENDS:**

• **On Guard** - Immune protection
• **Breathe** - Respiratory support
• **DigestZen** - Digestive comfort
• **Deep Blue** - Pain relief
• **Balance** - Grounding
• **Adaptiv** - Stress management
• **Serenity** - Sleep support

**SUPPLEMENT ESSENTIALS:**

• **Lifelong Vitality Pack (LLV)** - Foundation nutrition
• **PB Assist+** - Probiotic for gut health
• **TerraZyme** - Digestive enzymes
• **Copaiba Softgels** - Pain & inflammation
• **Turmeric Dual Chamber** - Inflammation support

**SKINCARE SYSTEMS:**

• **Yarrow|Pom** - Cellular anti-aging
• **HD Clear** - Acne treatment
• **Anti-Aging Moisturizer** - Daily skincare

**How to Learn Products Fast:**
• Use them yourself first (authenticity)
• Teach one new oil per week to customers
• Create personal protocol (what YOU use daily)
• Master top 10 oils, then expand`
    },
    {
      id: "income-goals",
      title: "Setting Realistic Income Goals & Tracking",
      duration: "8 min",
      requiredTier: "tier1",
      description: "Monthly revenue planning, activity tracking, rank progression",
      content: `**MONTHLY INCOME PLANNING:**

**The Income Pyramid (Realistic Expectations):**

**Month 1-3: Foundation ($100-500/month)**
• 5-10 customers ordering
• 1-2 builder recruits
• Focus: Learning products, building confidence
• Activities: 20 conversations/week, 2 classes/month

**Month 4-6: Momentum ($500-1,500/month)**
• 15-25 active customers
• 3-5 builders (1-2 serious)
• Rank: Silver achieved
• Activities: 30 conversations/week, team training starts

**Month 7-12: Breakthrough ($1,500-3,000/month)**
• 30-50 active customers
• 10-15 builders (3-5 serious)
• Rank: Gold achieved
• Activities: Focus shifts to leader development

**Year 2: Scale ($3,000-8,000/month)**
• 100+ team members
• 5-10 active leaders building independently
• Rank: Platinum achieved
• Activities: Mentorship, not management

**Year 3-5: Mastery ($10,000-50,000+/month)**
• 500+ team members across multiple legs
• Diamond rank
• Activities: 2-3 hours daily, mostly strategic

**Activity Tracking (What Gets Measured Gets Done):**

**Daily Non-Negotiables:**
□ 5 outreach messages (invitations, follow-ups)
□ 30 min social media engagement (comments, DMs)
□ 1 piece of content posted (story, post, Reel)
□ 2 follow-up calls/texts with pending prospects

**Weekly Goals:**
□ 10 new conversations started
□ 5 samples distributed
□ 2 appointments set (class, 1-on-1, consultation)
□ 1 enrollment (customer or builder)

**Monthly Milestones:**
□ 4-6 new enrollments
□ $500-1,000 personal volume
□ $2,000-5,000 team volume
□ 2-3 team training calls hosted

**Income Formula:**
Personal Sales: 10 customers × $100/mo × 25% = $250
Fast Start Bonuses: 3 enrollees × $100 orders × 20% = $60
Team Commissions: $2,000 team volume × 7% = $140
**Total Month 3 Income: $450**

**Tracking Tools:**
• Spreadsheet with daily activity log
• Monthly income vs goal tracker
• Customer reorder calendar
• Team growth chart

**When to Quit Your Job:**
• 12+ months consistent income
• Income = 150% of current job (buffer for taxes, variability)
• 6 months emergency fund saved
• Health insurance secured
• NOT based on one good month - need consistency`
    },
    {
      id: "trend-integration",
      title: "2025-2026 Wellness Trends & doTERRA",
      duration: "9 min",
      requiredTier: "tier2",
      description: "Capitalize on emerging wellness trends with product positioning",
      content: `**TOP 2025-2026 WELLNESS TRENDS:**

**1. LONGEVITY & CELLULAR HEALTH (Massive Growth)**
**Trend:** Consumers want to live healthier longer, not just live longer
**doTERRA Position:**
• DDR Prime Softgels (cellular vitality complex)
• Frankincense (cellular regeneration support)
• Copaiba (inflammation modulation = longevity)
• Lifelong Vitality Pack (foundational cellular nutrition)
**Marketing Angle:** "Support your cells, support your lifespan. Cellular wellness is longevity wellness."

**2. HORMONAL BALANCE (Women's Health Boom)**
**Trend:** Perimenopause/menopause support is $20B market and growing
**doTERRA Position:**
• Phytoestrogen Complex (plant-based hormone support)
• ClaryCalm (monthly cycle & menopause comfort)
• Bone Nutrient Complex (post-menopause bone health)
• Adaptiv Capsules (stress hormone regulation)
**Marketing Angle:** "Natural hormone support without HRT side effects. Balance your hormones, reclaim your life."

**3. SLEEP OPTIMIZATION (Sleep Tech + Natural Solutions)**
**Trend:** $80B sleep industry, consumers want non-pharmaceutical solutions
**doTERRA Position:**
• Serenity Softgels + Essential Oil + Stick (complete system)
• Lavender (clinical sleep studies support efficacy)
• Adaptiv (stress-related insomnia)
• Vetiver + Cedarwood (deep sleep support)
**Marketing Angle:** "Research-backed sleep solutions that work WITH your body, not against it."

**4. GUT HEALTH & MICROBIOME (Functional Medicine Goes Mainstream)**
**Trend:** Everyone knows gut = health now, seeking solutions
**doTERRA Position:**
• PB Assist+ (11 strain probiotic)
• TerraZyme (digestive enzymes)
• DigestZen (discomfort relief)
• GX Assist (cleanse prep)
**Marketing Angle:** "Heal your gut, heal everything. Complete digestive wellness system."

**5. METABOLIC HEALTH & WEIGHT (GLP-1 Alternative Seekers)**
**Trend:** People want metabolic support without Ozempic side effects
**doTERRA Position:**
• MetaPWR System (metabolic blend + gum + advantage)
• Turmeric (insulin sensitivity)
• Slim & Sassy (appetite management)
• Lifelong Vitality (metabolic support)
**Marketing Angle:** "Natural metabolic optimization. Support healthy blood sugar and weight without injections."
**UPGRADE PATH:** Flag for practitioner review - Jenna offers integrative protocols beyond doTERRA for advanced metabolic support

**6. PERSONALIZED WELLNESS (DNA, Labs, Custom Protocols)**
**Trend:** One-size-fits-all is dead, consumers want personalized
**iTerra Position:**
• Specialized intake forms (hormonal, metabolic, athletic, beauty)
• AI-generated custom protocols
• **TIER 3 UPSELL:** Lab interpretation, genetic tendency protocols, custom supplement stacking with Jenna Williams via Fullscript
**Marketing Angle:** "Your body is unique. Your protocol should be too. Take our specialized assessment for personalized recommendations."

**7. BRAIN HEALTH & COGNITIVE PERFORMANCE**
**Trend:** Nootropics, focus supplements, brain optimization
**doTERRA Position:**
• InTune Focus Blend (concentration support)
• Peppermint (mental clarity)
• Rosemary (memory support)
• Copaiba (neuroinflammation)
**Marketing Angle:** "Natural cognitive enhancement for focus, memory, and mental clarity."

**HOW TO POSITION THESE TRENDS:**
• Use trending keywords in social media (#longevity #hormonehealth #sleepoptimization)
• Create content around trending topics (your solution)
• Ride the wave of consumer interest
• Position doTERRA as research-backed alternative to pharmaceuticals/expensive treatments`
    }
  ];

  const tier2Courses = courses.filter(c => c.requiredTier === "tier2" || c.requiredTier === "tier1");
  const tier3Courses = courses.filter(c => c.requiredTier === "tier3");

  return (
    <div>
      <div style={{padding:24,borderRadius:16,background:"linear-gradient(180deg, rgba(218,165,112,0.12), rgba(185,135,93,0.08))",border:"1px solid rgba(218,165,112,0.2)",marginBottom:24}}>
        <h3 style={{fontSize:20,color:"var(--champagne)",marginBottom:10,fontWeight:700}}>📚 Mini-Course Library</h3>
        <p style={{fontSize:14,color:"var(--rosegold)",lineHeight:1.6}}>
          Quick 5-10 minute training modules on essential wellness topics. Complete at your own pace.
        </p>
      </div>

      <div style={{display:"grid",gap:16}}>
        {courses.map(course => {
          const locked = !hasAccess(course.requiredTier);
          const isExpanded = expandedCourse === course.id;
          
          return (
            <div key={course.id} style={{borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)",overflow:"hidden"}}>
              <button
                onClick={() => !locked && setExpandedCourse(isExpanded ? null : course.id)}
                disabled={locked}
                style={{width:"100%",padding:20,background:isExpanded?"rgba(218,165,112,0.08)":"transparent",border:0,cursor:locked?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",textAlign:"left"}}
              >
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
                    {locked ? <Lock className="w-5 h-5" style={{color:"var(--rosegold)",opacity:0.5}} /> : <PlayCircle className="w-5 h-5" style={{color:"var(--rosegold)"}} />}
                    <h4 style={{fontSize:16,color:locked?"rgba(245,222,179,0.5)":"var(--champagne)",fontWeight:700}}>{course.title}</h4>
                  </div>
                  <p style={{fontSize:13,color:locked?"rgba(245,222,179,0.4)":"var(--rosegold)",lineHeight:1.5}}>{course.description}</p>
                  <div style={{display:"flex",gap:12,marginTop:8,alignItems:"center"}}>
                    <span style={{fontSize:11,color:locked?"rgba(245,222,179,0.4)":"var(--rosegold)",padding:"4px 10px",borderRadius:20,background:"rgba(218,165,112,0.1)"}}>
                      ⏱ {course.duration}
                    </span>
                    {locked && (
                      <span style={{fontSize:11,color:"rgba(138,43,226,0.8)",padding:"4px 10px",borderRadius:20,background:"rgba(138,43,226,0.15)",fontWeight:600}}>
                        {course.requiredTier.toUpperCase()} REQUIRED
                      </span>
                    )}
                  </div>
                </div>
                {!locked && (
                  <div style={{fontSize:20,color:"var(--rosegold)"}}>{isExpanded ? "−" : "+"}</div>
                )}
              </button>

              {isExpanded && !locked && (
                <div style={{padding:24,borderTop:"1px solid rgba(218,165,112,0.15)",background:"rgba(0,0,0,0.15)"}}>
                  <div style={{fontSize:13,color:"var(--champagne)",lineHeight:1.8,whiteSpace:"pre-wrap"}}>
                    {course.content}
                  </div>
                  <div style={{marginTop:20,padding:12,borderRadius:8,background:"rgba(74,222,128,0.1)",border:"1px solid rgba(74,222,128,0.2)"}}>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <CheckCircle className="w-5 h-5" style={{color:"#4ade80"}} />
                      <span style={{fontSize:13,color:"#4ade80",fontWeight:600}}>Course Completed!</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}