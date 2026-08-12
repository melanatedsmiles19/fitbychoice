import { useState, useEffect } from "react";
import { Home, Dumbbell, UtensilsCrossed, BookOpen, Activity, Search, ChevronRight, ChevronLeft, Check, Clock, AlertTriangle, Heart, Flame, Moon, Droplets, X, Menu, User, TrendingUp, TrendingDown, Minus, Star, Shield, Zap, Brain, Eye } from "lucide-react";

const C = {
  primary: "#2C6E6A", primaryLight: "#3A8A85", primaryPale: "#2C6E6A15",
  secondary: "#C5954A", secondaryLight: "#D4A85E", secondaryPale: "#C5954A15",
  sage: "#7BAF8A", sagePale: "#7BAF8A20",
  dark: "#1A2B2D", darkMuted: "#3A4F52",
  bg: "#F0F5F3", card: "#FFFFFF", sand: "#E8DFD0",
  text: "#1A2B2D", textMid: "#4A6365", textLight: "#7A9497",
  red: "#C0392B", redPale: "#C0392B15",
  green: "#27AE60", greenPale: "#27AE6015",
  yellowPale: "#F39C1215",
};

const font = { display: "'Fraunces', serif", body: "'DM Sans', sans-serif" };

// ─── DATA ───────────────────────────────────────────────────────────
const QUIZ = [
  { q: "What is your CKD stage?", opts: ["Stage 2", "Stage 3a", "Stage 3b", "Stage 4", "Not sure"], key: "stage" },
  { q: "Do you also have diabetes?", opts: ["Yes — Type 1", "Yes — Type 2", "No", "Pre-diabetic"], key: "diabetes" },
  { q: "What is your biological sex?", opts: ["Female", "Male"], key: "sex" },
  { q: "What is your age range?", opts: ["18–39", "40–54", "55–64", "65+"], key: "age" },
  { q: "Current activity level?", opts: ["Sedentary (little to no exercise)", "Light (walks, light chores)", "Moderate (some regular activity)", "Active (exercise 3+ times/week)"], key: "activity" },
  { q: "Any injuries or limitations?", opts: ["Knee issues", "Back pain", "Shoulder problems", "Balance concerns", "None of these"], key: "injuries", multi: true },
  { q: "What matters most to you?", opts: ["Slow my CKD progression", "Build strength & muscle tone", "Lose body fat", "Have more energy", "All of the above"], key: "goal" },
];

const WORKOUTS = {
  warmup: [
    { name: "Marching in Place", duration: "60 sec", cue: "Lift knees to comfortable height. Swing arms naturally. Breathe steadily." },
    { name: "Shoulder Rolls", duration: "30 sec", cue: "Roll forward 5 times, backward 5 times. Relax your neck." },
    { name: "Arm Circles", duration: "30 sec", cue: "Small circles forward 10 times, backward 10 times. Keep shoulders down." },
    { name: "Hip Circles", duration: "30 sec each side", cue: "Hands on hips, circle slowly. This loosens your lower back and hips." },
    { name: "Ankle Rolls", duration: "20 sec each", cue: "Hold a chair for balance. Circle each ankle both directions." },
  ],
  cooldown: [
    { name: "Standing Quad Stretch", duration: "30 sec each", cue: "Hold chair for balance. Pull heel toward glute gently. Keep knees together." },
    { name: "Chest Opener Stretch", duration: "30 sec", cue: "Clasp hands behind back, lift chest, squeeze shoulder blades. Breathe deeply." },
    { name: "Seated Hamstring Stretch", duration: "30 sec each", cue: "Sit on chair edge, extend one leg straight, hinge forward from hips." },
    { name: "Neck Stretches", duration: "20 sec each side", cue: "Tilt ear to shoulder gently. No forcing. Let gravity do the work." },
    { name: "Deep Breathing", duration: "60 sec", cue: "Inhale 4 counts through nose, hold 4, exhale 6 counts through mouth. Repeat 5 times." },
  ],
  days: [
    {
      name: "Upper Body Strength", day: "Monday", phase: "Foundation", week: 1,
      duration: "30 min", equipment: "3 lb dumbbells",
      exercises: [
        { name: "Seated Bicep Curls", sets: 3, reps: 12, breath: "Exhale as you curl up, inhale as you lower.", notes: "Keep elbows pinned to your sides. Slow and controlled — 2 seconds up, 3 seconds down. If 12 feels easy, that's the point right now.", modification: "If shoulders fatigue, rest arms on thighs between sets." },
        { name: "Standing Shoulder Press", sets: 3, reps: 10, breath: "Exhale as you press overhead, inhale as you lower.", notes: "Start with dumbbells at shoulder height, palms forward. Press straight up, don't lock elbows at top.", modification: "Do seated if you feel lightheaded standing." },
        { name: "Bent-Over Rows", sets: 3, reps: 12, breath: "Exhale as you pull up, inhale as you lower.", notes: "Hinge at hips, flat back, pull dumbbells to ribcage. Squeeze shoulder blades together at top.", modification: "Use a chair to support one hand if back is uncomfortable." },
        { name: "Tricep Kickbacks", sets: 3, reps: 10, breath: "Exhale as you extend back, inhale as you bend.", notes: "Hinge forward, keep upper arm still. Only your forearm moves. Squeeze at the top for 1 second.", modification: "Do one arm at a time, support with chair." },
        { name: "Wall Push-Ups", sets: 3, reps: 10, breath: "Inhale as you lower to wall, exhale as you push away.", notes: "Hands shoulder-width on wall, body straight. The farther your feet from the wall, the harder it gets.", modification: "Stand closer to wall to make it easier." },
        { name: "Lateral Raises", sets: 2, reps: 10, breath: "Exhale as you raise arms, inhale as you lower.", notes: "Raise arms to shoulder height, slight bend in elbows. Lead with your elbows, not your hands.", modification: "Raise only to 45 degrees if shoulders are tight." },
      ],
    },
    {
      name: "Lower Body & Balance", day: "Wednesday", phase: "Foundation", week: 1,
      duration: "30 min", equipment: "Chair for balance, 3 lb dumbbells optional",
      exercises: [
        { name: "Chair-Assisted Squats", sets: 3, reps: 12, breath: "Inhale as you lower, exhale as you stand.", notes: "Stand in front of chair, feet hip-width. Lower until you lightly touch the seat, then stand. Don't plop down.", modification: "Place a pillow on the chair to reduce depth if knees are sensitive. Do NOT go past 90 degrees." },
        { name: "Standing Calf Raises", sets: 3, reps: 15, breath: "Exhale as you rise, inhale as you lower.", notes: "Hold chair back for balance. Rise onto toes, hold 1 second at top, lower slowly.", modification: "Do one leg at a time for more challenge, or both for stability." },
        { name: "Side Leg Raises", sets: 3, reps: 12, breath: "Exhale as you lift, inhale as you lower.", notes: "Hold chair, stand tall. Lift leg to side without leaning. Keep toes pointed forward, not up.", modification: "Reduce range of motion if hip is tight." },
        { name: "Standing Rear Leg Raises", sets: 3, reps: 12, breath: "Exhale as you lift back, inhale as you return.", notes: "Hold chair, lift leg straight behind you. Squeeze your glute at the top. Don't arch your lower back.", modification: "Smaller range of motion is fine. Focus on the squeeze." },
        { name: "Single-Leg Balance Hold", sets: 3, reps: "20 sec each", breath: "Breathe steadily throughout.", notes: "Stand on one leg, hold chair lightly. Try to use just fingertips, then one finger, then let go if stable.", modification: "Keep both hands on chair. Progress at your own pace. This is fall prevention — it matters." },
        { name: "Seated Knee Extensions", sets: 3, reps: 12, breath: "Exhale as you extend, inhale as you lower.", notes: "Sit on chair, extend one leg straight, hold 2 seconds, lower slowly. Feel your quad working above the knee.", modification: "Great for anyone with knee restrictions. Pain-free range only." },
      ],
    },
    {
      name: "Full Body & Core", day: "Friday", phase: "Foundation", week: 1,
      duration: "30 min", equipment: "3 lb dumbbells, chair",
      exercises: [
        { name: "Dumbbell Deadlift", sets: 3, reps: 10, breath: "Inhale as you hinge down, exhale as you stand.", notes: "Hold dumbbells in front of thighs. Push hips BACK (not down), slight knee bend. Feel hamstrings stretch. Stand tall, squeeze glutes.", modification: "Use chair in front for hand support if balance is a concern." },
        { name: "Standing Chest Press", sets: 3, reps: 12, breath: "Exhale as you press forward, inhale as you pull back.", notes: "Stand with staggered stance, press dumbbells forward from chest height. Squeeze chest at full extension.", modification: "Can also do against a wall for support." },
        { name: "Seated Core Twist", sets: 3, reps: 10, breath: "Exhale as you twist, inhale center.", notes: "Sit on chair edge, hold one dumbbell at chest. Rotate torso left, center, right. Feet flat. Move from your core, not your arms.", modification: "No weight needed — start with hands at chest." },
        { name: "Bird Dog (Chair-Assisted)", sets: 3, reps: 8, breath: "Exhale as you extend, inhale as you return.", notes: "Stand behind chair, hands on backrest. Extend right arm forward + left leg back simultaneously. Hold 3 seconds. Alternate.", modification: "Just extend the leg if arm extension feels unstable." },
        { name: "Standing Side Bends", sets: 3, reps: 10, breath: "Inhale as you bend, exhale as you return.", notes: "Hold one dumbbell, slide it down your thigh as you bend sideways. Feel the stretch on the opposite side. Don't lean forward.", modification: "No weight needed. Focus on the stretch and contraction." },
        { name: "Glute Bridge", sets: 3, reps: 12, breath: "Exhale as you lift, inhale as you lower.", notes: "Lie on back, knees bent, feet flat. Push through heels, lift hips until body is a straight line. Squeeze glutes 2 seconds at top.", modification: "Place feet on an elevated surface if getting to the floor is difficult. Can also do from a couch." },
      ],
    },
  ],
};

const MEALS_CKD = [
  [ // WEEK 1
    { day: "Monday", meals: [
      { type: "Breakfast", name: "Scrambled Egg with Sautéed Bell Peppers", recipe: ["Dice ½ cup bell peppers into small pieces.", "Heat 1 tsp olive oil in a nonstick pan over medium heat.", "Add bell peppers, cook 4-5 minutes until softened, stirring occasionally.", "Push peppers to one side. Crack 1 egg into the pan, add a pinch of garlic powder and black pepper.", "Scramble the egg with a spatula, mixing in the peppers as it cooks, about 2-3 minutes.", "Meanwhile, cook ½ cup white rice according to package directions.", "Plate the egg and peppers first, rice on the side. Eat protein and veggies before the rice."], items: "1 whole egg, ½ cup diced bell peppers, 1 tsp olive oil, garlic powder, black pepper. Finish with ½ cup white rice.", order: "Eat the egg and peppers first, rice last.", k: "low", p: "low", na: "low" },
      { type: "Lunch", name: "Grilled Chicken with Cauliflower & Pasta", recipe: ["Season 3 oz chicken breast with garlic powder, smoked paprika, and black pepper.", "Heat a grill pan or skillet with 1 tsp olive oil over medium-high heat.", "Grill chicken 5-6 minutes per side until internal temp reaches 165°F.", "While chicken cooks, cut 1 cup cauliflower into florets. Toss with olive oil, garlic powder, black pepper.", "Roast cauliflower at 400°F for 20 minutes, or sauté in a pan for 8-10 minutes until tender.", "Boil ½ cup white pasta according to package directions, drain.", "Let chicken rest 5 minutes, slice. Plate chicken and cauliflower first, pasta last."], items: "3 oz grilled chicken breast, 1 cup roasted cauliflower, ½ cup white pasta. Season with garlic, smoked paprika, olive oil.", order: "Eat chicken and cauliflower first, pasta last.", k: "low", p: "low", na: "low" },
      { type: "Dinner", name: "Baked Cod with Arugula Salad", recipe: ["Preheat oven to 400°F.", "Place 3 oz cod on a lined baking sheet. Drizzle with olive oil, squeeze fresh lemon over top.", "Bake 12-15 minutes until fish flakes easily with a fork.", "While fish bakes, toss 2 cups arugula with ½ sliced cucumber.", "Whisk together olive oil and lemon juice for a quick dressing, drizzle over salad.", "Steam ½ cup zucchini slices for 5 minutes until just tender.", "Plate the cod with salad and zucchini alongside."], items: "3 oz baked cod, 2 cups arugula, ½ cucumber sliced, lemon juice + olive oil dressing. Side of steamed zucchini.", order: "Protein and vegetables — no starch needed at dinner.", k: "low", p: "low", na: "low" },
    ]},
    { day: "Tuesday", meals: [
      { type: "Breakfast", name: "Homemade Turkey Patties with Onion Scramble", recipe: ["Mix 2 oz ground turkey with a pinch each of sage, thyme, garlic powder, and black pepper.", "Form into 2 small patties.", "Heat 1 tsp olive oil in a pan over medium heat. Cook patties 4-5 minutes per side until cooked through (165°F internal).", "Remove patties, set aside. In the same pan, add ½ cup sliced onions, sauté 5 minutes until soft.", "Push onions aside, crack in 1 egg white, scramble 2 minutes.", "Toast 1 slice white bread, spread with Tillamook cream cheese.", "Plate patties and onion scramble first, toast on the side."], items: "2 oz ground turkey formed into small patties with garlic powder, sage, thyme, black pepper. Cook in olive oil with ½ cup sautéed onions. 1 egg white. Side of white toast with Tillamook cream cheese.", order: "Eat the patties and onions first, toast last.", k: "low", p: "low", na: "low" },
      { type: "Lunch", name: "Chicken Stir-Fry with Green Beans & Rice", recipe: ["Cut 3 oz chicken thigh into bite-sized strips.", "Heat 1 tsp olive oil in a wok or large skillet over medium-high heat.", "Add chicken, cook 5-6 minutes until no longer pink, stirring frequently.", "Add 1 cup trimmed green beans, minced garlic, grated ginger, and black pepper.", "Stir-fry 4-5 minutes until green beans are bright green and tender-crisp.", "Cook ½ cup white rice separately according to package directions.", "Plate chicken and green beans first, rice last."], items: "3 oz chicken thigh, 1 cup green beans, ½ cup white rice. Cook in olive oil with garlic, ginger, black pepper.", order: "Eat chicken and green beans first, rice last.", k: "low", p: "low", na: "low" },
      { type: "Dinner", name: "Lemon Sole with Cabbage Slaw", recipe: ["Season 3 oz sole fillet with lemon and a pinch of black pepper.", "Heat 1 tsp olive oil in a nonstick pan over medium heat.", "Cook fish 3-4 minutes per side until it flakes easily.", "While fish cooks, shred 1.5 cups cabbage thinly.", "Toss cabbage with apple cider vinegar, a drizzle of olive oil, and fresh dill.", "Let slaw sit 5 minutes to soften slightly.", "Plate fish with slaw alongside."], items: "3 oz baked sole with lemon, 1.5 cups shredded cabbage with apple cider vinegar dressing, dill.", order: "Light dinner — all protein and vegetables.", k: "low", p: "low", na: "low" },
    ]},
    { day: "Wednesday", meals: [
      { type: "Breakfast", name: "Egg White Omelet with Herbs", recipe: ["Whisk 3 egg whites with a pinch of black pepper.", "Dice ½ cup zucchini into small cubes.", "Heat 1 tsp olive oil in a nonstick pan over medium heat, sauté zucchini 3-4 minutes until softened.", "Pour egg whites over zucchini, sprinkle with fresh basil and minced garlic.", "Cook 2-3 minutes until eggs set on the bottom, fold in half like an omelet.", "Cook 1 more minute until fully set.", "Serve with 1 slice white bread drizzled with olive oil."], items: "3 egg whites, ½ cup diced zucchini, fresh basil, garlic. Side of 1 slice white bread with olive oil drizzle.", order: "Eat the omelet first, bread last.", k: "low", p: "low", na: "low" },
      { type: "Lunch", name: "Seasoned Ground Turkey Lettuce Wraps", recipe: ["Heat 1 tsp olive oil in a skillet over medium heat.", "Add 3 oz ground turkey, cumin, paprika, and minced garlic.", "Cook 6-8 minutes, breaking up the meat, until fully cooked and browned.", "Wash and separate butter lettuce leaves into cups.", "Shred carrots and slice cucumber into thin strips.", "Cook ½ cup couscous according to package directions.", "Fill lettuce cups with turkey, top with carrots and cucumber. Serve couscous on the side."], items: "3 oz ground turkey with cumin, paprika, garlic. Wrapped in butter lettuce with shredded carrots, cucumber. Side of orzo.", order: "Eat the wraps first, couscous last.", k: "low", p: "low", na: "low" },
      { type: "Dinner", name: "Lemon Herb Sea Bass with Roasted Radishes", recipe: ["Preheat oven to 400°F.", "Quarter 1 cup radishes, toss with olive oil and black pepper. Roast 20-25 minutes until tender and caramelized.", "Season 3 oz sea bass with lemon, fresh thyme, and rosemary.", "Heat 1 tsp olive oil in a pan over medium heat, cook fish 3-4 minutes per side until it flakes easily.", "Toss 2 cups arugula with a squeeze of lemon and drizzle of olive oil.", "Plate fish with roasted radishes and arugula salad."], items: "3 oz sea bass with lemon, thyme, rosemary. 1 cup roasted radishes with olive oil. Side salad with arugula.", order: "All protein and vegetables — ideal evening meal.", k: "low", p: "low", na: "low" },
    ]},
    { day: "Thursday", meals: [
      { type: "Breakfast", name: "Savory Grits with Egg & Onions", recipe: ["Bring 1 cup water to a boil, whisk in ¼ cup grits.", "Reduce heat, simmer 5-7 minutes, stirring occasionally, until thick and creamy.", "Stir in ½ tsp olive oil and black pepper.", "Meanwhile, dice ¼ cup onion, sauté in 1 tsp olive oil over medium heat 4-5 minutes until soft.", "Push onions aside, crack in 1 egg, scramble with garlic powder 2-3 minutes.", "Spoon grits into a bowl, top with scrambled egg and onions."], items: "½ cup cooked grits with olive oil and black pepper. 1 scrambled egg with ¼ cup sautéed onions and garlic powder on top.", order: "Eat the egg and onions first, grits last.", k: "low", p: "low", na: "low" },
      { type: "Lunch", name: "Herb-Crusted Chicken with Rice & Green Beans", recipe: ["Season 3 oz chicken breast with oregano, thyme, and garlic powder, pressing herbs onto the surface.", "Heat 1 tsp olive oil in a skillet over medium heat.", "Cook chicken 6-7 minutes per side until internal temp reaches 165°F.", "Steam 1 cup green beans for 5-6 minutes until tender-crisp.", "Cook ½ cup white rice according to package directions, drizzle with olive oil.", "Let chicken rest 5 minutes, slice.", "Plate chicken and green beans first, rice last."], items: "3 oz chicken breast coated in oregano, thyme, garlic powder. 1 cup steamed green beans. ½ cup white rice.", order: "Eat chicken and green beans first, rice last.", k: "low", p: "low", na: "low" },
      { type: "Dinner", name: "Garlic Shrimp over Arugula", recipe: ["Pat 3 oz shrimp dry, season with black pepper and smoked paprika.", "Heat 1 tsp olive oil in a skillet over medium-high heat.", "Add minced garlic, cook 30 seconds until fragrant.", "Add shrimp, cook 2-3 minutes per side until pink and opaque.", "Toss 2 cups arugula with lemon juice and a drizzle of olive oil.", "Roast ½ cup cauliflower at 400°F for 15-20 minutes, or steam for 8 minutes.", "Plate shrimp over arugula with cauliflower alongside."], items: "3 oz shrimp sautéed in olive oil and fresh garlic. 2 cups arugula with lemon juice dressing. ½ cup roasted cauliflower.", order: "Protein and vegetables only — light evening meal.", k: "low", p: "low", na: "low" },
    ]},
    { day: "Friday", meals: [
      { type: "Breakfast", name: "Cream Cheese Toast with Berries", recipe: ["Toast 2 slices white bread until golden.", "Spread each slice with a thin layer of Tillamook cream cheese.", "Top with ½ cup fresh blueberries.", "Boil 1 egg for 8-10 minutes for a hard-boiled egg, then peel.", "Eat the egg first, then the toast and berries."], items: "2 slices white bread with thin spread of cream cheese (Tillamook or Organic Valley — no gums, no additives). ½ cup fresh blueberries on the side. 1 hard-boiled egg.", order: "Eat the egg first, then toast and berries.", k: "low", p: "low", na: "low" },
      { type: "Lunch", name: "Turkey Burger Patty with Roasted Vegetables", recipe: ["Mix 3 oz ground turkey with cumin, paprika, and minced garlic. Form into a patty.", "Heat 1 tsp olive oil in a skillet over medium heat, cook patty 5-6 minutes per side until 165°F internal.", "Toss 1 cup diced bell peppers and zucchini with olive oil, black pepper.", "Roast at 400°F for 20 minutes, or sauté 10 minutes until tender.", "Cook ½ cup couscous according to package directions.", "Plate patty and roasted vegetables first, couscous last."], items: "3 oz ground turkey patty seasoned with cumin, paprika, garlic. 1 cup roasted bell peppers and zucchini. Side of orzo.", order: "Eat the patty and roasted veggies first, couscous last.", k: "low", p: "low", na: "low" },
      { type: "Dinner", name: "Baked Sole with Cucumber Dill Salad", recipe: ["Preheat oven to 400°F.", "Place 3 oz sole on a lined baking sheet, drizzle with lemon, sprinkle fresh dill.", "Bake 10-12 minutes until fish flakes easily.", "Thinly slice 1 cup cucumber.", "Toss cucumber with olive oil, dill, and apple cider vinegar.", "Steam ½ cup cabbage for 5 minutes until tender.", "Plate fish with cucumber salad and steamed cabbage."], items: "3 oz baked cod with lemon and dill. 1 cup cucumber slices with olive oil, dill, and apple cider vinegar. Steamed cabbage.", order: "All protein and vegetables.", k: "low", p: "low", na: "low" },
    ]},
    { day: "Saturday", meals: [
      { type: "Breakfast", name: "Weekend Veggie Omelet", recipe: ["Whisk 2 egg whites with 1 whole egg and black pepper.", "Dice ½ cup bell peppers and ¼ cup onions.", "Heat 1 tsp olive oil in a nonstick pan, sauté peppers and onions 4-5 minutes until softened.", "Pour eggs over vegetables, sprinkle fresh basil.", "Cook 2-3 minutes until set on bottom, fold in half, cook 1 more minute.", "Toast 1 slice white bread with a drizzle of olive oil.", "Serve omelet with toast on the side."], items: "2 egg whites + 1 whole egg, ½ cup bell peppers, ¼ cup onions, fresh basil. Side of white toast with olive oil.", order: "Eat the omelet first, toast last.", k: "low", p: "low", na: "low" },
      { type: "Lunch", name: "Grilled Chicken Salad Bowl", recipe: ["Season 3 oz chicken breast with black pepper and garlic powder.", "Grill or pan-sear chicken 5-6 minutes per side until 165°F internal. Let rest, slice.", "Chop 2 cups romaine lettuce, dice cucumber.", "Whisk olive oil, lemon juice, garlic, and black pepper for dressing.", "Toss lettuce and cucumber with dressing.", "Top salad with sliced chicken and a few unsalted croutons (Premium Unsalted Tops or homemade)."], items: "3 oz grilled chicken over 2 cups chopped romaine, cucumber, homemade croutons (cube white bread, toss in olive oil and garlic powder, toast in pan 2 min). Olive oil, lemon juice, garlic dressing.", order: "Eat chicken and greens first, croutons last.", k: "low", p: "low", na: "low" },
      { type: "Dinner", name: "Sautéed Sole with Garlic Cabbage", recipe: ["Season 3 oz sole with smoked paprika and black pepper.", "Heat 1 tsp olive oil in a pan over medium heat, cook fish 3-4 minutes per side until flaky.", "Remove fish, set aside.", "In the same pan, add 1.5 cups sliced cabbage and minced garlic, sauté 6-8 minutes until tender.", "Add sliced onions halfway through cooking.", "Squeeze fresh lemon over the fish.", "Plate fish over the sautéed cabbage."], items: "3 oz sole in olive oil with garlic and paprika. 1.5 cups sautéed cabbage with onions. Lemon wedge.", order: "Light, clean, kidney-friendly dinner.", k: "low", p: "low", na: "low" },
    ]},
    { day: "Sunday", meals: [
      { type: "Breakfast", name: "Apple Cinnamon Rice Bowl", recipe: ["Cook ½ cup white rice according to package directions.", "Dice ½ apple into small pieces.", "Stir apple and a sprinkle of cinnamon into the warm rice.", "Drizzle with a small amount of olive oil, stir to combine.", "Boil 1 egg for 8-10 minutes, peel.", "Eat the egg first, then the rice bowl."], items: "½ cup white rice, ½ diced apple, cinnamon, drizzle of olive oil. 1 hard-boiled egg on the side.", order: "Eat the egg first, then the rice bowl.", k: "low", p: "low", na: "low" },
      { type: "Lunch", name: "Chicken & Veggie Stir-Fry", recipe: ["Cut 3 oz chicken breast into strips.", "Heat 1 tsp olive oil in a wok over medium-high heat, cook chicken 5-6 minutes until done.", "Add 1 cup shredded cabbage, ½ cup green beans, ¼ cup shredded carrots, minced garlic and ginger.", "Stir-fry 5-6 minutes until vegetables are tender-crisp.", "Season with black pepper.", "Cook ½ cup white rice separately.", "Plate chicken and vegetables first, rice last."], items: "3 oz chicken with 1 cup cabbage, ½ cup green beans, ¼ cup carrots. Olive oil, garlic, ginger. Side of white rice.", order: "Eat chicken and vegetables first, rice last.", k: "low", p: "low", na: "low" },
      { type: "Dinner", name: "Simple Baked Fish with Steamed Veggies", recipe: ["Preheat oven to 400°F.", "Place 3 oz cod on a lined baking sheet, drizzle with lemon and fresh herbs.", "Bake 12-15 minutes until fish flakes easily.", "Steam 1 cup cauliflower and green beans together for 6-8 minutes until tender.", "Drizzle vegetables with olive oil.", "Plate fish with steamed vegetables alongside."], items: "3 oz cod baked with lemon and herbs. 1 cup steamed cauliflower and green beans. Olive oil drizzle.", order: "Rest day dinner — keep it simple.", k: "low", p: "low", na: "low" },
    ]},
  ],
  [ // WEEK 2
    { day: "Monday", meals: [
      { type: "Breakfast", name: "Blueberry Cinnamon Oatmeal with Egg", items: "½ cup cooked plain oatmeal (not instant) with ½ cup blueberries, cinnamon. 1 hard-boiled egg on the side. Note: oatmeal 1-2x per week max if phosphorus labs are stable.", order: "Eat the egg first, then the oatmeal.", k: "low", p: "mod", na: "low" },
      { type: "Lunch", name: "Lemon Pepper Chicken with Cauliflower Mash", items: "3 oz chicken breast with lemon, black pepper, thyme. 1 cup cauliflower mashed with olive oil. Side of orzo.", order: "Eat chicken and cauliflower first, couscous last.", k: "low", p: "low", na: "low" },
      { type: "Dinner", name: "Pan-Seared Sole with Cabbage Slaw", items: "3 oz sole pan-seared in olive oil with dill. 1.5 cups cabbage slaw with apple cider vinegar and black pepper.", order: "Light fish and vegetable dinner.", k: "low", p: "low", na: "low" },
    ]},
    { day: "Tuesday", meals: [
      { type: "Breakfast", name: "Blueberry Rice Bowl with Egg", items: "½ cup white rice, ½ cup blueberries, cinnamon, drizzle of olive oil. 1 hard-boiled egg.", order: "Eat the egg first, then the rice bowl.", k: "low", p: "low", na: "low" },
      { type: "Lunch", name: "Turkey Meatballs with Zucchini & Pasta", items: "3 oz ground turkey meatballs with garlic, oregano, parsley. 1 cup sautéed zucchini. Side of white pasta.", order: "Eat meatballs and zucchini first, pasta last.", k: "low", p: "low", na: "low" },
      { type: "Dinner", name: "Ginger Chicken & Cabbage Bowl", items: "3 oz chicken breast sliced thin with fresh ginger, garlic, black pepper. 1.5 cups sautéed cabbage and onions in olive oil.", order: "Protein and vegetables — warm and satisfying.", k: "low", p: "low", na: "low" },
    ]},
    { day: "Wednesday", meals: [
      { type: "Breakfast", name: "Cucumber Cream Cheese Toast", items: "2 slices white bread with cream cheese (Tillamook or Organic Valley) and sliced cucumber. Dill and black pepper. 1 egg white on the side.", order: "Eat the egg white first, toast second.", k: "low", p: "low", na: "low" },
      { type: "Lunch", name: "Turmeric Chicken with Cauliflower & Rice", items: "3 oz chicken with turmeric, cumin, garlic, olive oil. 1 cup roasted cauliflower. ½ cup white rice.", order: "Eat chicken and cauliflower first, rice last.", k: "low", p: "low", na: "low" },
      { type: "Dinner", name: "Baked Mahi Mahi with Roasted Radishes", items: "3 oz mahi mahi with lemon and rosemary. 1 cup roasted radishes with olive oil. Side of arugula.", order: "Protein and vegetables — light and clean.", k: "low", p: "low", na: "low" },
    ]},
    { day: "Thursday", meals: [
      { type: "Breakfast", name: "Egg & Bell Pepper Wrap", items: "1 whole egg + 1 egg white with ½ cup bell peppers and onion in a small white flour tortilla (Rise & Puff or Tortillaland — 4-5 ingredients only).", order: "Protein and veggies wrapped with the carb — eat slowly.", k: "low", p: "low", na: "low" },
      { type: "Lunch", name: "Ground Turkey Taco Bowl", items: "3 oz ground turkey with cumin, chili powder, garlic over shredded lettuce, cucumber. Side of white rice.", order: "Eat turkey and vegetables first, rice last.", k: "low", p: "low", na: "low" },
      { type: "Dinner", name: "Sea Bass with Steamed Green Beans", items: "3 oz sea bass baked with lemon, thyme, garlic. 1 cup steamed green beans with olive oil.", order: "Simple protein and vegetables.", k: "low", p: "low", na: "low" },
    ]},
    { day: "Friday", meals: [
      { type: "Breakfast", name: "Pineapple Cream Cheese Toast", items: "2 slices white toast with cream cheese (Tillamook or Organic Valley) and ¼ cup diced pineapple. 1 hard-boiled egg.", order: "Eat the egg first, toast second.", k: "low", p: "low", na: "low" },
      { type: "Lunch", name: "Rosemary Chicken with Cauliflower & Rice", items: "3 oz chicken with rosemary, garlic, olive oil. 1 cup roasted cauliflower. ½ cup white rice.", order: "Eat chicken and cauliflower first, rice last.", k: "low", p: "low", na: "low" },
      { type: "Dinner", name: "Garlic Ginger Steak over Rice", items: "3 oz flank steak or sirloin sliced thin against the grain. Sear 60-90 seconds per side in olive oil. Same pan: fresh garlic, grated ginger, 1 cup green beans, black pepper, splash of rice vinegar, smoked paprika. Serve over ½ cup white rice. Red meat 1x per week max.", order: "Eat the steak and green beans first, rice last.", k: "low", p: "mod", na: "low" },
    ]},
    { day: "Saturday", meals: [
      { type: "Breakfast", name: "Weekend Herb Scramble", items: "2 egg whites + 1 egg with fresh basil, parsley, diced onion. White toast with olive oil.", order: "Eat the scramble first, toast last.", k: "low", p: "low", na: "low" },
      { type: "Lunch", name: "Fish Tacos (Kidney-Safe)", items: "3 oz baked cod in clean tortillas (Rise & Puff or Tortillaland) with shredded cabbage, cucumber, lime. No cheese.", order: "Fish and cabbage first, tortilla is the carb.", k: "low", p: "low", na: "low" },
      { type: "Dinner", name: "Turkey Patty with Roasted Zucchini", items: "3 oz ground turkey patty with oregano, garlic. 1.5 cups roasted zucchini with olive oil.", order: "Protein and vegetables.", k: "low", p: "low", na: "low" },
    ]},
    { day: "Sunday", meals: [
      { type: "Breakfast", name: "Cinnamon Apple Bowl", items: "½ diced apple with cinnamon over ½ cup white rice. 1 hard-boiled egg.", order: "Eat the egg first, then the bowl.", k: "low", p: "low", na: "low" },
      { type: "Lunch", name: "Roasted Chicken with Green Beans & Rice", items: "3 oz chicken thigh (skin removed) with thyme and garlic. 1 cup green beans. ½ cup white rice.", order: "Eat chicken and green beans first, rice last.", k: "low", p: "low", na: "low" },
      { type: "Dinner", name: "Cauliflower & Chicken Soup", items: "2 oz shredded chicken in homemade broth with cauliflower, carrots, onion, garlic, thyme. No canned broth.", order: "All-in-one nourishment.", k: "low", p: "low", na: "low" },
    ]},
  ],
  [ // WEEK 3
    { day: "Monday", meals: [
      { type: "Breakfast", name: "Dill Egg White Omelet", items: "3 egg whites with ½ cup cucumber, fresh dill, black pepper. Side of white toast.", order: "Eat the omelet first, toast last.", k: "low", p: "low", na: "low" },
      { type: "Lunch", name: "Cajun Chicken with Bell Peppers & Rice", items: "3 oz chicken with smoked paprika, garlic, oregano, cayenne. 1 cup roasted bell peppers. ½ cup white rice.", order: "Eat chicken and peppers first, rice last.", k: "low", p: "low", na: "low" },
      { type: "Dinner", name: "Lemon Garlic Sea Bass with Cabbage", items: "3 oz sea bass with garlic, lemon, parsley. 1.5 cups steamed cabbage with olive oil.", order: "Light protein and vegetable dinner.", k: "low", p: "low", na: "low" },
    ]},
    { day: "Tuesday", meals: [
      { type: "Breakfast", name: "Strawberry Cream Cheese Toast", items: "2 slices white bread with cream cheese (Tillamook or Organic Valley) and 3-4 sliced strawberries. 1 hard-boiled egg.", order: "Eat the egg first, then toast.", k: "low", p: "low", na: "low" },
      { type: "Lunch", name: "Turkey & Vegetable Stir-Fry", items: "3 oz turkey strips with 1 cup cabbage, ½ cup green beans, garlic, ginger. Side of couscous.", order: "Eat turkey and vegetables first, couscous last.", k: "low", p: "low", na: "low" },
      { type: "Dinner", name: "Baked Cod with Radish & Arugula Salad", items: "3 oz cod with dill and lemon. 1.5 cups arugula with roasted radishes, olive oil dressing.", order: "All protein and vegetables.", k: "low", p: "low", na: "low" },
    ]},
    { day: "Wednesday", meals: [
      { type: "Breakfast", name: "Garlic Herb Scrambled Eggs", items: "1 whole egg + 2 egg whites with garlic powder, basil, parsley. Side of white toast.", order: "Eat the eggs first, toast last.", k: "low", p: "low", na: "low" },
      { type: "Lunch", name: "Chicken Bowl with Cauliflower Rice", items: "3 oz grilled chicken over 1 cup riced cauliflower, cucumber, carrots. Olive oil and lemon. Side of crackers (Premium Unsalted Tops or Lundberg Thin Stackers).", order: "Eat chicken and cauliflower first, crackers last.", k: "low", p: "low", na: "low" },
      { type: "Dinner", name: "Shrimp with Zucchini & Onion Sauté", items: "3 oz shrimp in olive oil with 1 cup zucchini, ½ cup onions, garlic, Italian herbs.", order: "Pure protein and vegetables.", k: "low", p: "low", na: "low" },
    ]},
    { day: "Thursday", meals: [
      { type: "Breakfast", name: "Apple Slices with Cream Cheese & Egg", items: "½ apple sliced with cream cheese (Tillamook or Organic Valley). 2 egg whites scrambled with black pepper.", order: "Eat the egg whites first, apple second.", k: "low", p: "low", na: "low" },
      { type: "Lunch", name: "Herb-Crusted Fish with Green Beans & Pasta", items: "3 oz cod with oregano, thyme, garlic. 1 cup green beans. ½ cup white pasta.", order: "Eat fish and green beans first, pasta last.", k: "low", p: "low", na: "low" },
      { type: "Dinner", name: "Turkey Lettuce Wraps", items: "3 oz ground turkey with cumin, garlic in butter lettuce cups. Diced cucumber and cilantro.", order: "No starch — clean and light.", k: "low", p: "low", na: "low" },
    ]},
    { day: "Friday", meals: [
      { type: "Breakfast", name: "Bell Pepper & Onion Egg Scramble", items: "1 whole egg + 1 egg white with ½ cup bell peppers, ¼ cup onions, paprika. White toast.", order: "Eat the scramble first, toast last.", k: "low", p: "low", na: "low" },
      { type: "Lunch", name: "Chicken & Cabbage Stir-Fry", items: "3 oz chicken with 1 cup cabbage, garlic, ginger, black pepper, olive oil. ½ cup white rice.", order: "Eat chicken and cabbage first, rice last.", k: "low", p: "low", na: "low" },
      { type: "Dinner", name: "Herb Chicken with Roasted Cauliflower", items: "3 oz chicken breast with rosemary, thyme, garlic. 1 cup roasted cauliflower with olive oil. Side of steamed green beans.", order: "Protein and vegetables — satisfying and clean.", k: "low", p: "low", na: "low" },
    ]},
    { day: "Saturday", meals: [
      { type: "Breakfast", name: "Creamy Grits with Sautéed Peppers & Egg", items: "½ cup cooked grits with 1 tsp olive oil. Topped with ½ cup sautéed bell peppers and 1 scrambled egg. Black pepper and garlic powder.", order: "Eat the egg and peppers first, grits last.", k: "low", p: "low", na: "low" },
      { type: "Lunch", name: "Ground Turkey with Roasted Cauliflower", items: "3 oz ground turkey with smoked paprika, garlic, cumin. 1 cup roasted cauliflower. ½ cup couscous.", order: "Eat turkey and cauliflower first, couscous last.", k: "low", p: "low", na: "low" },
      { type: "Dinner", name: "Mahi Mahi with Cabbage & Carrot Slaw", items: "3 oz baked mahi mahi with herbs. 1.5 cups cabbage and carrot slaw with apple cider vinegar.", order: "Protein and vegetables.", k: "low", p: "low", na: "low" },
    ]},
    { day: "Sunday", meals: [
      { type: "Breakfast", name: "Rice Porridge with Apple", items: "½ cup white rice cooked soft, cinnamon, ½ diced apple. 1 hard-boiled egg.", order: "Eat the egg first, porridge second.", k: "low", p: "low", na: "low" },
      { type: "Lunch", name: "Roasted Chicken with Radishes & Green Beans", items: "3 oz chicken with rosemary. 1 cup roasted radishes, ½ cup green beans. Olive oil.", order: "Eat chicken and vegetables — no starch needed.", k: "low", p: "low", na: "low" },
      { type: "Dinner", name: "Light Fish & Vegetable Soup", items: "3 oz cod in homemade broth with cauliflower, green beans, onion, garlic, thyme.", order: "All-in-one nourishing bowl.", k: "low", p: "low", na: "low" },
    ]},
  ],
  [ // WEEK 4
    { day: "Monday", meals: [
      { type: "Breakfast", name: "Fresh Basil Scrambled Eggs", items: "1 whole egg + 2 egg whites with fresh basil, garlic powder. Side of white toast with olive oil.", order: "Eat the eggs first, toast last.", k: "low", p: "low", na: "low" },
      { type: "Lunch", name: "Smoked Paprika Chicken with Bell Peppers", items: "3 oz chicken with smoked paprika, garlic. 1 cup roasted bell peppers. ½ cup couscous.", order: "Eat chicken and peppers first, couscous last.", k: "low", p: "low", na: "low" },
      { type: "Dinner", name: "Halibut with Cucumber Dill Salad", items: "3 oz baked halibut with dill and lemon. 1 cup cucumber, arugula, radish salad.", order: "Light protein and fresh vegetables.", k: "low", p: "low", na: "low" },
    ]},
    { day: "Tuesday", meals: [
      { type: "Breakfast", name: "Homemade Turkey Patties & Egg Scramble", items: "2 oz ground turkey formed into patties with garlic powder, sage, thyme, black pepper. Cook in olive oil. 1 egg white, sautéed onions. White toast.", order: "Eat the patties and egg first, toast last.", k: "low", p: "low", na: "low" },
      { type: "Lunch", name: "Italian Herb Chicken with Green Beans", items: "3 oz chicken with basil, oregano, garlic. 1 cup green beans. ½ cup white pasta with olive oil.", order: "Eat chicken and green beans first, pasta last.", k: "low", p: "low", na: "low" },
      { type: "Dinner", name: "Wild Trout with Roasted Zucchini & Garlic", items: "3 oz wild trout with garlic, thyme, lemon. 1.5 cups roasted zucchini with olive oil.", order: "All protein and vegetables.", k: "low", p: "low", na: "low" },
    ]},
    { day: "Wednesday", meals: [
      { type: "Breakfast", name: "Pineapple Cream Cheese Toast", items: "2 slices white bread with cream cheese (Tillamook or Organic Valley) and ¼ cup diced pineapple. 1 hard-boiled egg.", order: "Eat the egg first, toast second.", k: "low", p: "low", na: "low" },
      { type: "Lunch", name: "Turkey Meatloaf Bites with Cauliflower", items: "3 oz ground turkey mini loaf bites with garlic, parsley, oregano. 1 cup cauliflower. ½ cup white rice.", order: "Eat turkey and cauliflower first, rice last.", k: "low", p: "low", na: "low" },
      { type: "Dinner", name: "Stuffed Bell Peppers (CKD-Safe)", items: "2 bell peppers stuffed with 3 oz seasoned ground turkey, white rice, diced onion, garlic, cumin, smoked paprika. No cheese. Bake 25 min.", order: "All-in-one meal — protein, veggie, and starch together.", k: "low", p: "low", na: "low" },
    ]},
    { day: "Thursday", meals: [
      { type: "Breakfast", name: "Apple Cinnamon Oatmeal with Egg", items: "½ cup cooked plain oatmeal (not instant) with ½ diced apple, cinnamon, drizzle of olive oil. 1 hard-boiled egg on the side. Note: oatmeal 1-2x per week max if phosphorus labs are stable.", order: "Eat the egg first, then the oatmeal.", k: "low", p: "mod", na: "low" },
      { type: "Lunch", name: "Cajun Chicken with Cabbage & Couscous", items: "3 oz chicken with smoked paprika, oregano, cayenne, garlic. 1 cup sautéed cabbage. ½ cup couscous.", order: "Eat chicken and cabbage first, couscous last.", k: "low", p: "low", na: "low" },
      { type: "Dinner", name: "Egg White Vegetable Frittata", items: "4 egg whites with ½ cup bell peppers, ¼ cup onions, zucchini, fresh basil, black pepper. Cook in olive oil. Side of arugula salad.", order: "Light protein-packed dinner — no starch needed.", k: "low", p: "low", na: "low" },
    ]},
    { day: "Friday", meals: [
      { type: "Breakfast", name: "Blueberry Breakfast Bowl", items: "½ cup white rice with ½ cup blueberries, cinnamon, olive oil. 1 hard-boiled egg.", order: "Eat the egg first, then the bowl.", k: "low", p: "low", na: "low" },
      { type: "Lunch", name: "Chicken Stir-Fry with Bell Peppers", items: "3 oz chicken with 1 cup bell peppers, ½ cup onions, garlic, ginger. ½ cup white rice.", order: "Eat chicken and peppers first, rice last.", k: "low", p: "low", na: "low" },
      { type: "Dinner", name: "Lemon Pepper Chicken with Roasted Radishes", items: "3 oz chicken breast with lemon, black pepper, oregano. 1 cup roasted radishes, ½ cup steamed green beans. Olive oil drizzle.", order: "End the week light and clean.", k: "low", p: "low", na: "low" },
    ]},
    { day: "Saturday", meals: [
      { type: "Breakfast", name: "Weekend Zucchini Herb Omelet", items: "2 egg whites + 1 egg with ½ cup zucchini, fresh basil, oregano, garlic. White toast.", order: "Eat the omelet first, toast last.", k: "low", p: "low", na: "low" },
      { type: "Lunch", name: "Turkey & Cauliflower Bowl", items: "3 oz ground turkey with garlic herb seasoning. 1 cup roasted cauliflower, ½ cup white rice, olive oil.", order: "Eat turkey and cauliflower first, rice last.", k: "low", p: "low", na: "low" },
      { type: "Dinner", name: "Simple Sea Bass with Cabbage & Lemon", items: "3 oz sea bass with lemon and dill. 1.5 cups steamed cabbage with olive oil and black pepper.", order: "Clean, simple, kidney-safe.", k: "low", p: "low", na: "low" },
    ]},
    { day: "Sunday", meals: [
      { type: "Breakfast", name: "Apple Cinnamon Rice with Egg", items: "½ cup white rice, ½ diced apple, cinnamon, olive oil. 1 hard-boiled egg.", order: "Eat the egg first, rice bowl second.", k: "low", p: "low", na: "low" },
      { type: "Lunch", name: "Herb Roasted Chicken with Green Beans", items: "3 oz chicken with rosemary, thyme, garlic. 1 cup green beans. ½ cup white rice.", order: "Eat chicken and green beans first, rice last.", k: "low", p: "low", na: "low" },
      { type: "Dinner", name: "Chicken & Vegetable Soup", items: "2 oz shredded chicken in homemade broth with cauliflower, green beans, carrots, onion, garlic, bay leaf.", order: "All-in-one Sunday comfort.", k: "low", p: "low", na: "low" },
    ]},
  ],
];

