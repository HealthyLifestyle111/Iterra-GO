import React, { useState, useEffect } from "react";
import { Target, BookOpen, GraduationCap, Heart, LogOut, Briefcase, Lock, Star, Calendar, Award, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import ManifestationManager from "../components/ManifestationManager";
import UniversityBlueprint from "../components/UniversityBlueprint";


export default function BackOffice() {
  const [activeSection, setActiveSection] = useState('manifestation');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [selectedCard, setSelectedCard] = useState(null);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [score, setScore] = useState(0);
  const [professionalCategory, setProfessionalCategory] = useState(null);
  const [expandedModule, setExpandedModule] = useState(null);
  const [expandedProfModule, setExpandedProfModule] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('demo') === 'true') {
          setUser({ 
            full_name: 'Demo Associate', 
            email: 'demo@iterra.com',
            associate_id: 'DEMO123',
            backoffice_access: true,
            education_tier: 'tier3'
          });
          setIsAuthenticated(true);
          setLoading(false);
          return;
        }

        const isAuth = await base44.auth.isAuthenticated();
        if (!isAuth) {
          navigate(createPageUrl('Home'));
          return;
        }

        const currentUser = await base44.auth.me();
        
        if (!currentUser.backoffice_access) {
          alert('You do not have back office access. Please contact your upline.');
          navigate(createPageUrl('Home'));
          return;
        }

        setUser(currentUser);
        setIsAuthenticated(true);
      } catch (err) {
        navigate(createPageUrl('Home'));
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    base44.auth.logout(createPageUrl('Home'));
  };

  const userTier = user?.education_tier || 'tier1';
  
  const hasAccessToTier = (requiredTier) => {
    // TEMPORARY: Unlock tier1 and tier2 for review
    if (requiredTier === 'tier1' || requiredTier === 'tier2') {
      return true;
    }
    const tierLevels = { tier1: 1, tier2: 2, tier3: 3 };
    return tierLevels[userTier] >= tierLevels[requiredTier];
  };

  const flashCards = [
    // SINGLE OILS - CITRUS FAMILY
    { front: "What is Lemon essential oil used for?", back: "Cleansing, detox support, metabolism, immune boost. Takes 75 lemons per 15mL bottle. Add 1-2 drops to water. Solar Plexus chakra. Rutaceae family.", category: "Citrus Oils" },
    { front: "What is Wild Orange essential oil used for?", back: "Joy, creativity, energy, mood elevation. Takes 50-60 oranges per bottle. 1-2 drops in water or diffuse. Sacral chakra for emotional vitality. Brazil sourcing.", category: "Citrus Oils" },
    { front: "What is Grapefruit essential oil used for?", back: "Metabolism support, weight wellness, uplifting mood. 40-50 grapefruits per bottle. 1-2 drops in water. Solar Plexus chakra for confidence.", category: "Citrus Oils" },
    { front: "What is Bergamot essential oil used for?", back: "Stress relief, cortisol regulation, skin support. Calming citrus. Apply diluted to pulse points or diffuse. Heart chakra for emotional balance.", category: "Citrus Oils" },
    { front: "What is Lime essential oil used for?", back: "Cleansing, energizing, mental clarity. Refreshing citrus for water, diffusion, cleaning. Supports immune system and uplifts mood.", category: "Citrus Oils" },
    
    // SINGLE OILS - LAVENDER FAMILY
    { front: "What is Lavender essential oil primarily used for?", back: "Calming, sleep support, skin soothing, minor burns. Takes 220 lbs of flowers (27 plants per drop). 1-2 drops internally or topically. Crown & Third Eye chakras. Bulgarian highlands. Most versatile oil.", category: "Floral Oils" },
    
    // SINGLE OILS - MINT FAMILY
    { front: "What is Peppermint essential oil best for?", back: "Energy, focus, digestive support, cooling, headaches. 256 lbs leaves per lb oil. 1 drop in water or temples. Solar Plexus chakra. Pacific Northwest volcanic soil. Lamiaceae family.", category: "Mint Oils" },
    { front: "What is Spearmint essential oil used for?", back: "Gentle digestive support, fresher than Peppermint. Safe for children. Uplifting and less intense. Good for cooking and beverages.", category: "Mint Oils" },
    
    // SINGLE OILS - TREE/WOOD FAMILY
    { front: "What is Frankincense essential oil known for?", back: "Cellular health, meditation, skin rejuvenation, immune support. 'King of oils'. Boswellia resin from Somalia/Oman. 1-2 drops under tongue. Crown chakra. Burseraceae family. Ancient sacred oil.", category: "Wood/Resin Oils" },
    { front: "What is Cedarwood essential oil used for?", back: "Grounding, focus, skin/hair health, respiratory support. Calming woodsy aroma. Apply to scalp or diffuse for meditation. Root chakra for stability.", category: "Wood/Resin Oils" },
    { front: "What is Sandalwood essential oil used for?", back: "Sacred sensuality, grounding, skin rejuvenation. 15+ year old Australian trees, 30+ lbs heartwood per lb oil. 1-2 drops diluted topically. Root & Sacral chakras. Premium oil.", category: "Wood/Resin Oils" },
    { front: "What is Vetiver essential oil used for?", back: "Deep grounding, calming, focus for ADHD. Earthy root oil. Apply to feet or diffuse. Root chakra. Excellent for restless energy and sleep.", category: "Wood/Resin Oils" },
    { front: "What is Douglas Fir essential oil used for?", back: "Uplifting, clearing the mind, respiratory support. Warm daylight energy. Diffuse for mental clarity and emotional lift. Pairs with Siberian Fir.", category: "Wood/Resin Oils" },
    { front: "What is Siberian Fir essential oil used for?", back: "Cooling nerves, steadying breath, crystalline stillness. Northern forest clarity. Diffuse for grounding and presence. Pairs with Douglas Fir for balance.", category: "Wood/Resin Oils" },
    { front: "What is Cypress essential oil used for?", back: "Lymphatic drainage, fluid movement, grounding. Supports circulation and respiratory health. Diffuse or apply diluted to chest.", category: "Wood/Resin Oils" },
    { front: "What is Arborvitae essential oil used for?", back: "Protective, grounding, spiritual connection. Wood preservation qualities. Supports immune system and meditation practices.", category: "Wood/Resin Oils" },
    
    // SINGLE OILS - FLORAL FAMILY
    { front: "What is Rose essential oil used for?", back: "Love, emotional healing, skin care. 60,000 petals (10,000 roses) per oz. Hand-picked at dawn in Bulgaria. 1 drop diluted (very potent). Heart chakra. Rosaceae family. Most precious oil.", category: "Floral Oils" },
    { front: "What is Ylang Ylang essential oil used for?", back: "Sensuality, emotional balance, heart-opening. Comoros Islands flowers, 100 lbs flowers for 2 lbs oil. 1-2 drops diluted. Sacral & Heart chakras. Annonaceae family.", category: "Floral Oils" },
    { front: "What is Geranium essential oil used for?", back: "Hormone balance, skin health, emotional support. Floral and herbaceous. Apply diluted or diffuse. Supports feminine wellness and fluid balance.", category: "Floral Oils" },
    { front: "What is Jasmine essential oil used for?", back: "Romance, confidence, skin rejuvenation. Exotic floral aroma. Precious oil for emotional uplift and sacred sensuality. Apply as perfume diluted.", category: "Floral Oils" },
    
    // SINGLE OILS - HERB FAMILY
    { front: "What is Tea Tree (Melaleuca) essential oil used for?", back: "Skin purification, immune support, cleaning. Aboriginal peoples used for millennia. 100 lbs leaves per 1-2 lbs oil. 1-2 drops topically, not internal. Throat chakra. TOXIC TO CATS.", category: "Herb Oils" },
    { front: "What is Oregano essential oil used for?", back: "Immune support, antimicrobial powerhouse. 1,000 lbs wild oregano for 1 lb oil. 1 drop in veggie capsule (very potent). Root chakra. Mediterranean mountain herb. Use short-term only.", category: "Herb Oils" },
    { front: "What is Basil essential oil used for?", back: "Mental alertness, muscle relaxation, respiratory support. Culinary and therapeutic. Supports focus and reduces tension. Apply diluted or diffuse.", category: "Herb Oils" },
    { front: "What is Rosemary essential oil used for?", back: "Memory, focus, hair growth, respiratory support. Stimulating herb. Apply to scalp or diffuse for concentration. Avoid with high blood pressure.", category: "Herb Oils" },
    { front: "What is Thyme essential oil used for?", back: "Immune support, antimicrobial, respiratory health. Very potent phenol oil. Dilute heavily. Use in veggie capsules for internal support. TOXIC TO CATS.", category: "Herb Oils" },
    { front: "What is Marjoram essential oil used for?", back: "Muscle tension, cramps, relaxation, cardiovascular support. Warming and soothing. Apply diluted to tense muscles or diffuse before bed.", category: "Herb Oils" },
    { front: "What is Cilantro essential oil used for?", back: "Detox support, culinary use, digestive aid. Cleansing properties. Add to food or take in capsule for heavy metal chelation support.", category: "Herb Oils" },
    
    // SINGLE OILS - SPICE FAMILY
    { front: "What is Cinnamon Bark essential oil used for?", back: "Blood sugar balance, immune support, warming circulation. Very potent. 1 drop in capsule or diluted topically. Reduces sweet cravings. Use with caution on skin.", category: "Spice Oils" },
    { front: "What is Ginger essential oil used for?", back: "Nausea, digestion, circulation, inflammation. Warming and soothing. 1 drop in water or capsule. Apply diluted to abdomen for digestive upset.", category: "Spice Oils" },
    { front: "What is Clove essential oil used for?", back: "Dental pain, immune support, antimicrobial. Very strong phenol oil. Dilute heavily. Apply to gums for toothache (diluted 1:10). TOXIC TO CATS.", category: "Spice Oils" },
    { front: "What is Cardamom essential oil used for?", back: "Digestive support, respiratory health, uplifting aroma. Warming spice. Add to cooking, take in capsule, or diffuse for mental clarity.", category: "Spice Oils" },
    { front: "What is Black Pepper essential oil used for?", back: "Circulation, metabolism, mental focus. Supports nutrient absorption. Add to food or take in capsule. Warming and stimulating.", category: "Spice Oils" },
    { front: "What is Cassia essential oil used for?", back: "Immune support, warming, similar to Cinnamon. Blood sugar support. Use sparingly, very potent. Dilute heavily for topical use. TOXIC TO CATS.", category: "Spice Oils" },
    
    // SINGLE OILS - EUCALYPTUS/RESPIRATORY
    { front: "What is Eucalyptus essential oil used for?", back: "Respiratory support, clearing airways, mental clarity. Cooling and opening. Diffuse or apply diluted to chest. Supports clear breathing and focus.", category: "Respiratory Oils" },
    
    // SINGLE OILS - ANTI-INFLAMMATORY
    { front: "What is Copaiba essential oil used for?", back: "Inflammation support, pain relief, CB2 receptor binding. Highest beta-caryophyllene content. Amazonian resin from 100+ year old trees. 1-2 drops under tongue. All chakras. No psychoactive effects.", category: "Anti-Inflammatory Oils" },
    { front: "What is Turmeric essential oil used for?", back: "Inflammation modulation, joint support, nervous system health. Golden root from India. Take in capsule with black pepper for absorption. Cellular protection.", category: "Anti-Inflammatory Oils" },
    { front: "What is Helichrysum essential oil used for?", back: "Tissue regeneration, bruising, scarring, anti-aging. Advanced skin repair. Apply neat or diluted to injuries. Supports circulation and cellular renewal.", category: "Anti-Inflammatory Oils" },
    
    // SINGLE OILS - UNIQUE/OTHER
    { front: "What is Myrrh essential oil used for?", back: "Skin health, immune support, spiritual grounding. Ancient resin. Apply diluted for skin rejuvenation or diffuse for meditation. Supports oral health.", category: "Resin Oils" },
    { front: "What is Wintergreen essential oil used for?", back: "Pain relief, muscle soreness, cooling analgesic. High methyl salicylate. Dilute heavily (1:4). Similar to aspirin. NOT for cats. NOT internal use.", category: "Pain Relief Oils" },
    { front: "What is Birch essential oil used for?", back: "Pain relief, similar to Wintergreen. Cooling and analgesic. Dilute heavily. Avoid with blood thinners. Topical only, not internal. NOT for cats.", category: "Pain Relief Oils" },
    
    // BLENDS
    { front: "What is On Guard Protective Blend used for?", back: "Immune protection, antimicrobial, seasonal support. Wild Orange, Clove, Cinnamon, Eucalyptus, Rosemary. Take softgels daily or diffuse. Fall/winter essential.", category: "Blends" },
    { front: "What is DigestZen Digestive Blend used for?", back: "Bloating, gas, nausea, digestive upset. Ginger, Peppermint, Tarragon, Fennel, Caraway, Coriander, Anise. Take in capsule or apply diluted to abdomen.", category: "Blends" },
    { front: "What is Breathe Respiratory Blend used for?", back: "Clear airways, respiratory comfort, seasonal support. Laurel Leaf, Eucalyptus, Peppermint, Melaleuca, Lemon, Cardamom, Ravintsara, Ravensara. Diffuse or apply to chest.", category: "Blends" },
    { front: "What is Deep Blue Soothing Blend used for?", back: "Muscle pain, joint discomfort, inflammation. Wintergreen, Camphor, Peppermint, Ylang Ylang, Helichrysum, Blue Tansy, Blue Chamomile, Osmanthus. Apply to sore areas.", category: "Blends" },
    { front: "What is Balance Grounding Blend used for?", back: "Grounding, emotional stability, stress relief. Spruce, Ho Wood, Frankincense, Blue Tansy, Blue Chamomile. Apply to feet or diffuse. Root chakra connection.", category: "Blends" },
    { front: "What is Serenity Restful Blend used for?", back: "Sleep support, relaxation, calming. Lavender, Cedarwood, Ho Wood, Ylang Ylang, Marjoram, Roman Chamomile, Vetiver, Vanilla, Sandalwood. Diffuse before bed or take softgels.", category: "Blends" },
    { front: "What is Adaptiv Calming Blend used for?", back: "Stress management, anxiety relief, focus during pressure. Lavender, Magnolia, Neroli, Sweetgum, Wild Orange, Spearmint, Copaiba, Rosemary. Take capsules or diffuse.", category: "Blends" },
    { front: "What is Elevation Joyful Blend used for?", back: "Uplifting mood, combating sadness, positive energy. Citrus and spice notes. Lavandin, Tangerine, Elemi, Lemon Myrtle, Melissa, Ylang Ylang, Sandalwood, Litsea. Diffuse or apply over heart.", category: "Blends" },
    { front: "What is InTune Focus Blend used for?", back: "Mental clarity, concentration, sustained attention. Amyris, Patchouli, Frankincense, Lime, Ylang Ylang, Sandalwood, Roman Chamomile. Apply to temples and back of neck.", category: "Blends" },
    { front: "What is ClaryCalm essential oil used for?", back: "Hormonal balance, menstrual comfort, PMS support. Clary Sage, Lavender, Bergamot, Roman Chamomile, Cedarwood, Ylang Ylang, Geranium, Fennel, Carrot Seed, Palmarosa, Vitex. Roll on abdomen.", category: "Blends" },
    { front: "What is Whisper Blend used for?", back: "Sensual, alluring, romantic blend. Natural perfume for intimate moments. Bergamot, Ylang Ylang, Patchouli, Vanilla, Jasmine, Cinnamon, Labdanum, Cocoa, Rose, Sandalwood. Apply to pulse points.", category: "Blends" },
    { front: "What is Citrus Bloom Blend used for?", back: "Amplifies positive energy, uplifting, bright and floral. Wild Orange, Grapefruit, Lavender, Roman Chamomile, Magnolia. Diffuse or wear as natural perfume.", category: "Blends" },
    
    // SUPPLEMENTS
    { front: "What does the Lifelong Vitality Pack contain?", back: "3 supplements: Alpha CRS+ (cellular protection), xEO Mega (omega fatty acids), Microplex VMz (multivitamin/mineral). Foundation for longevity and daily wellness.", category: "Supplements" },
    { front: "What is MetaPWR System used for?", back: "Metabolic support, weight wellness, healthy aging. Includes MetaPWR Advantage, Satiety Gum, Softgels. Supports blood sugar balance and fat metabolism.", category: "Supplements" },
    { front: "What is PB Assist+ used for?", back: "Probiotic for gut health, digestive support, immune function. 6 billion CFUs, double-layer capsule delivery. Take 1-3 daily for microbiome balance.", category: "Supplements" },
    { front: "What are Mito2Max capsules used for?", back: "Sustained energy, mitochondrial support, stamina. Acetyl-L-carnitine, Oligonol, Quercetin, Ashwagandha. Take 2 capsules AM for cellular energy production.", category: "Supplements" },
    { front: "What are DDR Prime softgels used for?", back: "Cellular vitality complex, DNA repair support, longevity. Frankincense, Wild Orange, Lemongrass, Thyme, Summer Savory, Clove, Niaouli. Take 1-4 softgels daily.", category: "Supplements" },
    
    // PET SAFETY
    { front: "What oils are TOXIC to cats?", back: "Tea Tree, Oregano, Wintergreen, Clove, Thyme, Birch, Cassia, Cinnamon Bark. Cats lack glucuronyl transferase enzyme to metabolize phenols. Aromatic ONLY in separate room with escape route.", category: "Pet Safety" },
    { front: "What is safe dilution for dogs topically?", back: "Dilute 1:3 to 1:4 for topical use. Internal dosing: 1 drop per 50 lbs body weight. Safe oils: Lavender, Frankincense, Copaiba, Digestive Blend, Calming Blend. Always introduce gradually.", category: "Pet Safety" },
    { front: "What oils can horses tolerate neat (undiluted)?", back: "Horses can take neat oils on hooves (Tea Tree, Oregano for thrush). Muscle massage: 10-20 drops diluted 1:1. Always let horse smell first - if they turn away, don't use.", category: "Pet Safety" },
    
    // CARRIER OILS & ACCESSORIES
    { front: "What is Fractionated Coconut Oil used for?", back: "Carrier oil for diluting essential oils. Odorless, colorless, liquid at all temperatures. Won't stain fabrics. Use for massage, topical blends, roller bottles.", category: "Carrier Oils" },
    { front: "What diffuser should beginners start with?", back: "Petal Diffuser (compact, easy), Lumo Diffuser (customizable light), or Aroma Lite Diffuser (budget-friendly). Run 3-4 hours, use 4-8 drops total. Clean weekly.", category: "Accessories" },
    
    // ADVANCED OILS
    { front: "What is Melissa essential oil used for?", back: "Calming, uplifting, supports healthy immune function. Very precious and rare oil. Supports mood and occasional nervous tension. 1-2 drops diluted.", category: "Advanced Oils" },
    { front: "What is Blue Tansy essential oil used for?", back: "Soothes skin irritation, promotes clear complexion. Chamazulene content gives blue color. Anti-inflammatory. Apply diluted to skin or add to facial serum.", category: "Advanced Oils" },
    { front: "What is Roman Chamomile essential oil used for?", back: "Calming for children and adults, soothes skin, supports restful sleep. Gentle and safe. Diffuse or apply diluted. Good for sensitive skin and emotions.", category: "Advanced Oils" },
    { front: "What is Neroli essential oil used for?", back: "Calming, skin rejuvenation, exclusive luxury oil. Orange blossom distillation. Supports emotional balance and radiant skin. Very precious, use sparingly.", category: "Advanced Oils" },
    
    // PROPRIETARY BLENDS - ADVANCED
    { front: "What is Zendocrine Blend used for?", back: "Detoxification support, liver and kidney health. Rosemary, Cilantro, Juniper Berry, Tangerine, Geranium. Take softgels or apply diluted over liver area.", category: "Detox Blends" },
    { front: "What is HD Clear Blend used for?", back: "Clear skin, acne support, blemish reduction. Topical foaming face wash and oil blend. Use AM/PM for clarifying skin and reducing breakouts.", category: "Skin Blends" },
    { front: "What is Immortelle Anti-Aging Blend used for?", back: "Reduce fine lines, wrinkles, skin aging. Frankincense, Sandalwood, Lavender, Myrrh, Helichrysum, Rose. Premium facial serum for cellular skin renewal.", category: "Skin Blends" },
    { front: "What is Yarrow|Pom Active Botanical Blend used for?", back: "Cellular anti-aging, skin barrier support, polyphenol power. Yarrow and Pomegranate. Apply to face and neck for advanced age-defying support.", category: "Skin Blends" },
    { front: "What is AromaTouch Massage Blend used for?", back: "Relaxation massage, muscle tension, inflammation support. Cypress, Peppermint, Marjoram, Basil, Grapefruit, Lavender. Apply during massage therapy sessions.", category: "Massage Blends" },
    { front: "What is Stronger Protective Blend used for?", back: "Immune support, vitality, resilience. Cedarwood, Litsea, Frankincense, Rose, Magnolia. Apply diluted to boost strength and seasonal wellness.", category: "Protective Blends" },
    
    // ROLL-ONS & TOUCH BLENDS
    { front: "What are Touch/Roll-on blends?", back: "Pre-diluted essential oils in rollerball applicators. Ready to use, perfect for on-the-go, kids, sensitive skin. Apply to pulse points, temples, feet, or affected areas. No additional dilution needed.", category: "Touch Products" },
    
    // ADDITIONAL SINGLE OILS
    { front: "What is Clary Sage essential oil used for?", back: "Hormonal balance, menstrual comfort, calming. Supports women through monthly cycles and menopause. Apply diluted to abdomen or diffuse. Avoid first trimester pregnancy.", category: "Herb Oils" },
    { front: "What is Patchouli essential oil used for?", back: "Grounding, skin health, mood balancing. Earthy and rich. Supports complexion and emotional stability. Apply diluted or diffuse for meditative atmosphere.", category: "Herb Oils" },
    { front: "What is Fennel essential oil used for?", back: "Digestive support, metabolism, women's monthly comfort. Licorice-like aroma. Take in capsule or apply diluted to abdomen. Supports healthy digestion.", category: "Herb Oils" },
    { front: "What is Dill essential oil used for?", back: "Digestive support, respiration, calming. Culinary and therapeutic. Supports healthy digestion and breathing. Gentle enough for children when diluted.", category: "Herb Oils" },
    { front: "What is Petitgrain essential oil used for?", back: "Calming, skin health, sleep support. From orange tree leaves. Less photosensitive than citrus oils. Supports relaxation and healthy-looking skin.", category: "Herb Oils" },
    { front: "What is Juniper Berry essential oil used for?", back: "Detox support, kidney health, skin purification. Cleansing and purifying. Supports urinary tract and acts as natural toner. Apply diluted or take in capsule.", category: "Herb Oils" },
    { front: "What is Lemongrass essential oil used for?", back: "Digestive support, muscle recovery, purifying. Supports healthy inflammation response and joint comfort. Apply diluted or take internally. Insect repellent properties.", category: "Herb Oils" },
    { front: "What is Tansy essential oil used for?", back: "Immune support, nervous system calming. Blue Tansy has anti-inflammatory properties. Supports skin health and emotional balance. Apply diluted.", category: "Herb Oils" },
    { front: "What is Arborvitae essential oil used for?", back: "Wood preservation, protective, grounding. Spiritual connection and meditation. Supports immune health. Diffuse for sacred atmosphere. NOT for internal use.", category: "Wood/Resin Oils" },
    { front: "What is Magnolia essential oil used for?", back: "Calming, emotional support, skin benefits. Supports relaxation and reduces stress. Floral and uplifting. Apply diluted or diffuse for peaceful environment.", category: "Floral Oils" },
    { front: "What is Neroli essential oil used for?", back: "Skin rejuvenation, calming, luxury oil. Orange blossom distillation. Supports skin elasticity and emotional tranquility. Very precious - 1 drop goes far.", category: "Floral Oils" },
    { front: "What is Hawaiian Sandalwood used for?", back: "Meditation, skin health, sacred practices. Sustainably sourced Hawaiian variety. Supports calm mood and skin vitality. Premium grounding oil.", category: "Wood/Resin Oils" },
    { front: "What is White Fir essential oil used for?", back: "Respiratory support, muscle comfort, grounding. Forest-fresh aroma. Supports airways and soothes muscles after activity. Diffuse or apply diluted to chest.", category: "Wood/Resin Oils" },
    { front: "What is Black Spruce essential oil used for?", back: "Respiratory support, grounding, emotional balance. Northern forest oil. Supports airways and provides deep grounding. Apply over heart or diffuse.", category: "Wood/Resin Oils" },
    { front: "What is Hinoki essential oil used for?", back: "Meditation, grounding, skin health. Japanese cypress wood. Supports calm mood and skin rejuvenation. Precious oil for spiritual practices.", category: "Wood/Resin Oils" },
    
    // ADDITIONAL SPECIALIZED OILS
    { front: "What is Copaiba Softgels used for?", back: "Daily anti-inflammatory support, CB2 receptor activation. Pain management, nervous system support. Take 1-2 softgels daily. Supports healthy inflammation response.", category: "Supplements" },
    { front: "What is Oregano Softgels used for?", back: "Acute immune challenges, powerful antimicrobial. Use short-term (7-14 days) for strong immune support. Take 1 softgel 1-2x daily with food. Not for long-term use.", category: "Supplements" },
    { front: "What is Lavender Softgels used for?", back: "Sleep support, calming, anxiety relief. Convenient internal use. Take 1-2 before bed or during stressful times. Promotes restful sleep and emotional calm.", category: "Supplements" },
    { front: "What is Peppermint Softgels (Beadlets) used for?", back: "Fresh breath, digestive support, focus boost. Convenient single-serving. Dissolve in mouth or swallow. Great for travel and on-the-go digestive comfort.", category: "Supplements" },
    { front: "What is Lemon Softgels (Beadlets) used for?", back: "Detox support, flavor for water, cleansing. Single-serving convenience. Dissolve in water or swallow for internal cleansing support.", category: "Supplements" },
    
    // BLENDS - ADDITIONAL
    { front: "What is Purify Cleansing Blend used for?", back: "Air purification, surface cleaning, uplifting. Lemon, Lime, Siberian Fir, Citronella, Melaleuca, Cilantro. Diffuse to purify air or add to cleaning solutions.", category: "Blends" },
    { front: "What is TerraShield Outdoor Blend used for?", back: "Natural outdoor protection, insect deterrent. Ylang Ylang, Cedarwood, Catnip, Lemon Eucalyptus, Litsea, Arborvitae, Nootka, Vanilla. Apply before outdoor activities.", category: "Blends" },
    { front: "What is Anchor Grounding Blend used for?", back: "Stability, courage, grounding during change. Lavender, Cedarwood, Sandalwood, Cinnamon, Frankincense, Black Pepper, Patchouli. Apply to feet or pulse points.", category: "Blends" },
    { front: "What is Align Centering Blend used for?", back: "Alignment, trust, clarity. Bergamot, Coriander, Marjoram, Peppermint, Geranium, Basil, Rose, Jasmine. Apply to wrists and heart area for emotional centering.", category: "Blends" },
    { front: "What is Arise Enlightening Blend used for?", back: "Reaching potential, motivation, personal growth. Grapefruit, Lemon, Osmanthus, Melissa, Siberian Fir. Apply to pulse points for inspiration and goal achievement.", category: "Blends" },
    { front: "What is Cheer Uplifting Blend used for?", back: "Happiness, optimism, positive outlook. Wild Orange, Clove, Star Anise, Lemon Myrtle, Nutmeg, Vanilla, Ginger, Cinnamon, Zdravetz. Diffuse or apply to boost mood.", category: "Blends" },
    { front: "What is Console Comforting Blend used for?", back: "Grief support, emotional healing, comfort during loss. Frankincense, Patchouli, Ylang Ylang, Labdanum, Sandalwood, Rose, Osmanthus. Apply over heart area.", category: "Blends" },
    { front: "What is Forgive Renewing Blend used for?", back: "Letting go, forgiveness, emotional release. Spruce, Bergamot, Juniper Berry, Myrrh, Arborvitae, Nootka, Thyme, Citronella. Apply to wrists and heart to release past hurts.", category: "Blends" },
    { front: "What is Motivate Encouraging Blend used for?", back: "Confidence, courage, motivation. Peppermint, Clementine, Coriander, Basil, Yuzu, Melissa, Rosemary, Vanilla. Apply to pulse points before important tasks.", category: "Blends" },
    { front: "What is Passion Inspiring Blend used for?", back: "Rediscover passion, creativity, excitement. Cardamom, Cinnamon, Ginger, Clove, Sandalwood, Jasmine, Vanilla, Damiana. Apply to sacral area or diffuse for inspiration.", category: "Blends" },
    { front: "What is Peace Reassuring Blend used for?", back: "Anxiety relief, reassurance, tranquility. Vetiver, Lavender, Ylang Ylang, Frankincense, Clary Sage, Marjoram, Labdanum, Spearmint. Apply to neck and wrists for calm.", category: "Blends" },
    
    // SKIN CARE PRODUCTS
    { front: "What is the Veráge Skin Care line?", back: "Anti-aging facial care system. Cleanser, toner, immortelle serum, moisturizer, eye serum. Uses CPTG oils for cellular skin renewal. Professional-grade results.", category: "Skin Care" },
    { front: "What is Tightening Serum used for?", back: "Reduce appearance of fine lines, firm skin, anti-aging. Frankincense, Sandalwood, Myrrh. Apply to face and neck AM/PM for lifting effect.", category: "Skin Care" },
    { front: "What is Hydrating Cream used for?", back: "Deep moisture, skin barrier support, nourishment. Rich cream with essential oils for dry, mature, or stressed skin. Use AM/PM after serum.", category: "Skin Care" },
    
    // DILUTION & SAFETY
    { front: "What is standard dilution ratio for adults?", back: "1:1 (1 drop oil to 1 drop carrier) for most applications. Sensitive areas: 1:3. Hot oils (Oregano, Cinnamon): 1:4 to 1:10. Neat (undiluted) only for specific oils like Lavender, Frankincense, Tea Tree on small areas.", category: "Safety & Dilution" },
    { front: "What is dilution ratio for children 6-12 years?", back: "1:5 dilution (1 drop oil to 5 drops carrier). Reduced internal dosing. Safe oils: Lavender, Frankincense, Digestive Blend, Respiratory Blend. Always supervise use.", category: "Safety & Dilution" },
    { front: "What is dilution ratio for infants and toddlers?", back: "1:10 dilution minimum (1 drop oil to 10 drops carrier). Aromatic use preferred. Avoid hot oils. Use gentlest oils: Lavender, Roman Chamomile, Dill. Consult pediatrician first.", category: "Safety & Dilution" },
    { front: "What oils are photosensitive?", back: "ALL cold-pressed citrus oils: Lemon, Lime, Wild Orange, Grapefruit, Bergamot, Tangerine. Avoid sun exposure 12-24 hours after topical application. Can cause burns/pigmentation.", category: "Safety & Dilution" },
    { front: "What oils should be avoided during pregnancy?", back: "First trimester: Clary Sage, Rosemary, Basil, Thyme, Oregano, Cassia, Cinnamon Bark. Safe throughout: Lavender, Wild Orange, Frankincense (diluted). Always consult doctor.", category: "Safety & Dilution" },
    { front: "What oils interact with blood thinners?", back: "Wintergreen, Birch, Clove (high methyl salicylate and eugenol). Can increase bleeding risk. Avoid if on Warfarin, Heparin, or aspirin therapy. Consult physician.", category: "Safety & Dilution" },
    
    // APPLICATION METHODS
    { front: "What is aromatic application?", back: "Inhaling essential oils via diffuser, direct inhalation, or aromatic inhaler. Affects limbic system, emotions, and respiratory health. Safest method for pets and children. Use 4-8 drops in diffuser.", category: "Application Methods" },
    { front: "What is topical application?", back: "Applying oils to skin, diluted or neat depending on oil. Reaches bloodstream in 30 seconds. Apply to pulse points, bottoms of feet, affected areas. Always patch test first.", category: "Application Methods" },
    { front: "What is internal application?", back: "Taking oils orally in water, capsule, or under tongue. Only use GRAS-certified therapeutic grade oils. 1-2 drops typical dose. Supports digestive, immune, cellular systems. Not all oils safe internally.", category: "Application Methods" },
    { front: "What are the best areas for topical application?", back: "Bottoms of feet (fast absorption, large pores), pulse points (wrists, neck, temples), spine (near nervous system), abdomen (digestive support), affected areas (joints, muscles).", category: "Application Methods" },
    { front: "How do you use oils in a bath?", back: "NEVER add oils directly to bath water (they float and can burn skin). Mix 4-6 drops with Epsom salt, honey, or bath gel FIRST, then add to tub. Disperses oils safely.", category: "Application Methods" },
    
    // ADDITIONAL TREE/WOOD OILS
    { front: "What is Siberian Fir essential oil used for?", back: "Respiratory support, grounding, emotional balance. Northern forest clarity. Cooling and centering. Diffuse for mental focus or apply diluted to chest. Pairs with Douglas Fir.", category: "Wood/Resin Oils" },
    { front: "What is Himalayan Fir essential oil used for?", back: "Respiratory support, grounding, winter wellness. Mountain forest freshness. Supports airways and provides emotional stability. Seasonal immune support oil.", category: "Wood/Resin Oils" },
    { front: "What is Northern Escape Blend used for?", back: "Grounding forest blend, emotional centering. Siberian Fir, Frankincense, and grounding woods. Apply to pulse points or diffuse for northern forest bathing experience.", category: "Blends" },
    
    // MORE FLORAL OILS
    { front: "What is Blue Chamomile (Blue Tansy) used for?", back: "Skin soothing, anti-inflammatory, emotional calming. Deep blue color from chamazulene. Supports clear complexion and reduces redness. Apply diluted to irritated skin.", category: "Floral Oils" },
    { front: "What is German Chamomile used for?", back: "Powerful anti-inflammatory, skin support, calming. Deeper blue than Roman Chamomile. Supports healthy inflammation response. More therapeutic, less aromatic than Roman.", category: "Floral Oils" },
    { front: "What is Osmanthus essential oil used for?", back: "Uplifting, skin rejuvenation, respiratory support. Precious floral from Asia. Supports mood elevation and skin radiance. Use sparingly in blends.", category: "Floral Oils" },
    
    // SPICE OILS EXPANDED
    { front: "What is Coriander essential oil used for?", back: "Digestive support, muscle relaxation, calming. Sweet and spicy. Supports healthy digestion and soothes tension. Take internally or apply diluted to abdomen.", category: "Spice Oils" },
    { front: "What is Cumin essential oil used for?", back: "Digestive support, metabolism, warming. Culinary spice oil. Supports healthy gut function and circulation. Use in cooking or take in capsule.", category: "Spice Oils" },
    
    // GRASS/LEAF OILS
    { front: "What is Citronella essential oil used for?", back: "Insect repellent, purifying, uplifting. Natural outdoor protection. Diffuse outdoors or apply diluted before outdoor activities. Found in TerraShield blend.", category: "Grass/Leaf Oils" },
    { front: "What is Palmarosa essential oil used for?", back: "Skin health, emotional balance, uplifting. Supports clear complexion and cardiovascular health. Apply diluted or diffuse. Rose-like aroma at lower cost.", category: "Grass/Leaf Oils" },
    { front: "What is Litsea essential oil used for?", back: "Cleansing, uplifting, skin purifying. Supports clear skin and positive outlook. Citrus-like aroma. Apply diluted or diffuse for refreshing atmosphere.", category: "Grass/Leaf Oils" },
    
    // UNIQUE/RARE OILS
    { front: "What is Spikenard essential oil used for?", back: "Spiritual grounding, skin rejuvenation, calming. Biblical oil used in ancient anointing. Supports meditation and emotional centering. Very grounding and precious.", category: "Ancient Oils" },
    { front: "What is Melissa (Lemon Balm) essential oil used for?", back: "Calming, uplifting, immune support. Extremely rare and precious (takes 3 tons of plant material for 1 lb oil). Supports mood and occasional nervous tension. 1-2 drops only.", category: "Rare Oils" },
    { front: "What is Yarrow essential oil used for?", back: "Skin barrier support, anti-aging, cellular protection. Blue color from chamazulene. Supports skin resilience and healthy aging. Rare European sourcing.", category: "Rare Oils" },
    { front: "What is Blue Lotus essential oil used for?", back: "Spiritual awakening, meditation, sacred practices. Ancient Egyptian oil. Supports deep meditation and spiritual connection. Very rare and precious.", category: "Ancient Oils" },
    
    // PROTOCOL-BASED KNOWLEDGE
    { front: "What is the best morning energy protocol?", back: "Diffuse: Peppermint + Wild Orange. Internal: 1 drop Lemon in water. Topical: Peppermint to back of neck. Take Mito2Max capsules. Supports sustained energy without caffeine crash.", category: "Protocols" },
    { front: "What is the best sleep protocol?", back: "Diffuse: Lavender + Cedarwood + Vetiver 30 min before bed. Topical: Serenity blend to bottoms of feet. Internal: Serenity softgels. No screens 1 hour before bed.", category: "Protocols" },
    { front: "What is the immune support protocol?", back: "Daily: On Guard softgels. Diffuse: On Guard blend. Topical: Apply On Guard to bottoms of feet. At first sign of illness: add Oregano softgels for 7 days. Frankincense for cellular immune support.", category: "Protocols" },
    { front: "What is the detox protocol starter?", back: "Morning: 2 drops Lemon in 16oz glass of water. Daily: Zendocrine softgels. Support: PB Assist+ probiotic, GI Cleansing Formula. Hydration: Body weight ÷ 2 = oz water daily.", category: "Protocols" },
    { front: "What is the pain relief protocol?", back: "Acute: Deep Blue Rub to affected area. Internal: Copaiba softgels 2x daily. Chronic: Add Turmeric capsules and Frankincense. Ice for inflammation, heat for muscle tension.", category: "Protocols" },
    { front: "What is the anxiety relief protocol?", back: "Immediate: Lavender aromatic inhalation. Daily: Adaptiv capsules. Topical: Bergamot to pulse points 2x daily. Diffuse: Lavender + Frankincense + Vetiver blend. Long-term: Lifelong Vitality for nervous system support.", category: "Protocols" },
    { front: "What is the digestive support protocol?", back: "Before meals: DigestZen softgel. After meals: Apply DigestZen diluted to abdomen clockwise. Daily: PB Assist+ probiotic. Acute upset: 1 drop Peppermint or Ginger in water.", category: "Protocols" },
    { front: "What is the hormone balance protocol for women?", back: "Daily: ClaryCalm roll-on to abdomen and ankles. Internal: Clary Sage or Geranium in capsule during challenging days. Support: Lifelong Vitality, Phytoestrogen Complex. Diffuse: Lavender + Clary Sage.", category: "Protocols" },
    
    // BUSINESS KNOWLEDGE
    { front: "What is PV (Personal Volume)?", back: "Point value assigned to products for commission calculation. Typically 1 PV = $1 retail. Need minimum 100 PV monthly to qualify for commissions and rank maintenance.", category: "Business Terms" },
    { front: "What is LRP (Loyalty Rewards Program)?", back: "Monthly autoship earning free product credits. Order 125+ PV monthly, get 10-30% back in points. Points never expire. Ensures customers order consistently = your recurring income.", category: "Business Terms" },
    { front: "What is the typical retail profit margin?", back: "25% wholesale discount from retail price. Buy at wholesale, sell at retail, keep the difference. Example: $40 retail oil costs you $30 wholesale = $10 profit per bottle sold.", category: "Business Terms" },
    { front: "What is fast start bonus?", back: "Extra commissions on new enrollments in first 60 days (typically 20-30% of their order). Incentive to help new members get started strong. Paid in addition to regular commissions.", category: "Business Terms" },
    { front: "What is unilevel commission?", back: "Earning percentage (2-7%) on downline volume. Level 1 = people you enrolled. Level 2 = people they enrolled. Deeper levels = more passive income as team grows.", category: "Business Terms" },
    { front: "What is rank advancement?", back: "Achieving higher leadership levels (Silver, Gold, Platinum, Diamond) by hitting PV and team volume requirements. Higher ranks = higher commission percentages and bonuses.", category: "Business Terms" },
    
    // USAGE TIPS
    { front: "How many drops in a standard diffuser?", back: "4-8 drops total for 100-200mL water capacity. Small room: 4-5 drops. Large room: 6-8 drops. Run 3-4 hours max. Clean weekly with vinegar to prevent buildup.", category: "Usage Tips" },
    { front: "What is the shelf life of essential oils?", back: "Citrus oils: 1-2 years (refrigerate after opening). Most other oils: 3-5 years. Thick oils (Myrrh, Vetiver): 5-8 years. Store in cool, dark place. Oxidation degrades therapeutic value.", category: "Usage Tips" },
    { front: "Can you apply oils to broken skin?", back: "Avoid broken skin with hot oils (Oregano, Cinnamon, Clove). Safe for wounds: Lavender, Tea Tree, Frankincense, Myrrh (diluted). Always dilute on broken skin. Supports healing without stinging.", category: "Usage Tips" },
    { front: "What is the 'hot oil' list?", back: "Oils requiring heavy dilution due to skin sensitivity: Oregano, Thyme, Cinnamon Bark, Cassia, Clove, Lemongrass, Wintergreen. Always dilute 1:4 or more. Can cause burning sensation if used neat.", category: "Usage Tips" },
    { front: "Can you ingest essential oils in plastic bottles?", back: "NO. Essential oils degrade plastic and leach chemicals. Use glass or stainless steel ONLY. For water: glass mason jar or stainless steel bottle. Never use plastic water bottles with oils.", category: "Usage Tips" },
    { front: "What is the proper way to add oils to water?", back: "Oils don't mix with water (lipophobic). Shake bottle vigorously before each sip OR use glass straw to drink oil layer first. Alternative: Mix with honey first, then add to water for emulsification.", category: "Usage Tips" },
    { front: "How do you make a roller bottle blend?", back: "10mL roller bottle: Add 15-20 drops total essential oils, fill rest with Fractionated Coconut Oil. Shake well. Label with ingredients and date. Good for: sleep, focus, pain, mood support blends.", category: "Usage Tips" },
    { front: "How do you make a spray bottle blend?", back: "2oz glass spray bottle: Add 20-30 drops essential oils, 1 tsp witch hazel or alcohol (emulsifier), fill with distilled water. Shake before each use. Good for: room spray, linen spray, yoga mat cleaner.", category: "Usage Tips" },
    { front: "What is a veggie capsule protocol?", back: "Size 00 veggie capsule: Add 3-5 drops essential oils, fill rest with Fractionated Coconut Oil (prevents stomach irritation). Swallow with food. Good for: immune support, detox, internal targeted delivery.", category: "Usage Tips" },
    
    // SPECIFIC CONDITIONS
    { front: "What oils help with headaches?", back: "Peppermint to temples and back of neck. Lavender for tension headaches. Frankincense for migraines. Wintergreen diluted for severe pain. Past Tense blend (ready-to-use roller) for convenience.", category: "Common Conditions" },
    { front: "What oils help with seasonal allergies?", back: "TriEase softgels (Lemon, Lavender, Peppermint blend). Breathe blend diffused or aromatic inhaler. Lavender for histamine response. Peppermint for clear breathing. Start 2 weeks before allergy season.", category: "Common Conditions" },
    { front: "What oils help with acne?", back: "Tea Tree (antibacterial), Lavender (soothing), Frankincense (cellular repair). HD Clear system. Apply diluted to blemishes. Melaleuca Touch roller for convenience. Use consistently for 4-6 weeks.", category: "Common Conditions" },
    { front: "What oils help with muscle soreness?", back: "Deep Blue Rub (immediate relief), Copaiba softgels (internal inflammation), Wintergreen diluted, Marjoram for tension. Apply to affected muscles. Ice first 24 hours, then oils with gentle massage.", category: "Common Conditions" },
    { front: "What oils help with focus and ADHD?", back: "InTune Focus Blend to temples and neck. Vetiver to bottoms of feet (grounding). Rosemary for memory. Peppermint for alertness. Diffuse during study/work. Supports sustained attention without stimulants.", category: "Common Conditions" },
    { front: "What oils help with nausea?", back: "Peppermint aromatic inhalation (immediate relief). Ginger topical to abdomen or in capsule. DigestZen blend. Onset 30-60 seconds for aromatic use. Safe for pregnancy nausea (aromatic only, no internal first trimester).", category: "Common Conditions" },
    { front: "What oils help with cold and flu?", back: "On Guard softgels daily (prevention). Oregano softgels (acute infection, 7-10 days). Breathe blend for congestion. Frankincense for immune support. Lemon in water for vitamin C. Start at first symptoms.", category: "Common Conditions" },
    { front: "What oils help with stress and overwhelm?", back: "Adaptiv capsules daily. Lavender aromatic or topical. Balance blend to feet for grounding. Bergamot for cortisol regulation. Frankincense for meditative calm. Diffuse: Lavender + Bergamot + Frankincense.", category: "Common Conditions" },
    
    // CLEANING & HOME
    { front: "How do you make all-purpose cleaner with oils?", back: "16oz glass spray bottle: 10 drops Lemon, 8 drops Tea Tree, 6 drops Wild Orange, 2 tbsp white vinegar, 1 tsp castile soap, fill with water. Shake before use. Cleans counters, bathrooms, floors.", category: "Home & Cleaning" },
    { front: "What oils purify air quality?", back: "Purify blend (Lemon, Lime, Siberian Fir, Citronella, Tea Tree, Cilantro). Diffuse to eliminate odors, airborne pathogens. Also: Tea Tree, Eucalyptus, Lemon. Run 4 hours in common areas.", category: "Home & Cleaning" },
    { front: "What oils are natural insect repellent?", back: "TerraShield Outdoor Blend (Cedarwood, Lemon Eucalyptus, Catnip, Litsea). Also: Citronella, Peppermint, Eucalyptus, Lemongrass. Apply before outdoor activities. Reapply every 2-3 hours.", category: "Home & Cleaning" },
    { front: "How do you make laundry booster with oils?", back: "Add 3-5 drops Lemon or Purify blend to wool dryer balls. Freshens laundry naturally. Also add 10 drops to unscented detergent per load. Avoid oils in washer with HE machines.", category: "Home & Cleaning" },
    
    // EMOTIONAL AROMATHERAPY
    { front: "What is the Emotional Aromatherapy Kit?", back: "6 blends: Motivate (encouraging), Cheer (uplifting), Passion (inspiring), Forgive (renewing), Console (comforting), Peace (reassuring). Apply to pulse points for emotional support throughout day.", category: "Emotional Support" },
    { front: "What oils support grief and loss?", back: "Console blend (primary). Frankincense over heart. Rose for deep heart healing. Lavender for calm. Vetiver for grounding. Apply over heart area and hold space for emotions.", category: "Emotional Support" },
    { front: "What oils support confidence?", back: "Motivate blend. Bergamot (self-worth). Wild Orange (joy). Peppermint (mental clarity). Grapefruit (self-confidence). Apply to pulse points before important events or presentations.", category: "Emotional Support" },
    { front: "What oils support letting go of anger?", back: "Forgive blend. Lavender (calming). Frankincense (perspective). Ylang Ylang (heart-opening). Apply over heart and solar plexus. Breathe deeply and visualize release.", category: "Emotional Support" },
    
    // CHAKRA CONNECTIONS
    { front: "What oils support the Root Chakra?", back: "Vetiver, Cedarwood, Myrrh, Patchouli, Balance blend. Support grounding, safety, stability. Apply to bottoms of feet and base of spine. Red energy - foundation and security.", category: "Chakra Support" },
    { front: "What oils support the Sacral Chakra?", back: "Wild Orange, Ylang Ylang, Sandalwood, Clary Sage, Cardamom. Support creativity, sensuality, emotional flow. Apply to lower abdomen. Orange energy - joy and creation.", category: "Chakra Support" },
    { front: "What oils support the Solar Plexus Chakra?", back: "Peppermint, Lemon, Grapefruit, Ginger, Digestive Blend. Support personal power, confidence, digestion. Apply to upper abdomen. Yellow energy - strength and will.", category: "Chakra Support" },
    { front: "What oils support the Heart Chakra?", back: "Rose, Lavender, Bergamot, Geranium, Ylang Ylang, Jasmine. Support love, compassion, emotional healing. Apply over heart center. Green/pink energy - love and connection.", category: "Chakra Support" },
    { front: "What oils support the Throat Chakra?", back: "Tea Tree, Peppermint, Eucalyptus, Spearmint, Basil. Support clear communication, truth, purification. Apply to throat area diluted. Blue energy - expression and authenticity.", category: "Chakra Support" },
    { front: "What oils support the Third Eye Chakra?", back: "Lavender, Frankincense, Sandalwood, Clary Sage, Rosemary. Support intuition, wisdom, clarity. Apply to forehead and temples. Indigo energy - vision and insight.", category: "Chakra Support" },
    { front: "What oils support the Crown Chakra?", back: "Frankincense, Lavender, Sandalwood, Myrrh, Rose, Lotus. Support spiritual connection, divine awareness, enlightenment. Apply to crown of head. Violet/white energy - unity and transcendence.", category: "Chakra Support" },
    
    // SKIN CONDITIONS
    { front: "What oils help with eczema?", back: "Lavender (soothing), Helichrysum (regeneration), German Chamomile (anti-inflammatory), Copaiba (itch relief). Dilute 1:3 in carrier oil. Apply to affected areas 2-3x daily. Avoid fragranced products.", category: "Skin Conditions" },
    { front: "What oils help with aging/wrinkles?", back: "Frankincense, Sandalwood, Myrrh, Rose, Helichrysum. Use Immortelle blend or Yarrow|Pom. Apply to face and neck AM/PM. Supports cellular renewal and collagen production.", category: "Skin Conditions" },
    { front: "What oils help with scars?", back: "Helichrysum (tissue regeneration), Frankincense (cellular repair), Lavender (skin renewal), Myrrh (deep healing). Apply neat or diluted 2x daily. Massage in circular motions. Best results with fresh scars, but helps old scars too.", category: "Skin Conditions" },
    { front: "What oils help with sunburn?", back: "Lavender (cooling, skin repair) - apply neat immediately. Helichrysum (tissue regeneration). Peppermint diluted (cooling relief). Frankincense (cellular healing). Avoid further sun exposure during healing.", category: "Skin Conditions" },
    
    // RESPIRATORY SUPPORT
    { front: "What is the respiratory support layering technique?", back: "Layer oils on chest: Frankincense (base), then Breathe blend, then Eucalyptus or Peppermint (top). Each layer serves different function. Apply every 2-3 hours during acute respiratory challenges.", category: "Advanced Techniques" },
    { front: "What oils open airways fastest?", back: "Peppermint (immediate cooling), Eucalyptus (mucolytic), Breathe blend (complete respiratory support). Aromatic inhalation: cup hands over nose, breathe deeply. Relief in 30-60 seconds.", category: "Common Conditions" },
    
    // WOMEN'S HEALTH
    { front: "What oils support menstrual cramps?", back: "ClaryCalm blend (hormone balance), Lavender (muscle relaxation), Marjoram (cramp relief), Clary Sage (hormone support). Apply diluted to lower abdomen and lower back. Warm compress enhances absorption.", category: "Women's Health" },
    { front: "What oils support hot flashes?", back: "Peppermint (cooling), Clary Sage (hormone balance), Lavender (calming). Apply to back of neck, chest, pulse points. Keep Peppermint roller in purse for on-the-go relief. Avoid hot oil triggers.", category: "Women's Health" },
    { front: "What oils support fertility?", back: "Geranium (hormone balance), Clary Sage (reproductive health), Ylang Ylang (libido), Frankincense (cellular health). Apply diluted to lower abdomen and feet. Reduce stress with Lavender. Support overall wellness with Lifelong Vitality.", category: "Women's Health" },
    
    // MEN'S HEALTH
    { front: "What oils support testosterone and vitality?", back: "Sandalwood (testosterone support), Fennel (hormone balance), Pine (masculine energy), Vetiver (grounding). Take internally or apply diluted to lower abdomen, feet. Support with Lifelong Vitality.", category: "Men's Health" },
    { front: "What oils help with athletic performance?", back: "Pre-workout: Peppermint (energy and focus). During: Lemon in water (hydration). Post-workout: Deep Blue Rub (recovery), Copaiba softgels (inflammation). Mito2Max for sustained stamina.", category: "Men's Health" },
    
    // CHILDREN'S WELLNESS
    { front: "What oils are safest for babies 0-6 months?", back: "Aromatic ONLY: Lavender (diffused in room with door open, max 10 minutes). Extremely diluted topical (1:10+): Lavender for diaper rash, Roman Chamomile for colic. Always consult pediatrician first.", category: "Children's Wellness" },
    { front: "What oils help teething pain in babies?", back: "Clove diluted 1:10 applied to gums (tiny amount on finger) OR Lavender diluted on jaw/cheek externally. Roman Chamomile aromatic for soothing. Never apply neat to baby's mouth. Supervise closely.", category: "Children's Wellness" },
    { front: "What oils help kids focus for homework?", back: "InTune Focus Blend to back of neck. Vetiver to bottoms of feet (grounding). Peppermint aromatic (alertness). Rosemary diffused (memory). Create homework ritual with same blend daily.", category: "Children's Wellness" },
    { front: "What oils help bedtime routine for kids?", back: "Lavender + Cedarwood diffused 30 min before bed. Serenity or Calming blend diluted to feet. Vetiver for very restless children. Make bedtime blend in roller bottle for consistency.", category: "Children's Wellness" },
    
    // SENIOR WELLNESS
    { front: "What oils support cognitive health in seniors?", back: "Frankincense (neuroprotection), Rosemary (memory), Peppermint (mental clarity), Melissa (nervous system support). Apply to temples, diffuse. Take Lifelong Vitality for comprehensive brain support.", category: "Senior Wellness" },
    { front: "What oils help with arthritis in seniors?", back: "Copaiba (CB2 pain relief), Turmeric (inflammation), Deep Blue Rub (topical comfort), Frankincense (cellular repair). Gentle dilutions (1:2). Apply to affected joints 2-3x daily.", category: "Senior Wellness" },
    
    // ADDITIONAL SPECIALIZED KNOWLEDGE
    { front: "What is GC/MS testing?", back: "Gas Chromatography/Mass Spectrometry. Tests essential oil purity, detects adulterants, verifies no pesticides/heavy metals. Each batch tested. Ensures therapeutic grade vs cheap grocery store oils with fillers.", category: "Quality & Purity" },
    { front: "What is CPTG certification?", back: "Certified Pure Therapeutic Grade. doTERRA's quality standard. Ensures: no fillers, no synthetics, correct aromatic compounds, safe for internal/topical/aromatic use. Batch codes link to published test results.", category: "Quality & Purity" },
    { front: "Why are therapeutic oils more expensive?", back: "Pure plant material (75 lemons per bottle, 60,000 rose petals per oz). GC/MS testing every batch. Organic/wildcrafted sourcing. No synthetic fillers. 50-70x more potent than dried herbs. Cost per use actually lower.", category: "Quality & Purity" },
    { front: "What is the difference between essential oil and fragrance oil?", back: "Essential oil: Pure plant extraction, therapeutic properties, safe for internal/topical. Fragrance oil: Synthetic chemicals, smells nice, NOT safe for skin/internal use. Grocery store 'lavender oil' often fragrance oil with minimal real lavender.", category: "Quality & Purity" },
    
    // WELLNESS PHILOSOPHY
    { front: "What is the oil triangle of health?", back: "Physical wellness (body support), Emotional wellness (mood/stress), Spiritual wellness (meditation/connection). Essential oils work on all 3 levels simultaneously. Holistic approach for complete wellness.", category: "Wellness Philosophy" },
    { front: "What is aromatic anchoring?", back: "Pairing specific oil with desired emotional state. Example: Use Lavender every time you meditate for 21 days. Brain associates Lavender with calm. Later, Lavender smell instantly triggers relaxation. Neuroplasticity in action.", category: "Wellness Philosophy" },
    { front: "What is the 528Hz frequency connection?", back: "Certain oils vibrate at healing frequencies. 528Hz = Love frequency. Rose, Lavender, Frankincense associated with this frequency. Supports DNA repair, heart chakra, emotional healing. Combine with sound healing.", category: "Wellness Philosophy" },
    
    // ADVANCED PRODUCTS
    { front: "What is Celery Seed essential oil used for?", back: "Detox support, kidney health, joint comfort. Supports healthy uric acid metabolism. Take in capsule. Earthy and herbaceous. Used in cleansing protocols.", category: "Advanced Oils" },
    { front: "What is Goldenrod essential oil used for?", back: "Seasonal respiratory support, skin soothing. Supports histamine response during allergy season. Gentle and effective. Apply diluted or diffuse.", category: "Advanced Oils" },
    { front: "What is Saw Palmetto essential oil used for?", back: "Prostate health, hormonal support for men. Supports urinary tract wellness. Take in capsule. Masculine vitality and longevity oil.", category: "Advanced Oils" },
    { front: "What is Nootka essential oil used for?", back: "Grounding, purifying, outdoor protection. From yellow cedar. Found in protective and grounding blends. Supports emotional stability.", category: "Advanced Oils" },
    { front: "What is Petitgrain essential oil used for?", back: "Calming, skin support, sleep aid. Orange tree leaves and twigs. Less photosensitive than orange oil. Supports relaxation and healthy skin.", category: "Advanced Oils" },
    { front: "What is Spikenard essential oil used for?", back: "Biblical anointing oil, spiritual grounding, skin rejuvenation. Rare and precious. Used in meditation and sacred practices. Supports deep emotional and spiritual work.", category: "Ancient Oils" },
    { front: "What is Cistus essential oil used for?", back: "Skin support, meditation, immune health. Also called Rock Rose. Supports skin tone and provides spiritual grounding. Rare Mediterranean oil.", category: "Advanced Oils" },
    { front: "What is Davana essential oil used for?", back: "Emotional calming, skin smoothing, supports healthy emotions. Unique fruity-floral aroma. From India. Supports emotional balance and skin health.", category: "Advanced Oils" },
    { front: "What is Elemi essential oil used for?", back: "Skin rejuvenation, meditation, respiratory support. Resin oil similar to Frankincense. Supports skin elasticity and spiritual practices. Found in uplifting blends.", category: "Advanced Oils" },
    { front: "What is Laurel Leaf essential oil used for?", back: "Respiratory support, immune health, confidence. Bay laurel. Supports clear breathing and emotional courage. Found in Breathe blend. Apply diluted or diffuse.", category: "Advanced Oils" },
    { front: "What is Spearmint vs Peppermint?", back: "Spearmint: Gentler, sweeter, safe for young children, less menthol. Peppermint: Stronger, cooling, more therapeutic for adults. Both support digestion. Spearmint better for kids under 6.", category: "Comparisons" },
    { front: "What is Cassia vs Cinnamon Bark?", back: "Both are cinnamon family, both support blood sugar and immunity. Cassia: Stronger, hotter, Chinese origin. Cinnamon Bark: Gentler, sweeter, Sri Lankan. Both require heavy dilution and are toxic to cats.", category: "Comparisons" },
    { front: "What is Melissa vs Lemon Balm?", back: "Same plant (Melissa officinalis). 'Melissa' is the essential oil. Takes 3 tons of plant for 1 lb oil, making it one of the rarest oils. Extremely precious. Often adulterated in cheap brands - verify GC/MS testing.", category: "Comparisons" },
    
    // STORAGE & HANDLING
    { front: "How should essential oils be stored?", back: "Cool, dark place away from heat and sunlight. Keep lids tight (oils evaporate). Upright to prevent lid corrosion. Citrus oils can be refrigerated. Away from children and pets. Shelf life: citrus 1-2yr, most 3-5yr, resins 5-8yr.", category: "Storage & Safety" },
    { front: "What do you do if oil gets in eyes?", back: "DO NOT use water (oils repel water). Use Fractionated Coconut Oil or milk to flush eyes. Apply carrier oil to cotton pad, gently wipe. Blink repeatedly. Eyes will clear in 1-2 minutes.", category: "Storage & Safety" },
    { front: "What if someone ingests too much oil?", back: "Drink milk or take Fractionated Coconut Oil (dilutes oil in stomach). Do NOT induce vomiting (aspiration risk). Call Poison Control: 1-800-222-1222. Symptoms: nausea, vomiting, diarrhea. Seek medical attention if severe.", category: "Storage & Safety" },
    { front: "Can essential oils damage surfaces?", back: "YES. Oils can strip finish from wood furniture, dissolve plastic, stain fabrics. Use coasters under bottles. Clean spills immediately. Diffuse away from electronics. Use glass/ceramic/stainless containers only.", category: "Storage & Safety" }
  ];

  const drawCard = () => {
    const randomCard = flashCards[Math.floor(Math.random() * flashCards.length)];
    setSelectedCard(randomCard);
    setCardFlipped(false);
  };

  const flipCard = () => {
    setCardFlipped(!cardFlipped);
    if (!cardFlipped) setScore(score + 1);
  };

  const TierLock = ({ requiredTier, children }) => {
    if (hasAccessToTier(requiredTier)) {
      return children;
    }
    return (
      <div style={{padding:40,textAlign:"center",borderRadius:12,background:"rgba(0,0,0,0.3)",border:"1px solid rgba(245,222,179,0.1)"}}>
        <Lock className="w-12 h-12" style={{color:"var(--rosegold)",opacity:0.5,margin:"0 auto 16px"}} />
        <p style={{fontSize:15,color:"var(--rosegold)",marginBottom:8}}>Unlock with {requiredTier.charAt(0).toUpperCase() + requiredTier.slice(1)} Membership</p>
        <p style={{fontSize:12,color:"rgba(245,222,179,0.6)"}}>Contact your upline to upgrade your training tier</p>
      </div>
    );
  };

  const sections = {
    manifestation: {
      title: "Manifestation Box",
      icon: Target,
      content: <ManifestationManager />
    },
    whatsNew: {
      title: "What's New",
      icon: Star,
      content: (
        <div>
          <div style={{padding:24,borderRadius:16,background:"linear-gradient(135deg, rgba(218,165,112,0.15), rgba(245,222,179,0.08))",border:"1px solid rgba(218,165,112,0.3)",marginBottom:24}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
              <Calendar className="w-6 h-6" style={{color:"var(--rosegold)"}} />
              <h3 style={{fontSize:24,color:"var(--champagne)",fontWeight:700}}>✨ January 2026: New Year, New You</h3>
            </div>
            <p style={{fontSize:14,color:"var(--rosegold)",lineHeight:1.6,marginBottom:10}}>
              Welcome to the most transformative month of the year! Fresh training, exclusive recipes, wellness challenges, and powerful tools to set your 2026 up for SUCCESS.
            </p>
            <p style={{fontSize:12,color:"var(--champagne)",fontStyle:"italic"}}>
              💎 New content drops the 1st of every month - this is your monthly wellness + business treasure chest!
            </p>
          </div>

          <div style={{display:"grid",gap:16}}>
            {/* January Monthly Challenge - Professional Detox Protocols */}
            <div style={{padding:24,borderRadius:16,background:"linear-gradient(135deg, rgba(230,183,165,0.20), rgba(218,165,112,0.12))",border:"2px solid rgba(218,165,112,0.3)",boxShadow:"0 8px 24px rgba(0,0,0,0.4)"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
                <span style={{padding:"6px 14px",borderRadius:20,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",fontSize:11,color:"#1b0b06",fontWeight:700}}>🎯 JANUARY 2026</span>
                <h4 style={{fontSize:18,color:"var(--champagne)",fontWeight:700}}>Science-Based Detox Protocols: 30-90 Day System</h4>
              </div>
              <p style={{fontSize:14,color:"var(--rosegold)",lineHeight:1.7,marginBottom:14}}>
                Professional protocols based on cellular biology research. Choose your duration based on your wellness goals and the science of cellular turnover.
              </p>

              {/* Hydration Calculator */}
              <div style={{padding:16,borderRadius:10,background:"rgba(218,165,112,0.08)",border:"1px solid rgba(218,165,112,0.15)",marginBottom:16}}>
                <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>💧 Smart Hydration Protocol</h5>
                <p style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.7,marginBottom:10}}>
                  <strong>Formula:</strong> Body weight (lbs) ÷ 2 = Daily water oz in glass or stainless steel<br/>
                  <strong>Example:</strong> 150 lbs = 75 oz daily<br/>
                  <strong>Add 12 oz for:</strong> Each hour exercise, caffeinated beverage, or hot environment<br/><br/>
                  <strong>Caffeine Tapering (Prevents Headaches):</strong><br/>
                  Days 1-2: Reduce by 50%<br/>
                  Days 3-4: Reduce by 75%<br/>
                  Days 5-6: Eliminate completely<br/>
                  Day 7+: Can reintroduce 1 cup AM if desired (add 12 oz water to negate diuretic effect)
                </p>
                <p style={{fontSize:10,color:"rgba(245,222,179,0.7)",fontStyle:"italic",marginBottom:8}}>
                  Research: J Am Coll Nutr. 2010 (Hydration and cellular detoxification)
                </p>
                <p style={{fontSize:11,color:"var(--champagne)",fontWeight:600}}>
                  📚 Advanced hydration strategies, electrolyte balance, detox water recipes, and timing protocols taught in the Professional Detox Masterclass
                </p>
              </div>

              {/* Protocol Selection - SCIENCE-BASED */}
              <div style={{padding:16,borderRadius:10,background:"rgba(245,222,179,0.06)",border:"1px solid rgba(245,222,179,0.10)",marginBottom:16}}>
                <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>🗓️ Protocol Duration Options (Science-Backed):</h5>
                <p style={{fontSize:11,color:"var(--rosegold)",marginBottom:12,lineHeight:1.6,fontStyle:"italic"}}>
                  These are overview concepts to help you understand the system. Full step-by-step implementation, supplement stacking guides, meal plans, and troubleshooting protocols taught in the Professional Detox Masterclass.
                </p>
                
                <div style={{marginBottom:14,padding:12,borderRadius:8,background:"rgba(230,183,165,0.08)",border:"1px solid rgba(230,183,165,0.12)"}}>
                  <p style={{fontSize:12,color:"var(--champagne)",fontWeight:700,marginBottom:6}}>30-Day Protocol</p>
                  <p style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.7}}>
                    <strong>Cellular Biology:</strong> One complete supplement cycle (products formulated for 30-day supply). Liver Phase II detox enzymes upregulate by Day 14-21. Day 21 milestone = neuroplasticity studies show habit neural pathway formation begins.<br/>
                    <strong>Best for:</strong> First-time participants, seasonal resets<br/>
                    <strong>Research:</strong> Neuron. 2013 (Habit formation 21+ days for neural pathway creation)
                  </p>
                </div>

                <div style={{marginBottom:14,padding:12,borderRadius:8,background:"rgba(230,183,165,0.08)",border:"1px solid rgba(230,183,165,0.12)"}}>
                  <p style={{fontSize:12,color:"var(--champagne)",fontWeight:700,marginBottom:6}}>6-Week (42-Day) Protocol</p>
                  <p style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.7}}>
                    <strong>Cellular Biology:</strong> Liver hepatocyte turnover: 300-500 days (so 10-15% renewal in 6 weeks). Gut epithelial lining: Complete renewal every 5-7 days (6 full cycles). Taste bud cells: 10-14 day lifespan (3-4 complete turnovers = palate reset). Skin cell turnover: 28-40 days (one complete cycle).<br/>
                    <strong>Why 6 weeks:</strong> Minimum duration for measurable tissue-level changes + neural habit solidification (42-66 days per behavioral research).<br/>
                    <strong>Best for:</strong> Sustainable lifestyle change, chronic conditions<br/>
                    <strong>Research:</strong> Physiol Rev. 2017 (Cellular turnover rates); Eur J Soc Psychol. 2009 (Habit formation 66 days average)
                  </p>
                </div>

                <div style={{marginBottom:14,padding:12,borderRadius:8,background:"rgba(230,183,165,0.08)",border:"1px solid rgba(230,183,165,0.12)"}}>
                  <p style={{fontSize:12,color:"var(--champagne)",fontWeight:700,marginBottom:6}}>60-Day Protocol</p>
                  <p style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.7}}>
                    <strong>Cellular Biology:</strong> Two full supplement cycles. Red blood cells (120-day lifespan): 50% turnover. All skin cells completely renewed. Pancreatic beta cells begin regeneration. Fat cell metabolism shifts from storage to utilization.<br/>
                    <strong>Best for:</strong> Metabolic conditions, autoimmune support, pre-diabetes<br/>
                    <strong>Research:</strong> Cell Metab. 2019 (Metabolic adaptation timeline 8-12 weeks)
                  </p>
                </div>

                <div style={{padding:12,borderRadius:8,background:"rgba(230,183,165,0.08)",border:"1px solid rgba(230,183,165,0.12)"}}>
                  <p style={{fontSize:12,color:"var(--champagne)",fontWeight:700,marginBottom:6}}>90-Day Protocol</p>
                  <p style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.7}}>
                    <strong>Cellular Biology:</strong> Three complete supplement cycles. Most organ systems (except cardiac/neural) show measurable regeneration. Mitochondrial biogenesis (new energy-producing cellular machinery). Complete neuroplastic habit rewiring.<br/>
                    <strong>Best for:</strong> Chronic illness, obesity, complete transformation<br/>
                    <strong>Research:</strong> Nat Rev Mol Cell Biol. 2016 (Organ regeneration timelines); Diabetes. 2015 (90-day metabolic reversal studies)
                  </p>
                </div>
              </div>

              {/* 3-PHASE SYSTEM */}
              <div style={{padding:16,borderRadius:10,background:"rgba(245,222,179,0.06)",border:"1px solid rgba(245,222,179,0.10)",marginBottom:14}}>
                <h5 style={{fontSize:13,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>📋 The 3-Phase Detox System</h5>
                <p style={{fontSize:10,color:"var(--rosegold)",marginBottom:10,fontStyle:"italic"}}>
                  Foundational framework overview. Complete day-by-day protocols, supplement timing, meal plans, and client coaching taught in the Professional Detox Masterclass.
                </p>
                
                <p style={{fontSize:12,color:"var(--rosegold)",fontWeight:700,marginBottom:6}}>PRE-DETOX PREPARATION (Days 1-7)</p>
                <div style={{fontSize:11,color:"var(--champagne)",lineHeight:1.7,marginBottom:12,paddingLeft:12}}>
                  <strong>Purpose:</strong> Prepare detox pathways, reduce toxic load gradually, prevent detox crisis<br/>
                  • Hydration ramp-up: Start at calculated water needs (body weight ÷ 2)<br/>
                  • Begin GI Cleansing Formula + Digestive Enzymes + Probiotic<br/>
                  • Eliminate processed foods, sugar, alcohol (gradual if heavy caffeine user to avoid withdrawal)<br/>
                  • Morning lemon water: 16oz warm water in glass/stainless with 2 drops Lemon essential oil<br/>
                  • ⚠️ Pet Safety: If diffusing citrus oils, ensure cats have separate space
                </div>

                <p style={{fontSize:12,color:"var(--rosegold)",fontWeight:700,marginBottom:6}}>ACTIVE DETOX (Days 8-30 or 8-42 for 6-week)</p>
                <div style={{fontSize:11,color:"var(--champagne)",lineHeight:1.7,marginBottom:12,paddingLeft:12}}>
                  <strong>Purpose:</strong> Active cellular detoxification, metabolic fat burning, inflammation reduction<br/>
                  • Continue all supplements from Pre-Detox phase<br/>
                  • Add Metabolic Blend Softgels (before meals) + Energy Complex (AM)<br/>
                  • Topical metabolic support: Massage Metabolic Blend (diluted 1:1) on abdomen and thighs 2x daily<br/>
                  • Fasted movement: 30 min AM cardio before eating for fat oxidation<br/>
                  • Eliminate dairy, gluten; small amounts gluten-free grains allowed after Day 14<br/>
                  • Day 21 milestone: Neural habit pathways solidifying per neuroplasticity research
                </div>

                <p style={{fontSize:12,color:"var(--rosegold)",fontWeight:700,marginBottom:6}}>POST-DETOX TRANSITION & MAINTENANCE (Final 7-14 days + Beyond)</p>
                <div style={{fontSize:11,color:"var(--champagne)",lineHeight:1.7,marginBottom:12,paddingLeft:12}}>
                  <strong>Purpose:</strong> Transition to sustainable lifestyle, prevent relapse, determine next steps<br/>
                  • Add Cellular Vitality Complex (DDR Prime) + Omega Complex for cellular maintenance<br/>
                  • Reintroduce eliminated foods slowly (one category every 3 days - monitor reactions)<br/>
                  • Assess outcomes: Energy levels, sleep quality, digestive function, weight, mental clarity<br/>
                  • <strong>Decision Point:</strong> Continue to 60-day? 90-day? Or transition to maintenance?<br/>
                  • Maintenance protocol: Lifelong Vitality Pack daily + monthly 7-day mini-detox resets
                </div>
              </div>

              {/* HOW TO GET STARTED */}
              <div style={{padding:16,borderRadius:10,background:"rgba(218,165,112,0.08)",border:"1px solid rgba(218,165,112,0.15)",marginBottom:14}}>
                <h5 style={{fontSize:13,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>🚀 How to Get Started (Required Steps)</h5>
                
                <div style={{marginBottom:14,padding:12,borderRadius:8,background:"rgba(245,222,179,0.06)",border:"1px solid rgba(245,222,179,0.08)"}}>
                  <p style={{fontSize:12,color:"var(--champagne)",fontWeight:700,marginBottom:8}}>STEP 1: Free Detox Assessment Tool for Your Clients</p>
                  <p style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.7,marginBottom:10}}>
                    <strong>For Associates:</strong> Share this questionnaire with your clients to assess their toxic load and determine which protocol duration they need. This is a client-facing tool - send the link, have them complete it, then use their results to recommend the appropriate 30/60/90-day detox program and products. Creates personalized recommendations = higher conversion.
                  </p>
                  <button
                    onClick={() => window.open('https://www.doterra.com/US/en/blog/healthy-living-detox-questionnaire', '_blank')}
                    style={{background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,padding:"10px 14px",borderRadius:8,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:12,width:"100%"}}
                  >
                    📋 Get Free Client Assessment Questionnaire
                  </button>
                </div>

                {hasAccessToTier('tier2') && (
                  <div style={{marginBottom:14,padding:12,borderRadius:8,background:"rgba(138,43,226,0.08)",border:"1px solid rgba(138,43,226,0.15)"}}>
                    <p style={{fontSize:12,color:"var(--champagne)",fontWeight:700,marginBottom:8}}>TIER 2+ BENEFIT: Advanced Client Assessment Tool</p>
                    <p style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.7,marginBottom:10}}>
                      <strong>For Your High-End Clients:</strong> Access the Specialized Detox Intake for clients who want advanced clinical evaluation with personalized supplement stacking and practitioner support. Position this as your premium detox offering vs the free basic questionnaire above. Use Specialized Intakes to serve clients who want deeper support and are willing to invest more.
                    </p>
                    <button
                      onClick={() => {
                        const urlParams = new URLSearchParams(window.location.search);
                        const isDemoMode = urlParams.get('demo') === 'true';
                        navigate(createPageUrl("SpecializedIntake") + (isDemoMode ? '?demo=true' : ''));
                      }}
                      style={{background:"rgba(138,43,226,0.2)",border:"1px solid rgba(138,43,226,0.3)",padding:"10px 14px",borderRadius:8,color:"var(--champagne)",fontWeight:700,cursor:"pointer",fontSize:12,width:"100%"}}
                    >
                      🔓 Share Specialized Detox Intake with Clients (Tier 2+)
                    </button>
                  </div>
                )}

                <div style={{padding:12,borderRadius:8,background:"rgba(245,222,179,0.06)",border:"1px solid rgba(245,222,179,0.08)"}}>
                  <p style={{fontSize:12,color:"var(--champagne)",fontWeight:700,marginBottom:8}}>STEP 2: Enroll in Professional Detox Masterclass</p>
                  <p style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.7,marginBottom:10}}>
                    Learn complete implementation: exact supplement dosing, meal-by-meal planning, detox symptom management, client coaching scripts, and how to sell 30-90 day programs profitably.
                  </p>
                  <p style={{fontSize:10,color:"rgba(245,222,179,0.7)",marginBottom:10}}>
                    <strong>Live Training:</strong> January 3, 2026 at 7pm EST • <strong>Investment:</strong> $47 (Tier 1-2) or FREE (Tier 3+)
                  </p>
                  <button
                    onClick={() => window.open('https://healthlifestyleservices.com', '_blank')}
                    style={{background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,padding:"10px 14px",borderRadius:8,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:12,width:"100%",marginBottom:6}}
                  >
                    {hasAccessToTier('tier3') ? '🎓 Register FREE (Tier 3 Benefit)' : '🎓 Register for Masterclass ($47)'}
                  </button>
                  <button
                    onClick={() => window.open('https://healthlifestyleservices.com', '_blank')}
                    style={{background:"rgba(245,222,179,0.1)",border:"1px solid rgba(245,222,179,0.2)",padding:"8px 12px",borderRadius:6,color:"var(--champagne)",fontWeight:600,cursor:"pointer",fontSize:11,width:"100%"}}
                  >
                    📹 View Replay Library (Past Trainings)
                  </button>
                </div>
              </div>

              {/* UPSELL MESSAGE */}
              <div style={{padding:14,borderRadius:10,background:"rgba(230,183,165,0.08)",border:"1px solid rgba(230,183,165,0.15)",marginBottom:14,textAlign:"center"}}>
                <p style={{fontSize:11,color:"var(--champagne)",fontWeight:700,lineHeight:1.7}}>
                  💡 These protocols provide the framework. The Masterclass teaches you HOW to implement them with clients, HOW to manage detox symptoms, and HOW to generate revenue with detox programs.
                </p>
              </div>
            </div>

            {/* Free January Recipe */}
            <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                <span style={{padding:"4px 10px",borderRadius:20,background:"rgba(74,222,128,0.2)",fontSize:10,color:"#4ade80",fontWeight:700}}>FREE RECIPE</span>
                <h4 style={{fontSize:16,color:"var(--champagne)",fontWeight:700}}>🍋 Detox Morning Elixir</h4>
              </div>
              <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.6,marginBottom:12}}>
                Start 2026 right with this cellular cleansing morning ritual - supports liver detox, metabolism, and mental clarity.
              </p>
              <div style={{padding:12,borderRadius:8,background:"rgba(218,165,112,0.06)",border:"1px solid rgba(218,165,112,0.1)",fontSize:11,color:"var(--champagne)",lineHeight:1.7,marginBottom:10,fontFamily:"monospace"}}>
                <strong>Ingredients:</strong><br/>
                • 16oz warm water in glass mason jar or stainless steel container (avoid plastic)<br/>
                • 2 drops Lemon essential oil<br/>
                • 1 drop Grapefruit essential oil<br/>
                • 1 drop Peppermint essential oil<br/>
                • 1 tsp raw honey (optional)<br/>
                • Pinch of cayenne pepper<br/><br/>
                <strong>Instructions:</strong> Add oils to glass container, shake well. Drink on empty stomach, 30 min before breakfast. Repeat daily for 21 days.<br/><br/>
                <strong>⚠️ Pet Safety:</strong> Store oils securely away from pets. Citrus oils are generally safe around pets when diluted in water, but always ensure proper ventilation.
              </div>
              <button
                onClick={() => {
                  const recipe = `DETOX MORNING ELIXIR (January 2026)\n\nIngredients:\n• 16oz warm water in glass mason jar or stainless steel container\n• 2 drops Lemon essential oil\n• 1 drop Grapefruit essential oil\n• 1 drop Peppermint essential oil\n• 1 tsp raw honey (optional)\n• Pinch of cayenne pepper\n\nInstructions:\nAdd oils to glass container, shake well. Drink on empty stomach, 30 min before breakfast. Repeat daily for 21 days.\n\nPet Safety: Store oils away from pets. Ensure proper ventilation.`;
                  const el = document.createElement('textarea');
                  el.value = recipe;
                  document.body.appendChild(el);
                  el.select();
                  document.execCommand('copy');
                  document.body.removeChild(el);
                  alert('Recipe copied! Share with your customers and team.');
                }}
                style={{background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,padding:"10px 16px",borderRadius:8,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:12,width:"100%"}}
              >
                📥 Download Recipe & Share
              </button>
            </div>

            {/* Oil Spotlight */}
            <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                <span style={{padding:"4px 10px",borderRadius:20,background:"rgba(218,165,112,0.2)",fontSize:10,color:"var(--rosegold)",fontWeight:700}}>OIL SPOTLIGHT</span>
                <h4 style={{fontSize:16,color:"var(--champagne)",fontWeight:700}}>🌿 January Feature: Frankincense</h4>
              </div>
              <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:12}}>
                <strong>Why Frankincense for January:</strong> Known as the "King of Oils," Frankincense supports cellular renewal and new beginnings - perfect for your fresh start. Learn advanced uses, DIY recipes, and clinical applications.
              </p>
              <div style={{padding:12,borderRadius:8,background:"rgba(218,165,112,0.06)",border:"1px solid rgba(218,165,112,0.1)",marginBottom:12,fontSize:11,color:"var(--champagne)",lineHeight:1.7}}>
                <strong>5 Ways to Use Frankincense in January:</strong><br/>
                1. Morning grounding ritual: 2 drops on pulse points<br/>
                2. Cellular renewal elixir: 2 drops in water daily<br/>
                3. Meditation diffusion: 4 drops for deep spiritual connection<br/>
                4. Anti-aging night serum: Mix with carrier oil for face<br/>
                5. Immune support: 1 drop under tongue during cold/flu season
              </div>
              <button
                onClick={() => window.open('https://healthlifestyleservices.com', '_blank')}
                style={{background:"rgba(245,222,179,0.1)",border:"1px solid rgba(245,222,179,0.2)",padding:"10px 16px",borderRadius:8,color:"var(--champagne)",fontWeight:600,cursor:"pointer",fontSize:12,width:"100%"}}
              >
                Deep Dive: Frankincense Masterclass (Aroma Alchemy)
              </button>
            </div>

            {/* Exclusive Training */}
            <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                <span style={{padding:"4px 10px",borderRadius:20,background:"rgba(138,43,226,0.2)",fontSize:10,color:"#b794f6",fontWeight:700}}>LIVE MASTERCLASS</span>
                <h4 style={{fontSize:16,color:"var(--champagne)",fontWeight:700}}>🎥 Professional Detox Protocols Masterclass</h4>
              </div>
              <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:10}}>
                <strong>Live Training: January 3, 2026 at 7pm EST</strong>
              </p>
              <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.6,marginBottom:14}}>
                Learn professional 30-90 day detox protocols from <strong>Jenna Williams, Licensed Natural Healthcare Practitioner & Clinical Aromatherapist</strong>. She just completed advanced detoxification certification from an accredited academic institution - now you get the professional protocols she teaches to practitioners.
              </p>
              <div style={{padding:12,borderRadius:8,background:"rgba(230,183,165,0.10)",border:"1px solid rgba(230,183,165,0.15)",marginBottom:12}}>
                <p style={{fontSize:12,color:"var(--champagne)",fontWeight:600,marginBottom:8}}>What You'll Learn:</p>
                <ul style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.7,paddingLeft:20}}>
                  <li>How professionals design 30-90 day detox systems (not guesswork)</li>
                  <li>Liver, lymphatic, and cellular detox pathways - the science</li>
                  <li>Essential oil protocols for each detox phase</li>
                  <li>Supplement stacking for maximum results</li>
                  <li>How to sell detox programs to clients (generate revenue)</li>
                  <li>Safety protocols and contraindication screening</li>
                </ul>
              </div>
              <div style={{padding:12,borderRadius:8,background:"rgba(218,165,112,0.08)",border:"1px solid rgba(218,165,112,0.12)",marginBottom:12}}>
                <p style={{fontSize:12,color:"var(--champagne)",fontWeight:700,marginBottom:6}}>Investment:</p>
                <p style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.6}}>
                  • Tier 1: $47 (includes live training + lifetime replay access)<br/>
                  • Tier 2 Members: <strong>FREE</strong> (included in membership)<br/>
                  • All attendees get downloadable detox protocol templates
                </p>
              </div>
              <button
                onClick={() => window.open('https://healthlifestyleservices.com', '_blank')}
                style={{background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,padding:"12px 18px",borderRadius:10,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:13,width:"100%",marginBottom:8}}
              >
                {hasAccessToTier('tier2') ? 'Register FREE (Tier 2 Benefit) →' : 'Register for Masterclass ($47) →'}
              </button>
              <button
                onClick={() => window.open('https://healthlifestyleservices.com', '_blank')}
                style={{background:"rgba(245,222,179,0.1)",border:"1px solid rgba(245,222,179,0.2)",padding:"10px 16px",borderRadius:8,color:"var(--champagne)",fontWeight:600,cursor:"pointer",fontSize:12,width:"100%"}}
              >
                View Replay Library (Past Trainings)
              </button>
            </div>

            {/* Monthly Diffuser Blend */}
            <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                <span style={{padding:"4px 10px",borderRadius:20,background:"rgba(74,222,128,0.2)",fontSize:10,color:"#4ade80",fontWeight:700}}>FREE BLEND</span>
                <h4 style={{fontSize:16,color:"var(--champagne)",fontWeight:700}}>💨 January Signature Diffuser Blend: "Fresh Start"</h4>
              </div>
              <div style={{padding:12,borderRadius:8,background:"rgba(218,165,112,0.06)",border:"1px solid rgba(218,165,112,0.1)",fontSize:11,color:"var(--champagne)",lineHeight:1.7,marginBottom:10,fontFamily:"monospace"}}>
                <strong>"FRESH START" Diffuser Blend:</strong><br/>
                • 3 drops Wild Orange (new beginnings, uplifting)<br/>
                • 3 drops Peppermint (mental clarity, focus)<br/>
                • 2 drops Frankincense (spiritual grounding, renewal)<br/>
                • 1 drop Lemon (cleansing, purification)<br/><br/>
                <strong>Use:</strong> Diffuse every morning while journaling or setting daily intentions<br/><br/>
                <strong>⚠️ Pet Safety:</strong> Peppermint is safe for dogs when diffused. If you have cats, diffuse this blend in a room they cannot access, with door closed. Never confine pets in a room with active diffuser. Always provide escape route.
              </div>
              <button
                onClick={() => {
                  const blend = `"FRESH START" DIFFUSER BLEND (January 2026)\n\n• 3 drops Wild Orange (new beginnings, energy)\n• 3 drops Peppermint (mental clarity, focus)\n• 2 drops Frankincense (spiritual grounding, renewal)\n• 1 drop Lemon (cleansing, purification)\n\nUse: Diffuse every morning while setting daily intentions. Perfect for goal-setting, journaling, and starting your day with purpose.\n\nPet Safety: Safe for dogs when diffused. If you have cats, diffuse in separate room with door closed. Never confine pets with diffuser.`;
                  const el = document.createElement('textarea');
                  el.value = blend;
                  document.body.appendChild(el);
                  el.select();
                  document.execCommand('copy');
                  document.body.removeChild(el);
                  alert('Diffuser blend copied! Share with your community.');
                }}
                style={{background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,padding:"10px 16px",borderRadius:8,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:12,width:"100%"}}
              >
                📥 Download & Share
              </button>
            </div>

            {/* Tier 2 Upsell */}
            <div style={{padding:20,borderRadius:12,background:"linear-gradient(135deg, rgba(138,43,226,0.15), rgba(138,43,226,0.08))",border:"1px solid rgba(138,43,226,0.3)"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                <Lock className="w-5 h-5" style={{color:"#b794f6"}} />
                <h4 style={{fontSize:16,color:"var(--champagne)",fontWeight:700}}>🔥 TIER 2 EXCLUSIVE: New Year Recruiting Playbook</h4>
              </div>
              <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.6,marginBottom:12}}>
                January is prime recruiting season - people are motivated, setting goals, and open to change. Tier 2 members get the complete "New Year, New Income" recruiting system with resolution-based scripts, challenge funnels, and enrollment techniques that work in January.
              </p>
              {hasAccessToTier('tier2') ? (
                <button onClick={() => setActiveSection('tier2')} style={{padding:"10px 16px",borderRadius:8,background:"linear-gradient(90deg,rgba(138,43,226,0.8),rgba(138,43,226,0.6))",border:0,color:"#fff",fontWeight:700,cursor:"pointer",fontSize:13,width:"100%"}}>
                  Access Tier 2 Recruiting Playbook →
                </button>
              ) : (
                <div>
                  <button 
                    onClick={async () => {
                      if (window.confirm('Upgrade to Tier 2 for $97? You will get advanced recruiting, team-building, and leadership training + January masterclass discount.')) {
                        try {
                          await base44.auth.updateMe({ education_tier: 'tier2' });
                          window.open('https://healthlifestyleservices.com?upgrade=tier2&amount=97', '_blank');
                          alert('Tier 2 upgrade initiated! Complete payment, then refresh this page.');
                        } catch (err) {
                          alert('Error upgrading. Contact support at jennalwill@gmail.com');
                        }
                      }
                    }} 
                    style={{padding:"12px 18px",borderRadius:10,background:"linear-gradient(90deg,rgba(138,43,226,0.8),rgba(138,43,226,0.6))",border:0,color:"#fff",fontWeight:700,cursor:"pointer",fontSize:14,width:"100%",marginBottom:8}}
                  >
                    🔓 Upgrade to Tier 2 ($97)
                  </button>
                  <p style={{fontSize:10,color:"rgba(245,222,179,0.7)",textAlign:"center"}}>Unlock advanced team-building, recruiting playbooks, and leadership training</p>
                </div>
              )}
            </div>

            {/* January Wellness Blog */}
            <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                <span style={{padding:"4px 10px",borderRadius:20,background:"rgba(218,165,112,0.2)",fontSize:10,color:"var(--rosegold)",fontWeight:700}}>BLOG</span>
                <h4 style={{fontSize:16,color:"var(--champagne)",fontWeight:700}}>📖 "The Science of New Beginnings: Aromatherapy & Neuroplasticity"</h4>
              </div>
              <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.6,marginBottom:12}}>
                Learn how essential oils create new neural pathways, anchor positive habits, and support lasting transformation. Backed by neuroscience research.
              </p>
              <button
                onClick={() => window.open('https://healthlifestyleservices.com', '_blank')}
                style={{background:"rgba(245,222,179,0.1)",border:"1px solid rgba(245,222,179,0.2)",padding:"10px 16px",borderRadius:8,color:"var(--champagne)",fontWeight:600,cursor:"pointer",fontSize:12,width:"100%"}}
              >
                Read Full Article (Aroma Alchemy Blog)
              </button>
            </div>

            {/* Sample Protocol */}
            <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                <span style={{padding:"4px 10px",borderRadius:20,background:"rgba(74,222,128,0.2)",fontSize:10,color:"#4ade80",fontWeight:700}}>SAMPLE KIT STRATEGY</span>
                <h4 style={{fontSize:16,color:"var(--champagne)",fontWeight:700}}>📦 January Sample Strategy: "New Year Wellness Kit"</h4>
              </div>
              <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.6,marginBottom:12}}>
                Hand out themed sample kits to prospects this month! People are motivated in January - samples convert well when paired with New Year goals.
              </p>
              <div style={{padding:12,borderRadius:8,background:"rgba(218,165,112,0.06)",border:"1px solid rgba(218,165,112,0.1)",fontSize:11,color:"var(--champagne)",lineHeight:1.7,marginBottom:10,fontFamily:"monospace"}}>
                <strong>Sample Kit Contents:</strong><br/>
                • Lavender sample (1mL) - "Reset Your Sleep"<br/>
                • Peppermint sample (1mL) - "Boost Your Energy"<br/>
                • Lemon sample (1mL) - "Detox Your Body"<br/>
                • Printed instruction card with your contact info<br/><br/>
                <strong>Estimated Cost:</strong> $3-4 per kit<br/>
                <strong>Follow-up:</strong> Text/call 3 days after giving sample
              </div>
              <p style={{fontSize:11,color:"var(--rosegold)",fontStyle:"italic"}}>
                💡 Strategy: Hand out samples at gyms, wellness centers, New Year events. Follow up with invitation to try full starter kit.
              </p>
            </div>

            {/* Community Spotlight */}
            <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                <span style={{padding:"4px 10px",borderRadius:20,background:"rgba(218,165,112,0.2)",fontSize:10,color:"var(--rosegold)",fontWeight:700}}>COMMUNITY</span>
                <h4 style={{fontSize:16,color:"var(--champagne)",fontWeight:700}}>🌟 Join the Aroma Alchemy Private Group</h4>
              </div>
              <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.6,marginBottom:12}}>
                Get monthly masterclasses, live Q&As, exclusive DIY recipes, business-building support, and a community of wellness professionals all using iTerra + aromatherapy to transform lives.
              </p>
              <div style={{padding:12,borderRadius:8,background:"rgba(230,183,165,0.10)",border:"1px solid rgba(230,183,165,0.15)",marginBottom:12}}>
                <p style={{fontSize:12,color:"var(--champagne)",fontWeight:600,marginBottom:8}}>What's Inside Aroma Alchemy:</p>
                <ul style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.7,paddingLeft:20}}>
                  <li>Monthly live trainings with Jenna Williams (clinical nutritionist)</li>
                  <li>Exclusive essential oil deep-dives and research breakdowns</li>
                  <li>Business strategy sessions and accountability partners</li>
                  <li>Advanced DIY recipes not available anywhere else</li>
                  <li>First access to new iTerra features and tools</li>
                </ul>
              </div>
              <button
                onClick={() => window.open('https://healthlifestyleservices.com', '_blank')}
                style={{background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,padding:"12px 18px",borderRadius:8,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:13,width:"100%"}}
              >
                Join Aroma Alchemy Group →
              </button>
            </div>



            {/* What's Coming Next Month */}
            <div style={{padding:20,borderRadius:12,background:"rgba(230,183,165,0.08)",border:"1px solid rgba(230,183,165,0.15)"}}>
              <h4 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>📅 Coming in February 2026</h4>
              <ul style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.8,paddingLeft:20}}>
                <li>💝 <strong>Valentine's Romance Collection:</strong> Aphrodisiac blends, couples massage protocols, romantic diffuser recipes</li>
                <li>🌱 <strong>Spring Prep Deep-Dive:</strong> Allergy support protocols, seasonal wellness transitions, outdoor activity blends</li>
                <li>📱 <strong>Instagram Reels Masterclass:</strong> Viral content formulas for wellness businesses (Tier 2 Exclusive)</li>
                <li>💰 <strong>Tax Season Prep Workshop:</strong> 2026 deduction checklists, S-Corp setup, CPA selection (Tier 3 Exclusive)</li>
                <li>🎁 <strong>Customer Retention Secrets:</strong> Keep customers ordering month after month (All Tiers)</li>
              </ul>
              <p style={{fontSize:11,color:"var(--champagne)",marginTop:12,fontStyle:"italic"}}>
                ✨ This is a living, growing ecosystem - fresh tools, recipes, and trainings added the 1st of every month. Stay engaged, keep learning, keep growing!
              </p>
              <p style={{fontSize:10,color:"var(--rosegold)",marginTop:8,textAlign:"center"}}>
                💡 Admin Note: Update this section monthly with new content - keep it fresh and exciting!
              </p>
            </div>
          </div>
        </div>
      )
    },
    flashcards: {
      title: "Product Flashcards",
      icon: BookOpen,
      content: (
        <div>
          <div style={{padding:24,borderRadius:16,background:"linear-gradient(180deg, rgba(218,165,112,0.12), rgba(185,135,93,0.08))",border:"1px solid rgba(218,165,112,0.2)",marginBottom:24}}>
            <h3 style={{fontSize:20,color:"var(--champagne)",marginBottom:10,fontWeight:700}}>Master Essential Products</h3>
            <p style={{fontSize:14,color:"var(--rosegold)",marginBottom:20,lineHeight:1.6}}>
              Core product knowledge covering single oils, blends, supplements, and safety protocols.
            </p>
            <div style={{display:"flex",gap:20,marginBottom:20}}>
              <div style={{flex:1,padding:16,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)",textAlign:"center"}}>
                <div style={{fontSize:28,color:"var(--rosegold)",fontWeight:700,marginBottom:4}}>{flashCards.length}</div>
                <div style={{fontSize:12,color:"var(--champagne)"}}>Total Flashcards</div>
              </div>
              <div style={{flex:1,padding:16,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)",textAlign:"center"}}>
                <div style={{fontSize:28,color:"var(--rosegold)",fontWeight:700,marginBottom:4}}>{score}</div>
                <div style={{fontSize:12,color:"var(--champagne)"}}>Cards Reviewed</div>
              </div>
            </div>

            {!selectedCard && (
              <button onClick={drawCard} style={{width:"100%",padding:16,borderRadius:12,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:16}}>
                Draw a Card
              </button>
            )}

            {selectedCard && (
              <div style={{marginTop:20}}>
                <div onClick={flipCard} style={{background:cardFlipped?"linear-gradient(135deg, rgba(185,135,93,0.3), rgba(139,111,71,0.2))":"linear-gradient(135deg, rgba(218,165,112,0.3), rgba(185,135,93,0.2))",border:"2px solid var(--rosegold)",borderRadius:16,padding:40,minHeight:200,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center",transition:"all 0.3s ease"}}>
                  <div>
                    <div style={{fontSize:12,color:"var(--rosegold)",marginBottom:12,fontWeight:600}}>{selectedCard.category}</div>
                    <p style={{fontSize:16,color:"var(--champagne)",fontWeight:600,lineHeight:1.6}}>
                      {cardFlipped ? selectedCard.back : selectedCard.front}
                    </p>
                  </div>
                </div>
                <p style={{color:"var(--rosegold)",marginTop:12,fontSize:13,textAlign:"center"}}>
                  {cardFlipped ? "Click for next card" : "Click to reveal answer"}
                </p>
                {cardFlipped && (
                  <button onClick={drawCard} style={{width:"100%",marginTop:16,padding:12,borderRadius:10,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.2)",color:"var(--champagne)",fontWeight:600,cursor:"pointer"}}>
                    Next Card
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )
    },
    tier1: {
      title: "Tier 1: Foundations",
      icon: GraduationCap,
      content: (
        <TierLock requiredTier="tier1">
          <div>
            <div style={{padding:24,borderRadius:16,background:"linear-gradient(180deg, rgba(218,165,112,0.12), rgba(185,135,93,0.08))",border:"1px solid rgba(218,165,112,0.2)",marginBottom:24}}>
              <h3 style={{fontSize:20,color:"var(--champagne)",marginBottom:10,fontWeight:700}}>Tier 1: MLM Business Foundations</h3>
              <p style={{fontSize:14,color:"var(--rosegold)",marginBottom:16,lineHeight:1.6}}>
                Master network marketing fundamentals, legal compliance, and launch your wellness business from the ground up.
              </p>
            </div>

            {/* Module 1 */}
            <div style={{marginBottom:20}}>
              <button onClick={() => setExpandedModule(expandedModule === 'tier1-mod1' ? null : 'tier1-mod1')} style={{width:"100%",padding:16,borderRadius:12,background:"rgba(245,222,179,0.06)",border:"1px solid rgba(245,222,179,0.12)",color:"var(--champagne)",fontWeight:700,fontSize:17,textAlign:"left",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                Module 1: Understanding MLM & Network Marketing
                <span style={{fontSize:20}}>{expandedModule === 'tier1-mod1' ? '−' : '+'}</span>
              </button>
              
              {expandedModule === 'tier1-mod1' && (
                <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)",marginTop:12}}>
                  <h4 style={{fontSize:15,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>What is Network Marketing?</h4>
                  <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:16}}>
                    Network marketing (also called multi-level marketing or MLM) is a business model where independent distributors sell products directly to consumers and earn commissions both from their personal sales AND from the sales of people they recruit into the business. Think of it as getting paid to share products you love AND teach others to do the same.
                  </p>
                  <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:16}}>
                    Unlike traditional jobs where you trade time for money (and your income stops when you stop working), network marketing builds <strong>residual income</strong>. As your team grows and sells products, you continue earning even when you're sleeping, on vacation, or focusing on other things.
                  </p>

                  <h4 style={{fontSize:15,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>Pyramid Scheme vs Legitimate MLM</h4>
                  <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:12}}>
                    The #1 question you'll face: "Isn't this a pyramid scheme?" Here's the truth:
                  </p>
                  <div style={{padding:12,borderRadius:8,background:"rgba(230,183,165,0.08)",border:"1px solid rgba(230,183,165,0.12)",marginBottom:16}}>
                    <p style={{fontSize:12,color:"var(--champagne)",lineHeight:1.6,marginBottom:8}}>
                      <strong>Pyramid Scheme (ILLEGAL):</strong> You make money primarily from recruiting people. Little to no actual product is sold to real customers. Emphasis is on "paying to join" rather than selling products.
                    </p>
                    <p style={{fontSize:12,color:"var(--champagne)",lineHeight:1.6}}>
                      <strong>Legitimate MLM (LEGAL):</strong> You make money from selling actual products to real customers. Recruiting is optional but creates leverage. The FTC requires at least 70% of sales to go to non-distributors (real retail customers).
                    </p>
                  </div>

                  <h4 style={{fontSize:15,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>How You Get Paid: The Compensation Plan</h4>
                  <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:12}}>
                    Understanding your compensation plan is CRITICAL. Here's how it typically works:
                  </p>
                  <ul style={{fontSize:13,color:"var(--champagne)",lineHeight:1.8,paddingLeft:20,marginBottom:16}}>
                    <li><strong>Personal Volume (PV):</strong> The dollar value of products YOU personally purchase or sell each month</li>
                    <li><strong>Group Volume (GV) or Organization Volume (OV):</strong> The total sales volume of your entire team</li>
                    <li><strong>Retail Profit:</strong> When you sell products to customers at retail price, you keep the difference (typically 25%)</li>
                    <li><strong>Fast Start Bonuses:</strong> Extra commissions on new enrollments in their first 60 days (usually 20-30%)</li>
                    <li><strong>Unilevel Commissions:</strong> You earn 2-7% on the volume of people in your "downline" (people you enrolled and people they enrolled)</li>
                    <li><strong>Rank Bonuses:</strong> As you hit higher ranks (Silver, Gold, Platinum, Diamond), you unlock bigger percentage payouts</li>
                  </ul>

                  <h4 style={{fontSize:15,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>Setting Realistic Income Expectations</h4>
                  <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:12}}>
                    Be honest with yourself and prospects. According to most company Income Disclosure Statements:
                  </p>
                  <ul style={{fontSize:12,color:"var(--champagne)",lineHeight:1.7,paddingLeft:20,marginBottom:16}}>
                    <li>70-80% of distributors earn less than $500/month (part-time, product enthusiasts)</li>
                    <li>10-15% earn $500-$2,000/month (active builders)</li>
                    <li>5-10% earn $2,000-$10,000/month (serious leaders)</li>
                    <li>1-2% earn $10,000+/month (top performers who treat it like a full-time business)</li>
                  </ul>
                  <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:16}}>
                    <strong>Timeline to profitability:</strong> Most successful builders take 6-12 months to replace a part-time income, 2-3 years to replace a full-time income. Anyone promising "get rich quick" is violating FTC rules.
                  </p>

                  <div style={{padding:16,borderRadius:10,background:"rgba(230,183,165,0.08)",border:"1px solid rgba(230,183,165,0.15)",marginTop:20}}>
                    <h4 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>📚 Required Reading & Resources</h4>
                    <ul style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.8,paddingLeft:20,marginBottom:16}}>
                      <li><a href="http://download.e-bookshelf.de/download/0000/5854/22/L-G-0000585422-0002384637.pdf" target="_blank" rel="noopener noreferrer" style={{color:"var(--rosegold)",textDecoration:"underline"}}>Free eBook: 15 Secrets Every Network Marketer Must Know (PDF)</a></li>
                      <li><a href="https://www.youtube.com/watch?v=lLlF1QL_1e4" target="_blank" rel="noopener noreferrer" style={{color:"var(--rosegold)",textDecoration:"underline"}}>Video: How MLM Duplication Works (YouTube)</a></li>
                      <li><a href="https://www.ftc.gov/business-guidance/resources/business-guidance-concerning-multi-level-marketing" target="_blank" rel="noopener noreferrer" style={{color:"var(--rosegold)",textDecoration:"underline"}}>FTC Business Guidance: Multi-Level Marketing</a></li>
                    </ul>
                  </div>

                  <div style={{padding:16,borderRadius:10,background:"rgba(218,165,112,0.12)",border:"1px solid rgba(218,165,112,0.25)",marginTop:16}}>
                    <h4 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>✅ Module 1 Knowledge Check (10 Questions)</h4>
                    <button
                      onClick={() => alert('Quiz: 1) What is the main difference between pyramid schemes and legitimate MLM? 2) What percentage of sales must go to non-distributors according to FTC? 3) Name the 3 main ways you earn income in MLM. 4) What is residual income? 5) True/False: Most distributors earn $10k+ in their first month. 6) What does PV stand for? 7) What does GV/OV stand for? 8) What is the typical retail profit margin? 9) How long does it typically take to replace part-time income? 10) What are Fast Start Bonuses?')}
                      style={{background:"rgba(245,222,179,0.1)",border:"1px solid rgba(245,222,179,0.2)",padding:"10px 16px",borderRadius:8,color:"var(--champagne)",fontWeight:600,cursor:"pointer",fontSize:13,width:"100%"}}
                    >
                      Take Module 1 Quiz (Retake Anytime)
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Module 2 */}
            <div style={{marginBottom:20}}>
              <button onClick={() => setExpandedModule(expandedModule === 'tier1-mod2' ? null : 'tier1-mod2')} style={{width:"100%",padding:16,borderRadius:12,background:"rgba(245,222,179,0.06)",border:"1px solid rgba(245,222,179,0.12)",color:"var(--champagne)",fontWeight:700,fontSize:17,textAlign:"left",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                Module 2: Legal Compliance & FTC Guidelines
                <span style={{fontSize:20}}>{expandedModule === 'tier1-mod2' ? '−' : '+'}</span>
              </button>
              
              {expandedModule === 'tier1-mod2' && (
                <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)",marginTop:12}}>
                  <div style={{padding:14,borderRadius:8,background:"rgba(255,0,0,0.1)",border:"1px solid rgba(255,0,0,0.3)",marginBottom:20}}>
                    <p style={{fontSize:13,color:"#ffb3b3",fontWeight:700,marginBottom:8}}>⚠️ CRITICAL: Violating FTC rules can result in fines, lawsuits, or company termination</p>
                    <p style={{fontSize:11,color:"#ffb3b3",lineHeight:1.6}}>
                      The Federal Trade Commission (FTC) regulates MLM companies and distributors. Ignorance is not an excuse. Master these rules.
                    </p>
                  </div>

                  <h4 style={{fontSize:15,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>Income Claims: The #1 Violation</h4>
                  <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:12}}>
                    <strong>What you CANNOT say:</strong>
                  </p>
                  <ul style={{fontSize:12,color:"#ffb3b3",lineHeight:1.7,paddingLeft:20,marginBottom:12}}>
                    <li>"You can make $10,000/month doing this!"</li>
                    <li>"I made $5,000 my first month - you can too!"</li>
                    <li>"Quit your job and work from home full-time!"</li>
                    <li>"This is a six-figure income opportunity!"</li>
                  </ul>
                  <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:12}}>
                    <strong>What you CAN say (with Income Disclosure):</strong>
                  </p>
                  <ul style={{fontSize:12,color:"var(--champagne)",lineHeight:1.7,paddingLeft:20,marginBottom:16}}>
                    <li>"I personally earned $X last month. Results not typical - see Income Disclosure Statement at [company website]."</li>
                    <li>"This business has the potential to create additional income. Actual results vary widely."</li>
                    <li>"Some people earn full-time income, most earn part-time supplemental income. See IDS for averages."</li>
                  </ul>

                  <h4 style={{fontSize:15,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>Product Claims: Medical & Health</h4>
                  <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:12}}>
                    Essential oils are NOT FDA-approved drugs. You CANNOT claim they diagnose, treat, cure, or prevent disease.
                  </p>
                  <div style={{padding:12,borderRadius:8,background:"rgba(230,183,165,0.08)",border:"1px solid rgba(230,183,165,0.12)",marginBottom:16}}>
                    <p style={{fontSize:12,color:"#ffb3b3",lineHeight:1.6,marginBottom:8}}>
                      <strong>ILLEGAL CLAIMS:</strong><br/>
                      ❌ "Lavender cures anxiety and depression"<br/>
                      ❌ "Frankincense kills cancer cells"<br/>
                      ❌ "This blend prevents colds and flu"<br/>
                      ❌ "Peppermint treats IBS"
                    </p>
                    <p style={{fontSize:12,color:"var(--champagne)",lineHeight:1.6}}>
                      <strong>COMPLIANT WORDING:</strong><br/>
                      ✅ "Lavender promotes feelings of calm and relaxation"<br/>
                      ✅ "Frankincense supports healthy cellular function"<br/>
                      ✅ "This blend supports a healthy immune response"<br/>
                      ✅ "Peppermint may soothe occasional digestive discomfort"
                    </p>
                  </div>

                  <h4 style={{fontSize:15,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>Social Media Disclosure Requirements</h4>
                  <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:12}}>
                    The FTC requires clear disclosure that you're a paid distributor promoting products for financial gain.
                  </p>
                  <ul style={{fontSize:12,color:"var(--champagne)",lineHeight:1.7,paddingLeft:20,marginBottom:16}}>
                    <li>Use hashtags: #ad #affiliate #[CompanyName]Distributor</li>
                    <li>Disclosure must be BEFORE the sales pitch (top of post, not buried in comments)</li>
                    <li>Can't hide disclosure in "read more" or after multiple hashtags</li>
                    <li>Stories & Reels need disclosure too (visible text on screen)</li>
                  </ul>

                  <h4 style={{fontSize:15,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>Testimonials & Before/After Photos</h4>
                  <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:12}}>
                    Customer testimonials must represent TYPICAL results, not exceptional outcomes.
                  </p>
                  <ul style={{fontSize:12,color:"var(--champagne)",lineHeight:1.7,paddingLeft:20,marginBottom:16}}>
                    <li>Weight loss before/after photos: Require disclaimer "Results not typical. Individual results may vary."</li>
                    <li>You're responsible for testimonials you share - even if someone else said it first</li>
                    <li>Can't cherry-pick only the best results and present them as normal</li>
                  </ul>

                  <div style={{padding:12,borderRadius:8,background:"rgba(245,222,179,0.06)",border:"1px solid rgba(245,222,179,0.12)",marginBottom:16}}>
                    <p style={{fontSize:11,color:"var(--rosegold)",fontWeight:700,marginBottom:6}}>REQUIRED DISCLAIMER (use on all marketing):</p>
                    <p style={{fontSize:10,color:"var(--champagne)",lineHeight:1.5,fontStyle:"italic"}}>
                      "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease."
                    </p>
                  </div>

                  <div style={{padding:16,borderRadius:10,background:"rgba(230,183,165,0.08)",border:"1px solid rgba(230,183,165,0.15)",marginTop:20}}>
                    <h4 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>📚 Legal Training Resources</h4>
                    <ul style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.8,paddingLeft:20,marginBottom:16}}>
                      <li><a href="https://www.ftc.gov/business-guidance/advertising-marketing/endorsements-testimonials" target="_blank" rel="noopener noreferrer" style={{color:"var(--rosegold)",textDecoration:"underline"}}>FTC Endorsement & Testimonial Guidelines</a></li>
                      <li><a href="https://www.youtube.com/results?search_query=mlm+ftc+compliance" target="_blank" rel="noopener noreferrer" style={{color:"var(--rosegold)",textDecoration:"underline"}}>MLM Legal Compliance Video Training</a></li>
                    </ul>
                    <button
                      onClick={() => {
                        const templates = `COMPLIANT SOCIAL MEDIA POST TEMPLATES (2026)\n\nPRODUCT EDUCATION POST:\n"I've been using [product name] for [benefit] and loving the results! 🌿\nIt helps me [specific outcome].\nWant to learn more? DM me!\n#ad #affiliate #WellnessAdvocate\n\n*I'm an independent distributor. These statements haven't been evaluated by the FDA."\n\nBEFORE/AFTER TESTIMONIAL:\n"Check out my [timeframe] journey! ✨\n[Describe results - be honest]\nResults not typical - see Income Disclosure at [link]\n#ad #WellnessJourney #Transformation\n\n*These statements haven't been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease."\n\nBUSINESS OPPORTUNITY POST:\n"I'm building my wellness business and loving the flexibility! 💼\nThis month I earned $[amount] - results vary, most earn part-time income.\nFull income disclosure: [company IDS link]\nCurious? Let's chat!\n#ad #WorkFromHome #NetworkMarketing\n\n*I'm an independent distributor. Earnings not typical."`;
                        const el = document.createElement('textarea');
                        el.value = templates;
                        document.body.appendChild(el);
                        el.select();
                        document.execCommand('copy');
                        document.body.removeChild(el);
                        alert('Compliant social media templates copied! Paste and customize for your posts.');
                      }}
                      style={{background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:"0",padding:"10px 16px",borderRadius:8,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:13,width:"100%"}}
                    >
                      📥 Download Compliant Social Media Templates
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Module 3 */}
            <div style={{marginBottom:20}}>
              <button onClick={() => setExpandedModule(expandedModule === 'tier1-mod3' ? null : 'tier1-mod3')} style={{width:"100%",padding:16,borderRadius:12,background:"rgba(245,222,179,0.06)",border:"1px solid rgba(245,222,179,0.12)",color:"var(--champagne)",fontWeight:700,fontSize:17,textAlign:"left",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                Module 3: Your First 30 Days Launch Plan
                <span style={{fontSize:20}}>{expandedModule === 'tier1-mod3' ? '−' : '+'}</span>
              </button>
              
              {expandedModule === 'tier1-mod3' && (
                <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)",marginTop:12}}>
                  <h4 style={{fontSize:15,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>Your First 30 Days: The Fast Start Blueprint</h4>
                  <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:16}}>
                    The first month determines your trajectory. Most people quit because they don't have a clear roadmap. This is your step-by-step plan to earn your first commission check and build momentum.
                  </p>

                  <div style={{padding:14,borderRadius:8,background:"rgba(218,165,112,0.08)",border:"1px solid rgba(218,165,112,0.15)",marginBottom:20}}>
                    <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>Week 1: Foundation & Setup (Days 1-7)</h5>
                    <ul style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.7,paddingLeft:20,marginBottom:0}}>
                      <li><strong>Day 1:</strong> Order your enrollment kit, set up your back office account, and connect your payment method</li>
                      <li><strong>Day 2-3:</strong> Start using your products daily. You can't share what you don't use. Document your experience</li>
                      <li><strong>Day 4:</strong> Watch product training videos. Focus on top 10 oils (Lavender, Peppermint, Lemon, Frankincense, Tea Tree, Digestive Blend, Protective Blend, Calming Blend, Respiratory Blend, Soothing Blend)</li>
                      <li><strong>Day 5:</strong> Set up your social media bio with compliant wording. Example: "Wellness advocate sharing natural solutions 🌿 #ad" (use your company's required hashtag)</li>
                      <li><strong>Day 6-7:</strong> Make your list of 100 names. Family, friends, coworkers, neighbors, social media connections. Everyone you know.</li>
                    </ul>
                  </div>

                  <div style={{padding:14,borderRadius:8,background:"rgba(218,165,112,0.08)",border:"1px solid rgba(218,165,112,0.15)",marginBottom:20}}>
                    <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>Week 2: First Invitations (Days 8-14)</h5>
                    <ul style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.7,paddingLeft:20,marginBottom:8}}>
                      <li><strong>Day 8-9:</strong> Reach out to 10 warm market contacts. Simple message: "Hey! I just started using essential oils and loving the results. Want to try a sample?"</li>
                      <li><strong>Day 10:</strong> Create sample packets. Lavender + Peppermint + Lemon in small bags with usage cards</li>
                      <li><strong>Day 11-13:</strong> Hand out or mail 20 samples. Follow up 3 days later: "Did you get a chance to try the oils? What did you think?"</li>
                      <li><strong>Day 14:</strong> Post your first product story on social media (compliant language). Example: "I've been using Lavender before bed and noticing better sleep quality. Anyone else struggle with restless nights?" + disclosure</li>
                    </ul>
                    <p style={{fontSize:11,color:"var(--champagne)",marginBottom:0}}>🎯 <strong>Goal:</strong> 5 interested conversations by end of Week 2</p>
                  </div>

                  <div style={{padding:14,borderRadius:8,background:"rgba(218,165,112,0.08)",border:"1px solid rgba(218,165,112,0.15)",marginBottom:20}}>
                    <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>Week 3: First Sales & Enrollments (Days 15-21)</h5>
                    <ul style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.7,paddingLeft:20,marginBottom:8}}>
                      <li><strong>Day 15-16:</strong> Host your first oil class (in-home, virtual, or one-on-one). Use company training presentation</li>
                      <li><strong>Day 17:</strong> Follow up with class attendees. Offer to help them place their first order</li>
                      <li><strong>Day 18-19:</strong> Enroll your first 2 customers or distributors. Walk them through the enrollment process</li>
                      <li><strong>Day 20:</strong> Teach your new enrollees how to order their next month's products (LRP/autoship for discount)</li>
                      <li><strong>Day 21:</strong> Schedule your second class for Week 4. Invite new contacts from your list</li>
                    </ul>
                    <p style={{fontSize:11,color:"var(--champagne)",marginBottom:0}}>🎯 <strong>Goal:</strong> 2-3 enrollments, $500+ in personal volume</p>
                  </div>

                  <div style={{padding:14,borderRadius:8,background:"rgba(218,165,112,0.08)",border:"1px solid rgba(218,165,112,0.15)",marginBottom:16}}>
                    <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>Week 4: Duplication Begins (Days 22-30)</h5>
                    <ul style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.7,paddingLeft:20,marginBottom:8}}>
                      <li><strong>Day 22-23:</strong> If someone enrolled as a distributor (not just customer), plug them into training immediately. Share this exact 30-day plan</li>
                      <li><strong>Day 24:</strong> Host your second class with new prospects. Invite your new distributor to observe</li>
                      <li><strong>Day 25-27:</strong> Continue daily outreach. Message 5 new people per day from your list</li>
                      <li><strong>Day 28:</strong> Review your first month numbers. Calculate your commission check (should arrive by Day 45)</li>
                      <li><strong>Day 29:</strong> Set Month 2 goals. How many enrollments? What rank are you aiming for?</li>
                      <li><strong>Day 30:</strong> Celebrate! You made it through the hardest month. Duplication has started</li>
                    </ul>
                    <p style={{fontSize:11,color:"var(--champagne)",marginBottom:0}}>🎯 <strong>Goal:</strong> 5 total enrollments, 1 active distributor building, $1,000 personal + team volume</p>
                  </div>

                  <div style={{padding:16,borderRadius:10,background:"rgba(230,183,165,0.08)",border:"1px solid rgba(230,183,165,0.15)"}}>
                    <h4 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>📚 Fast Start Resources</h4>
                    <ul style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.8,paddingLeft:20,marginBottom:16}}>
                      <li><a href="https://www.youtube.com/results?search_query=mlm+first+30+days+plan" target="_blank" rel="noopener noreferrer" style={{color:"var(--rosegold)",textDecoration:"underline"}}>Video: MLM First 30 Days Training (YouTube)</a></li>
                      <li><a href="https://www.youtube.com/results?search_query=mlm+invitation+scripts" target="_blank" rel="noopener noreferrer" style={{color:"var(--rosegold)",textDecoration:"underline"}}>Video: Sample Invitation Scripts & Role Play (YouTube)</a></li>
                      <li><a href="https://www.canva.com/templates/presentations/" target="_blank" rel="noopener noreferrer" style={{color:"var(--rosegold)",textDecoration:"underline"}}>Free Presentation Templates (Canva)</a></li>
                      <li><a href="https://www.irs.gov/businesses/small-businesses-self-employed/home-office-deduction" target="_blank" rel="noopener noreferrer" style={{color:"var(--rosegold)",textDecoration:"underline"}}>IRS Tax Deduction Guide for Home-Based Businesses</a></li>
                    </ul>
                  </div>

                  <div style={{padding:16,borderRadius:10,background:"rgba(218,165,112,0.12)",border:"1px solid rgba(218,165,112,0.25)",marginTop:16}}>
                    <h4 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>✅ Module 3 Knowledge Check (10 Questions)</h4>
                    <button
                      onClick={() => alert('Quiz: 1) What is the goal for Week 1? 2) How many names should be on your initial prospect list? 3) What is the goal for Week 2? 4) How many samples should you distribute in Week 2? 5) What happens in Week 3? 6) What is the PV goal by Day 30? 7) When does your first commission check arrive? 8) What is duplication and when does it start? 9) How many enrollments should you aim for by Day 30? 10) What should you do on Day 30?')}
                      style={{background:"rgba(245,222,179,0.1)",border:"1px solid rgba(245,222,179,0.2)",padding:"10px 16px",borderRadius:8,color:"var(--champagne)",fontWeight:600,cursor:"pointer",fontSize:13,width:"100%"}}
                    >
                      Take Module 3 Quiz (Retake Anytime)
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Module 4 */}
            <div style={{marginBottom:20}}>
              <button onClick={() => setExpandedModule(expandedModule === 'tier1-mod4' ? null : 'tier1-mod4')} style={{width:"100%",padding:16,borderRadius:12,background:"rgba(245,222,179,0.06)",border:"1px solid rgba(245,222,179,0.12)",color:"var(--champagne)",fontWeight:700,fontSize:17,textAlign:"left",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                Module 4: Social Media Marketing Strategies
                <span style={{fontSize:20}}>{expandedModule === 'tier1-mod4' ? '−' : '+'}</span>
              </button>
              
              {expandedModule === 'tier1-mod4' && (
                <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)",marginTop:12}}>
                  <h4 style={{fontSize:15,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>Social Media Marketing 2026: Build Your Audience Without Being Spammy</h4>
                  <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:16}}>
                    Social media is the #1 way to build your wellness business in 2026 - but most people do it wrong. They spam product posts, sound like robots, and burn out their warm market in 30 days. Here's how to build authentic influence and generate leads on autopilot using current platform algorithms.
                  </p>

                  <div style={{padding:14,borderRadius:8,background:"rgba(255,0,0,0.08)",border:"1px solid rgba(255,0,0,0.25)",marginBottom:20}}>
                    <h5 style={{fontSize:14,color:"#ffb3b3",fontWeight:700,marginBottom:10}}>⚠️ What NOT to Do (Common Mistakes)</h5>
                    <ul style={{fontSize:12,color:"#ffb3b3",lineHeight:1.7,paddingLeft:20}}>
                      <li>"Hey girl!" DMs to people you haven't talked to in 5 years</li>
                      <li>Posting only product photos with "Shop my link!" captions</li>
                      <li>Making income claims without disclosure ("I made $10k this month!")</li>
                      <li>Inviting people to your "business opportunity" before they know/like/trust you</li>
                      <li>Copying and pasting the same corporate graphics everyone else uses</li>
                    </ul>
                  </div>

                  <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>The 80/20 Content Rule</h5>
                  <p style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.7,marginBottom:12}}>
                    <strong>80% Lifestyle & Value Content:</strong> Behind-the-scenes, wellness tips, personal stories, family moments, recipes, workouts, motivational quotes. Make people want to follow YOU as a person.
                  </p>
                  <p style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.7,marginBottom:16}}>
                    <strong>20% Product/Business Content:</strong> Oil education, product testimonials (compliant), enrollment invitations. Only after you've built trust.
                  </p>

                  <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>📅 DOWNLOADABLE: 6-Week Content Calendar Template</h5>
                  <div style={{padding:14,borderRadius:8,background:"rgba(218,165,112,0.06)",border:"1px solid rgba(218,165,112,0.1)",marginBottom:12,fontSize:10,color:"var(--champagne)",lineHeight:1.5,fontFamily:"monospace",whiteSpace:"pre-wrap"}}>
{`6-WEEK SOCIAL MEDIA CONTENT CALENDAR (2026)

WEEK 1 - INTRODUCTION WEEK:
Mon: Post wellness quote + your story (no product mention)
Tue: "3 ways I use [Product] daily" + #ad disclosure
Wed: Lifestyle post - workout/meal prep/morning routine
Thu: DIY recipe using oils (e.g., diffuser blend for focus)
Fri: Customer testimonial (compliant) + disclaimer
Sat: Behind-the-scenes - your why for starting business

WEEK 2 - VALUE WEEK:
Mon: Wellness tip (hydration, sleep, stress management)
Tue: Product comparison post + #ad (your product vs alternatives)
Wed: Personal win - fitness goal, family moment, achievement
Thu: Educational Reel - "How to use [product]" tutorial
Fri: Share someone else's content (tag them, build community)
Sat: Business update - team call recap, upcoming events

WEEK 3 - ENGAGEMENT WEEK:
Mon: Poll in stories - "What wellness topic next? A/B/C"
Tue: Product highlight + science behind it + #ad
Wed: "Day in my life" video or carousel
Thu: Recipe or wellness hack (non-product)
Fri: Before/after testimonial + "results not typical" disclaimer
Sat: Q&A - answer DM questions publicly

WEEK 4 - INVITATION WEEK:
Mon: Motivational Monday - goal-setting content
Tue: "Who wants to try [product]? DM me for free sample!" + #ad
Wed: Family/lifestyle content - relatability
Thu: Educational post - benefits of natural wellness
Fri: Income disclosure post (if sharing earnings)
Sat: Team shout-out - celebrate someone's win

WEEK 5 - STORYTELLING WEEK:
Mon: Your transformation story (before starting business)
Tue: Product deep-dive + research links + #ad
Wed: Personal struggle → how oils helped
Thu: DIY gift idea or holiday recipe (seasonal)
Fri: Customer review screenshot + disclaimer
Sat: Business tip - what you learned this month

WEEK 6 - CHALLENGE WEEK:
Mon: Launch 7-day wellness challenge (free, builds list)
Tue: Product bundle recommendation + #ad
Wed: Lifestyle inspiration - self-care Sunday vibes
Thu: Challenge update - who's participating?
Fri: Testimonial from challenge participant + disclaimer
Sat: Celebrate challenge winners - build community`}
                  </div>
                  <button
                    onClick={() => {
                      const calendar = `6-WEEK SOCIAL MEDIA CONTENT CALENDAR (2026)\n\nWEEK 1 - INTRODUCTION WEEK:\nMon: Post wellness quote + your story (no product mention)\nTue: "3 ways I use [Product] daily" + #ad disclosure\nWed: Lifestyle post - workout/meal prep/morning routine\nThu: DIY recipe using oils (e.g., diffuser blend for focus)\nFri: Customer testimonial (compliant) + disclaimer\nSat: Behind-the-scenes - your why for starting business\n\nWEEK 2 - VALUE WEEK:\nMon: Wellness tip (hydration, sleep, stress management)\nTue: Product comparison post + #ad (your product vs alternatives)\nWed: Personal win - fitness goal, family moment, achievement\nThu: Educational Reel - "How to use [product]" tutorial\nFri: Share someone else's content (tag them, build community)\nSat: Business update - team call recap, upcoming events\n\nWEEK 3 - ENGAGEMENT WEEK:\nMon: Poll in stories - "What wellness topic next? A/B/C"\nTue: Product highlight + science behind it + #ad\nWed: "Day in my life" video or carousel\nThu: Recipe or wellness hack (non-product)\nFri: Before/after testimonial + "results not typical" disclaimer\nSat: Q&A - answer DM questions publicly\n\nWEEK 4 - INVITATION WEEK:\nMon: Motivational Monday - goal-setting content\nTue: "Who wants to try [product]? DM me for free sample!" + #ad\nWed: Family/lifestyle content - relatability\nThu: Educational post - benefits of natural wellness\nFri: Income disclosure post (if sharing earnings)\nSat: Team shout-out - celebrate someone's win\n\nWEEK 5 - STORYTELLING WEEK:\nMon: Your transformation story (before starting business)\nTue: Product deep-dive + research links + #ad\nWed: Personal struggle → how oils helped\nThu: DIY gift idea or holiday recipe (seasonal)\nFri: Customer review screenshot + disclaimer\nSat: Business tip - what you learned this month\n\nWEEK 6 - CHALLENGE WEEK:\nMon: Launch 7-day wellness challenge (free, builds list)\nTue: Product bundle recommendation + #ad\nWed: Lifestyle inspiration - self-care Sunday vibes\nThu: Challenge update - who's participating?\nFri: Testimonial from challenge participant + disclaimer\nSat: Celebrate challenge winners - build community`;
                      const el = document.createElement('textarea');
                      el.value = calendar;
                      document.body.appendChild(el);
                      el.select();
                      document.execCommand('copy');
                      document.body.removeChild(el);
                      alert('6-week content calendar copied! Use this to plan your social media posts.');
                    }}
                    style={{background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:"0",padding:"12px 18px",borderRadius:10,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:13,width:"100%"}}
                  >
                    📥 Download 6-Week Content Calendar
                  </button>

                  <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>Instagram Strategy</h5>
                  <div style={{padding:12,borderRadius:8,background:"rgba(218,165,112,0.08)",border:"1px solid rgba(218,165,112,0.12)",marginBottom:16}}>
                    <p style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.7,marginBottom:8}}>
                      <strong>Profile Optimization:</strong> Clear bio with what you do, link to landing page or shop, professional photo. Example: "Wellness advocate 🌿 | Helping busy moms find natural solutions | DM 'oils' to learn more"
                    </p>
                    <p style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.7,marginBottom:8}}>
                      <strong>Feed Posts:</strong> High-quality photos, authentic captions, always include #ad or #affiliate disclosure
                    </p>
                    <p style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.7,marginBottom:8}}>
                      <strong>Stories:</strong> Daily engagement. Polls, questions, behind-the-scenes, product demos. This is where real connection happens
                    </p>
                    <p style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.7,marginBottom:0}}>
                      <strong>Reels:</strong> 15-30 sec videos get 10x reach. "Day in the life," "3 oils I can't live without," quick tips
                    </p>
                  </div>

                  <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>Facebook Strategy</h5>
                  <div style={{padding:12,borderRadius:8,background:"rgba(218,165,112,0.08)",border:"1px solid rgba(218,165,112,0.12)",marginBottom:16}}>
                    <p style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.7,marginBottom:8}}>
                      <strong>Personal Profile:</strong> Share value-driven posts, engage in wellness groups (don't spam), use compliant wording
                    </p>
                    <p style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.7,marginBottom:8}}>
                      <strong>Business Page:</strong> Required for ads, professional content, customer testimonials, educational videos
                    </p>
                    <p style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.7,marginBottom:0}}>
                      <strong>Private Group:</strong> Create a community for customers. Daily tips, exclusive content, Q&A sessions. Builds loyalty and referrals
                    </p>
                  </div>

                  <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>Direct Message (DM) Outreach Done Right</h5>
                  <p style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.7,marginBottom:12}}>
                    <strong>Step 1: Warm them up first.</strong> Like and comment on their posts for 3-5 days before DMing. Build familiarity.
                  </p>
                  <p style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.7,marginBottom:12}}>
                    <strong>Step 2: Lead with curiosity, not pitch.</strong> "Hey! I saw you posted about struggling with sleep. Have you ever tried natural solutions like essential oils?"
                  </p>
                  <p style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.7,marginBottom:16}}>
                    <strong>Step 3: Offer value, not a sale.</strong> "I'd love to send you a free sample of my favorite sleep blend. No strings attached - just want to help!"
                  </p>

                  <div style={{padding:16,borderRadius:10,background:"rgba(230,183,165,0.08)",border:"1px solid rgba(230,183,165,0.15)"}}>
                    <h4 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>📚 Social Media Resources (Updated 2026)</h4>
                    <ul style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.8,paddingLeft:20,marginBottom:16}}>
                      <li><a href="https://www.canva.com" target="_blank" rel="noopener noreferrer" style={{color:"var(--rosegold)",textDecoration:"underline"}}>Canva: Free graphic design tool (create your own content)</a></li>
                      <li><a href="https://www.youtube.com/results?search_query=network+marketing+social+media+2025" target="_blank" rel="noopener noreferrer" style={{color:"var(--rosegold)",textDecoration:"underline"}}>Video: Network Marketing Social Media Strategy 2025-2026 (YouTube)</a></li>
                      <li><a href="https://www.youtube.com/results?search_query=instagram+reels+for+business+2025" target="_blank" rel="noopener noreferrer" style={{color:"var(--rosegold)",textDecoration:"underline"}}>Video: Instagram Reels for Business 2026 (YouTube)</a></li>
                      <li><a href="https://later.com" target="_blank" rel="noopener noreferrer" style={{color:"var(--rosegold)",textDecoration:"underline"}}>Later.com: Schedule posts in advance (free plan available)</a></li>
                    </ul>
                  </div>

                  <div style={{padding:16,borderRadius:10,background:"rgba(218,165,112,0.12)",border:"1px solid rgba(218,165,112,0.25)",marginTop:16}}>
                    <h4 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>✅ Module 4 Knowledge Check (10 Questions)</h4>
                    <button
                      onClick={() => alert('Quiz: 1) What is the 80/20 content rule? 2) What should you post on Mondays in the 7-day calendar? 3) Should you lead with product or lifestyle content? 4) How many days should you engage before sending a DM? 5) What is the proper way to optimize your Instagram bio? 6) True/False: Reels get 10x more reach than static posts. 7) What should you NOT do when DMing prospects? 8) How do you use Instagram Stories for lead generation? 9) Should you copy corporate graphics or create your own? 10) What platform requires a business page for ads?')}
                      style={{background:"rgba(245,222,179,0.1)",border:"1px solid rgba(245,222,179,0.2)",padding:"10px 16px",borderRadius:8,color:"var(--champagne)",fontWeight:600,cursor:"pointer",fontSize:13,width:"100%"}}
                    >
                      Take Module 4 Quiz (Retake Anytime)
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Module 5 */}
            <div style={{marginBottom:20}}>
              <button onClick={() => setExpandedModule(expandedModule === 'tier1-mod5' ? null : 'tier1-mod5')} style={{width:"100%",padding:16,borderRadius:12,background:"rgba(245,222,179,0.06)",border:"1px solid rgba(245,222,179,0.12)",color:"var(--champagne)",fontWeight:700,fontSize:17,textAlign:"left",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                Module 5: Why These Products Are Worth It (Purity & Value Education)
                <span style={{fontSize:20}}>{expandedModule === 'tier1-mod5' ? '−' : '+'}</span>
              </button>
              
              {expandedModule === 'tier1-mod5' && (
                <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)",marginTop:12}}>
                  <h4 style={{fontSize:15,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>Understanding Purity, Testing & REAL Value (Not Just Price)</h4>
                  <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:16}}>
                    "Why are these oils so expensive?" - you'll hear this CONSTANTLY. The answer isn't about price, it's about purity, potency, and cost-per-use. Here's how to confidently explain why therapeutic-grade essential oils are worth every penny (and actually cheaper than grocery store oils when you break it down).
                  </p>

                  <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>💧 Cost Per Drop: The REAL Math</h5>
                  <div style={{padding:14,borderRadius:8,background:"rgba(218,165,112,0.08)",border:"1px solid rgba(218,165,112,0.15)",marginBottom:16}}>
                    <p style={{fontSize:12,color:"var(--champagne)",lineHeight:1.7,marginBottom:10}}>
                      <strong>Therapeutic-Grade Lavender ($30 for 15mL = 300 drops):</strong><br/>
                      $30 ÷ 300 drops = <strong>$0.10 per drop</strong><br/>
                      Typical use: 2-4 drops per application = $0.20-0.40 per use<br/>
                      One bottle lasts 2-6 months depending on frequency
                    </p>
                    <p style={{fontSize:12,color:"var(--champagne)",lineHeight:1.7,marginBottom:10}}>
                      <strong>Grocery Store "Lavender" ($8 for 10mL = 200 drops):</strong><br/>
                      $8 ÷ 200 drops = <strong>$0.04 per drop</strong><br/>
                      BUT: Contains synthetic fragrance, fillers, and adulterants<br/>
                      NOT safe for internal use or undiluted topical application<br/>
                      Weak therapeutic effect - need 3-4x as many drops = $0.12-0.16 per use
                    </p>
                    <p style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.7}}>
                      <strong>THE TRUTH:</strong> Therapeutic oils are more cost-effective because they're PURE and POTENT. One drop of pure Peppermint oil = 28 cups of peppermint tea worth of active compounds.
                    </p>
                  </div>

                  <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>🔬 What Makes Therapeutic-Grade Different (GC/MS Testing)</h5>
                  <div style={{padding:14,borderRadius:8,background:"rgba(245,222,179,0.06)",border:"1px solid rgba(245,222,179,0.12)",marginBottom:16}}>
                    <p style={{fontSize:12,color:"var(--champagne)",fontWeight:700,marginBottom:8}}>GC/MS Testing (Gas Chromatography / Mass Spectrometry):</p>
                    <p style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.7,marginBottom:10}}>
                      Every batch tested to verify ZERO adulterants, synthetic fillers, pesticides, or heavy metals. Each bottle has traceable batch code linking to published test results. This is pharmaceutical-grade quality control.
                    </p>
                    <p style={{fontSize:12,color:"var(--champagne)",fontWeight:700,marginBottom:8}}>What Cheap Oils Contain (Proven by Independent Testing):</p>
                    <ul style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.7,paddingLeft:20}}>
                      <li>Synthetic fragrance chemicals (cheaper than real plant extraction)</li>
                      <li>Carrier oil dilution (sold as "pure" but actually 20-50% diluted)</li>
                      <li>Pesticide residue from non-organic plant sources</li>
                      <li>Related species substitution (selling cheaper plant as expensive oil)</li>
                      <li>No third-party testing or quality verification</li>
                    </ul>
                  </div>

                  <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>💪 Why Purity Matters for Results</h5>
                  <div style={{padding:14,borderRadius:8,background:"rgba(230,183,165,0.08)",border:"1px solid rgba(230,183,165,0.12)",marginBottom:16}}>
                    <p style={{fontSize:12,color:"var(--champagne)",lineHeight:1.7,marginBottom:8}}>
                      <strong>Internal Use Safety:</strong> Only therapeutic-grade oils are safe for internal consumption. Synthetic oils and adulterants can cause liver damage, allergic reactions, and toxic buildup.
                    </p>
                    <p style={{fontSize:12,color:"var(--champagne)",lineHeight:1.7,marginBottom:8}}>
                      <strong>Therapeutic Potency:</strong> Pure oils have higher concentrations of active compounds (e.g., linalool in Lavender, limonene in Lemon). More active compounds = better results = fewer drops needed.
                    </p>
                    <p style={{fontSize:12,color:"var(--champagne)",lineHeight:1.7}}>
                      <strong>No Toxic Load:</strong> Cheap oils with pesticides, heavy metals, and synthetic chemicals ADD to your body's toxic burden instead of supporting detoxification.
                    </p>
                  </div>

                  <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>🆚 Comparison: Therapeutic vs MLM Competitors vs Retail Brands</h5>
                  <div style={{padding:14,borderRadius:8,background:"rgba(218,165,112,0.06)",border:"1px solid rgba(218,165,112,0.1)",marginBottom:16,fontSize:11,color:"var(--champagne)",lineHeight:1.8,fontFamily:"monospace"}}>
                    <strong>PREMIUM THERAPEUTIC-GRADE (Your Products):</strong><br/>
                    ✅ GC/MS tested every batch<br/>
                    ✅ CPTG or similar purity certification<br/>
                    ✅ Safe for internal, topical, aromatic use<br/>
                    ✅ Organic or wildcrafted sourcing<br/>
                    ✅ Traceable batch codes<br/>
                    ✅ 100% pure, no fillers<br/>
                    Price: $20-90 per 15mL bottle<br/><br/>

                    <strong>OTHER MLM ESSENTIAL OIL COMPANIES:</strong><br/>
                    ⚠️ Some testing, quality varies by company<br/>
                    ⚠️ May use similar purity standards OR lower-grade sourcing<br/>
                    ⚠️ Check individual company testing transparency<br/>
                    ⚠️ Some allow internal use, some don't<br/>
                    Price: $15-70 per bottle (varies widely)<br/><br/>

                    <strong>RETAIL/GROCERY STORE BRANDS:</strong><br/>
                    ❌ No GC/MS testing published<br/>
                    ❌ Often diluted with carrier oils (not disclosed)<br/>
                    ❌ Synthetic fragrance labeled as "essential oil"<br/>
                    ❌ NOT safe for internal or neat topical use<br/>
                    ❌ Pesticides, adulterants common<br/>
                    Price: $5-15 per bottle (cheap for a reason)
                  </div>

                  <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>🎯 How to Handle "Too Expensive" Objection (Value, Not Price)</h5>
                  <div style={{padding:12,borderRadius:8,background:"rgba(245,222,179,0.06)",border:"1px solid rgba(245,222,179,0.12)",marginBottom:16}}>
                    <p style={{fontSize:12,color:"var(--rosegold)",fontWeight:700,marginBottom:8,fontStyle:"italic"}}>"These oils cost $30-40 each - isn't that expensive?"</p>
                    <p style={{fontSize:11,color:"var(--champagne)",lineHeight:1.7,marginBottom:0}}>
                      <strong>Your Response:</strong> "I thought the same thing at first! But let me show you the math. This $30 Lavender bottle has 300 drops. You use 2-4 drops per application, so it lasts 75-150 uses - that's 3-6 MONTHS. Compare that to a $6 bottle of melatonin pills that lasts 30 days, or $40/month on candles that don't even have therapeutic benefits. Plus, this Lavender works for sleep AND anxiety AND minor burns AND skin care - it's replacing 4-5 products you're already buying. When you break it down by cost-per-use AND factor in purity, it's actually the cheapest option. And once you're a member, you get 25% off everything for life. Want me to show you how I save $200+ monthly by switching to oils?"
                    </p>
                  </div>

                  <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>💡 Value Stacking: How One Oil Replaces Multiple Products</h5>
                  <div style={{padding:14,borderRadius:8,background:"rgba(218,165,112,0.06)",border:"1px solid rgba(218,165,112,0.1)",marginBottom:16,fontSize:11,color:"var(--rosegold)",lineHeight:1.8}}>
                    <strong>PEPPERMINT OIL ($30) Replaces:</strong><br/>
                    • Tylenol/Advil for headaches ($12/month)<br/>
                    • Digestive aids like Tums ($8/month)<br/>
                    • Energy drinks/coffee ($40/month)<br/>
                    • Breath mints ($5/month)<br/>
                    <strong>Total replaced: $65/month in products</strong><br/><br/>

                    <strong>LAVENDER OIL ($30) Replaces:</strong><br/>
                    • Melatonin sleep aids ($15/month)<br/>
                    • Anxiety medications or calming supplements ($30/month)<br/>
                    • Expensive candles ($25/month)<br/>
                    • First aid ointment for minor burns ($8)<br/>
                    <strong>Total replaced: $78/month in products</strong><br/><br/>

                    <strong>LEMON OIL ($15) Replaces:</strong><br/>
                    • All-purpose cleaner ($12/month)<br/>
                    • Air fresheners ($10/month)<br/>
                    • Detox supplements ($25/month)<br/>
                    • Flavor extracts for cooking ($8)<br/>
                    <strong>Total replaced: $55/month in products</strong>
                  </div>

                  <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>📊 Sample Comparison Script (Use With Prospects)</h5>
                  <div style={{padding:12,borderRadius:8,background:"rgba(245,222,179,0.06)",border:"1px solid rgba(245,222,179,0.12)",marginBottom:16}}>
                    <p style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.7,fontStyle:"italic"}}>
                      "Let me show you why I switched from store-bought oils to therapeutic-grade. I used to buy those $8 lavender bottles from Target - they smelled nice but didn't DO anything. I'd use 10 drops in my diffuser and barely smell it. Turns out they were diluted with carrier oil and synthetic fragrance (legal loophole - they can still call it 'lavender oil'). When I switched to therapeutic-grade, I only needed 2-3 drops for the same diffusion, AND it actually helped me sleep. The bottle costs $30 but lasts me 4 months instead of 3 weeks. Plus, I can use it internally for anxiety (can't do that with synthetic oils - you'd poison yourself). AND it's safe to apply undiluted to my skin for burns. One pure oil replaces five cheap products. That's why I pay more - it's actually LESS expensive when you calculate cost-per-use and multi-functionality. Make sense?"
                    </p>
                  </div>

                  <div style={{padding:16,borderRadius:10,background:"rgba(230,183,165,0.08)",border:"1px solid rgba(230,183,165,0.15)",marginBottom:16}}>
                    <h4 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>📚 Purity Education Resources</h4>
                    <ul style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.8,paddingLeft:20}}>
                      <li><a href="https://www.youtube.com/results?search_query=essential+oil+purity+testing+gcms" target="_blank" rel="noopener noreferrer" style={{color:"var(--rosegold)",textDecoration:"underline"}}>Video: GC/MS Testing Explained (YouTube)</a></li>
                      <li><a href="https://www.youtube.com/results?search_query=essential+oils+adulteration+synthetic" target="_blank" rel="noopener noreferrer" style={{color:"var(--rosegold)",textDecoration:"underline"}}>Video: How Essential Oils Are Adulterated (YouTube)</a></li>
                      <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4606594/" target="_blank" rel="noopener noreferrer" style={{color:"var(--rosegold)",textDecoration:"underline"}}>Research: Essential Oil Quality & Adulteration Detection (PubMed)</a></li>
                    </ul>
                  </div>

                  <h4 style={{fontSize:15,color:"var(--champagne)",fontWeight:700,marginBottom:12,marginTop:20}}>The Enrollment Conversation: How to Invite Without Feeling Pushy</h4>
                  <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:16}}>
                    Now that they understand VALUE, enrollment becomes natural. You're not selling - you're sharing a solution to a problem they already have.
                  </p>

                  <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>The 3-Step Enrollment Framework</h5>
                  <div style={{padding:14,borderRadius:8,background:"rgba(218,165,112,0.08)",border:"1px solid rgba(218,165,112,0.15)",marginBottom:16}}>
                    <p style={{fontSize:13,color:"var(--champagne)",fontWeight:700,marginBottom:8}}>Step 1: Discover their pain point (Ask questions)</p>
                    <p style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.7,marginBottom:10}}>
                      "What made you interested in trying the oils?" / "What wellness goals are you working on right now?" / "Have you tried anything natural before?"
                    </p>
                    
                    <p style={{fontSize:13,color:"var(--champagne)",fontWeight:700,marginBottom:8}}>Step 2: Share a relatable story (Build connection)</p>
                    <p style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.7,marginBottom:10}}>
                      "I totally get it - I struggled with the same thing! Here's what changed for me when I started using [specific oil]..." Make it personal, not a sales pitch.
                    </p>
                    
                    <p style={{fontSize:13,color:"var(--champagne)",fontWeight:700,marginBottom:8}}>Step 3: Invite them to try it (Soft close)</p>
                    <p style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.7,marginBottom:0}}>
                      "Would you be open to trying a sample?" / "I'd love to help you get started with a starter kit - it comes with everything you need." / "Are you interested in just using the products, or would you like to save 25% and earn rewards?"
                    </p>
                  </div>

                  <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>Word-for-Word Scripts</h5>
                  
                  <div style={{padding:12,borderRadius:8,background:"rgba(245,222,179,0.06)",border:"1px solid rgba(245,222,179,0.12)",marginBottom:12}}>
                    <p style={{fontSize:12,color:"var(--champagne)",fontWeight:700,marginBottom:6}}>💬 Script 1: Inviting a Friend Who's Tried Your Sample</p>
                    <p style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.6,fontStyle:"italic"}}>
                      "Hey! I know you tried the Lavender I gave you last week. What did you think? ... Awesome! So you have two options - I can just sell you a bottle at retail price, OR you can open a wholesale account for free and get 25% off for life. A lot of people do that even if they never plan to sell anything. Which sounds better to you?"
                    </p>
                  </div>

                  <div style={{padding:12,borderRadius:8,background:"rgba(245,222,179,0.06)",border:"1px solid rgba(245,222,179,0.12)",marginBottom:12}}>
                    <p style={{fontSize:12,color:"var(--champagne)",fontWeight:700,marginBottom:6}}>💬 Script 2: Cold Market / Social Media DM</p>
                    <p style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.6,fontStyle:"italic"}}>
                      "Hey! I saw your post about [their problem]. I actually started using essential oils for the same thing and saw a huge difference. Would you be open to me sending you some info? No pressure at all - I just love sharing what's worked for me!"
                    </p>
                  </div>

                  <div style={{padding:12,borderRadius:8,background:"rgba(245,222,179,0.06)",border:"1px solid rgba(245,222,179,0.12)",marginBottom:12}}>
                    <p style={{fontSize:12,color:"var(--champagne)",fontWeight:700,marginBottom:6}}>💬 Script 3: Transitioning from Customer to Distributor</p>
                    <p style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.6,fontStyle:"italic"}}>
                      "I'm so glad you're loving the products! Quick question - have you had any friends or family ask about what you're using? ... Yeah! So here's the thing - if you're going to be sharing them anyway, you might as well get paid for it. Want to hear how the business side works? It's super simple and there's no pressure to do anything you don't want to."
                    </p>
                  </div>

                  <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>Handling Common Objections</h5>
                  <ul style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.8,paddingLeft:20,marginBottom:16}}>
                    <li><strong>"It's too expensive."</strong><br/>"I totally understand - I thought the same thing at first! But when I broke it down, I was spending way more on [candles, supplements, cleaning products] that don't even work as well. Plus, once you're a member, you get 25% off and free shipping on big orders."</li>
                    <li><strong>"I don't have time."</strong><br/>"That's fair! The cool thing is, this isn't a time-for-money trade. You can literally spend 30 minutes a week just sharing on social media and still see results. No inventory, no parties if you don't want to. It's as big or small as you make it."</li>
                    <li><strong>"I'm not a salesperson."</strong><br/>"Neither am I! That's why this works. You're not selling - you're recommending. It's like when you tell someone about a good restaurant. If they try it and love it, you feel good. Same thing here, except you get paid."</li>
                    <li><strong>"Is this a pyramid scheme?"</strong><br/>"Great question - I was skeptical too. The difference is pyramid schemes make money from recruiting. This company makes money from selling actual products to real customers. In fact, 70% of sales have to go to non-distributors by law. I can send you the FTC guidelines if you want to see how it's regulated."</li>
                  </ul>

                  <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>The Enrollment Walkthrough</h5>
                  <p style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.7,marginBottom:12}}>
                    Once they say yes, make it EASY. Don't just send a link and disappear.
                  </p>
                  <ol style={{fontSize:12,color:"var(--champagne)",lineHeight:1.8,paddingLeft:20,marginBottom:16}}>
                    <li>Screen share or FaceTime while they fill out the enrollment form</li>
                    <li>Help them choose their starter kit based on their goals</li>
                    <li>Explain the benefits (25% discount, product credits, monthly promos)</li>
                    <li>Set up their Loyalty Rewards Program (autoship) so they don't forget to order</li>
                    <li>Add them to your customer/team group immediately</li>
                    <li>Follow up within 24 hours: "Did your order go through? When do you want to hop on a call to go over how to use everything?"</li>
                  </ol>

                  <div style={{padding:16,borderRadius:10,background:"rgba(230,183,165,0.08)",border:"1px solid rgba(230,183,165,0.15)"}}>
                    <h4 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>📚 Enrollment Resources</h4>
                    <ul style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.8,paddingLeft:20,marginBottom:16}}>
                      <li><a href="https://www.youtube.com/results?search_query=mlm+enrollment+conversation+training" target="_blank" rel="noopener noreferrer" style={{color:"var(--rosegold)",textDecoration:"underline"}}>Video: Enrollment Conversation Training (YouTube)</a></li>
                      <li><a href="https://www.youtube.com/results?search_query=mlm+objection+handling+scripts" target="_blank" rel="noopener noreferrer" style={{color:"var(--rosegold)",textDecoration:"underline"}}>Video: Objection Handling Masterclass (YouTube)</a></li>
                      <li><a href="https://www.youtube.com/results?search_query=mlm+how+to+enroll+new+distributors" target="_blank" rel="noopener noreferrer" style={{color:"var(--rosegold)",textDecoration:"underline"}}>Video: How to Enroll New Distributors (YouTube)</a></li>
                    </ul>
                  </div>

                  <div style={{padding:16,borderRadius:10,background:"rgba(218,165,112,0.12)",border:"1px solid rgba(218,165,112,0.25)",marginTop:16}}>
                    <h4 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>✅ Module 5 Knowledge Check (10 Questions)</h4>
                    <button
                      onClick={() => alert('Quiz: 1) What is cost per drop for therapeutic vs grocery store oils? 2) What does GC/MS testing verify? 3) Name 3 adulterants found in cheap oils. 4) How many cups of tea equals 1 drop of Peppermint oil? 5) What does Peppermint oil replace (name 3 products)? 6) What does Lavender oil replace? 7) Why can\'t you use grocery store oils internally? 8) What is the 3-step enrollment framework? 9) How do you handle "too expensive" objection using value stacking? 10) What should you do within 24 hours of enrollment?')}
                      style={{background:"rgba(245,222,179,0.1)",border:"1px solid rgba(245,222,179,0.2)",padding:"10px 16px",borderRadius:8,color:"var(--champagne)",fontWeight:600,cursor:"pointer",fontSize:13,width:"100%"}}
                    >
                      Take Module 5 Quiz
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TierLock>
      )
    },
    tier2: {
      title: "Tier 2: Advanced",
      icon: GraduationCap,
      content: (
        <TierLock requiredTier="tier2">
          <div>
            <div style={{padding:24,borderRadius:16,background:"linear-gradient(180deg, rgba(218,165,112,0.12), rgba(185,135,93,0.08))",border:"1px solid rgba(218,165,112,0.2)",marginBottom:24}}>
              <h3 style={{fontSize:20,color:"var(--champagne)",marginBottom:10,fontWeight:700}}>Tier 2: Team Building & Scale</h3>
              <p style={{fontSize:14,color:"var(--rosegold)",marginBottom:16,lineHeight:1.6}}>
                Build duplicatable systems, recruit strategically, develop leaders, and advance through company ranks.
              </p>
            </div>

            {/* NEW YEAR RECRUITING PLAYBOOK */}
            <div style={{marginBottom:20}}>
              <button onClick={() => setExpandedModule(expandedModule === 'tier2-recruiting' ? null : 'tier2-recruiting')} style={{width:"100%",padding:16,borderRadius:12,background:"rgba(245,222,179,0.06)",border:"1px solid rgba(245,222,179,0.12)",color:"var(--champagne)",fontWeight:700,fontSize:17,textAlign:"left",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                🔥 NEW: January New Year Recruiting Playbook
                <span style={{fontSize:20}}>{expandedModule === 'tier2-recruiting' ? '−' : '+'}</span>
              </button>
              
              {expandedModule === 'tier2-recruiting' && (
                <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)",marginTop:12}}>
                  <h4 style={{fontSize:15,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>January Recruiting: Why New Year is Your Biggest Opportunity</h4>
                  <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:16}}>
                    January recruiting outperforms every other month 3:1. People are motivated, setting resolutions, joining gyms, starting diets, and looking for fresh starts. Your wellness business IS their fresh start. Here's how to position it.
                  </p>

                  <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>💬 Resolution-Based Invitation Scripts</h5>
                  
                  <div style={{padding:12,borderRadius:8,background:"rgba(218,165,112,0.06)",border:"1px solid rgba(218,165,112,0.1)",marginBottom:12}}>
                    <p style={{fontSize:12,color:"var(--rosegold)",fontWeight:700,marginBottom:6}}>Script 1: Health & Wellness Resolutions</p>
                    <p style={{fontSize:11,color:"var(--champagne)",lineHeight:1.7,fontStyle:"italic"}}>
                      "Hey! I know everyone's setting New Year goals right now. What's YOUR biggest health goal for 2026? ... [Listen] ... That's awesome! I'm actually doing a 21-day wellness reset in January - focusing on [their goal]. Want to join me? I'll send you the free protocol and we can support each other. No commitment, just accountability!"
                    </p>
                  </div>

                  <div style={{padding:12,borderRadius:8,background:"rgba(218,165,112,0.06)",border:"1px solid rgba(218,165,112,0.1)",marginBottom:12}}>
                    <p style={{fontSize:12,color:"var(--rosegold)",fontWeight:700,marginBottom:6}}>Script 2: Financial Goals / Side Income Seekers</p>
                    <p style={{fontSize:11,color:"var(--champagne)",lineHeight:1.7,fontStyle:"italic"}}>
                      "I see everyone posting their 2026 goals! What's yours? ... [Listen] ... Love that! So this might sound random, but I'm building a side income this year with wellness products - like, actually making progress on my financial goals instead of just wishing. Would you be open to hearing how it works? Not asking you to do anything, just curious if you'd want to learn about it since we're both focused on leveling up this year."
                    </p>
                  </div>

                  <div style={{padding:12,borderRadius:8,background:"rgba(218,165,112,0.06)",border:"1px solid rgba(218,165,112,0.1)",marginBottom:16}}>
                    <p style={{fontSize:12,color:"var(--rosegold)",fontWeight:700,marginBottom:6}}>Script 3: The "New Year, New Income" Close</p>
                    <p style={{fontSize:11,color:"var(--champagne)",lineHeight:1.7,fontStyle:"italic"}}>
                      "So you have two options: just buy the products at retail, OR open a free membership account and get 25% off everything for life. Most people do the membership even if they never sell anything - it's literally free money saved. PLUS, if you decide you want to build income later (totally optional), you're already set up. It's a New Year, New You thing - why not start fresh with a new way to save and potentially earn? Which sounds better to you?"
                    </p>
                  </div>

                  <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>🎯 The January Challenge Funnel</h5>
                  <div style={{padding:14,borderRadius:8,background:"rgba(218,165,112,0.08)",border:"1px solid rgba(218,165,112,0.15)",marginBottom:16}}>
                    <p style={{fontSize:12,color:"var(--champagne)",fontWeight:700,marginBottom:8}}>Step 1: Announce Your Challenge (Jan 1-3)</p>
                    <p style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.7,marginBottom:10}}>
                      Post on social media: "I'm doing a 21-Day Wellness Reset starting January 6th! Who wants to join me? It's FREE - just accountability and natural solutions. Comment 'IN' if you want the protocol!"
                    </p>
                    
                    <p style={{fontSize:12,color:"var(--champagne)",fontWeight:700,marginBottom:8}}>Step 2: Send Challenge Details (Jan 4-5)</p>
                    <p style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.7,marginBottom:10}}>
                      DM everyone who said "IN": "Here's the protocol! [Link to PDF]. To do this properly, you'll need these 3 oils: Lemon, Peppermint, Lavender. I can get you a starter kit at wholesale price OR you can buy retail. Want me to help you get set up?"
                    </p>
                    
                    <p style={{fontSize:12,color:"var(--champagne)",fontWeight:700,marginBottom:8}}>Step 3: Run the Challenge (Jan 6-26)</p>
                    <p style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.7,marginBottom:10}}>
                      Daily check-ins in group chat or FB group. Share wins, answer questions, build community. By Day 21, they're hooked on the products and results.
                    </p>
                    
                    <p style={{fontSize:12,color:"var(--champagne)",fontWeight:700,marginBottom:8}}>Step 4: Transition to Business (Jan 27-31)</p>
                    <p style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.7}}>
                      "You crushed the challenge! Have any friends asked what you're doing? [Yes] Perfect! Want to learn how you can get PAID when people you refer sign up? It's literally the same thing you just did - share what works - except now you earn commissions. 10 minutes to explain it?"
                    </p>
                  </div>

                  <div style={{padding:16,borderRadius:10,background:"rgba(230,183,165,0.08)",border:"1px solid rgba(230,183,165,0.15)"}}>
                    <h4 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>📚 January Recruiting Resources</h4>
                    <ul style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.8,paddingLeft:20}}>
                      <li><a href="https://www.youtube.com/results?search_query=new+year+mlm+recruiting" target="_blank" rel="noopener noreferrer" style={{color:"var(--rosegold)",textDecoration:"underline"}}>Video: New Year Recruiting Strategy (YouTube)</a></li>
                      <li><a href="https://www.youtube.com/results?search_query=resolution+based+sales" target="_blank" rel="noopener noreferrer" style={{color:"var(--rosegold)",textDecoration:"underline"}}>Video: Resolution-Based Sales Techniques (YouTube)</a></li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div style={{marginBottom:20}}>
              <button onClick={() => setExpandedModule(expandedModule === 'tier2-mod1' ? null : 'tier2-mod1')} style={{width:"100%",padding:16,borderRadius:12,background:"rgba(245,222,179,0.06)",border:"1px solid rgba(245,222,179,0.12)",color:"var(--champagne)",fontWeight:700,fontSize:17,textAlign:"left",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                Module 1: The Duplication System
                <span style={{fontSize:20}}>{expandedModule === 'tier2-mod1' ? '−' : '+'}</span>
              </button>
              
              {expandedModule === 'tier2-mod1' && (
                <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)",marginTop:12}}>
                  <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:16}}>
                    Duplication is THE secret to MLM success. Your income doesn't come from being the best salesperson - it comes from creating a simple system that ANYONE can copy. If your process requires special skills or you doing everything, it dies at 5-10 people. Simple systems create organizations of hundreds.
                  </p>
                  <ul style={{fontSize:13,color:"var(--champagne)",lineHeight:1.8,paddingLeft:20,marginBottom:16}}>
                    <li><strong>Get Started Right:</strong> Products ordered, website set up, daily product use (Week 1)</li>
                    <li><strong>Learn Products Fast:</strong> Master top 20 oils via flashcards and trainings (Week 2)</li>
                    <li><strong>Make Your List:</strong> 100 names, start inviting with samples (Week 3)</li>
                    <li><strong>Share & Enroll:</strong> Host classes, make sales and enrollments (Week 4)</li>
                    <li><strong>Teach Others:</strong> When they enroll someone, teach them this exact system</li>
                  </ul>
                  <div style={{padding:16,borderRadius:10,background:"rgba(230,183,165,0.08)",border:"1px solid rgba(230,183,165,0.15)"}}>
                    <h4 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>📚 Duplication Resources</h4>
                    <ul style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.8,paddingLeft:20,marginBottom:16}}>
                      <li><a href="https://www.youtube.com/watch?v=yRRSbl7tt4s" target="_blank" rel="noopener noreferrer" style={{color:"var(--rosegold)",textDecoration:"underline"}}>Video: How To Create Duplication in Network Marketing (YouTube)</a></li>
                      <li><a href="https://www.youtube.com/watch?v=9Gdt2Gvbzow" target="_blank" rel="noopener noreferrer" style={{color:"var(--rosegold)",textDecoration:"underline"}}>Video: The Secret to Duplication by Todd Falcone (YouTube)</a></li>
                      <li><a href="http://download.e-bookshelf.de/download/0000/5854/22/L-G-0000585422-0002384637.pdf" target="_blank" rel="noopener noreferrer" style={{color:"var(--rosegold)",textDecoration:"underline"}}>Free eBook: 15 Secrets Every Network Marketer Must Know (PDF)</a></li>
                    </ul>
                  </div>

                  <div style={{padding:16,borderRadius:10,background:"rgba(218,165,112,0.12)",border:"1px solid rgba(218,165,112,0.25)",marginTop:16}}>
                    <h4 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>✅ Tier 2 Module 1 Knowledge Check (10 Questions)</h4>
                    <button
                      onClick={() => alert('Quiz: 1) What is the 5-step duplication system? 2) Can you build a large organization without duplication? 3) What happens in Week 1 of fast start? 4) What happens in Week 2? 5) What is the purpose of Week 3? 6) What does a new enrollee do in Week 4? 7) Why must the system be simple? 8) How many people can you personally manage effectively? 9) What is the goal of duplication? 10) Who should you teach the duplication system to?')}
                      style={{background:"rgba(245,222,179,0.1)",border:"1px solid rgba(245,222,179,0.2)",padding:"10px 16px",borderRadius:8,color:"var(--champagne)",fontWeight:600,cursor:"pointer",fontSize:13,width:"100%"}}
                    >
                      Take Module Quiz (Retake Anytime)
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Module 2 */}
            <div style={{marginBottom:20}}>
              <button onClick={() => setExpandedModule(expandedModule === 'tier2-mod2' ? null : 'tier2-mod2')} style={{width:"100%",padding:16,borderRadius:12,background:"rgba(245,222,179,0.06)",border:"1px solid rgba(245,222,179,0.12)",color:"var(--champagne)",fontWeight:700,fontSize:17,textAlign:"left",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                Module 2: Identifying & Developing Leaders
                <span style={{fontSize:20}}>{expandedModule === 'tier2-mod2' ? '−' : '+'}</span>
              </button>
              
              {expandedModule === 'tier2-mod2' && (
                <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)",marginTop:12}}>
                  <h4 style={{fontSize:15,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>Identifying & Developing Leaders</h4>
                  <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:16}}>
                    Your income is limited by YOUR time until you develop leaders who can build without you. The difference between making $2k/month and $20k/month is this: leaders. Not more distributors - more LEADERS.
                  </p>

                  <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>The 3 Types of Team Members</h5>
                  <div style={{padding:12,borderRadius:8,background:"rgba(218,165,112,0.08)",border:"1px solid rgba(218,165,112,0.12)",marginBottom:16}}>
                    <p style={{fontSize:12,color:"var(--champagne)",fontWeight:700,marginBottom:6}}>1. Customers (70-80%)</p>
                    <p style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.6,marginBottom:10}}>
                      Signed up for the discount. Order monthly for personal use. Will never build a team. <strong>Your job:</strong> Keep them happy and ordering. Don't pressure them to recruit.
                    </p>
                    
                    <p style={{fontSize:12,color:"var(--champagne)",fontWeight:700,marginBottom:6}}>2. Casual Builders (15-20%)</p>
                    <p style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.6,marginBottom:10}}>
                      Want to make some extra money. Share occasionally. Might enroll 3-10 people total. <strong>Your job:</strong> Teach them how to share and make retail profit. Light mentorship.
                    </p>
                    
                    <p style={{fontSize:12,color:"var(--champagne)",fontWeight:700,marginBottom:6}}>3. Serious Leaders (5-10%)</p>
                    <p style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.6,marginBottom:0}}>
                      Treat it like a business. Show up consistently. Hit rank goals. Build teams that duplicate. <strong>Your job:</strong> Pour EVERYTHING into these people. This is where your leverage comes from.
                    </p>
                  </div>

                  <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>How to Spot a Potential Leader (First 7 Days)</h5>
                  <ul style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.8,paddingLeft:20,marginBottom:16}}>
                    <li>They ask questions BEFORE you offer training (self-motivated)</li>
                    <li>They place their order within 24 hours of enrolling (decisive)</li>
                    <li>They show up to team calls without being reminded (coachable)</li>
                    <li>They tag you in social posts about the products (not afraid to share)</li>
                    <li>They text you "I have a friend interested - can you help me close them?" (action-taker)</li>
                  </ul>

                  <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>The Leader Development Pipeline</h5>
                  <div style={{padding:14,borderRadius:8,background:"rgba(218,165,112,0.08)",border:"1px solid rgba(218,165,112,0.15)",marginBottom:16}}>
                    <p style={{fontSize:13,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>Days 1-30: Fast Start Training</p>
                    <ul style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.6,paddingLeft:20,marginBottom:12}}>
                      <li>Plug them into this exact back office training</li>
                      <li>1-on-1 onboarding call within 48 hours</li>
                      <li>Help them make their first sale within 7 days</li>
                      <li>Weekly check-ins: "How many people did you talk to this week?"</li>
                    </ul>
                    
                    <p style={{fontSize:13,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>Days 31-90: Skill Building</p>
                    <ul style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.6,paddingLeft:20,marginBottom:12}}>
                      <li>Observe your oil classes, then co-host with you</li>
                      <li>Teach them to host their own classes solo</li>
                      <li>Role-play objection handling scenarios</li>
                      <li>Help them hit their first rank promotion</li>
                    </ul>
                    
                    <p style={{fontSize:13,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>Days 91-180: Leadership Emergence</p>
                    <ul style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.6,paddingLeft:20,marginBottom:0}}>
                      <li>They enroll their first serious builder</li>
                      <li>You teach them to train THAT person (duplication)</li>
                      <li>They start leading team calls and trainings</li>
                      <li>You transition from manager to mentor (less hands-on)</li>
                    </ul>
                  </div>

                  <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>The 80/20 Rule of Leadership Development</h5>
                  <p style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.7,marginBottom:16}}>
                    <strong>Spend 80% of your time with the top 20% of your team.</strong> Most people waste time trying to "motivate" unmotivated people. Stop. Pour your energy into those who are ALREADY showing up. The rest will either catch fire later or stay customers. Both are okay.
                  </p>

                  <div style={{padding:16,borderRadius:10,background:"rgba(230,183,165,0.08)",border:"1px solid rgba(230,183,165,0.15)"}}>
                    <h4 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>📚 Leadership Resources</h4>
                    <ul style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.8,paddingLeft:20,marginBottom:16}}>
                      <li><a href="https://www.youtube.com/results?search_query=mlm+leader+development+training" target="_blank" rel="noopener noreferrer" style={{color:"var(--rosegold)",textDecoration:"underline"}}>Video: Leader Development Training (YouTube)</a></li>
                      <li><a href="https://www.youtube.com/results?search_query=network+marketing+team+building" target="_blank" rel="noopener noreferrer" style={{color:"var(--rosegold)",textDecoration:"underline"}}>Video: Team Building Masterclass (YouTube)</a></li>
                      <li><a href="https://do-server1.sfs.uwm.edu/key/$VU12714306/course/VU36789/how+to+build+network+marketing+leaders+volume+one+step+by+step+creation+of+mlm+professionals.pdf" target="_blank" rel="noopener noreferrer" style={{color:"var(--rosegold)",textDecoration:"underline"}}>Free eBook: How To Build Network Marketing Leaders (PDF)</a></li>
                    </ul>
                  </div>

                  <div style={{padding:16,borderRadius:10,background:"rgba(218,165,112,0.12)",border:"1px solid rgba(218,165,112,0.25)",marginTop:16}}>
                    <h4 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>✅ Tier 2 Module 2 Knowledge Check (10 Questions)</h4>
                    <button
                      onClick={() => alert('Quiz: 1) What are the 3 types of team members? 2) What percentage are usually just customers? 3) What percentage become serious leaders? 4) How do you spot a potential leader in the first 7 days? 5) What is the 80/20 rule of leadership? 6) What happens in Days 1-30 of leader development? 7) What happens in Days 31-90? 8) What happens in Days 91-180? 9) When should you transition from manager to mentor? 10) Should you try to motivate unmotivated people?')}
                      style={{background:"rgba(245,222,179,0.1)",border:"1px solid rgba(245,222,179,0.2)",padding:"10px 16px",borderRadius:8,color:"var(--champagne)",fontWeight:600,cursor:"pointer",fontSize:13,width:"100%"}}
                    >
                      Take Module Quiz (Retake Anytime)
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Module 3 */}
            <div style={{marginBottom:20}}>
              <button onClick={() => setExpandedModule(expandedModule === 'tier2-mod3' ? null : 'tier2-mod3')} style={{width:"100%",padding:16,borderRadius:12,background:"rgba(245,222,179,0.06)",border:"1px solid rgba(245,222,179,0.12)",color:"var(--champagne)",fontWeight:700,fontSize:17,textAlign:"left",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                Module 3: Cold Market Recruiting
                <span style={{fontSize:20}}>{expandedModule === 'tier2-mod3' ? '−' : '+'}</span>
              </button>
              
              {expandedModule === 'tier2-mod3' && (
                <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)",marginTop:12}}>
                  <h4 style={{fontSize:15,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>Cold Market Recruiting: Build Beyond Your Warm Market</h4>
                  <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:16}}>
                    Your warm market runs out. Usually within 90-120 days. This is where most people quit. But top earners understand: warm market gets you started, cold market builds your empire. Here's how to talk to complete strangers and turn them into customers and team members.
                  </p>

                  <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>Why Cold Market is Actually EASIER Than Warm Market</h5>
                  <ul style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.8,paddingLeft:20,marginBottom:16}}>
                    <li>No awkward "I know you think this is weird..." conversations</li>
                    <li>They don't have preconceptions about you or MLM</li>
                    <li>They opted in because they're INTERESTED (not forced politeness)</li>
                    <li>No risk of ruining friendships if they say no</li>
                    <li>Unlimited supply - you'll never run out of new people</li>
                  </ul>

                  <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>The 3 Cold Market Channels</h5>
                  
                  <div style={{padding:12,borderRadius:8,background:"rgba(218,165,112,0.08)",border:"1px solid rgba(218,165,112,0.12)",marginBottom:12}}>
                    <p style={{fontSize:13,color:"var(--champagne)",fontWeight:700,marginBottom:8}}>1. Social Media (Facebook, Instagram, TikTok)</p>
                    <p style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.6,marginBottom:8}}>
                      <strong>Method:</strong> Post valuable content consistently. Let people come to YOU through DMs asking questions.
                    </p>
                    <p style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.6,marginBottom:8}}>
                      <strong>Example:</strong> Post a Reel: "3 essential oils I use instead of Tylenol" → 20 people DM asking for links → You invite them to try samples → 5 enroll.
                    </p>
                    <p style={{fontSize:11,color:"var(--champagne)",lineHeight:1.6,marginBottom:0}}>
                      <strong>Pro Tip:</strong> Use story polls and questions. "Which wellness topic should I cover next? A) Sleep B) Digestion C) Stress." Anyone who votes gets a DM from you.
                    </p>
                  </div>

                  <div style={{padding:12,borderRadius:8,background:"rgba(218,165,112,0.08)",border:"1px solid rgba(218,165,112,0.12)",marginBottom:12}}>
                    <p style={{fontSize:13,color:"var(--champagne)",fontWeight:700,marginBottom:8}}>2. Online Communities (Facebook Groups, Reddit, Forums)</p>
                    <p style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.6,marginBottom:8}}>
                      <strong>Method:</strong> Join groups related to wellness, natural living, work-from-home moms. GIVE value without pitching. Build trust first.
                    </p>
                    <p style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.6,marginBottom:8}}>
                      <strong>Example:</strong> Someone posts "My kid can't sleep at night - any natural remedies?" You comment: "We've had great results with Lavender and Cedarwood diffused. Happy to send you info if you want!" → They DM you.
                    </p>
                    <p style={{fontSize:11,color:"var(--champagne)",lineHeight:1.6,marginBottom:0}}>
                      <strong>Pro Tip:</strong> Don't spam. Answer 10 questions genuinely before you ever mention your business. Reputation over quick sale.
                    </p>
                  </div>

                  <div style={{padding:12,borderRadius:8,background:"rgba(218,165,112,0.08)",border:"1px solid rgba(218,165,112,0.12)",marginBottom:16}}>
                    <p style={{fontSize:13,color:"var(--champagne)",fontWeight:700,marginBottom:8}}>3. In-Person Networking (Local Events, Coffee Shops, Gym)</p>
                    <p style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.6,marginBottom:8}}>
                      <strong>Method:</strong> Strike up genuine conversations. Listen for pain points. Offer solutions naturally.
                    </p>
                    <p style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.6,marginBottom:8}}>
                      <strong>Example:</strong> At the gym: "Great workout! Do you use anything for muscle recovery? I swear by this Soothing Blend - want to try some?"
                    </p>
                    <p style={{fontSize:11,color:"var(--champagne)",lineHeight:1.6,marginBottom:0}}>
                      <strong>Pro Tip:</strong> Always carry samples and business cards. You never know when someone will ask "What do you do?"
                    </p>
                  </div>

                  <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>The Cold Market DM Script That Works</h5>
                  <div style={{padding:12,borderRadius:8,background:"rgba(245,222,179,0.06)",border:"1px solid rgba(245,222,179,0.12)",marginBottom:16}}>
                    <p style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.6,fontStyle:"italic"}}>
                      "Hey! I saw your comment in [group name] about [their problem]. I actually dealt with the same thing and started using essential oils - total game changer. I know it sounds random, but would you be open to trying a sample? I'd love to send you some (no cost, no strings attached). If it helps you like it helped me, awesome. If not, no worries!"
                    </p>
                  </div>

                  <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>Building a Lead Generation System</h5>
                  <ul style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.8,paddingLeft:20,marginBottom:16}}>
                    <li><strong>Step 1:</strong> Create a landing page (free via your company website)</li>
                    <li><strong>Step 2:</strong> Offer a free download (e.g., "10 Essential Oils Every Mom Needs")</li>
                    <li><strong>Step 3:</strong> They enter email to download</li>
                    <li><strong>Step 4:</strong> Follow-up email sequence (5-7 emails teaching about oils)</li>
                    <li><strong>Step 5:</strong> Invite them to a free oil class or consultation</li>
                    <li><strong>Step 6:</strong> Enroll them as customers or distributors</li>
                  </ul>

                  <div style={{padding:16,borderRadius:10,background:"rgba(230,183,165,0.08)",border:"1px solid rgba(230,183,165,0.15)"}}>
                    <h4 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>📚 Cold Market Resources</h4>
                    <ul style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.8,paddingLeft:20,marginBottom:16}}>
                      <li><a href="https://www.youtube.com/results?search_query=cold+market+recruiting+network+marketing" target="_blank" rel="noopener noreferrer" style={{color:"var(--rosegold)",textDecoration:"underline"}}>Video: Cold Market Recruiting Strategies (YouTube)</a></li>
                      <li><a href="https://www.youtube.com/results?search_query=mlm+social+media+lead+generation" target="_blank" rel="noopener noreferrer" style={{color:"var(--rosegold)",textDecoration:"underline"}}>Video: Social Media Lead Generation (YouTube)</a></li>
                      <li><a href="https://www.youtube.com/results?search_query=mlm+how+to+talk+to+strangers" target="_blank" rel="noopener noreferrer" style={{color:"var(--rosegold)",textDecoration:"underline"}}>Video: How to Approach Strangers Naturally (YouTube)</a></li>
                    </ul>
                  </div>

                  <div style={{padding:16,borderRadius:10,background:"rgba(218,165,112,0.12)",border:"1px solid rgba(218,165,112,0.25)",marginTop:16}}>
                    <h4 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>✅ Tier 2 Module 3 Knowledge Check (10 Questions)</h4>
                    <button
                      onClick={() => alert('Quiz: 1) Why does warm market run out? 2) Name the 3 cold market channels. 3) Why is cold market easier than warm market? 4) What is the social media cold market method? 5) How do you use online communities without spamming? 6) What should you do before pitching in groups? 7) What is the 6-step lead generation system? 8) What should a cold market DM say? 9) How do you use story polls for lead gen? 10) What is the benefit of unlimited cold market?')}
                      style={{background:"rgba(245,222,179,0.1)",border:"1px solid rgba(245,222,179,0.2)",padding:"10px 16px",borderRadius:8,color:"var(--champagne)",fontWeight:600,cursor:"pointer",fontSize:13,width:"100%"}}
                    >
                      Take Module Quiz (Retake Anytime)
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Module 4 */}
            <div style={{marginBottom:20}}>
              <button onClick={() => setExpandedModule(expandedModule === 'tier2-mod4' ? null : 'tier2-mod4')} style={{width:"100%",padding:16,borderRadius:12,background:"rgba(245,222,179,0.06)",border:"1px solid rgba(245,222,179,0.12)",color:"var(--champagne)",fontWeight:700,fontSize:17,textAlign:"left",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                Module 4: Rank Advancement Roadmap
                <span style={{fontSize:20}}>{expandedModule === 'tier2-mod4' ? '−' : '+'}</span>
              </button>
              
              {expandedModule === 'tier2-mod4' && (
                <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)",marginTop:12}}>
                  <h4 style={{fontSize:15,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>Rank Advancement Roadmap: Strategic Growth Planning</h4>
                  <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:16}}>
                    Rank advancement isn't about luck or working harder - it's about strategy. Each rank has specific requirements. Hit them systematically and the income follows. Here's the roadmap from Consultant to Diamond.
                  </p>

                  <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>Typical Rank Structure (Company Varies - Use Yours)</h5>
                  
                  <div style={{padding:12,borderRadius:8,background:"rgba(218,165,112,0.08)",border:"1px solid rgba(218,165,112,0.12)",marginBottom:12}}>
                    <p style={{fontSize:12,color:"var(--champagne)",fontWeight:700,marginBottom:6}}>Consultant → Silver (First 90 Days)</p>
                    <p style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.6,marginBottom:8}}>
                      <strong>Requirements:</strong> 100 PV personal + 500 GV team volume<br/>
                      <strong>Strategy:</strong> Enroll 3-5 customers who order monthly + 1 builder who duplicates<br/>
                      <strong>Income Range:</strong> $200-500/month
                    </p>
                  </div>

                  <div style={{padding:12,borderRadius:8,background:"rgba(218,165,112,0.08)",border:"1px solid rgba(218,165,112,0.12)",marginBottom:12}}>
                    <p style={{fontSize:12,color:"var(--champagne)",fontWeight:700,marginBottom:6}}>Silver → Gold (Months 4-12)</p>
                    <p style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.6,marginBottom:8}}>
                      <strong>Requirements:</strong> 100 PV personal + 2,000 GV + 2 legs with 500 GV each<br/>
                      <strong>Strategy:</strong> Find 2 serious builders. Help each hit Silver. Focus on duplication.<br/>
                      <strong>Income Range:</strong> $500-2,000/month
                    </p>
                  </div>

                  <div style={{padding:12,borderRadius:8,background:"rgba(218,165,112,0.08)",border:"1px solid rgba(218,165,112,0.12)",marginBottom:12}}>
                    <p style={{fontSize:12,color:"var(--champagne)",fontWeight:700,marginBottom:6}}>Gold → Platinum (Year 2)</p>
                    <p style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.6,marginBottom:8}}>
                      <strong>Requirements:</strong> 100 PV personal + 5,000 GV + 3 legs with 1,000 GV each<br/>
                      <strong>Strategy:</strong> Develop 3 Gold leaders. Teach them to build their own teams.<br/>
                      <strong>Income Range:</strong> $2,000-5,000/month
                    </p>
                  </div>

                  <div style={{padding:12,borderRadius:8,background:"rgba(218,165,112,0.08)",border:"1px solid rgba(218,165,112,0.12)",marginBottom:16}}>
                    <p style={{fontSize:12,color:"var(--champagne)",fontWeight:700,marginBottom:6}}>Platinum → Diamond (Year 3-5)</p>
                    <p style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.6,marginBottom:8}}>
                      <strong>Requirements:</strong> 100 PV personal + 15,000 GV + 6 legs with 2,500 GV each<br/>
                      <strong>Strategy:</strong> Build 6 strong organizations. Mentor Platinum leaders.<br/>
                      <strong>Income Range:</strong> $10,000-50,000+/month
                    </p>
                  </div>

                  <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>The 90-Day Rank Advancement Sprint</h5>
                  <p style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.7,marginBottom:12}}>
                    <strong>Month 1: Build Your Base</strong>
                  </p>
                  <ul style={{fontSize:11,color:"var(--champagne)",lineHeight:1.6,paddingLeft:20,marginBottom:12}}>
                    <li>Enroll 10 new people (mix of customers and builders)</li>
                    <li>Identify 2 potential leaders from your enrollees</li>
                    <li>Maintain your 100 PV personal volume</li>
                    <li>Host 4 oil classes or 1-on-1 appointments</li>
                  </ul>

                  <p style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.7,marginBottom:12}}>
                    <strong>Month 2: Leader Development</strong>
                  </p>
                  <ul style={{fontSize:11,color:"var(--champagne)",lineHeight:1.6,paddingLeft:20,marginBottom:12}}>
                    <li>Pour into your 2 leaders - help them each enroll 5 people</li>
                    <li>Continue enrolling 5 new people yourself</li>
                    <li>Track team volume weekly - adjust strategy as needed</li>
                    <li>Start building your 3rd leg if ahead of pace</li>
                  </ul>

                  <p style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.7,marginBottom:12}}>
                    <strong>Month 3: Push to Promotion</strong>
                  </p>
                  <ul style={{fontSize:11,color:"var(--champagne)",lineHeight:1.6,paddingLeft:20,marginBottom:16}}>
                    <li>Final sprint - enroll 10 more to hit volume requirements</li>
                    <li>Help your leaders close their pending prospects</li>
                    <li>Rally your team with a promotion challenge</li>
                    <li>Submit rank advancement application before deadline</li>
                  </ul>

                  <h5 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>Common Rank Advancement Mistakes</h5>
                  <ul style={{fontSize:12,color:"#ffb3b3",lineHeight:1.8,paddingLeft:20,marginBottom:16}}>
                    <li>Focusing only on personal enrollments (ignoring team development)</li>
                    <li>Not tracking your numbers weekly (surprised when you miss requirements)</li>
                    <li>Letting personal volume drop in the final month (disqualifies you)</li>
                    <li>Ignoring leg balance requirements (need volume spread across multiple legs)</li>
                    <li>Not celebrating small wins with your team (kills momentum)</li>
                  </ul>

                  <div style={{padding:16,borderRadius:10,background:"rgba(230,183,165,0.08)",border:"1px solid rgba(230,183,165,0.15)"}}>
                    <h4 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>📚 Rank Advancement Resources</h4>
                    <ul style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.8,paddingLeft:20,marginBottom:16}}>
                      <li><a href="https://www.youtube.com/results?search_query=mlm+rank+advancement+strategy" target="_blank" rel="noopener noreferrer" style={{color:"var(--rosegold)",textDecoration:"underline"}}>Video: Rank Advancement Strategy Training (YouTube)</a></li>
                      <li><a href="https://www.youtube.com/results?search_query=network+marketing+90+day+plan" target="_blank" rel="noopener noreferrer" style={{color:"var(--rosegold)",textDecoration:"underline"}}>Video: 90-Day Rank Promotion Plan (YouTube)</a></li>
                    </ul>
                  </div>

                  <div style={{padding:16,borderRadius:10,background:"rgba(218,165,112,0.12)",border:"1px solid rgba(218,165,112,0.25)",marginTop:16}}>
                    <h4 style={{fontSize:14,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>✅ Tier 2 Module 4 Knowledge Check (10 Questions)</h4>
                    <button
                      onClick={() => alert('Quiz: 1) What rank requirements exist for Silver? 2) What about Gold? 3) What about Platinum? 4) What about Diamond? 5) What is the 90-day sprint Month 1 goal? 6) What is Month 2 focus? 7) What is Month 3 goal? 8) Name 3 common rank advancement mistakes. 9) Why is leg balance important? 10) Should you stop celebrating once you hit a rank?')}
                      style={{background:"rgba(245,222,179,0.1)",border:"1px solid rgba(245,222,179,0.2)",padding:"10px 16px",borderRadius:8,color:"var(--champagne)",fontWeight:600,cursor:"pointer",fontSize:13,width:"100%"}}
                    >
                      Take Module Quiz (Retake Anytime)
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TierLock>
      )
    },

    professional: {
      title: "Professional Programs",
      icon: Briefcase,
      content: (
        <div>
          <div style={{padding:24,borderRadius:16,background:"linear-gradient(180deg, rgba(218,165,112,0.12), rgba(185,135,93,0.08))",border:"1px solid rgba(218,165,112,0.2)",marginBottom:24}}>
            <h3 style={{fontSize:22,color:"var(--champagne)",marginBottom:10,fontWeight:700}}>Professional Integration Programs</h3>
            <p style={{fontSize:14,color:"var(--rosegold)",marginBottom:16,lineHeight:1.6}}>
              Licensed professionals: integrate aromatherapy into clinical practice ethically and profitably.
            </p>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:12,marginBottom:32}}>
            <button onClick={() => setProfessionalCategory('medical')} style={{padding:20,borderRadius:12,background:professionalCategory === 'medical' ? "linear-gradient(90deg,var(--bronze),var(--rosegold))" : "rgba(245,222,179,0.04)",border:professionalCategory === 'medical' ? "0" : "1px solid rgba(245,222,179,0.08)",color:professionalCategory === 'medical' ? "#1b0b06" : "var(--champagne)",fontWeight:700,cursor:"pointer",fontSize:15,textAlign:"center"}}>
              Medical
            </button>
            <button onClick={() => setProfessionalCategory('veterinary')} style={{padding:20,borderRadius:12,background:professionalCategory === 'veterinary' ? "linear-gradient(90deg,var(--bronze),var(--rosegold))" : "rgba(245,222,179,0.04)",border:professionalCategory === 'veterinary' ? "0" : "1px solid rgba(245,222,179,0.08)",color:professionalCategory === 'veterinary' ? "#1b0b06" : "var(--champagne)",fontWeight:700,cursor:"pointer",fontSize:15,textAlign:"center"}}>
              Veterinary
            </button>
            <button onClick={() => setProfessionalCategory('wellness')} style={{padding:20,borderRadius:12,background:professionalCategory === 'wellness' ? "linear-gradient(90deg,var(--bronze),var(--rosegold))" : "rgba(245,222,179,0.04)",border:professionalCategory === 'wellness' ? "0" : "1px solid rgba(245,222,179,0.08)",color:professionalCategory === 'wellness' ? "#1b0b06" : "var(--champagne)",fontWeight:700,cursor:"pointer",fontSize:15,textAlign:"center"}}>
              Wellness
            </button>
            <button onClick={() => setProfessionalCategory('culinary')} style={{padding:20,borderRadius:12,background:professionalCategory === 'culinary' ? "linear-gradient(90deg,var(--bronze),var(--rosegold))" : "rgba(245,222,179,0.04)",border:professionalCategory === 'culinary' ? "0" : "1px solid rgba(245,222,179,0.08)",color:professionalCategory === 'culinary' ? "#1b0b06" : "var(--champagne)",fontWeight:700,cursor:"pointer",fontSize:15,textAlign:"center"}}>
              Culinary
            </button>
            <button onClick={() => setProfessionalCategory('hospitality')} style={{padding:20,borderRadius:12,background:professionalCategory === 'hospitality' ? "linear-gradient(90deg,var(--bronze),var(--rosegold))" : "rgba(245,222,179,0.04)",border:professionalCategory === 'hospitality' ? "0" : "1px solid rgba(245,222,179,0.08)",color:professionalCategory === 'hospitality' ? "#1b0b06" : "var(--champagne)",fontWeight:700,cursor:"pointer",fontSize:15,textAlign:"center",gridColumn:"span 2"}}>
              Hospitality
            </button>
          </div>

          {!professionalCategory && (
            <div style={{padding:60,textAlign:"center"}}>
              <Briefcase className="w-12 h-12" style={{color:"var(--rosegold)",opacity:0.3,margin:"0 auto 20px"}} />
              <p style={{fontSize:15,color:"var(--rosegold)"}}>
                Select a professional category above to view specialized training
              </p>
            </div>
          )}

          {professionalCategory === 'medical' && (
            <div>
              <div style={{padding:24,borderRadius:16,background:"linear-gradient(135deg, rgba(218,165,112,0.15), rgba(245,222,179,0.08))",border:"1px solid rgba(218,165,112,0.3)",marginBottom:24}}>
                <h4 style={{fontSize:20,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>Medical Professionals (RN, NP, MD, DO) - Clinical Aromatherapy Integration</h4>
                <p style={{fontSize:14,color:"var(--rosegold)",lineHeight:1.7}}>
                  Comprehensive training on integrating aromatherapy and natural wellness products into evidence-based clinical practice. Learn to serve patients holistically while protecting your license and staying within scope of practice.
                </p>
              </div>

              <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.06)",border:"1px solid rgba(245,222,179,0.12)",marginBottom:24}}>
                <h5 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,marginBottom:14}}>📚 Clinical Research Foundation: Essential Oils in Healthcare</h5>
                <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:16}}>
                  Every protocol is research-backed. These are REAL peer-reviewed studies from PubMed/NIH proving clinical efficacy.
                </p>
                
                <div style={{display:"grid",gap:12}}>
                  <div style={{padding:14,borderRadius:8,background:"rgba(230,183,165,0.08)",border:"1px solid rgba(230,183,165,0.12)"}}>
                    <p style={{fontSize:13,color:"var(--champagne)",fontWeight:700,marginBottom:6}}>Lavender Aromatherapy Reduces Anxiety: RCT (2012)</p>
                    <p style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.6}}>
                      Randomized controlled trial, 140 patients. Significant anxiety reduction vs placebo. PubMed PMID: 22612017
                    </p>
                  </div>
                  
                  <div style={{padding:14,borderRadius:8,background:"rgba(230,183,165,0.08)",border:"1px solid rgba(230,183,165,0.12)"}}>
                    <p style={{fontSize:13,color:"var(--champagne)",fontWeight:700,marginBottom:6}}>Peppermint Oil for IBS: Meta-Analysis (2017)</p>
                    <p style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.6}}>
                      12 studies, 835 patients. 52% improvement in IBS symptoms. PubMed PMID: 28826544
                    </p>
                  </div>
                  
                  <div style={{padding:14,borderRadius:8,background:"rgba(230,183,165,0.08)",border:"1px solid rgba(230,183,165,0.12)"}}>
                    <p style={{fontSize:13,color:"var(--champagne)",fontWeight:700,marginBottom:6}}>Frankincense Boswellic Acids: Anti-Inflammatory Review (2019)</p>
                    <p style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.6}}>
                      Mechanisms of inflammation reduction and pain modulation. PubMed PMID: 31383076
                    </p>
                  </div>
                  
                  <div style={{padding:14,borderRadius:8,background:"rgba(230,183,165,0.08)",border:"1px solid rgba(230,183,165,0.12)"}}>
                    <p style={{fontSize:13,color:"var(--champagne)",fontWeight:700,marginBottom:6}}>Tea Tree Oil Antimicrobial Activity: Clinical Review (2019)</p>
                    <p style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.6}}>
                      Proven efficacy against bacteria, fungi, MRSA. PubMed PMID: 30941632
                    </p>
                  </div>
                  
                  <div style={{padding:14,borderRadius:8,background:"rgba(230,183,165,0.08)",border:"1px solid rgba(230,183,165,0.12)"}}>
                    <p style={{fontSize:13,color:"var(--champagne)",fontWeight:700,marginBottom:6}}>Copaiba β-Caryophyllene: CB2 Receptor Analgesic (2015)</p>
                    <p style={{fontSize:11,color:"var(--rosegold)",lineHeight:1.6}}>
                      Pain reduction via cannabinoid receptor binding (non-THC). PubMed PMID: 25824404
                    </p>
                  </div>
                </div>
              </div>

              <h5 style={{fontSize:17,color:"var(--champagne)",fontWeight:700,marginBottom:16}}>Complete Clinical Integration Curriculum</h5>
              <p style={{fontSize:13,color:"var(--rosegold)",marginBottom:20,lineHeight:1.6}}>
                Click each module to access full training content, downloadable forms, protocols, and quizzes.
              </p>

              {/* Module 1 */}
              <div style={{marginBottom:16}}>
                <button onClick={() => setExpandedProfModule(expandedProfModule === 'med-mod1' ? null : 'med-mod1')} style={{width:"100%",padding:16,borderRadius:12,background:"rgba(245,222,179,0.06)",border:"1px solid rgba(245,222,179,0.12)",color:"var(--champagne)",fontWeight:700,fontSize:16,textAlign:"left",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  Module 1: Clinical Assessment & Patient Selection
                  <span style={{fontSize:20}}>{expandedProfModule === 'med-mod1' ? '−' : '+'}</span>
                </button>
                {expandedProfModule === 'med-mod1' && (
                  <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)",marginTop:12}}>
                    <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7}}>
                      Content available in full certification program.
                    </p>
                  </div>
                )}
              </div>

              {/* Module 2 */}
              <div style={{marginBottom:16}}>
                <button onClick={() => setExpandedProfModule(expandedProfModule === 'med-mod2' ? null : 'med-mod2')} style={{width:"100%",padding:16,borderRadius:12,background:"rgba(245,222,179,0.06)",border:"1px solid rgba(245,222,179,0.12)",color:"var(--champagne)",fontWeight:700,fontSize:16,textAlign:"left",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  Module 2: Biochemistry & Therapeutic Mechanisms
                  <span style={{fontSize:20}}>{expandedProfModule === 'med-mod2' ? '−' : '+'}</span>
                </button>
                {expandedProfModule === 'med-mod2' && (
                  <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)",marginTop:12}}>
                    <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7}}>
                      Content available in full certification program.
                    </p>
                  </div>
                )}
              </div>

              {/* Module 3 */}
              <div style={{marginBottom:16}}>
                <button onClick={() => setExpandedProfModule(expandedProfModule === 'med-mod3' ? null : 'med-mod3')} style={{width:"100%",padding:16,borderRadius:12,background:"rgba(245,222,179,0.06)",border:"1px solid rgba(245,222,179,0.12)",color:"var(--champagne)",fontWeight:700,fontSize:16,textAlign:"left",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  Module 3: Evidence-Based Clinical Protocols
                  <span style={{fontSize:20}}>{expandedProfModule === 'med-mod3' ? '−' : '+'}</span>
                </button>
                {expandedProfModule === 'med-mod3' && (
                  <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)",marginTop:12}}>
                    <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7}}>
                      Content available in full certification program.
                    </p>
                  </div>
                )}
              </div>

              {/* Module 4 */}
              <div style={{marginBottom:16}}>
                <button onClick={() => setExpandedProfModule(expandedProfModule === 'med-mod4' ? null : 'med-mod4')} style={{width:"100%",padding:16,borderRadius:12,background:"rgba(245,222,179,0.06)",border:"1px solid rgba(245,222,179,0.12)",color:"var(--champagne)",fontWeight:700,fontSize:16,textAlign:"left",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  Module 4: Building Recurring Revenue Streams
                  <span style={{fontSize:20}}>{expandedProfModule === 'med-mod4' ? '−' : '+'}</span>
                </button>
                {expandedProfModule === 'med-mod4' && (
                  <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)",marginTop:12}}>
                    <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7}}>
                      Content available in full certification program.
                    </p>
                  </div>
                )}
              </div>

              {/* Module 5 */}
              <div style={{marginBottom:16}}>
                <button onClick={() => setExpandedProfModule(expandedProfModule === 'med-mod5' ? null : 'med-mod5')} style={{width:"100%",padding:16,borderRadius:12,background:"rgba(245,222,179,0.06)",border:"1px solid rgba(245,222,179,0.12)",color:"var(--champagne)",fontWeight:700,fontSize:16,textAlign:"left",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  Module 5: Selling the Clinical Spa Experience
                  <span style={{fontSize:20}}>{expandedProfModule === 'med-mod5' ? '−' : '+'}</span>
                </button>
                {expandedProfModule === 'med-mod5' && (
                  <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)",marginTop:12}}>
                    <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7}}>
                      Content available in full certification program.
                    </p>
                  </div>
                )}
              </div>

              {/* Module 6 */}
              <div style={{marginBottom:16}}>
                <button onClick={() => setExpandedProfModule(expandedProfModule === 'med-mod6' ? null : 'med-mod6')} style={{width:"100%",padding:16,borderRadius:12,background:"rgba(245,222,179,0.06)",border:"1px solid rgba(245,222,179,0.12)",color:"var(--champagne)",fontWeight:700,fontSize:16,textAlign:"left",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  Module 6: Staff Training & Systematic Integration
                  <span style={{fontSize:20}}>{expandedProfModule === 'med-mod6' ? '−' : '+'}</span>
                </button>
                {expandedProfModule === 'med-mod6' && (
                  <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)",marginTop:12}}>
                    <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7}}>
                      Content available in full certification program.
                    </p>
                  </div>
                )}
              </div>

              {/* Module 7 */}
              <div style={{marginBottom:24}}>
                <button onClick={() => setExpandedProfModule(expandedProfModule === 'med-mod7' ? null : 'med-mod7')} style={{width:"100%",padding:16,borderRadius:12,background:"rgba(245,222,179,0.06)",border:"1px solid rgba(245,222,179,0.12)",color:"var(--champagne)",fontWeight:700,fontSize:16,textAlign:"left",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  Module 7: Documentation & Liability
                  <span style={{fontSize:20}}>{expandedProfModule === 'med-mod7' ? '−' : '+'}</span>
                </button>
                {expandedProfModule === 'med-mod7' && (
                  <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)",marginTop:12}}>
                    <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7}}>
                      Content available in full certification program.
                    </p>
                  </div>
                )}
              </div>


            </div>
          )}

          {professionalCategory === 'veterinary' && (
            <div>
              <div style={{padding:24,borderRadius:16,background:"linear-gradient(135deg, rgba(218,165,112,0.15), rgba(245,222,179,0.08))",border:"1px solid rgba(218,165,112,0.3)",marginBottom:24}}>
                <h4 style={{fontSize:20,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>Veterinary Professionals (DVM, RVT) - Clinical Pet Aromatherapy</h4>
                <p style={{fontSize:14,color:"var(--rosegold)",lineHeight:1.7}}>
                  Advanced species-specific protocols, toxicity databases, and clinical integration strategies for companion animal practice.
                </p>
              </div>
              

            </div>
          )}

          {professionalCategory === 'wellness' && (
            <div>
              <div style={{padding:24,borderRadius:16,background:"linear-gradient(135deg, rgba(218,165,112,0.15), rgba(245,222,179,0.08))",border:"1px solid rgba(218,165,112,0.3)",marginBottom:24}}>
                <h4 style={{fontSize:20,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>Wellness Practitioners (Massage, Yoga, Reiki, Coaches)</h4>
                <p style={{fontSize:14,color:"var(--rosegold)",lineHeight:1.7}}>
                  Integrate aromatherapy into your sessions, create signature wellness packages, and expand service offerings ethically.
                </p>
              </div>
              

            </div>
          )}

          {professionalCategory === 'culinary' && (
            <div>
              <div style={{padding:24,borderRadius:16,background:"linear-gradient(135deg, rgba(218,165,112,0.15), rgba(245,222,179,0.08))",border:"1px solid rgba(218,165,112,0.3)",marginBottom:24}}>
                <h4 style={{fontSize:20,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>Culinary Professionals (Chefs, Bakers, Food Service)</h4>
                <p style={{fontSize:14,color:"var(--rosegold)",lineHeight:1.7}}>
                  GRAS essential oils in cuisine, flavor profiles, menu development, and culinary aromatherapy business models.
                </p>
              </div>
              

            </div>
          )}

          {professionalCategory === 'hospitality' && (
            <div>
              <div style={{padding:24,borderRadius:16,background:"linear-gradient(135deg, rgba(218,165,112,0.15), rgba(245,222,179,0.08))",border:"1px solid rgba(218,165,112,0.3)",marginBottom:24}}>
                <h4 style={{fontSize:20,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>Hospitality Professionals (Hotels, Spas, Resorts, Airbnb)</h4>
                <p style={{fontSize:14,color:"var(--rosegold)",lineHeight:1.7}}>
                  Signature scent creation, guest experience enhancement, spa menu integration, and aromatherapy-based hospitality services.
                </p>
              </div>
              

            </div>
          )}

          <div style={{padding:32,borderRadius:16,background:"linear-gradient(135deg, rgba(218,165,112,0.15), rgba(245,222,179,0.08))",border:"2px solid rgba(218,165,112,0.3)",textAlign:"center",marginTop:40}}>
            <Award className="w-12 h-12" style={{color:"var(--rosegold)",margin:"0 auto 20px"}} />
            <h3 style={{fontSize:24,color:"var(--champagne)",marginBottom:16,fontWeight:700}}>Continuing Education & Advanced Certifications</h3>
            <p style={{fontSize:15,color:"var(--rosegold)",lineHeight:1.7,marginBottom:24}}>
              All professional training programs, certifications, and continuing education courses are housed in <strong>iTerra University</strong>.
            </p>
            <button
              onClick={() => setActiveSection('university')}
              style={{padding:"16px 32px",borderRadius:12,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:16}}
            >
              Go to iTerra University →
            </button>
          </div>
        </div>
      )
    },
    exclusiveContent: {
      title: "Exclusive Content Library",
      icon: Star,
      content: (
        <TierLock requiredTier="tier2">
          <div>
            <div style={{padding:24,borderRadius:16,background:"linear-gradient(180deg, rgba(218,165,112,0.12), rgba(185,135,93,0.08))",border:"1px solid rgba(218,165,112,0.2)",marginBottom:24}}>
              <h3 style={{fontSize:22,color:"var(--champagne)",marginBottom:10,fontWeight:700}}>Advanced Business Tools</h3>
              <p style={{fontSize:14,color:"var(--rosegold)",marginBottom:16,lineHeight:1.6}}>
                ORIGINAL iTerra™ content - unique templates and systems not available through doTERRA.
              </p>
            </div>

            <div style={{display:"grid",gap:16}}>
              <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
                <h4 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>📱 iTerra Original Social Media Templates</h4>
                <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:12}}>
                  Custom content calendar, unique post templates, story frameworks, and Canva templates designed specifically for holistic wellness businesses - not corporate MLM graphics.
                </p>
                <button
                  onClick={() => alert('iTerra™ original templates being finalized - available January 2026')}
                  style={{background:"rgba(245,222,179,0.1)",border:"1px solid rgba(245,222,179,0.2)",padding:"12px 18px",borderRadius:8,color:"var(--champagne)",fontWeight:600,cursor:"pointer",fontSize:13,width:"100%"}}
                >
                  Download Original Social Media Templates (Coming Soon)
                </button>
              </div>

              <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
                <h4 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>🎯 Multi-Channel Lead Generation System</h4>
                <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:12}}>
                  Advanced funnel templates, email automation sequences, cold market scripts, and conversion-optimized landing pages for professional wellness businesses.
                </p>
                <button
                  onClick={() => alert('Lead generation system launching Q1 2026')}
                  style={{background:"rgba(245,222,179,0.1)",border:"1px solid rgba(245,222,179,0.2)",padding:"12px 18px",borderRadius:8,color:"var(--champagne)",fontWeight:600,cursor:"pointer",fontSize:13,width:"100%"}}
                >
                  Access Lead Generation System (Coming Soon)
                </button>
              </div>

              <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
                <h4 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>🤝 Client Management & CRM Workflow</h4>
                <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:12}}>
                  Professional client intake forms, retention automation, VIP programs, and reactivation campaigns for wellness practitioners.
                </p>
                <button
                  onClick={() => alert('Client management tools in development')}
                  style={{background:"rgba(245,222,179,0.1)",border:"1px solid rgba(245,222,179,0.2)",padding:"12px 18px",borderRadius:8,color:"var(--champagne)",fontWeight:600,cursor:"pointer",fontSize:13,width:"100%"}}
                >
                  Access Client Management Tools (Coming Soon)
                </button>
              </div>
            </div>
          </div>
        </TierLock>
      )
    },
    affiliates: {
      title: "Affiliate & Referral Partners",
      icon: Target,
      content: (
        <TierLock requiredTier="tier3">
          <div>
            <div style={{padding:24,borderRadius:16,background:"linear-gradient(180deg, rgba(218,165,112,0.12), rgba(185,135,93,0.08))",border:"1px solid rgba(218,165,112,0.2)",marginBottom:24}}>
              <h3 style={{fontSize:22,color:"var(--champagne)",marginBottom:10,fontWeight:700}}>Affiliate & Referral Partners</h3>
              <p style={{fontSize:14,color:"var(--rosegold)",marginBottom:16,lineHeight:1.6}}>
                Build additional income streams by referring clients to trusted wellness partners. Earn commissions while expanding client care options.
              </p>
            </div>

            <h4 style={{fontSize:18,color:"var(--champagne)",fontWeight:700,marginBottom:16}}>Professional Partner Programs</h4>
            
            <div style={{display:"grid",gap:12}}>
              <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
                <h5 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>🏥 Wellness Consultation & Certification Services</h5>
                <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:12}}>
                  Refer clients for professional aromatherapy consultations, nutrition coaching, or pet wellness services with personalized client support.
                </p>
                <div style={{display:"grid",gap:8}}>
                  <button
                    onClick={() => window.open('https://healthlifestyleservices.com', '_blank')}
                    style={{background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:"0",padding:"12px 18px",borderRadius:8,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:13}}
                  >
                    Book Professional Wellness Consultation
                  </button>
                  <button
                    onClick={() => window.open('https://healthlifestyleservices.com', '_blank')}
                    style={{background:"rgba(245,222,179,0.1)",border:"1px solid rgba(245,222,179,0.2)",padding:"10px 16px",borderRadius:8,color:"var(--champagne)",fontWeight:600,cursor:"pointer",fontSize:13}}
                  >
                    Refer Clients for Professional Consultations
                  </button>
                </div>
                <p style={{fontSize:11,color:"var(--rosegold)",marginTop:10,fontStyle:"italic"}}>Earn referral fees for every consultation booked</p>
              </div>

              <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
                <h5 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>💊 Fullscript Professional Supplement Dispensary</h5>
                <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:12}}>
                  Access professional-grade supplements, vitamins, and wellness products at wholesale pricing. Earn commissions on client purchases through the Fullscript practitioner platform.
                </p>
                <button
                  onClick={() => window.open('https://fullscript.com', '_blank')}
                  style={{background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:"0",padding:"12px 18px",borderRadius:8,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:13,width:"100%"}}
                >
                  Access Fullscript Dispensary
                </button>
                <p style={{fontSize:11,color:"var(--rosegold)",marginTop:10,fontStyle:"italic"}}>Professional practitioners earn product commissions + referral fees</p>
              </div>

              <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
                <h5 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>🧬 Diagnostic Lab Testing Services</h5>
                <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:12}}>
                  Partner with functional medicine labs for comprehensive testing: hormone panels, nutrient deficiency, food sensitivities, gut health, and more.
                </p>
                <button
                  onClick={() => alert('Lab partner integration coming Q1 2026')}
                  style={{background:"rgba(245,222,179,0.1)",border:"1px solid rgba(245,222,179,0.2)",padding:"12px 18px",borderRadius:8,color:"var(--champagne)",fontWeight:600,cursor:"pointer",fontSize:13,width:"100%"}}
                >
                  Access Lab Testing Partners (Coming Soon)
                </button>
                <p style={{fontSize:11,color:"var(--rosegold)",marginTop:10,fontStyle:"italic"}}>Earn 15% commission on referred lab work</p>
              </div>
            </div>

            <div style={{padding:20,borderRadius:12,background:"rgba(230,183,165,0.12)",border:"1px solid rgba(230,183,165,0.25)",marginTop:24}}>
              <h4 style={{fontSize:15,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>💰 Multi-Income Stream Strategy</h4>
              <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7}}>
                Tier 3 professionals diversify revenue: product sales, professional consultation fees, affiliate supplement commissions, lab referral fees, and certification program income. Build a resilient, multi-channel wellness business.
              </p>
            </div>
          </div>
        </TierLock>
      )
    },
    community: {
      title: "Community & Support",
      icon: Heart,
      content: (
        <TierLock requiredTier="tier2">
          <div>
            <div style={{padding:24,borderRadius:16,background:"linear-gradient(180deg, rgba(218,165,112,0.12), rgba(185,135,93,0.08))",border:"1px solid rgba(218,165,112,0.2)",marginBottom:24}}>
              <h3 style={{fontSize:22,color:"var(--champagne)",marginBottom:10,fontWeight:700}}>Community & Support</h3>
              <p style={{fontSize:14,color:"var(--rosegold)",marginBottom:16,lineHeight:1.6}}>
                Connect with fellow wellness professionals, join group coaching, and access ongoing masterclasses.
              </p>
            </div>

            <div style={{display:"grid",gap:16}}>
              <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
                <h4 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>💬 Private Community Forum</h4>
                <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:12}}>
                  Ask questions, share wins, get support from fellow associates. Active daily engagement and peer mentorship.
                </p>
                <button
                  onClick={() => alert('Community forum integration coming Q1 2026!')}
                  style={{background:"rgba(245,222,179,0.1)",border:"1px solid rgba(245,222,179,0.2)",padding:"10px 16px",borderRadius:8,color:"var(--champagne)",fontWeight:600,cursor:"pointer",fontSize:13,width:"100%"}}
                >
                  Access Community Forum (Coming Soon)
                </button>
              </div>

              <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
                <h4 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>🎥 Monthly Masterclasses & Webinars</h4>
                <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:12}}>
                  Live training sessions with industry experts, Q&A opportunities, and recorded replays for on-demand learning.
                </p>
                <button
                  onClick={() => alert('First webinar scheduled for January 15, 2026!')}
                  style={{background:"rgba(245,222,179,0.1)",border:"1px solid rgba(245,222,179,0.2)",padding:"10px 16px",borderRadius:8,color:"var(--champagne)",fontWeight:600,cursor:"pointer",fontSize:13,width:"100%"}}
                >
                  View Upcoming Webinars (Coming Soon)
                </button>
              </div>

              <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
                <h4 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>🏆 Progress Tracking & Badges</h4>
                <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:12}}>
                  Earn badges for milestones: module completion, first enrollment, rank advancement, team growth, and more.
                </p>
                <button
                  onClick={() => alert('Gamification system launching Q1 2026!')}
                  style={{background:"rgba(245,222,179,0.1)",border:"1px solid rgba(245,222,179,0.2)",padding:"10px 16px",borderRadius:8,color:"var(--champagne)",fontWeight:600,cursor:"pointer",fontSize:13,width:"100%"}}
                >
                  View Your Badges & Progress (Coming Soon)
                </button>
              </div>

              <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
                <h4 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>📧 Monthly Newsletter & Updates</h4>
                <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:12}}>
                  Exclusive monthly content: new training modules, compliance updates, affiliate opportunities, and industry insights.
                </p>
                <button
                  onClick={() => window.open('mailto:jennalwill@gmail.com?subject=Subscribe to iTerra Newsletter', '_blank')}
                  style={{background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:"0",padding:"12px 18px",borderRadius:8,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:13,width:"100%"}}
                >
                  Subscribe to Monthly Newsletter
                </button>
              </div>
            </div>
          </div>
        </TierLock>
      )
    },
    university: {
      title: "iTerra University",
      icon: Award,
      content: (
        <div>
          <div style={{padding:24,borderRadius:16,background:"linear-gradient(135deg, rgba(218,165,112,0.15), rgba(245,222,179,0.08))",border:"1px solid rgba(218,165,112,0.3)",marginBottom:24}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
              <Award className="w-6 h-6" style={{color:"var(--rosegold)"}} />
              <h3 style={{fontSize:22,color:"var(--champagne)",fontWeight:700}}>iTerra University</h3>
            </div>
            <p style={{fontSize:14,color:"var(--rosegold)",lineHeight:1.7}}>
              Professional certifications, advanced training, and continuing education for wellness practitioners. Build credibility, expand your expertise, and differentiate yourself in the marketplace.
            </p>
          </div>

          <div style={{display:"grid",gap:20}}>
            {/* Clinical Master Aromatherapist Program */}
            <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                <h4 style={{fontSize:17,color:"var(--champagne)",fontWeight:700}}>Clinical Master Aromatherapist Program</h4>
                <span style={{padding:"6px 12px",borderRadius:20,background:"rgba(218,165,112,0.2)",fontSize:11,color:"var(--rosegold)",fontWeight:700}}>COMING SOON</span>
              </div>
              <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:14}}>
                A pinnacle-level aromatic science curriculum shaped for practitioners who command excellence—bridging clinical rigor with therapeutic artistry.
              </p>
              <button
                onClick={() => window.open('https://healthlifestyleservices.com', '_blank')}
                style={{padding:"12px 18px",borderRadius:10,background:"rgba(245,222,179,0.1)",border:"1px solid rgba(245,222,179,0.2)",color:"var(--champagne)",fontWeight:700,cursor:"pointer",fontSize:14,width:"100%"}}
              >
                Learn More →
              </button>
            </div>

            {/* Certified Pet Master Aromatherapist */}
            <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                <h4 style={{fontSize:17,color:"var(--champagne)",fontWeight:700}}>Certified Pet Master Aromatherapist</h4>
                <span style={{padding:"6px 12px",borderRadius:20,background:"rgba(218,165,112,0.2)",fontSize:11,color:"var(--rosegold)",fontWeight:700}}>COMING SOON</span>
              </div>
              <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:14}}>
                A specialized, safety-led program crafted for those shaping the future of animal wellness through precision aromatherapy and species-specific protocols.
              </p>
              <button
                onClick={() => window.open('https://healthlifestyleservices.com', '_blank')}
                style={{padding:"12px 18px",borderRadius:10,background:"rgba(245,222,179,0.1)",border:"1px solid rgba(245,222,179,0.2)",color:"var(--champagne)",fontWeight:700,cursor:"pointer",fontSize:14,width:"100%"}}
              >
                Learn More →
              </button>
            </div>

            {/* Longevity Nutrition & Lifestyle Architect Certification */}
            <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                <h4 style={{fontSize:17,color:"var(--champagne)",fontWeight:700}}>Longevity Nutrition & Lifestyle Architect Certification</h4>
                <span style={{padding:"6px 12px",borderRadius:20,background:"rgba(218,165,112,0.2)",fontSize:11,color:"var(--rosegold)",fontWeight:700}}>COMING SOON</span>
              </div>
              <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:14}}>
                A visionary path into metabolic renewal, anti-inflammatory living, nutritional strategy, and age-defying vitality design.
              </p>
              <button
                onClick={() => window.open('https://healthlifestyleservices.com', '_blank')}
                style={{padding:"12px 18px",borderRadius:10,background:"rgba(245,222,179,0.1)",border:"1px solid rgba(245,222,179,0.2)",color:"var(--champagne)",fontWeight:700,cursor:"pointer",fontSize:14,width:"100%"}}
              >
                Learn More →
              </button>
            </div>

            {/* Wellness Purify & Cleanse Practitioner Program */}
            <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                <h4 style={{fontSize:17,color:"var(--champagne)",fontWeight:700}}>Wellness Purify & Cleanse Practitioner Program</h4>
                <span style={{padding:"6px 12px",borderRadius:20,background:"rgba(218,165,112,0.2)",fontSize:11,color:"var(--rosegold)",fontWeight:700}}>COMING SOON</span>
              </div>
              <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:14}}>
                A deep, evidence-driven exploration of internal reset practices—cellular renewal, organ support, metabolic clearing—without fad language, without borrowed branding.
              </p>
              <button
                onClick={() => window.open('https://healthlifestyleservices.com', '_blank')}
                style={{padding:"12px 18px",borderRadius:10,background:"rgba(245,222,179,0.1)",border:"1px solid rgba(245,222,179,0.2)",color:"var(--champagne)",fontWeight:700,cursor:"pointer",fontSize:14,width:"100%"}}
              >
                Learn More →
              </button>
            </div>

            {/* Clinical & Holistic Pet Nutrition & Wellness Specialist */}
            <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                <h4 style={{fontSize:17,color:"var(--champagne)",fontWeight:700}}>Clinical & Holistic Pet Nutrition & Wellness Specialist</h4>
                <span style={{padding:"6px 12px",borderRadius:20,background:"rgba(218,165,112,0.2)",fontSize:11,color:"var(--rosegold)",fontWeight:700}}>COMING SOON</span>
              </div>
              <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:14}}>
                An integrative certification weaving advanced animal nutrition, functional wellness, and whole-system vitality into one forward-thinking curriculum.
              </p>
              <button
                onClick={() => window.open('https://healthlifestyleservices.com', '_blank')}
                style={{padding:"12px 18px",borderRadius:10,background:"rgba(245,222,179,0.1)",border:"1px solid rgba(245,222,179,0.2)",color:"var(--champagne)",fontWeight:700,cursor:"pointer",fontSize:14,width:"100%"}}
              >
                Learn More →
              </button>
            </div>
          </div>

          {/* CE Banner */}
          <div style={{padding:24,borderRadius:16,background:"linear-gradient(135deg, rgba(230,183,165,0.20), rgba(218,165,112,0.15))",border:"2px solid rgba(218,165,112,0.4)",marginTop:32,textAlign:"center"}}>
            <h4 style={{fontSize:18,color:"var(--champagne)",fontWeight:700,marginBottom:12}}>📚 CE Courses Arriving Soon</h4>
            <p style={{fontSize:14,color:"var(--rosegold)",lineHeight:1.7,marginBottom:20}}>
              Continuing Education credits for licensed practitioners. Maintain your licensure while expanding your wellness expertise.
            </p>
            <button
              onClick={() => window.open('https://healthlifestyleservices.com', '_blank')}
              style={{padding:"14px 24px",borderRadius:12,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:15}}
            >
              Sign Up for Early Access →
            </button>
          </div>
        </div>
      )
    },
    compliance: {
      title: "Compliance & Legal Resources",
      icon: Shield,
      content: (
        <div>
          <div style={{padding:24,borderRadius:16,background:"linear-gradient(180deg, rgba(218,165,112,0.12), rgba(185,135,93,0.08))",border:"1px solid rgba(218,165,112,0.2)",marginBottom:24}}>
            <h3 style={{fontSize:22,color:"var(--champagne)",marginBottom:10,fontWeight:700}}>Compliance & Legal Resources</h3>
            <p style={{fontSize:14,color:"var(--rosegold)",marginBottom:16,lineHeight:1.6}}>
              Essential compliance guidance and legal templates to keep your wellness business protected and compliant with federal regulations.
            </p>
          </div>

          <div style={{display:"grid",gap:16}}>
            <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
              <h4 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>📋 FTC Health Products Compliance Guide</h4>
              <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:12}}>
                Official FTC guidance for marketing health-related products. Learn what claims are allowed, what requires substantiation, and how to avoid misleading consumers.
              </p>
              <p style={{fontSize:11,color:"rgba(245,222,179,0.6)",marginBottom:12}}>Last Updated: 2023</p>
              <button
                onClick={() => window.open('https://www.ftc.gov/system/files/ftc_gov/pdf/Health-Products-Compliance-Guidance.pdf', '_blank')}
                style={{background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:"0",padding:"12px 18px",borderRadius:8,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:13,width:"100%"}}
              >
                Download FTC Compliance Guide
              </button>
            </div>

            <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
              <h4 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>📱 FTC Disclosures for Influencers & Affiliate Marketers</h4>
              <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:12}}>
                Learn how to properly disclose brand relationships, affiliate compensation, and influencer marketing on social media platforms.
              </p>
              <p style={{fontSize:11,color:"rgba(245,222,179,0.6)",marginBottom:12}}>Last Updated: 2023</p>
              <button
                onClick={() => window.open('https://www.ftc.gov/system/files/documents/plain-language/1001a-influencer-guide-508_1.pdf', '_blank')}
                style={{background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:"0",padding:"12px 18px",borderRadius:8,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:13,width:"100%"}}
              >
                Download FTC Social Media Disclosure Guide
              </button>
            </div>

            <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
              <h4 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>🌐 Advertising & Marketing Rules for Internet</h4>
              <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:12}}>
                General guidelines for truthful advertising online, proper disclaimers, avoiding deceptive practices, and liability for marketers.
              </p>
              <p style={{fontSize:11,color:"rgba(245,222,179,0.6)",marginBottom:12}}>Last Updated: 2023</p>
              <button
                onClick={() => window.open('https://www.ftc.gov/system/files/ftc_gov/pdf/bus28-rulesroad-2023_508.pdf', '_blank')}
                style={{background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:"0",padding:"12px 18px",borderRadius:8,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:13,width:"100%"}}
              >
                Download Internet Marketing Compliance Guide
              </button>
            </div>

            <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
              <h4 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>📝 Sample Disclosure & Disclaimer Templates</h4>
              <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:12}}>
                Pre-written compliant disclosure templates for social media posts, emails, and marketing materials. Copy, customize, and use immediately.
              </p>
              
              <div style={{padding:14,borderRadius:8,background:"rgba(218,165,112,0.06)",border:"1px solid rgba(218,165,112,0.1)",marginBottom:16,fontSize:10,color:"var(--champagne)",lineHeight:1.6,fontFamily:"monospace",whiteSpace:"pre-wrap"}}>
{`COMPLIANCE TEMPLATES - COPY & PASTE

=== SOCIAL MEDIA POST DISCLOSURE ===
#ad #affiliate #doterraWellnessAdvocate
*I'm an independent distributor. These statements haven't been evaluated by the FDA.*

=== INSTAGRAM BIO DISCLOSURE ===
Wellness Advocate 🌿 | Essential Oils & Natural Solutions
Independent Distributor #ad

=== EMAIL SIGNATURE DISCLOSURE ===
[Your Name]
Independent Wellness Advocate
*The information provided is for educational purposes only and is not intended to diagnose, treat, cure, or prevent any disease.*

=== WEBSITE FOOTER DISCLAIMER ===
DISCLAIMER: I am an independent distributor, not an employee. The products and services offered have not been evaluated by the Food and Drug Administration. They are not intended to diagnose, treat, cure, or prevent any disease. Always consult with a qualified healthcare provider before making changes to your health regimen.

INCOME DISCLOSURE: Earnings in this business vary widely. Most distributors earn part-time supplemental income. See official Income Disclosure Statement at [Company IDS Link].

=== TESTIMONIAL DISCLAIMER ===
*Results shown are not typical. Individual results may vary. Always consult your physician.*

=== BEFORE/AFTER PHOTO DISCLAIMER ===
*These results are not typical. Individual results vary based on many factors including diet, exercise, genetics, and consistency of use. No guarantees of specific results are made.*

=== HEALTH CLAIM DISCLAIMER (Use when discussing benefits) ===
*This product/protocol is designed to support wellness and is not a substitute for medical treatment. These statements have not been evaluated by the FDA.*`}
              </div>

              <button
                onClick={() => {
                  const templates = `COMPLIANCE TEMPLATES - COPY & PASTE\n\n=== SOCIAL MEDIA POST DISCLOSURE ===\n#ad #affiliate #doterraWellnessAdvocate\n*I'm an independent distributor. These statements haven't been evaluated by the FDA.*\n\n=== INSTAGRAM BIO DISCLOSURE ===\nWellness Advocate 🌿 | Essential Oils & Natural Solutions\nIndependent Distributor #ad\n\n=== EMAIL SIGNATURE DISCLOSURE ===\n[Your Name]\nIndependent Wellness Advocate\n*The information provided is for educational purposes only and is not intended to diagnose, treat, cure, or prevent any disease.*\n\n=== WEBSITE FOOTER DISCLAIMER ===\nDISCLAIMER: I am an independent distributor, not an employee. The products and services offered have not been evaluated by the Food and Drug Administration. They are not intended to diagnose, treat, cure, or prevent any disease. Always consult with a qualified healthcare provider before making changes to your health regimen.\n\nINCOME DISCLOSURE: Earnings in this business vary widely. Most distributors earn part-time supplemental income. See official Income Disclosure Statement at [Company IDS Link].\n\n=== TESTIMONIAL DISCLAIMER ===\n*Results shown are not typical. Individual results may vary. Always consult your physician.*\n\n=== BEFORE/AFTER PHOTO DISCLAIMER ===\n*These results are not typical. Individual results vary based on many factors including diet, exercise, genetics, and consistency of use. No guarantees of specific results are made.*\n\n=== HEALTH CLAIM DISCLAIMER (Use when discussing benefits) ===\n*This product/protocol is designed to support wellness and is not a substitute for medical treatment. These statements have not been evaluated by the FDA.*`;
                  const el = document.createElement('textarea');
                  el.value = templates;
                  document.body.appendChild(el);
                  el.select();
                  document.execCommand('copy');
                  document.body.removeChild(el);
                  alert('Compliance templates copied to clipboard! Paste into your documents and customize.');
                }}
                style={{background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:"0",padding:"12px 18px",borderRadius:8,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:13,width:"100%",marginBottom:8}}
              >
                📥 Copy All Compliance Templates
              </button>
              
              <button
                onClick={() => window.open('https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking', '_blank')}
                style={{background:"rgba(245,222,179,0.1)",border:"1px solid rgba(245,222,179,0.2)",padding:"10px 16px",borderRadius:8,color:"var(--champagne)",fontWeight:600,cursor:"pointer",fontSize:12,width:"100%"}}
              >
                📖 Read FTC Official Endorsement Guidelines
              </button>
            </div>
          </div>

          <div style={{padding:20,borderRadius:12,background:"rgba(230,183,165,0.12)",border:"1px solid rgba(230,183,165,0.25)",marginTop:24}}>
            <h4 style={{fontSize:15,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>⚠️ Why Compliance Matters</h4>
            <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7}}>
              The FTC actively monitors health and wellness marketing. Non-compliance can result in fines up to $50,000 per violation, lawsuits, and termination from your company. These resources keep you legally protected while building your business with integrity.
            </p>
          </div>

          <div style={{padding:24,borderRadius:16,background:"linear-gradient(180deg, rgba(218,165,112,0.12), rgba(185,135,93,0.08))",border:"1px solid rgba(218,165,112,0.2)",marginTop:32}}>
            <h3 style={{fontSize:22,color:"var(--champagne)",marginBottom:10,fontWeight:700}}>🚫 How to Avoid Practicing Medicine Without a License</h3>
            <p style={{fontSize:14,color:"var(--rosegold)",marginBottom:20,lineHeight:1.6}}>
              CRITICAL for wellness coaches, nutritionists, and unlicensed practitioners. Stay legally protected while serving clients.
            </p>

            <div style={{padding:16,borderRadius:12,background:"rgba(255,0,0,0.1)",border:"1px solid rgba(255,0,0,0.3)",marginBottom:20}}>
              <h4 style={{fontSize:15,color:"#ffb3b3",fontWeight:700,marginBottom:10}}>⚠️ What You CANNOT Do (Unlicensed)</h4>
              <ul style={{fontSize:12,color:"#ffb3b3",lineHeight:1.7,paddingLeft:20}}>
                <li>❌ Diagnose medical conditions ("You have adrenal fatigue")</li>
                <li>❌ Prescribe treatment protocols ("Take this oil 3x daily for your thyroid")</li>
                <li>❌ Claim to cure, treat, or prevent disease</li>
                <li>❌ Order or interpret diagnostic tests without proper credentials</li>
                <li>❌ Use medical terminology that implies clinical diagnosis</li>
                <li>❌ Hold yourself out as a doctor, practitioner, or healthcare provider</li>
              </ul>
            </div>

            <div style={{padding:16,borderRadius:12,background:"rgba(245,222,179,0.06)",border:"1px solid rgba(245,222,179,0.12)",marginBottom:20}}>
              <h4 style={{fontSize:15,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>✅ What You CAN Do (Safe & Legal Wording)</h4>
              <ul style={{fontSize:12,color:"var(--champagne)",lineHeight:1.7,paddingLeft:20}}>
                <li>✅ Educate: "Lavender is traditionally used to promote calm and relaxation"</li>
                <li>✅ Share experience: "I personally use Frankincense for cellular support"</li>
                <li>✅ Suggest: "Many people find Peppermint helpful for occasional digestive discomfort"</li>
                <li>✅ Coach lifestyle: "Based on your wellness goals, here are some natural options to explore"</li>
                <li>✅ Refer out: "For medical concerns, please consult your licensed healthcare provider"</li>
                <li>✅ Use disclaimers: "This is not medical advice. I am not a doctor."</li>
              </ul>
            </div>

            <div style={{padding:16,borderRadius:12,background:"rgba(218,165,112,0.08)",border:"1px solid rgba(218,165,112,0.15)",marginBottom:20}}>
              <h4 style={{fontSize:15,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>📝 Safe Language Formulas</h4>
              <div style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.7,marginBottom:12}}>
                <p style={{marginBottom:8}}><strong>Instead of:</strong> "You have leaky gut" → <strong>Say:</strong> "Some people experience digestive challenges that may benefit from gut-supporting protocols"</p>
                <p style={{marginBottom:8}}><strong>Instead of:</strong> "This oil will cure your headaches" → <strong>Say:</strong> "Peppermint is commonly used to support comfort during occasional head tension"</p>
                <p style={{marginBottom:8}}><strong>Instead of:</strong> "You need this for your hormones" → <strong>Say:</strong> "Many women find Clary Sage supportive during monthly cycles. Have you tried natural options?"</p>
                <p style={{marginBottom:0}}><strong>Instead of:</strong> "Take 3 drops twice daily" → <strong>Say:</strong> "Typical usage is 1-3 drops as needed. Always follow product label and consult your doctor"</p>
              </div>
            </div>

            <div style={{padding:16,borderRadius:12,background:"rgba(230,183,165,0.08)",border:"1px solid rgba(230,183,165,0.15)",marginBottom:20}}>
              <h4 style={{fontSize:15,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>📋 Required Disclaimers & Waivers</h4>
              <p style={{fontSize:12,color:"var(--rosegold)",lineHeight:1.7,marginBottom:12}}>
                Use these on websites, intake forms, and client communications:
              </p>
              <div style={{padding:12,borderRadius:8,background:"rgba(245,222,179,0.04)",marginBottom:10}}>
                <p style={{fontSize:11,color:"var(--champagne)",lineHeight:1.6,fontStyle:"italic"}}>
                  "I am not a licensed medical professional. The information provided is for educational purposes only and is not intended to diagnose, treat, cure, or prevent any disease. Always consult with a qualified healthcare provider before making changes to your health regimen."
                </p>
              </div>
              <div style={{padding:12,borderRadius:8,background:"rgba(245,222,179,0.04)"}}>
                <p style={{fontSize:11,color:"var(--champagne)",lineHeight:1.6,fontStyle:"italic"}}>
                  "These statements have not been evaluated by the Food and Drug Administration. This product/service is not intended to diagnose, treat, cure, or prevent any disease."
                </p>
              </div>
            </div>

            <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
              <h4 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>📖 Legal Guide for Unlicensed Practitioners (Free PDF)</h4>
              <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:12}}>
                Comprehensive legal guidelines covering scope of practice, liability protection, and how to operate ethically as an unlicensed wellness professional.
              </p>
              <button
                onClick={() => window.open('https://www.drlwilson.com/Articles/LEGAL.GUIDE.pdf', '_blank')}
                style={{background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:"0",padding:"12px 18px",borderRadius:8,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:13,width:"100%",marginBottom:10}}
              >
                Download Legal Guide for Unlicensed Practitioners (PDF)
              </button>
              <button
                onClick={() => window.open('https://lisafraley.com/dont-get-accused-of-practicing-medicine-without-a-license-heres-how/', '_blank')}
                style={{background:"rgba(245,222,179,0.1)",border:"1px solid rgba(245,222,179,0.2)",padding:"10px 16px",borderRadius:8,color:"var(--champagne)",fontWeight:600,cursor:"pointer",fontSize:13,width:"100%"}}
              >
                Read: How to Avoid Practicing Medicine Without License
              </button>
            </div>
          </div>
        </div>
      )
    },
    certifications: {
      title: "Certifications & Education",
      icon: Award,
      content: (
        <div>
          <div style={{padding:24,borderRadius:16,background:"linear-gradient(180deg, rgba(218,165,112,0.12), rgba(185,135,93,0.08))",border:"1px solid rgba(218,165,112,0.2)",marginBottom:24}}>
            <h3 style={{fontSize:22,color:"var(--champagne)",marginBottom:10,fontWeight:700}}>Professional Certifications</h3>
            <p style={{fontSize:14,color:"var(--rosegold)",marginBottom:16,lineHeight:1.6}}>
              Advanced training programs for wellness professionals. Expand your practice, serve your clients at a deeper level, and earn referral income.
            </p>
          </div>

          <div style={{display:"grid",gap:16}}>
            <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
              <h4 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>🌿 Clinical Aromatherapy Certification</h4>
              <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:12}}>
                Evidence-based protocols for integrating essential oils into professional practice. For healthcare providers, wellness practitioners, and holistic therapists.
              </p>
              <button
                onClick={() => window.open('https://healthlifestyleservices.com', '_blank')}
                style={{background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:"0",padding:"10px 16px",borderRadius:8,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:13,width:"100%"}}
              >
                Enroll in Aromatherapy Certification
              </button>
            </div>

            <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
              <h4 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>🥗 Holistic Nutrition Certification</h4>
              <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:12}}>
                Comprehensive training in functional nutrition, supplementation protocols, and metabolic wellness coaching. Build or enhance your nutrition practice.
              </p>
              <button
                onClick={() => window.open('https://healthlifestyleservices.com', '_blank')}
                style={{background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:"0",padding:"10px 16px",borderRadius:8,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:13,width:"100%"}}
              >
                Enroll in Nutrition Certification
              </button>
            </div>

            <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
              <h4 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>🐾 Pet Wellness Specialist Certification</h4>
              <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:12}}>
                Species-specific safety, dosing charts, toxicity protocols, and clinical applications for companion animals. Canine, feline, equine, and exotic pets.
              </p>
              <button
                onClick={() => window.open('https://healthlifestyleservices.com', '_blank')}
                style={{background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:"0",padding:"10px 16px",borderRadius:8,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:13,width:"100%"}}
              >
                Enroll in Pet Wellness Certification
              </button>
            </div>

            <div style={{padding:20,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.08)"}}>
              <h4 style={{fontSize:16,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>🍳 Culinary Essential Oils Certification</h4>
              <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7,marginBottom:12}}>
                Advanced training for chefs, bakers, and food professionals. GRAS oils in cuisine, dosing for flavor profiles, menu integration, and culinary business models.
              </p>
              <button
                onClick={() => window.open('https://healthlifestyleservices.com', '_blank')}
                style={{background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:"0",padding:"10px 16px",borderRadius:8,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:13,width:"100%"}}
              >
                Enroll in Culinary Oils Certification
              </button>
            </div>
          </div>

          <div style={{padding:20,borderRadius:12,background:"rgba(230,183,165,0.12)",border:"1px solid rgba(230,183,165,0.25)",marginTop:24}}>
            <h4 style={{fontSize:15,color:"var(--champagne)",fontWeight:700,marginBottom:10}}>💰 Earn Referral Income</h4>
            <p style={{fontSize:13,color:"var(--rosegold)",lineHeight:1.7}}>
              Associates earn referral fees for every consultation and certification enrollment. Build passive income while helping others advance their wellness careers.
            </p>
          </div>
        </div>
      )
    }
  };

  const navigation = [
    { id: 'manifestation', label: 'Manifestation Box', icon: Target },
    { id: 'whatsNew', label: "What's New", icon: Star },
    { id: 'university', label: 'iTerra University', icon: Award },
    { id: 'flashcards', label: 'Flashcards', icon: BookOpen },
    { id: 'tier1', label: 'Tier 1: Foundations', icon: GraduationCap },
    { id: 'tier2', label: 'Tier 2: Advanced', icon: GraduationCap },
    { id: 'professional', label: 'Professional Programs', icon: Briefcase },
    { id: 'exclusiveContent', label: 'Exclusive Content Library', icon: Star },
    { id: 'compliance', label: 'Compliance & Legal', icon: Shield }
  ];

  const ActiveIcon = sections[activeSection].icon;

  if (loading) {
    return (
      <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"radial-gradient(ellipse at center, #2d1810 0%, #1a0f08 50%, #0d0704 100%)"}}>
        <div style={{color:"var(--champagne)",fontSize:16}}>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div style={{minHeight:"100vh",background:"radial-gradient(ellipse at center, #2d1810 0%, #1a0f08 50%, #0d0704 100%)",padding:"40px 20px"}}>
      <div style={{maxWidth:"1200px",margin:"0 auto"}}>
        <div style={{marginBottom:32,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <h1 style={{fontFamily:"'Playfair Display', serif",fontSize:36,color:"var(--champagne)",marginBottom:8,textShadow:"0 0 20px rgba(245,222,179,0.3)"}}>
              Wellness Vault
            </h1>
            <p style={{color:"var(--rosegold)",fontSize:15}}>
              Welcome, {user?.full_name || 'Associate'} • {userTier.charAt(0).toUpperCase() + userTier.slice(1)} Access
            </p>
          </div>
          <button onClick={handleLogout} style={{padding:"10px 18px",borderRadius:10,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(245,222,179,0.12)",color:"var(--champagne)",cursor:"pointer",display:"flex",alignItems:"center",gap:8,fontSize:14}}>
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"250px 1fr",gap:24}}>
          <div style={{display:"grid",gap:8,alignContent:"start"}}>
            <button onClick={() => {
              const urlParams = new URLSearchParams(window.location.search);
              const isDemoMode = urlParams.get('demo') === 'true';
              navigate(createPageUrl("SpecializedIntake") + (isDemoMode ? '?demo=true' : ''));
            }} style={{padding:16,borderRadius:12,background:"rgba(138,43,226,0.12)",border:"1px solid rgba(138,43,226,0.25)",color:"var(--champagne)",cursor:"pointer",fontSize:14,fontWeight:600,textAlign:"left",display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
              <Star className="w-5 h-5" style={{color:"#b794f6"}} />
              Specialized Intakes (All Access)
            </button>
            
            {navigation.map((item) => {
              const NavIcon = item.icon;
              const isActive = activeSection === item.id;
              const isLocked = (item.id === 'tier2' && !hasAccessToTier('tier2'));
              
              return (
                <button key={item.id} onClick={() => setActiveSection(item.id)} style={{padding:16,borderRadius:12,background:isActive ? "linear-gradient(90deg,var(--bronze),var(--rosegold))" : "rgba(255,255,255,0.04)",border:isActive ? "0" : "1px solid rgba(245,222,179,0.08)",color:isActive ? "#1b0b06" : "var(--champagne)",cursor:"pointer",fontSize:14,fontWeight:isActive ? 700 : 500,textAlign:"left",display:"flex",alignItems:"center",gap:10,transition:"all 0.3s ease",opacity:isLocked ? 0.5 : 1}}>
                  <NavIcon className="w-5 h-5" />
                  {item.label}
                  {isLocked && <Lock className="w-4 h-4 ml-auto" />}
                </button>
              );
            })}
          </div>

          <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(245,222,179,0.06)",borderRadius:16,padding:32}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:24}}>
              <ActiveIcon className="w-6 h-6" style={{color:"var(--rosegold)"}} />
              <h2 style={{fontSize:24,color:"var(--champagne)",fontWeight:700}}>
                {sections[activeSection].title}
              </h2>
            </div>
            {sections[activeSection].content}
          </div>
        </div>
      </div>
    </div>
  );
}