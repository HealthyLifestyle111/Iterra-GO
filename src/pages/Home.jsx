import React, { useEffect, useRef, useState } from "react";

export default function IterraVitalityDropdown() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFeminineDropdown, setShowFeminineDropdown] = useState(false);
  const [showAgelessDropdown, setShowAgelessDropdown] = useState(false);
  const [showPetDropdown, setShowPetDropdown] = useState(false);
  const [showHomeDropdown, setShowHomeDropdown] = useState(false);
  const [selectedAgelessCategory, setSelectedAgelessCategory] = useState(null);
  const [selectedAgelessPillar, setSelectedAgelessPillar] = useState(null);
  const [selectedPetType, setSelectedPetType] = useState(null);
  const [selectedPetPillar, setSelectedPetPillar] = useState(null);
  const [selectedMasculinePillar, setSelectedMasculinePillar] = useState(null);
  const [selectedFemininePillar, setSelectedFemininePillar] = useState(null);
  const [selectedHomePillar, setSelectedHomePillar] = useState(null);
  const triggerRef = useRef(null);

  const doterraBaseUrl = "https://my.doterra.com/jennawilliams1/p/";

  const navigateTo = (path) => { if (typeof window !== "undefined") window.location.assign(path); };
  const openLink = (url) => { if (typeof window !== "undefined") window.open(url, '_blank'); };

  useEffect(() => {
    function makeDust() {
      const d = document.createElement("div");
      d.className = "gold-dust";
      d.style.left = Math.random() * 100 + "vw";
      d.style.animationDelay = Math.random() * 20 + "s";
      d.style.animationDuration = 20 + Math.random() * 15 + "s";
      document.body.appendChild(d);
      setTimeout(() => d.remove(), 45000);
    }
    const interval = setInterval(makeDust, 1500);
    for (let i = 0; i < 8; i++) setTimeout(makeDust, i * 400);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const body = document.body;
    if (showDropdown || showFeminineDropdown || showAgelessDropdown || showPetDropdown || showHomeDropdown)
      body.classList.add("no-scroll");
    else body.classList.remove("no-scroll");
    return () => body.classList.remove("no-scroll");
  }, [showDropdown, showFeminineDropdown, showAgelessDropdown, showPetDropdown, showHomeDropdown]);

  const masculinePillars = {
    warrior: {
      title: "WARRIOR", subtitle: "Energy • Focus • Immunity",
      tiers: [
        { name: "Tier 1 — Foundational Power", products: [
          { name: "Lifelong Vitality Pack", slug: "lifelong-vitality-pack" },
          { name: "PB Assist+", slug: "pb-assist" },
          { name: "Protective Blend", slug: "on-guard-protective-blend" },
          { name: "Peppermint Essential Oil", slug: "peppermint-oil" }
        ]},
        { name: "Tier 2 — Enhanced Stamina", products: [
          { name: "Mito2Max Energy Complex", slug: "mito2max-energy-complex" },
          { name: "Calming Blend", slug: "adaptiv-calming-blend" }
        ]},
        { name: "Tier 3 — DIY Warrior Elixir (Roll-On)", description: "A Roll-On Blend for focused energy and vitality.",
          diy: { ingredients: [
            { name: "Fractionated Coconut Oil", slug: "fractionated-coconut-oil" },
            { name: "Frankincense", slug: "frankincense-oil" },
            { name: "Copaiba", slug: "copaiba-oil" },
            { name: "Peppermint", slug: "peppermint-oil" }
          ], instructions: "Combine 6 drops Peppermint, 4 drops Frankincense, and 2 drops Copaiba in a 10 mL roller bottle. Top with Fractionated Coconut Oil. Apply to the temples and back of the neck each morning." }}
      ]
    },
    agileBody: {
      title: "AGILE BODY", subtitle: "Weight Management • Mobility • Recovery",
      tiers: [
        { name: "Tier 1 — Lean Foundation", products: [
          { name: "Lifelong Vitality Pack", slug: "lifelong-vitality-pack" },
          { name: "Metabolic Blend Softgels", slug: "smart-sassy-metabolic-blend-softgels" },
          { name: "Soothing Cream", slug: "deep-blue-rub" }
        ]},
        { name: "Tier 2 — Performance Enhancement", products: [
          { name: "Turmeric Dual Chamber Caps", slug: "turmeric-dual-chamber-caps" },
          { name: "AromaTouch Massage Blend", slug: "aromatouch-massage-blend" }
        ]},
        { name: "Tier 3 — DIY Recovery Balm", description: "A deeply penetrating topical balm for post-training relief.",
          diy: { ingredients: [
            { name: "Fractionated Coconut Oil", slug: "fractionated-coconut-oil" },
            { name: "Soothing Blend Oil", slug: "deep-blue-oil" },
            { name: "Peppermint", slug: "peppermint-oil" },
            { name: "Copaiba", slug: "copaiba-oil" }
          ], instructions: "Combine 2 Tbsp Fractionated Coconut Oil, 8 drops Soothing Blend Oil, 4 drops Peppermint, and 3 drops Copaiba in a 30 mL tin. Massage into muscles post-training." }}
      ]
    },
    presence: {
      title: "PRESENCE", subtitle: "Mental Clarity • Leadership • Calm",
      tiers: [
        { name: "Tier 1 — Balanced Mind", products: [
          { name: "Lifelong Vitality Pack", slug: "lifelong-vitality-pack" },
          { name: "Grounding Blend", slug: "balance-grounding-blend" },
          { name: "Citrus Bloom Spring Blend", slug: "citrus-bloom" }
        ]},
        { name: "Tier 2 — Executive Flow", products: [
          { name: "DDR Prime Cellular Complex", slug: "ddr-prime-cellular-complex" },
          { name: "Rosemary Essential Oil", slug: "rosemary-oil" }
        ]},
        { name: "Tier 3 — DIY Presence Elixir (Roll-On)", description: "A calming and centering Roll-On for mental clarity under pressure.",
          diy: { ingredients: [
            { name: "Fractionated Coconut Oil", slug: "fractionated-coconut-oil" },
            { name: "Vetiver", slug: "vetiver-oil" },
            { name: "Cedarwood", slug: "cedarwood-oil" },
            { name: "Wild Orange", slug: "wild-orange-oil" }
          ], instructions: "Combine 5 drops Vetiver, 4 drops Cedarwood, and 3 drops Wild Orange in a 10 mL roller bottle. Top with Fractionated Coconut Oil. Roll onto pulse points (wrists, behind ears) before meetings." }}
      ]
    },
    legacy: {
      title: "LEGACY", subtitle: "Longevity • Hair & Beard Vitality • Cellular Renewal",
      tiers: [
        { name: "Tier 1 — Cellular Renewal", products: [
          { name: "Lifelong Vitality Pack", slug: "lifelong-vitality-pack" },
          { name: "Yarrow|Pom Serum", slug: "yarrow-pom-serum" }
        ]},
        { name: "Tier 2 — Advanced Regeneration", products: [
          { name: "MetaPWR System", slug: "metapwr-system" },
          { name: "Rosemary Essential Oil", slug: "rosemary-oil" },
          { name: "Cedarwood Essential Oil", slug: "cedarwood-oil" }
        ]},
        { name: "Tier 3 — DIY Hair & Beard Elixir (Dropper)", description: "A nutritive oil blend to support healthy growth and shine.",
          diy: { ingredients: [
            { name: "Fractionated Coconut Oil", slug: "fractionated-coconut-oil" },
            { name: "Jojoba Oil", slug: "jojoba-oil" },
            { name: "Rosemary", slug: "rosemary-oil" },
            { name: "Cedarwood", slug: "cedarwood-oil" },
            { name: "Sandalwood", slug: "sandalwood-oil-hawaiian" }
          ], instructions: "Combine 15 mL Jojoba Oil, 15 mL Fractionated Coconut Oil, 6 drops Rosemary, 4 drops Cedarwood, and 2 drops Sandalwood in a 30 mL dropper bottle. Shake well. Massage a few drops into the scalp or beard nightly." }}
      ]
    }
  };

  const femininePillars = {
    sovereign: {
      title: "SOVEREIGN", subtitle: "Hormonal Harmony • Cycle Support • Vitality",
      tiers: [
        { name: "Tier 1 — Foundational Harmony", products: [
          { name: "Lifelong Vitality Pack", slug: "lifelong-vitality-pack" },
          { name: "Monthly Blend for Women", slug: "clarycalm-oil" },
          { name: "Phytoestrogen Complex", slug: "phytoestrogen-complex" },
          { name: "Lavender Essential Oil", slug: "lavender-oil" }
        ]},
        { name: "Tier 2 — Enhanced Balance", products: [
          { name: "Bone Nutrient Complex", slug: "bone-nutrient-essential-complex" },
          { name: "Clary Sage Essential Oil", slug: "clary-sage-oil" },
          { name: "Feminine Blend", slug: "whisper-blend" }
        ]},
        { name: "Tier 3 — DIY Cycle Harmony Roll-On", description: "A soothing Roll-On for hormonal balance and emotional grounding throughout your cycle.",
          diy: { ingredients: [
            { name: "Fractionated Coconut Oil", slug: "fractionated-coconut-oil" },
            { name: "Clary Sage", slug: "clary-sage-oil" },
            { name: "Geranium", slug: "geranium-oil" },
            { name: "Ylang Ylang", slug: "ylang-ylang-oil" }
          ], instructions: "Combine 5 drops Clary Sage, 3 drops Geranium, and 2 drops Ylang Ylang in a 10 mL roller bottle. Top with Fractionated Coconut Oil. Apply to abdomen, lower back, and pulse points throughout your cycle." }}
      ],
      lifeCycleGuide: {
        title: "Supporting Natural Rhythms: A Life-Cycle Guide",
        description: "This section utilizes the Tier 1 and Tier 2 products, demonstrating how to use them specifically to support different phases of a woman's natural cycle.",
        phases: [
          { name: "PMS & Menstrual Support (Pre-Menopause)", focus: "Comfort, emotional soothing, and topical relief.", internal: "Take Lifelong Vitality Pack daily. Use Phytoestrogen Complex (1-2 capsules daily) to support hormone balance, minimizing monthly swings.", topical: "Apply the Monthly Blend for Women (ClaryCalm) directly to the lower abdomen and back for a cooling, soothing sensation, or use with a warm compress. Diffuse Ylang Ylang or Lavender for emotional grounding and managing mood swings." },
          { name: "Peri-Menopause Transition", focus: "Bone health, balancing fluctuations, and managing comfort/heat.", internal: "Continue the Lifelong Vitality Pack. Increase Bone Nutrient Complex to the full daily dose, and use the Phytoestrogen Complex (2 capsules daily) to manage hormone fluctuations and support healthy bones/heart.", topical: "Apply Monthly Blend for Women (ClaryCalm) to the back of the neck or soles of the feet for a rapid cooling sensation during moments of heat/flushing. Use Clary Sage or Feminine Blend for emotional support." },
          { name: "Post-Menopause & Longevity", focus: "Long-term support for bone density, cardiovascular health, and cellular renewal.", internal: "Maintain the Lifelong Vitality Pack, Bone Nutrient Complex (full dose), and Phytoestrogen Complex (2 capsules daily) for comprehensive support of bone, heart, and breast tissue health.", topical: "Dilute Frankincense (2 drops in a teaspoon of carrier oil) and apply to the face and hands daily for cellular and anti-aging skin support. Use Lavender or Ylang Ylang to promote feelings of calm, joy, and emotional stability." }
        ]
      }
    },
    flowingForm: {
      title: "FLOWING FORM", subtitle: "Weight Management • Graceful Movement • Recovery",
      tiers: [
        { name: "Tier 1 — Foundation of Grace", products: [
          { name: "Lifelong Vitality Pack", slug: "lifelong-vitality-pack" },
          { name: "Metabolic Blend Softgels", slug: "smart-sassy-metabolic-blend-softgels" },
          { name: "Soothing Cream", slug: "deep-blue-rub" }
        ]},
        { name: "Tier 2 — Enhanced Mobility", products: [
          { name: "Turmeric Dual Chamber Caps", slug: "turmeric-dual-chamber-caps" },
          { name: "AromaTouch Massage Blend", slug: "aromatouch-massage-blend" }
        ]},
        { name: "Tier 3 — DIY Feminine Recovery Blend", description: "A gentle, aromatic blend for post-movement recovery and muscle soothing.",
          diy: { ingredients: [
            { name: "Fractionated Coconut Oil", slug: "fractionated-coconut-oil" },
            { name: "Soothing Blend Oil", slug: "deep-blue-oil" },
            { name: "Lavender", slug: "lavender-oil" },
            { name: "Marjoram", slug: "marjoram-oil" }
          ], instructions: "Combine 2 Tbsp Fractionated Coconut Oil, 6 drops Soothing Blend Oil, 4 drops Lavender, and 3 drops Marjoram in a 30 mL roller bottle. Apply to neck, shoulders, legs, and areas of tension." }}
      ]
    },
    radiance: {
      title: "RADIANCE", subtitle: "Emotional Balance • Inner Light • Clarity",
      tiers: [
        { name: "Tier 1 — Luminous Foundation", products: [
          { name: "Lifelong Vitality Pack", slug: "lifelong-vitality-pack" },
          { name: "Uplifting Blend", slug: "elevation-joyful-blend" },
          { name: "Grounding Blend", slug: "balance-grounding-blend" },
          { name: "Bergamot Essential Oil", slug: "bergamot-oil" }
        ]},
        { name: "Tier 2 — Emotional Mastery", products: [
          { name: "Calming Blend", slug: "adaptiv-calming-blend" },
          { name: "Rose Essential Oil", slug: "rose-oil" }
        ]},
        { name: "Tier 3 — DIY Radiance Elixir (Roll-On)", description: "A mood-elevating and emotionally centering Roll-On for daily empowerment.",
          diy: { ingredients: [
            { name: "Fractionated Coconut Oil", slug: "fractionated-coconut-oil" },
            { name: "Bergamot", slug: "bergamot-oil" },
            { name: "Ylang Ylang", slug: "ylang-ylang-oil" },
            { name: "Frankincense", slug: "frankincense-oil" }
          ], instructions: "Combine 4 drops Bergamot, 3 drops Ylang Ylang, and 3 drops Frankincense in a 10 mL roller bottle. Top with Fractionated Coconut Oil. Roll onto heart center, wrists, and behind ears for emotional balance." }}
      ]
    },
    eternal: {
      title: "ETERNAL", subtitle: "Cellular Renewal • Timeless Beauty • Longevity",
      tiers: [
        { name: "Tier 1 — Ageless Foundation", products: [
          { name: "Lifelong Vitality Pack", slug: "lifelong-vitality-pack" },
          { name: "Yarrow|Pom Serum", slug: "yarrow-pom-serum" },
          { name: "Anti-Aging Blend", slug: "immortelle-anti-aging-blend" }
        ]},
        { name: "Tier 2 — Deep Regeneration", products: [
          { name: "Yarrow|Pom Cellular Beauty Capsules", slug: "yarrow-pom-capsules" },
          { name: "MetaPWR System", slug: "metapwr-system" },
          { name: "Frankincense Essential Oil", slug: "frankincense-oil" }
        ]},
        { name: "Tier 3 — DIY Timeless Beauty Serum", description: "A luxurious facial serum for cellular renewal and radiant skin.",
          diy: { ingredients: [
            { name: "Jojoba Oil", slug: "jojoba-oil" },
            { name: "Argan Oil", slug: "argan-oil" },
            { name: "Frankincense", slug: "frankincense-oil" },
            { name: "Lavender", slug: "lavender-oil" },
            { name: "Myrrh", slug: "myrrh-oil" }
          ], instructions: "Combine 15 mL Jojoba Oil, 15 mL Argan Oil, 4 drops Frankincense, 3 drops Lavender, and 2 drops Myrrh in a 30 mL dropper bottle. Shake well. Apply 3-4 drops to face and neck morning and evening after cleansing." }}
      ]
    }
  };

  const homePillars = {
    cleanHome: {
      title: "CLEAN HOME", subtitle: "Non-Toxic Cleaning • Purification • Safety",
      tiers: [
        { name: "Tier 1 — Essential Cleaners", products: [
          { name: "Protective Blend Cleaner Concentrate", slug: "on-guard-cleaner-concentrate" },
          { name: "Lemon Essential Oil", slug: "lemon-oil" },
          { name: "Protective Blend", slug: "on-guard-protective-blend" },
          { name: "Wild Orange Essential Oil", slug: "wild-orange-oil" }
        ]},
        { name: "Tier 2 — Advanced Surface Care", products: [
          { name: "Melaleuca Essential Oil", slug: "melaleuca-oil" },
          { name: "Purify Cleansing Blend", slug: "purify-cleansing-blend" }
        ]},
        { name: "Tier 3 — DIY All-Purpose Cleaner", description: "A powerful, non-toxic spray for every surface in your home.",
          diy: { ingredients: [
            { name: "Protective Blend Cleaner Concentrate", slug: "on-guard-cleaner-concentrate" },
            { name: "Lemon Essential Oil", slug: "lemon-oil" },
            { name: "Melaleuca Essential Oil", slug: "melaleuca-oil" }
          ], instructions: "Add 1 capful of Protective Blend Cleaner Concentrate to a 16 oz spray bottle. Add 5 drops Lemon and 5 drops Melaleuca, fill with water. Shake and spray on surfaces, wipe clean." }}
      ]
    },
    immuneHome: {
      title: "IMMUNE HOME", subtitle: "Air Purification • Immune Boost • Protection",
      tiers: [
        { name: "Tier 1 — Daily Defense", products: [
          { name: "Protective Blend", slug: "on-guard-protective-blend" },
          { name: "Breathe Respiratory Blend", slug: "breathe-respiratory-blend" },
          { name: "Lavender Essential Oil", slug: "lavender-oil" }
        ]},
        { name: "Tier 2 — Advanced Air Care", products: [
          { name: "Purify Cleansing Blend", slug: "purify-cleansing-blend" },
          { name: "Frankincense Essential Oil", slug: "frankincense-oil" }
        ]},
        { name: "Tier 3 — DIY Immune Diffuser Blend", description: "A protective diffuser blend to fortify your home's air.",
          diy: { ingredients: [
            { name: "Protective Blend", slug: "on-guard-protective-blend" },
            { name: "Frankincense Essential Oil", slug: "frankincense-oil" },
            { name: "Wild Orange Essential Oil", slug: "wild-orange-oil" }
          ], instructions: "Add 3 drops Protective Blend, 2 drops Frankincense, and 2 drops Wild Orange to your diffuser with water. Run for 30–60 minutes in common areas, especially during seasonal transitions." }}
      ]
    },
    sacredSpace: {
      title: "SACRED SPACE", subtitle: "Energy Cleansing • Grounding • Atmosphere",
      tiers: [
        { name: "Tier 1 — Space Clearing", products: [
          { name: "Grounding Blend", slug: "balance-grounding-blend" },
          { name: "Cedarwood Essential Oil", slug: "cedarwood-oil" },
          { name: "Frankincense Essential Oil", slug: "frankincense-oil" }
        ]},
        { name: "Tier 2 — Elevated Atmosphere", products: [
          { name: "Uplifting Blend", slug: "elevation-joyful-blend" },
          { name: "Vetiver Essential Oil", slug: "vetiver-oil" }
        ]},
        { name: "Tier 3 — DIY Sacred Space Mist (Spray Bottle)", description: "An aromatic room mist for energetic clearing and grounding.",
          diy: { ingredients: [
            { name: "Frankincense Essential Oil", slug: "frankincense-oil" },
            { name: "Cedarwood Essential Oil", slug: "cedarwood-oil" },
            { name: "Grounding Blend", slug: "balance-grounding-blend" }
          ], instructions: "Combine 10 drops Frankincense, 8 drops Cedarwood, and 5 drops Grounding Blend in a 4 oz glass spray bottle with distilled water and a small amount of alcohol (to disperse oils). Shake well and mist around your space before meditation, yoga, or rest." }}
      ]
    },
    seasonalGifting: {
      title: "SEASONAL GIFTING", subtitle: "Celebration • Rituals • Gifting Blends",
      tiers: [
        { name: "Tier 1 — Signature Gift Oils", products: [
          { name: "Wild Orange Essential Oil", slug: "wild-orange-oil" },
          { name: "Cinnamon Essential Oil", slug: "cinnamon-oil" },
          { name: "Holiday Blend", slug: "holiday-peace-blend" }
        ]},
        { name: "Tier 2 — Curated Collections", products: [
          { name: "Citrus Bloom Spring Blend", slug: "citrus-bloom" },
          { name: "Lavender Essential Oil", slug: "lavender-oil" }
        ]},
        { name: "Tier 3 — DIY Seasonal Gift Roller", description: "A warm, festive roller blend perfect for gifting any season.",
          diy: { ingredients: [
            { name: "Fractionated Coconut Oil", slug: "fractionated-coconut-oil" },
            { name: "Wild Orange Essential Oil", slug: "wild-orange-oil" },
            { name: "Cinnamon Essential Oil", slug: "cinnamon-oil" },
            { name: "Frankincense Essential Oil", slug: "frankincense-oil" }
          ], instructions: "Combine 5 drops Wild Orange, 3 drops Cinnamon, and 2 drops Frankincense in a 10 mL roller bottle. Top with Fractionated Coconut Oil. Attach a handwritten label and gift to loved ones as a personal wellness token." }}
      ]
    }
  };

  const agelessPillars = {
    children: {
      title: "CHILDREN", subtitle: "Immunity • Focus • Calm • Growth",
      description: "Nurturing growth, immunity, and natural vitality for young ones.",
      tiers: [
        { name: "Tier 1 — Kids Foundation", products: [
          { name: "Kids Collection", slug: "kids-collection" },
          { name: "Protective Blend Softgels", slug: "on-guard-softgels" },
          { name: "Lavender Essential Oil", slug: "lavender-oil" }
        ]},
        { name: "Tier 2 — Enhanced Support", products: [
          { name: "PB Assist Jr", slug: "pb-assist-jr" },
          { name: "Breathe Respiratory Blend", slug: "breathe-respiratory-blend" }
        ]},
        { name: "Tier 3 — DIY Kids Calm Roll-On", description: "A gentle, kid-safe calming roller for bedtime or anxious moments.",
          diy: { ingredients: [
            { name: "Fractionated Coconut Oil", slug: "fractionated-coconut-oil" },
            { name: "Lavender Essential Oil", slug: "lavender-oil" },
            { name: "Grounding Blend", slug: "balance-grounding-blend" },
            { name: "Vetiver Essential Oil", slug: "vetiver-oil" }
          ], instructions: "Combine 3 drops Lavender, 2 drops Grounding Blend, and 1 drop Vetiver in a 10 mL roller bottle. Top with Fractionated Coconut Oil. Roll on the bottoms of feet and behind ears before bedtime." }}
      ]
    },
    mature: {
      title: "MATURE ADULTS", subtitle: "Longevity • Joints • Cognition • Heart",
      description: "Graceful aging with cellular regeneration and timeless energy.",
      tiers: [
        { name: "Tier 1 — Longevity Foundation", products: [
          { name: "Lifelong Vitality Pack", slug: "lifelong-vitality-pack" },
          { name: "Bone Nutrient Complex", slug: "bone-nutrient-essential-complex" },
          { name: "Frankincense Essential Oil", slug: "frankincense-oil" }
        ]},
        { name: "Tier 2 — Advanced Cellular Support", products: [
          { name: "DDR Prime Cellular Complex", slug: "ddr-prime-cellular-complex" },
          { name: "Soothing Blend Oil", slug: "deep-blue-oil" },
          { name: "MetaPWR System", slug: "metapwr-system" }
        ]},
        { name: "Tier 3 — DIY Longevity Serum (Dropper)", description: "A cellular-nourishing oil blend for daily topical support.",
          diy: { ingredients: [
            { name: "Fractionated Coconut Oil", slug: "fractionated-coconut-oil" },
            { name: "Frankincense Essential Oil", slug: "frankincense-oil" },
            { name: "Yarrow|Pom Serum", slug: "yarrow-pom-serum" },
            { name: "Myrrh Essential Oil", slug: "myrrh-oil" }
          ], instructions: "Combine 10 mL Fractionated Coconut Oil, 5 drops Frankincense, 5 drops Myrrh in a 30 mL dropper bottle with Yarrow|Pom Serum. Shake gently. Apply 3–4 drops to face, neck, and hands morning and evening." }}
      ]
    }
  };

  const petPillars = {
    dogs: {
      title: "CANINE WELLNESS", subtitle: "Calm • Joints • Coat • Digestion",
      description: "Holistic care for your loyal companion's vitality and joy.",
      tiers: [
        { name: "Tier 1 — Daily Canine Essentials", products: [
          { name: "Fractionated Coconut Oil", slug: "fractionated-coconut-oil" },
          { name: "Lavender Essential Oil", slug: "lavender-oil" },
          { name: "Copaiba Essential Oil", slug: "copaiba-oil" }
        ]},
        { name: "Tier 2 — Targeted Support", products: [
          { name: "Grounding Blend", slug: "balance-grounding-blend" },
          { name: "AromaTouch Massage Blend", slug: "aromatouch-massage-blend" }
        ]},
        { name: "Tier 3 — DIY Dog Calm Roller", description: "A heavily diluted calming blend for anxious dogs.",
          diy: { ingredients: [
            { name: "Fractionated Coconut Oil", slug: "fractionated-coconut-oil" },
            { name: "Lavender Essential Oil", slug: "lavender-oil" },
            { name: "Grounding Blend", slug: "balance-grounding-blend" }
          ], instructions: "Combine 2 drops Lavender and 1 drop Grounding Blend in a 10 mL roller bottle. Fill entirely with Fractionated Coconut Oil (high dilution is essential for pets). Apply to the dog's collar or base of tail — never near the face." }}
      ]
    },
    cats: {
      title: "FELINE WELLNESS", subtitle: "Calm • Respiratory • Digestion • Coat",
      description: "Gentle, effective care honoring your cat's sensitive nature.",
      tiers: [
        { name: "Tier 1 — Safe Feline Diffusion", products: [
          { name: "Lavender Essential Oil", slug: "lavender-oil" },
          { name: "Fractionated Coconut Oil", slug: "fractionated-coconut-oil" }
        ]},
        { name: "Tier 2 — Environmental Support", products: [
          { name: "Cedarwood Essential Oil", slug: "cedarwood-oil" },
          { name: "Frankincense Essential Oil", slug: "frankincense-oil" }
        ]},
        { name: "Tier 3 — DIY Feline Safe Room Mist", description: "A gentle aromatic mist for feline-safe calming environments.",
          diy: { ingredients: [
            { name: "Lavender Essential Oil", slug: "lavender-oil" },
            { name: "Cedarwood Essential Oil", slug: "cedarwood-oil" }
          ], instructions: "Add 2 drops Lavender and 1 drop Cedarwood to a diffuser in a well-ventilated room. Always allow the cat to leave if they choose. Never apply essential oils topically to cats without veterinary guidance." }}
      ]
    },
    horses: {
      title: "EQUINE WELLNESS", subtitle: "Recovery • Coat • Respiratory • Calm",
      description: "Powerful yet gentle protocols for your majestic partner.",
      tiers: [
        { name: "Tier 1 — Equine Foundations", products: [
          { name: "AromaTouch Massage Blend", slug: "aromatouch-massage-blend" },
          { name: "Fractionated Coconut Oil", slug: "fractionated-coconut-oil" },
          { name: "Peppermint Essential Oil", slug: "peppermint-oil" }
        ]},
        { name: "Tier 2 — Performance Support", products: [
          { name: "Soothing Blend Oil", slug: "deep-blue-oil" },
          { name: "Copaiba Essential Oil", slug: "copaiba-oil" }
        ]},
        { name: "Tier 3 — DIY Equine Muscle Rub", description: "A diluted recovery blend for post-ride muscle support.",
          diy: { ingredients: [
            { name: "Fractionated Coconut Oil", slug: "fractionated-coconut-oil" },
            { name: "Soothing Blend Oil", slug: "deep-blue-oil" },
            { name: "Peppermint Essential Oil", slug: "peppermint-oil" },
            { name: "Copaiba Essential Oil", slug: "copaiba-oil" }
          ], instructions: "Combine 30 mL Fractionated Coconut Oil with 8 drops Soothing Blend Oil, 5 drops Peppermint, and 5 drops Copaiba. Massage into large muscle groups after riding or training. Always spot-test first." }}
      ]
    },
    parrots: {
      title: "AVIAN WELLNESS", subtitle: "Respiratory • Feathers • Calm • Immunity",
      description: "Specialized care for your intelligent feathered friend.",
      tiers: [
        { name: "Tier 1 — Safe Avian Diffusion", products: [
          { name: "Lavender Essential Oil", slug: "lavender-oil" },
          { name: "Frankincense Essential Oil", slug: "frankincense-oil" }
        ]},
        { name: "Tier 2 — Air Quality Support", products: [
          { name: "Breathe Respiratory Blend", slug: "breathe-respiratory-blend" }
        ]},
        { name: "Tier 3 — DIY Bird-Safe Calm Diffusion", description: "A bird-safe aromatic blend for calming and air support.",
          diy: { ingredients: [
            { name: "Lavender Essential Oil", slug: "lavender-oil" },
            { name: "Frankincense Essential Oil", slug: "frankincense-oil" }
          ], instructions: "Add 1 drop Lavender and 1 drop Frankincense to a diffuser in a large, well-ventilated room far from the bird's cage. Birds have extremely sensitive respiratory systems — always use minimal amounts and monitor closely. Never use citrus, eucalyptus, tea tree, or cinnamon near birds." }}
      ]
    },
    chickens: {
      title: "POULTRY WELLNESS", subtitle: "Respiratory • Immunity • Flock Health",
      description: "Natural flock health for backyard chicken keepers.",
      tiers: [
        { name: "Tier 1 — Coop Essentials", products: [
          { name: "Protective Blend", slug: "on-guard-protective-blend" },
          { name: "Oregano Essential Oil", slug: "oregano-oil" }
        ]},
        { name: "Tier 2 — Flock Support", products: [
          { name: "Melaleuca Essential Oil", slug: "melaleuca-oil" },
          { name: "Lavender Essential Oil", slug: "lavender-oil" }
        ]},
        { name: "Tier 3 — DIY Coop Cleaner Spray", description: "A natural disinfecting spray for coop maintenance.",
          diy: { ingredients: [
            { name: "Protective Blend", slug: "on-guard-protective-blend" },
            { name: "Melaleuca Essential Oil", slug: "melaleuca-oil" },
            { name: "Lemon Essential Oil", slug: "lemon-oil" }
          ], instructions: "Add 10 drops Protective Blend, 8 drops Melaleuca, and 5 drops Lemon to a 16 oz spray bottle filled with water. Spray on coop surfaces, nesting boxes, and perches. Ventilate well before returning birds. Do not spray directly on chickens." }}
      ]
    }
  };

  const foundationalResources = {
    nutrition: { title: "Foundation: Nutrition", description: "Core Supplement Bundle: A complete pack of multivitamins, probiotics and essential oils for daily foundational nutrition.", link: `${doterraBaseUrl}foundational-wellness-bundle`, linkText: "Shop Foundational Wellness Bundle" },
    hydration: {
      title: "Foundation: Hydration", guideline: "35 mL per kg of body weight daily. Increase based on activity level and environment.",
      protocol: [
        { time: "Morning (Energize & Cleanse)", instruction: "1-2 drops of citrus oil in water", link: `${doterraBaseUrl}lemon-oil`, linkText: "Lemon Oil" },
        { time: "Noon (Focus & Digest)", instruction: "1 drop of mint oil in water", link: `${doterraBaseUrl}peppermint-oil`, linkText: "Peppermint Oil" },
        { time: "Evening (Calm & Soothe)", instruction: "1-2 drops of floral oil in warm water", link: `${doterraBaseUrl}lavender-oil`, linkText: "Lavender Oil" }
      ]
    },
    sleep: { title: "Foundation: Sleep System", description: "Complete Sleep System: A full system including a supplement, a topical oil blend, and a diffusable oil blend for rest.", link: `${doterraBaseUrl}serenity-sleep-system`, linkText: "Shop Serenity Sleep System" },
    weightAndActivity: {
      title: "Foundation: Weight & Physical Activity Guidelines",
      men: { title: "Men's Guidelines", ageGroups: [
        { range: "Ages 18-30", activity: "150-300 min/week moderate OR 75-150 min/week vigorous aerobic activity", strength: "2+ days/week full-body strength training", flexibility: "2-3 days/week stretching/mobility work", recovery: "1-2 rest days/week for muscle repair" },
        { range: "Ages 31-50", activity: "150-300 min/week moderate aerobic (brisk walking, cycling)", strength: "2-3 days/week strength training (focus on maintaining muscle mass)", flexibility: "3 days/week stretching (prevent stiffness)", recovery: "2 rest days/week; prioritize sleep 7-9 hours" },
        { range: "Ages 51-70", activity: "150 min/week moderate aerobic (walking, swimming)", strength: "2 days/week functional strength (maintain independence)", flexibility: "Daily gentle stretching, balance work 2-3x/week", recovery: "Active recovery (gentle movement); monitor joint health" },
        { range: "Ages 70+", activity: "As able, focus on daily movement (walking 20-30 min)", strength: "Light resistance 2x/week (resistance bands, bodyweight)", flexibility: "Daily mobility work; chair yoga; fall prevention exercises", recovery: "Prioritize rest, hydration, and gradual progression" }
      ], weightGuidelines: "Healthy BMI: 18.5-24.9. Waist circumference: <40 inches (102 cm). Focus on muscle mass maintenance, especially after age 30." },
      women: { title: "Women's Guidelines", ageGroups: [
        { range: "Ages 18-30", activity: "150-300 min/week moderate OR 75-150 min/week vigorous activity", strength: "2+ days/week strength training (bone density support)", flexibility: "2-3 days/week yoga, Pilates, or stretching", recovery: "1-2 rest days; adjust intensity during menstrual cycle", cycleNote: "Follicular phase (days 1-14): Higher intensity. Luteal phase (days 15-28): Moderate intensity, more rest." },
        { range: "Ages 31-50", activity: "150-300 min/week moderate aerobic activity", strength: "2-3 days/week resistance training (combat muscle loss)", flexibility: "3-4 days/week stretching, yoga", recovery: "2 rest days; prioritize stress management and sleep", cycleNote: "Peri-menopause: Adjust based on energy levels and hormonal fluctuations." },
        { range: "Ages 51-70", activity: "150 min/week moderate activity (walking, dancing, water aerobics)", strength: "2-3 days/week strength training (bone health critical)", flexibility: "Daily stretching; balance exercises 3x/week", recovery: "Focus on joint-friendly activities; monitor bone density", menopauseNote: "Post-menopause: Strength training essential for bone density and metabolic health." },
        { range: "Ages 70+", activity: "Daily movement as able (walking 15-30 min)", strength: "2x/week light resistance (prevent sarcopenia)", flexibility: "Daily gentle stretching; chair exercises; tai chi", recovery: "Active recovery; fall prevention focus; social movement activities", menopauseNote: "Prioritize functional fitness for daily living independence." }
      ], weightGuidelines: "Healthy BMI: 18.5-24.9. Waist circumference: <35 inches (88 cm). Hormonal changes affect weight distribution; focus on strength and bone density over weight alone." },
      universalPrinciples: [
        "Progressive overload: Gradually increase intensity over time",
        "Consistency > Intensity: Regular movement beats sporadic intense exercise",
        "Listen to your body: Adjust based on energy, stress, sleep, and recovery",
        "Nutrition timing: Protein within 30-60 min post-workout for recovery",
        "Hydration: 16-24 oz water 2 hours before exercise; sip during; 16-24 oz post-workout"
      ]
    },
    foodServings: { title: "Foundation: Nutrition - Food Serving Sizes & Daily Intake", categories: [
      { name: "Protein", serving: "3-4 ounces or ½ cup", daily: "2-3 servings" },
      { name: "Vegetables", serving: "1 cup raw or ½ cup cooked", daily: "3-5 servings" },
      { name: "Carbohydrates", serving: "½ cup cooked", daily: "3-4 servings" },
      { name: "Fruits", serving: "1 medium piece or ½ cup chopped", daily: "2-3 servings" },
      { name: "Fats", serving: "1 teaspoon oil or 2 tablespoons nuts/seeds", daily: "2-3 servings" },
      { name: "Dairy/Dairy Alternatives", serving: "1 cup milk or ¾ cup yogurt", daily: "2-3 servings" }
    ]},
    fastingMen: { title: "Foundation: Intermittent Fasting - Men", guidelines: [
      { ageRange: "Ages 18-30", method: "16/8 method (16-hour fast, 8-hour eating window)" },
      { ageRange: "Ages 31-50", method: "16/8 method or 14/10 method (14-hour fast, 10-hour eating window)" },
      { ageRange: "Ages 51-70", method: "14/10 method or 12/12 method (12-hour fast, 12-hour eating window)" },
      { ageRange: "Ages 70+", method: "Not generally recommended without direct medical supervision" }
    ]},
    fastingWomen: { title: "Foundation: Intermittent Fasting - Women", guidelines: [
      { ageRange: "Ages 18-30", method: "14/10 method (14-hour fast, 10-hour eating window)" },
      { ageRange: "Ages 31-50", method: "12/12 method (12-hour fast, 12-hour eating window); adjust based on menstrual cycle" },
      { ageRange: "Ages 51-70", method: "12/12 method; monitor for hormonal fluctuations" },
      { ageRange: "Ages 70+", method: "Not generally recommended without direct medical supervision" }
    ]},
    portionSizesChildren: { title: "Foundation: Portion Sizes - Children", portions: [
      { category: "Protein (per meal)", serving: "Child serving = half-palm (age-adjusted)" },
      { category: "Vegetables (per meal)", serving: "Child serving = 1 cupped hand" },
      { category: "Starches / Grains", serving: "Child serving = ½ fist" },
      { category: "Fats", serving: "Child serving = ½ thumb" }
    ], snackTip: "Snacks: Keep protein + fat together (e.g., Greek yogurt + nuts) to stabilize blood sugar." },
    portionSizesMature: { title: "Foundation: Portion Sizes - Mature Adults", portions: [
      { category: "Protein (per meal)", serving: "Adult serving = 1 palm (cooked) ≈ 3–4 oz (85–115 g)" },
      { category: "Vegetables (per meal)", serving: "Adult serving = 2 cupped hands (non-starchy veg) ≈ 1–2 cups" },
      { category: "Starches / Grains", serving: "Adult serving = 1 fist ≈ ½–1 cup cooked" },
      { category: "Fats", serving: "Adult serving = 1 thumb (olive oil, butter, nut butter) ≈ 1 tbsp" }
    ], snackTip: "Snacks: Keep protein + fat together (e.g., Greek yogurt + nuts) to stabilize blood sugar." }
  };

  const TierContent = ({ tiers, lifeCycleGuide }) => (
    <div style={{marginTop:20}}>
      {tiers.map((tier, idx) => (
        <div key={idx} style={{marginBottom:20,padding:16,borderRadius:12,background:"rgba(218,165,112,0.06)",border:"1px solid rgba(218,165,112,0.12)"}}>
          <h5 style={{fontSize:15,color:"var(--champagne)",fontWeight:700,marginBottom:8}}>{tier.name}</h5>
          {tier.description && <p style={{fontSize:12,color:"rgba(245,222,179,0.9)",marginBottom:12,lineHeight:1.6}}>{tier.description}</p>}
          {tier.products && (
            <div style={{display:"grid",gap:8}}>
              {tier.products.map((p, i) => (
                <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)"}}>
                  <span style={{fontSize:12,color:"var(--champagne)"}}>{p.name}</span>
                  <button onClick={() => openLink(`${doterraBaseUrl}${p.slug}`)} style={{background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:"0",padding:"4px 10px",borderRadius:6,color:"#1b0b06",fontWeight:600,cursor:"pointer",fontSize:11}}>Shop →</button>
                </div>
              ))}
            </div>
          )}
          {tier.diy && (
            <div style={{marginTop:12}}>
              <p style={{fontSize:12,color:"var(--rosegold)",marginBottom:8,fontWeight:600}}>DIY Ingredients:</p>
              <div style={{display:"grid",gap:6,marginBottom:12}}>
                {tier.diy.ingredients.map((ing, i) => (
                  <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:6,borderRadius:6,background:"rgba(245,222,179,0.04)"}}>
                    <span style={{fontSize:11,color:"var(--champagne)"}}>{ing.name}</span>
                    <button onClick={() => openLink(`${doterraBaseUrl}${ing.slug}`)} style={{background:"transparent",border:"1px solid rgba(245,222,179,0.2)",padding:"3px 8px",borderRadius:4,color:"var(--champagne)",cursor:"pointer",fontSize:10}}>Shop →</button>
                  </div>
                ))}
              </div>
              <div style={{padding:10,borderRadius:8,background:"rgba(230,183,165,0.08)",border:"1px solid rgba(230,183,165,0.12)"}}>
                <p style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.6,fontStyle:"italic"}}><strong>Instructions:</strong> {tier.diy.instructions}</p>
              </div>
            </div>
          )}
        </div>
      ))}
      {lifeCycleGuide && (
        <div style={{marginTop:24,padding:20,borderRadius:12,background:"rgba(230,183,165,0.08)",border:"1px solid rgba(230,183,165,0.15)"}}>
          <h4 style={{fontSize:17,color:"var(--champagne)",fontWeight:700,marginBottom:8}}>{lifeCycleGuide.title}</h4>
          <p style={{fontSize:13,color:"rgba(245,222,179,0.9)",marginBottom:16,lineHeight:1.6}}>{lifeCycleGuide.description}</p>
          {lifeCycleGuide.phases.map((phase, i) => (
            <div key={i} style={{marginBottom:16,padding:14,borderRadius:10,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
              <h5 style={{fontSize:14,color:"var(--rosegold)",fontWeight:700,marginBottom:6}}>{phase.name}</h5>
              <p style={{fontSize:12,color:"rgba(245,222,179,0.85)",marginBottom:8}}><strong>Focus:</strong> {phase.focus}</p>
              <p style={{fontSize:11,color:"var(--rosegold)",fontWeight:600,marginBottom:4}}>Internal:</p>
              <p style={{fontSize:11,color:"rgba(245,222,179,0.9)",lineHeight:1.5,marginBottom:8}}>{phase.internal}</p>
              <p style={{fontSize:11,color:"var(--rosegold)",fontWeight:600,marginBottom:4}}>Topical/Aromatic:</p>
              <p style={{fontSize:11,color:"rgba(245,222,179,0.9)",lineHeight:1.5}}>{phase.topical}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const FoundationsContent = ({ isFeminine = false, isAgeless = false, agelessType = null }) => (
    <div style={{marginTop:16,padding:16,borderRadius:12,background:"rgba(218,165,112,0.08)",border:"1px solid rgba(218,165,112,0.12)"}}>
      <h4 style={{fontSize:16,color:"var(--rosegold)",fontWeight:700,marginBottom:12}}>Foundational Resources</h4>
      {!isAgeless && (<div style={{marginBottom:20}}><h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:600,marginBottom:6}}>{foundationalResources.nutrition.title}</h5><p style={{fontSize:13,color:"rgba(245,222,179,0.9)",marginBottom:8,lineHeight:1.6}}>{foundationalResources.nutrition.description}</p><button onClick={()=>openLink(foundationalResources.nutrition.link)} style={{background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:"0",padding:"6px 12px",borderRadius:8,color:"#1b0b06",fontWeight:600,cursor:"pointer",fontSize:12}}>{foundationalResources.nutrition.linkText}</button></div>)}
      {!isAgeless && (<div style={{marginBottom:20}}><h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:600,marginBottom:6}}>{foundationalResources.hydration.title}</h5><p style={{fontSize:13,color:"rgba(245,222,179,0.9)",marginBottom:8}}><strong>Guideline:</strong> {foundationalResources.hydration.guideline}</p><div style={{display:"flex",flexDirection:"column",gap:8}}>{foundationalResources.hydration.protocol.map((item,i)=>(<div key={i} style={{padding:8,borderRadius:8,background:"rgba(245,222,179,0.05)"}}><div style={{fontSize:12,color:"var(--rosegold)",fontWeight:600,marginBottom:4}}>{item.time}</div><div style={{fontSize:12,color:"rgba(245,222,179,0.9)",marginBottom:6}}>{item.instruction}</div><button onClick={()=>openLink(item.link)} style={{background:"transparent",border:"1px solid rgba(245,222,179,0.2)",padding:"4px 10px",borderRadius:6,color:"var(--champagne)",cursor:"pointer",fontSize:11}}>{item.linkText} →</button></div>))}</div></div>)}
      {!isAgeless && (<div style={{marginBottom:20}}><h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:600,marginBottom:6}}>{foundationalResources.sleep.title}</h5><p style={{fontSize:13,color:"rgba(245,222,179,0.9)",marginBottom:8,lineHeight:1.6}}>{foundationalResources.sleep.description}</p><button onClick={()=>openLink(foundationalResources.sleep.link)} style={{background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:"0",padding:"6px 12px",borderRadius:8,color:"#1b0b06",fontWeight:600,cursor:"pointer",fontSize:12}}>{foundationalResources.sleep.linkText}</button></div>)}
      {!isAgeless && (<div style={{marginBottom:20}}><h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:600,marginBottom:8}}>{foundationalResources.weightAndActivity.title}</h5><div style={{marginBottom:16,padding:12,borderRadius:8,background:"rgba(230,183,165,0.08)",border:"1px solid rgba(230,183,165,0.12)"}}><p style={{fontSize:13,color:"var(--rosegold)",fontWeight:600,marginBottom:8}}>{isFeminine?foundationalResources.weightAndActivity.women.title:foundationalResources.weightAndActivity.men.title}</p>{(isFeminine?foundationalResources.weightAndActivity.women.ageGroups:foundationalResources.weightAndActivity.men.ageGroups).map((group,i)=>(<div key={i} style={{marginBottom:12,padding:10,borderRadius:6,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}><p style={{fontSize:12,color:"var(--rosegold)",fontWeight:600,marginBottom:6}}>{group.range}</p><p style={{fontSize:11,color:"rgba(245,222,179,0.9)",marginBottom:3}}><strong>Activity:</strong> {group.activity}</p><p style={{fontSize:11,color:"rgba(245,222,179,0.9)",marginBottom:3}}><strong>Strength:</strong> {group.strength}</p><p style={{fontSize:11,color:"rgba(245,222,179,0.9)",marginBottom:3}}><strong>Flexibility:</strong> {group.flexibility}</p><p style={{fontSize:11,color:"rgba(245,222,179,0.9)",marginBottom:3}}><strong>Recovery:</strong> {group.recovery}</p>{group.cycleNote&&<p style={{fontSize:10,color:"var(--rosegold)",marginTop:4,fontStyle:"italic"}}>{group.cycleNote}</p>}{group.menopauseNote&&<p style={{fontSize:10,color:"var(--rosegold)",marginTop:4,fontStyle:"italic"}}>{group.menopauseNote}</p>}</div>))}<p style={{fontSize:11,color:"var(--rosegold)",marginTop:8,fontWeight:600}}>Weight Guidelines: {isFeminine?foundationalResources.weightAndActivity.women.weightGuidelines:foundationalResources.weightAndActivity.men.weightGuidelines}</p></div></div>)}
      {!isAgeless && (<div style={{marginBottom:20}}><h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:600,marginBottom:8}}>{foundationalResources.foodServings.title}</h5><div style={{display:"grid",gap:8}}>{foundationalResources.foodServings.categories.map((cat,i)=>(<div key={i} style={{padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}><div style={{fontSize:12,color:"var(--rosegold)",fontWeight:600,marginBottom:2}}>{cat.name}</div><div style={{fontSize:11,color:"rgba(245,222,179,0.85)"}}>Serving: {cat.serving}</div><div style={{fontSize:11,color:"var(--rosegold)"}}>Daily: {cat.daily}</div></div>))}</div></div>)}
      {isAgeless && agelessType && (<div style={{marginBottom:20}}><h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:600,marginBottom:8}}>{agelessType==='children'?foundationalResources.portionSizesChildren.title:foundationalResources.portionSizesMature.title}</h5><div style={{display:"grid",gap:8}}>{(agelessType==='children'?foundationalResources.portionSizesChildren.portions:foundationalResources.portionSizesMature.portions).map((portion,i)=>(<div key={i} style={{padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}><div style={{fontSize:12,color:"var(--rosegold)",fontWeight:600,marginBottom:2}}>{portion.category}</div><div style={{fontSize:11,color:"rgba(245,222,179,0.85)",lineHeight:1.5}}>{portion.serving}</div></div>))}</div><div style={{marginTop:12,padding:8,borderRadius:6,background:"rgba(230,183,165,0.08)"}}><p style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.6,fontStyle:"italic"}}>{agelessType==='children'?foundationalResources.portionSizesChildren.snackTip:foundationalResources.portionSizesMature.snackTip}</p></div></div>)}
      {!isAgeless && (<div><h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:600,marginBottom:8}}>{isFeminine?foundationalResources.fastingWomen.title:foundationalResources.fastingMen.title}</h5><div style={{display:"grid",gap:8}}>{(isFeminine?foundationalResources.fastingWomen.guidelines:foundationalResources.fastingMen.guidelines).map((item,i)=>(<div key={i} style={{padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}><div style={{fontSize:12,color:"var(--rosegold)",fontWeight:600,marginBottom:2}}>{item.ageRange}</div><div style={{fontSize:11,color:"rgba(245,222,179,0.85)",lineHeight:1.5}}>{item.method}</div></div>))}</div></div>)}
    </div>
  );

  const PillarDropdown = ({ show, onClose, title, tagline, subtitle, pillars, selected, onSelect, isFeminine = false, showFoundations = true }) => {
    if (!show) return null;
    return (
      <>
        <div className="dropdown-backdrop" onClick={onClose} />
        <div className="dropdown-shell">
          <div className="panel" style={{position:"relative"}}>
            <button className="close-x" onClick={onClose}>✕</button>
            <div style={{padding:26}}>
              <div style={{fontSize:14,color:'var(--rosegold)',letterSpacing:'.6px',marginBottom:6}}>{title}</div>
              <div style={{fontSize:22,color:'var(--champagne)',fontWeight:700,letterSpacing:'.4px',marginBottom:8,lineHeight:1.4}}>{tagline}</div>
              {subtitle && <div style={{color:'rgba(245,222,179,.9)',lineHeight:1.6,fontSize:13,marginBottom:20}}>{subtitle}</div>}
              <div className="category-selector" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(160px, 1fr))",gap:12}}>
                {showFoundations && <button className={`category-btn ${selected==='foundations'?'active':''}`} onClick={()=>onSelect('foundations')}>Foundations</button>}
                {Object.entries(pillars).map(([key,p])=>(<button key={key} className={`category-btn ${selected===key?'active':''}`} onClick={()=>onSelect(key)}>{p.title}</button>))}
              </div>
              {selected && selected !== 'foundations' && pillars[selected] && (
                <div style={{padding:20,borderRadius:12,background:"linear-gradient(180deg,rgba(218,165,112,0.06),rgba(245,222,179,0.03))",boxShadow:"0 8px 30px rgba(0,0,0,0.5)",border:"1px solid rgba(218,165,112,0.06)"}}>
                  <h3 style={{fontSize:20,color:"var(--champagne)",fontWeight:700,marginBottom:4}}>{pillars[selected].title}</h3>
                  <p style={{color:"var(--rosegold)",marginBottom:4,fontSize:14}}>{pillars[selected].subtitle}</p>
                  {pillars[selected].description && <p style={{color:"rgba(245,222,179,0.85)",marginBottom:16,fontSize:13,lineHeight:1.6}}>{pillars[selected].description}</p>}
                  <TierContent tiers={pillars[selected].tiers} lifeCycleGuide={pillars[selected].lifeCycleGuide} />
                </div>
              )}
              {selected === 'foundations' && <FoundationsContent isFeminine={isFeminine} isAgeless={false} />}
              {!selected && <div style={{textAlign:"center",padding:40,color:"var(--rosegold)"}}>Select a pillar to explore wellness programs and products</div>}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      <style>{`
:root{--champagne:#F5DEB3;--rosegold:#E6B7A5;--bronze:#B9875D;--chocolate:#2e120d;--velvet:#3b0f12}
*{box-sizing:border-box;margin:0;padding:0}
html,body,#root{height:100%}
body{font-family:'Cinzel Decorative','Playfair Display',serif;background:radial-gradient(ellipse at center,#23110d 0%,#120806 50%,#070403 100%);color:var(--champagne);overflow:hidden;min-height:100vh;position:relative}
body.no-scroll{overflow:hidden!important}
.header{text-align:center;position:absolute;top:40px;left:50%;transform:translateX(-50%);z-index:10}
.logo{font-size:54px;letter-spacing:3px;font-weight:600;font-family:'Cinzel Decorative','Playfair Display',serif;color:var(--champagne);text-shadow:0 0 28px rgba(245,222,179,.55)}
.tm{font-size:16px;vertical-align:super;margin-left:2px;color:var(--rosegold)}
.tagline{font-size:16px;letter-spacing:2px;font-weight:400;color:var(--rosegold);text-shadow:0 0 10px rgba(230,183,165,.6)}
.flower-of-life-bg{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:580px;height:580px;opacity:.08;animation:flowerSpin 120s linear infinite;z-index:1;filter:blur(1px)}
@keyframes flowerSpin{from{transform:translate(-50%,-50%) rotate(0)}to{transform:translate(-50%,-50%) rotate(360deg)}}
.service-container{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:10}
.service-grid{display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(2,1fr);gap:30px;max-width:760px;margin-top:295px}
.wellness-intake-top{position:absolute;top:250px;left:50%;transform:translateX(-50%);width:300px;height:72px;border-radius:18px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:18px;font-weight:600;letter-spacing:.5px;z-index:15;color:var(--champagne);font-family:'Cinzel Decorative','Playfair Display',serif;background:linear-gradient(180deg,rgba(65,30,22,0.65),rgba(35,15,10,0.5));backdrop-filter:blur(18px) saturate(120%);border:1px solid rgba(245,222,179,.25);box-shadow:0 12px 36px rgba(0,0,0,.55),0 0 46px rgba(245,222,179,.22),inset 0 -6px 12px rgba(0,0,0,.35);animation:intakeBreath 6s ease-in-out infinite,intakeFloat 10s ease-in-out infinite;text-shadow:0 0 12px rgba(230,183,165,.45)}
@keyframes intakeBreath{0%,100%{transform:translateX(-50%) scale(1)}50%{transform:translateX(-50%) scale(1.04)}}
@keyframes intakeFloat{0%,100%{top:250px}50%{top:244px}}
.service-button{width:220px;height:84px;border-radius:16px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .35s ease;background:linear-gradient(180deg,rgba(60,26,20,0.6),rgba(40,16,12,0.45));backdrop-filter:blur(14px) saturate(115%);border:1px solid rgba(245,222,179,.20);color:var(--champagne);font-family:'Cinzel Decorative','Playfair Display',serif;font-weight:600;text-shadow:0 0 10px rgba(245,222,179,.32);box-shadow:0 10px 30px rgba(0,0,0,.48),0 0 44px rgba(218,165,112,.14),inset 0 -6px 12px rgba(0,0,0,.35)}
.service-button:hover{transform:translateY(-6px) scale(1.02);border-color:rgba(245,222,179,.38);box-shadow:0 18px 44px rgba(0,0,0,.55),0 0 56px rgba(218,165,112,.28),inset 0 -6px 16px rgba(0,0,0,.40)}
.dropdown-backdrop{position:fixed;inset:0;background:linear-gradient(180deg,rgba(6,3,2,0.45),rgba(0,0,0,0.72));backdrop-filter:blur(6px);z-index:999}
.dropdown-shell{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);width:min(920px,94vw);max-height:86vh;overflow:auto;z-index:1000;padding:14px;border-radius:14px}
.panel{border-radius:16px;background:linear-gradient(180deg,rgba(48,20,14,0.95),rgba(30,12,8,0.90));border:1px solid rgba(245,222,179,.12);box-shadow:0 20px 60px rgba(0,0,0,.7);backdrop-filter:blur(10px)}
.close-x{position:absolute;right:18px;top:14px;background:transparent;border:0;color:var(--champagne);font-size:20px;cursor:pointer;z-index:1}
.category-selector{display:flex;gap:12px;margin-bottom:20px}
.category-btn{flex:1;padding:16px;border-radius:12px;background:linear-gradient(180deg,rgba(54,18,14,0.55),rgba(32,12,9,0.45));border:1px solid rgba(218,165,112,.06);color:var(--champagne);cursor:pointer;transition:all 0.3s ease;font-size:14px;font-weight:600}
.category-btn:hover{border-color:rgba(218,165,112,.25);transform:translateY(-2px)}
.category-btn.active{background:linear-gradient(90deg,var(--bronze),var(--rosegold));color:#1b0b06;border-color:transparent}
.lotus-ai-container{position:fixed;bottom:30px;right:30px;z-index:1000}
.lotus-ai{width:70px;height:70px;background:linear-gradient(135deg,rgba(160,82,45,.95),rgba(139,69,19,.9));backdrop-filter:blur(20px);border:2px solid rgba(230,183,165,.70);border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 12px 30px rgba(0,0,0,.6),0 0 40px rgba(230,183,165,.50),0 0 80px rgba(245,222,179,.35),inset 0 2px 0 rgba(255,255,255,.2),inset 0 -2px 8px rgba(0,0,0,.3);animation:lotusBreath 5s ease-in-out infinite;cursor:pointer;transition:transform 0.2s ease}
.lotus-ai:hover{transform:scale(1.1)}
@keyframes lotusBreath{0%,100%{box-shadow:0 12px 30px rgba(0,0,0,.6),0 0 40px rgba(230,183,165,.50),0 0 80px rgba(245,222,179,.35)}50%{box-shadow:0 12px 30px rgba(0,0,0,.6),0 0 60px rgba(230,183,165,.70),0 0 120px rgba(245,222,179,.55)}}
.lotus-symbol{font-size:30px;color:var(--champagne);text-shadow:0 0 15px rgba(230,183,165,.65),0 0 30px rgba(230,183,165,.45)}
.gold-dust{position:fixed;width:3px;height:3px;background:radial-gradient(circle,rgba(218,165,127,.9) 0%,rgba(218,165,127,.3) 70%);border-radius:50%;pointer-events:none;animation:dustFloat 25s linear infinite;z-index:5}
@keyframes dustFloat{0%{transform:translateY(100vh) translateX(0) rotate(0);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translateY(-100px) translateX(50px) rotate(360deg);opacity:0}}
.inner-sacred-geometry{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:150px;height:150px;opacity:.12;z-index:2;pointer-events:none;animation:innerSpin 45s linear infinite reverse}
@keyframes innerSpin{0%{transform:translate(-50%,-50%) rotate(0)}100%{transform:translate(-50%,-50%) rotate(360deg)}}
@media (max-width:880px){.service-grid{grid-template-columns:repeat(2,1fr);max-width:520px}.dropdown-shell{width:92vw}.panel-inner{padding:16px}}
      `}</style>

      <div className="flower-of-life-bg" aria-hidden="true">
        <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" stroke="#CD7F32" strokeWidth="1.5">
            <circle cx="200" cy="200" r="60" opacity="0.8"/><circle cx="200" cy="140" r="60" opacity="0.8"/>
            <circle cx="252" cy="170" r="60" opacity="0.8"/><circle cx="252" cy="230" r="60" opacity="0.8"/>
            <circle cx="200" cy="260" r="60" opacity="0.8"/><circle cx="148" cy="230" r="60" opacity="0.8"/>
            <circle cx="148" cy="170" r="60" opacity="0.8"/><circle cx="200" cy="80" r="60" opacity="0.6"/>
            <circle cx="252" cy="110" r="60" opacity="0.6"/><circle cx="304" cy="140" r="60" opacity="0.6"/>
            <circle cx="304" cy="200" r="60" opacity="0.6"/><circle cx="304" cy="260" r="60" opacity="0.6"/>
            <circle cx="252" cy="290" r="60" opacity="0.6"/><circle cx="200" cy="320" r="60" opacity="0.6"/>
            <circle cx="148" cy="290" r="60" opacity="0.6"/><circle cx="96" cy="260" r="60" opacity="0.6"/>
            <circle cx="96" cy="200" r="60" opacity="0.6"/><circle cx="96" cy="140" r="60" opacity="0.6"/>
            <circle cx="148" cy="110" r="60" opacity="0.6"/>
          </g>
        </svg>
      </div>

      <div className="inner-sacred-geometry" aria-hidden="true">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" stroke="#DAA57F" strokeWidth="1" opacity="0.4">
            <circle cx="100" cy="100" r="15"/><circle cx="100" cy="70" r="15"/>
            <circle cx="100" cy="130" r="15"/><circle cx="70" cy="100" r="15"/>
            <circle cx="130" cy="100" r="15"/>
          </g>
        </svg>
      </div>

      <div className="header">
        <div className="logo">iTerra<span className="tm">™</span></div>
        <div className="tagline">Wellness Concierge</div>
      </div>

      <button className="wellness-intake-top" onClick={() => navigateTo("/WellnessIntake")}>
        Wellness Intake
      </button>

      <div className="service-container">
        <div className="service-grid">
          <button ref__={triggerRef} className="service-button" onClick={() => { setShowDropdown(true); setSelectedMasculinePillar(null); }}>Masculine Vitality</button>
          <button className="service-button" onClick={() => { setShowFeminineDropdown(true); setSelectedFemininePillar(null); }}>Feminine Energy</button>
          <button className="service-button" onClick={() => { setShowPetDropdown(true); setSelectedPetType(null); setSelectedPetPillar(null); }}>Pet Harmony</button>
          <button className="service-button" onClick={() => { setShowHomeDropdown(true); setSelectedHomePillar(null); }}>Home Essentials</button>
          <button className="service-button" onClick={() => { setShowAgelessDropdown(true); setSelectedAgelessCategory(null); setSelectedAgelessPillar(null); }}>Ageless Vitality</button>
          <button className="service-button" onClick={() => navigateTo("/ServiceDetail?category=leadership_wisdom")}>Leadership & Wisdom</button>
        </div>
      </div>

      <div className="lotus-ai-container">
        <div className="lotus-ai" onClick={() => navigateTo("/WellnessIntake")} title="Start Wellness Intake">
          <div className="lotus-symbol">🪷</div>
        </div>
      </div>

      <PillarDropdown show={showDropdown} onClose={() => setShowDropdown(false)} title="Masculine Vitality" tagline="For the man who endures, protects, and evolves — energy forged in ritual, legacy anchored in balance." subtitle="Each path begins with The Foundation — the daily rhythm of hydration, nutrient precision, and circadian balance." pillars={masculinePillars} selected={selectedMasculinePillar} onSelect={setSelectedMasculinePillar} isFeminine={false} />
      <PillarDropdown show={showFeminineDropdown} onClose={() => setShowFeminineDropdown(false)} title="Feminine Energy" tagline="For the woman who nurtures, inspires, and illuminates — balance rooted in wisdom, radiance born of self-care." subtitle="Each path begins with The Foundation — the daily rhythm of hormonal harmony, cellular precision, and emotional fortitude." pillars={femininePillars} selected={selectedFemininePillar} onSelect={setSelectedFemininePillar} isFeminine={true} />
      <PillarDropdown show={showHomeDropdown} onClose={() => setShowHomeDropdown(false)} title="Home Essentials" tagline="A sanctuary of purity — non-toxic living, immune-fortified spaces, and sacred atmosphere for your home." subtitle="Each pillar transforms your home into a wellness environment: clean, protected, energetically clear, and seasonally celebrated." pillars={homePillars} selected={selectedHomePillar} onSelect={setSelectedHomePillar} showFoundations={false} />

      {showAgelessDropdown && (
        <>
          <div className="dropdown-backdrop" onClick={() => setShowAgelessDropdown(false)} />
          <div className="dropdown-shell">
            <div className="panel" style={{position:"relative"}}>
              <button className="close-x" onClick={() => setShowAgelessDropdown(false)}>✕</button>
              <div style={{padding:26}}>
                <div style={{fontSize:14,color:'var(--rosegold)',letterSpacing:'.6px',marginBottom:6}}>Ageless Vitality</div>
                <div style={{fontSize:26,color:'var(--champagne)',fontWeight:700,letterSpacing:'.6px',marginBottom:12}}>Wellness for Every Age</div>
                <div className="category-selector">
                  <button className={`category-btn ${selectedAgelessCategory==='children'?'active':''}`} onClick={() => { setSelectedAgelessCategory('children'); setSelectedAgelessPillar(null); }}>Children</button>
                  <button className={`category-btn ${selectedAgelessCategory==='mature'?'active':''}`} onClick={() => { setSelectedAgelessCategory('mature'); setSelectedAgelessPillar(null); }}>Mature Adults</button>
                </div>
                {selectedAgelessCategory && (
                  <>
                    <div className="category-selector" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(160px, 1fr))",gap:12}}>
                      <button className={`category-btn ${selectedAgelessPillar==='foundations'?'active':''}`} onClick={() => setSelectedAgelessPillar('foundations')}>Foundations</button>
                      <button className={`category-btn ${selectedAgelessPillar===selectedAgelessCategory?'active':''}`} onClick={() => setSelectedAgelessPillar(selectedAgelessCategory)}>{agelessPillars[selectedAgelessCategory].title}</button>
                    </div>
                    {selectedAgelessPillar && selectedAgelessPillar !== 'foundations' && (
                      <div style={{padding:20,borderRadius:12,background:"linear-gradient(180deg,rgba(218,165,112,0.06),rgba(245,222,179,0.03))",boxShadow:"0 8px 30px rgba(0,0,0,0.5)",border:"1px solid rgba(218,165,112,0.06)"}}>
                        <h3 style={{fontSize:20,color:"var(--champagne)",fontWeight:700,marginBottom:4}}>{agelessPillars[selectedAgelessCategory].title}</h3>
                        <p style={{color:"var(--rosegold)",marginBottom:4,fontSize:14}}>{agelessPillars[selectedAgelessCategory].subtitle}</p>
                        <p style={{color:"rgba(245,222,179,0.85)",marginBottom:16,fontSize:13,lineHeight:1.6}}>{agelessPillars[selectedAgelessCategory].description}</p>
                        <TierContent tiers={agelessPillars[selectedAgelessCategory].tiers} />
                      </div>
                    )}
                    {selectedAgelessPillar === 'foundations' && <FoundationsContent isAgeless={true} agelessType={selectedAgelessCategory} />}
                    {!selectedAgelessPillar && <div style={{textAlign:"center",padding:30,color:"var(--rosegold)"}}>Select a program to explore</div>}
                  </>
                )}
                {!selectedAgelessCategory && <div style={{textAlign:"center",padding:40,color:"var(--rosegold)"}}>Select a category to explore wellness programs</div>}
              </div>
            </div>
          </div>
        </>
      )}

      {showPetDropdown && (
        <>
          <div className="dropdown-backdrop" onClick={() => setShowPetDropdown(false)} />
          <div className="dropdown-shell">
            <div className="panel" style={{position:"relative"}}>
              <button className="close-x" onClick={() => setShowPetDropdown(false)}>✕</button>
              <div style={{padding:26}}>
                <div style={{fontSize:14,color:'var(--rosegold)',letterSpacing:'.6px',marginBottom:6}}>Pet Harmony</div>
                <div style={{fontSize:26,color:'var(--champagne)',fontWeight:700,letterSpacing:'.6px',marginBottom:12}}>Holistic Care for Your Companions</div>
                <div className="category-selector" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(130px, 1fr))",gap:12}}>
                  {Object.entries(petPillars).map(([key,pet]) => (
                    <button key={key} className={`category-btn ${selectedPetType===key?'active':''}`} onClick={() => { setSelectedPetType(key); setSelectedPetPillar(null); }}>
                      {key==='dogs'?'🐕 Dogs':key==='cats'?'🐈 Cats':key==='horses'?'🐎 Horses':key==='parrots'?'🦜 Parrots':'🐓 Chickens'}
                    </button>
                  ))}
                </div>
                {selectedPetType && (
                  <>
                    <div className="category-selector" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(160px, 1fr))",gap:12,marginTop:8}}>
                      <button className={`category-btn ${selectedPetPillar==='overview'?'active':''}`} onClick={() => setSelectedPetPillar('overview')}>Overview</button>
                      <button className={`category-btn ${selectedPetPillar==='products'?'active':''}`} onClick={() => setSelectedPetPillar('products')}>Products & DIY</button>
                    </div>
                    {selectedPetPillar === 'overview' && (
                      <div style={{padding:20,borderRadius:12,background:"linear-gradient(180deg,rgba(218,165,112,0.06),rgba(245,222,179,0.03))",border:"1px solid rgba(218,165,112,0.06)"}}>
                        <h3 style={{fontSize:22,color:"var(--champagne)",fontWeight:700,marginBottom:8}}>{petPillars[selectedPetType].title}</h3>
                        <p style={{color:"var(--rosegold)",marginBottom:16,lineHeight:1.6}}>{petPillars[selectedPetType].description}</p>
                        <ul style={{listStyle:"none",padding:0,margin:0,marginBottom:20}}>
                          {["Calm & Stress Support","Immune & Seasonal Protection","Skin, Coat & Physical Health","Digestive Wellness","Safe Aromatic Protocols"].map((b,i)=>(
                            <li key={i} style={{padding:"8px 0",color:"rgba(245,222,179,0.95)",fontSize:14,lineHeight:1.6}}>✦ {b}</li>
                          ))}
                        </ul>
                        <button onClick={() => openLink("https://healthlifestyleservices.com")} style={{background:"transparent",border:"1px solid rgba(245,222,179,0.2)",padding:"10px 18px",borderRadius:10,color:"var(--champagne)",cursor:"pointer",fontSize:13}}>🐾 Book Pet Consultation</button>
                      </div>
                    )}
                    {selectedPetPillar === 'products' && (
                      <div style={{padding:20,borderRadius:12,background:"linear-gradient(180deg,rgba(218,165,112,0.06),rgba(245,222,179,0.03))",border:"1px solid rgba(218,165,112,0.06)"}}>
                        <h3 style={{fontSize:20,color:"var(--champagne)",fontWeight:700,marginBottom:4}}>{petPillars[selectedPetType].title}</h3>
                        <p style={{color:"var(--rosegold)",marginBottom:16,fontSize:14}}>{petPillars[selectedPetType].subtitle}</p>
                        <TierContent tiers={petPillars[selectedPetType].tiers} />
                      </div>
                    )}
                    {!selectedPetPillar && <div style={{textAlign:"center",padding:30,color:"var(--rosegold)"}}>Select Overview or Products & DIY to explore</div>}
                  </>
                )}
                {!selectedPetType && <div style={{textAlign:"center",padding:40,color:"var(--rosegold)"}}>Select your companion type to explore wellness programs</div>}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