const FOODS = [
  { name: "Apple", k: "low", p: "low", safe: true, note: "One of the best fruits for CKD. 1 small apple or ½ medium per day." },
  { name: "Arugula", k: "low", p: "low", safe: true, note: "Great salad base" },
  { name: "Avocado", k: "high", p: "mod", safe: false, note: "Very high potassium — avoid" },
  { name: "Banana", k: "high", p: "low", safe: false, note: "High potassium — avoid" },
  { name: "Bell Pepper", k: "low", p: "low", safe: true, note: "Excellent choice — high in vitamin C" },
  { name: "Blueberries", k: "low", p: "low", safe: true, note: "Antioxidant-rich, kidney-friendly. Up to 1 cup per day." },
  { name: "Broccoli", k: "mod", p: "mod", safe: "limit", note: "Moderate potassium — small portions OK" },
  { name: "Brown Rice", k: "mod", p: "high", safe: false, note: "Use white rice instead — lower phosphorus" },
  { name: "Cabbage", k: "low", p: "low", safe: true, note: "Versatile and kidney-safe" },
  { name: "Cauliflower", k: "low", p: "low", safe: true, note: "Great substitute for potatoes" },
  { name: "Cheese (hard)", k: "low", p: "high", safe: false, note: "High phosphorus — avoid most cheeses" },
  { name: "Chicken Breast", k: "low", p: "mod", safe: true, note: "Good protein source — keep to 3-4 oz" },
  { name: "Cherries", k: "mod", p: "low", safe: "limit", note: "Moderate potassium — 10-15 per sitting max. Do not eat by the bowl. Not a daily fruit." },
  { name: "Coconut Water", k: "high", p: "mod", safe: false, note: "One 330ml Vita Coco has 646mg potassium, 100mg sodium, 33mg phosphorus. More potassium than a banana. Avoid." },
  { name: "Crab Legs (King)", k: "low", p: "mod", safe: "limit", note: "OK occasionally — steamed, no butter, lemon and olive oil instead. 3 oz max. Account for phosphorus." },
  { name: "Lobster", k: "low", p: "mod", safe: "limit", note: "OK occasionally — steamed, no butter, lemon and olive oil instead. 3 oz max. Account for phosphorus." },
  { name: "Red Meat (Beef)", k: "mod", p: "mod", safe: "limit", note: "3 oz once a week max. Not your primary protein. Increases gout risk. Never processed (no deli, bacon, hot dogs)." },
  { name: "Cod", k: "low", p: "low", safe: true, note: "Excellent low-phosphorus protein" },
  { name: "Cola (dark)", k: "low", p: "high", safe: false, note: "Phosphoric acid — damages kidneys" },
  { name: "Cranberry Juice", k: "low", p: "low", safe: true, note: "Unsweetened only — good for urinary health. Up to 8 oz per day." },
  { name: "Cream Cheese", k: "low", p: "low", safe: true, note: "Lower phosphorus than most dairy" },
  { name: "Cream of Wheat", k: "low", p: "low", safe: true, note: "Lower phosphorus than oatmeal. Good warm breakfast option for CKD." },
  { name: "Cucumber", k: "low", p: "low", safe: true, note: "Hydrating and safe" },
  { name: "Egg (whole)", k: "low", p: "mod", safe: true, note: "Limit to 1 per day — yolk has phosphorus" },
  { name: "Egg Whites", k: "low", p: "low", safe: true, note: "Pure protein, very kidney-friendly" },
  { name: "Energy Drink", k: "varies", p: "mod", safe: false, note: "Dangerous — caffeine, sugar, additives" },
  { name: "Garlic", k: "low", p: "low", safe: true, note: "Flavor powerhouse — use freely" },
  { name: "Grits", k: "low", p: "low", safe: true, note: "Lower phosphorus than oatmeal. CKD-friendlier hot breakfast. Season with olive oil and black pepper." },
  { name: "Grapes", k: "mod", p: "low", safe: "limit", note: "Moderate potassium. Limit to 15-20 grapes (½ cup) per sitting." },
  { name: "Green Beans", k: "low", p: "low", safe: true, note: "One of the safest vegetables for CKD" },
  { name: "Milk (cow's)", k: "high", p: "high", safe: false, note: "High in both potassium and phosphorus" },
  { name: "Oatmeal", k: "mod", p: "high", safe: "limit", note: "½ cup cooked max, 1-2x per week only IF phosphorus labs are stable. Plain only — no instant packets. Cream of Wheat or rice porridge are safer daily options." },
  { name: "Olive Oil", k: "low", p: "low", safe: true, note: "Healthy fat — use as primary cooking oil" },
  { name: "Onion", k: "low", p: "low", safe: true, note: "Adds great flavor without sodium" },
  { name: "Orange", k: "high", p: "low", safe: false, note: "High potassium — avoid" },
  { name: "Pasta (white)", k: "low", p: "low", safe: true, note: "Better than whole wheat for CKD" },
  { name: "Pineapple", k: "low", p: "low", safe: true, note: "Safe tropical fruit option. Up to ½ cup per day." },
  { name: "Potato", k: "high", p: "mod", safe: false, note: "High potassium — avoid or double-leach" },
  { name: "Radishes", k: "low", p: "low", safe: true, note: "Roast them as a potato substitute" },
  { name: "Rice (white)", k: "low", p: "low", safe: true, note: "Safe kidney-friendly starch" },
  { name: "Rye Bread", k: "mod", p: "mod", safe: "limit", note: "OK occasionally if labs are stable. Check label for sodium and additives. White bread is the safer daily choice." },
  { name: "Salmon", k: "mod", p: "mod", safe: "limit", note: "Good omega-3s but moderate portions only" },
  { name: "Spinach", k: "high", p: "mod", safe: false, note: "Very high potassium — use arugula instead" },
  { name: "Strawberries", k: "low", p: "low", safe: true, note: "Safe and antioxidant-rich. Up to 1 cup (about 8 medium) per day." },
  { name: "Sweet Potato", k: "high", p: "mod", safe: false, note: "High potassium — avoid" },
  { name: "Sole", k: "low", p: "low", safe: true, note: "Excellent kidney-friendly fish — wild-caught preferred" },
  { name: "Starfruit", k: "high", p: "mod", safe: false, note: "TOXIC — contains caramboxin neurotoxin. A single fruit can cause seizures, coma, death in CKD. NEVER eat. ER immediately if consumed." },
  { name: "Rhubarb", k: "mod", p: "low", safe: false, note: "TOXIC — extremely high oxalate causes direct kidney tissue damage. Avoid entirely." },
  { name: "Noni Juice", k: "high", p: "mod", safe: false, note: "TOXIC — high potassium plus direct liver/kidney toxicity reports. Avoid entirely." },
  { name: "Tomato", k: "high", p: "low", safe: false, note: "High potassium — avoid sauces and ketchup" },
  { name: "Turkey", k: "low", p: "mod", safe: true, note: "Good protein — keep to 3-4 oz portions" },
    { name: "Schmidt Baking White Bread", k: "low", p: "low", safe: true, note: "No phosphate additives, no potassium chloride. Acceptable everyday choice. Always verify current sodium per slice." },
  { name: "National Giant Hardo Bread", k: "low", p: "mod", safe: "limit", note: "330mg sodium PER SLICE - nearly double target. Two slices for a sandwich uses a third of your daily limit. Choose a lower-sodium bread instead." },
  { name: "Potato Bread", k: "mod", p: "mod", safe: "limit", note: "Moderate potassium baked into the flour, typically 200-230mg sodium per slice. Not a clear upgrade over plain white - check label carefully." },
  { name: "Nature's Own White Bread", k: "low", p: "low", safe: true, note: "Check for phosphate-free formula. Generally 150-190mg sodium per slice - good option." },
  { name: "Pepperidge Farm White Bread", k: "low", p: "low", safe: true, note: "Clean ingredient list, no phosphate additives. Good daily choice." },
  { name: "Wonder Bread Classic White", k: "low", p: "low", safe: true, note: "Surprisingly clean ingredient list. Moderate sodium - check current label." },
  { name: "White Bread", k: "low", p: "low", safe: true, note: "Better than whole grain for CKD" },
  { name: "Whole Wheat Bread", k: "mod", p: "high", safe: false, note: "High phosphorus — use white instead" },
  { name: "Yogurt", k: "mod", p: "high", safe: false, note: "High phosphorus — limit or avoid" },
    { name: "Asparagus", k: "mod", p: "low", safe: true, note: "6 spears is a safe serving. Low phosphorus, poorly absorbed. One of the better vegetable choices." },
  { name: "Basmati Rice", k: "low", p: "low", safe: true, note: "Safe white rice variety. Same as jasmine and regular white rice." },
  { name: "Jasmine Rice", k: "low", p: "low", safe: true, note: "Safe white rice variety. Same as basmati and regular white rice." },
  { name: "Brown Rice", k: "mod", p: "high", safe: false, note: "Bran layer doubles phosphorus vs white rice. Use white, jasmine, or basmati instead." },
  { name: "Mushrooms (fresh)", k: "mod", p: "low", safe: "limit", note: "Fine in normal portions. AVOID canned mushrooms — much higher potassium plus added sodium." },
  { name: "Brussels Sprouts", k: "mod", p: "low", safe: "limit", note: "504mg potassium per cup cooked. Limit to ½ cup (4-5 sprouts) per serving." },
  { name: "Bok Choy", k: "mod", p: "low", safe: "limit", note: "Moderate potassium — lower than spinach, higher than cabbage. ½ cup cooked portion is reasonable." },
  { name: "Kale", k: "high", p: "mod", safe: false, note: "Very high potassium when cooked/concentrated. Also very high Vitamin K — matters if on blood thinners. Use arugula or cabbage instead." },
    { name: "Peppermint Patty (York)", k: "low", p: "low", safe: true, note: "One of the safest candy bars — only 40mg phosphorus. No nuts, caramel, or coconut. Snack-size is fine." },
  { name: "Snickers", k: "mod", p: "high", safe: false, note: "113mg phosphorus per bar — nuts, caramel, and chocolate combined. Even 5-6 fun-size bars add up fast." },
  { name: "Mr. Goodbar", k: "mod", p: "high", safe: false, note: "Peanuts plus milk chocolate — high phosphorus and potassium. Avoid." },
  { name: "Almond Joy", k: "mod", p: "high", safe: false, note: "Coconut, almonds, and chocolate stacked together — one of the worst candy choices for CKD." },
  { name: "Twizzlers", k: "low", p: "low", safe: true, note: "Not real licorice — mainly corn syrup and sugar. Low phosphorus and potassium. Contains potassium sorbate (preservative, not a mineral concern) not potassium chloride." },
  { name: "Zucchini", k: "low", p: "low", safe: true, note: "Versatile kidney-friendly vegetable" },
];

