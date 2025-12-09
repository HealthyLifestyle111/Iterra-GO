import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import AssociateLogin from "../components/AssociateLogin";
import LotusAI from "../components/LotusAI";

export default function IterraVitalityDropdown() {
        const [showDropdown, setShowDropdown] = useState(false);
        const [showFeminineDropdown, setShowFeminineDropdown] = useState(false);
        const [showAgelessDropdown, setShowAgelessDropdown] = useState(false);
        const [showPetDropdown, setShowPetDropdown] = useState(false);
        const [panelOpen, setPanelOpen] = useState([false, false, false, false]);
        const [selectedAgelessCategory, setSelectedAgelessCategory] = useState(null);
        const [selectedPetType, setSelectedPetType] = useState(null);
        const [selectedMasculinePillar, setSelectedMasculinePillar] = useState(null);
        const [selectedFemininePillar, setSelectedFemininePillar] = useState(null);
        const [showLotusAI, setShowLotusAI] = useState(false);
        const [showAssociateLogin, setShowAssociateLogin] = useState(false);
  const dropdownRef = useRef(null);
  const feminineDropdownRef = useRef(null);
  const agelessDropdownRef = useRef(null);
  const petDropdownRef = useRef(null);
  const triggerRef = useRef(null);

  const doterraBaseUrl = "https://my.doterra.com/jennawilliams1/p/";

  const navigateTo = (pageName) => {
    if (typeof window !== "undefined") window.location.href = createPageUrl(pageName);
  };

  const openLink = (url) => {
    if (typeof window !== "undefined") window.open(url, '_blank');
  };

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
    if (!showDropdown) {
      setPanelOpen([false, false, false, false]);
      return;
    }
    const timers = [];
    [0, 1, 2, 3].forEach((i, idx) => {
      timers.push(
        setTimeout(() => {
          setPanelOpen((prev) => {
            const copy = [...prev];
            copy[i] = true;
            return copy;
          });
        }, 220 * (idx + 1))
      );
    });
    return () => timers.forEach((t) => clearTimeout(t));
  }, [showDropdown]);

  useEffect(() => {
    const body = document.body;
    if (showDropdown || showFeminineDropdown || showAgelessDropdown || showPetDropdown) body.classList.add("no-scroll");
    else body.classList.remove("no-scroll");
    return () => body.classList.remove("no-scroll");
  }, [showDropdown, showFeminineDropdown, showAgelessDropdown, showPetDropdown]);

  const masculinePillars = {
    warrior: {
      title: "WARRIOR",
      subtitle: "Energy • Focus • Immunity",
      philosophy: "For the man who refuses to settle for burnout, brain fog, or constant exhaustion. This is your armor against the modern world.",
      whoThisIsFor: "Executives, athletes, fathers, leaders who demand peak performance without stimulants or crashes. Men who build empires and need the energy to sustain them.",
      whatYouGet: "Support for sustained energy throughout the day • Enhanced mental clarity • Immune system support • Recovery support for active lifestyles",
      tiers: [
        {
          name: "Tier 1 — Core Power",
          description: "Essential daily energy, focus, and immune defense. Start here.",
          outcomes: "Users report improved energy levels, enhanced focus, and strengthened wellness routines within the first few months of consistent use",
          products: [
            { name: "Energy & Stamina Complex", slug: "mito2max-energy-metabolism-complex" },
            { name: "Protective Blend Softgels", slug: "on-guard-plus-softgels" },
            { name: "Peppermint Beadlets", slug: "peppermint-beadlets-digestive-health" }
          ]
        },
        {
          name: "Tier 2 — Peak Performance",
          description: "Advanced stacks for competitive edge. Stress management meets cognitive enhancement.",
          outcomes: "Support for stress management, mental focus, and overall wellness balance",
          products: [
            { name: "Superfood Greens Powder", slug: "greens-digestive-health-supplement" },
            { name: "Calming Blend Capsules", slug: "adaptiv-calming-blend-capsules" },
            { name: "Frankincense Touch Roller", slug: "frankincense-touch" },
            { name: "Wild Orange Essential Oil", slug: "wild-orange-oil" }
          ]
        },
        {
          name: "Tier 3 — Elite Warrior Stack",
          description: "Full cellular optimization. The complete system for men who refuse compromise.",
          outcomes: "Comprehensive wellness support for long-term vitality and peak performance goals",
          products: [
            { name: "Cellular Vitality Softgels", slug: "ddr-prime-softgels" },
            { name: "Copaiba Softgels", slug: "copaiba-softgels" },
            { name: "Focus Blend Essential Oil", slug: "intune-focus-blend" },
            { name: "Peppermint Essential Oil", slug: "peppermint-oil" }
          ]
        }
      ],
      luxuryOfferings: {
        title: "Premium Warrior Services",
        services: [
          {
            name: "Warrior Vitality Consultation",
            price: "Contact for Pricing",
            includes: "90-min deep-dive assessment • Custom protocol design • 30-day supplement stack • Follow-up optimization session",
            link: "https://healthlifestyleservices.com"
          },
          {
            name: "Executive Performance Program",
            price: "Contact for Pricing",
            includes: "Monthly practitioner sessions • Custom supplement dispensing • Priority access • Performance tracking dashboard • Quarterly lab review",
            link: "https://healthlifestyleservices.com"
          },
          {
            name: "Elite Concierge Membership",
            price: "Contact for Pricing",
            includes: "Unlimited messaging access • Monthly product delivery • Quarterly in-person sessions • VIP event access • Custom formulation service",
            link: "https://healthlifestyleservices.com"
          }
        ]
      },
      diy: {
        title: "DIY Power Recipes",
        recipes: [
          {
            name: "Pre-Workout Energy Smoothie",
            ingredients: [
              { name: "Greens Superfood Powder (1 scoop)", slug: "greens-digestive-health-supplement" },
              { name: "Wild Orange Essential Oil (2 drops)", slug: "wild-orange" },
              { name: "Peppermint Essential Oil (1 drop)", slug: "peppermint" }
            ],
            instructions: "Blend 1 scoop Greens powder with 8oz cold water or almond milk. Add 2 drops Wild Orange and 1 drop Peppermint. Add ice and banana. Blend until smooth. Drink 30 minutes before workout."
          },
          {
            name: "Focus & Clarity Roll-On",
            ingredients: [
              { name: "Fractionated Coconut Oil", slug: "fractionated-coconut-oil" },
              { name: "Focus Blend (8 drops)", slug: "intune-focus-blend" },
              { name: "Frankincense (6 drops)", slug: "frankincense" },
              { name: "Vetiver (4 drops)", slug: "vetiver" },
              { name: "10mL Roller Bottle", slug: "essential-oil-accessories" }
            ],
            instructions: "Fill roller with FCO, add essential oils, shake well. Apply to temples, back of neck, and pulse points before important meetings or focused work sessions."
          }
        ]
      }
    },
    agileBody: {
      title: "AGILE BODY",
      subtitle: "Weight Management • Mobility • Recovery",
      philosophy: "For the man who refuses to accept decline. Support your body's natural resilience well into your 50s, 60s, and beyond.",
      whoThisIsFor: "Men over 35 seeking metabolic support, joint comfort, and post-workout recovery. Athletes, lifters, runners who demand sustained mobility.",
      whatYouGet: "Support for healthy metabolism • Joint comfort and mobility support • Post-workout recovery support • Muscle maintenance and flexibility support",
      tiers: [
        {
          name: "Tier 1 — Metabolic Foundation",
          description: "Support healthy metabolism, inflammation response, and digestive function. The essential stack.",
          outcomes: "Users report improved metabolism support, digestive comfort, and healthy weight management when combined with diet and exercise",
          products: [
            { name: "Metabolic Blend Essential Oil", slug: "metapwr-metabolic-blend" },
            { name: "Turmeric Dual Chamber Capsules", slug: "turmeric-dual-chamber-capsules" },
            { name: "Digestive Enzyme Complex", slug: "terrazyme-digestive-enzyme-complex" }
          ]
        },
        {
          name: "Tier 2 — Active Recovery",
          description: "Support for discomfort management, healthy inflammation response, and athletic recovery for serious training.",
          outcomes: "Support for joint comfort, healthy inflammation response, and muscle recovery after exercise",
          products: [
            { name: "Soothing Blend Polyphenol Complex", slug: "deep-blue-polyphenol-complex" },
            { name: "Soothing Blend Topical Rub", slug: "deep-blue-soothing-blend" },
            { name: "Copaiba Softgels", slug: "copaiba-softgels" },
            { name: "Lemongrass Essential Oil", slug: "lemongrass-oil" }
          ]
        },
        {
          name: "Tier 3 — Peak Mobility Stack",
          description: "Comprehensive cellular support. Collagen synthesis support, full-body mobility, longevity wellness.",
          outcomes: "Support for cellular health, skin/joint/tendon wellness, and sustained athletic lifestyle goals",
          products: [
            { name: "Collagen Synthesis Complex", slug: "metapwr-advantage" },
            { name: "Massage Blend Essential Oil Kit", slug: "aromatouch-massage-blend" },
            { name: "Marjoram Essential Oil", slug: "marjoram-oil" },
            { name: "Wintergreen Essential Oil", slug: "wintergreen-oil" }
          ]
        }
      ],
      luxuryOfferings: {
        title: "Premium Athletic Services",
        services: [
          {
            name: "Metabolic Reset Consultation",
            price: "Contact for Pricing",
            includes: "Body composition analysis • Custom metabolic protocol • 60-day supplement plan • Weekly check-ins",
            link: "https://healthlifestyleservices.com"
          },
          {
            name: "Mobility Support Program",
            price: "Contact for Pricing",
            includes: "Monthly AromaTouch sessions • Custom topical formulations • Joint wellness tracking • Movement coaching integration",
            link: "https://healthlifestyleservices.com"
          }
        ]
      },
      diy: {
        title: "DIY Athletic Performance Recipes",
        recipes: [
          {
            name: "Post-Workout Recovery Protein Shake",
            ingredients: [
              { name: "Metabolic Blend (2 drops)", slug: "metapwr-metabolic-blend" },
              { name: "Lemon Essential Oil (1 drop)", slug: "lemon" },
              { name: "Grapefruit Essential Oil (1 drop)", slug: "grapefruit" }
            ],
            instructions: "Add to your favorite protein shake with ice, banana, and almond milk. Blend well. Drink within 30 minutes post-workout for metabolic support and muscle recovery."
          },
          {
            name: "Deep Muscle Recovery Massage Oil",
            ingredients: [
              { name: "Soothing Blend Rub (2 tablespoons)", slug: "deep-blue-soothing-blend" },
              { name: "Wintergreen (8 drops)", slug: "wintergreen" },
              { name: "Marjoram (6 drops)", slug: "marjoram" },
              { name: "Copaiba (6 drops)", slug: "copaiba" },
              { name: "Fractionated Coconut Oil (4 oz)", slug: "fractionated-coconut-oil" }
            ],
            instructions: "Combine all ingredients in a glass bottle. Shake well. Massage generously into sore muscles and joints after training. Store in cool, dark place."
          }
        ]
      }
    },
    presence: {
      title: "PRESENCE",
      subtitle: "Mental Clarity • Leadership • Calm",
      philosophy: "Command the room. Lead with calm authority. Think clearly under pressure. This is executive-grade nervous system support.",
      whoThisIsFor: "CEOs, leaders, high-performers seeking mental clarity, stress management, and calm focus. Men whose presence shapes outcomes.",
      whatYouGet: "Support for stress resilience • Sleep quality support • Grounded confidence support • Mental clarity for focus and decision-making",
      tiers: [
        {
          name: "Tier 1 — Mindful Leadership",
          description: "Essential calm, focus, and grounding for daily leadership demands.",
          outcomes: "Support for stress management, baseline calm, and leadership presence",
          products: [
            { name: "Calming Blend Essential Oil", slug: "adaptiv-calming-blend" },
            { name: "Focus Blend Essential Oil", slug: "intune-focus-blend" },
            { name: "Frankincense Touch Roller", slug: "frankincense-touch" },
            { name: "Ultrasonic Diffuser", slug: "petal-diffuser" }
          ]
        },
        {
          name: "Tier 2 — Executive Clarity",
          description: "Deep nervous system support. Grounding meets strategic thinking enhancement.",
          outcomes: "Support for nervous system balance, sleep quality, and decision-making clarity",
          products: [
            { name: "Copaiba Softgels", slug: "copaiba-softgels" },
            { name: "Grounding Blend Essential Oil", slug: "balance-grounding-blend" },
            { name: "Vetiver Essential Oil", slug: "vetiver-oil" },
            { name: "Cedarwood Essential Oil", slug: "cedarwood-oil" }
          ]
        },
        {
          name: "Tier 3 — Mastery & Calm",
          description: "Complete autonomic support. The nervous system of a monk with the drive of a CEO.",
          outcomes: "Support for calm under pressure, deep restorative sleep, and influential presence",
          products: [
            { name: "Restful Blend Essential Oil", slug: "serenity-restful-blend" },
            { name: "Respiratory Blend Essential Oil", slug: "breathe-respiratory-blend" },
            { name: "Bergamot Essential Oil", slug: "bergamot-oil" },
            { name: "Sandalwood Essential Oil", slug: "sandalwood-oil" }
          ]
        }
      ],
      luxuryOfferings: {
        title: "Premium Leadership Services",
        services: [
          {
            name: "Executive Wellness Assessment",
            price: "Contact for Pricing",
            includes: "HRV stress analysis • Custom calm protocol • Sleep optimization design • 60-day aromatherapy program",
            link: "https://healthlifestyleservices.com"
          },
          {
            name: "Leadership Presence Coaching",
            price: "Contact for Pricing",
            includes: "Weekly 1:1 sessions • Real-time stress support protocols • Custom blends for boardrooms/speeches • 24/7 practitioner messaging",
            link: "https://healthlifestyleservices.com"
          }
        ]
      },
      diy: {
        title: "DIY Leadership & Presence Recipes",
        recipes: [
          {
            name: "Executive Focus Diffuser Blend",
            ingredients: [
              { name: "Frankincense (4 drops)", slug: "frankincense" },
              { name: "Vetiver (3 drops)", slug: "vetiver" },
              { name: "Wild Orange (3 drops)", slug: "wild-orange" },
              { name: "Peppermint (2 drops)", slug: "peppermint" }
            ],
            instructions: "Add all oils to diffuser with water. Run during work hours or important meetings for mental clarity and grounded presence. Creates an atmosphere of focused calm."
          },
          {
            name: "Grounding Presence Body Oil",
            ingredients: [
              { name: "Grounding Blend (15 drops)", slug: "balance-grounding-blend" },
              { name: "Sandalwood (10 drops)", slug: "sandalwood-indian" },
              { name: "Bergamot (8 drops)", slug: "bergamot" },
              { name: "Jojoba Oil (2 oz)", slug: "carrier-oils" }
            ],
            instructions: "Combine in 2oz glass bottle. Shake well before use. Apply to chest and wrists in the morning for centered, grounded energy throughout the day."
          }
        ]
      }
    },
    legacy: {
      title: "LEGACY",
      subtitle: "Longevity • Hair & Beard Vitality • Cellular Renewal",
      philosophy: "Age like fine wine. Build a body—and a life—that lasts. This is cellular-level wellness support for men who plan to thrive for decades.",
      whoThisIsFor: "Men over 40 choosing to age powerfully. Professionals investing in long-term vitality, aesthetic wellness, and generational health.",
      whatYouGet: "Support for cellular regeneration • Healthy hair and beard support • Skin wellness support • Energy and vitality support through all life stages",
      tiers: [
        {
          name: "Tier 1 — Cellular Longevity",
          description: "Support cellular repair mechanisms. The foundation of wellness from the inside out.",
          outcomes: "Support for cellular health, skin appearance, and sustained energy over time",
          products: [
            { name: "Cellular Vitality Complex Softgels", slug: "ddr-prime-softgels" },
            { name: "Active Botanical Duo Capsules", slug: "yarrow-pom-capsules" },
            { name: "Frankincense Essential Oil", slug: "frankincense-oil" }
          ]
        },
        {
          name: "Tier 2 — Wellness & Vitality",
          description: "Metabolic support meets aesthetic enhancement. Support visible wellness while building internal resilience.",
          outcomes: "Support for metabolic health, hair thickness/growth, fine line appearance, and sustained vitality",
          products: [
            { name: "Metabolic System Bundle", slug: "metapwr-metabolic-system" },
            { name: "Anti-Aging Blend Essential Oil", slug: "immortelle-anti-aging-blend" },
            { name: "Cedarwood Essential Oil", slug: "cedarwood-oil" },
            { name: "Rosemary Essential Oil", slug: "rosemary-oil" }
          ]
        },
        {
          name: "Tier 3 — Beard, Hair & Skin Mastery",
          description: "The complete aesthetic wellness stack. Support your best appearance and feel your strongest.",
          outcomes: "Support for beard/hair growth, healthy skin cell turnover, and comprehensive wellness integration",
          products: [
            { name: "Topical Healing Ointment", slug: "correct-x-essential-ointment" },
            { name: "Active Botanical Face Serum", slug: "yarrow-pom-active-botanical-duo" },
            { name: "Sandalwood Essential Oil", slug: "sandalwood-oil" },
            { name: "Myrrh Essential Oil", slug: "myrrh-oil" }
          ]
        }
      ],
      luxuryOfferings: {
        title: "Premium Longevity Services",
        services: [
          {
            name: "Wellness Age Assessment",
            price: "Contact for Pricing",
            includes: "Biological age testing • Longevity protocol design • Custom supplement stack • 90-day wellness roadmap",
            link: "https://healthlifestyleservices.com"
          },
          {
            name: "Executive Longevity Program",
            price: "Contact for Pricing",
            includes: "Monthly biomarker tracking • Quarterly lab panels • Custom formulations • Priority practitioner access • Wellness optimization sessions",
            link: "https://healthlifestyleservices.com"
          }
        ]
      },
      diy: {
        title: "DIY Legacy & Longevity Recipes",
        recipes: [
          {
            name: "Cellular Longevity Morning Elixir",
            ingredients: [
              { name: "Frankincense (2 drops)", slug: "frankincense" },
              { name: "Lemon (2 drops)", slug: "lemon" },
              { name: "Copaiba (1 drop)", slug: "copaiba" }
            ],
            instructions: "Add oils to 8oz glass of water or herbal tea. Drink first thing in the morning on empty stomach for cellular renewal and longevity support. Can also add to veggie capsules."
          },
          {
            name: "Beard & Scalp Growth Serum",
            ingredients: [
              { name: "Jojoba Oil (1 oz)", slug: "carrier-oils" },
              { name: "Castor Oil (1 oz)", slug: "carrier-oils" },
              { name: "Rosemary (15 drops)", slug: "rosemary" },
              { name: "Cedarwood (12 drops)", slug: "cedarwood" },
              { name: "Peppermint (8 drops)", slug: "peppermint" },
              { name: "Sandalwood (6 drops)", slug: "sandalwood-indian" }
            ],
            instructions: "Combine all ingredients in 2oz dropper bottle. Shake well. Massage 5-8 drops into beard or scalp nightly. Leave overnight. Promotes thickness, growth, and healthy shine."
          },
          {
            name: "Anti-Aging Face & Neck Serum",
            ingredients: [
              { name: "Active Botanical Serum (1 pump)", slug: "yarrow-pom-active-botanical-duo" },
              { name: "Frankincense (2 drops)", slug: "frankincense" },
              { name: "Anti-Aging Blend (2 drops)", slug: "immortelle-anti-aging-blend" },
              { name: "Sandalwood (1 drop)", slug: "sandalwood-indian" }
            ],
            instructions: "Mix oils with Yarrow|Pom serum in palm. Apply to clean face and neck morning and evening. Focus on fine lines, wrinkles, and sun damage areas."
          }
        ]
      }
    }
  };

  const femininePillars = {
    sovereign: {
      title: "SOVEREIGN",
      subtitle: "Hormonal Harmony • Cycle Support • Vitality",
      philosophy: "Reclaim control over your hormones, your cycle, your body. Support for PMS, mood balance, and hormonal wellness.",
      whoThisIsFor: "Women experiencing menstrual discomfort, cycle irregularity, peri-menopause changes, or post-menopause transitions. Those seeking natural hormone support.",
      whatYouGet: "Support for monthly cycle comfort • Hormonal mood balance support • Bone density wellness support • Post-menopause vitality support",
      tiers: [
        {
          name: "Tier 1 — Foundational Harmony",
          description: "Essential hormonal balance and monthly cycle support. Start here for PMS/cycle comfort.",
          outcomes: "Support for monthly cycle comfort, hormonal balance, and wellness consistency over time",
          products: [
            { name: "Women's Phytoestrogen Complex", slug: "phytoestrogen-essential-complex" },
            { name: "Monthly Hormone Blend", slug: "clarycalm-monthly-blend" },
            { name: "Clary Sage Essential Oil", slug: "clary-sage-oil" }
          ]
        },
        {
          name: "Tier 2 — Enhanced Balance",
          description: "Bone health, deep hormonal support, and peri-menopause transition support.",
          outcomes: "Support for bone wellness, comfort during temperature changes, and emotional balance",
          products: [
            { name: "Bone Nutrient Complex", slug: "bone-nutrient-essential-complex" },
            { name: "Women's Health Blend Softgels", slug: "clarycalm-monthly-blend" },
            { name: "Geranium Essential Oil", slug: "geranium-oil" },
            { name: "Ylang Ylang Essential Oil", slug: "ylang-ylang-oil" }
          ]
        },
        {
          name: "Tier 3 — Cycle Mastery & Longevity",
          description: "Complete hormonal support across all life phases. Cellular renewal meets feminine wellness.",
          outcomes: "Support for cycle balance, cellular health, and post-menopause vitality",
          products: [
            { name: "Active Botanical Duo Capsules", slug: "yarrow-pom-capsules" },
            { name: "Cellular Vitality Complex", slug: "ddr-prime-softgels" },
            { name: "Jasmine Touch Roller", slug: "jasmine-touch" },
            { name: "Rose Essential Oil", slug: "rose-oil" }
          ]
        }
      ],
      luxuryOfferings: {
        title: "Premium Hormonal Services",
        services: [
          {
            name: "Hormonal Harmony Consultation",
            price: "Contact for Pricing",
            includes: "Cycle tracking analysis • Custom hormonal protocol • Supplement + aromatherapy design • 60-day optimization plan",
            link: "https://healthlifestyleservices.com"
          },
          {
            name: "Sovereign Women's Program",
            price: "Contact for Pricing",
            includes: "Monthly hormone coaching • Custom cycle-phase protocols • Lab review (hormones, bone density) • Priority messaging access",
            link: "https://healthlifestyleservices.com"
          },
          {
            name: "Menopause Support Concierge",
            price: "Contact for Pricing",
            includes: "Weekly practitioner sessions • Custom compounded protocols • Hormone + bone wellness tracking • VIP retreat access • Unlimited support",
            link: "https://healthlifestyleservices.com"
          }
        ]
      },
      diy: {
        title: "DIY Sovereign Recipes",
        recipes: [
          {
            name: "Hormone Balance Smoothie",
            ingredients: [
              { name: "Women's Phytoestrogen Complex (1 capsule)", slug: "phytoestrogen-essential-complex" },
              { name: "Clary Sage Essential Oil (1 drop)", slug: "clary-sage" },
              { name: "Geranium Essential Oil (1 drop)", slug: "geranium" }
            ],
            instructions: "Open 1 phytoestrogen capsule into blender with frozen berries, spinach, almond milk, and flax seeds. Add 1 drop Clary Sage and 1 drop Geranium. Blend until smooth. Drink during days 1-14 of cycle for hormonal support."
          },
          {
            name: "Cycle Harmony Abdomen Oil",
            ingredients: [
              { name: "Fractionated Coconut Oil (2 oz)", slug: "fractionated-coconut-oil" },
              { name: "Monthly Hormone Blend (15 drops)", slug: "clarycalm-monthly-blend" },
              { name: "Clary Sage (10 drops)", slug: "clary-sage" },
              { name: "Ylang Ylang (8 drops)", slug: "ylang-ylang" },
              { name: "Glass Bottle with Pump", slug: "essential-oil-accessories" }
            ],
            instructions: "Combine all ingredients in glass bottle. Shake well before each use. Massage 5-6 pumps onto lower abdomen, lower back, and inner ankles daily, especially during days 15-28 of cycle."
          },
          {
            name: "Bone-Building Golden Milk",
            ingredients: [
              { name: "Bone Nutrient Complex (1 capsule)", slug: "bone-nutrient-essential-complex" },
              { name: "Turmeric Capsules (contents of 1)", slug: "turmeric-dual-chamber-capsules" },
              { name: "Cassia Essential Oil (1 drop)", slug: "cassia" }
            ],
            instructions: "Open capsules into warm milk (dairy or plant-based). Add 1 drop Cassia, honey, and black pepper. Whisk until frothy. Drink nightly for bone density support, especially important post-menopause."
          }
        ]
      },
      lifeCycleGuide: {
        title: "Supporting Natural Rhythms: A Life-Cycle Guide",
        description: "This section demonstrates how to use the tiered products to support different phases of a woman's natural cycle.",
        phases: [
          {
            name: "PMS & Menstrual Support (Pre-Menopause)",
            focus: "Comfort, emotional soothing, and hormonal balance.",
            internal: "Use Women's Phytoestrogen Complex (1-2 capsules daily) and Monthly Hormone Blend Softgels during days 15-28 to minimize monthly swings and discomfort.",
            topical: "Apply Monthly Hormone Blend or Cycle Harmony Abdomen Oil to lower abdomen, back, and ankles. Diffuse Clary Sage with Lavender for emotional grounding."
          },
          {
            name: "Peri-Menopause Transition",
            focus: "Bone health, balancing fluctuations, and managing temperature comfort.",
            internal: "Increase Bone Nutrient Complex to full daily dose. Take Women's Phytoestrogen Complex (2 capsules daily) to manage hormonal shifts and support heart/bone health.",
            topical: "Apply Clary Sage diluted to neck and feet for cooling relief. Use Monthly Hormone Blend on pulse points throughout the day."
          },
          {
            name: "Post-Menopause & Longevity",
            focus: "Long-term bone density, cardiovascular health, and cellular renewal.",
            internal: "Continue Bone Nutrient Complex, Women's Phytoestrogen Complex (2 daily), and add Active Botanical Duo Capsules for comprehensive cellular support.",
            topical: "Apply Frankincense and Rose diluted to face and décolletage daily for skin renewal. Use Ylang Ylang or Jasmine for emotional stability and joy."
          }
        ]
      }
    },
    flowingForm: {
      title: "FLOWING FORM",
      subtitle: "Weight Management • Graceful Movement • Recovery",
      philosophy: "Your body is not the enemy. Support your ideal form through metabolic balance, not punishment. Move with grace, recover with ease, age with strength.",
      whoThisIsFor: "Women navigating weight goals, seeking comfortable movement, or supporting recovery. Dancers, yogis, active mothers who value functional wellness.",
      whatYouGet: "Support for healthy weight management with balanced nutrition • Joint mobility and flexibility support • Post-exercise recovery support • Graceful aging through movement",
      tiers: [
        {
          name: "Tier 1 — Metabolic Foundation",
          description: "Support natural fat metabolism, healthy weight goals, and digestive function.",
          outcomes: "Support for metabolic balance, sustainable weight management, and digestive wellness when combined with healthy lifestyle habits",
          products: [
            { name: "Metabolic Blend Essential Oil", slug: "metapwr-metabolic-blend" },
            { name: "Metabolic Blend Softgels", slug: "metapwr-metabolic-blend" },
            { name: "Grapefruit Essential Oil", slug: "grapefruit-oil" }
          ]
        },
        {
          name: "Tier 2 — Active Grace",
          description: "Support for comfortable movement, healthy inflammation response, and gentle recovery for active lifestyles.",
          outcomes: "Support for joint comfort, movement freedom, and healthy inflammation response",
          products: [
            { name: "Turmeric Dual Chamber Capsules", slug: "turmeric-dual-chamber-capsules" },
            { name: "Soothing Blend Topical Rub", slug: "deep-blue-soothing-blend" },
            { name: "Lavender Essential Oil", slug: "lavender-oil" },
            { name: "Marjoram Essential Oil", slug: "marjoram-oil" }
          ]
        },
        {
          name: "Tier 3 — Movement Mastery",
          description: "Complete mobility support. Collagen synthesis support, cellular recovery, lifetime flexibility.",
          outcomes: "Support for tissue health, lifelong mobility goals, and complete body-mind wellness",
          products: [
            { name: "Collagen Synthesis Complex", slug: "metapwr-advantage" },
            { name: "Soothing Blend Polyphenol Complex", slug: "deep-blue-polyphenol-complex" },
            { name: "Massage Blend Kit", slug: "aromatouch-massage-blend" },
            { name: "Eucalyptus Essential Oil", slug: "eucalyptus-oil" }
          ]
        }
      ],
      luxuryOfferings: {
        title: "Premium Movement Services",
        services: [
          {
            name: "Body Composition Assessment",
            price: "Contact for Pricing",
            includes: "InBody scan • Custom metabolic protocol • Movement assessment • 90-day wellness plan",
            link: "https://healthlifestyleservices.com"
          },
          {
            name: "Movement Support Program",
            price: "Contact for Pricing",
            includes: "Monthly AromaTouch sessions • Custom recovery protocols • Movement coaching integration • Quarterly progress tracking",
            link: "https://healthlifestyleservices.com"
          }
        ]
      },
      diy: {
        title: "DIY Flowing Form Recipes",
        recipes: [
          {
            name: "Metabolism Boost Morning Water",
            ingredients: [
              { name: "Metabolic Blend (2 drops)", slug: "metapwr-metabolic-blend" },
              { name: "Grapefruit (2 drops)", slug: "grapefruit" },
              { name: "Lemon (1 drop)", slug: "lemon" }
            ],
            instructions: "Add oils to 16oz glass water bottle. Drink first thing in the morning on empty stomach, 30 minutes before breakfast. Supports metabolic function and gentle detox. Repeat mid-afternoon for sustained energy."
          },
          {
            name: "Post-Yoga Recovery Massage Oil",
            ingredients: [
              { name: "Fractionated Coconut Oil (2 oz)", slug: "fractionated-coconut-oil" },
              { name: "Soothing Blend Rub (1 tablespoon)", slug: "deep-blue-soothing-blend" },
              { name: "Lavender (12 drops)", slug: "lavender" },
              { name: "Marjoram (8 drops)", slug: "marjoram" },
              { name: "Eucalyptus (6 drops)", slug: "eucalyptus" }
            ],
            instructions: "Combine all ingredients in glass bottle. Shake well. Massage into shoulders, hips, legs, and feet after movement practice. Store in cool place. Perfect for gentle post-exercise recovery."
          },
          {
            name: "Collagen-Boosting Berry Bowl",
            ingredients: [
              { name: "Collagen Synthesis Complex (1 serving)", slug: "metapwr-advantage" },
              { name: "Wild Orange (1 drop)", slug: "wild-orange" },
              { name: "Ginger (1 drop)", slug: "ginger" }
            ],
            instructions: "Mix Collagen Synthesis powder into Greek yogurt or coconut yogurt. Top with fresh berries, chia seeds, and granola. Add 1 drop Wild Orange and 1 drop Ginger. Eat within 30 minutes post-workout for optimal recovery."
          }
        ]
      }
    },
    radiance: {
      title: "RADIANCE",
      subtitle: "Emotional Balance • Inner Light • Clarity",
      philosophy: "Support for anxiety, stress, and emotional balance. Reclaim joy. Radiate confidence. Become magnetically present.",
      whoThisIsFor: "Women managing anxiety, stress, emotional overwhelm, or seeking self-reconnection. Those seeking emotional resilience, inner peace, and presence.",
      whatYouGet: "Support for anxiety management • Emotional stability support • Natural mood elevation support • Confidence and presence enhancement",
      investment: "From $85/month (Foundation) to $2,800/quarter (Radiance Intensive)",
      tiers: [
        {
          name: "Tier 1 — Luminous Foundation",
          description: "Daily emotional support. Uplift mood, support anxiety management, restore baseline joy.",
          outcomes: "Support for acute mood balance, anxiety management, and emotional wellness over time",
          products: [
            { name: "Uplifting Blend Essential Oil", slug: "elevation-joyful-blend" },
            { name: "Bergamot Essential Oil", slug: "bergamot-oil" },
            { name: "Lavender Essential Oil", slug: "lavender-oil" }
          ]
        },
        {
          name: "Tier 2 — Emotional Mastery",
          description: "Deep emotional support. Process grief, cultivate resilience, find balance.",
          outcomes: "Support for stress hormone balance, emotional processing, and sustained equilibrium",
          products: [
            { name: "Calming Blend Capsules", slug: "adaptiv-calming-blend-capsules" },
            { name: "Mood Management Blend", slug: "console-comforting-blend" },
            { name: "Rose Touch Roller", slug: "rose-touch" },
            { name: "Frankincense Essential Oil", slug: "frankincense-oil" }
          ]
        },
        {
          name: "Tier 3 — Radiant Empowerment",
          description: "Complete emotional support. Embrace your radiant, confident, joyful self.",
          outcomes: "Support for magnetic presence, joyful baseline mood, and emotional mastery",
          products: [
            { name: "Women's Perfume Blend", slug: "whisper-blend-for-women" },
            { name: "Joyful Blend Essential Oil", slug: "cheer-uplifting-blend" },
            { name: "Ylang Ylang Essential Oil", slug: "ylang-ylang-oil" },
            { name: "Ultrasonic Diffuser", slug: "petal-diffuser" }
          ]
        }
      ],
      luxuryOfferings: {
        title: "Premium Emotional Wellness Services",
        services: [
          {
            name: "Emotional Wellness Assessment",
            price: "Contact for Pricing",
            includes: "Mood wellness screening • Custom aromatherapy protocol • Emotional regulation toolkit • 60-day wellness program",
            link: "https://healthlifestyleservices.com"
          },
          {
            name: "Radiance Support Intensive",
            price: "Contact for Pricing",
            includes: "Bi-weekly coaching sessions • Custom emotional support blends • Mood wellness tracking • Practitioner access • Quarterly retreat invitation",
            link: "https://healthlifestyleservices.com"
          }
        ]
      },
      diy: {
        title: "DIY Radiance Recipes",
        recipes: [
          {
            name: "Morning Radiance Ritual Mist",
            ingredients: [
              { name: "Witch Hazel (4 oz)", slug: "essential-oil-accessories" },
              { name: "Bergamot (15 drops)", slug: "bergamot" },
              { name: "Uplifting Blend (12 drops)", slug: "elevation-joyful-blend" },
              { name: "Wild Orange (10 drops)", slug: "wild-orange" },
              { name: "Glass Spray Bottle", slug: "essential-oil-accessories" }
            ],
            instructions: "Combine all ingredients in spray bottle. Shake vigorously before each use. Mist over face, neck, and around your space each morning. Breathe deeply for 3 breaths. Sets emotional tone for the day."
          },
          {
            name: "Heart-Opening Pulse Point Perfume",
            ingredients: [
              { name: "Fractionated Coconut Oil", slug: "fractionated-coconut-oil" },
              { name: "Rose Touch (roller)", slug: "rose-touch" },
              { name: "Jasmine Touch (roller)", slug: "jasmine-touch" },
              { name: "Ylang Ylang (4 drops)", slug: "ylang-ylang" },
              { name: "Bergamot (3 drops)", slug: "bergamot" },
              { name: "10mL Roller Bottle", slug: "essential-oil-accessories" }
            ],
            instructions: "Fill roller 3/4 with Fractionated Coconut Oil. Add 3 rolls from Rose Touch, 2 from Jasmine Touch, then Ylang Ylang and Bergamot drops. Top with more FCO. Apply to wrists, heart center, behind ears when you need emotional centering."
          },
          {
            name: "Mood-Lifting Bath Salts",
            ingredients: [
              { name: "Epsom Salts (2 cups)", slug: "essential-oil-accessories" },
              { name: "Uplifting Blend (10 drops)", slug: "elevation-joyful-blend" },
              { name: "Bergamot (8 drops)", slug: "bergamot" },
              { name: "Lavender (6 drops)", slug: "lavender" },
              { name: "Glass Storage Jar", slug: "essential-oil-accessories" }
            ],
            instructions: "Mix Epsom salts with essential oils in jar. Seal and shake vigorously. Let sit 24 hours. Add 1/2 cup to warm bath. Soak for 20 minutes while practicing gratitude meditation for emotional reset."
          }
        ]
      }
    },
    eternal: {
      title: "ETERNAL",
      subtitle: "Cellular Renewal • Timeless Beauty • Longevity",
      philosophy: "Support your skin's natural beauty through cellular wellness. Age powerfully with cellular science and natural ingredients.",
      whoThisIsFor: "Women over 35 choosing to age powerfully. Professionals, influencers, executives who understand beauty is cellular health made visible.",
      whatYouGet: "Support for fine line appearance • Skin cellular turnover support • Collagen synthesis support • Age-defying radiance from cellular foundation",
      investment: "From $155/month (Foundation) to $5,500/quarter (Eternal Beauty Concierge)",
      tiers: [
        {
          name: "Tier 1 — Ageless Foundation",
          description: "Professional-grade skincare meets cellular wellness. The essential daily system.",
          outcomes: "Support for skin texture, fine line appearance, and visible skin health improvements over time",
          products: [
            { name: "Active Botanical Duo Serum", slug: "yarrow-pom-active-botanical-duo" },
            { name: "Anti-Aging Moisturizer", slug: "anti-aging-moisturizer" },
            { name: "Frankincense Essential Oil", slug: "frankincense-oil" }
          ]
        },
        {
          name: "Tier 2 — Deep Regeneration",
          description: "Inside-out wellness. Cellular health creates external beauty.",
          outcomes: "Support for cellular health, internal-external beauty synergy, and metabolic wellness",
          products: [
            { name: "Active Botanical Duo Capsules", slug: "yarrow-pom-capsules" },
            { name: "Metabolic System Bundle", slug: "metapwr-metabolic-system" },
            { name: "Cellular Vitality Complex", slug: "ddr-prime-softgels" },
            { name: "Sandalwood Essential Oil", slug: "sandalwood-oil" }
          ]
        },
        {
          name: "Tier 3 — Timeless Mastery",
          description: "The ultimate wellness arsenal. Professional-grade support through natural cellular science.",
          outcomes: "Support for youthful appearance, skin elasticity, and comprehensive age-defying wellness",
          products: [
            { name: "Tightening Serum", slug: "tightening-serum" },
            { name: "Hydrating Cream", slug: "hydrating-cream" },
            { name: "Anti-Aging Blend", slug: "immortelle-anti-aging-blend" },
            { name: "Myrrh Essential Oil", slug: "myrrh-oil" }
          ]
        }
      ],
      luxuryOfferings: {
        title: "Premium Beauty & Longevity Services",
        services: [
          {
            name: "Cellular Beauty Assessment",
            price: "Contact for Pricing",
            includes: "Skin analysis (elasticity, hydration, health markers) • Custom skincare protocol • Professional-grade product selection • 90-day wellness roadmap",
            link: "https://healthlifestyleservices.com"
          },
          {
            name: "Timeless Beauty Program",
            price: "Contact for Pricing",
            includes: "Monthly facial treatments • Custom serum formulations • Progress photography • Skincare coaching • Product optimization",
            link: "https://healthlifestyleservices.com"
          },
          {
            name: "Beauty Wellness Concierge",
            price: "Contact for Pricing",
            includes: "Bi-weekly luxury facials • Custom compounded serums • Skin health testing • Quarterly retreats • Unlimited practitioner access • VIP product delivery",
            link: "https://healthlifestyleservices.com"
          }
        ]
      },
      diy: {
        title: "DIY Eternal Beauty Recipes",
        recipes: [
          {
            name: "Cellular Renewal Morning Elixir",
            ingredients: [
              { name: "Active Botanical Duo Capsules (1)", slug: "yarrow-pom-capsules" },
              { name: "Cellular Vitality Complex (1)", slug: "ddr-prime-softgels" },
              { name: "Frankincense (2 drops)", slug: "frankincense" },
              { name: "Lemon (1 drop)", slug: "lemon" }
            ],
            instructions: "Pierce capsules and squeeze contents into 8oz warm water with lemon juice. Add Frankincense and Lemon essential oils. Drink on empty stomach each morning for cellular anti-aging support from within."
          },
          {
            name: "Luxury Anti-Aging Night Serum",
            ingredients: [
              { name: "Active Botanical Duo Serum (2 pumps)", slug: "yarrow-pom-serum" },
              { name: "Frankincense (3 drops)", slug: "frankincense" },
              { name: "Anti-Aging Blend (2 drops)", slug: "immortelle-anti-aging-blend" },
              { name: "Sandalwood (2 drops)", slug: "sandalwood-indian" },
              { name: "Rose (1 drop)", slug: "rose" }
            ],
            instructions: "Mix all ingredients in palm. Apply to cleansed face and neck in upward motions. Focus on fine lines, wrinkles, and age spots. Use nightly after cleansing, before moisturizer. Let absorb fully."
          },
          {
            name: "Youth-Boosting Collagen Face Mask",
            ingredients: [
              { name: "Collagen Synthesis Powder (1 scoop)", slug: "metapwr-advantage" },
              { name: "Active Botanical Duo Serum (1 pump)", slug: "yarrow-pom-active-botanical-duo" },
              { name: "Frankincense (2 drops)", slug: "frankincense" },
              { name: "Myrrh (2 drops)", slug: "myrrh" }
            ],
            instructions: "Mix powder with Greek yogurt, honey, and serum until paste forms. Add Frankincense and Myrrh. Apply thick layer to face and neck. Leave 15-20 minutes. Rinse with warm water. Use 2x weekly for firming and renewal."
          }
        ]
      }
    }
  };

  const foundationalResources = {
    nutrition: {
      title: "Foundation: Nutrition",
      description: "Core Supplement Bundle: A complete pack of multivitamins, probiotics and essential oils for daily foundational nutrition.",
      link: `${doterraBaseUrl}foundational-wellness-bundle`,
      linkText: "Shop Foundational Wellness Bundle"
    },
    hydration: {
      title: "Foundation: Hydration",
      guideline: "35 mL per kg of body weight daily. Increase based on activity level and environment.",
      protocol: [
        {
          time: "Morning (Energize & Cleanse)",
          instruction: "1-2 drops of citrus oil in water",
          link: `${doterraBaseUrl}lemon`,
          linkText: "Lemon Oil"
        },
        {
          time: "Noon (Focus & Digest)",
          instruction: "1 drop of mint oil in water",
          link: `${doterraBaseUrl}peppermint`,
          linkText: "Peppermint Oil"
        },
        {
          time: "Evening (Calm & Soothe)",
          instruction: "1-2 drops of floral oil in warm water",
          link: `${doterraBaseUrl}lavender`,
          linkText: "Lavender Oil"
        }
      ]
    },
    sleep: {
      title: "Foundation: Sleep Support",
      description: "Complete Sleep System: A full system including a supplement, a topical oil blend, and a diffusable oil blend for rest.",
      link: `${doterraBaseUrl}serenity-restful-blend`,
      linkText: "Shop Sleep Support System"
    },
    weightAndActivity: {
      title: "Foundation: Weight & Physical Activity Guidelines",
      description: "Evidence-based guidelines for maintaining healthy weight and physical activity levels across all life stages.",
      men: {
        title: "Men's Guidelines",
        ageGroups: [
          {
            range: "Ages 18-30",
            activity: "150-300 min/week moderate OR 75-150 min/week vigorous aerobic activity",
            strength: "2+ days/week full-body strength training",
            flexibility: "2-3 days/week stretching/mobility work",
            recovery: "1-2 rest days/week for muscle repair"
          },
          {
            range: "Ages 31-50",
            activity: "150-300 min/week moderate aerobic (brisk walking, cycling)",
            strength: "2-3 days/week strength training (focus on maintaining muscle mass)",
            flexibility: "3 days/week stretching (prevent stiffness)",
            recovery: "2 rest days/week; prioritize sleep 7-9 hours"
          },
          {
            range: "Ages 51-70",
            activity: "150 min/week moderate aerobic (walking, swimming)",
            strength: "2 days/week functional strength (maintain independence)",
            flexibility: "Daily gentle stretching, balance work 2-3x/week",
            recovery: "Active recovery (gentle movement); monitor joint health"
          },
          {
            range: "Ages 70+",
            activity: "As able, focus on daily movement (walking 20-30 min)",
            strength: "Light resistance 2x/week (resistance bands, bodyweight)",
            flexibility: "Daily mobility work; chair yoga; fall prevention exercises",
            recovery: "Prioritize rest, hydration, and gradual progression"
          }
        ],
        weightGuidelines: "Healthy BMI: 18.5-24.9. Waist circumference: <40 inches (102 cm). Focus on muscle mass maintenance, especially after age 30."
      },
      women: {
        title: "Women's Guidelines",
        ageGroups: [
          {
            range: "Ages 18-30",
            activity: "150-300 min/week moderate OR 75-150 min/week vigorous activity",
            strength: "2+ days/week strength training (bone density support)",
            flexibility: "2-3 days/week yoga, Pilates, or stretching",
            recovery: "1-2 rest days; adjust intensity during menstrual cycle",
            cycleNote: "Follicular phase (days 1-14): Higher intensity. Luteal phase (days 15-28): Moderate intensity, more rest."
          },
          {
            range: "Ages 31-50",
            activity: "150-300 min/week moderate aerobic activity",
            strength: "2-3 days/week resistance training (combat muscle loss)",
            flexibility: "3-4 days/week stretching, yoga",
            recovery: "2 rest days; prioritize stress management and sleep",
            cycleNote: "Peri-menopause: Adjust based on energy levels and hormonal fluctuations."
          },
          {
            range: "Ages 51-70",
            activity: "150 min/week moderate activity (walking, dancing, water aerobics)",
            strength: "2-3 days/week strength training (bone health critical)",
            flexibility: "Daily stretching; balance exercises 3x/week",
            recovery: "Focus on joint-friendly activities; monitor bone density",
            menopauseNote: "Post-menopause: Strength training essential for bone density and metabolic health."
          },
          {
            range: "Ages 70+",
            activity: "Daily movement as able (walking 15-30 min)",
            strength: "2x/week light resistance (prevent sarcopenia)",
            flexibility: "Daily gentle stretching; chair exercises; tai chi",
            recovery: "Active recovery; fall prevention focus; social movement activities",
            menopauseNote: "Prioritize functional fitness for daily living independence."
          }
        ],
        weightGuidelines: "Healthy BMI: 18.5-24.9. Waist circumference: <35 inches (88 cm). Hormonal changes affect weight distribution; focus on strength and bone density over weight alone."
      },
      universalPrinciples: [
        "Progressive overload: Gradually increase intensity over time",
        "Consistency > Intensity: Regular movement beats sporadic intense exercise",
        "Listen to your body: Adjust based on energy, stress, sleep, and recovery",
        "Nutrition timing: Protein within 30-60 min post-workout for recovery",
        "Hydration: 16-24 oz water 2 hours before exercise; sip during; 16-24 oz post-workout"
      ]
    },
    foodServings: {
      title: "Foundation: Nutrition - Food Serving Sizes & Daily Intake",
      categories: [
        { name: "Protein", serving: "3-4 ounces or ½ cup", daily: "2-3 servings" },
        { name: "Vegetables", serving: "1 cup raw or ½ cup cooked", daily: "3-5 servings" },
        { name: "Carbohydrates", serving: "½ cup cooked", daily: "3-4 servings" },
        { name: "Fruits", serving: "1 medium piece or ½ cup chopped", daily: "2-3 servings" },
        { name: "Fats", serving: "1 teaspoon oil or 2 tablespoons nuts/seeds", daily: "2-3 servings" },
        { name: "Dairy/Dairy Alternatives", serving: "1 cup milk or ¾ cup yogurt", daily: "2-3 servings" }
      ]
    },
    fastingMen: {
      title: "Foundation: Intermittent Fasting - Men",
      guidelines: [
        { ageRange: "Ages 18-30", method: "16/8 method (16-hour fast, 8-hour eating window)" },
        { ageRange: "Ages 31-50", method: "16/8 method or 14/10 method (14-hour fast, 10-hour eating window)" },
        { ageRange: "Ages 51-70", method: "14/10 method or 12/12 method (12-hour fast, 12-hour eating window)" },
        { ageRange: "Ages 70+", method: "Not generally recommended without direct medical supervision" }
      ]
    },
    fastingWomen: {
      title: "Foundation: Intermittent Fasting - Women",
      guidelines: [
        { ageRange: "Ages 18-30", method: "14/10 method (14-hour fast, 10-hour eating window)" },
        { ageRange: "Ages 31-50", method: "12/12 method (12-hour fast, 12-hour eating window); adjust based on menstrual cycle" },
        { ageRange: "Ages 51-70", method: "12/12 method; monitor for hormonal fluctuations" },
        { ageRange: "Ages 70+", method: "Not generally recommended without direct medical supervision" }
      ]
    },
    portionSizesChildren: {
      title: "Foundation: Portion Sizes - Children (Visual, Universal Rules)",
      portions: [
        { category: "Protein (per meal)", serving: "Child serving = half-palm (age-adjusted)" },
        { category: "Vegetables (per meal)", serving: "Child serving = 1 cupped hand" },
        { category: "Starches / Grains", serving: "Child serving = ½ fist" },
        { category: "Fats", serving: "Child serving = ½ thumb" }
      ],
      snackTip: "Snacks: Keep protein + fat together (e.g., Greek yogurt + nuts) to stabilize blood sugar."
    },
    portionSizesMature: {
      title: "Foundation: Portion Sizes - Mature Adults (Visual, Universal Rules)",
      portions: [
        { category: "Protein (per meal)", serving: "Adult serving = 1 palm (cooked) ≈ 3–4 oz (85–115 g)" },
        { category: "Vegetables (per meal)", serving: "Adult serving = 2 cupped hands (non-starchy veg) ≈ 1–2 cups" },
        { category: "Starches / Grains", serving: "Adult serving = 1 fist ≈ ½–1 cup cooked" },
        { category: "Fats", serving: "Adult serving = 1 thumb (olive oil, butter, nut butter) ≈ 1 tbsp" }
      ],
      snackTip: "Snacks: Keep protein + fat together (e.g., Greek yogurt + nuts) to stabilize blood sugar."
    }
  };

  const agelessContent = {
    children: {
      title: "Children's Wellness",
      description: "Nurturing growth, immunity, and natural vitality for young ones.",
      ageGroups: {
        infants: {
          range: "0-12 months",
          safeOils: ["Lavender (highly diluted 1:10+)", "Roman Chamomile (aromatic only)"],
          focus: "Gentle aromatic support, always consult pediatrician",
          products: []
        },
        toddlers: {
          range: "1-3 years",
          safeOils: ["Lavender", "Frankincense", "Cedarwood", "Chamomile"],
          focus: "Sleep support, immune building, gentle calming",
          products: [
            { name: "Lavender Essential Oil", slug: "lavender-oil" }
          ]
        },
        earlyChild: {
          range: "4-6 years",
          focus: "Focus, immunity, seasonal wellness, emotional regulation",
          products: [
            { name: "Lavender Essential Oil", slug: "lavender-oil" },
            { name: "Frankincense Essential Oil", slug: "frankincense-oil" }
          ]
        },
        schoolAge: {
          range: "7-12 years",
          focus: "Focus and concentration, immune support, growing pains, confidence",
          products: [
            { name: "Peppermint Essential Oil", slug: "peppermint-oil" },
            { name: "Copaiba Essential Oil", slug: "copaiba-oil" }
          ]
        },
        teens: {
          range: "13-17 years",
          focus: "Hormonal balance, skin health, stress management, athletic recovery",
          products: [
            { name: "Tea Tree Essential Oil", slug: "melaleuca-oil" },
            { name: "Lavender Essential Oil", slug: "lavender-oil" }
          ]
        }
      },
      foundations: true
    },
    matureWomen: {
      title: "Mature Women's Vitality",
      description: "Graceful aging with hormonal wisdom and radiant longevity.",
      focus: [
        "Bone density and osteoporosis prevention",
        "Post-menopausal hormone balance",
        "Cognitive clarity and memory",
        "Heart and cardiovascular health",
        "Skin elasticity and cellular renewal",
        "Joint mobility and inflammation management"
      ],
      products: [
        { name: "Bone Support Complex", slug: "bone-nutrient-essential-complex" },
        { name: "Women's Phytoestrogen Complex", slug: "phytoestrogen-essential-complex" },
        { name: "Cellular Beauty System", slug: "yarrow-pom-active-botanical-duo" },
        { name: "Metabolism Support System", slug: "metapwr-metabolic-system" }
      ],
      foundations: true
    },
    matureMen: {
      title: "Mature Men's Vitality",
      description: "Sustained strength, cognitive sharpness, and purposeful longevity.",
      focus: [
        "Prostate health and urinary function",
        "Testosterone support and vitality",
        "Cardiovascular and heart health",
        "Cognitive function and neuroprotection",
        "Joint health and mobility",
        "Metabolic health and lean muscle maintenance"
      ],
      products: [
        { name: "Energy & Stamina Complex", slug: "mito2max-energy-metabolism-complex" },
        { name: "Copaiba Essential Oil", slug: "copaiba" },
        { name: "Frankincense Essential Oil", slug: "frankincense" },
        { name: "Metabolism Support System", slug: "metapwr-metabolic-system" }
      ],
      foundations: true
    }
  };

  const petContent = {
    dogs: {
      title: "Canine Wellness",
      description: "The ONLY comprehensive essential oil protocol system designed specifically for dogs. Safe, effective, and trusted by veterinarians.",
      consultationLink: "https://healthlifestyleservices.com",
      safetyNote: "Dogs metabolize oils well when properly diluted. Always use Touch rollers (pre-diluted) or dilute at 1:3 to 1:4 ratio with FCO. Start with aromatic/topical before oral use.",
      categories: {
        longevity: {
          title: "Longevity & Cellular Health",
          safeOils: ["Frankincense", "Copaiba", "Turmeric", "DDR Prime"],
          oral: [
            { name: "Frankincense", slug: "frankincense", dosage: "1 drop per 50 lbs body weight in food daily", method: "Mix into wet food or treat" },
            { name: "Copaiba", slug: "copaiba", dosage: "1 drop per 50 lbs daily", method: "Add to food or water bowl" },
            { name: "DDR Prime Softgels", slug: "ddr-prime-softgels", dosage: "1 softgel per 50 lbs (pierce & squeeze onto food)", method: "Daily with meals" }
          ],
          topical: [
            { name: "Frankincense Touch Roller", slug: "frankincense-touch", application: "Roll on paws, belly, or along spine", dilution: "Pre-diluted, safe for direct application" }
          ],
          diy: {
            title: "Cellular Support Dog Treats",
            ingredients: [
              "2 cups oat flour",
              "1/4 cup pumpkin puree",
              "1 egg",
              "2 drops Frankincense",
              "1 drop Copaiba"
            ],
            instructions: "Mix ingredients, roll out dough, cut shapes, bake at 350°F for 20 min. Store in airtight container. Give 1-2 treats daily."
          },
          seasonal: {
            spring: "Detox support with 1 drop Lemon in stainless steel water bowl daily",
            fall: "Immune boost by diffusing Protective Blend in living space 30 min daily"
          }
        },
        stress: {
          title: "Stress & Calming Support",
          oral: [
            { name: "Lavender", slug: "lavender", dosage: "1 drop in food daily (calming)" }
          ],
          topical: [
            { name: "Lavender Touch Roller", slug: "lavender-touch", application: "Roll on back and ears (pre-diluted)" },
            { name: "Calming Blend diluted 1:4 in FCO", slug: "adaptiv-calming-blend", application: "Massage into back before stressful events" }
          ],
          supplements: [
            { name: "Calming Blend Capsules (modified dosage)", slug: "adaptiv-calming-blend-capsules", dosage: "Consult for proper dosing" }
          ],
          seasonal: {
            summer: "Lavender Touch on paws for cooling calm",
            winter: "Grounding Blend diffused in living space"
          }
        },
        joints: {
          title: "Joint & Muscle Support",
          oral: [
            { name: "Turmeric Dual Chamber Capsules", slug: "turmeric-dual-chamber-capsules", dosage: "1 cap per 50 lbs daily" },
            { name: "Copaiba", slug: "copaiba", dosage: "1-2 drops in food daily" }
          ],
          topical: [
            { name: "Soothing Blend Rub diluted 1:3", slug: "deep-blue-soothing-blend", application: "Massage into joints after activity" },
            { name: "Frankincense Touch Roller", slug: "frankincense-touch", application: "Roll on affected joints (pre-diluted)" }
          ],
          supplements: [
            { name: "Soothing Blend Polyphenol Complex (modified)", slug: "deep-blue-polyphenol-complex", dosage: "Consult for dosing" }
          ],
          seasonal: {
            winter: "Extra support with warming massage during cold months",
            spring: "Mobility prep with gentle stretching and topical support"
          }
        },
        coat: {
          title: "Coat & Skin Health",
          oral: [
            { name: "Probiotic Powder", slug: "pb-assist-jr", dosage: "1/4-1/2 serving daily in food" }
          ],
          topical: [
            { name: "Lavender Touch Roller", slug: "lavender-touch", application: "For hot spots and itching (pre-diluted)" },
            { name: "Cedarwood diluted 1:10 in FCO", slug: "cedarwood", application: "Coat shine spray" }
          ],
          supplements: [
            { name: "Omega Complex (fish oil)", slug: "ddr-prime-softgels", dosage: "1 softgel per 50 lbs (pierce and squeeze on food)" }
          ],
          seasonal: {
            spring: "Shedding season support with omega supplementation",
            fall: "Winter coat prep with moisturizing treatments"
          }
        },
        digestive: {
          title: "Digestive Wellness",
          oral: [
            { name: "Ginger Essential Oil", slug: "ginger", dosage: "1 drop in food for upset stomach" },
            { name: "Digestive Enzyme Complex", slug: "terrazyme-digestive-enzyme-complex", dosage: "1 capsule per 50 lbs with meals" }
          ],
          topical: [
            { name: "Digestive Blend Touch Roller", slug: "digestzen-touch", application: "Roll on belly clockwise (pre-diluted)" }
          ],
          supplements: [
            { name: "Probiotic Powder", slug: "pb-assist-jr", dosage: "1/4-1/2 serving daily in food" }
          ],
          seasonal: {
            allYear: "Consistent probiotic support for optimal gut health"
          }
        },
        pest: {
          title: "Flea, Tick & Pest Prevention",
          safeOils: ["Cedarwood", "Lemongrass", "Peppermint (highly diluted)", "Eucalyptus"],
          topical: [
            { name: "Natural Pest Deterrent Collar Blend", slug: "cedarwood", application: "Apply 2-3 drops to collar weekly", dilution: "Pre-dilute: 10 drops Cedarwood + 5 drops Lemongrass in 1 oz FCO" }
          ],
          diy: {
            title: "Flea & Tick Prevention Spray",
            ingredients: [
              "8 oz distilled water",
              "1 oz witch hazel",
              "10 drops Cedarwood",
              "8 drops Lemongrass",
              "5 drops Eucalyptus",
              "3 drops Peppermint"
            ],
            instructions: "Combine in spray bottle. Shake well before each use. Spray on coat before outdoor activities, avoiding face. Reapply every 4 hours during peak pest season."
          },
          yardSpray: {
            title: "Natural Yard & Garden Pest Control",
            ingredients: [
              "1 gallon water",
              "30 drops Lemongrass",
              "20 drops Cedarwood",
              "15 drops Eucalyptus",
              "2 tbsp dish soap (emulsifier)"
            ],
            instructions: "Mix in garden sprayer. Apply to lawn perimeter, shrubs, and outdoor pet areas weekly during flea/tick season. Safe for plants and pets after drying."
          },
          seasonal: {
            spring: "Peak tick season - spray coat before every walk, check for ticks nightly",
            summer: "Flea prevention - treat yard weekly, refresh collar blend twice weekly"
          }
        },
        cleaning: {
          title: "Cleaning & Bedding",
          products: [
            { name: "Lemon Essential Oil", slug: "lemon", use: "Natural degreaser for bowls and toys" },
            { name: "Protective Blend Cleaner", slug: "on-guard-cleaner-concentrate", use: "Disinfect floors, crates, surfaces" }
          ],
          diy: {
            title: "Calming Sleep Sachet",
            ingredients: [
              "1 small muslin bag",
              "1/4 cup dried lavender buds",
              "2 tbsp dried chamomile",
              "Cotton ball with 5 drops Lavender",
              "Cotton ball with 3 drops Cedarwood"
            ],
            instructions: "Fill muslin bag with herbs and scented cotton balls. Tie closed. Place under dog bed or near crate. Refresh oils weekly. Promotes calm, restful sleep."
          },
          bedCleaner: {
            title: "Natural Bed & Toy Wash",
            ingredients: [
              "Regular laundry detergent",
              "5 drops Lemon",
              "3 drops Protective Blend",
              "2 drops Lavender"
            ],
            instructions: "Add oils to wash cycle with bedding and soft toys. Natural deodorizing and disinfecting. Air dry in sunlight when possible."
          },
          seasonal: {
            spring: "Deep clean crate, bowls, all bedding with Lemon + Protective Blend",
            fall: "Create calming sachets for cozy winter sleep environment"
          }
        },
        water: {
          title: "Hydration & Water Enhancement",
          products: [
            { name: "Lemon (1 drop per bowl)", slug: "lemon", use: "Supports kidney and liver function" },
            { name: "Frankincense (1 drop)", slug: "frankincense", use: "Cellular hydration support" }
          ]
        }
      }
    },
    cats: {
      title: "Feline Wellness",
      description: "CRITICAL SAFETY PROTOCOLS for cats. Felines lack crucial liver enzymes - we provide the ONLY safe, species-specific essential oil guidelines.",
      consultationLink: "https://healthlifestyleservices.com",
      criticalWarning: "CATS CANNOT METABOLIZE PHENOLS & TERPENES. Their liver lacks glucuronyl transferase enzyme. NEVER use internally. Aromatic ONLY, ultra-diluted 1:50+ or hydrosols. Monitor for signs of toxicity: drooling, vomiting, tremors.",
      toxicOils: ["Tea Tree (Melaleuca)", "Oregano", "Thyme", "Clove", "Wintergreen", "Birch", "Cassia", "Cinnamon Bark"],
      safestOils: ["Lavender (diluted)", "Frankincense (diluted)", "Copaiba (extreme caution)", "Cedarwood (aromatic only)"],
      note: "Cats are HIGHLY sensitive - hydrosols preferred over essential oils. AROMATIC ONLY in separate room with escape route. NEVER topical or internal.",
      categories: {
        stress: {
          title: "Calming & Stress Support (AROMATIC ONLY)",
          safeMethod: "Diffuse in SEPARATE room with door open. Cat must have escape route. Never confine cat with diffuser.",
          aromatic: [
            { name: "Lavender Hydrosol", slug: "lavender", application: "Mist lightly in room cat frequents (not directly on cat)", dilution: "Use pure hydrosol, not essential oil" },
            { name: "Lavender Essential Oil", slug: "lavender", application: "1-2 drops in diffuser in adjacent room", duration: "15-20 minutes only, then turn off" }
          ],
          environmental: {
            title: "Calming Environment Spray (NEVER spray on cat)",
            ingredients: [
              "4 oz distilled water",
              "1 oz witch hazel", 
              "2 drops Lavender hydrosol OR",
              "1 drop Lavender essential oil (heavily diluted)"
            ],
            instructions: "Mist bedding, scratching posts, favorite lounging spots. Let dry completely before cat access. Use sparingly - cat's sense of smell is 14x stronger than humans."
          },
          seasonal: { allYear: "Minimal use only during stressful events (vet visits, travel, moving)" }
        },
        respiratory: {
          title: "Respiratory & Immune Support (EXTREME CAUTION)",
          safeMethod: "Only use during respiratory distress under veterinary guidance. Aromatic only, separate room.",
          aromatic: [
            { name: "Eucalyptus", slug: "eucalyptus", application: "1 drop in steamy bathroom (shower running), cat in adjacent room with door cracked", duration: "5-10 minutes maximum" }
          ],
          note: "Respiratory issues require veterinary care. Essential oils are supportive only, never primary treatment."
        },
        environment: {
          title: "Safe Home Environment",
          cleaners: [
            { name: "Lemon (for human cleaning)", slug: "lemon", use: "Clean litter area, floors - ensure dry before cat access", dilution: "3 drops per gallon water" }
          ],
          note: "Never use oils near litter box, food bowls, or where cat grooms. Residue can be toxic if ingested during grooming."
        }
      }
    },
    horses: {
      title: "Equine Wellness",
      description: "Professional-grade protocols for performance horses, ranch animals, and rescue rehabilitation. The ONLY complete equine aromatherapy system.",
      consultationLink: "https://healthlifestyleservices.com",
      safetyNote: "Horses have excellent sense of smell and generally tolerate oils well. Use dilution ratios of 1:1 to 1:3 for topical. Can use neat (undiluted) on hooves. Allow horse to smell first - if they turn away, it's not right for them.",
      categories: {
        performance: {
          title: "Athletic Performance & Recovery",
          safeOils: ["Peppermint", "Lavender", "Marjoram", "Wintergreen", "Copaiba", "Frankincense"],
          topical: [
            { name: "Pre-Workout Muscle Prep", slug: "peppermint", application: "10-15 drops Peppermint + 5 drops Marjoram diluted 1:2 in FCO, massage into major muscle groups", timing: "30 min before exercise" },
            { name: "Post-Exercise Recovery Blend", slug: "deep-blue-soothing-blend", application: "Soothing Blend Rub + 5 drops Lavender + 3 drops Copaiba, massage into worked muscles", timing: "Immediately after cooldown" }
          ],
          diy: {
            title: "Performance Recovery Liniment",
            ingredients: [
              "8 oz aloe vera gel",
              "2 oz witch hazel",
              "20 drops Peppermint",
              "15 drops Lavender",
              "10 drops Wintergreen",
              "10 drops Marjoram",
              "5 drops Copaiba"
            ],
            instructions: "Combine in squeeze bottle. Shake well. Apply generously to legs, shoulders, hindquarters after work. Massage in thoroughly. Can use daily. Cooling and anti-inflammatory."
          }
        },
        respiratory: {
          title: "Respiratory & Immune Support",
          safeOils: ["Eucalyptus", "Peppermint", "Rosemary", "Frankincense", "Protective Blend"],
          topical: [
            { name: "Respiratory Support Blend", slug: "breathe-respiratory-blend", application: "5-8 drops on halter noseband or 10-15 drops diluted 1:1, apply to chest", frequency: "2-3x daily during respiratory challenges" }
          ],
          steaming: {
            title: "Respiratory Steam Therapy",
            ingredients: [
              "1 bucket hot (not boiling) water",
              "10 drops Eucalyptus",
              "8 drops Peppermint",
              "5 drops Rosemary"
            ],
            instructions: "Add oils to hot water in bucket. Hold bucket near horse's nostrils (not forced). Allow horse to inhale steam voluntarily for 10-15 minutes. Excellent for seasonal allergies, congestion."
          }
        },
        hooves: {
          title: "Hoof & Leg Health",
          safeOils: ["Tea Tree", "Oregano", "Thyme", "Myrrh", "Frankincense"],
          topical: [
            { name: "Thrush Treatment", slug: "melaleuca", application: "3-5 drops Tea Tree neat (undiluted) directly into affected frog area", frequency: "Daily until resolved, then 2x weekly prevention" },
            { name: "Hoof Strengthening Oil", slug: "frankincense", application: "10 drops Frankincense + 5 drops Myrrh in 2 oz coconut oil, apply to hoof wall & coronet band", frequency: "3x weekly" }
          ],
          diy: {
            title: "Anti-Fungal Hoof Pack",
            ingredients: [
              "1 cup bentonite clay",
              "Water to make paste",
              "15 drops Tea Tree",
              "10 drops Oregano",
              "10 drops Thyme"
            ],
            instructions: "Mix clay with water to thick paste consistency. Add essential oils. Pack into clean, dry hoof, especially frog area. Wrap hoof. Leave overnight. Rinse in morning. Use 2-3x weekly for thrush, white line disease, or hoof abscesses."
          }
        },
        coat: {
          title: "Coat, Mane & Tail Care",
          safeOils: ["Cedarwood", "Lavender", "Rosemary", "Geranium"],
          spray: {
            title: "Shine & Detangler Spray",
            ingredients: [
              "16 oz distilled water",
              "2 oz apple cider vinegar",
              "1 oz FCO",
              "15 drops Cedarwood",
              "10 drops Lavender",
              "8 drops Rosemary",
              "1 tsp polysorbate 20 (emulsifier)"
            ],
            instructions: "Combine in spray bottle. Shake vigorously before each use. Spray on coat, mane, tail after grooming. Adds shine, detangles, repels insects. Safe for daily use."
          },
          pestControl: {
            title: "Natural Fly & Insect Repellent",
            ingredients: [
              "12 oz water",
              "4 oz apple cider vinegar",
              "20 drops Citronella",
              "15 drops Cedarwood",
              "10 drops Eucalyptus",
              "10 drops Lemongrass",
              "5 drops Peppermint"
            ],
            instructions: "Mix in spray bottle. Apply to coat avoiding eyes, nostrils, genitals. Reapply every 2-3 hours during peak fly season. Can also spray stall walls, doors, around barn."
          }
        },
        wounds: {
          title: "Wound Care & Skin Health",
          safeOils: ["Lavender", "Tea Tree", "Helichrysum", "Frankincense", "Myrrh"],
          topical: [
            { name: "Wound Cleaning Spray", slug: "lavender", application: "8 oz water + 10 drops Lavender + 5 drops Tea Tree, spray on minor cuts/scrapes", frequency: "2-3x daily" },
            { name: "Healing Salve", slug: "correct-x-essential-ointment", application: "Correct-X ointment + 3 drops Helichrysum + 2 drops Frankincense per application", use: "Apply to cleaned wounds 2x daily" }
          ]
        }
      }
    },
    parrots: {
      title: "Avian Wellness",
      description: "⚠️ CRITICAL: Birds have highly sensitive respiratory systems. Essential oils can be FATAL if used incorrectly. Follow these research-based protocols precisely.",
      consultationLink: "https://healthlifestyleservices.com",
      criticalWarning: "NEVER confine birds with diffusers. NEVER apply oils directly to birds. NEVER use tea tree, eucalyptus, peppermint, or hot oils around birds. Research shows even 'safe' oils can cause respiratory distress, feather plucking, and death if improperly used.",
      categories: {
        calming: {
          title: "Calming Environment (EXTREME CAUTION)",
          safeMethod: "Lavender and Roman Chamomile ONLY. Research-backed safe protocol:",
          aromatic: [
            { 
              name: "Lavender Essential Oil", 
              slug: "lavender-oil", 
              dosing: "1 drop maximum in 100mL (3.4oz) water in ultrasonic diffuser",
              duration: "10-15 minutes ONLY, then turn OFF completely",
              placement: "Diffuser in adjacent room, NOT in same room as cage",
              ventilation: "Door must be OPEN, bird must have escape route to fresh air room",
              frequency: "Maximum 1x daily, only during stressful events (vet visits, new environment)",
              monitoring: "Watch for head shaking, excessive drooling, lethargy, breathing changes - STOP immediately if any occur",
              benefits: "Lavender contains linalool and linalyl acetate (40% ester content) which support parasympathetic nervous system activation and calm behavior. Research shows reduced stress markers in birds when used in ultra-diluted aromatic protocols (Animal Aromatherapy, 2020)."
            }
          ],
          toxicWarning: "NEVER use: Tea Tree (causes seizures), Eucalyptus (respiratory distress), Peppermint (breathing suppression), Cinnamon (toxic), Clove (toxic), Oregano (toxic), Thyme (toxic).",
          diy: {
            title: "Safe Calming Cage Area Mist (SPRAY AWAY FROM BIRD, LET DRY COMPLETELY)",
            ingredients: [
              "8 oz distilled water",
              "1 drop Lavender essential oil (0.05% dilution)",
              "Glass spray bottle"
            ],
            instructions: "Mix water and 1 drop Lavender in spray bottle. Remove bird to separate room. Lightly mist cage cover or perches from 12 inches away. Let air dry COMPLETELY (20+ minutes) before returning bird. Use maximum 1x weekly. Monitor bird for any distress signs."
          }
        },
        cleaning: {
          title: "Safe Cage Cleaning (Bird REMOVED from Area)",
          protocol: "ALWAYS remove bird to separate room with closed door before cleaning.",
          cleaners: [
            { 
              name: "Lemon Hydrosol (NOT essential oil)", 
              slug: "lemon",
              dilution: "1 drop Lemon essential oil in 32oz water OR purchase commercial hydrosol",
              application: "Spray on cage bars, perches, food/water dishes",
              drying: "Rinse thoroughly with plain water. Air dry COMPLETELY (60+ minutes) before returning bird.",
              frequency: "Weekly cage cleaning only",
              benefits: "Lemon oil contains d-limonene (60-70% monoterpene content) which has natural antimicrobial properties. Effective against bacteria and mold common in bird environments when properly diluted and rinsed."
            }
          ],
          diy: {
            title: "Bird-Safe Cage Cleaning Spray",
            ingredients: [
              "32 oz distilled water",
              "2 oz white vinegar (natural antimicrobial)",
              "1 drop Lemon essential oil (optional - must rinse thoroughly)"
            ],
            instructions: "Remove bird to separate closed room. Mix ingredients in spray bottle. Spray cage surfaces. Wipe down thoroughly. RINSE ALL SURFACES with plain water. Air dry completely (60+ minutes minimum). Ensure NO residue remains before returning bird."
          }
        }
      },
      note: "⚠️ AVIAN VETERINARY CONSULT MANDATORY before ANY essential oil use. Birds have died from improper aromatherapy. When in doubt, DO NOT USE."
    },
    chickens: {
      title: "Poultry Wellness",
      description: "Research-based essential oil protocols for backyard flock health. Chickens tolerate oils better than most birds but require proper dilution and application.",
      consultationLink: "https://healthlifestyleservices.com",
      safetyNote: "Chickens are more tolerant than pet birds, but still require proper dilution. NEVER use oils on chicks under 4 weeks old. Always provide ventilation and monitor for distress.",
      categories: {
        respiratory: {
          title: "Respiratory Support & Coop Air Quality",
          aromatic: [
            {
              name: "Respiratory Blend (Breathe)",
              slug: "breathe-respiratory-blend",
              method: "Add 5-8 drops to 16oz warm water in spray bottle. Mist coop walls and roost bars (NOT directly on chickens) in morning. Ensure coop has ventilation openings. Use during respiratory challenges or cold/damp weather.",
              frequency: "2-3x weekly during respiratory season (fall/winter)",
              benefits: "Contains eucalyptol and peppermint which support clear airways and respiratory comfort. Research shows antimicrobial properties against common poultry respiratory pathogens (NIH, 2024)."
            },
            {
              name: "Eucalyptus Essential Oil",
              slug: "eucalyptus-oil",
              method: "3-4 drops in small bowl of hot water placed OUTSIDE coop entrance for 20 minutes. Steam wafts in naturally.",
              timing: "Morning only, remove bowl after 20 minutes",
              benefits: "1,8-cineole (oxide) content 70-85% acts as expectorant and decongestant, supporting respiratory comfort during seasonal challenges."
            }
          ],
          diy: {
            title: "Respiratory Steam Protocol for Congested Flock",
            ingredients: [
              "Large bowl of hot (not boiling) water",
              "4 drops Eucalyptus essential oil",
              "2 drops Peppermint essential oil",
              "2 drops Rosemary essential oil"
            ],
            instructions: "Place bowl OUTSIDE coop near entrance/ventilation opening. Let steam naturally enter coop for 15-20 minutes. Remove bowl. Repeat daily during active respiratory issues. Monitor chickens - if any show distress, discontinue immediately."
          }
        },
        water: {
          title: "Immune & Digestive Support in Drinking Water",
          protocol: "Research-based dosing for flock health (Journal of Poultry Science, 2017)",
          waterAdditives: [
            {
              name: "Oregano Essential Oil",
              slug: "oregano-oil",
              dosing: "1-2 drops per GALLON of water (not per quart - extremely concentrated)",
              frequency: "3 days on, 4 days off to prevent resistance",
              duration: "Use during illness outbreaks or preventatively during high-stress periods (extreme weather, predator stress)",
              benefits: "Carvacrol (phenol content 60-80%) provides strong antimicrobial activity. Research shows reduced Salmonella and E. coli in poultry given oregano oil protocols. Supports immune function and gut health.",
              caution: "Do NOT exceed dosing - can irritate GI tract. Provide second plain water source."
            },
            {
              name: "Lemon Essential Oil",
              slug: "lemon",
              dosing: "2-3 drops per gallon water",
              frequency: "Daily, year-round safe",
              benefits: "D-limonene content (65-75% monoterpene) supports liver detoxification and digestive wellness. Gentle immune support. Chickens tolerate citrus oils well.",
              method: "Add to metal or glass waterer only (not plastic - oils degrade plastic)."
            }
          ]
        },
        coop: {
          title: "Coop Cleaning & Parasite Prevention",
          bedding: [
            {
              name: "Cedarwood Bedding Spray",
              slug: "cedarwood",
              recipe: "16oz water + 1oz white vinegar + 10 drops Cedarwood + 8 drops Lemongrass + 5 drops Peppermint in spray bottle",
              application: "Spray on straw/pine shaving bedding BEFORE adding to coop. Let dry 10 minutes. Chickens walk on it once dry.",
              frequency: "Each bedding change (weekly or bi-weekly)",
              benefits: "Cedarwood (cedrol 15-30% sesquiterpene content) repels mites, lice, and flies. Lemongrass (citral 70-85%) is natural insect deterrent. Research shows 40-60% reduction in external parasites with cedar bedding treatments.",
              note: "Chickens do NOT use wood shavings like hamsters - they scratch and peck in bedding. This spray treats the bedding material itself (straw or pine shavings you provide)."
            }
          ],
          cleaning: [
            {
              name: "Natural Coop Disinfectant Spray",
              slug: "on-guard-cleaner-concentrate",
              recipe: "1 gallon warm water + 2 tablespoons Protective Blend Cleaner Concentrate + 10 drops Lemon",
              application: "Remove chickens. Spray all surfaces (roost bars, nesting boxes, walls, floor). Scrub. Rinse with plain water. Air dry completely (2+ hours) before returning flock.",
              frequency: "Deep clean monthly",
              benefits: "Protective Blend contains clove, cinnamon, eucalyptus, rosemary - all shown to have antimicrobial activity against common poultry pathogens (Salmonella, E. coli, Campylobacter)."
            }
          ],
          diy: {
            title: "Dust Bath Additive for External Parasite Control",
            ingredients: [
              "5 lbs food-grade diatomaceous earth (mechanical pest control)",
              "2 cups wood ash or bentonite clay",
              "15 drops Cedarwood essential oil",
              "10 drops Lemongrass essential oil",
              "5 drops Lavender essential oil"
            ],
            instructions: "Mix dry ingredients thoroughly. Add essential oils, mix again until evenly distributed. Place in shallow container or designated dust bath area. Chickens will naturally bathe in this mixture, coating feathers. Refresh monthly. Helps prevent mites and lice naturally."
          }
        }
      },
      note: "Research: NIH studies confirm oregano and thyme oils effective in poultry production when properly dosed. Always provide untreated water option alongside treated water."
    }
  };

  const FoundationsContent = ({ isFeminine = false, isAgeless = false, agelessType = null }) => (
    <div style={{marginTop:16,padding:16,borderRadius:12,background:"rgba(218,165,112,0.08)",border:"1px solid rgba(218,165,112,0.12)"}}>
      <h4 style={{fontSize:16,color:"var(--rosegold)",fontWeight:700,marginBottom:12}}>Foundational Resources</h4>

      {!isAgeless && (
        <div style={{marginBottom:20}}>
          <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:600,marginBottom:6}}>{foundationalResources.nutrition.title}</h5>
          <p style={{fontSize:13,color:"rgba(245,222,179,0.9)",marginBottom:8,lineHeight:1.6}}>{foundationalResources.nutrition.description}</p>
          <button
            onClick={() => openLink(foundationalResources.nutrition.link)}
            style={{background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:"0",padding:"6px 12px",borderRadius:8,color:"#1b0b06",fontWeight:600,cursor:"pointer",fontSize:12}}
          >
            {foundationalResources.nutrition.linkText}
          </button>
        </div>
      )}

      {!isAgeless && (
        <div style={{marginBottom:20}}>
          <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:600,marginBottom:6}}>{foundationalResources.hydration.title}</h5>
          <p style={{fontSize:13,color:"rgba(245,222,179,0.9)",marginBottom:8,lineHeight:1.6}}><strong>Guideline:</strong> {foundationalResources.hydration.guideline}</p>
          <p style={{fontSize:13,color:"var(--rosegold)",marginBottom:8}}>Therapeutic Waters Protocol (3 times daily):</p>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {foundationalResources.hydration.protocol.map((item, i) => (
              <div key={i} style={{padding:8,borderRadius:8,background:"rgba(245,222,179,0.05)"}}>
                <div style={{fontSize:12,color:"var(--rosegold)",fontWeight:600,marginBottom:4}}>{item.time}</div>
                <div style={{fontSize:12,color:"rgba(245,222,179,0.9)",marginBottom:6}}>{item.instruction}</div>
                <button
                  onClick={() => openLink(item.link)}
                  style={{background:"transparent",border:"1px solid rgba(245,222,179,0.2)",padding:"4px 10px",borderRadius:6,color:"var(--champagne)",cursor:"pointer",fontSize:11}}
                >
                  {item.linkText} →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isAgeless && (
        <div style={{marginBottom:20}}>
          <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:600,marginBottom:6}}>{foundationalResources.sleep.title}</h5>
          <p style={{fontSize:13,color:"rgba(245,222,179,0.9)",marginBottom:8,lineHeight:1.6}}>{foundationalResources.sleep.description}</p>
          <button
            onClick={() => openLink(foundationalResources.sleep.link)}
            style={{background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:"0",padding:"6px 12px",borderRadius:8,color:"#1b0b06",fontWeight:600,cursor:"pointer",fontSize:12}}
          >
            {foundationalResources.sleep.linkText}
          </button>
        </div>
      )}

      {!isAgeless && (
        <div style={{marginBottom:20}}>
          <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:600,marginBottom:8}}>{foundationalResources.weightAndActivity.title}</h5>
          <p style={{fontSize:13,color:"rgba(245,222,179,0.9)",marginBottom:12,lineHeight:1.6}}>{foundationalResources.weightAndActivity.description}</p>
          
          <div style={{marginBottom:16,padding:12,borderRadius:8,background:"rgba(230,183,165,0.08)",border:"1px solid rgba(230,183,165,0.12)"}}>
            <p style={{fontSize:13,color:"var(--rosegold)",fontWeight:600,marginBottom:8}}>
              {isFeminine ? foundationalResources.weightAndActivity.women.title : foundationalResources.weightAndActivity.men.title}
            </p>
            {(isFeminine ? foundationalResources.weightAndActivity.women.ageGroups : foundationalResources.weightAndActivity.men.ageGroups).map((group, i) => (
              <div key={i} style={{marginBottom:12,padding:10,borderRadius:6,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
                <p style={{fontSize:12,color:"var(--rosegold)",fontWeight:600,marginBottom:6}}>{group.range}</p>
                <p style={{fontSize:11,color:"rgba(245,222,179,0.9)",marginBottom:3}}><strong>Activity:</strong> {group.activity}</p>
                <p style={{fontSize:11,color:"rgba(245,222,179,0.9)",marginBottom:3}}><strong>Strength:</strong> {group.strength}</p>
                <p style={{fontSize:11,color:"rgba(245,222,179,0.9)",marginBottom:3}}><strong>Flexibility:</strong> {group.flexibility}</p>
                <p style={{fontSize:11,color:"rgba(245,222,179,0.9)",marginBottom:3}}><strong>Recovery:</strong> {group.recovery}</p>
                {group.cycleNote && <p style={{fontSize:10,color:"var(--rosegold)",marginTop:4,fontStyle:"italic"}}>{group.cycleNote}</p>}
                {group.menopauseNote && <p style={{fontSize:10,color:"var(--rosegold)",marginTop:4,fontStyle:"italic"}}>{group.menopauseNote}</p>}
              </div>
            ))}
            <p style={{fontSize:11,color:"var(--rosegold)",marginTop:8,fontWeight:600}}>
              Weight Guidelines: {isFeminine ? foundationalResources.weightAndActivity.women.weightGuidelines : foundationalResources.weightAndActivity.men.weightGuidelines}
            </p>
          </div>

          <div style={{padding:10,borderRadius:8,background:"rgba(218,165,112,0.08)",border:"1px solid rgba(218,165,112,0.12)"}}>
            <p style={{fontSize:12,color:"var(--rosegold)",fontWeight:600,marginBottom:6}}>Universal Principles:</p>
            {foundationalResources.weightAndActivity.universalPrinciples.map((principle, i) => (
              <p key={i} style={{fontSize:11,color:"rgba(245,222,179,0.9)",marginBottom:3,lineHeight:1.5}}>• {principle}</p>
            ))}
          </div>
        </div>
      )}

      {!isAgeless && (
        <div style={{marginBottom:20}}>
          <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:600,marginBottom:8}}>{foundationalResources.foodServings.title}</h5>
          <div style={{display:"grid",gap:8}}>
            {foundationalResources.foodServings.categories.map((cat, i) => (
              <div key={i} style={{padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
                <div style={{fontSize:12,color:"var(--rosegold)",fontWeight:600,marginBottom:2}}>{cat.name}</div>
                <div style={{fontSize:11,color:"rgba(245,222,179,0.85)"}}>Serving: {cat.serving}</div>
                <div style={{fontSize:11,color:"var(--rosegold)"}}>Daily: {cat.daily}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isAgeless && agelessType && (
        <div style={{marginBottom:20}}>
          <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:600,marginBottom:8}}>
            {agelessType === 'children' ? foundationalResources.portionSizesChildren.title : foundationalResources.portionSizesMature.title}
          </h5>
          <div style={{display:"grid",gap:8}}>
            {(agelessType === 'children' ? foundationalResources.portionSizesChildren.portions : foundationalResources.portionSizesMature.portions).map((portion, i) => (
              <div key={i} style={{padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
                <div style={{fontSize:12,color:"var(--rosegold)",fontWeight:600,marginBottom:2}}>{portion.category}</div>
                <div style={{fontSize:11,color:"rgba(245,222,179,0.85)",lineHeight:1.5}}>{portion.serving}</div>
              </div>
            ))}
          </div>
          <div style={{marginTop:12,padding:8,borderRadius:6,background:"rgba(230,183,165,0.08)",border:"1px solid rgba(230,183,165,0.12)"}}>
            <p style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.6,fontStyle:"italic"}}>
              {agelessType === 'children' ? foundationalResources.portionSizesChildren.snackTip : foundationalResources.portionSizesMature.snackTip}
            </p>
          </div>
        </div>
      )}

      {!isAgeless && (
        <div>
          <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:600,marginBottom:8}}>
            {isFeminine ? foundationalResources.fastingWomen.title : foundationalResources.fastingMen.title}
          </h5>
          <div style={{display:"grid",gap:8}}>
            {(isFeminine ? foundationalResources.fastingWomen.guidelines : foundationalResources.fastingMen.guidelines).map((item, i) => (
              <div key={i} style={{padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
                <div style={{fontSize:12,color:"var(--rosegold)",fontWeight:600,marginBottom:2}}>{item.ageRange}</div>
                <div style={{fontSize:11,color:"rgba(245,222,179,0.85)",lineHeight:1.5}}>{item.method}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const MasculinePillarContent = ({ pillarKey }) => {
    const pillar = masculinePillars[pillarKey];
    if (!pillar) return null;

    return (
      <div style={{marginTop:20}}>
        {/* Tiers Section */}
        {pillar.tiers.map((tier, idx) => (
          <div key={idx} style={{marginBottom:20,padding:16,borderRadius:12,background:"rgba(218,165,112,0.06)",border:"1px solid rgba(218,165,112,0.12)"}}>
            <h5 style={{fontSize:15,color:"var(--champagne)",fontWeight:700,marginBottom:8}}>{tier.name}</h5>
            {tier.description && <p style={{fontSize:12,color:"rgba(245,222,179,0.9)",marginBottom:8,lineHeight:1.6}}>{tier.description}</p>}
            {tier.outcomes && (
              <div style={{padding:10,borderRadius:8,background:"rgba(245,222,179,0.06)",border:"1px solid rgba(245,222,179,0.10)",marginBottom:12}}>
                <p style={{fontSize:11,color:"var(--rosegold)",fontWeight:600,marginBottom:4}}>Expected Outcomes:</p>
                <p style={{fontSize:11,color:"var(--champagne)",lineHeight:1.6}}>{tier.outcomes}</p>
              </div>
            )}

            {tier.products && (
              <div style={{display:"grid",gap:8}}>
                {tier.products.map((product, i) => (
                  <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)"}}>
                    <span style={{fontSize:12,color:"var(--champagne)"}}>{product.name}</span>
                    <button
                      onClick={() => openLink(`${doterraBaseUrl}${product.slug}`)}
                      style={{background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:"0",padding:"4px 10px",borderRadius:6,color:"#1b0b06",fontWeight:600,cursor:"pointer",fontSize:11}}
                    >
                      Shop →
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* DIY Recipes Section - Separate Box */}
        {pillar.diy && (
          <div style={{marginTop:32,padding:24,borderRadius:16,background:"linear-gradient(135deg, rgba(230,183,165,0.15), rgba(218,165,112,0.10))",border:"2px solid rgba(218,165,112,0.25)",boxShadow:"0 8px 24px rgba(0,0,0,0.4)"}}>
            <h4 style={{fontSize:18,color:"var(--champagne)",fontWeight:700,marginBottom:16,textAlign:"center"}}>✦ {pillar.diy.title} ✦</h4>
            <div style={{display:"grid",gap:20}}>
              {pillar.diy.recipes.map((recipe, idx) => (
                <div key={idx} style={{padding:16,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.12)"}}>
                  <h5 style={{fontSize:14,color:"var(--rosegold)",fontWeight:700,marginBottom:12}}>{recipe.name}</h5>
                  
                  <div style={{marginBottom:12}}>
                    <p style={{fontSize:11,color:"var(--rosegold)",fontWeight:600,marginBottom:8}}>Ingredients:</p>
                    <div style={{display:"grid",gap:6}}>
                      {recipe.ingredients.map((ing, i) => (
                        <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:6,borderRadius:6,background:"rgba(245,222,179,0.04)"}}>
                          <span style={{fontSize:11,color:"var(--champagne)"}}>{ing.name}</span>
                          <button
                            onClick={() => openLink(`${doterraBaseUrl}${ing.slug}`)}
                            style={{background:"transparent",border:"1px solid rgba(245,222,179,0.3)",padding:"3px 8px",borderRadius:4,color:"var(--champagne)",cursor:"pointer",fontSize:10}}
                          >
                            Shop →
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{padding:12,borderRadius:8,background:"rgba(230,183,165,0.10)",border:"1px solid rgba(230,183,165,0.15)"}}>
                    <p style={{fontSize:11,color:"var(--champagne)",lineHeight:1.7,fontStyle:"italic"}}>
                      <strong>Instructions:</strong> {recipe.instructions}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const FemininePillarContent = ({ pillarKey }) => {
    const pillar = femininePillars[pillarKey];
    if (!pillar) return null;

    return (
      <div style={{marginTop:20}}>
        {/* Tiers Section */}
        {pillar.tiers.map((tier, idx) => (
          <div key={idx} style={{marginBottom:20,padding:16,borderRadius:12,background:"rgba(218,165,112,0.06)",border:"1px solid rgba(218,165,112,0.12)"}}>
            <h5 style={{fontSize:15,color:"var(--champagne)",fontWeight:700,marginBottom:8}}>{tier.name}</h5>
            {tier.description && <p style={{fontSize:12,color:"rgba(245,222,179,0.9)",marginBottom:8,lineHeight:1.6}}>{tier.description}</p>}
            {tier.outcomes && (
              <div style={{padding:10,borderRadius:8,background:"rgba(245,222,179,0.06)",border:"1px solid rgba(245,222,179,0.10)",marginBottom:12}}>
                <p style={{fontSize:11,color:"var(--rosegold)",fontWeight:600,marginBottom:4}}>Expected Outcomes:</p>
                <p style={{fontSize:11,color:"var(--champagne)",lineHeight:1.6}}>{tier.outcomes}</p>
              </div>
            )}

            {tier.products && (
              <div style={{display:"grid",gap:8}}>
                {tier.products.map((product, i) => (
                  <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)"}}>
                    <span style={{fontSize:12,color:"var(--champagne)"}}>{product.name}</span>
                    <button
                      onClick={() => openLink(`${doterraBaseUrl}${product.slug}`)}
                      style={{background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:"0",padding:"4px 10px",borderRadius:6,color:"#1b0b06",fontWeight:600,cursor:"pointer",fontSize:11}}
                    >
                      Shop →
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Life Cycle Guide */}
        {pillar.lifeCycleGuide && (
          <div style={{marginTop:24,padding:20,borderRadius:12,background:"rgba(230,183,165,0.08)",border:"1px solid rgba(230,183,165,0.15)"}}>
            <h4 style={{fontSize:17,color:"var(--champagne)",fontWeight:700,marginBottom:8}}>{pillar.lifeCycleGuide.title}</h4>
            <p style={{fontSize:13,color:"rgba(245,222,179,0.9)",marginBottom:16,lineHeight:1.6}}>{pillar.lifeCycleGuide.description}</p>
            
            {pillar.lifeCycleGuide.phases.map((phase, i) => (
              <div key={i} style={{marginBottom:16,padding:14,borderRadius:10,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
                <h5 style={{fontSize:14,color:"var(--rosegold)",fontWeight:700,marginBottom:6}}>{phase.name}</h5>
                <p style={{fontSize:12,color:"rgba(245,222,179,0.85)",marginBottom:8}}><strong>Focus:</strong> {phase.focus}</p>
                <div style={{marginBottom:8}}>
                  <p style={{fontSize:11,color:"var(--rosegold)",fontWeight:600,marginBottom:4}}>Internal:</p>
                  <p style={{fontSize:11,color:"rgba(245,222,179,0.9)",lineHeight:1.5}}>{phase.internal}</p>
                </div>
                <div>
                  <p style={{fontSize:11,color:"var(--rosegold)",fontWeight:600,marginBottom:4}}>Topical/Aromatic:</p>
                  <p style={{fontSize:11,color:"rgba(245,222,179,0.9)",lineHeight:1.5}}>{phase.topical}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* DIY Recipes Section - Separate Box */}
        {pillar.diy && (
          <div style={{marginTop:32,padding:24,borderRadius:16,background:"linear-gradient(135deg, rgba(230,183,165,0.15), rgba(218,165,112,0.10))",border:"2px solid rgba(218,165,112,0.25)",boxShadow:"0 8px 24px rgba(0,0,0,0.4)"}}>
            <h4 style={{fontSize:18,color:"var(--champagne)",fontWeight:700,marginBottom:16,textAlign:"center"}}>✦ {pillar.diy.title} ✦</h4>
            <div style={{display:"grid",gap:20}}>
              {pillar.diy.recipes.map((recipe, idx) => (
                <div key={idx} style={{padding:16,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.12)"}}>
                  <h5 style={{fontSize:14,color:"var(--rosegold)",fontWeight:700,marginBottom:12}}>{recipe.name}</h5>
                  
                  <div style={{marginBottom:12}}>
                    <p style={{fontSize:11,color:"var(--rosegold)",fontWeight:600,marginBottom:8}}>Ingredients:</p>
                    <div style={{display:"grid",gap:6}}>
                      {recipe.ingredients.map((ing, i) => (
                        <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:6,borderRadius:6,background:"rgba(245,222,179,0.04)"}}>
                          <span style={{fontSize:11,color:"var(--champagne)"}}>{ing.name}</span>
                          <button
                            onClick={() => openLink(`${doterraBaseUrl}${ing.slug}`)}
                            style={{background:"transparent",border:"1px solid rgba(245,222,179,0.3)",padding:"3px 8px",borderRadius:4,color:"var(--champagne)",cursor:"pointer",fontSize:10}}
                          >
                            Shop →
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{padding:12,borderRadius:8,background:"rgba(230,183,165,0.10)",border:"1px solid rgba(230,183,165,0.15)"}}>
                    <p style={{fontSize:11,color:"var(--champagne)",lineHeight:1.7,fontStyle:"italic"}}>
                      <strong>Instructions:</strong> {recipe.instructions}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
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
.wellness-intake-top{position:absolute;top:250px;left:50%;transform:translateX(-50%);width:300px;height:72px;border-radius:18px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:18px;font-weight:600;letter-spacing:.5px;z-index:15;color:var(--champagne);font-family:'Cinzel Decorative','Playfair Display',serif;background:linear-gradient(180deg, rgba(65,30,22,0.65), rgba(35,15,10,0.5));backdrop-filter:blur(18px) saturate(120%);border:1px solid rgba(245,222,179,.25);box-shadow:0 12px 36px rgba(0,0,0,.55),0 0 46px rgba(245,222,179,.22),inset 0 -6px 12px rgba(0,0,0,.35);animation:intakeBreath 6s ease-in-out infinite,intakeFloat 10s ease-in-out infinite;text-shadow:0 0 12px rgba(230,183,165,.45)}
@keyframes intakeBreath{0%,100%{transform:translateX(-50%) scale(1)}50%{transform:translateX(-50%) scale(1.04)}}
@keyframes intakeFloat{0%,100%{top:250px}50%{top:244px}}
.service-button{width:220px;height:84px;border-radius:16px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .35s ease;background:linear-gradient(180deg, rgba(60,26,20,0.6), rgba(40,16,12,0.45));backdrop-filter:blur(14px) saturate(115%);border:1px solid rgba(245,222,179,.20);color:var(--champagne);font-family:'Cinzel Decorative','Playfair Display',serif;font-weight:600;text-shadow:0 0 10px rgba(245,222,179,.32);box-shadow:0 10px 30px rgba(0,0,0,.48),0 0 44px rgba(218,165,112,.14),inset 0 -6px 12px rgba(0,0,0,.35)}
.service-button:hover{transform:translateY(-6px) scale(1.02);border-color:rgba(245,222,179,.38);box-shadow:0 18px 44px rgba(0,0,0,.55),0 0 56px rgba(218,165,112,.28),inset 0 -6px 16px rgba(0,0,0,.40)}
.dropdown-backdrop{position:fixed;inset:0;background:linear-gradient(180deg,rgba(6,3,2,0.45),rgba(0,0,0,0.72));backdrop-filter:blur(6px);z-index:999}
.dropdown-shell{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);width:min(920px,94vw);max-height:86vh;overflow:auto;z-index:1000;padding:14px;border-radius:14px}
.panel{border-radius:16px;background:linear-gradient(180deg, rgba(48,20,14,0.95), rgba(30,12,8,0.90));border:1px solid rgba(245,222,179,.12);box-shadow:0 20px 60px rgba(0,0,0,.7);backdrop-filter:blur(10px)}
.panel-inner{display:flex;gap:18px;padding:26px}
.panel-left{width:36%;min-width:240px;padding:12px 18px;border-right:1px solid rgba(245,222,179,.04)}
.panel-right{flex:1;padding:10px 18px}
.layer{margin-top:12px;border-radius:12px;padding:14px;background:linear-gradient(180deg, rgba(54,18,14,0.55), rgba(32,12,9,0.45));border:1px solid rgba(218,165,112,.06);box-shadow:0 10px 30px rgba(0,0,0,.55)}
.close-x{position:absolute;right:18px;top:14px;background:transparent;border:0;color:var(--champagne);font-size:20px;cursor:pointer;z-index:1}
.category-selector{display:flex;gap:12px;margin-bottom:20px}
.category-btn{flex:1;padding:16px;border-radius:12px;background:linear-gradient(180deg, rgba(54,18,14,0.55), rgba(32,12,9,0.45));border:1px solid rgba(218,165,112,.06);color:var(--champagne);cursor:pointer;transition:all 0.3s ease;font-size:16px;font-weight:600}
.category-btn:hover{border-color:rgba(218,165,112,.25);transform:translateY(-2px)}
.category-btn.active{background:linear-gradient(90deg,var(--bronze),var(--rosegold));color:#1b0b06;border-color:transparent}
.lotus-ai-container{position:fixed;bottom:30px;right:30px;z-index:1000}
.lotus-ai{width:70px;height:70px;background:linear-gradient(135deg,rgba(160,82,45,.95),rgba(139,69,19,.9));backdrop-filter:blur(20px);border:2px solid rgba(230,183,165,.70);border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 12px 30px rgba(0,0,0,.6),0 0 40px rgba(230,183,165,.50),0 0 80px rgba(245,222,179,.35),inset 0 2px 0 rgba(255,255,255,.2),inset 0 -2px 8px rgba(0,0,0,.3);animation:lotusBreath 5s ease-in-out infinite;cursor:pointer}
@keyframes lotusBreath{0%,100%{transform:scale(1);box-shadow:0 12px 30px rgba(0,0,0,.6),0 0 40px rgba(230,183,165,.50),0 0 80px rgba(245,222,179,.35)}50%{transform:scale(1.08);box-shadow:0 16px 40px rgba(0,0,0,.7),0 0 60px rgba(230,183,165,.65),0 0 120px rgba(245,222,179,.50)}}
.lotus-symbol{font-size:30px;color:var(--champagne);text-shadow:0 0 15px rgba(230,183,165,.65),0 0 30px rgba(230,183,165,.45)}
.gold-dust{position:fixed;width:2px;height:2px;background:radial-gradient(circle,rgba(255,215,0,0.8) 0%,rgba(255,215,0,0.2) 70%);border-radius:50%;pointer-events:none;animation:dustFloat 25s linear infinite;z-index:1}
@keyframes dustFloat{0%{transform:translateY(0) translateX(0) rotate(0deg) scale(2.5);opacity:1}10%{transform:translateY(-10vh) translateX(5vw) rotate(36deg) scale(2);opacity:1}20%{transform:translateY(-20vh) translateX(10vw) rotate(72deg) scale(1.5);opacity:1}50%{transform:translateY(-50vh) translateX(25vw) rotate(180deg) scale(1);opacity:0.8}90%{opacity:0.5}100%{transform:translateY(-100vh) translateX(50vw) rotate(360deg) scale(0.5);opacity:0}}
.inner-sacred-geometry{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:150px;height:150px;opacity:.12;z-index:2;pointer-events:none;animation:innerSpin 45s linear infinite reverse}
@keyframes innerSpin{0%{transform:translate(-50%,-50%) rotate(0)}100%{transform:translate(-50%,-50%) rotate(360deg)}}
@media (max-width:880px){.service-grid{grid-template-columns:repeat(2,1fr);max-width:520px}.dropdown-shell{width:92vw}.panel-left{display:none}.panel-inner{padding:16px}}
      `}</style>

      <div className="flower-of-life-bg" aria-hidden="true">
        <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" stroke="#CD7F32" strokeWidth="1.5">
            <circle cx="200" cy="200" r="60" opacity="0.8" />
            <circle cx="200" cy="140" r="60" opacity="0.8" />
            <circle cx="252" cy="170" r="60" opacity="0.8" />
            <circle cx="252" cy="230" r="60" opacity="0.8" />
            <circle cx="200" cy="260" r="60" opacity="0.8" />
            <circle cx="148" cy="230" r="60" opacity="0.8" />
            <circle cx="148" cy="170" r="60" opacity="0.8" />
            <circle cx="200" cy="80" r="60" opacity="0.6" />
            <circle cx="252" cy="110" r="60" opacity="0.6" />
            <circle cx="304" cy="140" r="60" opacity="0.6" />
            <circle cx="304" cy="200" r="60" opacity="0.6" />
            <circle cx="304" cy="260" r="60" opacity="0.6" />
            <circle cx="252" cy="290" r="60" opacity="0.6" />
            <circle cx="200" cy="320" r="60" opacity="0.6" />
            <circle cx="148" cy="290" r="60" opacity="0.6" />
            <circle cx="96" cy="260" r="60" opacity="0.6" />
            <circle cx="96" cy="200" r="60" opacity="0.6" />
            <circle cx="96" cy="140" r="60" opacity="0.6" />
            <circle cx="148" cy="110" r="60" opacity="0.6" />
          </g>
        </svg>
      </div>

      <div className="inner-sacred-geometry" aria-hidden="true">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" stroke="#DAA57F" strokeWidth="1" opacity="0.4">
            <circle cx="100" cy="100" r="15" />
            <circle cx="100" cy="70" r="15" />
            <circle cx="100" cy="130" r="15" />
            <circle cx="70" cy="100" r="15" />
            <circle cx="130" cy="100" r="15" />
          </g>
        </svg>
      </div>

      <div className="header">
        <div className="logo">iTerra<span className="tm">™</span></div>
        <div className="tagline">Wellness Concierge</div>
      </div>

      <button className="wellness-intake-top" onClick={() => navigateTo("WellnessIntake")}>
        Wellness Intake
      </button>

      <div className="service-container">
        <div className="service-grid">
          <button ref={triggerRef} className="service-button" onClick={() => { setShowDropdown(true); setSelectedMasculinePillar(null); }}>
            Masculine Vitality
          </button>
          <button className="service-button" onClick={() => { setShowFeminineDropdown(true); setSelectedFemininePillar(null); }}>Feminine Energy</button>
          <button className="service-button" onClick={() => { setShowPetDropdown(true); setSelectedPetType(null); }}>Pet Harmony</button>
          <button className="service-button" onClick={() => navigateTo("HomeEssentials")}>Home Essentials</button>
          <button className="service-button" onClick={() => { setShowAgelessDropdown(true); setSelectedAgelessCategory(null); }}>Ageless Vitality</button>
          <button className="service-button" onClick={() => navigateTo("LeadershipWisdom")}>Leadership & Wisdom</button>
        </div>
      </div>

      <div className="lotus-ai-container">
        <div className="lotus-ai" onClick={() => setShowLotusAI(true)} style={{cursor:"pointer"}}>
          <div className="lotus-symbol">🪷</div>
        </div>
      </div>

      {/* Lotus AI */}
      {showLotusAI && <LotusAI onClose={() => setShowLotusAI(false)} />}

      {/* Associate Login Modal */}
      {showAssociateLogin && (
        <AssociateLogin 
          onClose={() => setShowAssociateLogin(false)}
          onSuccess={() => navigateTo("BackOffice")}
        />
      )}

      {/* Masculine Vitality Dropdown */}
      {showDropdown && (
        <>
          <div className="dropdown-backdrop" onClick={() => setShowDropdown(false)} />
          <div ref={dropdownRef} className="dropdown-shell">
            <div className="panel">
              <button className="close-x" onClick={() => setShowDropdown(false)}>✕</button>
              <div style={{padding:26}}>
                <div style={{fontSize:14,color:'var(--rosegold)',letterSpacing:'.6px',marginBottom:6}}>Masculine Vitality</div>
                <div style={{fontSize:22,color:'var(--champagne)',fontWeight:700,letterSpacing:'.4px',marginBottom:8,lineHeight:1.4}}>For the man who endures, protects, and evolves — energy forged in ritual, legacy anchored in balance.</div>
                <div style={{color:'rgba(245,222,179,.9)',lineHeight:1.6,fontSize:14,marginBottom:12}}>A four-part system designed for the modern masculine body: strong in structure, stable in mind, potent in longevity.</div>
                <div style={{color:'rgba(245,222,179,.9)',lineHeight:1.6,fontSize:13,marginBottom:20}}>Each path begins with The Foundation — the daily rhythm of hydration, nutrient precision, and circadian balance.</div>

                <div className="category-selector" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:12}}>
                  <button
                    className={`category-btn ${selectedMasculinePillar === 'foundations' ? 'active' : ''}`}
                    onClick={() => setSelectedMasculinePillar('foundations')}
                  >
                    Foundations
                  </button>
                  <button
                    className={`category-btn ${selectedMasculinePillar === 'warrior' ? 'active' : ''}`}
                    onClick={() => setSelectedMasculinePillar('warrior')}
                  >
                    {masculinePillars.warrior.title}
                  </button>
                  <button
                    className={`category-btn ${selectedMasculinePillar === 'agileBody' ? 'active' : ''}`}
                    onClick={() => setSelectedMasculinePillar('agileBody')}
                  >
                    {masculinePillars.agileBody.title}
                  </button>
                  <button
                    className={`category-btn ${selectedMasculinePillar === 'presence' ? 'active' : ''}`}
                    onClick={() => setSelectedMasculinePillar('presence')}
                  >
                    {masculinePillars.presence.title}
                  </button>
                  <button
                    className={`category-btn ${selectedMasculinePillar === 'legacy' ? 'active' : ''}`}
                    onClick={() => setSelectedMasculinePillar('legacy')}
                  >
                    {masculinePillars.legacy.title}
                  </button>
                </div>

                {selectedMasculinePillar && selectedMasculinePillar !== 'foundations' && (
                  <div style={{padding:20,borderRadius:12,background:"linear-gradient(180deg, rgba(218,165,112,0.06), rgba(245,222,179,0.03))",boxShadow:"0 8px 30px rgba(0,0,0,0.5)",border:"1px solid rgba(218,165,112,0.06)"}}>
                    <h3 style={{fontSize:20,color:"var(--champagne)",fontWeight:700,marginBottom:4}}>
                      {masculinePillars[selectedMasculinePillar].title}
                    </h3>
                    <p style={{color:"var(--rosegold)",marginBottom:8,fontSize:14}}>
                      {masculinePillars[selectedMasculinePillar].subtitle}
                    </p>
                    
                    <div style={{padding:16,borderRadius:10,background:"rgba(230,183,165,0.12)",border:"1px solid rgba(230,183,165,0.20)",marginBottom:20}}>
                      <p style={{fontSize:13,color:"var(--champagne)",fontWeight:700,marginBottom:8,lineHeight:1.7}}>
                        {masculinePillars[selectedMasculinePillar].philosophy}
                      </p>
                      <p style={{fontSize:12,color:"var(--rosegold)",marginBottom:10,lineHeight:1.6}}>
                        <strong>Who This Is For:</strong> {masculinePillars[selectedMasculinePillar].whoThisIsFor}
                      </p>
                      <p style={{fontSize:12,color:"var(--rosegold)",marginBottom:10,lineHeight:1.6}}>
                        <strong>What You Get:</strong> {masculinePillars[selectedMasculinePillar].whatYouGet}
                      </p>

                    </div>

                    <MasculinePillarContent pillarKey={selectedMasculinePillar} />

                    <div style={{marginTop:32,padding:20,borderRadius:12,background:"linear-gradient(135deg, rgba(230,183,165,0.15), rgba(218,165,112,0.10))",border:"1px solid rgba(230,183,165,0.25)",textAlign:"center"}}>
                      <p style={{fontSize:14,color:"var(--champagne)",lineHeight:1.7,marginBottom:12}}>
                        For customized lab panels, advanced practitioner care for nutritional and wellness optimization, and personalized protocol design
                      </p>
                      <button
                        onClick={() => openLink("https://healthlifestyleservices.com")}
                        style={{background:"linear-gradient(90deg,var(--rosegold),var(--bronze))",border:0,padding:"12px 24px",borderRadius:10,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:13}}
                      >
                        Schedule Consultation →
                      </button>
                    </div>
                  </div>
                )}

                {selectedMasculinePillar === 'foundations' && <FoundationsContent isFeminine={false} isAgeless={false} />}

                {!selectedMasculinePillar && (
                  <div style={{textAlign:"center",padding:40,color:"var(--rosegold)"}}>
                    Select a pillar to explore wellness programs and products
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Feminine Energy Dropdown */}
      {showFeminineDropdown && (
        <>
          <div className="dropdown-backdrop" onClick={() => setShowFeminineDropdown(false)} />
          <div ref={feminineDropdownRef} className="dropdown-shell">
            <div className="panel">
              <button className="close-x" onClick={() => setShowFeminineDropdown(false)}>✕</button>
              <div style={{padding:26}}>
                <div style={{fontSize:14,color:'var(--rosegold)',letterSpacing:'.6px',marginBottom:6}}>Feminine Energy</div>
                <div style={{fontSize:22,color:'var(--champagne)',fontWeight:700,letterSpacing:'.4px',marginBottom:8,lineHeight:1.4}}>For the woman who nurtures, inspires, and illuminates — balance rooted in wisdom, radiance born of self-care.</div>
                <div style={{color:'rgba(245,222,179,.9)',lineHeight:1.6,fontSize:14,marginBottom:12}}>A four-part system designed for the feminine journey: graceful in transition, powerful in mind, brilliant in spirit.</div>
                <div style={{color:'rgba(245,222,179,.9)',lineHeight:1.6,fontSize:13,marginBottom:20}}>Each path begins with The Foundation — the daily rhythm of hormonal harmony, cellular precision, and emotional fortitude.</div>

                <div className="category-selector" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:12}}>
                  <button
                    className={`category-btn ${selectedFemininePillar === 'foundations' ? 'active' : ''}`}
                    onClick={() => setSelectedFemininePillar('foundations')}
                  >
                    Foundations
                  </button>
                  <button
                    className={`category-btn ${selectedFemininePillar === 'sovereign' ? 'active' : ''}`}
                    onClick={() => setSelectedFemininePillar('sovereign')}
                  >
                    {femininePillars.sovereign.title}
                  </button>
                  <button
                    className={`category-btn ${selectedFemininePillar === 'flowingForm' ? 'active' : ''}`}
                    onClick={() => setSelectedFemininePillar('flowingForm')}
                  >
                    {femininePillars.flowingForm.title}
                  </button>
                  <button
                    className={`category-btn ${selectedFemininePillar === 'radiance' ? 'active' : ''}`}
                    onClick={() => setSelectedFemininePillar('radiance')}
                  >
                    {femininePillars.radiance.title}
                  </button>
                  <button
                    className={`category-btn ${selectedFemininePillar === 'eternal' ? 'active' : ''}`}
                    onClick={() => setSelectedFemininePillar('eternal')}
                  >
                    {femininePillars.eternal.title}
                  </button>
                </div>

                {selectedFemininePillar && selectedFemininePillar !== 'foundations' && (
                  <div style={{padding:20,borderRadius:12,background:"linear-gradient(180deg, rgba(218,165,112,0.06), rgba(245,222,179,0.03))",boxShadow:"0 8px 30px rgba(0,0,0,0.5)",border:"1px solid rgba(218,165,112,0.06)"}}>
                    <h3 style={{fontSize:20,color:"var(--champagne)",fontWeight:700,marginBottom:4}}>
                      {femininePillars[selectedFemininePillar].title}
                    </h3>
                    <p style={{color:"var(--rosegold)",marginBottom:8,fontSize:14}}>
                      {femininePillars[selectedFemininePillar].subtitle}
                    </p>

                    <div style={{padding:16,borderRadius:10,background:"rgba(230,183,165,0.12)",border:"1px solid rgba(230,183,165,0.20)",marginBottom:20}}>
                      <p style={{fontSize:13,color:"var(--champagne)",fontWeight:700,marginBottom:8,lineHeight:1.7}}>
                        {femininePillars[selectedFemininePillar].philosophy}
                      </p>
                      <p style={{fontSize:12,color:"var(--rosegold)",marginBottom:10,lineHeight:1.6}}>
                        <strong>Who This Is For:</strong> {femininePillars[selectedFemininePillar].whoThisIsFor}
                      </p>
                      <p style={{fontSize:12,color:"var(--rosegold)",marginBottom:10,lineHeight:1.6}}>
                        <strong>What You Get:</strong> {femininePillars[selectedFemininePillar].whatYouGet}
                      </p>

                    </div>
                    
                    <FemininePillarContent pillarKey={selectedFemininePillar} />

                    {selectedFemininePillar === 'sovereign' && (
                      <div style={{marginTop:24,padding:20,borderRadius:12,background:"linear-gradient(135deg, rgba(230,183,165,0.20), rgba(218,165,112,0.15))",border:"2px solid rgba(230,183,165,0.35)",textAlign:"center"}}>
                        <h4 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>🧬 At-Home Hormone Tracking & Personal Care</h4>
                        <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:16}}>
                          Order your at-home hormone testing kit and receive personalized 1:1 professional support. Track your cycle, optimize your hormones, and get custom protocols designed for YOUR body.
                        </p>
                        <button
                          onClick={() => openLink("https://healthlifestyleservices.com")}
                          style={{background:"linear-gradient(90deg,var(--rosegold),var(--bronze))",border:0,padding:"14px 28px",borderRadius:12,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:14,width:"100%",marginBottom:10}}
                        >
                          Order At-Home Hormone Testing Kit →
                        </button>
                        <p style={{fontSize:11,color:"var(--champagne)",fontStyle:"italic"}}>
                          Includes: Lab-grade testing kit • Personalized results analysis • 1:1 consultation with Jenna • Custom supplement protocol
                        </p>
                      </div>
                    )}

                    <div style={{marginTop:32,padding:20,borderRadius:12,background:"linear-gradient(135deg, rgba(230,183,165,0.15), rgba(218,165,112,0.10))",border:"1px solid rgba(230,183,165,0.25)",textAlign:"center"}}>
                      <p style={{fontSize:14,color:"var(--champagne)",lineHeight:1.7,marginBottom:12}}>
                        For customized lab panels, advanced practitioner care for nutritional and wellness optimization, and personalized protocol design
                      </p>
                      <button
                        onClick={() => openLink("https://healthlifestyleservices.com")}
                        style={{background:"linear-gradient(90deg,var(--rosegold),var(--bronze))",border:0,padding:"12px 24px",borderRadius:10,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:13}}
                      >
                        Schedule Consultation →
                      </button>
                    </div>
                  </div>
                )}

                {selectedFemininePillar === 'foundations' && <FoundationsContent isFeminine={true} isAgeless={false} />}

                {!selectedFemininePillar && (
                  <div style={{textAlign:"center",padding:40,color:"var(--rosegold)"}}>
                    Select a pillar to explore wellness programs and products
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Ageless Vitality Dropdown */}
      {showAgelessDropdown && (
        <>
          <div className="dropdown-backdrop" onClick={() => setShowAgelessDropdown(false)} />
          <div ref={agelessDropdownRef} className="dropdown-shell">
            <div className="panel">
              <button className="close-x" onClick={() => setShowAgelessDropdown(false)}>✕</button>
              <div style={{padding:26}}>
                <div style={{fontSize:14,color:'var(--rosegold)',letterSpacing:'.6px',marginBottom:6}}>Ageless Vitality</div>
                <div style={{fontSize:26,color:'var(--champagne)',fontWeight:700,letterSpacing:'.6px',marginBottom:12}}>Wellness for Every Age</div>

                <div className="category-selector" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))",gap:12}}>
                  <button
                    className={`category-btn ${selectedAgelessCategory === 'children' ? 'active' : ''}`}
                    onClick={() => setSelectedAgelessCategory('children')}
                  >
                    Children (0-17)
                  </button>
                  <button
                    className={`category-btn ${selectedAgelessCategory === 'matureWomen' ? 'active' : ''}`}
                    onClick={() => setSelectedAgelessCategory('matureWomen')}
                  >
                    Mature Women (50+)
                  </button>
                  <button
                    className={`category-btn ${selectedAgelessCategory === 'matureMen' ? 'active' : ''}`}
                    onClick={() => setSelectedAgelessCategory('matureMen')}
                  >
                    Mature Men (50+)
                  </button>
                </div>

                {selectedAgelessCategory === 'children' && (
                  <div style={{padding:20,borderRadius:12,background:"linear-gradient(180deg, rgba(218,165,112,0.06), rgba(245,222,179,0.03))",boxShadow:"0 8px 30px rgba(0,0,0,0.5)",border:"1px solid rgba(218,165,112,0.06)"}}>
                    <h3 style={{fontSize:22,color:"var(--champagne)",fontWeight:700,marginBottom:8}}>
                      {agelessContent.children.title}
                    </h3>
                    <p style={{color:"var(--rosegold)",marginBottom:20,lineHeight:1.6}}>
                      {agelessContent.children.description}
                    </p>

                    {Object.entries(agelessContent.children.ageGroups).map(([key, group]) => (
                      <div key={key} style={{marginBottom:16,padding:14,borderRadius:10,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
                        <h4 style={{fontSize:15,color:"var(--champagne)",fontWeight:700,marginBottom:6}}>
                          {group.range}
                        </h4>
                        {group.focus && (
                          <p style={{fontSize:12,color:"var(--rosegold)",marginBottom:8}}><strong>Focus:</strong> {group.focus}</p>
                        )}
                        {group.safeOils && (
                          <div style={{marginBottom:8}}>
                            <p style={{fontSize:11,color:"var(--rosegold)",fontWeight:600,marginBottom:4}}>Safe Oils:</p>
                            <p style={{fontSize:11,color:"rgba(245,222,179,0.9)"}}>{group.safeOils.join(", ")}</p>
                          </div>
                        )}
                        {group.products && group.products.length > 0 && (
                          <div style={{display:"grid",gap:6,marginTop:8}}>
                            {group.products.map((product, i) => (
                              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:6,borderRadius:6,background:"rgba(245,222,179,0.04)"}}>
                                <span style={{fontSize:11,color:"var(--champagne)"}}>{product.name}</span>
                                <button
                                  onClick={() => openLink(`${doterraBaseUrl}${product.slug}`)}
                                  style={{background:"transparent",border:"1px solid rgba(245,222,179,0.2)",padding:"3px 8px",borderRadius:4,color:"var(--champagne)",cursor:"pointer",fontSize:10}}
                                >
                                  Shop →
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}

                    <FoundationsContent isAgeless={true} agelessType="children" />
                  </div>
                )}

                {(selectedAgelessCategory === 'matureWomen' || selectedAgelessCategory === 'matureMen') && (
                  <div style={{padding:20,borderRadius:12,background:"linear-gradient(180deg, rgba(218,165,112,0.06), rgba(245,222,179,0.03))",boxShadow:"0 8px 30px rgba(0,0,0,0.5)",border:"1px solid rgba(218,165,112,0.06)"}}>
                    <h3 style={{fontSize:22,color:"var(--champagne)",fontWeight:700,marginBottom:8}}>
                      {agelessContent[selectedAgelessCategory].title}
                    </h3>
                    <p style={{color:"var(--rosegold)",marginBottom:20,lineHeight:1.6}}>
                      {agelessContent[selectedAgelessCategory].description}
                    </p>

                    <div style={{marginBottom:20}}>
                      <h4 style={{fontSize:15,color:"var(--rosegold)",fontWeight:600,marginBottom:10}}>Key Focus Areas:</h4>
                      <ul style={{listStyle:"none",padding:0,margin:0}}>
                        {agelessContent[selectedAgelessCategory].focus.map((item, i) => (
                          <li key={i} style={{padding:"6px 0",color:"rgba(245,222,179,0.95)",fontSize:13,lineHeight:1.6}}>
                            ✦ {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div style={{marginBottom:20}}>
                      <h4 style={{fontSize:15,color:"var(--rosegold)",fontWeight:600,marginBottom:10}}>Recommended Products:</h4>
                      <div style={{display:"grid",gap:8}}>
                        {agelessContent[selectedAgelessCategory].products.map((product, i) => (
                          <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:10,borderRadius:8,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
                            <span style={{fontSize:13,color:"var(--champagne)"}}>{product.name}</span>
                            <button
                              onClick={() => openLink(`${doterraBaseUrl}${product.slug}`)}
                              style={{background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:"0",padding:"4px 10px",borderRadius:6,color:"#1b0b06",fontWeight:600,cursor:"pointer",fontSize:11}}
                            >
                              Shop →
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <FoundationsContent isAgeless={true} agelessType="mature" />
                  </div>
                )}

                {!selectedAgelessCategory && (
                  <div style={{textAlign:"center",padding:40,color:"var(--rosegold)"}}>
                    Select a category to explore wellness programs
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Pet Harmony Dropdown */}
      {showPetDropdown && (
        <>
          <div className="dropdown-backdrop" onClick={() => setShowPetDropdown(false)} />
          <div ref={petDropdownRef} className="dropdown-shell">
            <div className="panel">
              <button className="close-x" onClick={() => setShowPetDropdown(false)}>✕</button>
              <div style={{padding:26}}>
                <div style={{fontSize:14,color:'var(--rosegold)',letterSpacing:'.6px',marginBottom:6}}>Pet Harmony</div>
                <div style={{fontSize:26,color:'var(--champagne)',fontWeight:700,letterSpacing:'.6px',marginBottom:12}}>Holistic Care for Your Companions</div>

                <div className="category-selector" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(140px, 1fr))",gap:12}}>
                  <button
                    className={`category-btn ${selectedPetType === 'dogs' ? 'active' : ''}`}
                    onClick={() => setSelectedPetType('dogs')}
                  >
                    Dogs
                  </button>
                  <button
                    className={`category-btn ${selectedPetType === 'cats' ? 'active' : ''}`}
                    onClick={() => setSelectedPetType('cats')}
                  >
                    Cats
                  </button>
                  <button
                    className={`category-btn ${selectedPetType === 'horses' ? 'active' : ''}`}
                    onClick={() => setSelectedPetType('horses')}
                  >
                    Horses
                  </button>
                  <button
                    className={`category-btn ${selectedPetType === 'parrots' ? 'active' : ''}`}
                    onClick={() => setSelectedPetType('parrots')}
                  >
                    Parrots
                  </button>
                  <button
                    className={`category-btn ${selectedPetType === 'chickens' ? 'active' : ''}`}
                    onClick={() => setSelectedPetType('chickens')}
                  >
                    Chickens
                  </button>
                </div>

                {selectedPetType && (
                  <div style={{padding:20,borderRadius:12,background:"linear-gradient(180deg, rgba(218,165,112,0.06), rgba(245,222,179,0.03))",boxShadow:"0 8px 30px rgba(0,0,0,0.5)",border:"1px solid rgba(218,165,112,0.06)",marginTop:20}}>
                    <h3 style={{fontSize:22,color:"var(--champagne)",fontWeight:700,marginBottom:8}}>
                      {petContent[selectedPetType].title}
                    </h3>
                    <p style={{color:"var(--rosegold)",marginBottom:12,lineHeight:1.6}}>
                      {petContent[selectedPetType].description}
                    </p>

                    {petContent[selectedPetType].note && (
                      <div style={{padding:12,borderRadius:8,background:"rgba(230,183,165,0.12)",border:"1px solid rgba(230,183,165,0.2)",marginBottom:20}}>
                        <p style={{fontSize:12,color:"var(--rosegold)",fontWeight:600}}>⚠️ Important: {petContent[selectedPetType].note}</p>
                      </div>
                    )}

                    {Object.entries(petContent[selectedPetType].categories).map(([catKey, category]) => (
                      <div key={catKey} style={{marginBottom:20,padding:16,borderRadius:10,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
                        <h4 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>
                          {category.title}
                        </h4>

                        {category.oral && (
                          <div style={{marginBottom:12}}>
                            <p style={{fontSize:12,color:"var(--rosegold)",fontWeight:600,marginBottom:6}}>Oral Support:</p>
                            <div style={{display:"grid",gap:6}}>
                              {category.oral.map((item, i) => (
                                <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)"}}>
                                  <div style={{flex:1}}>
                                    <div style={{fontSize:12,color:"var(--champagne)",fontWeight:600}}>{item.name}</div>
                                    <div style={{fontSize:10,color:"var(--rosegold)"}}>{item.dosage}</div>
                                  </div>
                                  <button
                                    onClick={() => openLink(`${doterraBaseUrl}${item.slug}`)}
                                    style={{background:"transparent",border:"1px solid rgba(245,222,179,0.2)",padding:"3px 8px",borderRadius:4,color:"var(--champagne)",cursor:"pointer",fontSize:10}}
                                  >
                                    Shop →
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {category.topical && (
                          <div style={{marginBottom:12}}>
                            <p style={{fontSize:12,color:"var(--rosegold)",fontWeight:600,marginBottom:6}}>Topical Support:</p>
                            <div style={{display:"grid",gap:6}}>
                              {category.topical.map((item, i) => (
                                <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)"}}>
                                  <div style={{flex:1}}>
                                    <div style={{fontSize:12,color:"var(--champagne)",fontWeight:600}}>{item.name}</div>
                                    <div style={{fontSize:10,color:"var(--rosegold)"}}>{item.application}</div>
                                  </div>
                                  <button
                                    onClick={() => openLink(`${doterraBaseUrl}${item.slug}`)}
                                    style={{background:"transparent",border:"1px solid rgba(245,222,179,0.2)",padding:"3px 8px",borderRadius:4,color:"var(--champagne)",cursor:"pointer",fontSize:10}}
                                  >
                                    Shop →
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {category.supplements && Array.isArray(category.supplements) && (
                          <div style={{marginBottom:12}}>
                            <p style={{fontSize:12,color:"var(--rosegold)",fontWeight:600,marginBottom:6}}>Supplement Support:</p>
                            <div style={{display:"grid",gap:6}}>
                              {category.supplements.map((item, i) => (
                                <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)"}}>
                                  <div style={{flex:1}}>
                                    <div style={{fontSize:12,color:"var(--champagne)",fontWeight:600}}>{item.name}</div>
                                    <div style={{fontSize:10,color:"var(--rosegold)"}}>{item.dosage}</div>
                                  </div>
                                  <button
                                    onClick={() => openLink(`${doterraBaseUrl}${item.slug}`)}
                                    style={{background:"transparent",border:"1px solid rgba(245,222,179,0.2)",padding:"3px 8px",borderRadius:4,color:"var(--champagne)",cursor:"pointer",fontSize:10}}
                                  >
                                    Shop →
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {category.supplements && typeof category.supplements === 'string' && (
                          <div style={{marginTop:10,padding:8,borderRadius:6,background:"rgba(230,183,165,0.08)",border:"1px solid rgba(230,183,165,0.12)"}}>
                            <p style={{fontSize:11,color:"var(--rosegold)",fontStyle:"italic"}}><strong>Supplements:</strong> {category.supplements}</p>
                          </div>
                        )}

                        {category.products && (
                          <div style={{display:"grid",gap:6}}>
                            {category.products.map((product, i) => (
                              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)"}}>
                                <div style={{flex:1}}>
                                  <div style={{fontSize:12,color:"var(--champagne)",fontWeight:600}}>{product.name}</div>
                                  <div style={{fontSize:10,color:"var(--rosegold)"}}>{product.use}</div>
                                </div>
                                <button
                                  onClick={() => openLink(`${doterraBaseUrl}${product.slug}`)}
                                  style={{background:"transparent",border:"1px solid rgba(245,222,179,0.2)",padding:"3px 8px",borderRadius:4,color:"var(--champagne)",cursor:"pointer",fontSize:10}}
                                >
                                  Shop →
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        {category.seasonal && (
                          <div style={{marginTop:10,padding:10,borderRadius:6,background:"rgba(218,165,112,0.08)",border:"1px solid rgba(218,165,112,0.12)"}}>
                            <p style={{fontSize:11,color:"var(--rosegold)",fontWeight:600,marginBottom:6}}>Seasonal Support:</p>
                            {Object.entries(category.seasonal).map(([season, desc], i) => (
                              <div key={i} style={{marginBottom:4}}>
                                <span style={{fontSize:10,color:"var(--rosegold)",fontWeight:600,textTransform:"capitalize"}}>{season}: </span>
                                <span style={{fontSize:10,color:"rgba(245,222,179,0.9)"}}>{desc}</span>
                              </div>
                            ))}
                          </div>
                        )}


                      </div>
                    ))}

                    {(selectedPetType === 'dogs' || selectedPetType === 'cats' || selectedPetType === 'horses') && (
                      <div style={{marginTop:24,padding:16,borderRadius:12,background:"rgba(230,183,165,0.08)",border:"1px solid rgba(230,183,165,0.15)"}}>
                        <h4 style={{fontSize:15,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>🐾 Clinical Pet Nutrition Consultation</h4>
                        <p style={{fontSize:12,color:"var(--rosegold)",marginBottom:10,lineHeight:1.6}}>
                          Advanced wellness protocols, nutrition optimization, and lab-based recommendations from a licensed clinical pet nutritionist.
                        </p>
                        <button
                          onClick={() => openLink('https://healthlifestyleservices.com')}
                          style={{background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:"0",padding:"12px 20px",borderRadius:10,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:13,width:"100%"}}
                        >
                          Schedule Clinical Pet Nutrition Consultation →
                        </button>
                        <p style={{fontSize:10,color:"var(--rosegold)",marginTop:8,textAlign:"center",fontStyle:"italic"}}>Custom nutrition plans • Lab interpretation • Supplement protocols • Associates earn referral fees</p>
                      </div>
                    )}

                    {(selectedPetType === 'parrots' || selectedPetType === 'chickens') && (
                      <div style={{marginTop:24,padding:16,borderRadius:12,background:"rgba(138,43,226,0.10)",border:"1px solid rgba(138,43,226,0.25)"}}>
                        <h4 style={{fontSize:15,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>🦜 Avian/Poultry Specialist Consultation</h4>
                        <p style={{fontSize:12,color:"var(--rosegold)",marginBottom:10,lineHeight:1.6}}>
                          Specialized protocols from certified avian nutritionist and aromatherapy expert. Species-specific safety, nutrition optimization, and wellness planning.
                        </p>
                        <button
                          onClick={() => openLink('https://healthlifestyleservices.com')}
                          style={{background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:"0",padding:"12px 20px",borderRadius:10,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:13,width:"100%"}}
                        >
                          Schedule Avian Wellness Consultation →
                        </button>
                        <p style={{fontSize:10,color:"var(--rosegold)",marginTop:8,textAlign:"center",fontStyle:"italic"}}>Advanced safety protocols • Flock health optimization • Associates earn referral fees</p>
                      </div>
                    )}
                  </div>
                )}

                {!selectedPetType && (
                  <div style={{textAlign:"center",padding:40,color:"var(--rosegold)"}}>
                    Select your companion type to explore wellness programs
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Discreet Legal Disclaimer */}
      <div style={{position:"fixed",bottom:0,left:0,right:0,padding:"6px 12px",background:"rgba(0,0,0,0.15)",fontSize:7,color:"rgba(245,222,179,0.45)",textAlign:"center",lineHeight:1.3,zIndex:5}}>
        <strong>Disclaimer:</strong> iTerra™ is an independent wellness concierge service and is not affiliated with, endorsed by, or representative of any essential oil company or brand. The information provided is for educational purposes only and is not intended to diagnose, treat, cure, or prevent any disease. Always consult with a qualified healthcare provider before beginning any new wellness regimen.
      </div>
    </div>
  );
}