import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock, Loader2 } from "lucide-react";

export default function SpecializedIntake() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState(null);
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('demo') === 'true') {
          setUser({ 
            full_name: 'Demo User', 
            email: 'demo@iterra.com',
            backoffice_access: true,
            education_tier: 'tier3'
          });
          setLoading(false);
          return;
        }

        const isAuth = await base44.auth.isAuthenticated();
        if (!isAuth) {
          navigate(createPageUrl('Home'));
          return;
        }
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (err) {
        navigate(createPageUrl('Home'));
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [navigate]);

  const userTier = user?.education_tier || 'tier1';
  const hasAccessToTier = (requiredTier) => {
    // Temporarily open for review - all tiers have access
    return true;
  };

  const intakeTypes = {
    hormonal: {
      title: "Hormone Assessment for Women's Life Stages",
      description: "Wellness assessment for PMS, perimenopause, and menopause transitions",
      requiredTier: "tier1",
      questions: [
        { id: "age", label: "Age", type: "number" },
        { id: "life_stage", label: "Current Life Stage", type: "select", options: ["menstruating_regular", "menstruating_irregular", "perimenopause", "menopause", "post_menopause"] },
        { id: "cycle_length", label: "Average Menstrual Cycle Length (if applicable)", type: "select", options: ["21_to_24_days", "25_to_28_days", "29_to_32_days", "33_to_35_days", "irregular_varies", "no_period"] },
        { id: "period_duration", label: "Period Duration", type: "select", options: ["1_to_2_days", "3_to_5_days", "6_to_7_days", "8_plus_days", "irregular", "no_period"] },
        { id: "flow_intensity", label: "Menstrual Flow Intensity", type: "select", options: ["light_spotting", "moderate_normal", "heavy_frequent_changes", "very_heavy_with_clots", "no_period"] },
        { id: "cycle_regularity_pattern", label: "Describe your cycle pattern over past 6 months", type: "select", options: ["perfectly_regular_predictable", "mostly_regular_slight_variation", "somewhat_irregular_varies", "very_irregular_unpredictable", "no_period_amenorrhea"] },
        { id: "pms_timing", label: "When do PMS symptoms start?", type: "select", options: ["no_pms", "1_to_2_days_before", "3_to_5_days_before", "7_to_10_days_before", "14_days_before_ovulation"] },
        { id: "pms_symptoms", label: "PMS Symptoms (Select all that apply)", type: "multi", options: ["breast_tenderness", "mood_swings", "irritability", "bloating", "food_cravings", "headaches_migraines", "severe_cramps", "fatigue", "anxiety", "depression", "acne_breakouts", "none"] },
        { id: "menopause_symptoms", label: "Perimenopause/Menopause Symptoms", type: "multi", options: ["hot_flashes", "night_sweats", "vaginal_dryness", "sleep_disturbances", "mood_changes", "weight_gain", "brain_fog", "low_libido", "joint_pain", "urinary_frequency", "dry_skin", "thinning_hair", "none"] },
        { id: "mood_cycle_connection", label: "Do you notice mood changes with your cycle?", type: "select", options: ["no_mood_stable", "slight_changes", "moderate_noticeable", "significant_hard_to_manage", "severe_debilitating"] },
        { id: "energy_level", label: "Average Energy Level", type: "select", options: ["very_low_exhausted", "low_tired_often", "moderate_ups_downs", "good_consistent", "high_energized"] },
        { id: "stress_level", label: "Stress Level", type: "select", options: ["very_low", "low", "moderate", "high", "very_high_overwhelming"] },
        { id: "sleep_quality", label: "Sleep Quality", type: "select", options: ["very_poor_insomnia", "poor_frequent_waking", "fair_some_issues", "good_occasional_issues", "excellent_restful"] },
        { id: "current_bc_hrt", label: "Current Birth Control or Hormone Therapy", type: "select", options: ["none", "birth_control_pill", "iud_hormonal", "patch_ring", "hrt_estrogen", "hrt_combination", "bioidentical_hormones", "other"] },
        { id: "health_conditions", label: "Relevant Health Conditions", type: "multi", options: ["pcos", "endometriosis", "fibroids", "thyroid_issues", "adrenal_issues", "autoimmune", "diabetes", "none", "other"] },
        { id: "previous_labs", label: "Have you had hormone labs done?", type: "select", options: ["no_never", "yes_over_1year_ago", "yes_within_6months", "yes_recently"] },
        { id: "lab_details", label: "Lab results (for specialist review only)", type: "textarea", placeholder: "Optional: List lab values if you want advanced interpretation" },
        { id: "wellness_goals", label: "Top wellness priority", type: "select", options: ["support_hormone_health", "reduce_pms", "manage_menopause_transition", "increase_energy", "improve_mood", "better_sleep", "support_fertility"] }
      ]
    },
    detox: {
      title: "Detoxification Wellness Assessment",
      description: "Comprehensive assessment to identify detox pathways and create personalized protocols",
      requiredTier: "tier1",
      questions: [
        { id: "metallic_taste", label: "Do you experience a metallic taste in your mouth?", type: "select", options: ["never", "rarely", "sometimes", "often", "constantly"] },
        { id: "brain_fog_severity", label: "Brain fog or memory issues", type: "select", options: ["none", "mild_occasional", "moderate_frequent", "severe_daily", "debilitating"] },
        { id: "white_tongue_coating", label: "Do you have white coating on your tongue?", type: "select", options: ["no", "slight", "moderate", "thick_white"] },
        { id: "sugar_cravings_intensity", label: "Intensity of sugar/carb cravings", type: "select", options: ["none", "mild", "moderate", "strong_daily", "uncontrollable"] },
        { id: "yeast_infections", label: "History of yeast infections or fungal issues", type: "select", options: ["never", "once_rare", "occasional", "frequent_recurring", "chronic"] },
        { id: "digestive_bloating", label: "Bloating after eating", type: "select", options: ["never", "rarely", "sometimes_certain_foods", "after_most_meals", "constant_bloating"] },
        { id: "skin_breakouts_location", label: "Skin issues (acne, rashes, eczema)", type: "select", options: ["none", "occasional_mild", "moderate_face", "severe_face_body", "chronic_widespread"] },
        { id: "joint_inflammation", label: "Joint pain or inflammation", type: "select", options: ["none", "mild_occasional", "moderate_some_joints", "severe_multiple_joints", "chronic_debilitating"] },
        { id: "liver_area_discomfort", label: "Discomfort in right upper abdomen (liver area)", type: "select", options: ["never", "rarely", "sometimes", "often", "constant_pain"] },
        { id: "dark_urine", label: "Urine color", type: "select", options: ["clear_light_yellow", "yellow", "dark_yellow", "amber_brown", "very_dark_cloudy"] },
        { id: "duration", label: "Preferred Detox Duration", type: "select", options: ["3_day_quick", "7_day", "14_day", "30_day", "6_week_42_day", "90_day_full"] },
        { id: "current_symptoms", label: "Current Symptoms (Select all)", type: "multi", options: ["headaches_frequent", "chronic_fatigue", "brain_fog", "bloating_gas", "constipation", "diarrhea", "acne_skin_issues", "joint_pain", "unexplained_weight_gain", "insomnia", "anxiety", "depression", "sugar_cravings", "frequent_illness", "allergies"] },
        { id: "digestive_health", label: "Bowel Movements Per Day", type: "select", options: ["less_than_1", "1_per_day", "2_per_day", "3_or_more", "irregular_constipation", "irregular_diarrhea"] },
        { id: "stool_quality", label: "Stool Quality", type: "select", options: ["hard_pellets", "lumpy_sausage", "cracked_sausage", "smooth_soft_snake_ideal", "soft_blobs", "mushy_loose", "liquid_watery"] },
        { id: "water_intake", label: "Current Daily Water Intake", type: "select", options: ["less_than_32oz", "32_to_64oz", "64_to_96oz", "more_than_96oz"] },
        { id: "caffeine_daily", label: "Daily Caffeine Consumption", type: "select", options: ["none", "1_cup", "2_to_3_cups", "4_plus_cups"] },
        { id: "alcohol_weekly", label: "Weekly Alcohol Consumption", type: "select", options: ["none", "1_to_3_drinks", "4_to_7_drinks", "8_plus_drinks"] },
        { id: "smoking", label: "Tobacco/Vaping Use", type: "select", options: ["never", "former_quit", "occasional", "daily"] },
        { id: "exposure_toxins", label: "Environmental/Chemical Exposures", type: "multi", options: ["pesticides_herbicides", "heavy_metals_exposure", "mold_in_home", "air_pollution_urban", "chemical_cleaners_daily", "fragrances_perfumes", "plastic_containers", "tap_water_unfiltered", "none_known"] },
        { id: "diet_quality", label: "Typical Diet", type: "select", options: ["whole_foods_organic", "mostly_whole_foods", "mixed_some_processed", "mostly_processed", "fast_food_frequent"] },
        { id: "sugar_intake", label: "Daily Sugar/Sweets Consumption", type: "select", options: ["none_minimal", "occasional_small", "moderate_daily", "high_multiple_daily"] },
        { id: "energy_level", label: "Energy Level", type: "select", options: ["very_low_exhausted", "low_frequent_crashes", "moderate_some_crashes", "good_consistent", "high_energized"] },
        { id: "sleep_quality", label: "Sleep Quality", type: "select", options: ["very_poor", "poor", "fair", "good", "excellent"] },
        { id: "exercise_frequency", label: "Exercise Frequency", type: "select", options: ["none", "1_to_2_times_week", "3_to_4_times_week", "5_plus_times_week", "daily"] },
        { id: "supplements_current", label: "Currently taking supplements/medications?", type: "select", options: ["none", "vitamins_only", "multiple_supplements", "prescription_meds", "both_supplements_and_meds"] },
        { id: "supplement_details", label: "List supplements/medications (for specialist review)", type: "textarea", placeholder: "Optional: List for advanced protocol customization" },
        { id: "health_conditions", label: "Health Conditions", type: "multi", options: ["liver_disease", "kidney_disease", "autoimmune", "diabetes", "heart_disease", "thyroid", "digestive_disorders", "none", "other"] },
        { id: "condition_details", label: "Health condition details (for specialist review)", type: "textarea", placeholder: "Optional: Provide details for advanced support" },
        { id: "detox_readiness", label: "Commitment Level to Lifestyle Changes", type: "select", options: ["minimal_easy_changes_only", "moderate_some_effort", "high_dedicated", "very_high_all_in"] },
        { id: "primary_goal", label: "Primary Goal", type: "select", options: ["increase_energy", "weight_loss", "clear_skin", "reduce_inflammation", "improve_digestion", "mental_clarity", "immune_support", "overall_reset"] }
      ]
    },
    athletic: {
      title: "Athletic Performance & Recovery Assessment",
      description: "Wellness protocols for training optimization, recovery support, and athletic goals",
      requiredTier: "tier1",
      questions: [
        { id: "sport_type", label: "Primary Athletic Activity", type: "select", options: ["running_endurance", "cycling", "weightlifting_strength", "crossfit_hiit", "yoga_pilates", "swimming", "team_sports", "martial_arts", "multiple_sports", "general_fitness"] },
        { id: "sport_specific", label: "Specific sport/activity you're training for", type: "text", placeholder: "e.g., marathon, powerlifting meet, soccer season" },
        { id: "primary_athletic_goal", label: "Primary Athletic Goal", type: "select", options: ["improve_performance", "lose_weight_get_lean", "build_muscle_strength", "increase_endurance_stamina", "injury_recovery", "maintain_fitness", "compete_event"] },
        { id: "weight_loss_goal", label: "Is weight loss part of your goal?", type: "select", options: ["no_not_focused_on_weight", "yes_lose_5_10_lbs", "yes_lose_10_20_lbs", "yes_lose_20plus_lbs", "yes_body_recomp_same_weight"] },
        { id: "training_frequency", label: "Weekly Training Frequency", type: "select", options: ["1_to_2_days", "3_to_4_days", "5_to_6_days", "daily", "twice_daily"] },
        { id: "training_duration", label: "Average Workout Duration", type: "select", options: ["under_30min", "30_to_60min", "60_to_90min", "90min_plus"] },
        { id: "experience_level", label: "Training Experience", type: "select", options: ["beginner_under_1yr", "intermediate_1_to_3yrs", "advanced_3_to_5yrs", "elite_5plus_yrs"] },
        { id: "performance_goals", label: "Performance Goals (Select all)", type: "multi", options: ["increase_endurance", "build_strength", "improve_recovery", "injury_prevention", "lose_body_fat", "gain_muscle_mass", "increase_flexibility", "enhance_focus", "boost_energy"] },
        { id: "current_challenges", label: "Current Performance Challenges", type: "multi", options: ["slow_recovery", "muscle_soreness_doms", "joint_pain", "lack_of_energy", "poor_sleep", "plateaued_progress", "frequent_injuries", "mental_fatigue", "lack_of_motivation", "overtraining_burnout"] },
        { id: "pain_areas", label: "Areas of Pain/Tension/Injury", type: "multi", options: ["shoulders", "lower_back", "upper_back", "knees", "hips", "ankles", "wrists", "elbows", "neck", "hamstrings", "calves", "none"] },
        { id: "pain_severity", label: "Pain Severity (if applicable)", type: "select", options: ["no_pain", "mild_occasional", "moderate_frequent", "severe_limits_training", "chronic_daily"] },
        { id: "recovery_time", label: "Recovery Time After Intense Training", type: "select", options: ["same_day_ready", "24_hours", "48_hours", "72_hours", "more_than_3_days"] },
        { id: "muscle_soreness_duration", label: "How long does muscle soreness typically last?", type: "select", options: ["no_soreness", "24hrs", "48hrs", "3_to_4_days", "5plus_days_chronic"] },
        { id: "sleep_hours", label: "Average Sleep Per Night", type: "select", options: ["less_than_6hrs", "6_to_7hrs", "7_to_8hrs", "8_to_9hrs", "more_than_9hrs"] },
        { id: "sleep_quality", label: "Sleep Quality", type: "select", options: ["very_poor", "poor", "fair", "good", "excellent"] },
        { id: "sleep_disruption_training", label: "Does training disrupt your sleep?", type: "select", options: ["no_sleep_well", "sometimes_after_intense", "often_hard_to_wind_down", "frequently_wired_at_night", "always_cant_sleep_after_training"] },
        { id: "muscle_repair_concern", label: "Concerned about muscle repair/recovery", type: "select", options: ["no_recover_fine", "somewhat_could_improve", "yes_slow_recovery", "yes_frequent_injuries", "major_concern_breaking_down"] },
        { id: "pre_workout_nutrition", label: "Pre-Workout Nutrition", type: "select", options: ["nothing_fasted", "light_snack", "small_meal_1_2hrs", "full_meal_2_3hrs", "supplement_only"] },
        { id: "post_workout_nutrition", label: "Post-Workout Nutrition Timing", type: "select", options: ["within_30min", "30min_to_1hr", "1_to_2hrs", "more_than_2hrs", "inconsistent"] },
        { id: "hydration_level", label: "Hydration During Training", type: "select", options: ["minimal_none", "some_water", "adequate_water", "water_plus_electrolytes"] },
        { id: "current_supplements", label: "Current Sports Supplements", type: "multi", options: ["none", "protein_powder", "pre_workout", "creatine", "bcaas", "electrolytes", "multivitamin", "omega3", "other"] },
        { id: "supplement_details", label: "Supplement details (for specialist review)", type: "textarea", placeholder: "Optional: List brands/dosages for advanced protocol" },
        { id: "injuries_current", label: "Current Injuries/Limitations", type: "select", options: ["none", "minor_managing", "moderate_affecting_training", "major_seeking_treatment"] },
        { id: "injury_details", label: "Injury history (for specialist review)", type: "textarea", placeholder: "Optional: Detail for advanced support" },
        { id: "training_goal_timeline", label: "Training Goal Timeline", type: "select", options: ["general_ongoing", "event_in_1_3_months", "event_in_3_6_months", "season_prep", "competition_upcoming"] }
      ]
    },
    beauty: {
      title: "Beauty & Skin Wellness Assessment",
      description: "Comprehensive assessment for skin health, cellular support, and beauty wellness goals",
      requiredTier: "tier1",
      questions: [
        { id: "age", label: "Age Range", type: "select", options: ["18_to_25", "26_to_35", "36_to_45", "46_to_55", "56_to_65", "66_plus"] },
        { id: "skin_type", label: "Skin Type", type: "select", options: ["dry_tight", "oily_shiny", "combination_t_zone", "sensitive_reactive", "normal_balanced", "mature_aging"] },
        { id: "skin_concerns", label: "Skin Concerns (Select all)", type: "multi", options: ["fine_lines_wrinkles", "age_spots_hyperpigmentation", "acne_breakouts", "rosacea_redness", "sagging_loss_firmness", "dull_tired_skin", "large_pores", "uneven_skin_tone", "dark_circles_puffiness", "texture_roughness", "dehydration_flaking"] },
        { id: "concern_priority", label: "Top Priority Concern", type: "select", options: ["anti_aging_lines", "acne_clarity", "brightening_dark_spots", "firming_sagging", "hydration_dryness", "redness_sensitivity", "texture_pores"] },
        { id: "skin_age_vs_actual", label: "How does your skin age compare to your actual age?", type: "select", options: ["looks_younger", "looks_same_age", "looks_slightly_older", "looks_significantly_older"] },
        { id: "skincare_goal_timeline", label: "What are you preparing for or working toward?", type: "text", placeholder: "e.g., wedding, event, photoshoot, just want healthier skin" },
        { id: "current_routine_am", label: "Morning Skincare Routine", type: "select", options: ["minimal_water_only", "cleanser_moisturizer", "cleanser_serum_moisturizer_spf", "full_multi_step", "inconsistent"] },
        { id: "current_routine_pm", label: "Evening Skincare Routine", type: "select", options: ["minimal_water_only", "cleanser_moisturizer", "cleanser_serum_moisturizer", "full_multi_step_treatments", "inconsistent"] },
        { id: "spf_usage", label: "Daily SPF Use", type: "select", options: ["never", "rarely_sometimes", "most_days", "daily_every_morning", "daily_reapply"] },
        { id: "product_sensitivities", label: "Product Sensitivities", type: "multi", options: ["none_known", "fragrances", "retinol_vitamin_a", "vitamin_c", "acids_exfoliants", "essential_oils", "alcohol", "specific_ingredients"] },
        { id: "sensitivity_details", label: "Sensitivity details (for specialist review)", type: "textarea", placeholder: "Optional: List specific products/ingredients that cause reactions" },
        { id: "sun_exposure", label: "Daily Sun Exposure", type: "select", options: ["minimal_indoors_mostly", "moderate_some_outdoor", "high_outdoors_often", "very_high_outdoor_work"] },
        { id: "lifestyle_factors", label: "Lifestyle Factors", type: "multi", options: ["smoking_vaping", "alcohol_3plus_weekly", "sleep_under_6hrs", "high_stress_chronic", "processed_foods_frequent", "low_water_under_32oz", "high_sugar_diet", "none_healthy"] },
        { id: "hormonal_skin_changes", label: "Hormonal Changes Affecting Skin", type: "select", options: ["no_stable", "menstrual_breakouts_monthly", "perimenopause_changes", "post_menopause_dryness", "postpartum_changes", "thyroid_condition", "pcos_acne"] },
        { id: "water_intake", label: "Daily Water Intake", type: "select", options: ["less_than_32oz", "32_to_64oz", "64_to_96oz", "more_than_96oz"] },
        { id: "diet_quality", label: "Diet Quality", type: "select", options: ["whole_foods_balanced", "mostly_whole_foods", "mixed_some_processed", "mostly_processed", "fast_food_frequent"] },
        { id: "fruits_veggies_daily", label: "Daily Fruits & Vegetables", type: "select", options: ["minimal_1_2_servings", "moderate_3_4_servings", "good_5_plus_servings", "excellent_7_plus_servings"] },
        { id: "collagen_protein", label: "Protein/Collagen Intake", type: "select", options: ["low_inconsistent", "moderate_some_daily", "adequate_every_meal", "high_supplementing"] },
        { id: "sleep_quality", label: "Sleep Quality", type: "select", options: ["very_poor_under_5hrs", "poor_5_to_6hrs", "fair_6_to_7hrs", "good_7_to_8hrs", "excellent_8plus_hrs"] },
        { id: "budget_range", label: "Monthly Skincare Budget", type: "select", options: ["minimal_under_50", "modest_50_to_100", "moderate_100_to_200", "flexible_200_to_400", "unlimited_400_plus"] },
        { id: "goal_timeline", label: "Primary Goal Timeline", type: "select", options: ["quick_results_30days", "moderate_2_to_3_months", "gradual_3_to_6_months", "long_term_6plus_months", "maintenance_ongoing"] }
      ]
    },
    metabolic: {
      title: "Metabolic Health & Weight Wellness Assessment",
      description: "Comprehensive assessment for metabolic support, weight wellness goals, and energy optimization",
      requiredTier: "tier1",
      questions: [
        { id: "age", label: "Age Range", type: "select", options: ["18_to_29", "30_to_39", "40_to_49", "50_to_59", "60_plus"] },
        { id: "gender", label: "Gender", type: "select", options: ["female", "male", "prefer_not_to_say"] },
        { id: "height_feet", label: "Height (feet)", type: "select", options: ["4", "5", "6", "7"] },
        { id: "height_inches", label: "Height (inches)", type: "select", options: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"] },
        { id: "current_weight_range", label: "Current Weight Range", type: "select", options: ["under_120", "120_to_150", "151_to_180", "181_to_210", "211_to_250", "251_to_300", "over_300"] },
        { id: "goal_weight_range", label: "Goal Weight Range", type: "select", options: ["under_120", "120_to_150", "151_to_180", "181_to_210", "211_to_250", "maintain_current"] },
        { id: "weight_change_pattern", label: "Weight Pattern Over Past Year", type: "select", options: ["gained_10plus_lbs", "gained_5_to_10_lbs", "stable_no_change", "lost_5_to_10_lbs", "lost_10plus_lbs", "fluctuates_yoyo"] },
        { id: "weight_loss_attempts", label: "How many times have you tried to lose weight?", type: "select", options: ["never_tried", "1_to_2_times", "3_to_5_times", "6_to_10_times", "more_than_10_countless"] },
        { id: "weight_gain_speed", label: "When did you gain the weight?", type: "select", options: ["gradual_over_years", "past_1_to_2_years", "past_6_months_rapid", "after_specific_event", "always_been_this_weight"] },
        { id: "eating_control", label: "Do you feel in control of your eating?", type: "select", options: ["yes_full_control", "mostly_some_struggles", "sometimes_lose_control", "rarely_often_binge", "no_out_of_control"] },
        { id: "metabolic_concerns", label: "Metabolic Concerns (Select all)", type: "multi", options: ["prediabetes_high_blood_sugar", "insulin_resistance", "type_2_diabetes", "thyroid_issues", "slow_metabolism_cant_lose", "constant_sugar_cravings", "afternoon_energy_crashes", "difficulty_losing_despite_diet", "rapid_weight_gain", "always_hungry_never_full"] },
        { id: "energy_patterns", label: "Daily Energy Pattern", type: "select", options: ["consistent_stable_all_day", "strong_morning_crash_afternoon", "always_tired_all_day", "wired_tired_cant_relax", "crashes_immediately_after_meals"] },
        { id: "hunger_fullness_cues", label: "Can you recognize when you're hungry vs. full?", type: "select", options: ["yes_clearly", "mostly_sometimes_confused", "rarely_disconnect", "no_dont_feel_hunger", "no_never_feel_full"] },
        { id: "cravings", label: "Food Cravings (Select all)", type: "multi", options: ["sugar_sweets_desserts", "carbs_bread_pasta_rice", "salty_chips_savory", "no_major_cravings", "caffeine_need_to_function", "late_night_eating_after_dinner"] },
        { id: "eating_patterns", label: "Eating Patterns (Select all)", type: "multi", options: ["skip_breakfast_regularly", "eat_very_late_at_night", "emotional_stress_eating", "binge_eating_episodes", "restrictive_strict_dieting", "regular_3_meals_balanced"] },
        { id: "previous_diet_success", label: "Previous Diet Attempts", type: "select", options: ["never_tried_dieting", "tried_failed_gained_back", "some_success_couldnt_maintain", "moderate_success_maintained_some", "successful_maintained_long_term"] },
        { id: "diet_details", label: "Diet history details (for specialist review)", type: "textarea", placeholder: "Optional: List specific diets tried and results" },
        { id: "physical_activity", label: "Current Exercise Level", type: "select", options: ["none_sedentary", "light_1_to_2_days_week", "moderate_3_to_4_days", "active_5_to_6_days", "very_active_daily_athlete"] },
        { id: "sleep_hours", label: "Average Sleep Per Night", type: "select", options: ["less_than_5hrs", "5_to_6hrs", "6_to_7hrs", "7_to_8hrs", "more_than_8hrs"] },
        { id: "sleep_quality", label: "Sleep Quality", type: "select", options: ["very_poor_insomnia", "poor_restless", "fair_ok", "good_restful", "excellent_wake_refreshed"] },
        { id: "stress_level", label: "Stress Level", type: "select", options: ["very_low_relaxed", "low_manageable", "moderate_frequent", "high_chronic", "very_high_overwhelming"] },
        { id: "water_intake", label: "Daily Water Intake", type: "select", options: ["minimal_under_32oz", "low_32_to_64oz", "adequate_64_to_96oz", "high_over_96oz"] },
        { id: "meal_timing", label: "Typical Eating Window", type: "select", options: ["eat_all_day_grazing", "3_meals_snacks", "intermittent_fasting_16_8", "one_two_meals_day", "irregular_varies_daily"] },
        { id: "alcohol_consumption", label: "Weekly Alcohol Consumption", type: "select", options: ["none", "1_to_3_drinks", "4_to_7_drinks", "8_to_14_drinks", "15_plus_drinks"] },
        { id: "labs_done", label: "Recent Lab Work Completed", type: "select", options: ["no_labs_done", "yes_over_1yr_ago", "yes_within_year", "yes_recent_3months"] },
        { id: "lab_results", label: "Lab values (for specialist review)", type: "textarea", placeholder: "Optional: Provide glucose, A1C, thyroid, insulin, lipids for advanced protocol" },
        { id: "medications_supplements", label: "Taking Medications/Supplements", type: "select", options: ["none", "vitamins_only", "multiple_supplements", "prescription_meds", "both_meds_and_supplements"] },
        { id: "medication_details", label: "Medication list (for specialist review)", type: "textarea", placeholder: "Optional: List for drug interaction screening" },
        { id: "health_conditions", label: "Health Conditions (Select all)", type: "multi", options: ["diabetes_type_2", "prediabetes", "pcos", "hypothyroid", "hyperthyroid", "metabolic_syndrome", "heart_disease", "high_blood_pressure", "high_cholesterol", "none"] },
        { id: "primary_goal", label: "Primary Goal", type: "select", options: ["lose_weight_fat", "build_muscle_tone", "increase_energy", "balance_blood_sugar", "reduce_cravings", "improve_metabolism", "maintenance_prevent_gain"] },
        { id: "goal_timeline", label: "Goal Timeline", type: "select", options: ["quick_1_to_2_months", "moderate_3_to_6_months", "long_term_6_to_12_months", "lifestyle_change_ongoing"] }
      ]
    },
    stress_sleep: {
      title: "Stress & Sleep Wellness Assessment",
      description: "Comprehensive assessment for stress support, sleep quality, and nervous system wellness",
      requiredTier: "tier1",
      questions: [
        { id: "stress_level", label: "Current Stress Level", type: "select", options: ["very_low_relaxed", "low_manageable", "moderate_noticeable", "high_difficult", "very_high_overwhelming"] },
        { id: "stress_duration", label: "Duration of Elevated Stress", type: "select", options: ["recent_under_1month", "short_term_1_to_3months", "moderate_3_to_6months", "long_term_6_to_12months", "chronic_over_1year"] },
        { id: "stress_impact_daily", label: "How much does stress impact your daily life?", type: "select", options: ["minimal_handle_well", "some_manageable", "moderate_affects_function", "significant_hard_to_cope", "severe_debilitating"] },
        { id: "stress_symptoms", label: "Stress Symptoms (Select all)", type: "multi", options: ["anxiety_nervousness", "panic_attacks", "irritability_short_fuse", "feeling_overwhelmed", "racing_thoughts", "difficulty_concentrating", "forgetfulness_memory", "muscle_tension_tightness", "frequent_headaches", "digestive_issues_stomach", "appetite_changes", "mood_swings_emotional"] },
        { id: "stress_physical", label: "Physical Stress Manifestations (Select all)", type: "multi", options: ["jaw_clenching_grinding", "nail_biting_picking", "shallow_breathing", "chest_tightness", "heart_palpitations", "sweating_clammy", "trembling_shaking", "none_noticeable"] },
        { id: "relaxation_difficulty", label: "Can you relax or turn off your mind?", type: "select", options: ["yes_easily", "mostly_with_effort", "sometimes_hard", "rarely_always_on", "never_cant_shut_off"] },
        { id: "stress_sources", label: "Primary Stress Sources (Select all)", type: "multi", options: ["work_career_pressure", "family_relationships", "financial_concerns", "health_concerns_own", "health_concerns_loved_ones", "caregiving_responsibilities", "major_life_transitions", "chronic_pain_illness", "past_trauma", "perfectionism_control", "uncertainty_unknown"] },
        { id: "coping_methods", label: "Current Coping Methods (Select all)", type: "multi", options: ["exercise_movement", "meditation_mindfulness", "deep_breathing", "therapy_counseling", "medication_prescribed", "journaling_writing", "social_support_talking", "hobbies_creative", "nature_outdoors", "none_struggling", "unhealthy_avoidance"] },
        { id: "sleep_hours", label: "Average Sleep Per Night", type: "select", options: ["under_5hrs", "5_to_6hrs", "6_to_7hrs", "7_to_8hrs", "8_to_9hrs", "over_9hrs", "highly_variable"] },
        { id: "sleep_quality", label: "Sleep Quality", type: "select", options: ["very_poor_terrible", "poor_restless", "fair_ok_some_nights", "good_mostly_restful", "excellent_deep_refreshing"] },
        { id: "falling_asleep", label: "Falling Asleep", type: "select", options: ["under_15min_easy", "15_to_30min_normal", "30_to_60min_difficult", "over_1hr_very_difficult", "varies_inconsistent"] },
        { id: "sleep_disruptions", label: "Sleep Disruptions (Select all)", type: "multi", options: ["wake_1_to_2_times", "wake_3_plus_times", "wake_early_cant_return", "nightmares_vivid_dreams", "racing_thoughts_cant_shut_off", "restless_toss_turn", "hot_flashes_night_sweats", "need_bathroom", "pain_discomfort", "snoring_apnea", "none_sleep_through"] },
        { id: "wake_feeling", label: "How You Wake Up", type: "select", options: ["refreshed_energized", "ok_decent", "tired_groggy", "exhausted_drained", "depends_varies"] },
        { id: "bedtime_routine_exists", label: "Bedtime Routine", type: "select", options: ["consistent_calming_routine", "some_routine_not_consistent", "minimal_routine_brush_teeth", "no_routine_crash_when_tired"] },
        { id: "screen_time_bed", label: "Screen Time Before Bed", type: "select", options: ["none_1hr_buffer", "minimal_under_30min", "moderate_30_to_60min", "heavy_1_to_2hrs", "excessive_scrolling_until_sleep"] },
        { id: "bedroom_environment", label: "Sleep Environment", type: "select", options: ["ideal_dark_cool_quiet", "mostly_good_minor_issues", "some_issues_noise_light", "poor_uncomfortable", "very_poor_major_issues"] },
        { id: "bedtime_consistency", label: "Bedtime Consistency", type: "select", options: ["same_time_daily", "mostly_consistent_1hr_variance", "somewhat_varies_2hr_variance", "inconsistent_3plus_hr_variance", "completely_irregular"] },
        { id: "wake_time_consistency", label: "Wake Time Consistency", type: "select", options: ["same_time_daily_weekends_too", "consistent_weekdays_sleep_in_weekends", "varies_1_to_2hrs", "varies_3plus_hrs", "completely_irregular"] },
        { id: "caffeine_timing", label: "Daily Caffeine & Timing", type: "select", options: ["none", "morning_only_before_10am", "morning_midday_before_2pm", "afternoon_2_to_5pm", "evening_after_5pm"] },
        { id: "caffeine_amount", label: "Caffeine Amount", type: "select", options: ["none", "low_1_serving", "moderate_2_to_3_servings", "high_4_to_5_servings", "excessive_6plus_servings"] },
        { id: "alcohol_sleep", label: "Alcohol Use to Help Sleep", type: "select", options: ["never", "rarely_special_occasions", "occasionally_1_to_2_weekly", "frequently_3_to_5_weekly", "nightly_to_fall_asleep"] },
        { id: "sleep_aids_current", label: "Current Sleep Aids", type: "multi", options: ["none", "melatonin", "magnesium", "herbal_teas_valerian", "cbd", "prescription_sleep_med", "otc_antihistamine_benadryl", "essential_oils_aromatherapy", "white_noise_app"] },
        { id: "sleep_aid_details", label: "Sleep aid details (for specialist review)", type: "textarea", placeholder: "Optional: List brands/dosages/frequency for protocol customization" },
        { id: "work_schedule", label: "Work Schedule", type: "select", options: ["regular_9_to_5", "early_start_before_7am", "late_shift_after_2pm", "night_shift", "rotating_shifts", "irregular_unpredictable", "remote_flexible"] },
        { id: "exercise_frequency", label: "Exercise Frequency", type: "select", options: ["none_sedentary", "rarely_1_day_week", "occasional_2_days", "regular_3_to_4_days", "frequent_5plus_days", "daily_athlete"] },
        { id: "exercise_timing", label: "Typical Exercise Timing", type: "select", options: ["no_exercise", "morning_before_noon", "afternoon_noon_to_5pm", "evening_5_to_8pm", "late_evening_after_8pm", "varies_inconsistent"] },
        { id: "nutrition_sleep", label: "Evening Eating Patterns", type: "select", options: ["no_food_3hrs_before_bed", "light_snack_1_to_2hrs_before", "moderate_meal_before_bed", "heavy_meal_right_before", "late_night_snacking_after_dinner"] },
        { id: "health_conditions_sleep", label: "Conditions Affecting Sleep/Stress (Select all)", type: "multi", options: ["anxiety_disorder", "depression", "ptsd", "chronic_pain", "fibromyalgia", "sleep_apnea_diagnosed", "restless_leg_syndrome", "thyroid_disorder", "hormonal_imbalance", "none_known", "other"] },
        { id: "condition_details", label: "Condition details (for specialist review)", type: "textarea", placeholder: "Optional: Provide details for advanced sleep protocol" },
        { id: "medications_affect_sleep", label: "Taking Medications That Affect Sleep", type: "select", options: ["no_medications", "yes_sleep_medication", "yes_stimulants_adhd", "yes_antidepressants", "yes_pain_medication", "yes_multiple", "unsure"] },
        { id: "medication_list", label: "Medication list (for specialist review)", type: "textarea", placeholder: "Optional: List medications for interaction screening" },
        { id: "primary_goal", label: "Primary Goal", type: "select", options: ["reduce_stress_anxiety", "improve_sleep_quality", "fall_asleep_easier", "stay_asleep_through_night", "wake_more_refreshed", "natural_sleep_aids", "reduce_medication_dependence", "overall_nervous_system_support"] }
      ]
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const intakeType = intakeTypes[selectedType];
      const requiresPractitioner = intakeType.flagsPractitioner;

      // Generate AI recommendations
      const prompt = `You are a wellness product specialist. Based on this ${selectedType} intake, recommend specific doTERRA products and create a turnkey protocol.

Intake Data: ${JSON.stringify(formData, null, 2)}

Provide:
1. Top 3-5 recommended products with doTERRA product slugs
2. 30/60/90-day protocol timeline
3. Daily usage instructions
4. Expected outcomes timeline
5. DIY recipe suggestions
${requiresPractitioner ? "6. FLAG: Recommend practitioner review for lab interpretation or advanced clinical support" : ""}

Format as structured JSON.`;

      const aiResponse = await base44.integrations.Core.InvokeLLM({
        prompt: prompt,
        response_json_schema: {
          type: "object",
          properties: {
            recommended_products: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  slug: { type: "string" },
                  reason: { type: "string" }
                }
              }
            },
            protocol_timeline: { type: "string" },
            daily_instructions: { type: "string" },
            expected_outcomes: { type: "string" },
            diy_recipes: { type: "array", items: { type: "string" } },
            practitioner_review_recommended: { type: "boolean" }
          }
        }
      });

      // Save to database
      await base44.entities.SpecializedIntake.create({
        email: user.email,
        intake_type: selectedType,
        form_data: formData,
        ai_recommendations: aiResponse,
        requires_practitioner_review: requiresPractitioner || aiResponse.practitioner_review_recommended,
        tier_level: userTier,
        status: "ai_processed"
      });

      // Send email
      await base44.integrations.Core.SendEmail({
        to: user.email,
        subject: `Your ${intakeType.title} Results`,
        body: `Your specialized intake has been processed!\n\nRecommended Products:\n${aiResponse.recommended_products.map(p => `• ${p.name}: ${p.reason}`).join('\n')}\n\nProtocol: ${aiResponse.protocol_timeline}\n\n💎 Need deeper support? Work with a specialist who can customize protocols at an advanced level with lab interpretation: https://healthlifestyleservices.com\n\nView full recommendations in your dashboard.`
      });

      alert('✨ Your specialized intake has been processed! Check your email for recommendations.');
      navigate(createPageUrl("BackOffice"));
      
    } catch (error) {
      console.error("Error submitting intake:", error);
      alert("There was an error processing your intake. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"radial-gradient(ellipse at center, #2d1810 0%, #1a0f08 50%, #0d0704 100%)"}}>
        <Loader2 className="w-8 h-8 animate-spin" style={{color:"var(--champagne)"}} />
      </div>
    );
  }

  const TierLock = ({ requiredTier, children }) => {
    if (hasAccessToTier(requiredTier)) {
      return children;
    }
    return (
      <div style={{padding:40,textAlign:"center",borderRadius:16,background:"rgba(0,0,0,0.3)",border:"1px solid rgba(245,222,179,0.1)"}}>
        <Lock className="w-16 h-16" style={{color:"var(--rosegold)",opacity:0.5,margin:"0 auto 16px"}} />
        <p style={{fontSize:18,color:"var(--rosegold)",marginBottom:12,fontWeight:700}}>Unlock with {requiredTier.charAt(0).toUpperCase() + requiredTier.slice(1)} Membership</p>
        <p style={{fontSize:13,color:"rgba(245,222,179,0.7)",marginBottom:20}}>This specialized intake is available for Tier 2+ members</p>
        <button
          onClick={() => window.open('https://healthlifestyleservices.com?upgrade=' + requiredTier, '_blank')}
          style={{padding:"12px 24px",borderRadius:12,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,cursor:"pointer",fontSize:14}}
        >
          Upgrade to {requiredTier.charAt(0).toUpperCase() + requiredTier.slice(1)}
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen py-12 px-4" style={{
      background: 'radial-gradient(ellipse at center, #2d1810 0%, #1a0f08 50%, #0d0704 100%)'
    }}>
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate(createPageUrl("BackOffice"))}
          className="mb-8 text-[var(--champagne)] hover:text-[var(--rosegold)]"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Back Office
        </Button>

        <div className="text-center mb-12">
          <h1 style={{fontSize:36,color:"var(--champagne)",marginBottom:12,fontFamily:"'Playfair Display', serif",textShadow:"0 0 20px rgba(245,222,179,0.4)"}}>
            Specialized Wellness Intakes
          </h1>
          <p style={{fontSize:15,color:"var(--rosegold)",lineHeight:1.6}}>
            Advanced assessments for targeted wellness protocols
          </p>
        </div>

        {!selectedType ? (
          <div style={{display:"grid",gap:20,maxWidth:800,margin:"0 auto"}}>
            {Object.entries(intakeTypes).map(([key, intake]) => (
              <div key={key} style={{padding:24,borderRadius:16,background:"linear-gradient(135deg, rgba(218,165,112,0.12), rgba(185,135,93,0.08))",border:"1px solid rgba(218,165,112,0.25)",position:"relative"}}>
                {!hasAccessToTier(intake.requiredTier) && (
                  <div style={{position:"absolute",top:12,right:12,padding:"6px 12px",borderRadius:20,background:"rgba(138,43,226,0.2)",fontSize:11,color:"#b794f6",fontWeight:700}}>
                    {intake.requiredTier.toUpperCase()} REQUIRED
                  </div>
                )}
                <h3 style={{fontSize:20,color:"var(--champagne)",marginBottom:8,fontWeight:700}}>{intake.title}</h3>
                <p style={{fontSize:14,color:"var(--rosegold)",lineHeight:1.6,marginBottom:16}}>{intake.description}</p>

                <button
                  onClick={() => hasAccessToTier(intake.requiredTier) ? setSelectedType(key) : null}
                  disabled={!hasAccessToTier(intake.requiredTier)}
                  style={{
                    padding:"12px 20px",
                    borderRadius:12,
                    background: hasAccessToTier(intake.requiredTier) ? "linear-gradient(90deg,var(--bronze),var(--rosegold))" : "rgba(245,222,179,0.1)",
                    border:0,
                    color: hasAccessToTier(intake.requiredTier) ? "#1b0b06" : "rgba(245,222,179,0.3)",
                    fontWeight:700,
                    cursor: hasAccessToTier(intake.requiredTier) ? "pointer" : "not-allowed",
                    fontSize:14
                  }}
                >
                  {hasAccessToTier(intake.requiredTier) ? "Start Assessment →" : "🔒 Upgrade to Access"}
                </button>
              </div>
            ))}
          </div>
        ) : (
            <div style={{padding:32,borderRadius:16,background:"linear-gradient(135deg, rgba(218,165,112,0.12), rgba(185,135,93,0.08))",border:"1px solid rgba(218,165,112,0.25)"}}>
              <h2 style={{fontSize:26,color:"var(--champagne)",marginBottom:20,fontWeight:700}}>{intakeTypes[selectedType].title}</h2>
              
              <form onSubmit={handleSubmit} style={{display:"grid",gap:20}}>
                {intakeTypes[selectedType].questions.map(q => (
                  <div key={q.id}>
                    <label style={{display:"block",color:"var(--rosegold)",fontSize:14,marginBottom:8,fontWeight:600}}>{q.label}</label>
                    
                    {q.type === "text" && (
                      <input
                        type="text"
                        value={formData[q.id] || ''}
                        onChange={(e) => setFormData({...formData, [q.id]: e.target.value})}
                        style={{width:"100%",padding:12,borderRadius:10,background:"rgba(245,222,179,0.06)",border:"1px solid rgba(245,222,179,0.15)",color:"var(--champagne)",fontSize:14}}
                      />
                    )}
                    
                    {q.type === "number" && (
                      <input
                        type="number"
                        value={formData[q.id] || ''}
                        onChange={(e) => setFormData({...formData, [q.id]: e.target.value})}
                        style={{width:"100%",padding:12,borderRadius:10,background:"rgba(245,222,179,0.06)",border:"1px solid rgba(245,222,179,0.15)",color:"var(--champagne)",fontSize:14}}
                      />
                    )}
                    
                    {q.type === "range" && (
                      <div>
                        <input
                          type="range"
                          min={q.min}
                          max={q.max}
                          value={formData[q.id] || 5}
                          onChange={(e) => setFormData({...formData, [q.id]: parseInt(e.target.value)})}
                          style={{width:"100%"}}
                        />
                        <div style={{textAlign:"center",color:"var(--rosegold)",fontSize:18,fontWeight:700,marginTop:8}}>{formData[q.id] || 5}</div>
                      </div>
                    )}
                    
                    {q.type === "select" && (
                      <select
                        value={formData[q.id] || ''}
                        onChange={(e) => setFormData({...formData, [q.id]: e.target.value})}
                        style={{width:"100%",padding:12,borderRadius:10,background:"rgba(245,222,179,0.06)",border:"1px solid rgba(245,222,179,0.15)",color:"var(--champagne)",fontSize:14}}
                      >
                        <option value="">Choose...</option>
                        {q.options.map(opt => (
                          <option key={opt} value={opt} style={{background:"#2d1810"}}>{opt.replace(/_/g, ' ')}</option>
                        ))}
                      </select>
                    )}
                    
                    {q.type === "multi" && (
                      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))",gap:10}}>
                        {q.options.map(opt => (
                          <label key={opt} style={{display:"flex",alignItems:"center",gap:8,padding:10,borderRadius:8,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.1)",cursor:"pointer"}}>
                            <input
                              type="checkbox"
                              checked={(formData[q.id] || []).includes(opt)}
                              onChange={(e) => {
                                const current = formData[q.id] || [];
                                setFormData({
                                  ...formData,
                                  [q.id]: e.target.checked 
                                    ? [...current, opt]
                                    : current.filter(v => v !== opt)
                                });
                              }}
                              style={{accentColor:"var(--rosegold)"}}
                            />
                            <span style={{fontSize:13,color:"var(--champagne)"}}>{opt.replace(/_/g, ' ')}</span>
                          </label>
                        ))}
                      </div>
                    )}
                    
                    {q.type === "textarea" && (
                      <textarea
                        value={formData[q.id] || ''}
                        onChange={(e) => setFormData({...formData, [q.id]: e.target.value})}
                        rows={4}
                        style={{width:"100%",padding:12,borderRadius:10,background:"rgba(245,222,179,0.06)",border:"1px solid rgba(245,222,179,0.15)",color:"var(--champagne)",fontSize:14,resize:"vertical",fontFamily:"inherit"}}
                      />
                    )}
                  </div>
                ))}



                <div style={{display:"flex",gap:12,marginTop:20}}>
                  <button
                    type="button"
                    onClick={() => setSelectedType(null)}
                    style={{flex:1,padding:14,borderRadius:12,background:"rgba(245,222,179,0.04)",border:"1px solid rgba(245,222,179,0.15)",color:"var(--champagne)",fontWeight:600,cursor:"pointer"}}
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{flex:2,padding:14,borderRadius:12,background:"linear-gradient(90deg,var(--bronze),var(--rosegold))",border:0,color:"#1b0b06",fontWeight:700,cursor:submitting?"not-allowed":"pointer",fontSize:16}}
                  >
                    {submitting ? "Processing..." : "Submit & Get Recommendations"}
                  </button>
                </div>
              </form>
            </div>
        )}
      </div>
    </div>
  );
}