const SHOPPING_LISTS = [
  { // WEEK 1
    produce: ["Bell peppers (3-4)", "Zucchini (3)", "Onions (3)", "Fresh garlic (1 head)", "Arugula (2 bags)", "Cucumber (3)", "Cauliflower (1 large head)", "Cabbage (1 head)", "Green beans (2 lbs)", "Romaine lettuce (1 head)", "Radishes (1 bunch)", "Fresh basil", "Fresh parsley", "Lemons (4)", "Limes (2)", "Blueberries (1 pint)", "Strawberries (1 pint)", "Apples (3)", "Carrots (small bag)"],
    protein: ["Chicken breast (2 lbs)", "Ground turkey (1 lb)", "Cod fillets (4 pieces, 3 oz each)", "Sea bass (1 piece, 3 oz)", "Shrimp (½ lb)", "Sole fillets (2 pieces, 3 oz each)", "Eggs (1 dozen)"],
    dairy: ["Cream cheese — Tillamook or Organic Valley (1 block)"],
    pantry: ["White rice (1 bag)", "White pasta (1 box)", "Couscous (1 box)", "Orzo (1 box)", "White bread (1 loaf)", "Unsalted crackers — Premium Unsalted Tops or Lundberg", "White flour tortillas — Rise and Puff or Tortillaland", "Olive oil (1 bottle)", "Apple cider vinegar"],
    spices: ["Garlic powder (Simply Organic or Frontier Co-op)", "Onion powder (Simply Organic or Frontier Co-op)", "Black pepper (Simply Organic or Frontier Co-op)", "Paprika (Simply Organic or Frontier Co-op)", "Smoked paprika (Simply Organic or Frontier Co-op)", "Cumin (Simply Organic or Frontier Co-op)", "Oregano (Simply Organic or Frontier Co-op)", "Basil dried (Simply Organic or Frontier Co-op)", "Thyme dried (Simply Organic or Frontier Co-op)", "Rosemary dried (Simply Organic or Frontier Co-op)", "Dill dried (Simply Organic or Frontier Co-op)", "Cayenne (Simply Organic or Frontier Co-op)", "Cinnamon (Simply Organic or Frontier Co-op)", "Ginger powder (Simply Organic or Frontier Co-op)", "Sage (Simply Organic or Frontier Co-op)", "BLEND OPTION: Benson's Gourmet, Flavor God, or DAK's Spices (all salt-free, no MSG, no potassium chloride)", "DO NOT BUY: McCormick, Lawry's, Dash/Mrs. Dash, Goya Adobo, Sazon Goya, Slap Ya Mama, or any brand with salt as first ingredient, silicon dioxide, maltodextrin, MSG, potassium chloride, tricalcium phosphate, artificial dyes, or natural flavors"],
  },
  { // WEEK 2
    produce: ["Bell peppers (2)", "Zucchini (2)", "Onions (3)", "Fresh garlic (1 head)", "Arugula (2 bags)", "Cucumber (3)", "Cauliflower (1 large head)", "Cabbage (1 head)", "Green beans (1.5 lbs)", "Radishes (1 bunch)", "Lettuce — butter or romaine (1 head)", "Fresh basil", "Fresh dill", "Lemons (3)", "Limes (2)", "Blueberries (1 pint)", "Pineapple chunks (1 container)", "Apples (2)", "Carrots (small bag)"],
    protein: ["Chicken breast (1.5 lbs)", "Chicken thighs (½ lb)", "Ground turkey (1 lb)", "Cod fillets (3 pieces, 3 oz each)", "Sole fillet (1 piece, 3 oz)", "Mahi mahi (1 piece, 3 oz)", "Shrimp (¼ lb)", "Eggs (1 dozen)"],
    dairy: ["Cream cheese — Tillamook or Organic Valley (1 block)"],
    pantry: ["White rice (if needed)", "White pasta (if needed)", "Couscous (if needed)", "White bread (1 loaf)", "White flour tortillas — Rise and Puff or Tortillaland"],
    spices: ["Restock any running low (Simply Organic or Frontier Co-op only)", "Turmeric if not already purchased (Simply Organic or Frontier Co-op)", "Pre-made blends: Benson's Gourmet, Flavor God, or DAK's Spices"],
  },
  { // WEEK 3
    produce: ["Bell peppers (2)", "Zucchini (2)", "Onions (3)", "Fresh garlic (1 head)", "Arugula (2 bags)", "Cucumber (3)", "Cauliflower (1 head)", "Cabbage (1 head)", "Green beans (1.5 lbs)", "Radishes (1 bunch)", "Fresh basil", "Fresh dill", "Fresh cilantro", "Lemons (4)", "Strawberries (1 pint)", "Blueberries (1 pint)", "Apples (2)", "Carrots (small bag)"],
    protein: ["Chicken breast (2 lbs)", "Ground turkey (1 lb)", "Cod fillets (2 pieces, 3 oz each)", "Sole fillet (1 piece, 3 oz)", "Mahi mahi (1 piece, 3 oz)", "Shrimp (½ lb)", "Eggs (1 dozen)"],
    dairy: ["Cream cheese — Tillamook or Organic Valley (1 block)"],
    pantry: ["White rice (if needed)", "White pasta (if needed)", "Couscous (if needed)", "Unsalted crackers (if needed)", "White bread (1 loaf)"],
    spices: ["Restock any running low (Simply Organic or Frontier Co-op only)", "Pre-made blends: Benson's Gourmet, Flavor God, or DAK's Spices"],
  },
  { // WEEK 4
    produce: ["Bell peppers (3)", "Zucchini (2)", "Onions (3)", "Fresh garlic (1 head)", "Arugula (2 bags)", "Cucumber (3)", "Cauliflower (1 large head)", "Cabbage (1 head)", "Green beans (1.5 lbs)", "Radishes (1 bunch)", "Fresh basil", "Fresh parsley", "Lemons (4)", "Limes (1)", "Blueberries (1 pint)", "Pineapple chunks (1 container)", "Apples (3)"],
    protein: ["Chicken breast (2 lbs)", "Ground turkey (1 lb)", "Cod fillets (2 pieces, 3 oz each)", "Sea bass (2 pieces, 3 oz each)", "Halibut (1 piece, 3 oz)", "Wild trout (1 piece, 3 oz)", "Shrimp (¼ lb)", "Eggs (1 dozen)"],
    dairy: ["Cream cheese — Tillamook or Organic Valley (1 block)"],
    pantry: ["White rice (if needed)", "White pasta (if needed)", "Couscous or orzo (if needed)", "White bread (1 loaf)"],
    spices: ["Restock any running low (Simply Organic or Frontier Co-op only)", "Pre-made blends: Benson's Gourmet, Flavor God, or DAK's Spices"],
  },
];

