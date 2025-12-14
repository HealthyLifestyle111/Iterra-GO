import React, { useState } from "react";

export default function HomeEssentials() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const associateShopUrl = "https://my.doterra.com/jennawilliams1/p/";

  const openLink = (url) => {
    if (typeof window !== "undefined") window.open(url, '_blank');
  };

  const homeCategories = {
    cleaning: {
      title: "Cleaning & Purifying",
      description: "Non-toxic, plant-powered cleaning for every surface in your home.",
      science: {
        text: "Research published in Complementary Therapies in Medicine (2020) found that On Guard blend demonstrated 90% reduction in airborne bacteria within 20 minutes of diffusion. Clinical studies show cinnamon bark and clove essential oils exhibit powerful antimicrobial activity against common household pathogens including E. coli, Staphylococcus, and mold spores.",
        link: "https://pubmed.ncbi.nlm.nih.gov/32951730/"
      },
      toxin_facts: {
        title: "Why Natural Cleaning Matters",
        facts: [
          "The average home contains 62 toxic chemicals according to Environmental Working Group (EWG)",
          "Conventional cleaners contribute to indoor air pollution 2-5x worse than outdoor air (EPA study)",
          "Common cleaning products linked to asthma, hormone disruption, and developmental issues in children",
          "Fragrances in conventional products contain phthalates and synthetic musks - endocrine disruptors"
        ],
        source: "Environmental Working Group & EPA Indoor Air Quality Studies"
      },
      products: [
        { name: "Protective Cleaner Concentrate", slug: "on-guard-cleaner-concentrate", use: "Multi-surface cleaning - clinically proven antimicrobial" },
        { name: "Multi-Purpose Cleaner", slug: "abode-multi-purpose-cleaner", use: "Kitchen, bathroom, floors" },
        { name: "Purifying Blend", slug: "purify-cleansing-blend", use: "Air purification and odor elimination" },
        { name: "Lemon Essential Oil", slug: "lemon", use: "Degreaser, polish, freshener" }
      ],
      diy: {
        title: "DIY All-Purpose Cleaner",
        ingredients: [
          { name: "Protective Cleaner Concentrate", slug: "on-guard-cleaner-concentrate" },
          { name: "Lemon Oil", slug: "lemon" },
          { name: "Purifying Blend", slug: "purify-cleansing-blend" }
        ],
        instructions: "Combine 1 Tbsp Protective Cleaner Concentrate with 2 cups water, 10 drops Lemon, and 5 drops Purifying Blend in a spray bottle. Shake well before each use."
      }
    },
    air: {
      title: "Clean Air & Atmosphere",
      description: "Breathe deeply with purified air and uplifting aromatics.",
      products: [
        { name: "Protective Blend", slug: "on-guard-protective-blend", use: "Purify air and eliminate airborne pathogens" },
        { name: "Purifying Blend", slug: "purify-cleansing-blend", use: "Eliminate airborne odors" },
        { name: "Respiratory Blend", slug: "breathe-respiratory-blend", use: "Clear airways and freshen air" },
        { name: "Citrus Blend", slug: "citrus-bliss-invigorating-blend", use: "Energizing and uplifting atmosphere" },
        { name: "Eucalyptus", slug: "eucalyptus", use: "Respiratory and air clarity" }
      ],
      diffusers: [
        { name: "Laluz Diffuser", slug: "laluz-diffuser", description: "8-hour runtime, elegant design" },
        { name: "Lumo Diffuser", slug: "lumo-diffuser", description: "Compact and travel-friendly" },
        { name: "Petal 2.0 Diffuser", slug: "petal-diffuser", description: "Classic design, whisper-quiet" }
      ]
    },
    immune: {
      title: "Immune-Boosting Home",
      description: "Create a protective sanctuary that supports your family's wellness.",
      products: [
        { name: "Protective Blend Essential Oil", slug: "on-guard-protective-blend", use: "Diffuse daily for immune support" },
        { name: "Protective Softgels", slug: "on-guard-plus-softgels", use: "Internal immune boost" },
        { name: "Protective Beadlets", slug: "on-guard-beadlets", use: "Convenient immune support on-the-go" },
        { name: "Protective Mist", slug: "on-guard-sanitizing-mist", use: "Hand purification and surface spray" },
        { name: "Protective Toothpaste", slug: "on-guard-natural-whitening-toothpaste", use: "Oral health and immune support" },
        { name: "Protective Mouthwash", slug: "on-guard-mouthwash", use: "Fresh breath and oral wellness" },
        { name: "Protective Throat Drops", slug: "on-guard-throat-drops", use: "Soothing immune support for throat" },
        { name: "Protective Cleaner Concentrate", slug: "on-guard-cleaner-concentrate", use: "Multi-surface non-toxic cleaning" },
        { name: "Protective Laundry Detergent", slug: "on-guard-laundry-detergent", use: "Natural laundry purification" },
        { name: "Protective Foaming Hand Wash", slug: "on-guard-foaming-hand-wash", use: "Gentle hand purification" },
        { name: "Tea Tree", slug: "melaleuca", use: "Natural antimicrobial for surfaces" }
      ],
      seasonal: {
        fall: "Increase Protective Blend diffusion as weather cools",
        winter: "Daily immune protocols with Protective Blend",
        spring: "Seasonal transition support with Lemon and Lavender"
      }
    },
    spa: {
      title: "Home Spa & Invigorating Rituals",
      description: "Transform your home into a luxurious wellness retreat.",
      products: [
        { name: "Massage Blend", slug: "aromatouch-massage-blend", use: "Massage and relaxation" },
        { name: "Lavender", slug: "lavender", use: "Bath soaks, facial steams" },
        { name: "Spa Bath Bar", slug: "essential-oil-accessories", use: "Moisturizing and aromatic bathing" },
        { name: "Body Renewal Serum", slug: "yarrow-pom-active-botanical-duo", use: "Full-body skin renewal" }
      ],
      diy: {
        title: "DIY Detox Bath Soak",
        ingredients: [
          { name: "Epsom Salt", slug: "essential-oil-accessories" },
          { name: "Lavender", slug: "lavender" },
          { name: "Eucalyptus", slug: "eucalyptus" },
          { name: "Frankincense", slug: "frankincense" }
        ],
        instructions: "Combine 2 cups Epsom salt, 5 drops Lavender, 3 drops Eucalyptus, and 2 drops Frankincense. Add to warm bath and soak for 20 minutes."
      }
    },
    pest: {
      title: "Natural Pest Control",
      description: "Keep your home pest-free with plant-based solutions.",
      products: [
        { name: "Outdoor Shield Spray", slug: "terrashield-outdoor-blend", use: "Outdoor insect deterrent" },
        { name: "Cedarwood", slug: "cedarwood", use: "Moth and insect repellent" },
        { name: "Lemongrass", slug: "lemongrass", use: "Flea and tick prevention" },
        { name: "Peppermint", slug: "peppermint", use: "Spider and ant deterrent" }
      ],
      diy: {
        title: "DIY Indoor Pest Spray",
        ingredients: [
          { name: "Peppermint", slug: "peppermint" },
          { name: "Cedarwood", slug: "cedarwood" },
          { name: "Lemongrass", slug: "lemongrass" }
        ],
        instructions: "Combine 10 drops Peppermint, 8 drops Cedarwood, and 5 drops Lemongrass in 2 cups water with 1 Tbsp witch hazel. Spray around doorways, windows, and baseboards."
      }
    },
    energy: {
      title: "Energy Cleansing & Sacred Space",
      description: "Clear stagnant energy and invite positive vibrations into your home.",
      products: [
        { name: "Sage Essential Oil", slug: "sage-oil", use: "Aromatic energy cleansing and purification" },
        { name: "Frankincense", slug: "frankincense", use: "Spiritual cleansing and elevation" },
        { name: "Myrrh", slug: "myrrh", use: "Protection and sanctification" },
        { name: "Purifying Blend", slug: "purify-cleansing-blend", use: "Clear negative energy" }
      ],
      diy: {
        title: "DIY Energy Clearing Spray",
        ingredients: [
          { name: "Sage Oil", slug: "sage-oil" },
          { name: "Frankincense", slug: "frankincense" },
          { name: "Purifying Blend", slug: "purify-cleansing-blend" }
        ],
        instructions: "Combine 2 oz distilled water, 1 oz witch hazel, 10 drops Sage Oil, 8 drops Frankincense, and 5 drops Purifying Blend in a spray bottle. Mist through rooms, focusing on corners and doorways."
      },
      ritual: {
        title: "Home Energy Cleansing Ritual",
        steps: [
          "Open all windows to allow stagnant energy to escape",
          "Diffuse Sage Oil + Frankincense blend throughout space",
          "Move clockwise through each room, focusing on corners",
          "Set intention: 'I clear all negative energy and invite peace, love, and light'",
          "Seal with Myrrh diffused at entryways"
        ]
      }
    },
    airbnb: {
      title: "Airbnb & Boutique Business Essentials",
      description: "Professional atmosphere and cleaning solutions for hospitality and small businesses.",
      products: [
        { name: "Protective Cleaner Concentrate", slug: "on-guard-cleaner-concentrate", use: "Non-toxic surface cleaning between guests - 90% bacteria reduction" },
        { name: "Protective Blend", slug: "on-guard-protective-blend", use: "Diffuse for air purification and welcoming scent" },
        { name: "Purifying Blend", slug: "purify-cleansing-blend", use: "Eliminate odors, refresh air" },
        { name: "Citrus Blend", slug: "citrus-bliss-invigorating-blend", use: "Welcoming, uplifting atmosphere" },
        { name: "Lavender", slug: "lavender", use: "Calming bedroom and linen spray" },
        { name: "Eucalyptus", slug: "eucalyptus", use: "Spa-like bathroom ambiance" }
      ],
      diffusers: [
        { name: "Laluz Diffuser", slug: "laluz-diffuser", description: "Elegant for lobby/common areas" },
        { name: "Lumo Diffuser", slug: "lumo-diffuser", description: "Compact for guest rooms" }
      ],
      diy: {
        title: "DIY Welcome Room Spray",
        ingredients: [
          { name: "Wild Orange", slug: "wild-orange" },
          { name: "Lavender", slug: "lavender" },
          { name: "Peppermint", slug: "peppermint" }
        ],
        instructions: "Combine 2 oz water, 1 oz vodka or witch hazel, 12 drops Wild Orange, 8 drops Lavender, and 4 drops Peppermint. Spray linens, curtains, and air before guest arrival."
      },
      tips: [
        "Diffuse Citrus Blend in common areas for energizing welcome",
        "Use Lavender linen spray on all bedding between guests",
        "Create signature scent blend for brand recognition",
        "Offer mini oil samples as guest amenities",
        "Display diffuser with welcome card in each room"
      ]
    },
    spa_box: {
      title: "Spa in a Box - Retail Kits",
      description: "Curated spa experience kits ready to sell or gift to clients.",
      kits: [
        {
          name: "Luxury Spa Escape Kit",
          contents: ["Lavender Oil (5mL)", "Protective Blend (5mL)", "Epsom Salt (8oz)", "Face Cloth", "Candle", "Bath Soak Recipe Card"],
          use: "Complete at-home spa experience with purifying aromatics"
        },
        {
          name: "Stress Relief Sampler",
          contents: ["Lavender (5mL)", "Balance Blend (5mL)", "Serenity Blend (5mL)", "Usage Guide"],
          use: "Aromatherapy intro kit for stress management"
        },
        {
          name: "Muscle Recovery Box",
          contents: ["Deep Blue Rub", "Peppermint Oil (5mL)", "Marjoram (5mL)", "Roller Bottle", "Recipe Card"],
          use: "Athletes and active lifestyles"
        },
        {
          name: "Sleep Sanctuary Set",
          contents: ["Serenity Blend (5mL)", "Lavender (5mL)", "Cedarwood (5mL)", "Pillow Spray Recipe", "Sleep Mask"],
          use: "Complete sleep support system"
        },
        {
          name: "Clean Home Essentials",
          contents: ["Protective Cleaner Concentrate", "Protective Blend (5mL)", "Lemon (5mL)", "Spray Bottles", "Recipe Cards"],
          use: "Non-toxic cleaning starter kit"
        }
      ],
      sample_products: [
        { name: "5mL Amber Bottles", slug: "essential-oil-bottles-5ml-amber", use: "Sample size oils for kits" },
        { name: "Roller Bottles", slug: "essential-oil-roller-bottles", use: "Ready-to-use blends" },
        { name: "Spray Bottles", slug: "glass-spray-bottles", use: "DIY cleaning solutions" },
        { name: "Gift Boxes", slug: "essential-oil-accessories", use: "Professional packaging" }
      ],
      diy: {
        title: "DIY Spa Kit Assembly Guide",
        ingredients: [
          { name: "Lavender Oil", slug: "lavender" },
          { name: "Eucalyptus Oil", slug: "eucalyptus" },
          { name: "Peppermint Oil", slug: "peppermint" },
          { name: "Fractionated Coconut Oil", slug: "fractionated-coconut-oil" },
          { name: "Sample Bottles & Accessories", slug: "essential-oil-accessories" }
        ],
        instructions: "Create your own spa kits: Fill 5mL bottles with single oils, add carrier oil roller, include printed recipe cards, package in gift box with tissue paper. Markup 40-60% for retail pricing."
      }
    },
    travel: {
      title: "On the Road & Travel Essentials",
      description: "Stay balanced, protected, and refreshed wherever you go.",
      products: [
        { name: "Travel Kit (10 essential oils)", slug: "family-essentials-kit-and-petal-diffuser", use: "Compact travel wellness" },
        { name: "Protective Blend", slug: "on-guard-protective-blend", use: "Immune support and hotel room air purification" },
        { name: "Protective Hand Mist", slug: "on-guard-sanitizing-mist", use: "Purification on-the-go" },
        { name: "Digestive Touch Blend", slug: "digestzen-touch", use: "Travel tummy support" },
        { name: "Peppermint Beadlets", slug: "peppermint-beadlets-digestive-health", use: "Quick energy and nausea relief" }
      ],
      tips: [
        "Pack oils in TSA-compliant bottles",
        "Bring roller bottles for easy application",
        "Diffuse in hotel rooms to create familiar atmosphere",
        "Use Purifying Blend to cleanse rental car or hotel room"
      ]
    },
    bedding: {
      title: "Bedding & Linen Care",
      description: "Infuse your sleep sanctuary with calming aromatics and freshness.",
      products: [
        { name: "Protective Blend", slug: "on-guard-protective-blend", use: "Purify linens and eliminate bacteria naturally" },
        { name: "Lavender", slug: "lavender", use: "Linen spray and pillow mist" },
        { name: "Cedarwood", slug: "cedarwood", use: "Drawer and closet sachets" },
        { name: "Restful Blend", slug: "serenity-restful-blend", use: "Sleep-inducing linen spray" }
      ],
      diy: {
        title: "DIY Linen Spray",
        ingredients: [
          { name: "Lavender", slug: "lavender" },
          { name: "Cedarwood", slug: "cedarwood" },
          { name: "Roman Chamomile", slug: "roman-chamomile" }
        ],
        instructions: "Combine 2 oz water, 1 oz witch hazel, 10 drops Lavender, 5 drops Cedarwood, and 3 drops Roman Chamomile in a spray bottle. Mist pillows and linens before bed."
      },
      sachets: {
        title: "DIY Aromatic Sachets",
        instructions: "Fill small cloth bags with dried lavender buds or cotton balls infused with 5-10 drops of Lavender, Cedarwood, or Restful Blend. Place in drawers, closets, or under pillows."
      }
    },
    gifts: {
      title: "Holiday & Home Gifts",
      description: "Thoughtfully curated wellness gifts for every occasion.",
      giftSets: [
        { name: "Home Essentials Kit", slug: "home-essentials-kit", occasion: "Housewarming" },
        { name: "Spa Collection", slug: "essential-oil-accessories", occasion: "Mother's Day, Birthdays" },
        { name: "Diffuser + Top 10 Oils", slug: "family-essentials-kit-and-petal-diffuser", occasion: "Holidays, Wellness Starter" },
        { name: "Sleep & Restful Bundle", slug: "serenity-restful-blend", occasion: "Stress relief, New parents" }
      ],
      diffusers: [
        { name: "Laluz Diffuser", slug: "laluz-diffuser", description: "Elegant sculptural design" },
        { name: "Lumo Diffuser", slug: "lumo-diffuser", description: "Compact and colorful" },
        { name: "Roam Diffuser", slug: "roam-diffuser", description: "Portable, battery-powered" }
      ]
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 md:px-8">
      <style>{`
        .home-category-btn {
          padding: 16px;
          border-radius: 12px;
          background: linear-gradient(180deg, rgba(54,18,14,0.55), rgba(32,12,9,0.45));
          border: 1px solid rgba(218,165,112,.06);
          color: var(--champagne);
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 15px;
          font-weight: 600;
          text-align: left;
        }
        .home-category-btn:hover {
          border-color: rgba(218,165,112,.25);
          transform: translateY(-2px);
        }
        .home-category-btn.active {
          background: linear-gradient(90deg,var(--bronze),var(--rosegold));
          color: #1b0b06;
          border-color: transparent;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
      <div className="mb-12">
        <div style={{fontSize:14,color:'var(--rosegold)',letterSpacing:'.6px',marginBottom:6}}>Home Essentials</div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide mb-4" style={{color:'var(--champagne)'}}>
          Your Sanctuary of Wellness
        </h1>
        <p style={{color:'rgba(245,222,179,.9)',lineHeight:1.6,fontSize:14,marginBottom:20}}>
          Transform your living space into a haven of health, harmony, and natural vitality with plant-based solutions for every room.
        </p>

        <div style={{padding:20,borderRadius:12,background:"linear-gradient(135deg, rgba(218,165,112,0.12), rgba(185,135,93,0.08))",border:"1px solid rgba(218,165,112,0.25)",marginBottom:24}}>
          <h3 style={{fontSize:18,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>⚠️ The Hidden Toxins in Your Home</h3>
          <div style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:12}}>
            <strong>Why Natural Cleaning Matters:</strong>
          </div>
          <ul style={{listStyle:"none",padding:0,margin:0,fontSize:13,color:"rgba(245,222,179,0.95)",lineHeight:1.8}}>
            <li style={{marginBottom:8}}>• The average home contains <strong>62 toxic chemicals</strong> (Environmental Working Group)</li>
            <li style={{marginBottom:8}}>• Indoor air pollution from cleaners is <strong>2-5x worse than outdoor air</strong> (EPA)</li>
            <li style={{marginBottom:8}}>• Conventional cleaning products linked to <strong>asthma, hormone disruption, and developmental issues</strong> in children</li>
            <li style={{marginBottom:8}}>• Synthetic fragrances contain <strong>phthalates and endocrine disruptors</strong> never listed on labels</li>
          </ul>
          <p style={{fontSize:12,color:"var(--champagne)",marginTop:12,fontStyle:"italic"}}>
            Sources: <a href="https://www.ewg.org/healthyhomeguide/" target="_blank" rel="noopener noreferrer" style={{color:"var(--rosegold)",textDecoration:"underline"}}>Environmental Working Group</a> • <a href="https://www.epa.gov/indoor-air-quality-iaq" target="_blank" rel="noopener noreferrer" style={{color:"var(--rosegold)",textDecoration:"underline"}}>EPA Indoor Air Quality Studies</a>
          </p>
        </div>
      </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:12,marginBottom:24}}>
          {Object.keys(homeCategories).map((key) => (
            <button
              key={key}
              className={`home-category-btn ${selectedCategory === key ? 'active' : ''}`}
              onClick={() => setSelectedCategory(key)}
            >
              {homeCategories[key].title}
            </button>
          ))}
        </div>

        {selectedCategory && (
          <div style={{padding:24,borderRadius:16,background:"linear-gradient(180deg, rgba(218,165,112,0.06), rgba(245,222,179,0.03))",boxShadow:"0 8px 30px rgba(0,0,0,0.5)",border:"1px solid rgba(218,165,112,0.06)"}}>
            <h2 style={{fontSize:24,color:"var(--champagne)",fontWeight:700,marginBottom:8}}>
              {homeCategories[selectedCategory].title}
            </h2>
            <p style={{color:"var(--rosegold)",marginBottom:20,lineHeight:1.6}}>
              {homeCategories[selectedCategory].description}
            </p>

            {homeCategories[selectedCategory].toxin_facts && (
              <div style={{padding:16,borderRadius:12,background:"rgba(218,165,112,0.1)",border:"1px solid rgba(218,165,112,0.25)",marginBottom:20}}>
                <h3 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>{homeCategories[selectedCategory].toxin_facts.title}</h3>
                <ul style={{listStyle:"none",padding:0,margin:0,fontSize:12,color:"rgba(245,222,179,0.95)",lineHeight:1.7}}>
                  {homeCategories[selectedCategory].toxin_facts.facts.map((fact, i) => (
                    <li key={i} style={{marginBottom:6}}>✦ {fact}</li>
                  ))}
                </ul>
                <p style={{fontSize:11,color:"var(--rosegold)",marginTop:10,fontStyle:"italic"}}>
                  Source: {homeCategories[selectedCategory].toxin_facts.source}
                </p>
              </div>
            )}

            {homeCategories[selectedCategory].science && (
              <div style={{padding:16,borderRadius:12,background:"rgba(230,183,165,0.1)",border:"1px solid rgba(230,183,165,0.2)",marginBottom:20}}>
                <h3 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>🔬 Clinical Research</h3>
                <p style={{fontSize:13,color:"rgba(245,222,179,0.95)",lineHeight:1.7,marginBottom:10}}>
                  {homeCategories[selectedCategory].science.text}
                </p>
                <a 
                  href={homeCategories[selectedCategory].science.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{fontSize:12,color:"var(--rosegold)",textDecoration:"underline"}}
                >
                  Read the study →
                </a>
              </div>
            )}

            {homeCategories[selectedCategory].products && (
              <div style={{marginBottom:24}}>
                <h3 style={{fontSize:16,color:"var(--champagne)",fontWeight:600,marginBottom:12}}>Featured Products</h3>
                <div style={{display:"grid",gap:10}}>
                  {homeCategories[selectedCategory].products.map((product, i) => (
                    <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:12,borderRadius:8,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
                      <div>
                        <div style={{fontSize:14,color:"var(--champagne)",fontWeight:600,marginBottom:2}}>{product.name}</div>
                        <div style={{fontSize:12,color:"var(--rosegold)"}}>{product.use}</div>
                      </div>
                      <button
                        onClick={() => openLink(`${associateShopUrl}${product.slug}`)}
                        style={{background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:"0",padding:"6px 14px",borderRadius:6,color:"#1b0b06",fontWeight:600,cursor:"pointer",fontSize:12,whiteSpace:"nowrap"}}
                      >
                        Shop →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {homeCategories[selectedCategory].diffusers && (
              <div style={{marginBottom:24}}>
                <h3 style={{fontSize:16,color:"var(--champagne)",fontWeight:600,marginBottom:12}}>Diffusers</h3>
                <div style={{display:"grid",gap:10}}>
                  {homeCategories[selectedCategory].diffusers.map((diffuser, i) => (
                    <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:12,borderRadius:8,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
                      <div>
                        <div style={{fontSize:14,color:"var(--champagne)",fontWeight:600,marginBottom:2}}>{diffuser.name}</div>
                        <div style={{fontSize:12,color:"var(--rosegold)"}}>{diffuser.description}</div>
                      </div>
                      <button
                        onClick={() => openLink(`${associateShopUrl}${diffuser.slug}`)}
                        style={{background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:"0",padding:"6px 14px",borderRadius:6,color:"#1b0b06",fontWeight:600,cursor:"pointer",fontSize:12,whiteSpace:"nowrap"}}
                      >
                        Shop →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {homeCategories[selectedCategory].kits && (
              <div style={{marginBottom:24}}>
                <h3 style={{fontSize:16,color:"var(--champagne)",fontWeight:600,marginBottom:12}}>Ready-to-Sell Spa Kits</h3>
                <div style={{display:"grid",gap:10}}>
                  {homeCategories[selectedCategory].kits.map((kit, i) => (
                    <div key={i} style={{padding:14,borderRadius:8,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
                      <div style={{fontSize:14,color:"var(--champagne)",fontWeight:600,marginBottom:6}}>{kit.name}</div>
                      <div style={{fontSize:12,color:"rgba(245,222,179,0.8)",marginBottom:8}}>{kit.use}</div>
                      <div style={{fontSize:11,color:"rgba(245,222,179,0.7)",fontStyle:"italic"}}>
                        Includes: {kit.contents.join(" • ")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {homeCategories[selectedCategory].sample_products && (
              <div style={{marginBottom:24}}>
                <h3 style={{fontSize:16,color:"var(--champagne)",fontWeight:600,marginBottom:12}}>Sample & Packaging Supplies</h3>
                <div style={{display:"grid",gap:10}}>
                  {homeCategories[selectedCategory].sample_products.map((product, i) => (
                    <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:12,borderRadius:8,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
                      <div>
                        <div style={{fontSize:14,color:"var(--champagne)",fontWeight:600,marginBottom:2}}>{product.name}</div>
                        <div style={{fontSize:12,color:"var(--rosegold)"}}>{product.use}</div>
                      </div>
                      <button
                        onClick={() => openLink(`${associateShopUrl}${product.slug}`)}
                        style={{background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:"0",padding:"6px 14px",borderRadius:6,color:"#1b0b06",fontWeight:600,cursor:"pointer",fontSize:12,whiteSpace:"nowrap"}}
                      >
                        Shop →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {homeCategories[selectedCategory].tips && (
              <div style={{marginTop:20,padding:16,borderRadius:12,background:"rgba(218,165,112,0.08)",border:"1px solid rgba(218,165,112,0.12)"}}>
                <h3 style={{fontSize:16,color:"var(--champagne)",fontWeight:600,marginBottom:12}}>
                  {selectedCategory === 'airbnb' ? 'Hospitality Tips' : 'Travel Tips'}
                </h3>
                <ul style={{listStyle:"none",padding:0,margin:0}}>
                  {homeCategories[selectedCategory].tips.map((tip, i) => (
                    <li key={i} style={{padding:"6px 0",color:"rgba(245,222,179,0.95)",fontSize:13,lineHeight:1.6}}>
                      ✦ {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {homeCategories[selectedCategory].diy && (
              <div style={{padding:16,borderRadius:12,background:"rgba(230,183,165,0.08)",border:"1px solid rgba(230,183,165,0.12)",marginBottom:20}}>
                <h3 style={{fontSize:16,color:"var(--champagne)",fontWeight:600,marginBottom:12}}>
                  {homeCategories[selectedCategory].diy.title}
                </h3>
                <div style={{marginBottom:12}}>
                  <p style={{fontSize:13,color:"var(--rosegold)",fontWeight:600,marginBottom:8}}>Ingredients:</p>
                  <div style={{display:"grid",gap:6}}>
                    {homeCategories[selectedCategory].diy.ingredients.map((ing, i) => (
                      <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:8,borderRadius:6,background:"rgba(245,222,179,0.04)"}}>
                        <span style={{fontSize:12,color:"var(--champagne)"}}>{ing.name}</span>
                        {ing.slug && (
                          <button
                            onClick={() => openLink(`${associateShopUrl}${ing.slug}`)}
                            style={{background:"transparent",border:"1px solid rgba(245,222,179,0.2)",padding:"3px 8px",borderRadius:4,color:"var(--champagne)",cursor:"pointer",fontSize:10}}
                          >
                            Shop →
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{padding:10,borderRadius:8,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
                  <p style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.6,fontStyle:"italic"}}>
                    <strong>Instructions:</strong> {homeCategories[selectedCategory].diy.instructions}
                  </p>
                </div>
              </div>
            )}

            {homeCategories[selectedCategory].giftSets && (
              <div style={{marginBottom:20}}>
                <h3 style={{fontSize:16,color:"var(--champagne)",fontWeight:600,marginBottom:12}}>Gift Sets</h3>
                <div style={{display:"grid",gap:10}}>
                  {homeCategories[selectedCategory].giftSets.map((gift, i) => (
                    <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:12,borderRadius:8,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
                      <div>
                        <div style={{fontSize:14,color:"var(--champagne)",fontWeight:600,marginBottom:2}}>{gift.name}</div>
                        <div style={{fontSize:12,color:"var(--rosegold)"}}>Perfect for: {gift.occasion}</div>
                      </div>
                      <button
                        onClick={() => openLink(`${associateShopUrl}${gift.slug}`)}
                        style={{background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:"0",padding:"6px 14px",borderRadius:6,color:"#1b0b06",fontWeight:600,cursor:"pointer",fontSize:12}}
                      >
                        Shop →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {homeCategories[selectedCategory].ritual && (
              <div style={{padding:16,borderRadius:12,background:"rgba(230,183,165,0.08)",border:"1px solid rgba(230,183,165,0.12)"}}>
                <h3 style={{fontSize:16,color:"var(--champagne)",fontWeight:600,marginBottom:12}}>
                  {homeCategories[selectedCategory].ritual.title}
                </h3>
                <ol style={{listStyle:"decimal",paddingLeft:20,margin:0}}>
                  {homeCategories[selectedCategory].ritual.steps.map((step, i) => (
                    <li key={i} style={{padding:"6px 0",color:"rgba(245,222,179,0.95)",fontSize:13,lineHeight:1.6}}>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {homeCategories[selectedCategory].seasonal && (
              <div style={{marginTop:20,padding:16,borderRadius:12,background:"rgba(218,165,112,0.08)",border:"1px solid rgba(218,165,112,0.12)"}}>
                <h3 style={{fontSize:16,color:"var(--champagne)",fontWeight:600,marginBottom:12}}>Seasonal Support</h3>
                {Object.entries(homeCategories[selectedCategory].seasonal).map(([season, desc], i) => (
                  <div key={i} style={{marginBottom:8}}>
                    <span style={{fontSize:13,color:"var(--rosegold)",fontWeight:600,textTransform:"capitalize"}}>{season}: </span>
                    <span style={{fontSize:13,color:"rgba(245,222,179,0.9)"}}>{desc}</span>
                  </div>
                ))}
              </div>
            )}


          </div>
        )}

        {!selectedCategory && (
          <div style={{textAlign:"center",padding:60,color:"var(--rosegold)"}}>
            Select a category above to explore home wellness solutions
          </div>
        )}
      </div>
    </div>
  );
}