const EDUCATION = [
  {
    id: "partnership", icon: "Heart", title: "Your Health Is a Partnership", subtitle: "Nobody is coming to save you — and that is your power",
    content: [
      { h: "The hard truth", p: "Your doctor is not going to fix you. That is not a criticism of doctors — it is the reality of how healthcare works. Your nephrologist sees you for 15 to 30 minutes every few months. They review labs, adjust medications, and send you home. In between those visits, YOU are the one making every decision that determines whether your kidneys get better, stay stable, or get worse. What you eat for breakfast. Whether you exercise today. Whether you read that label before you buy it. Whether you drink water or Gatorade. Those are YOUR choices, and they matter more than any pill." },
      { h: "Your doctor is your partner, not your savior", p: "A good nephrologist gives you the medical framework — medications to manage blood pressure, guidance on your labs, monitoring your progression. But they cannot follow you to the grocery store. They cannot cook your meals. They cannot make you exercise. They cannot stop you from drinking coconut water or eating a whole bowl of cherries. The medication works WITH lifestyle — not instead of it. If you take your blood pressure pill and then eat a Subway footlong with 2,000mg of sodium, the medication is fighting a losing battle. Partnership means your doctor handles the clinical side and YOU handle the daily living side." },
      { h: "Knowledge is your weapon", p: "The reason this app exists is because knowledge changes outcomes. When you understand that sodium directly increases pressure inside your kidneys, you put down the salt. When you understand that insulin resistance accelerates CKD, you eat your protein before your carbs. When you understand that erythritol cannot be cleared by damaged kidneys, you put down the sugar-free candy. When you understand that strength training breaks the muscle-wasting cycle, you pick up the dumbbells. Every module in this app gives you knowledge that turns into a decision that protects your kidneys. Your doctor cannot teach you all of this in a 15-minute appointment. But you can learn it here and show up to that appointment informed, prepared, and in control." },
      { h: "Come to every appointment prepared", p: "Do not walk into your nephrologist visit and wait to be told what is wrong. Walk in with YOUR data. Your blood pressure readings. Your symptom log. Your food diary. Your workout completions. Your questions written down. Use the Doctor Communication Sheet in this app to bring organized information that shows your doctor exactly what you have been doing between visits. When a patient walks in prepared with data, the conversation changes from the doctor lecturing you to the doctor partnering with you. That is the difference between being a patient and being a participant." },
      { h: "Stop waiting for permission", p: "Too many people wait for their doctor to tell them to exercise before they start. Wait for their doctor to tell them to eat better before they change. Wait for their doctor to tell them their kidneys are failing before they take action. By then, damage has been done that could have been prevented. You do not need permission to drink clean water, eat vegetables, move your body, and read ingredient labels. You need permission from your doctor for medications and medical procedures. You do not need permission to take care of yourself. Start now. Adjust with your doctor later." },
      { h: "This is your life", p: "Nobody else is living in your body. Nobody else feels the fatigue, the swelling, the fear of what the next lab results will say. And nobody else can do the work for you. But here is the other side of that truth — nobody else gets the reward either. When your labs stabilize because YOU changed your diet. When your blood pressure drops because YOU started exercising. When your energy comes back because YOU made better choices. That is yours. You earned it. Your doctor did not do that. Your app did not do that. YOU did that. The app is the tool. The doctor is the guide. You are the one who decides whether your kidneys last. Make the choice. That is what FitByChoice means." },
    ],
  },
  {
    id: "ckd-healthy", icon: "Heart", title: "CKD Eating IS Healthy Eating", subtitle: "Why your diet is healthier than you think — reframing the narrative",
    content: [
      { h: "The wellness industry lied about what healthy means", p: "They told you whole wheat is healthy, dark leafy greens are healthy, nuts and seeds are healthy, bananas are healthy. For people with functioning kidneys, that is true. But healthy is not one-size-fits-all. What is healthy for someone with perfect kidneys can be harmful for you. That does not mean your diet is unhealthy. It means your definition of healthy is different — and it is just as valid. The restriction is not on NUTRITION. It is on specific MINERALS — potassium, phosphorus, and sodium. Your body is still getting vitamins, antioxidants, fiber, protein, healthy fats, and complex carbohydrates from sources your kidneys can handle." },
      { h: "Look at what you are ACTUALLY eating", p: "Bell peppers — more Vitamin C than oranges. Cabbage — loaded with Vitamin K, Vitamin C, and fiber. Cauliflower — rich in folate and Vitamin C. Garlic — allicin, one of the most powerful anti-inflammatory compounds in nature. Onions — quercetin, another potent antioxidant. Green beans — fiber, Vitamin A, Vitamin C. Zucchini — Vitamin A, manganese. Arugula — Vitamin K, calcium, folate. Cucumber — hydrating, silica for skin health. Radishes — Vitamin C, fiber. Blueberries — top 5 most antioxidant-rich foods on earth. Olive oil — one of the healthiest fats in human nutrition." },
      { h: "White starches are not the enemy", p: "White rice has been a staple of some of the longest-living populations on earth — Japan, Okinawa, parts of Southeast Asia. These are among the healthiest populations in human history, and they eat white rice daily. White rice is not unhealthy. It is a clean, easily digestible source of energy. The wellness industry demonized it because whole grains have more fiber — but for CKD, the lower phosphorus in white rice is what matters, and the fiber you need comes from your vegetables and fruits instead. White pasta, white bread, orzo, couscous — same principle. These are fuel. The enemy is processed food with hidden chemicals, not a plate of white rice with grilled chicken and roasted vegetables." },
      { h: "The real picture of your health", p: "You are cooking from scratch with whole ingredients. You are using clean seasonings. You are eating lean proteins, a wide variety of colorful vegetables, safe fruits, and healthy fats. You are exercising with progressive overload. You are reading every label. You are tracking your labs. That is healthier than how 90 percent of Americans eat right now — CKD or not. You are not on a restricted diet. You are on an informed diet. There is a difference, and it is an important one." },
      { h: "What you are protecting", p: "Every meal you prepare with these ingredients is protecting your kidneys from further damage, managing your blood pressure, controlling your insulin, reducing inflammation, maintaining your muscle mass, and supporting your heart. You are not just eating. You are actively defending your health with every bite. That is not deprivation. That is empowerment. That is FitByChoice." },
    ],
  },

  {
    id: "mens-health", icon: "Shield", title: "Men's Health & CKD", subtitle: "Testosterone, muscle loss, and what every man with CKD needs to know",
    content: [
      { h: "CKD is quietly lowering your testosterone", p: "This is the conversation nobody is having with men who have CKD. Research shows testosterone levels gradually decrease across increasing CKD stages — from 17% prevalence of low testosterone in Stage 1 to over 50% in advanced stages. Even in Stages 2-3, your testosterone is likely already declining. CKD patients have testosterone levels roughly 28 ng/mL lower than men without kidney disease. And only about 31% of CKD men with low testosterone are ever treated for it — meaning most men are living with the symptoms and blaming aging, stress, or themselves. Ask your nephrologist to check your testosterone levels at your next visit." },
      { h: "What low testosterone actually does to you", p: "Testosterone is not just about sex drive. It regulates muscle mass, bone density, fat distribution, energy, mood, cognitive function, and red blood cell production. When CKD lowers it, the effects cascade: muscle wasting accelerates (making you weaker and worsening insulin resistance), fatigue deepens (on top of CKD fatigue from low EPO), belly fat increases (testosterone normally keeps fat off the midsection), depression and irritability worsen (this is biochemical, not weakness), brain fog increases, and erectile dysfunction develops. Most men experience several of these and never connect them to their kidneys." },
      { h: "Erectile dysfunction is a CKD symptom", p: "This needs to be said directly: if you have CKD and are experiencing ED, it is very likely a consequence of your kidney disease lowering your testosterone — not just aging. It is treatable. It is common. It is not a personal failure. Talk to your nephrologist AND a urologist. Many men avoid this conversation out of embarrassment, but your doctors have heard it thousands of times and there are effective treatments. Do not suffer in silence or buy unregulated supplements online — some of those supplements contain ingredients that can further damage your kidneys." },
      { h: "Why strength training is your best defense", p: "Here is the cycle CKD creates in men: kidney damage lowers testosterone, low testosterone causes muscle wasting, less muscle worsens insulin resistance, worsened insulin resistance accelerates kidney damage. Strength training breaks this cycle directly. Building muscle improves insulin sensitivity, helps maintain testosterone levels, combats the wasting that CKD causes, and protects your kidneys. This program is specifically designed for this — moderate weights, progressive overload, proper breathing, CKD-safe intensity. You are not training for a competition. You are training to break the cycle." },
      { h: "Gout prevention", p: "Men with CKD are significantly more prone to gout because damaged kidneys cannot properly excrete uric acid. Gout causes sudden, severe joint pain — most commonly in the big toe, but also ankles, knees, and wrists. To help prevent flares: limit red meat and organ meats (also good for CKD protein management), avoid alcohol entirely (already recommended for CKD), avoid high-fructose corn syrup (found in sodas, candy, many processed foods), stay hydrated with plain water, and tell your nephrologist if you experience any sudden joint pain or swelling." },
      { h: "Sleep apnea — get screened", p: "Sleep apnea is highly prevalent in CKD patients and more common in men. It is also bidirectional — sleep apnea worsens CKD, and CKD worsens sleep apnea. Symptoms: loud snoring, waking up gasping or choking, excessive daytime sleepiness even after a full night, morning headaches, difficulty concentrating. If you experience any of these, tell your nephrologist. Sleep apnea is treatable, and treating it can slow CKD progression, lower blood pressure, and dramatically improve your quality of life and energy." },
      { h: "Cardiovascular risk — the real danger", p: "Heart disease is the number one killer of CKD patients, and men with CKD face even higher cardiovascular risk than women with CKD. Low testosterone further increases this risk by worsening cholesterol profiles, promoting arterial stiffness, and increasing inflammation. The exercise program, the meal plans, the blood pressure management, and the insulin education in this app are all directly addressing your cardiovascular risk — not just your kidney health. Every workout you complete is protecting your heart." },
      { h: "Prostate and urinary awareness", p: "Men with CKD who also have benign prostate hyperplasia (enlarged prostate) face a specific risk — urinary obstruction from BPH can worsen kidney function by creating backpressure on the kidneys. If you experience difficulty starting urination, weak stream, frequent nighttime bathroom trips, or feeling like your bladder does not fully empty, tell your nephrologist immediately. These symptoms could be accelerating your CKD. Also note that some prostate medications lower blood pressure, which interacts with CKD management — your doctors need to coordinate." },
      { h: "Depression is hormonal — not weakness", p: "If you are feeling consistently low, unmotivated, irritable, or withdrawn, understand that this may be a direct biochemical consequence of CKD lowering your testosterone. Testosterone regulates mood and cognitive function. When it drops, depression often follows. This is not a character flaw. This is your body chemistry changing because of your kidney condition. Talk to your doctor about it. Exercise helps significantly — research shows regular moderate exercise improves mood, energy, and cognitive function in CKD patients. But if it persists, professional support exists and there is no shame in seeking it." },
    ],
  },
  {
    id: "insulin", icon: "Zap", title: "Insulin & Fat Storage", subtitle: "Why your body stores fat and how to change it",
    content: [
      { h: "What insulin actually does", p: "Insulin is a hormone made by your pancreas. When you eat, blood sugar rises, and insulin shuttles that glucose into your cells for energy. But insulin is also a storage hormone — when it's high, your body prioritizes storing energy as fat and suppresses the breakdown of existing fat. Your body literally cannot efficiently burn fat while insulin is elevated." },
      { h: "The cycle that traps people", p: "Refined carbs and sugar spike insulin hard and fast. Insulin clears sugar quickly — sometimes too quickly, causing a crash. That crash triggers hunger and cravings. You eat again (usually more carbs), insulin spikes again. Fat burning stays suppressed because insulin never drops low enough. This is why someone can eat 1,200 calories of processed food, still feel hungry, and still not lose fat." },
      { h: "What works", p: "Prioritize protein, healthy fats, and fiber-rich vegetables — these produce gentler insulin responses. Eat protein and vegetables BEFORE carbs in the same meal (studies show this reduces blood sugar spikes by up to 37%). Give your body windows without food so insulin can drop. And build muscle — skeletal muscle is your body's largest glucose sink. More muscle means better insulin sensitivity." },
      { h: "Why this matters for CKD", p: "CKD patients have higher rates of insulin resistance. Poor insulin management accelerates kidney damage through increased inflammation and blood pressure. Managing insulin through exercise and eating smart isn't just about body composition — it's about protecting your kidneys." },
    ],
  },
  {
    id: "mealorder", icon: "UtensilsCrossed", title: "How to Eat Your Meals", subtitle: "Same food, different order, better results",
    content: [
      { h: "Your stomach is a queue, not a blender", p: "Food processes largely in the order it arrives. When protein and fiber hit your stomach first, they form a slower-moving mass. Carbs arriving after have to work through that layer, slowing glucose absorption into your bloodstream." },
      { h: "The science", p: "Researchers at Weill Cornell Medicine gave people the exact same meal but changed the order. Eating vegetables and protein first, carbs last, reduced post-meal blood sugar spikes by 29-37% depending on the time interval. Same food. Same calories. Just different order." },
      { h: "The practical rule", p: "Sit down with your plate. Eat your protein and veggies first. Finish with whatever starch is on the plate. That's it. At breakfast, eat your eggs before your toast. At lunch, eat your chicken and vegetables before your rice. At dinner, keep it protein and vegetable focused with minimal starch." },
      { h: "Timing throughout the day", p: "Your body handles glucose better in the morning (higher insulin sensitivity). Front-load your calories — biggest meal at lunch, lightest at dinner. Eat 2-3 structured meals with 3-4 hours between. Stop eating 2-3 hours before bed. Every snack spikes insulin — those '100 calorie snack packs' keep insulin elevated all day." },
    ],
  },
  {
    id: "bodyafter50", icon: "Heart", title: "Your Changing Body: Perimenopause, Menopause & Beyond", subtitle: "What changed, why, and how to work with your hormones — not against them",
    content: [
      { h: "Estrogen drops, fat relocates", p: "Before menopause, estrogen directs fat to hips, thighs, and butt. When estrogen declines, fat storage shifts to your abdomen. You didn't start eating worse. Your body's fat distribution GPS changed directions." },
      { h: "Two types of belly fat", p: "Subcutaneous fat is the soft, pinchable layer — the 'pouch.' Visceral fat is deeper, wrapping around organs. Visceral fat is metabolically active, produces inflammatory chemicals, and is linked to heart disease, insulin resistance, and CKD progression." },
      { h: "The hormone cascade", p: "Estrogen decline changes WHERE fat goes. Increased insulin resistance changes HOW MUCH gets stored. Rising cortisol (stress hormone) specifically promotes belly fat. Declining muscle mass lowers metabolism. These aren't separate problems — they compound each other." },
      { h: "What actually works", p: "Strength training rebuilds muscle, improves insulin sensitivity, and boosts metabolism. Insulin-smart eating lowers the fat-storage signal. Sleep and stress management lower cortisol. Crunches won't touch belly fat — the fat has to be addressed systemically through muscle building and hormonal rebalancing. That's exactly what this program does." },
      { h: "Perimenopause: the stage nobody explains", p: "Perimenopause typically starts in your mid-40s and can last through your early-to-mid 50s. Average age of actual menopause is 51. During this time your hormones fluctuate wildly — some days estrogen is high, some days it crashes. This causes unpredictable energy levels, sleep disruption from hot flashes and night sweats, mood shifts that affect motivation, joint inflammation, and the beginning of belly fat redistribution. You're not imagining it. It's real and it's biochemical." },
      { h: "Low-energy days are normal", p: "Some days during perimenopause you'll feel strong and ready. Other days you'll feel like someone pulled the plug. This program accounts for that. On low-energy days, do the lighter alternative: a gentle walk, the flexibility routine, or the balance training session instead of the full workout. Showing up matters more than intensity. Three light sessions beat zero perfect ones." },
    ],
  },
  {
    id: "sleep", icon: "Moon", title: "Sleep & CKD", subtitle: "Why sleep matters more than you think",
    content: [
      { h: "The CKD sleep problem", p: "Up to 80% of CKD patients experience sleep disorders — insomnia, restless leg syndrome, itching that worsens at night, and sleep apnea. Poor sleep raises cortisol, worsens insulin resistance, increases inflammation, and accelerates CKD progression." },
      { h: "Sleep hygiene basics", p: "Go to bed and wake up at the same time every day. Keep your bedroom dark, cool, and quiet. No screens 30 minutes before bed. Avoid caffeine after noon. If you nap, limit it to 30 minutes before 2pm." },
      { h: "CKD-specific tips", p: "Itching at night is common — moisturize before bed, keep room cool, wear loose cotton clothing. Restless legs may improve with gentle stretching before bed. If you experience sleep apnea symptoms (loud snoring, gasping), tell your nephrologist." },
      { h: "Exercise timing helps", p: "Regular exercise improves sleep quality significantly. But avoid intense exercise within 3 hours of bedtime. Morning or afternoon workouts tend to produce the best sleep outcomes." },
    ],
  },
  {
    id: "symptoms", icon: "Eye", title: "What Your Body Is Telling You", subtitle: "Common CKD symptoms explained",
    content: [
      { h: "Fatigue", p: "The #1 complaint among CKD patients. It's not laziness — your kidneys produce less erythropoietin (EPO), which means fewer red blood cells, which means less oxygen reaching your muscles and brain. Exercise actually helps by improving oxygen efficiency and building stamina over time." },
      { h: "Itching (Pruritus)", p: "When kidneys can't filter properly, toxins build up and can cause persistent itching — especially at night. Moisturize regularly, avoid hot showers, wear breathable fabrics. If severe, talk to your doctor — treatments exist." },
      { h: "Swelling (Edema)", p: "Puffy ankles, feet, or face means your kidneys aren't removing excess fluid. Monitor your fluid intake, reduce sodium, and elevate your legs when sitting. Track swelling in your symptom log and report changes to your doctor." },
      { h: "Muscle cramps", p: "Electrolyte imbalances (potassium, calcium, magnesium) cause cramping. Staying hydrated, stretching regularly, and following your kidney-friendly meal plan helps. Don't take potassium supplements without your doctor's approval." },
      { h: "Brain fog", p: "Difficulty concentrating is common with CKD. Toxin buildup, anemia, and poor sleep all contribute. Exercise, proper hydration, and quality sleep are your best tools. If it worsens suddenly, contact your doctor." },
    ],
  },
  {
    id: "beverages", icon: "Droplets", title: "Hydration & CKD: What to Drink, What to Eat", subtitle: "Safe beverages, dangerous drinks, and hydrating foods for kidney health",
    content: [
      { h: "Water — your primary drink", p: "For CKD Stages 2-3a without fluid restrictions, aim for about 1-1.5 liters daily. Sip throughout the day, don't chug. Watch your urine color — straw-colored is the target. Ask your nephrologist for YOUR specific number." },
      { h: "Energy drinks — hard no", p: "High caffeine spikes blood pressure. Sugar spikes insulin. Many contain hidden phosphorus and potassium (up to 580mg per serving). Even sugar-free versions are dangerous. Avoid completely." },
      { h: "Soda — also no", p: "Dark colas contain phosphoric acid that directly damages kidneys. Studies show 2+ colas daily doubles CKD risk. Diet soda isn't safe either — artificial sweeteners and phosphoric acid still stress your kidneys." },
      { h: "Alcohol — understand the real risk", p: "The honest answer: research suggests occasional minimal drinking may be tolerable for CKD Stages 2-3 if your blood pressure is well-controlled and your nephrologist approves. The limit is strict — no more than 1 drink per day for women and 2 for men (12 oz light beer, 5 oz wine, or 1.5 oz spirits). Always with a meal, never on an empty stomach. Wine and light beer are the lowest risk options. However, know what alcohol does regardless of amount: it raises blood pressure, dehydrates your body (stresses kidneys), disrupts sleep and cortisol, interferes with blood pressure medications, disrupts electrolyte balance, and spikes blood sugar. The mixers are often worse than the alcohol — a single Bloody Mary can deliver 1,200mg of sodium, which is 60-80 percent of your entire daily limit. Avoid cocktails with orange juice, tomato juice, or premade mixes. Alcohol use disorder increases CKD risk by 62-68 percent. The safest amount of alcohol for CKD is zero. If you do not currently drink, do not start. Always discuss with your nephrologist." },
      { h: "Sports drinks — avoid completely", p: "Gatorade, Powerade, BodyArmor, Liquid IV, and all electrolyte drinks are designed to REPLACE sodium, potassium, and phosphorus. Those are the exact three things your kidneys cannot clear properly. A single 12 oz Gatorade contains approximately 160mg sodium, potassium from monopotassium phosphate (which your kidneys struggle to clear), phosphorus additives (absorbed at over 90 percent), 21 grams of sugar (spikes insulin), artificial colors your kidneys must filter, and natural flavors (unknown chemicals). You do not need electrolyte replacement for a 30-minute moderate workout. That is marketing designed for elite athletes doing 90-plus minutes of intense exercise. Plain water is all you need before, during, and after your workouts. Always consult your nephrologist before consuming any electrolyte-enhanced beverages." },
      { h: "Coconut water — avoid completely", p: "Vita Coco, Zico, and all coconut water brands are marketed as natural and healthy. For CKD patients, they are one of the riskiest beverages you can consume. One 330ml Vita Coco container contains 646mg of potassium (more than a banana), 100mg of sodium, and 33mg of phosphorus. Drink two and that is nearly 1,300mg of potassium — potentially half your entire daily limit from a single beverage. The pressed or creamy versions are even worse. Most nephrologists recommend CKD patients avoid coconut water entirely. Choose plain water, herbal tea, or unsweetened cranberry juice instead." },
      { h: "Safe options", p: "Plain water, herbal teas (chamomile, ginger, hibiscus — avoid licorice root), black coffee in moderation (1-2 cups, no sugary creamers), unsweetened cranberry juice, water infused with lemon or berries." },
      { h: "Sparkling water vs. mineral water — know the difference", p: "Plain sparkling water (seltzer) is just water plus carbon dioxide — no added minerals, no sodium, no phosphorus. It's generally safe for CKD. Mineral water is completely different — it comes from natural springs and contains naturally occurring sodium, potassium, calcium, and other minerals. Some brands contain over 1,000mg of sodium per liter. Two glasses could blow your entire daily sodium budget without you realizing it." },
      { h: "Club soda and tonic water — avoid both", p: "Club soda is NOT the same as sparkling water. It has added sodium bicarbonate, sodium citrate, and sometimes potassium sulfate — hidden sodium and potassium sources. Tonic water contains sugar or artificial sweeteners plus quinine. Neither is kidney-friendly. Flavored sparkling waters need a label check too — some add potassium additives, phosphates, or 'natural flavors' that turn safe water into a CKD concern." },
    ],
  },
  {
    id: "hydration-fruits", icon: "Droplets", title: "Hydrating Fruits & Vegetables", subtitle: "CKD-safe foods that hydrate you from the inside out",
    content: [
      { h: "Why hydrating foods matter for CKD", p: "When your fluid intake may be monitored or limited, getting water through food is a smart strategy. Hydrating fruits and vegetables deliver water along with vitamins, fiber, and antioxidants — without the risk of overloading your kidneys the way drinking large amounts of water can. Think of them as 'eating your water.'" },
      { h: "The CKD-safe hydrating superstars", p: "Cucumber (96% water) — the safest option. Very low potassium, very low phosphorus. Add slices to water, chop into salads, or eat plain with a squeeze of lemon. Strawberries (91% water) — low potassium, rich in vitamin C and antioxidants. Eat fresh, add to water, or top your breakfast with them. Cauliflower (92% water) — surprisingly hydrating. Low potassium, versatile. Roast it, steam it, or rice it. Cabbage (92% water) — extremely kidney-friendly. Use in slaws, stir-fries, or soups. Radishes (95% water) — low potassium, great roasted as a potato substitute. Bell peppers (92% water) — low potassium, high vitamin C. Eat raw with cream cheese (Tillamook or Organic Valley) or roast them. Pineapple (86% water) — one of the safest tropical fruits for CKD. Blueberries (84% water) — antioxidant powerhouse, low potassium. Cranberries (87% water) — beneficial for urinary tract health." },
      { h: "Caution: hydrating but portion-controlled", p: "Watermelon (92% water) — yes, it's very hydrating, but it's moderate in potassium (~170mg per cup). A small wedge is likely fine for Stages 2-3, but don't eat unlimited amounts. Track your total potassium intake for the day. Grapes (81% water) — moderate potassium. A small handful is fine, not a full bowl. Peaches (89% water) — moderate potassium. Limit to half a peach at a time. Always check with your nephrologist if you're unsure about portions for your specific stage." },
      { h: "How to incorporate these daily", p: "Morning: add blueberries or sliced strawberries to your breakfast. Midday: keep sliced cucumber and bell peppers in the fridge for easy snacking. With meals: include cauliflower, cabbage, or green beans as your vegetable — you're hydrating while eating. Water infusions: add cucumber slices, strawberries, or a few pineapple chunks to a pitcher of water for natural flavor without additives. Frozen treats: freeze blueberries or pineapple chunks for a refreshing, kidney-safe snack." },
      { h: "Avoid these high-potassium 'health' fruits", p: "Oranges, bananas, cantaloupe, honeydew, kiwi, and dried fruits of any kind. These are marketed as healthy hydrating options but are too high in potassium for CKD. The general wellness world doesn't distinguish between kidney-safe and kidney-risky. Any white rice — including jasmine and basmati — is a safe starch choice. Brown rice and wild rice are not, because the bran layer that makes them 'healthier' for the general population concentrates roughly double the phosphorus and significantly more potassium. Your app teaches the distinction the wellness world does not." },
    ],
  },
  {
    id: "seasonings", icon: "Shield", title: "Seasonings & Labels: What's Safe, What's Not", subtitle: "The low sodium trap, red flag ingredients, clean brands, and DIY blends",
    content: [
      { h: "The problem with 'low sodium'", p: "Many products swap sodium chloride for potassium chloride — dangerous for CKD patients because impaired kidneys can't clear excess potassium. Elevated potassium causes heart rhythm problems. Morton Salt Substitute, Nu-Salt, and most 'lite salt' products use potassium chloride." },
      { h: "Hidden ingredients to avoid", p: "Maltodextrin (glycemic index higher than sugar), yeast extract and hydrolyzed proteins (hidden MSG), 'natural flavors' (can contain 100+ unknown ingredients), disodium guanylate and disodium inosinate (hidden sodium), corn starch, dextrose, caramel color, soybean/canola oil." },
      { h: "Safe single-ingredient spices", p: "Garlic powder, onion powder, black pepper, paprika, smoked paprika, cumin, oregano, basil, thyme, rosemary, dill, parsley, cayenne, turmeric, coriander, ginger. Buy them individually — just the dried plant, nothing added." },
      { h: "Vetted clean brands", p: "Benson's Gourmet Seasonings — salt-free, sugar-free, no MSG, no potassium chloride, no silicon dioxide. Uses rice hulls (natural) as anti-caking agent instead of chemicals. Flavor God — no fillers, no preservatives, no sodium, no artificial coloring. Small business, USA-made. DAK's Spices — 100% salt-free, MSG-free, preservative-free, potassium chloride-free. Always read the full ingredient list yourself — even 'trusted' brands change formulas. Specifically avoid: Lawry's Seasoned Salt (380mg sodium per quarter teaspoon plus tricalcium phosphate), Lawry's Less Sodium version (contains potassium chloride — even worse for CKD), Goya Adobo (salt and MSG as first ingredients), Sazon Goya (MSG first ingredient, 480mg sodium per packet, tricalcium phosphate, Yellow 5, Red 40), and Slap Ya Mama (salt is the first and primary ingredient). All of these use spices that are individually safe — garlic, cumin, paprika, turmeric — but pack salt, MSG, phosphorus additives, and artificial dyes around them." },
      { h: "Make your own blends", p: "The safest option is always making your own from single-ingredient spices. See the DIY Seasoning Blends module for 5 ready-to-make recipes — All-Purpose, Chili-Lime, Italian Herb, Smoky Cajun, and Garlic Herb." },
    ],
  },
  {
    id: "diy-blends", icon: "Star", title: "Make Your Own Blends", subtitle: "5 clean seasoning recipes — zero sodium, zero chemicals, 30 seconds each",
    content: [
      { h: "Why make your own", p: "Every commercial blend is a label-reading gamble. When you mix your own from single-ingredient spices, you know exactly what's in it — no potassium chloride, no maltodextrin, no silicon dioxide, no hidden MSG. It's cheaper, it's cleaner, and it tastes better. Make a batch, store in a small jar, and you're set for weeks." },
      { h: "Chili-Lime (Tajín replacement) - Ratio 2:1:1:½:½", p: "RECIPE: 2 tbsp chili powder | 1 tbsp cayenne (adjust to taste) | 1 tbsp dehydrated lime zest or citric acid | ½ tbsp garlic powder | ½ tbsp cumin. Mix all in a small jar, shake to combine. Makes about ¼ cup. Perfect on fruit, vegetables, chicken, fish, and popcorn. All the tangy-spicy kick, zero sodium." },
      { h: "All-Purpose Everyday Blend (Lawry's replacement) - Ratio 2:2:1:1:1:½", p: "RECIPE: 2 tbsp garlic powder | 2 tbsp onion powder | 1 tbsp black pepper | 1 tbsp paprika | 1 tbsp dried oregano | ½ tbsp dried thyme. Mix all in a small jar, shake to combine. Makes about ⅓ cup. Covers 90% of your cooking - meat, vegetables, eggs, soups." },
      { h: "Italian Herb Blend (McCormick Italian Seasoning replacement) - Ratio 2:2:1:1:1:½:½", p: "RECIPE: 2 tbsp dried basil | 2 tbsp dried oregano | 1 tbsp dried rosemary (crushed) | 1 tbsp dried thyme | 1 tbsp garlic powder | ½ tbsp black pepper | ½ tbsp dried parsley. Mix all in a small jar, shake to combine. Makes about ⅓ cup. Use on chicken, fish, pasta, roasted vegetables, or mix with olive oil for a dipping sauce." },
      { h: "Smoky Cajun Blend (Tony Chachere's replacement) - Ratio 2:1:1:1:1:½:½", p: "RECIPE: 2 tbsp smoked paprika | 1 tbsp garlic powder | 1 tbsp onion powder | 1 tbsp dried oregano | 1 tbsp dried thyme | ½ tbsp cayenne | ½ tbsp black pepper. Mix all in a small jar, shake to combine. Makes about ⅓ cup. Bold and smoky - great on chicken, shrimp, roasted cauliflower, and fish." },
      { h: "Adobo Blend (Goya Adobo replacement) - Ratio 2:1:1:½:½", p: "RECIPE: 2 tbsp garlic powder | 1 tbsp dried oregano | 1 tbsp black pepper | ½ tbsp turmeric | ½ tbsp onion powder. Mix all in a small jar, shake to combine. Makes about ¼ cup. Same warm, garlicky adobo flavor without the salt and MSG in Goya Adobo. Use on chicken, pork, rice, beans." },
      { h: "Cajun Blend (Slap Ya Mama replacement) - Ratio 2:1:1:1:1:½:½", p: "RECIPE: 2 tbsp smoked paprika | 1 tbsp garlic powder | 1 tbsp onion powder | 1 tbsp dried oregano | 1 tbsp dried thyme | ½ tbsp cayenne | ½ tbsp black pepper. Mix all in a small jar, shake to combine. Makes about ⅓ cup. Bold Louisiana flavor without the salt that is first in Slap Ya Mama. Adjust cayenne to your heat preference." },
      { h: "Latin Sazon Blend (Sazon Goya replacement) - Ratio 1:1:1:1:½", p: "RECIPE: 1 tbsp garlic powder | 1 tbsp cumin | 1 tbsp ground coriander | 1 tbsp smoked paprika | ½ tbsp turmeric (for golden color). Mix all in a small jar, shake to combine. Makes about ¼ cup. Same Latin flavor as Sazon Goya - zero sodium, zero MSG, zero phosphate, zero artificial dyes. Use on rice, beans, chicken, stews. Annatto powder optional for deeper orange color." },
      { h: "Garlic Herb Everyday Blend (McCormick Garlic Herb replacement) - Ratio 3:1:1:1:½:½", p: "RECIPE: 3 tbsp garlic powder | 1 tbsp dried parsley | 1 tbsp dried dill | 1 tbsp onion powder | ½ tbsp black pepper | ½ tbsp dried basil. Mix all in a small jar, shake to combine. Makes about ½ cup. Mild and versatile - perfect for anyone just starting to season without salt. Works on eggs, roasted vegetables, rice." },
    ],
  },
  {
    id: "labs", icon: "Activity", title: "Understanding Your Lab Results", subtitle: "What your numbers mean in plain language",
    content: [
      { h: "eGFR — THE number", p: "Measures how well your kidneys filter. Think of it as a percentage of normal function. 90+ is normal, 60-89 is Stage 2, 45-59 is Stage 3a, 30-44 is Stage 3b, 15-29 is Stage 4, below 15 is Stage 5. You want this stable or going UP." },
      { h: "Creatinine", p: "Waste from muscle metabolism. High creatinine = kidneys aren't keeping up. Used to calculate your eGFR. You want this LOW and stable." },
      { h: "Potassium (3.5–5.0 normal)", p: "Above 5.0 is concerning. Above 6.0 is dangerous — can cause heart problems. This is why you limit high-potassium foods." },
      { h: "Phosphorus (2.5–4.5 normal)", p: "When kidneys can't remove phosphorus, it pulls calcium from bones and causes cardiovascular damage. Avoid dark colas, processed foods, and high-phosphorus items." },
      { h: "Hemoglobin", p: "Measures red blood cells. CKD reduces EPO production = fewer red blood cells = fatigue, weakness, shortness of breath. If your hemoglobin is low, that's why you're exhausted." },
      { h: "UACR (Albumin-to-Creatinine Ratio)", p: "Measures protein leaking into urine. Below 30 is normal. 30-300 is moderately elevated. Above 300 is severe. Healthy kidneys don't let protein through — elevation means damage is present." },
      { h: "When you start exercising — what to expect in your labs", p: "Creatinine may rise slightly. This can be scary, but here's why it happens: more muscle means more creatinine production, because creatinine is the waste product of muscle metabolism. Building muscle is a GOOD thing — your kidneys aren't necessarily getting worse. Tell your nephrologist you started a strength training program so they can interpret your numbers in context. The TREND over months matters more than any single reading." },
      { h: "Other lab changes to expect", p: "BUN may temporarily rise — exercise breaks down protein and produces urea. If you're eating more protein to support muscle building, BUN goes up too. Dehydration during workouts can also spike BUN temporarily. This is normal. Potassium can spike briefly after intense exercise because muscle contractions release potassium into the bloodstream — this is why your program keeps workouts moderate, not extreme. Hemoglobin may improve over time as your body gets more efficient at using oxygen. eGFR may fluctuate between visits — small swings are normal. Look at the trend over 3-6 months, not one number." },
      { h: "The bottom line", p: "Always tell your nephrologist when you start a new exercise or dietary program. Bring your Doctor Communication Sheet from this app. Don't panic over a single lab result — trends tell the real story. And never skip your scheduled lab work because you're worried about a number." },
    ],
  },
  {
    id: "hidden-dangers", icon: "AlertTriangle", title: "The 'Healthy' Label Trap", subtitle: "Why 'sugar-free' and 'low calorie' can be worse for CKD",
    content: [
      { h: "The trick the food industry plays", p: "Labels like '0g Sugar,' 'Sugar-Free,' 'Low Calorie,' and 'Diet' make products look healthy. But for CKD patients, the ingredients that REPLACE sugar are often more dangerous than sugar itself. The food industry isn't thinking about your kidneys — they're thinking about marketing claims. You have to read past the front of the package and into the actual ingredient list." },
      { h: "Sugar-free candy: a case study", p: "Take a popular sugar-free gummy worm that claims 0g sugar and low calories. Sounds harmless. But look at what's actually inside: erythritol (a sugar alcohol that's 90% excreted through your kidneys — damaged kidneys can't clear it efficiently, and elevated blood levels are linked to increased heart attack and stroke risk), maltodextrin (glycemic index higher than table sugar even in 'resistant' form), sodium citrate (hidden sodium), calcium lactate (can interfere with phosphorus metabolism in CKD), and 'natural flavors' (unknown chemicals). One product, five CKD concerns, all hiding behind a 'healthy' label." },
      { h: "Erythritol: the sugar alcohol your kidneys can't handle", p: "Erythritol is in thousands of 'sugar-free' and 'keto' products — candy, gum, protein bars, drinks, baked goods. Healthy kidneys flush 90% of it out through urine. With CKD, your kidneys can't clear it efficiently, so it builds up in your blood. Research has linked elevated erythritol levels to dramatically increased risk of blood clotting, heart attack, and stroke. CKD patients already have elevated cardiovascular risk — adding erythritol on top of that is playing with fire." },
      { h: "Products to check that you wouldn't expect", p: "Sugar-free candy and gum (erythritol, maltitol, sorbitol — all sugar alcohols processed by kidneys). Diet sodas (phosphoric acid, artificial sweeteners). Protein bars (phosphorus additives, potassium additives, sugar alcohols). 'Keto-friendly' snacks (erythritol, allulose in excess amounts). Sugar-free ice cream (sugar alcohols, phosphorus). Flavored water (hidden phosphorus, potassium, sodium). Meal replacement shakes (high phosphorus, high potassium, high protein)." },
      { h: "Ingredients to scan for on ANY label", p: "Erythritol, maltitol, sorbitol, xylitol (sugar alcohols — kidneys process these). Maltodextrin (blood sugar spike). Phosphoric acid (kidney damage). Potassium chloride (dangerous with CKD). Sodium citrate, disodium phosphate, sodium benzoate (hidden sodium). 'Natural flavors' (unknown). Carrageenan (inflammatory). Any ingredient you can't pronounce — look it up before you eat it." },
            { h: "Subway — 'Eat Fresh' is not CKD-safe", p: "Subway markets itself as the healthy fast-food option. For CKD patients, a single sandwich can destroy your entire daily sodium budget. Here is the breakdown by ingredient: THE BREAD — a 6-inch Italian White roll alone contains approximately 390mg sodium, plus dough conditioners (ammonium sulfate, DATEM, sodium stearoyl lactylate), calcium sulfate, and monocalcium phosphate (a phosphorus additive). THE MEAT — all Subway deli meats are processed with sodium phosphate (phosphorus additive absorbed at 90 percent), sodium nitrate and nitrite (preservatives), and massive sodium. A 6-inch turkey sub has approximately 500-600mg sodium just from the meat. Italian BMT exceeds 1,000mg. THE CHEESE — all options are high in phosphorus. One slice adds 200mg+ sodium. THE SAUCES — ranch and mayo contain soybean oil, natural flavors, and 100-200mg sodium per serving. Sweet onion sauce contains high-fructose corn syrup. TOTAL DAMAGE — an average 6-inch sub contains 1,000-2,000mg of sodium. A footlong can EXCEED your entire daily CKD limit of 2,000mg in a single sandwich. Add chips and a drink and you have consumed two days worth of sodium in one meal. There is no way to order a CKD-safe Subway sandwich. Even a veggie sub on their bread with no sauce still delivers 400-500mg sodium from the bread alone plus whatever the vegetables absorbed during storage. Cook at home." },
      { h: "Reading bread labels - the sodium trap", p: "Not all white bread is equal. Sodium per slice can range from 100mg to 330mg+ depending on the brand - nearly triple the difference. Always check the actual sodium number on the nutrition panel, not just the ingredient list. Target under 150-200mg per slice. Two slices for a sandwich should not exceed 300-400mg total. Also confirm no calcium phosphate, sodium phosphate, or potassium additives anywhere in the ingredients. Nature's Own, Pepperidge Farm Original White, Schmidt Baking, and Wonder Bread Classic White are generally acceptable - but formulas change, so verify every time you buy." },
      { h: "The simple rule", p: "If a product needs a chemistry lab to make it taste good, your kidneys don't want it. Stick to whole foods, single-ingredient spices, and things your great-grandmother would recognize as food. When you do buy packaged products, flip it over and read every ingredient. The front of the package is marketing. The back is the truth." },
      { h: "Trader Joe's — 5 products to watch", p: "1) Sweet & Sour Gummy Worms — '0g sugar' but contains erythritol, maltodextrin, sodium citrate, calcium lactate, and 'natural flavors.' Five CKD concerns behind one healthy claim. 2) Quest Protein Bars — 220mg sodium, 21g protein (too much for one sitting with CKD), plus 6g erythritol. 3) Energy Bar Chocolate Chip — oats AND soy protein isolate (double phosphorus hit), brown rice syrup, sea salt listed twice. 4) Chewy Chocolate & Peanut Butter Protein Bar — 180mg sodium, soy protein isolate, peanuts (high phosphorus), agave syrup. Peanuts and soy together deliver a massive phosphorus load. 5) Coconut and plant milks — check every label for tricalcium phosphate or dipotassium phosphate. Phosphorus from additives is absorbed at over 90%, far more than natural food sources." },
      { h: "Whole Foods — 5 products to watch", p: "1) 365 Organic Whole Wheat Bread — whole wheat is high in phosphorus. The general health world says 'choose whole grain.' For CKD, white bread is actually safer. This contradiction confuses newly diagnosed patients. 2) 365 Organic Black Bean Soup — beans are high in both potassium AND phosphorus, and canned soup adds sodium. Three CKD concerns in one 'organic' can. 3) Kombucha (any brand) — high in potassium, contains acids that stress the kidneys, some brands add sugar alcohols. 4) 365 Organic Peanut Butter — peanuts are high in phosphorus and potassium. A two-tablespoon serving can have 100mg+ phosphorus and 200mg+ potassium. 'Organic' doesn't mean kidney-safe. 5) Fortified Almond Milk — check labels for calcium phosphate or dipotassium phosphate. Some brands have up to 500mg added calcium per serving plus phosphorus additives. Choose unfortified, unsweetened versions only." },
    ],
  },
  {
    id: "supplements", icon: "AlertTriangle", title: "Vitamins & Supplements for CKD", subtitle: "Why most OTC vitamins are not safe for kidney disease",
    content: [
      { h: "Most vitamins are NOT safe for CKD", p: "Standard multivitamins like Centrum, One A Day, and store-brand vitamins are designed for people with healthy kidneys. They often contain potassium, phosphorus, vitamin A, and other nutrients that accumulate dangerously when your kidneys cannot filter properly. The National Kidney Foundation warns that over-the-counter vitamin and mineral products may contain too much potassium or phosphorus for people with kidney disease. Do NOT take any supplement without your nephrologist's explicit approval." },
      { h: "Vitamins to AVOID unless prescribed", p: "Vitamin A — already elevated in CKD, builds up to toxic levels because your kidneys cannot clear the excess. Vitamin C in high doses (500mg+) — excess converts to oxalate, which can cause kidney stones and worsen kidney function. Vitamin E supplements — can build up in CKD and may raise bleeding risk, especially if you take blood thinners. Calcium supplements (unless prescribed) — unregulated calcium intake can cause vascular calcification, hardening your arteries. Potassium supplements — obvious danger for CKD." },
      { h: "Products that sound healthy but are dangerous", p: "Greens powders, superfood blends, electrolyte mixes, mineral supplements, immune support formulas, and detox supplements. The NKF specifically flags labels like electrolyte support, high in minerals, and superfood green powders as warning signs that a product may be high in potassium or phosphorus. Just because it is sold at a health food store does not mean it is safe for your kidneys. Natural does not mean safe for CKD." },
      { h: "What you MIGHT need — only with lab confirmation", p: "Vitamin D — CKD patients are commonly deficient, and vitamin D plays a critical role in bone health and calcium regulation. But dosing must be managed by your nephrologist based on YOUR blood levels. B vitamins (B12, folate) — support red blood cell production and energy. May help with CKD-related anemia. Iron — only if your labs show deficiency and your doctor prescribes it. Do not self-supplement iron. Renal-specific multivitamins (like Nephrovite or ProRenal) — these are designed specifically for CKD with appropriate levels of B vitamins and limited vitamin C, no vitamin A, no potassium, no phosphorus." },
      { h: "The safest approach", p: "Food first. Supplements only when your labs show a specific deficiency and your nephrologist prescribes them. Bring every supplement you are currently taking to your next appointment and ask your nephrologist to review each one. Many people are taking products that are silently stressing their kidneys without knowing it. Vitamins are medicines — treat them that way." },
    ],
  },
  {
    id: "accumulation", icon: "AlertTriangle", title: "Why Minerals Build Up, Not Reset Daily", subtitle: "The most important concept for understanding your labs and your food choices",
    content: [
      { h: "This changes how you should think about every food choice", p: "Most people assume nutrition works like calories - eat too much on Monday, your body processes it, and Tuesday starts fresh. For potassium, phosphorus, and sodium in CKD, this is NOT how it works. These minerals can accumulate across days when your damaged kidneys cannot clear them as fast as a healthy person's would. Understanding this changes everything about how you should approach limit foods." },
      { h: "Potassium - the real-time filter that falls behind", p: "Healthy kidneys filter potassium into urine essentially in real time, keeping blood levels in a tight normal range no matter what you eat. Damaged kidneys filter more slowly and less completely. When you eat a moderate-potassium food, your kidneys cannot clear it as fast as they should. If you eat cherries today, grapes tomorrow, and a potato the next day, the potassium load can compound - your blood levels rise, and rise again, because your kidneys never fully caught up from the day before. This is why your potassium lab number reflects accumulation over time, not just what you ate yesterday." },
      { h: "Phosphorus - the silent accumulator that damages bones and arteries", p: "Phosphorus buildup is arguably the most dangerous of the three because the damage happens silently, often with zero symptoms until it is advanced. When phosphorus accumulates in your blood (hyperphosphatemia), your body pulls calcium out of your bones to try to rebalance, weakening them over months and years. Excess phosphorus also binds with calcium and deposits in your blood vessels and heart tissue - a slow process called vascular calcification. This means phosphorus accumulation is actively hardening your arteries and thinning your bones in the background while you feel completely fine. This is why phosphorus additives in processed food (absorbed at 90 percent plus) are far more dangerous than natural phosphorus in whole foods (absorbed at 40-60 percent) - the accumulation happens faster with additives." },
      { h: "Sodium - accumulates through fluid, not blood concentration", p: "Sodium works differently. It does not build up in your bloodstream the way potassium and phosphorus do. Instead, excess sodium causes your body to retain water to dilute it - that retained fluid is what accumulates. Days of high sodium intake compound into rising blood pressure and fluid overload, which shows up as swelling in your ankles and feet, and excessive thirst. The reset for sodium is about giving your kidneys a chance to flush the retained fluid, which is harder for damaged kidneys to do than for healthy ones. This is why a single high-sodium meal does not just affect that day - the fluid retention can linger for days afterward." },
      { h: "This is why lab results matter more than any single meal", p: "Your blood potassium and phosphorus numbers reflect what is actually accumulating in your system over time, not just what you ate yesterday. A stable reading over months means your kidneys and your diet are keeping pace together. A rising trend means intake is outpacing what your kidneys can clear, regardless of which specific day caused it. This is exactly why the Lab Tracker in this app matters so much - trends over time tell the real story, not any single number." },
      { h: "What this means practically: space out your limit foods", p: "This is why the app frames higher-potassium items as occasional treats rather than daily foods. Cherries once this week, grapes another day, a small potato portion another time - spaced apart - gives your kidneys recovery time between mineral loads. Cherries every day, plus grapes every day, plus dark chocolate every day stacks the burden with no recovery window, even if each individual portion seems reasonable on its own. Spacing matters as much as portion size." },
      { h: "Related accumulation processes covered elsewhere in this app", p: "Several other substances follow this same buildup pattern rather than a daily reset. BUN (blood urea nitrogen) accumulates from protein waste - covered in the Understanding Your Lab Results module. Uric acid accumulates and drives gout risk, especially relevant for men - covered in the Men's Health module. Metabolic acidosis is a slow acid buildup process, not a daily reset - covered in the Acid, Alkaline & Your Kidneys module. All of these reinforce the same core principle: consistency and spacing matter more than any single day's choices." },
    ],
  },
  {
    id: "sodium", icon: "AlertTriangle", title: "Sodium & Your Kidneys", subtitle: "Why 2,000mg is your daily ceiling and how sodium accelerates CKD",
    content: [
      { h: "Sodium is worse than you think for CKD", p: "When you eat sodium, it increases sodium levels in your blood. Your body pulls water from cells into your bloodstream to dilute it, and triggers thirst so you drink more. This increases total blood volume. Healthy kidneys filter the excess out. Damaged kidneys cannot keep up. The fluid stays, blood volume stays elevated, and blood pressure rises. But it goes further — sodium also increases pressure inside your kidney filtering units, causing protein to leak into your urine. Proteinuria is a key marker of kidney damage. So sodium does not just raise your blood pressure — it directly damages your kidneys from the inside." },
      { h: "The cascade of damage", p: "High sodium intake causes endothelial dysfunction (damage to blood vessel walls), oxidative stress (cellular damage), increased inflammation, insulin resistance (worsens blood sugar control), and cardiac fibrosis (heart muscle stiffening). CKD patients are significantly more salt-sensitive than healthy people — the same amount of sodium causes a bigger blood pressure spike. And critically, high sodium reduces the effectiveness of ACE inhibitors and ARBs — the very medications your nephrologist prescribed to protect your kidneys. You could be taking the right medication and undermining it with every salty meal." },
      { h: "Your limit: less than 2,000mg per day", p: "The KDIGO 2024 guidelines recommend less than 2 grams (2,000mg) of sodium per day for people with CKD. That is about 5 grams of salt. The average American eats 3,400mg daily — nearly double the CKD limit. To put 2,000mg in perspective: one tablespoon of soy sauce has 900mg, one can of soup can have 800-1,200mg, one fast food sandwich can have 1,500mg. You could blow your entire daily budget in a single meal without realizing it. This is why cooking from scratch with clean spices is not optional for CKD — it is essential." },
      { h: "Where sodium hides", p: "Most dietary sodium does NOT come from the salt shaker. It comes from processed and packaged foods, canned soups, frozen meals, deli meats, cheeses, condiments (ketchup, mustard, soy sauce, salad dressings), bread (even a single slice can have 150-230mg), restaurant food (almost impossible to control sodium), and fast food. Even foods that do not taste salty can contain significant sodium — breakfast cereals, cottage cheese, and canned vegetables are common hidden sources." },
      { h: "How to stay under 2,000mg", p: "Cook at home as much as possible — this is the single most effective strategy. One smart trick: cook without salt entirely, then sprinkle a tiny pinch on top of already-plated food. When salt crystals hit your tongue first, you taste it more intensely but use far less — maybe 50-100mg instead of 300-500mg cooked in. It is the difference between tasting salt and eating salt. Use the DIY Seasoning Blends in this app instead of salt or commercial seasonings. Read every label (check sodium per serving AND the number of servings per container). Avoid canned foods (or rinse thoroughly to remove some sodium). Choose fresh or frozen vegetables over canned. Avoid deli meats and processed meats entirely. At restaurants, ask for no added salt and dressings on the side. Track your sodium for one week to see where you actually stand — most people are shocked. And always consult your nephrologist or renal dietitian for guidance specific to your stage and labs." },
    ],
  },
  {
    id: "alkaline", icon: "Zap", title: "Acid, Alkaline & Your Kidneys", subtitle: "Why pH balance matters for CKD — and what the wellness industry gets wrong",
    content: [
      { h: "This is real science, not a wellness fad", p: "Metabolic acidosis is a documented complication of CKD. Healthy kidneys maintain blood pH between 7.35 and 7.45 (slightly alkaline). As CKD progresses, your kidneys lose the ability to excrete acid properly. The acid builds up. If left untreated, metabolic acidosis accelerates CKD progression, promotes muscle wasting, causes bone demineralization, triggers insulin resistance, increases inflammation, and raises mortality risk. This is not theoretical — it is in the clinical guidelines." },
      { h: "Why vegetables protect your kidneys", p: "Research shows that dietary acid reduction with fruits and vegetables better prevents Stage 3 CKD from transitioning to Stage 4 than oral sodium bicarbonate alone. Eating more alkaline-producing foods — which are fruits and vegetables — literally slows CKD progression. The CKD-safe vegetables in your meal plan (cauliflower, cabbage, bell peppers, cucumbers, green beans, zucchini, arugula) and safe fruits (apples, blueberries, strawberries, pineapple) are alkaline-producing. Your plate should lean more toward vegetables than protein at every meal." },
      { h: "Acid-producing foods to balance", p: "Meat, cheese, eggs, grains, and processed foods are acid-producing. These are not bad — you need protein and carbs — but the balance matters. This is why your meal plan includes generous vegetable portions alongside moderate 3 oz protein servings. The ratio matters more than eliminating any single food. Think of your plate as two-thirds vegetables and one-third protein and starch." },
      { h: "What your nephrologist monitors", p: "Your blood work includes serum bicarbonate levels. If this drops below 22 mEq/L, it indicates metabolic acidosis. Your nephrologist may prescribe sodium bicarbonate supplements to correct it. Ask about your bicarbonate level at your next appointment. KDIGO 2024 recommends considering treatment when bicarbonate falls below 18 mmol/L." },
      { h: "The alkaline water and diet industry is misleading", p: "The wellness industry promotes alkaline water, alkaline diets, and alkaline supplements as cure-alls. The concept of maintaining pH balance is real for CKD — but their specific food recommendations are often dangerous. They recommend spinach, bananas, oranges, beets, and sweet potatoes — all very high in potassium and harmful for CKD. Your app teaches the RIGHT alkaline-producing foods that are actually safe for your kidneys. Do not follow generic alkaline diet advice without verifying it against CKD restrictions. Always consult your nephrologist." },
    ],
  },
  {
    id: "blood-pressure", icon: "Heart", title: "Blood Pressure & CKD", subtitle: "The most important number you need to understand and track",
    content: [
      { h: "Why blood pressure matters more for you", p: "High blood pressure is both the number one cause and a major consequence of CKD. Approximately 85-95 percent of CKD patients have hypertension. Here is the cycle: high blood pressure damages the tiny blood vessels in your kidneys, which worsens CKD. Damaged kidneys lose their ability to regulate fluid and sodium, which raises blood pressure further. Breaking this cycle is one of the most important things you can do to protect your remaining kidney function." },
      { h: "What the numbers mean", p: "Blood pressure is measured as two numbers — for example, 130/80. The TOP number (systolic) is the pressure when your heart beats and pushes blood out. The BOTTOM number (diastolic) is the pressure when your heart rests between beats. Both matter. For CKD patients, most nephrologists target below 130/80, but YOUR target may differ based on your stage, age, and medications. Ask your nephrologist what YOUR target numbers are." },
      { h: "How to take it correctly at home", p: "Sit quietly for 5 minutes before measuring — no talking, no phone. Use the correct cuff size (too small reads high, too large reads low). Rest your arm on a table at heart level — not dangling at your side. Keep feet flat on the floor, legs uncrossed. Take two readings one minute apart and average them. Measure at the same times daily — morning before medications and evening. A single reading means nothing. The TREND over days and weeks tells the real story." },
      { h: "What raises blood pressure", p: "Sodium is the biggest dietary driver — it causes your body to retain fluid, increasing blood volume and pressure. Stress and poor sleep raise cortisol, which raises blood pressure. Caffeine causes temporary spikes. Dehydration can paradoxically raise blood pressure as your body constricts blood vessels. Pain and NSAIDs (which CKD patients should avoid anyway) raise blood pressure. Being sedentary allows blood vessels to stiffen over time." },
      { h: "What lowers blood pressure naturally", p: "Regular moderate exercise (like this program) reduces blood pressure by 5-8 mmHg on average — equivalent to adding a medication. Reducing sodium intake directly lowers fluid retention. Adequate sleep allows blood pressure to reset overnight. Stress management lowers cortisol. Maintaining a healthy weight reduces the workload on your heart and blood vessels. Proper hydration helps your kidneys regulate fluid balance. These are all things your FitByChoice program addresses." },
      { h: "Blood pressure medications and CKD", p: "Many CKD patients take ACE inhibitors or ARBs — these medications lower blood pressure AND have a protective effect on your kidneys by reducing pressure inside the kidney filtering units. Do NOT stop or adjust these medications without your nephrologist approval, even if your blood pressure seems better from exercise and diet. Never skip your medication before a workout. If you feel dizzy or lightheaded during exercise, stop, sit down, hydrate, and check your blood pressure. Report this to your doctor." },
      { h: "Track your blood pressure", p: "Use the Blood Pressure tracker in this app to log your readings. Take measurements in the morning before medications and in the evening. Over time you will see patterns — how exercise affects your numbers, how sodium intake changes them, and whether your overall trend is moving in the right direction. Bring this data to every nephrologist appointment. Consistent home monitoring is more valuable than the single reading taken at the doctor office when you are already stressed." },
    ],
  },
  {
    id: "water-safety", icon: "Droplets", title: "Your Water: What's Really In That Bottle", subtitle: "The bottled water truth, which brands to avoid, and the best filters for CKD",
    content: [
      { h: "Most bottled water is tap water with additives", p: "Dasani (Coca-Cola) is municipal tap water purified by reverse osmosis, then they ADD BACK magnesium sulfate, potassium chloride, and salt. Potassium chloride — the same ingredient flagged as dangerous for CKD in salt substitutes — is in your water. Aquafina (PepsiCo) is also municipal tap water. SmartWater adds calcium chloride, magnesium chloride, and potassium bicarbonate. Nestle Pure Life adds calcium chloride, sodium bicarbonate, and magnesium sulfate. You are paying premium prices for reprocessed tap water with minerals your kidneys cannot handle, in plastic bottles averaging 325 microplastic particles per liter." },
      { h: "Bottled water to AVOID for CKD", p: "Dasani — contains potassium chloride, dangerous for CKD. SmartWater — contains potassium bicarbonate. Any alkaline water brand — added minerals to raise pH that your kidneys must process. Any mineral water — can contain very high sodium and potassium (we covered this in the beverage guide). Any electrolyte enhanced water — same problem as sports drinks. If the bottle says enhanced, fortified, electrolyte, alkaline, or mineral — read the ingredient list or skip it entirely." },
      { h: "Bottled water that is ACCEPTABLE if needed", p: "If you must buy bottled water, choose brands that are actual spring or artesian sources without added minerals: Poland Spring, Fiji, or Evian. These are not perfect — they still have the microplastic problem from plastic packaging — but they do not contain the added potassium chloride, sodium, and mineral additives that engineered waters do. However, the best option is always filtering your own water at home." },
      { h: "Best filter: Pitcher (affordable, no installation)", p: "The Culligan ZeroWater pitcher scored 9.33 out of 10 in independent lab testing, eliminating every health-related contaminant — performance comparable to reverse osmosis. About 35-40 dollars for the pitcher, approximately 15 dollars per replacement filter. This is your easiest starting point. Fill it with tap water, let it filter, drink clean water without the microplastics, additives, or markup of bottled water." },
      { h: "Best filter: Countertop (no installation, premium)", p: "The AquaTru Carafe scored 9.57 out of 10 — a countertop reverse osmosis system requiring no installation. It removed 100 percent of fluoride, uranium, copper, and chlorine and is certified for 83 contaminants. About 130-150 dollars upfront, filters last up to 2 years. No plumbing needed — sits on your counter and plugs in. Glass carafe, not plastic. Removes up to 97 percent of total dissolved solids including potassium and sodium. Also 4 times more efficient than under-sink RO systems, creating very little waste water. IMPORTANT: purchase the STANDARD version only. Do NOT get the Alkaline Mineral Boost version — it adds minerals back into the water after filtering, which defeats the purpose for CKD patients." },
      { h: "Best filter: Under-sink (permanent, best filtration)", p: "The iSpring RCC7AK features a 6-stage reverse osmosis filtration process that removes up to 99 percent of over 1,000 contaminants — specifically recommended for kidney health. The 6th stage adds alkaline remineralization, which slightly raises pH after filtration — supporting the acid-base balance that matters for CKD. The APEC ROES-50 received the highest overall rating in 2026 with nearly perfect contaminant removal scores. Both cost 150-200 dollars and require basic under-sink installation. These are the gold standard for CKD because reverse osmosis removes dissolved minerals like sodium and potassium that carbon filters leave behind." },
      { h: "Good mid-tier option: Aquasana", p: "Aquasana uses carbon and ion-exchange filtration — not reverse osmosis. It removes lead, mercury, chlorine, PFAS, pharmaceuticals, and pesticides effectively, and is NSF P473 certified. It does NOT remove dissolved minerals (sodium, potassium, fluoride) the way reverse osmosis does. For CKD patients, those dissolved minerals matter. However, Aquasana is more affordable (around 100 dollars), does not waste water like RO systems do, and is a legitimate choice if reverse osmosis is not in the budget. A good filter is always better than no filter. Discuss with your nephrologist which level of filtration is appropriate for your stage and labs." },
      { h: "The bottom line", p: "Stop paying for bottled tap water with added minerals your kidneys cannot process. Invest once in a quality filter and drink clean water from your own tap for pennies per gallon. A ZeroWater pitcher pays for itself in less than a month versus buying bottled water. Your kidneys will thank you. Always consult your nephrologist if you have specific fluid restrictions." },
    ],
  },
  {
    id: "smoothie-danger", icon: "AlertTriangle", title: "Why Juices & Smoothies Aren't Safe for CKD", subtitle: "The 'healthy' habit that can overwhelm your kidneys",
    content: [
      { h: "The concentration problem", p: "When you eat one apple, you get the potassium from one apple and your body absorbs it slowly because it has to break down the fiber first. When you blend 2-3 fruits into a smoothie, you consume all that potassium at once in liquid form — and your body absorbs it much faster. One glass can contain what your kidneys would normally process over an entire day. For CKD patients whose kidneys are already struggling to filter, this flood of minerals can push potassium to dangerous levels." },
      { h: "The 'healthy' smoothie trap", p: "The ingredients people put in healthy smoothies are the exact ones CKD patients need to limit: banana (very high potassium), spinach (very high potassium), mango (high potassium), orange juice (high potassium), yogurt (high phosphorus), protein powder (high phosphorus and additives). One green smoothie can contain 800-1,200mg of potassium in a single glass. For Stages 2-3, that could be half or more of your entire daily potassium budget consumed in 60 seconds. Always verify your personal limits with your nephrologist." },
      { h: "Fresh juices are even worse", p: "Juicing removes the fiber completely — which is the one thing that slows mineral absorption in a smoothie. What you are left with is pure concentrated mineral-heavy liquid. A glass of fresh celery-spinach-kale juice is a potassium bomb. Beet juice, carrot juice, tomato juice — all very high potassium with zero fiber to slow the absorption. The more someone tries to make their juice 'healthier' by adding greens and superfoods, the more dangerous it becomes for CKD." },
      { h: "The cruel irony", p: "The general wellness world promotes juicing and smoothies as the pinnacle of healthy living. For CKD patients, they can be one of the most dangerous dietary habits. Juice bars, detox cleanses (which we cover in another module), and social media smoothie trends are not designed with your kidneys in mind. What is healthy for someone with fully functioning kidneys can be harmful for you. This is not about deprivation — it is about knowing the difference." },
      { h: "The safe version (if you really want one)", p: "A small smoothie (8 oz maximum — not a 24 oz Jamba Juice) made ONLY from low-potassium fruits is manageable occasionally. Use: blueberries, strawberries, pineapple, or apple. Blend with water or a splash of unsweetened cranberry juice — not orange juice, not milk, not yogurt. No spinach, no banana, no mango, no protein powder, no superfood additives. Keep it simple and small." },
      { h: "Whole fruit is always better", p: "Eating the whole fruit is ALWAYS safer than blending or juicing it. The fiber slows mineral absorption and keeps you fuller longer. A cup of whole blueberries is safer than a blueberry smoothie because your body processes it more gradually. The bottom line for CKD: whole fruit in moderate portions beats smoothies, smoothies beat juices, and juices are the most concentrated and fastest-absorbing — the most risky form. Regardless of form, the INGREDIENTS determine safety more than anything. When in doubt, ask your nephrologist." },
    ],
  },
  {
    id: "snacks", icon: "Star", title: "10 CKD-Safe Snacks", subtitle: "Quick, satisfying options that will not stress your kidneys",
    content: [
      { h: "The snacking rule", p: "Snacking should be occasional, not constant. Every time you eat, insulin rises. If you genuinely need something between meals, choose from this list. These are all low potassium, low phosphorus, and low sodium. Protein or fat based snacks produce a gentler insulin response than processed carbs. Always verify with your nephrologist or renal dietitian based on your individual labs." },
      { h: "1. Apple slices with cinnamon", p: "Low potassium, low phosphorus. The cinnamon adds sweetness without sugar. One small apple or half a medium. One of the safest CKD fruits." },
      { h: "2. Unsalted crackers with cream cheese", p: "Premium Unsalted Tops or Lundberg Thin Stackers with 1-2 tablespoons of Tillamook or Organic Valley cream cheese. Crunchy, creamy, satisfying." },
      { h: "3. Fresh blueberries", p: "Up to 1 cup. One of the top 5 most antioxidant-rich foods on earth. Low potassium, low phosphorus, naturally sweet." },
      { h: "4. Air-popped popcorn with DIY seasoning", p: "Pop plain kernels, drizzle with olive oil, sprinkle your All-Purpose or Smoky Cajun blend. Crunchy, savory, low potassium, low phosphorus. No microwave popcorn — those bags are loaded with sodium and chemicals." },
      { h: "5. Cucumber slices with cream cheese and dill", p: "Hydrating, crisp, and kidney-safe. Cucumbers are 96 percent water and very low in everything your kidneys worry about. Eat as much as you want." },
      { h: "6. Frozen strawberries or pineapple chunks", p: "Straight from the freezer — natural sweet treat. No added sugar needed. Freezing makes them feel like dessert." },
      { h: "7. Bell pepper strips with cream cheese", p: "Crunchy, more Vitamin C than oranges, and kidney-safe. Dip in 1-2 tablespoons of cream cheese." },
      { h: "8. Hard-boiled egg", p: "Pure protein, portable, filling. One whole egg is fine. Prep a few on Sunday for the week." },
      { h: "9. Homemade tortilla chips", p: "Cut Rise and Puff or Tortillaland tortillas into triangles, brush with olive oil and garlic powder, bake at 375 for 8 minutes. Crispier and cleaner than anything in a bag." },
      { h: "10. Unsalted rice cakes", p: "Light, crunchy, low in everything. Top with cream cheese and a few blueberries for a mini snack plate." },
    ],
  },
  {
    id: "know-produce", icon: "Eye", title: "Know Your Produce", subtitle: "Visual guide to avoid grabbing the wrong green at the store",
    headerImage: "/produce/produce-header.jpg",
    content: [
      { h: "Why this matters", p: "Arugula and watercress look similar in a bagged mix or under grocery store lighting, but they are nutritionally different for CKD. Arugula is one of your safest daily greens. Watercress runs higher in potassium and should be used more sparingly. A quick glance is not enough - knowing the visual difference protects your diet." },
      { h: "Arugula - the safer daily choice", p: "Look for flat, deeply jagged, oak-leaf shaped leaves - almost like a dandelion leaf. Medium-dark green, single leaves usually sold loose in a clamshell or bag. Low potassium, low phosphorus. This is your everyday salad green in the meal plan.", image: "/produce/arugula.jpg", caption: "Arugula - jagged, flat leaves" },
      { h: "Watercress - use more sparingly", p: "Look for small, round, smooth leaflets clustered along thin, visible stems - more delicate and rounded than arugula's jagged single leaves. Often sold in bunches with the stems clearly showing, like a small bouquet. Moderate-to-higher potassium than arugula.", image: "/produce/watercress.jpg", caption: "Watercress - round leaflets on visible stems. Photo by Polina Tankilevitch via Pexels" },
      { h: "At the store", p: "If the stems are thin and visible with small round leaflets attached along them - that is watercress. If the leaves are flat, jagged, and attached individually with no visible stem cluster - that is arugula. When in doubt, ask the produce staff or check the sign/label directly rather than guessing." },
    ],
  },
  {
    id: "sweets", icon: "Heart", title: "Sweets & Treats: The CKD-Safe Guide", subtitle: "What you CAN enjoy, what to avoid, and quick homemade treats",
    content: [
      { h: "You can still enjoy sweets — here's how", p: "Living with CKD does not mean giving up everything you love. It means knowing which treats are safer and which ones are hiding potassium, phosphorus, and chemicals your kidneys cannot handle. This guide gives you the honest breakdown and homemade alternatives that satisfy the craving without stressing your kidneys. Always verify with your nephrologist or renal dietitian based on your individual labs." },
      { h: "Chocolate — the truth", p: "Dark chocolate is the worst for CKD despite being 'healthiest' in general — very high in potassium (228mg per ounce) and phosphorus (59mg per ounce). Milk chocolate is moderate. White chocolate is actually the safest option because it contains no cocoa solids, which is where all the potassium and phosphorus hide. The smart move: choose chocolate-COATED or chocolate-DIPPED rather than solid chocolate. A couple chocolate-dipped strawberries uses a fraction of the chocolate in a candy bar but satisfies the craving. Avoid completely: anything with nuts — Snickers, Reese's, M&Ms Peanut, Almond Joy, Payday — double hit of phosphorus and potassium." },
      { h: "Gummy & hard candy — safer options", p: "Regular gummy candy is actually one of the safer CKD options. Gummy bears, jelly beans, Skittles, Starburst, Dots, Jolly Ranchers, Life Savers, lollipops, and candy corn are lower in potassium and phosphorus. Hard candy in general is the safest candy category — small portion, no minerals. NEVER buy sugar-free versions — erythritol, maltitol, and sorbitol are dangerous for CKD (see The Healthy Label Trap module). Enjoy regular versions in moderation." },
      { h: "Chips — what to reach for", p: "Potato chips are the worst — high potassium from potatoes plus high sodium. Skip them. Air-popped popcorn seasoned with your DIY blends (All-Purpose or Smoky Cajun) is a great CKD-safe alternative — low potassium, low phosphorus, and you control the sodium. Rice cakes and rice crackers (Lundberg Thin Stackers) are also safer. If you want a crunch, bake thin white tortilla strips (Rise and Puff or Tortillaland) with olive oil and garlic powder for 8 minutes — homemade tortilla chips, zero additives." },
      { h: "Cakes & baked goods", p: "Angel food cake is one of the safest — made from egg whites, sugar, and white flour. No butter, no dairy, no nuts. Simple white cake with minimal frosting beats any 'healthy' whole grain brownie for CKD. Avoid: carrot cake (potassium from carrots, phosphorus from nuts), chocolate cake (potassium and phosphorus from cocoa), banana bread (high potassium), and cheesecake (high phosphorus from heavy dairy). For homemade baking, use white flour, sugar, egg whites, butter, and vanilla — simple and safe." },
      { h: "Ice cream alternatives", p: "Regular ice cream is high in phosphorus from dairy. Sorbet and Italian ice made from low-potassium fruits (apple, berry, pineapple — not banana, mango, or orange) are safer alternatives. Frozen fruit bars from safe fruits work too. But the best option is making your own frozen treats — see the recipes below. They take under 5 minutes and taste better than store-bought." },
      { h: "Homemade frozen treats", p: "Making your own frozen treats takes under 3 minutes and tastes better than store-bought. See the DIY Frozen Treats module for 5 quick recipes using CKD-safe fruits and cream cheese as the creamy base." },
    ],
  },
  {
    id: "diy-frozen", icon: "Star", title: "DIY Frozen Treats", subtitle: "5 CKD-safe ice cream alternatives — under 3 minutes each",
    content: [
      { h: "Why make your own", p: "Regular ice cream is high in phosphorus from dairy. Store-bought sorbet often has additives and high-potassium fruits. Making your own takes under 3 minutes, uses 2-4 ingredients you already have, and you control everything. The secret to creamy texture: cream cheese (Tillamook or Organic Valley). It is lower in phosphorus than milk, heavy cream, or yogurt, blends smooth, and a small amount goes a long way. Do NOT use regular ice cream, heavy cream, condensed milk, or yogurt — all higher in phosphorus. Always verify ingredients with your nephrologist." },
      { h: "Blueberry Vanilla Soft-Serve (3 min)", p: "1 cup frozen blueberries + 2 tbsp cream cheese (Tillamook or Organic Valley) + ½ tsp vanilla extract. Blend until smooth and thick. Eat immediately for soft-serve texture, or freeze 20 minutes for firmer scoop." },
      { h: "Pineapple Cream (3 min)", p: "1 cup frozen pineapple chunks + 2 tbsp cream cheese (Tillamook or Organic Valley) + ½ tsp vanilla extract. Blend until smooth. Tropical, creamy, refreshing. No added sugar needed — pineapple is naturally sweet and CKD-safe." },
      { h: "Strawberry Lemon Ice (2 min)", p: "1 cup frozen strawberries + 1 tbsp fresh lemon juice + 2 tbsp water. Blend until smooth. Light, tangy, refreshing — more like Italian ice than ice cream. Add a pinch of cinnamon for warmth. No dairy needed." },
      { h: "Apple Cinnamon Frozen Cream (3 min)", p: "1 cup frozen apple chunks + 2 tbsp cream cheese (Tillamook or Organic Valley) + ½ tsp cinnamon + ½ tsp vanilla extract. Blend until smooth. Tastes like apple pie in frozen form." },
      { h: "Mixed Berry Swirl (3 min)", p: "½ cup frozen blueberries + ½ cup frozen strawberries + 2 tbsp cream cheese (Tillamook or Organic Valley) + ½ tsp vanilla extract. Blend until smooth. Rich, creamy, antioxidant-packed." },
      { h: "Mexican Hot Chocolate Freeze (3 min)", p: "2 tbsp cream cheese (Tillamook or Organic Valley) + 1 tsp unsweetened cocoa powder (just 1 tsp keeps potassium and phosphorus low) + pinch of cinnamon + tiny pinch of cayenne + ½ tsp vanilla extract + 1 tsp Kahlúa (optional — adds flavor, negligible alcohol) + ½ cup ice. Blend until smooth. Warm-spicy-chocolate flavor in a CKD-safer version. Skip the heavy cream and milk that traditional recipes use." },
    ],
  },
  {
    id: "diy-baked", icon: "Star", title: "DIY Chips, Cookies & Donuts", subtitle: "Homemade versions of your favorite snacks — CKD-safe, no additives",
    content: [
      { h: "Why homemade wins here", p: "Store-bought chips, cookies, and donuts are loaded with sodium, phosphorus additives, preservatives, and hydrogenated oils. These homemade versions use simple, whole ingredients you control completely. Always verify with your nephrologist or renal dietitian based on your individual labs." },
      { h: "Homemade Tortilla Chips (10 min)", p: "Cut 2 Rise and Puff or Tortillaland flour tortillas into triangles. Brush lightly with olive oil, sprinkle with garlic powder and a pinch of your DIY seasoning blend. Bake at 375°F for 8-10 minutes until crisp. Zero sodium additives, zero preservatives, crispier than anything from a bag." },
      { h: "Homemade Rice Chips (12 min)", p: "Take leftover cooked white rice, press into a thin layer on parchment paper, brush with olive oil, sprinkle black pepper and garlic powder. Bake at 400°F for 12-15 minutes until crisp and golden. Break into chip-sized pieces. A creative way to use leftover rice into a crunchy snack." },
      { h: "Simple Sugar Cookies (20 min)", p: "1 cup white flour + ¼ cup sugar + 6 tbsp softened butter + 1 egg white + ½ tsp vanilla + ¼ tsp baking powder. Mix, form into small balls, flatten slightly, bake at 350°F for 10-12 minutes. Basic ingredients, no phosphorus additives, no preservatives. Add cinnamon or a few mashed blueberries for variety." },
      { h: "Apple Cinnamon Cookies (20 min)", p: "1 cup white flour + ¼ cup sugar + 6 tbsp softened butter + 1 egg white + ½ cup finely diced apple + 1 tsp cinnamon + ¼ tsp baking powder. Mix, drop by spoonfuls onto baking sheet, bake at 350°F for 12-14 minutes. Soft, warm, kidney-safe comfort cookie." },
      { h: "Baked Cinnamon Sugar Donuts (25 min)", p: "1 cup white flour + ¼ cup sugar + 1 egg white + ¼ cup unsweetened applesauce + ¼ cup milk substitute (unfortified almond milk) + 1 tsp baking powder + ½ tsp cinnamon + 2 tbsp melted butter. Mix into batter, pour into a donut pan, bake at 350°F for 12-15 minutes. While warm, brush with melted butter and dip in cinnamon sugar. Baked not fried — no phosphorus-laden frying oils, no preservatives." },
      { h: "Simple White Glaze (for donuts or cookies)", p: "½ cup powdered sugar + 1-2 tsp water or fresh lemon juice + ¼ tsp vanilla. Whisk until smooth. Drizzle over cooled baked goods. Clean, simple, no artificial colors or flavors." },
      { h: "Storage tip", p: "Baked goods keep 3-4 days in an airtight container at room temperature, or freeze extras for up to 2 months. Bake once on Sunday and portion out treats through the week instead of buying processed snacks." },
    ],
  },
  {
    id: "diy-sausage", icon: "Star", title: "DIY Breakfast Sausage", subtitle: "Two zero-sodium versions - savory herb and maple-sage",
    content: [
      { h: "Why homemade wins here", p: "This recipe replaces Jimmy Dean Original Pork Sausage, Bob Evans Original Sausage, and Johnsonville Original Breakfast Sausage - all of which put salt in the first two or three ingredients plus preservatives like BHA/BHT, with 340-450mg sodium per serving. Your homemade version has zero added sodium - only what is naturally in the turkey itself." },
      { h: "Savory Herb Version (per 1 lb ground turkey)", p: "1 lb ground turkey | 1 tsp sage | ½ tsp thyme | ½ tsp garlic powder | ½ tsp onion powder | ½ tsp smoked paprika | ¼ tsp black pepper | optional pinch of cayenne for heat. Mix all seasonings into the ground turkey by hand until evenly combined. Form into 2-3 oz patties." },
      { h: "Maple-Sage Version (per 1 lb ground turkey)", p: "1 lb ground turkey | 1 tsp sage | ½ tsp black pepper | 1-2 tsp pure maple syrup | ¼ tsp cinnamon | pinch of nutmeg. This version leans sweet-savory, like a diner-style maple sausage link. Maple syrup is low potassium (about 40mg per tablespoon) so 1-2 teaspoons across a full pound is well within safe range. Mix all ingredients by hand, form into patties." },
      { h: "Optional umami boosters (either version)", p: "For extra savory depth without sodium: add ½ tsp nutritional yeast (genuinely savory, cheese-like flavor, very low sodium and potassium in small amounts) or a splash of plain apple cider vinegar (adds brightness that makes other flavors pop, zero sodium). Both are optional - the base recipe is flavorful without them. Avoid Worcestershire sauce, even reduced-sodium versions, as it still carries meaningful sodium." },
      { h: "A note on salt", p: "This recipe intentionally contains no added salt. If you want a touch after cooking, use the sprinkle-on-top technique from the Sodium module - a tiny pinch directly on the cooked patty right before eating, not mixed into the raw meat. That way you control the exact amount per serving rather than baking sodium into the entire batch." },
      { h: "Cooking", p: "Heat 1 tsp olive oil in a pan over medium heat. Cook patties 4-5 minutes per side until browned and internal temperature reaches 165°F." },
      { h: "Batch prep and freezing", p: "Mix your full batch, form into 2-3 oz patties, and lay them flat on a parchment-lined tray without touching. Freeze flat for 1-2 hours to flash-freeze each patty individually. Once firm, wrap each patty individually in parchment paper, twisting the ends. Store all wrapped patties together in a freezer bag or airtight container, labeled with the date. Keeps well in the freezer for about 3 months. Cook from frozen (6-7 minutes per side) or thaw overnight in the fridge first (4-5 minutes per side)." },
    ],
  },
  {
    id: "diy-dressings", icon: "Star", title: "DIY Salad Dressings", subtitle: "5 kidney-safe dressings — under 3 minutes, zero additives",
    content: [
      { h: "Why store-bought dressings are a problem", p: "Even the 'healthy' dressings at places like Whole Foods and Trader Joe's are loaded with sodium (300-400mg per serving), soybean or canola oil, sugar, 'natural flavors,' and preservatives. Some contain phosphorus-based emulsifiers and potassium additives. For CKD patients, a single salad can go from kidney-safe to kidney-stressing just from the dressing. Making your own takes 2-3 minutes, uses ingredients you already have, and tastes better. Always consult your nephrologist or renal dietitian about your specific dietary needs." },
      { h: "Classic Lemon Vinaigrette (2 min)", p: "3 tbsp olive oil + 1 tbsp fresh lemon juice + 1 small clove garlic (minced or ¼ tsp garlic powder) + pinch of black pepper + pinch of dried oregano. Shake in a small jar or whisk in a bowl. Store in fridge up to 5 days. This is your everyday go-to — works on any salad, drizzled on chicken, or over roasted vegetables." },
      { h: "Apple Cider Vinaigrette (2 min)", p: "3 tbsp olive oil + 1 tbsp apple cider vinegar + ¼ tsp garlic powder + ¼ tsp dried thyme + black pepper to taste. Shake in a jar. Slightly tangy and warm — great on cabbage slaws and arugula salads. Apple cider vinegar also supports digestion." },
      { h: "Creamy Garlic Dressing (3 min)", p: "2 tbsp cream cheese (Tillamook or Organic Valley) + 1 tbsp fresh lemon juice + 1 tbsp water (to thin) + ¼ tsp garlic powder + ¼ tsp dried dill + black pepper. Mix with a fork until smooth. Creamy, satisfying, and tastes like ranch without the sodium, preservatives, and buttermilk. Keeps 3 days in fridge." },
      { h: "Herb Italian Dressing (2 min)", p: "3 tbsp olive oil + 1 tbsp red wine vinegar + ¼ tsp garlic powder + ¼ tsp dried basil + ¼ tsp dried oregano + pinch of black pepper. Shake well. Classic Italian flavor without the 400mg of sodium in store-bought versions. Perfect on romaine, cucumber, and bell pepper salads." },
      { h: "Smoky Lime Dressing (2 min)", p: "3 tbsp olive oil + 1 tbsp fresh lime juice + ¼ tsp smoked paprika + ¼ tsp garlic powder + ¼ tsp cumin + black pepper to taste. Shake in a jar. Warm, smoky, slightly tangy — great on arugula, cabbage, and grilled chicken salads. This is your CKD-safe chipotle-lime without the sodium." },
      { h: "Cucumber Dill Dressing (3 min)", p: "2 tbsp olive oil + 1 tbsp lemon juice + 2 tbsp finely diced cucumber + ¼ tsp dried dill (or 1 tsp fresh dill) + black pepper. Mix together. Light, refreshing, and hydrating — the cucumber adds water content and crunch. Pairs beautifully with fish dinners." },
      { h: "Storage tip", p: "Make a double batch on Sunday and store in small jars in the fridge. You have dressings for the whole week — no excuses to reach for a bottle. Glass jars work best. Shake before each use since oil and vinegar naturally separate." },
    ],
  },
  {
    id: "toxic-foods", icon: "AlertTriangle", title: "Foods That Are TOXIC to CKD Kidneys", subtitle: "Not just unhealthy — actually poisonous to compromised kidneys",
    content: [
      { h: "This is different from high potassium or high phosphorus", p: "Most foods we flag in this app are problematic because they contain too much of a mineral your kidneys struggle to clear. The foods in this module are different. These contain actual toxins, nephrotoxins, or neurotoxins that can cause acute kidney injury, brain damage, or death in people with CKD. This is the most important food safety information in the entire app." },
      { h: "STARFRUIT — never eat this. Ever.", p: "Starfruit contains a neurotoxin called caramboxin that healthy kidneys filter out. CKD kidneys cannot clear it. It accumulates in your blood, crosses the blood-brain barrier, and causes irreversible brain damage. A SINGLE starfruit can put a CKD patient in seizures within three hours, a coma, then death within three days. The first warning sign is uncontrollable hiccups. The first documented US death was reported in 2023 — a 74-year-old woman with CKD ate two starfruit and died despite emergency dialysis. Starfruit is the ONLY food that naturally contains caramboxin. Also avoid starfruit juice, starfruit-flavored drinks, and any tropical fruit mix that may contain starfruit. If you accidentally consume starfruit, go to the emergency room immediately." },
      { h: "RHUBARB — dangerous oxalate levels", p: "Rhubarb contains extremely high levels of oxalic acid. In CKD patients, this can cause acute oxalate nephropathy — direct kidney tissue damage from oxalate crystals depositing in your kidney tubules. This is not just about kidney stones. The oxalate crystals physically block and destroy the filtering structures in your kidneys. Avoid rhubarb entirely — fresh, cooked, in pies, in sauces, in juices." },
      { h: "NONI JUICE — marketed as a miracle, dangerous for CKD", p: "Noni juice is heavily marketed as a superfood with healing properties. For CKD patients, it is high in potassium AND has reports of direct liver and kidney toxicity. Multiple medical case reports document dangerously high potassium levels in CKD patients after drinking noni juice. Do not consume noni juice, noni supplements, or noni extract in any form." },
      { h: "REAL LICORICE ROOT — blood pressure crisis", p: "Real licorice (not artificial licorice flavoring) contains glycyrrhizin, which causes a condition called pseudoaldosteronism. This severely raises blood pressure and disrupts potassium regulation. Found in some herbal teas, natural candies, European black licorice, and supplements. A few weeks of regular consumption can cause hypertensive crisis in CKD patients. Check ingredient lists for licorice root, glycyrrhiza, or glycyrrhizin. Artificial licorice flavor (used in most American licorice candy) does not contain this compound and is not the same risk." },
      { h: "HIGH-OXALATE JUICES — acute kidney damage", p: "Spinach juice, beet juice, sorrel juice, and Swiss chard juice in concentrated form deliver massive oxalate loads that can cause acute oxalate nephropathy — even in people with only mild CKD. Eating a small portion of cooked spinach as a food is one thing. Drinking concentrated raw spinach juice is a completely different level of oxalate exposure. This connects directly to our module on why juices and smoothies are dangerous — the concentration effect turns a manageable food into a toxic dose." },
      { h: "If you experience symptoms after eating any food", p: "Uncontrollable hiccups, sudden confusion, agitation, muscle weakness, tremors, seizures, severe nausea or vomiting — go to the emergency room immediately and tell them you have CKD and what you consumed. Time matters with neurotoxin exposure. Do not wait to see if it passes. Always consult your nephrologist about any food you are unsure about." },
    ],
  },
  {
    id: "dangerous-combos", icon: "AlertTriangle", title: "Dangerous Food & Medication Combinations", subtitle: "When two safe-seeming things become genuinely risky together",
    content: [
      { h: "Why combinations matter more than single items", p: "Most CKD education focuses on individual foods. But some of the most serious risks come from COMBINING things that seem fine separately. Understanding these combinations can prevent a hospitalization." },
      { h: "NSAIDs plus dehydration", p: "Taking ibuprofen or naproxen while not drinking enough water dramatically increases acute kidney injury risk. The combination is far worse than either factor alone. If you must take an NSAID (which you generally should not with CKD — see Exercise Safety module), stay well hydrated and never take it on an empty, dehydrated system." },
      { h: "High protein plus low fluid intake", p: "A large protein meal without adequate water forces your kidneys to work harder clearing nitrogen waste with less fluid to do it. This is a common mistake with high-protein diets or oversized meat portions. Always pair protein-heavy meals with adequate water intake." },
      { h: "Salt substitutes plus blood pressure medication", p: "This combination is genuinely dangerous, not theoretical. ACE inhibitors and ARBs (common CKD blood pressure medications) already raise potassium slightly as part of how they protect your kidneys. Adding a potassium chloride salt substitute on top can push potassium to dangerous, hospitalization-level heights. Never use potassium-based salt substitutes without your nephrologist explicitly clearing it against your current medications." },
      { h: "Grapefruit plus certain medications", p: "Grapefruit interferes with how your liver processes many CKD-relevant medications — including some calcium channel blockers and statins — causing the drug to build up to dangerous levels in your blood. Always ask your pharmacist about grapefruit interactions with every medication you take, including new prescriptions." },
      { h: "Alcohol plus NSAIDs", p: "Both stress the kidneys independently. Together, the risk compounds significantly beyond simple addition. Avoid combining them entirely." },
      { h: "High-oxalate foods plus vitamin C supplements", p: "Vitamin C converts to oxalate in your body. Combining oxalate-rich foods (spinach, rhubarb, beets) with vitamin C supplementation increases kidney stone risk and oxalate burden more than either factor alone. This is why we flagged high-dose vitamin C supplements as unsafe in the Vitamins module." },
      { h: "Multiple servings of dark cola in one sitting", p: "The phosphoric acid absorption compounds with volume. Most people underestimate how much they consume when it feels like just soda. Two or more servings in one sitting delivers a much larger phosphorus load than the per-serving numbers suggest." },
      { h: "Protein supplements plus already high-protein meals", p: "Stacking a protein shake on top of a high-protein dinner can push daily intake well past what your kidneys should process at Stages 2-4. Always account for your TOTAL daily protein, not just what is in front of you at each meal." },
      { h: "The takeaway", p: "Individual foods matter, but combinations matter just as much. When in doubt about how two things interact — a food and a medication, two medications, or two foods — ask your nephrologist or pharmacist before combining them regularly." },
    ],
  },
  {
    id: "detox-dangers", icon: "AlertTriangle", title: "Detoxes, Cleanses & Herbal Supplements", subtitle: "Why 'kidney cleanses' are the most dangerous myth in CKD",
    content: [
      { h: "Your kidneys ARE your detox system", p: "The concept of 'detoxing your kidneys' is fundamentally flawed. Your kidneys filter 200 liters of blood every day, removing waste and toxins through urine. You cannot 'cleanse' your cleansing system with a tea or a supplement. The National Kidney Foundation says it directly: avoid teas and supplements marketed as a 'kidney detox' or 'kidney cleanse.' There is limited evidence they work, and some ingredients can interact with medications or directly damage your kidneys." },
      { h: "Soursop (Graviola) — not safe for CKD", p: "Social media is flooded with claims that soursop cures cancer and reverses kidney disease. Cancer Research UK states that graviola may cause damage to your kidneys and liver if taken frequently. Research shows it can be nephrotoxic at high doses. For CKD patients whose kidneys are already compromised, the risk far outweighs any theoretical benefit from animal studies. Soursop is also high in potassium — the exact mineral you are trying to limit. Do not use soursop supplements, teas, or concentrated extracts without explicit approval from your nephrologist." },
      { h: "Senna and 'detox' teas — dangerous", p: "Senna is a laxative herb found in most detox teas — Smooth Move, flat tummy teas, and dozens of social media-promoted cleanses. It causes severe electrolyte imbalances, especially potassium disruption. For CKD patients, ANY electrolyte disruption is dangerous and can cause heart problems. Chronic senna use has been linked to kidney damage even in people with healthy kidneys. If a tea is marketed as a 'detox,' 'cleanse,' or 'flush,' assume it is unsafe until your nephrologist says otherwise." },
      { h: "The detox industry targets CKD patients", p: "People with CKD are targeted by kidney detox teas, multi-ingredient liver-kidney cleanse supplements, social media CKD reversal programs, and online success stories designed to sell products. They prey on fear and desperation. Someone diagnosed with Stage 3 goes to Google, sees 'reverse your kidney disease with this cleanse,' and buys pills that could cause acute kidney injury. The FDA does NOT regulate herbal supplements for dose, content, or purity. You are responsible for knowing what you put in your body." },
      { h: "Herbs known to be dangerous for CKD", p: "The National Kidney Foundation maintains a list of 37 herbs potentially harmful for CKD. These include: aloe vera (internal use), astragalus, cats claw, comfrey, dandelion (supplement form), horsetail, licorice root, nettle (supplement form), parsley (supplement form — small amounts in cooking are fine), pennyroyal, wormwood, and yohimbe. Even herbs considered safe for healthy people can overwhelm damaged kidneys. Never start any herbal supplement without consulting your nephrologist first — even if it says 'natural' or 'organic' on the label." },
      { h: "The only evidence-based 'detox' for CKD", p: "The National Kidney Foundation recommends: instead of a detox or cleanse, focus on eating a healthy diet, exercising regularly, staying properly hydrated, and if you smoke — stop. That is the only proven approach. No pill, tea, supplement, or cleanse has been shown to improve kidney function in CKD patients. What HAS been shown to help: regular moderate exercise (like this program), kidney-safe nutrition (like these meal plans), proper hydration, blood pressure management, and working closely with your nephrologist. Your app IS the detox." },
    ],
  },
  {
    id: "exercise-safety", icon: "Shield", title: "Exercise Safety for CKD", subtitle: "Critical precautions before you work out",
    content: [
      { h: "NEVER take NSAIDs for soreness", p: "This might be the most important thing in this entire app. Ibuprofen (Advil, Motrin), naproxen (Aleve), and aspirin are called NSAIDs. Most people pop them like candy for muscle soreness after workouts. For CKD patients, NSAIDs can cause acute kidney injury and accelerate kidney damage — even a few doses. If you're sore after a workout, use acetaminophen (Tylenol) instead — it does not reduce kidney blood flow like NSAIDs. However, if you have liver disease, check with your doctor first, and never exceed the recommended dose, apply ice, stretch, and rest. Always confirm with your nephrologist which pain relievers are safe for you." },
      { h: "NEVER take creatine supplements", p: "Creatine supplements are everywhere in the fitness world. For CKD patients, they are dangerous. Creatine supplements flood your body with extra creatine, which breaks down into creatinine — the exact waste product your damaged kidneys are already struggling to filter. Taking creatine supplements can spike your creatinine levels, mask your true kidney function on lab tests, and potentially accelerate kidney damage. You do not need supplements to build muscle. Your program and your meals give you everything you need." },
      { h: "Be careful with protein supplements", p: "Protein shakes and powders are popular in fitness. But many contain phosphorus additives, artificial sweeteners, and more protein per serving than a CKD patient should consume at once. Excess protein stresses the kidneys. Get your protein from real food in the portions your meal plan recommends (3-4 oz per meal). If you want a supplement, talk to your nephrologist or a renal dietitian first." },
      { h: "When to STOP exercising immediately", p: "Stop and rest if you experience: chest pain or tightness, severe shortness of breath that doesn't improve with rest, dizziness or lightheadedness, unusual or sudden swelling in your legs or feet, heart pounding or racing irregularly, nausea or vomiting, or sharp pain anywhere (versus normal muscle fatigue). If symptoms don't resolve with rest, call your doctor or 911." },
      { h: "The blood pressure myth — debunked", p: "The old advice was 'don\'t exercise if you have high blood pressure.' That\'s been completely reversed by modern medicine. Not exercising with high blood pressure is MORE dangerous than exercising with it. The American Heart Association, the National Kidney Foundation, and every major medical body now recommends regular moderate exercise as a treatment for high blood pressure. Here\'s why: after you finish exercising, your blood pressure drops BELOW your normal baseline — this is called post-exercise hypotension, and it lasts 12-24 hours. Over weeks of consistent exercise, your resting blood pressure decreases permanently. Studies show 5-8 mmHg reduction — that\'s equivalent to adding a medication, without the side effects." },
      { h: "Exercising safely with high blood pressure", p: "Check your blood pressure before starting. If it\'s above 180/110, skip that session and call your doctor. Ask your nephrologist what your personal threshold should be. Below that, you\'re clear for moderate exercise. Never hold your breath during a lift — exhale on effort, inhale on return. Stay at moderate intensity — you should be able to hold a conversation while exercising. If you\'re gasping, you\'re pushing too hard. Don\'t stop suddenly — cool down gradually to prevent blood pressure from dropping too fast. Stay on your blood pressure medication — exercise works WITH your meds, not instead of them. Never stop medication because you feel better." },
      { h: "Why 150 minutes per week", p: "Research shows at least 150 minutes per week of moderate-intensity activity provides the most benefit for CKD patients. Your program delivers exactly that: three 30-minute sessions per week. That\'s 5 minutes of warm-up, 20 minutes of strength training, and 5 minutes of cool-down. Short enough that fatigue doesn\'t become dangerous, long enough to build real muscle, improve insulin sensitivity, lower blood pressure, and protect your kidneys. You don\'t need hour-long gym sessions. You need consistency." },
      { h: "Muscle soreness vs. kidney pain", p: "New exercisers sometimes confuse lower back muscle soreness with kidney pain. Here's the difference: muscle soreness is typically on both sides, feels like a dull ache that gets better with movement and stretching, and peaks 24-48 hours after exercise. Kidney pain is usually one-sided, deeper, doesn't change with movement, and may come with fever, changes in urination, or nausea. If you're unsure, contact your doctor — don't guess." },
      { h: "Hydration during exercise", p: "Sip water throughout your workout — don't wait until you're thirsty. But don't overdo it either. For a 25-minute session, 8-12 oz of water during the workout is generally fine for Stages 2-3. If you have fluid restrictions, follow your nephrologist's guidance. Watch for dark urine after exercise — that means you need more water next time." },
    ],
  },
];

const EXPECT = [
  { week: 1, title: "Getting Started", body: "You might feel sore in places you forgot existed. That's normal. Your muscles are waking up. Energy may dip slightly as your body adjusts. Drink your water. Trust the process." },
  { week: 2, title: "Finding Your Rhythm", body: "Soreness decreases. Movements start feeling more natural. You might notice slightly better sleep. Your body is adapting to the new routine." },
  { week: 3, title: "First Signs", body: "Energy starts improving. You may feel stronger during daily activities — carrying groceries, climbing stairs. Clothes might feel slightly different. Keep going." },
  { week: 4, title: "Halfway There", body: "Visible changes beginning. Arms may look more defined. Posture improves. You're sleeping better. Your body is building real muscle tissue now." },
  { week: 5, title: "Others Start Noticing", body: "This is typically when someone says 'you look different.' Shape is changing. Belly may feel firmer. Confidence is building alongside strength." },
  { week: 6, title: "Momentum", body: "Weights that felt heavy in Week 1 now feel manageable. You're ready for the next progression. Energy levels noticeably higher throughout the day." },
  { week: 7, title: "Transformation", body: "Muscle definition visible. Strength measurably improved. Labs may show positive trends. You're not the same person who started this program." },
  { week: 8, title: "Foundation Complete", body: "You've built the base. Strength, endurance, and habits are established. Your body has changed. Now you're ready for Phase 2: Build." },
];

// ─── HELPER COMPONENTS ──────────────────────────────────────────────
const Pill = ({ label, color = C.primary }) => (
  <span style={{ fontSize: 11, fontWeight: 600, color, background: color + "18", padding: "3px 10px", borderRadius: 12 }}>{label}</span>
);

const SafetyBadge = ({ level }) => {
  const map = { low: { label: "Low", color: C.green }, mod: { label: "Mod", color: C.secondary }, high: { label: "High", color: C.red }, varies: { label: "Varies", color: C.textMid } };
  const d = map[level] || map.low;
  return <span style={{ fontSize: 10, fontWeight: 700, color: d.color, background: d.color + "18", padding: "2px 7px", borderRadius: 8 }}>{d.label}</span>;
};

const Card = ({ children, onClick, style = {} }) => (
  <div onClick={onClick} style={{ background: C.card, borderRadius: 14, padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", cursor: onClick ? "pointer" : "default", ...style }}>
    {children}
  </div>
);

const Btn = ({ children, onClick, secondary, full, style = {} }) => (
  <button onClick={onClick} style={{
    background: secondary ? "transparent" : C.secondary, color: secondary ? C.primary : C.dark,
    border: secondary ? `1.5px solid ${C.primary}` : "none", borderRadius: 10, padding: "14px 28px",
    fontSize: 15, fontWeight: 600, fontFamily: font.body, cursor: "pointer", width: full ? "100%" : "auto",
    letterSpacing: "0.01em", ...style
  }}>{children}</button>
);

const SectionTitle = ({ children, sub }) => (
  <div style={{ marginBottom: 16 }}>
    <h2 style={{ fontFamily: font.display, fontSize: 22, fontWeight: 600, color: C.dark, margin: 0, letterSpacing: "-0.02em" }}>{children}</h2>
    {sub && <p style={{ fontSize: 13, color: C.textMid, margin: "2px 0 0", lineHeight: 1.4 }}>{sub}</p>}
  </div>
);

const BottomNav = ({ page, setPage, style = {} }) => {
  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "workouts", icon: Dumbbell, label: "Workouts" },
    { id: "meals", icon: UtensilsCrossed, label: "Meals" },
    { id: "learn", icon: BookOpen, label: "Learn" },
    { id: "track", icon: Activity, label: "Track" },
  ];
  return (
    <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: C.card, borderTop: `1px solid ${C.bg}`, display: "flex", zIndex: 100, paddingBottom: "env(safe-area-inset-bottom)", ...style }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => setPage(t.id)} style={{
          flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
          padding: "10px 0 8px", border: "none", background: "none", cursor: "pointer",
          color: page === t.id ? C.primary : C.textLight, fontFamily: font.body, fontSize: 10, fontWeight: 600,
        }}>
          <t.icon size={20} strokeWidth={page === t.id ? 2.5 : 1.5} />
          {t.label}
        </button>
      ))}
    </nav>
  );
};

const TopBar = ({ title, onBack, right }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px 12px", background: C.bg, position: "sticky", top: 0, zIndex: 50 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {onBack && <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: C.primary, padding: 4 }}><ChevronLeft size={22} /></button>}
      <span style={{ fontFamily: font.display, fontSize: 20, fontWeight: 600, color: C.dark, letterSpacing: "-0.02em" }}>{title}</span>
    </div>
    {right}
  </div>
);

// ─── PAGES ──────────────────────────────────────────────────────────

function WelcomePage({ onStart }) {
  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(160deg, ${C.dark} 0%, ${C.primary} 100%)`, display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px 28px" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ marginBottom: 32 }}>
          <span style={{ fontFamily: font.display, fontSize: 44, fontWeight: 700, color: "#FFF", letterSpacing: "-0.03em" }}>Fit</span>
          <span style={{ fontFamily: font.body, fontSize: 28, fontWeight: 300, color: C.secondary }}>By</span>
          <span style={{ fontFamily: font.display, fontSize: 44, fontWeight: 700, color: "#FFF", letterSpacing: "-0.03em" }}>Choice</span>
        </div>
        <p style={{ fontFamily: font.body, fontSize: 18, color: C.sagePale.replace("20", "CC"), lineHeight: 1.6, maxWidth: 320, margin: "0 auto 12px" }}>
          Take control of your kidney health.
        </p>
        <p style={{ fontFamily: font.body, fontSize: 15, color: C.sagePale.replace("20", "88"), lineHeight: 1.5, maxWidth: 300, margin: "0 auto 16px" }}>
          The first fitness & nutrition app built for people living with CKD. Exercise safely. Eat smart. Understand your body.
        </p>
        <p style={{ fontFamily: font.body, fontSize: 13, fontWeight: 600, color: C.secondary, letterSpacing: "0.05em", maxWidth: 300, margin: "0 auto 32px" }}>
          Built for men and women living with CKD — for dialysis prevention
        </p>
        <Btn onClick={onStart} full style={{ maxWidth: 300, margin: "0 auto", display: "block", padding: "16px 28px", fontSize: 16 }}>
          Start Your Free Week
        </Btn>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 16 }}>No credit card required</p>
      </div>
      <div style={{ textAlign: "center", marginTop: 60 }}>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}>
          Built by someone who lives it.<br />For everyone who does too.
        </p>
      </div>
    </div>
  );
}

function QuizPage({ onComplete }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);

  const current = QUIZ[step];
  const progress = ((step + 1) / QUIZ.length) * 100;

  const handleNext = () => {
    if (selected === null) return;
    const updated = { ...answers, [current.key]: selected };
    setAnswers(updated);
    setSelected(null);
    if (step < QUIZ.length - 1) setStep(step + 1);
    else onComplete(updated);
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, padding: "20px 20px 40px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        {step > 0 ? (
          <button onClick={() => { setStep(step - 1); setSelected(answers[QUIZ[step - 1].key] || null); }} style={{ background: "none", border: "none", cursor: "pointer", color: C.primary }}><ChevronLeft size={22} /></button>
        ) : <div style={{ width: 22 }} />}
        <span style={{ fontSize: 13, color: C.textMid, fontWeight: 500 }}>{step + 1} of {QUIZ.length}</span>
        <div style={{ width: 22 }} />
      </div>
      <div style={{ height: 4, background: C.primaryPale, borderRadius: 2, marginBottom: 32 }}>
        <div style={{ height: 4, background: C.primary, borderRadius: 2, width: `${progress}%`, transition: "width 0.3s" }} />
      </div>
      <h2 style={{ fontFamily: font.display, fontSize: 24, fontWeight: 600, color: C.dark, marginBottom: 24, letterSpacing: "-0.02em", lineHeight: 1.3 }}>{current.q}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {current.opts.map((opt, i) => {
          const isSelected = selected === opt;
          return (
            <button key={i} onClick={() => setSelected(opt)} style={{
              padding: "16px 18px", borderRadius: 12, border: `2px solid ${isSelected ? C.primary : "#E0E8E6"}`,
              background: isSelected ? C.primaryPale : C.card, textAlign: "left", cursor: "pointer",
              fontFamily: font.body, fontSize: 15, color: isSelected ? C.primary : C.dark, fontWeight: isSelected ? 600 : 400,
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              {opt}
              {isSelected && <Check size={18} color={C.primary} />}
            </button>
          );
        })}
      </div>
      <div style={{ marginTop: 32 }}>
        <Btn onClick={handleNext} full style={{ opacity: selected ? 1 : 0.4 }}>
          {step === QUIZ.length - 1 ? "See My Plan" : "Next"}
        </Btn>
      </div>
    </div>
  );
}

function DashboardPage({ user, setPage, setSubPage }) {
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = dayNames[new Date().getDay()];
  const todayWorkout = WORKOUTS.days[0]; // Always show next workout — program follows YOUR schedule, not the calendar
  const todayMeal = MEALS_CKD[0].find(m => m.day === today);
  const greeting = new Date().getHours() < 12 ? "Good morning" : new Date().getHours() < 17 ? "Good afternoon" : "Good evening";

  return (
    <div style={{ paddingBottom: 90 }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${C.dark}, ${C.primary})`, padding: "28px 20px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <div>
            <p style={{ fontSize: 14, color: C.sagePale.replace("20", "99"), margin: 0 }}>{greeting}</p>
            <div style={{ marginTop: 4 }}>
              <span style={{ fontFamily: font.display, fontSize: 28, fontWeight: 700, color: "#FFF", letterSpacing: "-0.03em" }}>Fit</span>
              <span style={{ fontFamily: font.body, fontSize: 18, fontWeight: 300, color: C.secondary }}>By</span>
              <span style={{ fontFamily: font.display, fontSize: 28, fontWeight: 700, color: "#FFF", letterSpacing: "-0.03em" }}>Choice</span>
            </div>
          </div>
          <div style={{ width: 40, height: 40, borderRadius: 20, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <User size={20} color="#FFF" />
          </div>
        </div>
        {/* Streak */}
        <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
          <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 10, padding: "10px 16px", display: "flex", alignItems: "center", gap: 8 }}>
            <Flame size={16} color={C.secondary} />
            <span style={{ color: "#FFF", fontSize: 13, fontWeight: 600 }}>3 Day Streak</span>
          </div>
          <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 10, padding: "10px 16px", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "#FFF", fontSize: 13, fontWeight: 500 }}>Phase 1 · Week 1</span>
          </div>
        </div>
      </div>

      <div style={{ padding: "20px 20px 0" }}>
        {/* What to Expect */}
        <Card style={{ marginBottom: 16, borderLeft: `4px solid ${C.secondary}` }}>
          <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: C.secondary, fontWeight: 600, margin: "0 0 6px" }}>Week 1: {EXPECT[0].title}</p>
          <p style={{ fontSize: 14, color: C.darkMuted, lineHeight: 1.6, margin: 0 }}>{EXPECT[0].body}</p>
        </Card>

        {/* Today's Workout */}
        <SectionTitle>Today's Workout</SectionTitle>
        <Card onClick={() => { setSubPage({ type: "workout", data: todayWorkout }); setPage("workouts"); }} style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: C.primary, fontWeight: 600, margin: 0 }}>
                  {todayWorkout.phase} · Day 1
                </p>
                <p style={{ fontFamily: font.display, fontSize: 18, fontWeight: 600, color: C.dark, margin: "4px 0 8px" }}>{todayWorkout.name}</p>
                <div style={{ display: "flex", gap: 12 }}>
                  <span style={{ fontSize: 12, color: C.textMid, display: "flex", alignItems: "center", gap: 4 }}><Clock size={12} /> {todayWorkout.duration}</span>
                  <span style={{ fontSize: 12, color: C.textMid }}>{todayWorkout.equipment}</span>
                </div>
              </div>
              <ChevronRight size={20} color={C.textLight} />
            </div>
          </Card>

        {/* Today's Meals */}
        <SectionTitle>Today's Meals</SectionTitle>
        {(todayMeal?.meals || MEALS_CKD[0][0].meals).map((m, i) => (
          <Card key={i} onClick={() => setPage("meals")} style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 4 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: C.primary, textTransform: "uppercase", letterSpacing: "0.1em" }}>{m.type}</span>
                  <Pill label="CKD-Friendly" color={C.sage} />
                </div>
                <p style={{ fontSize: 14, fontWeight: 500, color: C.dark, margin: 0 }}>{m.name}</p>
              </div>
              <ChevronRight size={18} color={C.textLight} />
            </div>
          </Card>
        ))}

        {/* Quick Actions */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 20, marginBottom: 20 }}>
          {[
            { label: "Food Lookup", icon: Search, pg: "meals", sub: "foodlookup" },
            { label: "Lab Tracker", icon: Activity, pg: "track", sub: "labs" },
            { label: "Log Symptoms", icon: Heart, pg: "track", sub: "symptoms" },
            { label: "Learn", icon: BookOpen, pg: "learn" },
          ].map(a => (
            <button key={a.label} onClick={() => { setPage(a.pg); if (a.sub) setSubPage({ type: a.sub }); }} style={{
              background: C.card, border: `1px solid ${C.bg}`, borderRadius: 12, padding: "16px 12px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}>
              <a.icon size={20} color={C.primary} />
              <span style={{ fontFamily: font.body, fontSize: 12, fontWeight: 600, color: C.dark }}>{a.label}</span>
            </button>
          ))}
        </div>

        {/* Disclaimer */}
        <div style={{ background: C.yellowPale, borderRadius: 10, padding: "12px 14px", marginBottom: 20 }}>
          <p style={{ fontSize: 11, color: C.darkMuted, margin: 0, lineHeight: 1.5 }}>
            <strong>Medical Disclaimer:</strong> FitByChoice is an educational wellness tool — not a substitute for medical advice. Always consult your nephrologist, renal dietitian, or healthcare provider before making changes to your exercise, diet, or medication. Your labs, your stage, and your individual health profile should guide every decision. When in doubt, ask your doctor first.
          </p>
        </div>
      </div>
    </div>
  );
}

function WorkoutsPage({ subPage, setSubPage }) {
  const [selectedWorkout, setSelectedWorkout] = useState(subPage?.data || null);
  const [expandedEx, setExpandedEx] = useState(null);
  const [showWarmup, setShowWarmup] = useState(false);
  const [showCooldown, setShowCooldown] = useState(false);
  const [activePhase, setActivePhase] = useState(0);

  if (selectedWorkout) {
    return (
      <div style={{ paddingBottom: 90 }}>
        <TopBar title={selectedWorkout.name} onBack={() => setSelectedWorkout(null)} />
        <div style={{ padding: "0 20px 20px" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <div style={{ flex: 1, textAlign: "center", padding: "10px 0", background: C.primaryPale, borderRadius: 10 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.primary }}>{selectedWorkout.duration}</div>
              <div style={{ fontSize: 10, color: C.textMid, marginTop: 1 }}>Total Time</div>
            </div>
            <div style={{ flex: 1, textAlign: "center", padding: "10px 0", background: C.primaryPale, borderRadius: 10 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.primary }}>{selectedWorkout.exercises.length}</div>
              <div style={{ fontSize: 10, color: C.textMid, marginTop: 1 }}>Exercises</div>
            </div>
            <div style={{ flex: 1, textAlign: "center", padding: "10px 0", background: C.primaryPale, borderRadius: 10 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.primary }}>{selectedWorkout.equipment.replace(" dumbbells", "")}</div>
              <div style={{ fontSize: 10, color: C.textMid, marginTop: 1 }}>Equipment</div>
            </div>
          </div>

          {/* Time Breakdown */}
          <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
            <div style={{ flex: 1, textAlign: "center", padding: "8px 4px", background: C.sagePale, borderRadius: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.sage }}>5 min</div>
              <div style={{ fontSize: 9, color: C.textMid }}>Warm-Up</div>
            </div>
            <div style={{ flex: 1, textAlign: "center", padding: "8px 4px", background: C.primaryPale, borderRadius: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.primary }}>20 min</div>
              <div style={{ fontSize: 9, color: C.textMid }}>Workout</div>
            </div>
            <div style={{ flex: 1, textAlign: "center", padding: "8px 4px", background: C.sagePale, borderRadius: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.sage }}>5 min</div>
              <div style={{ fontSize: 9, color: C.textMid }}>Cool-Down</div>
            </div>
          </div>

          {/* Breathing Reminder */}
          <div style={{ background: C.secondaryPale, borderRadius: 10, padding: "10px 14px", marginBottom: 16, borderLeft: `3px solid ${C.secondary}` }}>
            <p style={{ fontSize: 13, color: C.darkMuted, margin: 0, lineHeight: 1.5 }}>
              <strong style={{ color: C.dark }}>Breathing reminder:</strong> Exhale on the effort, inhale on the return. Never hold your breath — this protects your blood pressure.
            </p>
          </div>

          {/* Warm-Up */}
          <Card onClick={() => setShowWarmup(!showWarmup)} style={{ marginBottom: 10, borderLeft: `3px solid ${C.sage}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ fontSize: 15, fontWeight: 600, color: C.dark, margin: 0 }}>Warm-Up (5 min)</p>
                <p style={{ fontSize: 12, color: C.textMid, margin: "2px 0 0" }}>Always warm up first — cold muscles mean injuries</p>
              </div>
              <ChevronRight size={18} color={C.textLight} style={{ transform: showWarmup ? "rotate(90deg)" : "none", transition: "0.2s" }} />
            </div>
            {showWarmup && (
              <div style={{ marginTop: 14, borderTop: `1px solid ${C.bg}`, paddingTop: 12 }}>
                {WORKOUTS.warmup.map((w, i) => (
                  <div key={i} style={{ padding: "8px 0", borderBottom: i < WORKOUTS.warmup.length - 1 ? `1px solid ${C.bg}` : "none" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 14, fontWeight: 500, color: C.dark }}>{w.name}</span>
                      <span style={{ fontSize: 12, color: C.textMid }}>{w.duration}</span>
                    </div>
                    <p style={{ fontSize: 12, color: C.textMid, margin: "4px 0 0", lineHeight: 1.4 }}>{w.cue}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Exercises */}
          {selectedWorkout.exercises.map((ex, i) => (
            <Card key={i} onClick={() => setExpandedEx(expandedEx === i ? null : i)} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 24, height: 24, borderRadius: 12, background: C.primaryPale, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: C.primary }}>{i + 1}</span>
                    <span style={{ fontSize: 15, fontWeight: 600, color: C.dark }}>{ex.name}</span>
                  </div>
                  <p style={{ fontSize: 12, color: C.textMid, margin: "4px 0 0 32px" }}>{ex.sets} sets × {ex.reps} reps</p>
                </div>
                <ChevronRight size={18} color={C.textLight} style={{ transform: expandedEx === i ? "rotate(90deg)" : "none", transition: "0.2s" }} />
              </div>
              {expandedEx === i && (
                <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${C.bg}`, marginLeft: 32 }}>
                  <div style={{ marginBottom: 10 }}>
                    <p style={{ fontSize: 11, fontWeight: 600, color: C.primary, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Form Cues</p>
                    <p style={{ fontSize: 14, color: C.darkMuted, margin: 0, lineHeight: 1.6 }}>{ex.notes}</p>
                  </div>
                  <div style={{ background: C.primaryPale, borderRadius: 8, padding: "8px 12px", marginBottom: 10 }}>
                    <p style={{ fontSize: 12, color: C.primary, margin: 0 }}>🫁 <strong>Breathing:</strong> {ex.breath}</p>
                  </div>
                  <div style={{ background: C.sagePale, borderRadius: 8, padding: "8px 12px" }}>
                    <p style={{ fontSize: 12, color: C.darkMuted, margin: 0 }}>💡 <strong>Modification:</strong> {ex.modification}</p>
                  </div>
                </div>
              )}
            </Card>
          ))}

          {/* Cool-Down */}
          <Card onClick={() => setShowCooldown(!showCooldown)} style={{ marginBottom: 10, borderLeft: `3px solid ${C.sage}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ fontSize: 15, fontWeight: 600, color: C.dark, margin: 0 }}>Cool-Down (5 min)</p>
                <p style={{ fontSize: 12, color: C.textMid, margin: "2px 0 0" }}>Help your body recover and reduce soreness</p>
              </div>
              <ChevronRight size={18} color={C.textLight} style={{ transform: showCooldown ? "rotate(90deg)" : "none", transition: "0.2s" }} />
            </div>
            {showCooldown && (
              <div style={{ marginTop: 14, borderTop: `1px solid ${C.bg}`, paddingTop: 12 }}>
                {WORKOUTS.cooldown.map((w, i) => (
                  <div key={i} style={{ padding: "8px 0", borderBottom: i < WORKOUTS.cooldown.length - 1 ? `1px solid ${C.bg}` : "none" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 14, fontWeight: 500, color: C.dark }}>{w.name}</span>
                      <span style={{ fontSize: 12, color: C.textMid }}>{w.duration}</span>
                    </div>
                    <p style={{ fontSize: 12, color: C.textMid, margin: "4px 0 0", lineHeight: 1.4 }}>{w.cue}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Btn full style={{ marginTop: 16 }}>Complete Workout ✓</Btn>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: 90 }}>
      <TopBar title="Workouts" />
      <div style={{ padding: "0 20px 20px" }}>
        {/* Phase indicator */}
        <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
          {["Foundation", "Build", "Maintain"].map((p, i) => (
            <div key={p} onClick={() => setActivePhase(i)} style={{
              flex: 1, padding: "10px 8px", borderRadius: 10, textAlign: "center", cursor: "pointer",
              background: activePhase === i ? C.primary : C.card, border: `1px solid ${activePhase === i ? C.primary : "#E0E8E6"}`,
            }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: activePhase === i ? "#FFF" : C.textLight }}>{p}</span>
            </div>
          ))}
        </div>

        {activePhase === 1 && (
          <Card style={{ marginBottom: 20, textAlign: "center", padding: 32 }}>
            <div style={{ width: 48, height: 48, borderRadius: 24, background: C.secondaryPale, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
              <TrendingUp size={24} color={C.secondary} />
            </div>
            <p style={{ fontFamily: font.display, fontSize: 18, fontWeight: 600, color: C.dark, margin: "0 0 8px" }}>Phase 2: Build</p>
            <p style={{ fontSize: 14, color: C.textMid, lineHeight: 1.6, margin: "0 0 4px" }}>Weeks 9–16: Increased weights, new movements, higher intensity. Unlocks after you complete Phase 1.</p>
            <p style={{ fontSize: 13, color: C.secondary, fontWeight: 600 }}>Complete Foundation to unlock</p>
          </Card>
        )}

        {activePhase === 2 && (
          <Card style={{ marginBottom: 20, textAlign: "center", padding: 32 }}>
            <div style={{ width: 48, height: 48, borderRadius: 24, background: C.sagePale, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
              <Star size={24} color={C.sage} />
            </div>
            <p style={{ fontFamily: font.display, fontSize: 18, fontWeight: 600, color: C.dark, margin: "0 0 8px" }}>Phase 3: Maintain & Sculpt</p>
            <p style={{ fontSize: 14, color: C.textMid, lineHeight: 1.6, margin: "0 0 4px" }}>Weeks 17+: Rotating weekly programs with variety built in. New exercises, different combinations, same results-driven approach. Repeatable indefinitely.</p>
            <p style={{ fontSize: 13, color: C.sage, fontWeight: 600 }}>Complete Build to unlock</p>
          </Card>
        )}

        {activePhase !== 0 && null}
        {activePhase === 0 && <SectionTitle sub="Week 1 of 8">Phase 1: Foundation</SectionTitle>}

        {/* Week days */}
        {activePhase === 0 && ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => {
          const workout = WORKOUTS.days.find(d => d.day === day);
          const isRest = !workout;
          return (
            <Card key={day} onClick={() => workout && setSelectedWorkout(workout)} style={{ marginBottom: 10, opacity: isRest ? 0.7 : 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center",
                    background: isRest ? C.sagePale : C.primaryPale,
                  }}>
                    {isRest ? <Heart size={16} color={C.sage} /> : <Dumbbell size={16} color={C.primary} />}
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: C.dark, margin: 0 }}>{day}</p>
                    <p style={{ fontSize: 12, color: C.textMid, margin: "1px 0 0" }}>
                      {workout ? workout.name : (day === "Saturday" ? "Active Recovery / Yoga" : "Full Rest Day")}
                    </p>
                  </div>
                </div>
                {workout && <ChevronRight size={18} color={C.textLight} />}
              </div>
            </Card>
          );
        })}

        {/* What to Expect */}
        {activePhase === 0 && <SectionTitle sub="Your week-by-week guide">What to Expect</SectionTitle>}
        {activePhase !== 0 && null}
        {activePhase === 0 && EXPECT.map((w, i) => (
          <Card key={i} style={{ marginBottom: 8, borderLeft: `3px solid ${i === 0 ? C.secondary : C.primaryPale}` }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: i === 0 ? C.secondary : C.textMid, margin: 0 }}>Week {w.week}: {w.title}</p>
            <p style={{ fontSize: 13, color: C.darkMuted, margin: "4px 0 0", lineHeight: 1.5 }}>{w.body}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

function MealsPage({ subPage, setSubPage }) {
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [showFoodLookup, setShowFoodLookup] = useState(subPage?.type === "foodlookup");
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [expandedRecipe, setExpandedRecipe] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [aiResult, setAiResult] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  const toggleCheck = (item) => {
    setCheckedItems(prev => ({ ...prev, [item]: !prev[item] }));
  };

  if (showShoppingList) {
    const list = SHOPPING_LISTS[selectedWeek];
    const categories = [
      { name: "Produce", icon: "🥬", items: list.produce },
      { name: "Protein", icon: "🍗", items: list.protein },
      { name: "Dairy", icon: "🧀", items: list.dairy },
      { name: "Pantry & Grains", icon: "🍚", items: list.pantry },
      { name: "Spices", icon: "🌿", items: list.spices },
    ];
    const totalItems = Object.values(list).flat().length;
    const checkedCount = Object.values(checkedItems).filter(Boolean).length;

    return (
      <div style={{ paddingBottom: 90 }}>
        <TopBar title="Shopping List" onBack={() => setShowShoppingList(false)} />
        <div style={{ padding: "0 20px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 6 }}>
              {["Wk 1", "Wk 2", "Wk 3", "Wk 4"].map((w, i) => (
                <button key={i} onClick={() => { setSelectedWeek(i); setCheckedItems({}); }} style={{
                  padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer",
                  background: selectedWeek === i ? C.primary : C.card, color: selectedWeek === i ? "#FFF" : C.textMid,
                  fontFamily: font.body, fontSize: 11, fontWeight: 600,
                }}>{w}</button>
              ))}
            </div>
            <span style={{ fontSize: 12, color: C.sage, fontWeight: 600 }}>{checkedCount}/{totalItems} items</span>
          </div>
          {categories.map((cat, ci) => (
            <div key={ci} style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: C.secondary, marginBottom: 8 }}>{cat.icon} {cat.name}</p>
              {cat.items.map((item, ii) => {
                const key = `${selectedWeek}-${cat.name}-${ii}`;
                const checked = checkedItems[key];
                return (
                  <button key={ii} onClick={() => toggleCheck(key)} style={{
                    display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 12px",
                    background: checked ? C.greenPale : C.card, borderRadius: 8, border: "none", cursor: "pointer",
                    marginBottom: 4, textAlign: "left", textDecoration: checked ? "line-through" : "none",
                    color: checked ? C.textLight : C.dark, fontFamily: font.body, fontSize: 14,
                  }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: 6, border: `2px solid ${checked ? C.green : "#D0D8D6"}`,
                      background: checked ? C.green : "transparent", display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {checked && <Check size={14} color="#FFF" />}
                    </div>
                    {item}
                  </button>
                );
              })}
            </div>
          ))}
          <div style={{ background: C.yellowPale, borderRadius: 10, padding: "10px 14px", marginTop: 8 }}>
            <p style={{ fontSize: 11, color: C.darkMuted, margin: 0, lineHeight: 1.5 }}>
              <strong>Tip:</strong> Buy spices in bulk during Week 1 — they last months. After that, you only need to restock produce, protein, and dairy each week. Always read labels on packaged items even if they are on this list.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (showFoodLookup) {
    const filtered = FOODS.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return (
      <div style={{ paddingBottom: 90 }}>
        <TopBar title="Food Lookup" onBack={() => setShowFoodLookup(false)} />
        <div style={{ padding: "0 20px 20px" }}>
          <p style={{ fontSize: 13, color: C.textMid, marginBottom: 14, lineHeight: 1.5 }}>Search any food to check if it's kidney-safe. Green = safe, yellow = limit, red = avoid. These are general guidelines — always verify with your nephrologist or renal dietitian based on YOUR labs and stage.</p>
          <div style={{ position: "relative", marginBottom: 8 }}>
            <Search size={16} color={C.textLight} style={{ position: "absolute", left: 14, top: 14 }} />
            <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search a food..."
              style={{ width: "100%", padding: "12px 12px 12px 38px", borderRadius: 12, border: `1.5px solid #E0E8E6`, fontSize: 15, fontFamily: font.body, outline: "none", boxSizing: "border-box", background: C.card }}
            />
          </div>
          {searchTerm && !filtered.length && !aiResult && (
            <button onClick={async () => {
              setAiLoading(true);
              setAiResult(null);
              try {
                const res = await fetch("https://api.anthropic.com/v1/messages", {
                  method: "POST", headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    model: "claude-sonnet-4-6", max_tokens: 1000,
                    messages: [{ role: "user", content: `You are a CKD nutrition expert. Analyze "${searchTerm}" for someone with chronic kidney disease (Stages 2-3). Respond ONLY in JSON with no markdown backticks: {"name":"food name","safe":"safe" or "limit" or "avoid","potassium":"low" or "mod" or "high","phosphorus":"low" or "mod" or "high","note":"1-2 sentence explanation for CKD patients","serving":"recommended safe portion if applicable"}` }],
                  }),
                });
                const data = await res.json();
                const text = data.content?.[0]?.text || "";
                const clean = text.replace(/```json|```/g, "").trim();
                setAiResult(JSON.parse(clean));
              } catch (e) { setAiResult({ name: searchTerm, safe: "limit", potassium: "mod", phosphorus: "mod", note: "Unable to analyze. Check with your nephrologist or dietitian.", serving: "" }); }
              setAiLoading(false);
            }} style={{
              width: "100%", padding: "12px", borderRadius: 10, border: `1.5px solid ${C.primary}`, background: C.primaryPale,
              color: C.primary, fontFamily: font.body, fontSize: 14, fontWeight: 600, cursor: "pointer", marginBottom: 12,
            }}>
              {aiLoading ? "Analyzing..." : `🔍 AI Check: Is "${searchTerm}" CKD-safe?`}
            </button>
          )}
          {aiResult && (
            <Card style={{ marginBottom: 16, borderLeft: `3px solid ${aiResult.safe === "safe" ? C.green : aiResult.safe === "avoid" ? C.red : C.secondary}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontFamily: font.display, fontSize: 18, fontWeight: 600, color: C.dark }}>{aiResult.name}</span>
                {aiResult.safe === "safe" && <span style={{ fontSize: 11, fontWeight: 700, color: C.green, background: C.greenPale, padding: "3px 10px", borderRadius: 8 }}>✓ SAFE</span>}
                {aiResult.safe === "avoid" && <span style={{ fontSize: 11, fontWeight: 700, color: C.red, background: C.redPale, padding: "3px 10px", borderRadius: 8 }}>✕ AVOID</span>}
                {aiResult.safe === "limit" && <span style={{ fontSize: 11, fontWeight: 700, color: C.secondary, background: C.secondaryPale, padding: "3px 10px", borderRadius: 8 }}>⚠ LIMIT</span>}
              </div>
              <p style={{ fontSize: 14, color: C.darkMuted, lineHeight: 1.6, margin: "0 0 8px" }}>{aiResult.note}</p>
              {aiResult.serving && <p style={{ fontSize: 13, color: C.primary, margin: "0 0 8px" }}>📏 <strong>Portion:</strong> {aiResult.serving}</p>}
              <div style={{ display: "flex", gap: 10 }}>
                <span style={{ fontSize: 12, color: C.textMid }}>Potassium: <SafetyBadge level={aiResult.potassium} /></span>
                <span style={{ fontSize: 12, color: C.textMid }}>Phosphorus: <SafetyBadge level={aiResult.phosphorus} /></span>
              </div>
              <button onClick={() => { setAiResult(null); setSearchTerm(""); }} style={{ marginTop: 10, background: "none", border: "none", color: C.primary, fontSize: 13, fontWeight: 600, cursor: "pointer", padding: 0 }}>Search another food</button>
            </Card>
          )}
          {filtered.map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: `1px solid ${C.bg}` }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 15, fontWeight: 500, color: C.dark }}>{f.name}</span>
                  {f.safe === true && <span style={{ fontSize: 10, fontWeight: 700, color: C.green }}>✓ SAFE</span>}
                  {f.safe === false && <span style={{ fontSize: 10, fontWeight: 700, color: C.red }}>✕ AVOID</span>}
                  {f.safe === "limit" && <span style={{ fontSize: 10, fontWeight: 700, color: C.secondary }}>⚠ LIMIT</span>}
                </div>
                <p style={{ fontSize: 12, color: C.textMid, margin: "2px 0 0" }}>{f.note}</p>
              </div>
              <div style={{ display: "flex", gap: 4, marginLeft: 8 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.textLight, marginBottom: 2 }}>K</div>
                  <SafetyBadge level={f.k} />
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, color: C.textLight, marginBottom: 2 }}>P</div>
                  <SafetyBadge level={f.p} />
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p style={{ textAlign: "center", color: C.textMid, marginTop: 40 }}>No foods found. Try a different search.</p>}
        </div>
      </div>
    );
  }

  const weekData = MEALS_CKD[selectedWeek];
  const dayData = weekData[selectedDay];

  return (
    <div style={{ paddingBottom: 90 }}>
      <TopBar title="Meal Plan" right={
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setShowShoppingList(true)} style={{ background: "none", border: "none", cursor: "pointer", color: C.primary, display: "flex", alignItems: "center", gap: 4, fontFamily: font.body, fontSize: 12, fontWeight: 600 }}>
            🛒 Shop
          </button>
          <button onClick={() => setShowFoodLookup(true)} style={{ background: "none", border: "none", cursor: "pointer", color: C.primary, display: "flex", alignItems: "center", gap: 4, fontFamily: font.body, fontSize: 12, fontWeight: 600 }}>
            <Search size={14} /> Lookup
          </button>
        </div>
      } />
      <div style={{ padding: "0 20px 20px" }}>
        {/* Week selector */}
        <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
          {["Week 1", "Week 2", "Week 3", "Week 4"].map((w, i) => (
            <button key={i} onClick={() => { setSelectedWeek(i); setSelectedDay(0); }} style={{
              flex: 1, padding: "8px 4px", borderRadius: 10, border: "none", cursor: "pointer",
              background: selectedWeek === i ? C.primary : C.card, color: selectedWeek === i ? "#FFF" : C.textMid,
              fontFamily: font.body, fontSize: 12, fontWeight: 600, boxShadow: selectedWeek === i ? "none" : "0 1px 3px rgba(0,0,0,0.06)",
            }}>{w}</button>
          ))}
        </div>

        {/* Day selector */}
        <div style={{ display: "flex", gap: 6, marginBottom: 20, overflowX: "auto" }}>
          {weekData.map((m, i) => (
            <button key={i} onClick={() => setSelectedDay(i)} style={{
              padding: "8px 16px", borderRadius: 20, border: "none", cursor: "pointer",
              background: selectedDay === i ? C.primary : C.card, color: selectedDay === i ? "#FFF" : C.textMid,
              fontFamily: font.body, fontSize: 13, fontWeight: 600, whiteSpace: "nowrap",
              boxShadow: selectedDay === i ? "none" : "0 1px 3px rgba(0,0,0,0.06)",
            }}>{m.day}</button>
          ))}
        </div>

        <div style={{ background: C.secondaryPale, borderRadius: 10, padding: "10px 14px", marginBottom: 16, borderLeft: `3px solid ${C.secondary}` }}>
          <p style={{ fontSize: 13, color: C.darkMuted, margin: 0, lineHeight: 1.5 }}>
            <strong style={{ color: C.dark }}>Eating order matters (always consult your nephrologist for personalized dietary guidance):</strong> Eat protein and vegetables first, carbs last. Same meal, better insulin response.
          </p>
        </div>

        {dayData.meals.map((m, i) => (
          <Card key={i} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: C.primary, textTransform: "uppercase", letterSpacing: "0.12em" }}>{m.type}</span>
              <div style={{ display: "flex", gap: 4 }}>
                {["K", "P", "Na"].map(l => (
                  <span key={l} style={{ fontSize: 9, fontWeight: 700, color: C.sage, background: C.sagePale, padding: "2px 6px", borderRadius: 6 }}>Low {l}</span>
                ))}
              </div>
            </div>
            <p style={{ fontFamily: font.display, fontSize: 16, fontWeight: 600, color: C.dark, margin: "0 0 6px" }}>{m.name}</p>
            <p style={{ fontSize: 13, color: C.darkMuted, margin: "0 0 10px", lineHeight: 1.5 }}>{m.items}</p>
            <div style={{ background: C.primaryPale, borderRadius: 8, padding: "8px 12px", marginBottom: m.recipe ? 10 : 0 }}>
              <p style={{ fontSize: 12, color: C.primary, margin: 0 }}>🍽️ <strong>Order:</strong> {m.order}</p>
            </div>
            {m.recipe && (
              <button onClick={() => setExpandedRecipe(expandedRecipe === `${selectedWeek}-${selectedDay}-${i}` ? null : `${selectedWeek}-${selectedDay}-${i}`)} style={{
                width: "100%", padding: "8px", borderRadius: 8, border: `1px solid ${C.primary}`, background: "transparent",
                color: C.primary, fontFamily: font.body, fontSize: 12, fontWeight: 600, cursor: "pointer",
              }}>
                {expandedRecipe === `${selectedWeek}-${selectedDay}-${i}` ? "Hide Recipe ▲" : "View Recipe ▼"}
              </button>
            )}
            {m.recipe && expandedRecipe === `${selectedWeek}-${selectedDay}-${i}` && (
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${C.bg}` }}>
                {m.recipe.map((step, si) => (
                  <div key={si} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                    <span style={{ width: 22, height: 22, borderRadius: 11, background: C.primaryPale, color: C.primary, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>{si + 1}</span>
                    <p style={{ fontSize: 13, color: C.darkMuted, margin: 0, lineHeight: 1.5 }}>{step}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

function LearnPage({ user }) {
  const [selectedModule, setSelectedModule] = useState(null);
  const [playingSection, setPlayingSection] = useState(null);
  const iconMap = { Zap, UtensilsCrossed, Heart, Moon, Eye, Droplets, Shield, Activity, Star, AlertTriangle };

  const handleListenSection = (text, sectionKey) => {
    if (playingSection === sectionKey) {
      window.speechSynthesis.cancel();
      setPlayingSection(null);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.onend = () => setPlayingSection(null);
    utterance.onerror = () => setPlayingSection(null);
    window.speechSynthesis.speak(utterance);
    setPlayingSection(sectionKey);
  };

  const stopListening = () => {
    window.speechSynthesis.cancel();
    setPlayingSection(null);
  };

  // Filter modules based on user profile
  const isFemale = user?.sex === "Female";
  const isPerimenoAge = user?.age === "40–54" || user?.age === "55–64" || user?.age === "65+";
  const showHormoneModule = isFemale && isPerimenoAge;

  const filteredEducation = EDUCATION.filter(mod => {
    if (mod.id === "bodyafter50" && !showHormoneModule) return false;
    if (mod.id === "mens-health" && isFemale) return false;
    return true;
  });

  if (selectedModule) {
    const mod = selectedModule;
    return (
      <div style={{ paddingBottom: 90 }}>
        <TopBar title={mod.title} onBack={() => { stopListening(); setSelectedModule(null); }} />
        <div style={{ padding: "0 20px 20px" }}>
          {mod.headerImage && (
            <img src={mod.headerImage} alt={mod.title} style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 12, marginBottom: 16 }} />
          )}
          <p style={{ fontSize: 14, color: C.textMid, lineHeight: 1.5, marginBottom: 20 }}>{mod.subtitle}</p>
          {mod.content.map((section, i) => {
            const sectionKey = `${mod.id}-${i}`;
            const isThisPlaying = playingSection === sectionKey;
            return (
              <div key={i} style={{ marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
                  <h3 style={{ fontFamily: font.display, fontSize: 18, fontWeight: 600, color: C.dark, margin: 0, flex: 1 }}>{section.h}</h3>
                  <button onClick={() => handleListenSection(section.h + ". " + section.p, sectionKey)} style={{
                    display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: 16,
                    border: "none", cursor: "pointer", flexShrink: 0, marginTop: 2,
                    background: isThisPlaying ? C.red : C.primaryPale, color: isThisPlaying ? "#FFF" : C.primary, fontSize: 13,
                  }}>
                    {isThisPlaying ? "■" : "▶"}
                  </button>
                </div>
                {isThisPlaying && (
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                    <div style={{ width: 6, height: 6, borderRadius: 3, background: C.primary }} />
                    <p style={{ fontSize: 11, color: C.primary, margin: 0, fontWeight: 500 }}>Playing this section</p>
                  </div>
                )}
                {section.image && (
                  <div style={{ marginBottom: 10 }}>
                    <img src={section.image} alt={section.caption || section.h} style={{ width: "100%", maxWidth: 280, height: 200, objectFit: "cover", borderRadius: 10, display: "block" }} />
                    {section.caption && <p style={{ fontSize: 11, color: C.textLight, marginTop: 4, fontStyle: "italic" }}>{section.caption}</p>}
                  </div>
                )}
                <p style={{ fontSize: 15, color: C.darkMuted, lineHeight: 1.7, margin: 0 }}>{section.p}</p>
              </div>
            );
          })}
          <div style={{ background: C.yellowPale, borderRadius: 10, padding: "12px 14px" }}>
            <p style={{ fontSize: 11, color: C.darkMuted, margin: 0, lineHeight: 1.5 }}>
              <strong>Important:</strong> This information is educational only and does not replace medical advice. Always verify with your nephrologist, renal dietitian, or healthcare provider before making any changes. Your individual labs and medical history should guide every decision.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const categories = [
    { name: "Understanding Your Body", modules: filteredEducation.filter(m => ["partnership", "ckd-healthy", "insulin", "bodyafter50", "mens-health", "symptoms", "sleep"].includes(m.id)) },
    { name: "Nutrition & Meal Guidance", modules: filteredEducation.filter(m => ["know-produce", "mealorder", "hydration-fruits", "beverages", "water-safety", "smoothie-danger", "snacks", "sweets"].includes(m.id)) },
    { name: "DIY Recipes", modules: filteredEducation.filter(m => ["diy-sausage", "diy-dressings", "diy-frozen", "diy-baked", "diy-blends"].includes(m.id)) },
    { name: "Reading Labels & Food Safety", modules: filteredEducation.filter(m => ["seasonings", "hidden-dangers", "toxic-foods", "dangerous-combos", "detox-dangers", "supplements"].includes(m.id)) },
    { name: "Exercise & Medical", modules: filteredEducation.filter(m => ["accumulation", "exercise-safety", "sodium", "alkaline", "blood-pressure", "labs"].includes(m.id)) },
  ];

  return (
    <div style={{ paddingBottom: 90 }}>
      <TopBar title="Learn" />
      <div style={{ padding: "0 20px 20px" }}>
        <p style={{ fontSize: 14, color: C.textMid, marginBottom: 20, lineHeight: 1.5 }}>
          Understanding why you're doing what you're doing changes everything. Tap any topic to learn more.
        </p>
        {categories.map((cat, ci) => (
          <div key={ci} style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: C.secondary, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 10 }}>{cat.name}</p>
            {cat.modules.map((mod, i) => {
              const Icon = iconMap[mod.icon] || BookOpen;
              return (
                <Card key={i} onClick={() => setSelectedModule(mod)} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: C.primaryPale, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={20} color={C.primary} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 15, fontWeight: 600, color: C.dark, margin: 0 }}>{mod.title}</p>
                      <p style={{ fontSize: 12, color: C.textMid, margin: "2px 0 0" }}>{mod.subtitle}</p>
                    </div>
                    <ChevronRight size={18} color={C.textLight} />
                  </div>
                </Card>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function TrackPage({ subPage }) {
  const [tab, setTab] = useState(subPage?.type === "labs" ? "labs" : subPage?.type === "symptoms" ? "symptoms" : subPage?.type === "bp" ? "bp" : "labs");
  const [bpReadings, setBpReadings] = useState([
    { date: "Sample", systolic: "128", diastolic: "82", time: "Morning" },
  ]);
  const [newBp, setNewBp] = useState({ systolic: "", diastolic: "", time: "Morning" });
  const [showBpInput, setShowBpInput] = useState(false);
  const [labs, setLabs] = useState([
    { label: "eGFR", value: "52", prev: "50", unit: "mL/min", range: "60+ normal", direction: "up" },
    { label: "Creatinine", value: "1.3", prev: "1.4", unit: "mg/dL", range: "0.7–1.3 normal", direction: "down" },
    { label: "Potassium", value: "4.8", prev: "4.5", unit: "mEq/L", range: "3.5–5.0 normal", direction: "up" },
    { label: "Phosphorus", value: "3.9", prev: "4.1", unit: "mg/dL", range: "2.5–4.5 normal", direction: "down" },
    { label: "Hemoglobin", value: "11.2", prev: "10.8", unit: "g/dL", range: "12–16 normal", direction: "up" },
    { label: "UACR", value: "45", prev: "52", unit: "mg/g", range: "<30 normal", direction: "down" },
  ]);
  const [symptoms, setSymptoms] = useState({ energy: 3, sleep: 3, swelling: 1, itching: 1, cramps: 2, mood: 3 });
  const [logged, setLogged] = useState(false);
  const [showLabInput, setShowLabInput] = useState(false);

  const SymptomSlider = ({ label, value, onChange }) => (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: C.dark }}>{label}</span>
        <span style={{ fontSize: 13, color: value <= 2 ? C.green : value <= 3 ? C.secondary : C.red, fontWeight: 600 }}>
          {["", "None", "Mild", "Moderate", "Significant", "Severe"][value]}
        </span>
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {[1, 2, 3, 4, 5].map(n => (
          <button key={n} onClick={() => onChange(n)} style={{
            flex: 1, height: 40, borderRadius: 8, border: "none", cursor: "pointer",
            background: n <= value ? (value <= 2 ? C.green : value <= 3 ? C.secondary : C.red) + (n === value ? "" : "40") : C.bg,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 9, fontWeight: 600, color: n <= value ? "#FFF" : C.textLight }}>
              {["", "None", "Mild", "Mod", "Sig", "Severe"][n]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ paddingBottom: 90 }}>
      <TopBar title="Track" />
      <div style={{ padding: "0 20px 20px" }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
          {[{ id: "labs", label: "Labs" }, { id: "bp", label: "Blood Pressure" }, { id: "symptoms", label: "Check-In" }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              flex: 1, padding: "10px 8px", borderRadius: 10, border: "none", cursor: "pointer",
              background: tab === t.id ? C.primary : C.card, color: tab === t.id ? "#FFF" : C.textMid,
              fontFamily: font.body, fontSize: 13, fontWeight: 600, boxShadow: tab === t.id ? "none" : "0 1px 3px rgba(0,0,0,0.06)",
            }}>{t.label}</button>
          ))}
        </div>

        {tab === "labs" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <SectionTitle sub="Last updated: June 15, 2026">Lab Tracker</SectionTitle>
              <Pill label="Mostly Stable" color={C.sage} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {labs.map((lab, i) => {
                const isGood = (lab.label === "eGFR" && lab.direction === "up") || (lab.label === "Creatinine" && lab.direction === "down") || (lab.label === "Hemoglobin" && lab.direction === "up") || (lab.label === "Phosphorus" && lab.direction === "down") || (lab.label === "UACR" && lab.direction === "down");
                const isWatch = lab.label === "Potassium" && parseFloat(lab.value) > 4.5;
                const borderColor = isWatch ? C.secondary : isGood ? C.sage : C.textLight;
                return (
                  <Card key={i} style={{ borderLeft: `3px solid ${borderColor}`, padding: 14 }}>
                    <div style={{ fontSize: 11, color: C.textMid, marginBottom: 2 }}>{lab.label}</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                      <span style={{ fontSize: 24, fontWeight: 700, color: C.dark }}>{lab.value}</span>
                      <span style={{ fontSize: 11, color: C.textMid }}>{lab.unit}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
                      {lab.direction === "up" ? <TrendingUp size={12} color={isGood ? C.green : C.red} /> : <TrendingDown size={12} color={isGood ? C.green : C.red} />}
                      <span style={{ fontSize: 11, color: C.textMid }}>from {lab.prev}</span>
                    </div>
                    <div style={{ fontSize: 10, color: C.textLight, marginTop: 4 }}>{lab.range}</div>
                  </Card>
                );
              })}
            </div>
            {labs.some(l => l.label === "Potassium" && parseFloat(l.value) > 4.5) && (
              <div style={{ background: C.secondaryPale, borderRadius: 10, padding: "10px 14px", marginTop: 14, borderLeft: `3px solid ${C.secondary}` }}>
                <p style={{ fontSize: 12, color: C.darkMuted, margin: 0, lineHeight: 1.5 }}>
                  <strong>Note:</strong> Your potassium is in range but trending higher. Review recent meals for high-potassium foods. Discuss any lab changes with your nephrologist — never adjust your diet or medications based on this app alone.
                </p>
              </div>
            )}
            <Btn full secondary onClick={() => setShowLabInput(!showLabInput)}>Update Lab Results</Btn>
            {showLabInput && (
              <div style={{ marginTop: 14, background: C.card, borderRadius: 12, padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                <p style={{ fontFamily: font.display, fontSize: 16, fontWeight: 600, color: C.dark, marginBottom: 12 }}>Enter Your Latest Results</p>
                <p style={{ fontSize: 12, color: C.textMid, marginBottom: 14 }}>Enter the numbers from your most recent lab work. Leave blank any you don't have.</p>
                {labs.map((lab, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: C.dark, width: 90 }}>{lab.label}</span>
                    <input
                      type="number"
                      step="0.1"
                      placeholder={lab.value}
                      onChange={e => {
                        if (e.target.value) {
                          const updated = [...labs];
                          updated[i] = { ...updated[i], prev: updated[i].value, value: e.target.value, direction: parseFloat(e.target.value) > parseFloat(updated[i].value) ? "up" : "down" };
                          setLabs(updated);
                        }
                      }}
                      style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: `1px solid #E0E8E6`, fontSize: 14, fontFamily: font.body, outline: "none" }}
                    />
                    <span style={{ fontSize: 11, color: C.textLight, width: 40 }}>{lab.unit}</span>
                  </div>
                ))}
                <Btn full onClick={() => setShowLabInput(false)} style={{ marginTop: 10 }}>Save Results</Btn>
              </div>
            )}
            <Btn full secondary style={{ marginTop: 10 }}>Generate Doctor Sheet</Btn>
          </>
        )}

        {tab === "bp" && (
          <>
            <SectionTitle sub="Track your readings to see trends over time">Blood Pressure</SectionTitle>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {bpReadings.map((r, i) => (
                <Card key={i} style={{ flex: 1, padding: 14, borderLeft: `3px solid ${parseInt(r.systolic) > 140 || parseInt(r.diastolic) > 90 ? C.red : parseInt(r.systolic) > 130 || parseInt(r.diastolic) > 80 ? C.secondary : C.sage}` }}>
                  <div style={{ fontSize: 10, color: C.textMid, marginBottom: 4 }}>{r.time} · {r.date}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: C.dark }}>{r.systolic}/{r.diastolic}</div>
                  <div style={{ fontSize: 10, color: parseInt(r.systolic) > 140 ? C.red : parseInt(r.systolic) > 130 ? C.secondary : C.sage, fontWeight: 600, marginTop: 4 }}>
                    {parseInt(r.systolic) > 140 || parseInt(r.diastolic) > 90 ? "High — contact doctor" : parseInt(r.systolic) > 130 || parseInt(r.diastolic) > 80 ? "Slightly elevated" : "In target range"}
                  </div>
                </Card>
              ))}
            </div>
            <Btn full secondary onClick={() => setShowBpInput(!showBpInput)}>Log New Reading</Btn>
            {showBpInput && (
              <Card style={{ marginTop: 12, padding: 20 }}>
                <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 11, color: C.textMid, marginBottom: 4 }}>Systolic (top)</p>
                    <input type="number" placeholder="130" value={newBp.systolic} onChange={e => setNewBp({...newBp, systolic: e.target.value})}
                      style={{ width: "100%", padding: "10px", borderRadius: 8, border: "1px solid #E0E8E6", fontSize: 16, fontFamily: font.body, outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 11, color: C.textMid, marginBottom: 4 }}>Diastolic (bottom)</p>
                    <input type="number" placeholder="80" value={newBp.diastolic} onChange={e => setNewBp({...newBp, diastolic: e.target.value})}
                      style={{ width: "100%", padding: "10px", borderRadius: 8, border: "1px solid #E0E8E6", fontSize: 16, fontFamily: font.body, outline: "none", boxSizing: "border-box" }} />
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                  {["Morning", "Evening"].map(t => (
                    <button key={t} onClick={() => setNewBp({...newBp, time: t})} style={{
                      flex: 1, padding: "8px", borderRadius: 8, border: "none", cursor: "pointer",
                      background: newBp.time === t ? C.primary : C.bg, color: newBp.time === t ? "#FFF" : C.textMid,
                      fontFamily: font.body, fontSize: 13, fontWeight: 600,
                    }}>{t}</button>
                  ))}
                </div>
                <Btn full onClick={() => {
                  if (newBp.systolic && newBp.diastolic) {
                    setBpReadings([...bpReadings, { ...newBp, date: new Date().toLocaleDateString() }]);
                    setNewBp({ systolic: "", diastolic: "", time: "Morning" });
                    setShowBpInput(false);
                  }
                }}>Save Reading</Btn>
              </Card>
            )}
            <div style={{ background: C.yellowPale, borderRadius: 10, padding: "10px 14px", marginTop: 14 }}>
              <p style={{ fontSize: 11, color: C.darkMuted, margin: 0, lineHeight: 1.5 }}>
                <strong>How to get accurate readings:</strong> Sit quietly 5 minutes first. Correct cuff size. Arm on table at heart level. Feet flat, legs uncrossed. Two readings one minute apart, average them. Same times daily. Never adjust medications based on this app — always consult your nephrologist.
              </p>
            </div>
          </>
        )}

        {tab === "symptoms" && (
          <>
            <SectionTitle sub="Quick daily check-in to track patterns">How Are You Feeling Today?</SectionTitle>
            {!logged ? (
              <>
                <SymptomSlider label="Energy Level" value={symptoms.energy} onChange={v => setSymptoms({ ...symptoms, energy: v })} />
                <SymptomSlider label="Sleep Quality" value={symptoms.sleep} onChange={v => setSymptoms({ ...symptoms, sleep: v })} />
                <SymptomSlider label="Swelling" value={symptoms.swelling} onChange={v => setSymptoms({ ...symptoms, swelling: v })} />
                <SymptomSlider label="Itching" value={symptoms.itching} onChange={v => setSymptoms({ ...symptoms, itching: v })} />
                <SymptomSlider label="Muscle Cramps" value={symptoms.cramps} onChange={v => setSymptoms({ ...symptoms, cramps: v })} />
                <SymptomSlider label="Mood" value={symptoms.mood} onChange={v => setSymptoms({ ...symptoms, mood: v })} />
                <Btn full onClick={() => setLogged(true)} style={{ marginTop: 8 }}>Log Today's Check-In</Btn>
              </>
            ) : (
              <Card style={{ textAlign: "center", padding: 32 }}>
                <div style={{ width: 48, height: 48, borderRadius: 24, background: C.greenPale, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                  <Check size={24} color={C.green} />
                </div>
                <p style={{ fontFamily: font.display, fontSize: 18, fontWeight: 600, color: C.dark, margin: "0 0 6px" }}>Logged!</p>
                <p style={{ fontSize: 13, color: C.textMid }}>Your daily check-in is recorded. Over time, you'll see patterns connecting your lifestyle choices to how you feel.</p>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function PricingPage({ onSubscribe }) {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, padding: "40px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <h1 style={{ fontFamily: font.display, fontSize: 28, fontWeight: 700, color: C.dark, margin: "0 0 8px", letterSpacing: "-0.02em" }}>Your Free Week Is Over</h1>
        <p style={{ fontSize: 15, color: C.textMid, lineHeight: 1.5 }}>Ready to keep going? Choose your plan.</p>
      </div>

      <Card style={{ marginBottom: 12, border: `2px solid ${C.secondary}`, position: "relative" }}>
        <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", background: C.secondary, color: C.dark, fontSize: 11, fontWeight: 700, padding: "3px 12px", borderRadius: 10 }}>BEST VALUE</div>
        <div style={{ textAlign: "center", paddingTop: 8 }}>
          <p style={{ fontFamily: font.display, fontSize: 20, fontWeight: 600, color: C.dark, margin: "0 0 4px" }}>Annual</p>
          <p style={{ fontSize: 32, fontWeight: 700, color: C.primary, margin: "0 0 2px" }}>$99.99<span style={{ fontSize: 14, fontWeight: 400, color: C.textMid }}>/year</span></p>
          <p style={{ fontSize: 13, color: C.sage, fontWeight: 600, margin: "0 0 12px" }}>$8.33/month — Save 44%</p>
          <Btn full onClick={onSubscribe}>Start Annual Plan</Btn>
        </div>
      </Card>

      <Card style={{ marginBottom: 24 }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: font.display, fontSize: 20, fontWeight: 600, color: C.dark, margin: "0 0 4px" }}>Monthly</p>
          <p style={{ fontSize: 32, fontWeight: 700, color: C.primary, margin: "0 0 2px" }}>$14.99<span style={{ fontSize: 14, fontWeight: 400, color: C.textMid }}>/month</span></p>
          <p style={{ fontSize: 13, color: C.textMid, margin: "0 0 12px" }}>Cancel anytime</p>
          <Btn full secondary onClick={onSubscribe}>Start Monthly Plan</Btn>
        </div>
      </Card>

      <div style={{ padding: "0 8px" }}>
        <p style={{ fontFamily: font.display, fontSize: 16, fontWeight: 600, color: C.dark, marginBottom: 12 }}>What you get:</p>
        {[
          "3-phase progressive workout program with CKD-safe modifications",
          "Kidney-friendly meal plans (CKD & CKD + Diabetes tracks)",
          "Lab Tracker to monitor kidney function trends",
          "Symptom & Energy daily check-in",
          "Food Lookup — check any food instantly",
          "8 education modules on CKD, insulin, nutrition, sleep & more",
          "Doctor Communication Sheet generator",
          "New workouts and content added regularly",
        ].map((f, i) => (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }}>
            <Check size={16} color={C.sage} style={{ flexShrink: 0, marginTop: 2 }} />
            <span style={{ fontSize: 14, color: C.darkMuted, lineHeight: 1.4 }}>{f}</span>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: 24 }}>
        <p style={{ fontSize: 12, color: C.textLight }}>Compare: A personal trainer costs $60-120/session.<br />FitByChoice is less than the price of one session per month.</p>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div style={{ paddingBottom: 90 }}>
      <TopBar title="About FitByChoice" />
      <div style={{ padding: "0 20px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: `linear-gradient(135deg, ${C.dark}, ${C.primary})`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
            <span style={{ fontFamily: font.display, fontSize: 24, fontWeight: 700, color: "#FFF" }}>F</span>
            <span style={{ fontFamily: font.display, fontSize: 24, fontWeight: 700, color: C.secondary }}>C</span>
          </div>
        </div>
        <div style={{ fontFamily: font.display, fontSize: 22, fontWeight: 600, color: C.dark, textAlign: "center", marginBottom: 16 }}>Built by someone who lives it.</div>

        {[
          "FitByChoice was created by someone living with chronic kidney disease — not by a tech company looking for the next market to exploit, and not by people who've never sat in a nephrologist's waiting room wondering what their lab results mean.",
          "This app exists because when I was diagnosed with CKD, I looked for a fitness program that understood my reality — the dietary restrictions, the fatigue, the confusion about what's safe to eat, the fear of progression — and I found nothing. Every fitness app assumed I was a healthy 25-year-old trying to get abs. Every diet app ignored that 'healthy' foods like spinach and whole wheat bread could actually hurt my kidneys.",
          "So I built what I needed. A program with real progressive overload using weights — because muscle is medicine for CKD. Meal plans that are genuinely kidney-safe, with every ingredient checked. Education that explains what's happening in your body in plain language, not medical jargon. And tools to track your progress and communicate with your doctor.",
          "FitByChoice isn't a replacement for your nephrologist. It's the partner program your nephrologist wishes existed. The one that helps you take an active role in your health between appointments.",
          "If you're reading this, you already made the first choice. Welcome.",
        ].map((p, i) => (
          <p key={i} style={{ fontSize: 15, color: C.darkMuted, lineHeight: 1.7, marginBottom: 16 }}>{p}</p>
        ))}

        <Card style={{ borderLeft: `4px solid ${C.secondary}`, marginTop: 20 }}>
          <p style={{ fontSize: 14, color: C.dark, margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>
            "The program your doctor wishes existed."
          </p>
        </Card>
      </div>
    </div>
  );
}

// ─── MAIN APP ───────────────────────────────────────────────────────
export default function FitByChoice() {
  const [appState, setAppState] = useState("welcome"); // welcome, quiz, app, pricing
  const [page, setPage] = useState("home");
  const [subPage, setSubPage] = useState(null);
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const handleQuizComplete = (answers) => {
    setUser(answers);
    setAppState("app");
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setSubPage(null);
  };

  if (appState === "welcome") return <WelcomePage onStart={() => setAppState("quiz")} />;
  if (appState === "quiz") return <QuizPage onComplete={handleQuizComplete} />;
  if (appState === "pricing") return <PricingPage onSubscribe={() => setAppState("app")} />;

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: font.body, color: C.text }}>
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* Side Menu */}
      {showMenu && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200 }}>
          <div onClick={() => setShowMenu(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 260, background: C.card, padding: "60px 20px 20px" }}>
            <button onClick={() => setShowMenu(false)} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer" }}><X size={20} color={C.textMid} /></button>
            {[
              { label: "About FitByChoice", action: () => { setPage("about"); setShowMenu(false); } },
              { label: "Equipment Guide", action: () => setShowMenu(false) },
              { label: "Pricing", action: () => { setAppState("pricing"); setShowMenu(false); } },
              { label: "Contact Support", action: () => setShowMenu(false) },
            ].map((item, i) => (
              <button key={i} onClick={item.action} style={{
                display: "block", width: "100%", textAlign: "left", padding: "14px 0",
                borderBottom: `1px solid ${C.bg}`, background: "none", border: "none", borderBottom: `1px solid ${C.bg}`,
                cursor: "pointer", fontFamily: font.body, fontSize: 15, color: C.dark, fontWeight: 500,
              }}>{item.label}</button>
            ))}
          </div>
        </div>
      )}

      {/* Page Content */}
      {page === "home" && <DashboardPage user={user} setPage={handlePageChange} setSubPage={setSubPage} />}
      {page === "workouts" && <WorkoutsPage subPage={subPage} setSubPage={setSubPage} />}
      {page === "meals" && <MealsPage subPage={subPage} setSubPage={setSubPage} />}
      {page === "learn" && <LearnPage user={user} />}
      {page === "track" && <TrackPage subPage={subPage} />}
      {page === "about" && <AboutPage />}

      <BottomNav page={page} setPage={handlePageChange} />
    </div>
  );
}
