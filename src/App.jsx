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
      { type: "Breakfast", name: "Scrambled Egg with Sautéed Bell Peppers", items: "1 whole egg, ½ cup diced bell peppers, 1 tsp olive oil, garlic powder, black pepper. Finish with ½ cup white rice.", order: "Eat the egg and peppers first, rice last.", k: "low", p: "low", na: "low" },
      { type: "Lunch", name: "Grilled Chicken with Cauliflower & Pasta", items: "3 oz grilled chicken breast, 1 cup roasted cauliflower, ½ cup white pasta. Season with garlic, smoked paprika, olive oil.", order: "Eat chicken and cauliflower first, pasta last.", k: "low", p: "low", na: "low" },
      { type: "Dinner", name: "Baked Cod with Arugula Salad", items: "3 oz baked cod, 2 cups arugula, ½ cucumber sliced, lemon juice + olive oil dressing. Side of steamed zucchini.", order: "Protein and vegetables — no starch needed at dinner.", k: "low", p: "low", na: "low" },
    ]},
    { day: "Tuesday", meals: [
      { type: "Breakfast", name: "Homemade Turkey Patties with Onion Scramble", items: "2 oz ground turkey formed into small patties with garlic powder, sage, thyme, black pepper. Cook in olive oil with ½ cup sautéed onions. 1 egg white. Side of white toast with Tillamook cream cheese.", order: "Eat the patties and onions first, toast last.", k: "low", p: "low", na: "low" },
      { type: "Lunch", name: "Chicken Stir-Fry with Green Beans & Rice", items: "3 oz chicken thigh, 1 cup green beans, ½ cup white rice. Cook in olive oil with garlic, ginger, black pepper.", order: "Eat chicken and green beans first, rice last.", k: "low", p: "low", na: "low" },
      { type: "Dinner", name: "Lemon Sole with Cabbage Slaw", items: "3 oz baked sole with lemon, 1.5 cups shredded cabbage with apple cider vinegar dressing, dill.", order: "Light dinner — all protein and vegetables.", k: "low", p: "low", na: "low" },
    ]},
    { day: "Wednesday", meals: [
      { type: "Breakfast", name: "Egg White Omelet with Herbs", items: "3 egg whites, ½ cup diced zucchini, fresh basil, garlic. Side of 1 slice white bread with olive oil drizzle.", order: "Eat the omelet first, bread last.", k: "low", p: "low", na: "low" },
      { type: "Lunch", name: "Seasoned Ground Turkey Lettuce Wraps", items: "3 oz ground turkey with cumin, paprika, garlic. Wrapped in butter lettuce with shredded carrots, cucumber. Side of orzo.", order: "Eat the wraps first, couscous last.", k: "low", p: "low", na: "low" },
      { type: "Dinner", name: "Lemon Herb Sea Bass with Roasted Radishes", items: "3 oz sea bass with lemon, thyme, rosemary. 1 cup roasted radishes with olive oil. Side salad with arugula.", order: "All protein and vegetables — ideal evening meal.", k: "low", p: "low", na: "low" },
    ]},
    { day: "Thursday", meals: [
      { type: "Breakfast", name: "Veggie Egg Scramble", items: "2 egg whites + 1 whole egg, ½ cup diced zucchini, ¼ cup diced onion, garlic powder, black pepper. Side of 1 slice white toast.", order: "Eat the eggs and veggies first, toast last.", k: "low", p: "low", na: "low" },
      { type: "Lunch", name: "Herb-Crusted Chicken with Rice & Green Beans", items: "3 oz chicken breast coated in oregano, thyme, garlic powder. 1 cup steamed green beans. ½ cup white rice.", order: "Eat chicken and green beans first, rice last.", k: "low", p: "low", na: "low" },
      { type: "Dinner", name: "Garlic Shrimp over Arugula", items: "3 oz shrimp sautéed in olive oil and fresh garlic. 2 cups arugula with lemon juice dressing. ½ cup roasted cauliflower.", order: "Protein and vegetables only — light evening meal.", k: "low", p: "low", na: "low" },
    ]},
    { day: "Friday", meals: [
      { type: "Breakfast", name: "Cream Cheese Toast with Berries", items: "2 slices white bread with thin spread of cream cheese (Tillamook or Organic Valley — no gums, no additives). ½ cup fresh blueberries on the side. 1 hard-boiled egg.", order: "Eat the egg first, then toast and berries.", k: "low", p: "low", na: "low" },
      { type: "Lunch", name: "Turkey Burger Patty with Roasted Vegetables", items: "3 oz ground turkey patty seasoned with cumin, paprika, garlic. 1 cup roasted bell peppers and zucchini. Side of orzo.", order: "Eat the patty and roasted veggies first, couscous last.", k: "low", p: "low", na: "low" },
      { type: "Dinner", name: "Baked Sole with Cucumber Dill Salad", items: "3 oz baked cod with lemon and dill. 1 cup cucumber slices with olive oil, dill, and apple cider vinegar. Steamed cabbage.", order: "All protein and vegetables.", k: "low", p: "low", na: "low" },
    ]},
    { day: "Saturday", meals: [
      { type: "Breakfast", name: "Weekend Veggie Omelet", items: "2 egg whites + 1 whole egg, ½ cup bell peppers, ¼ cup onions, fresh basil. Side of white toast with olive oil.", order: "Eat the omelet first, toast last.", k: "low", p: "low", na: "low" },
      { type: "Lunch", name: "Grilled Chicken Salad Bowl", items: "3 oz grilled chicken over 2 cups chopped romaine, cucumber, homemade croutons (cube white bread, toss in olive oil and garlic powder, toast in pan 2 min). Olive oil, lemon juice, garlic dressing.", order: "Eat chicken and greens first, croutons last.", k: "low", p: "low", na: "low" },
      { type: "Dinner", name: "Sautéed Sole with Garlic Cabbage", items: "3 oz sole in olive oil with garlic and paprika. 1.5 cups sautéed cabbage with onions. Lemon wedge.", order: "Light, clean, kidney-friendly dinner.", k: "low", p: "low", na: "low" },
    ]},
    { day: "Sunday", meals: [
      { type: "Breakfast", name: "Apple Cinnamon Rice Bowl", items: "½ cup white rice, ½ diced apple, cinnamon, drizzle of olive oil. 1 hard-boiled egg on the side.", order: "Eat the egg first, then the rice bowl.", k: "low", p: "low", na: "low" },
      { type: "Lunch", name: "Chicken & Veggie Stir-Fry", items: "3 oz chicken with 1 cup cabbage, ½ cup green beans, ¼ cup carrots. Olive oil, garlic, ginger. Side of white rice.", order: "Eat chicken and vegetables first, rice last.", k: "low", p: "low", na: "low" },
      { type: "Dinner", name: "Simple Baked Fish with Steamed Veggies", items: "3 oz cod baked with lemon and herbs. 1 cup steamed cauliflower and green beans. Olive oil drizzle.", order: "Rest day dinner — keep it simple.", k: "low", p: "low", na: "low" },
    ]},
  ],
  [ // WEEK 2
    { day: "Monday", meals: [
      { type: "Breakfast", name: "Herb Egg White Scramble", items: "3 egg whites with ¼ cup roasted red bell pepper, fresh parsley, garlic powder. Side of white toast.", order: "Eat the scramble first, toast last.", k: "low", p: "low", na: "low" },
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
      { type: "Dinner", name: "Arugula Salad with Grilled Chicken", items: "3 oz grilled chicken over 2 cups arugula, cucumber, radishes. Olive oil and lemon dressing.", order: "All protein and vegetables — light Friday dinner.", k: "low", p: "low", na: "low" },
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
      { type: "Breakfast", name: "Blueberry Cream Cheese Toast", items: "2 slices white bread with cream cheese (Tillamook or Organic Valley), ½ cup blueberries. 1 hard-boiled egg.", order: "Eat the egg first, toast second.", k: "low", p: "low", na: "low" },
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
      { type: "Breakfast", name: "Egg White & Herb Scramble", items: "3 egg whites with dill, parsley, garlic powder, ¼ cup onion. Side of white toast.", order: "Eat the scramble first, toast last.", k: "low", p: "low", na: "low" },
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
  { name: "Apple", k: "low", p: "low", safe: true, note: "One of the best fruits for CKD" },
  { name: "Arugula", k: "low", p: "low", safe: true, note: "Great salad base" },
  { name: "Avocado", k: "high", p: "mod", safe: false, note: "Very high potassium — avoid" },
  { name: "Banana", k: "high", p: "low", safe: false, note: "High potassium — avoid" },
  { name: "Bell Pepper", k: "low", p: "low", safe: true, note: "Excellent choice — high in vitamin C" },
  { name: "Blueberries", k: "low", p: "low", safe: true, note: "Antioxidant-rich, kidney-friendly" },
  { name: "Broccoli", k: "mod", p: "mod", safe: "limit", note: "Moderate potassium — small portions OK" },
  { name: "Brown Rice", k: "mod", p: "high", safe: false, note: "Use white rice instead — lower phosphorus" },
  { name: "Cabbage", k: "low", p: "low", safe: true, note: "Versatile and kidney-safe" },
  { name: "Cauliflower", k: "low", p: "low", safe: true, note: "Great substitute for potatoes" },
  { name: "Cheese (hard)", k: "low", p: "high", safe: false, note: "High phosphorus — avoid most cheeses" },
  { name: "Chicken Breast", k: "low", p: "mod", safe: true, note: "Good protein source — keep to 3-4 oz" },
  { name: "Cod", k: "low", p: "low", safe: true, note: "Excellent low-phosphorus protein" },
  { name: "Cola (dark)", k: "low", p: "high", safe: false, note: "Phosphoric acid — damages kidneys" },
  { name: "Cranberry Juice", k: "low", p: "low", safe: true, note: "Unsweetened — good for urinary health" },
  { name: "Cream Cheese", k: "low", p: "low", safe: true, note: "Lower phosphorus than most dairy" },
  { name: "Cucumber", k: "low", p: "low", safe: true, note: "Hydrating and safe" },
  { name: "Egg (whole)", k: "low", p: "mod", safe: true, note: "Limit to 1 per day — yolk has phosphorus" },
  { name: "Egg Whites", k: "low", p: "low", safe: true, note: "Pure protein, very kidney-friendly" },
  { name: "Energy Drink", k: "varies", p: "mod", safe: false, note: "Dangerous — caffeine, sugar, additives" },
  { name: "Garlic", k: "low", p: "low", safe: true, note: "Flavor powerhouse — use freely" },
  { name: "Green Beans", k: "low", p: "low", safe: true, note: "One of the safest vegetables for CKD" },
  { name: "Milk (cow's)", k: "high", p: "high", safe: false, note: "High in both potassium and phosphorus" },
  { name: "Oatmeal", k: "mod", p: "high", safe: false, note: "High phosphorus — use white cereals instead" },
  { name: "Olive Oil", k: "low", p: "low", safe: true, note: "Healthy fat — use as primary cooking oil" },
  { name: "Onion", k: "low", p: "low", safe: true, note: "Adds great flavor without sodium" },
  { name: "Orange", k: "high", p: "low", safe: false, note: "High potassium — avoid" },
  { name: "Pasta (white)", k: "low", p: "low", safe: true, note: "Better than whole wheat for CKD" },
  { name: "Pineapple", k: "low", p: "low", safe: true, note: "Safe tropical fruit option" },
  { name: "Potato", k: "high", p: "mod", safe: false, note: "High potassium — avoid or double-leach" },
  { name: "Radishes", k: "low", p: "low", safe: true, note: "Roast them as a potato substitute" },
  { name: "Rice (white)", k: "low", p: "low", safe: true, note: "Safe kidney-friendly starch" },
  { name: "Rye Bread", k: "mod", p: "mod", safe: "limit", note: "OK occasionally if labs are stable. Check label for sodium and additives. White bread is the safer daily choice." },
  { name: "Salmon", k: "mod", p: "mod", safe: "limit", note: "Good omega-3s but moderate portions only" },
  { name: "Spinach", k: "high", p: "mod", safe: false, note: "Very high potassium — use arugula instead" },
  { name: "Strawberries", k: "low", p: "low", safe: true, note: "Safe and antioxidant-rich" },
  { name: "Sweet Potato", k: "high", p: "mod", safe: false, note: "High potassium — avoid" },
  { name: "Sole", k: "low", p: "low", safe: true, note: "Excellent kidney-friendly fish — wild-caught preferred" },
  { name: "Tomato", k: "high", p: "low", safe: false, note: "High potassium — avoid sauces and ketchup" },
  { name: "Turkey", k: "low", p: "mod", safe: true, note: "Good protein — keep to 3-4 oz portions" },
  { name: "White Bread", k: "low", p: "low", safe: true, note: "Better than whole grain for CKD" },
  { name: "Whole Wheat Bread", k: "mod", p: "high", safe: false, note: "High phosphorus — use white instead" },
  { name: "Yogurt", k: "mod", p: "high", safe: false, note: "High phosphorus — limit or avoid" },
  { name: "Zucchini", k: "low", p: "low", safe: true, note: "Versatile kidney-friendly vegetable" },
];

const EDUCATION = [
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
      { h: "Alcohol — extremely risky", p: "Raises blood pressure, dehydrates the body, damages kidney cells, disrupts electrolytes, interferes with medications, disrupts sleep, and spikes blood sugar. If you drink, discuss limits with your nephrologist." },
      { h: "Sports drinks — avoid completely", p: "Gatorade, Powerade, BodyArmor, Liquid IV, and all electrolyte drinks are designed to REPLACE sodium, potassium, and phosphorus. Those are the exact three things your kidneys cannot clear properly. A single 12 oz Gatorade contains approximately 160mg sodium, potassium from monopotassium phosphate (which your kidneys struggle to clear), phosphorus additives (absorbed at over 90 percent), 21 grams of sugar (spikes insulin), artificial colors your kidneys must filter, and natural flavors (unknown chemicals). You do not need electrolyte replacement for a 30-minute moderate workout. That is marketing designed for elite athletes doing 90-plus minutes of intense exercise. Plain water is all you need before, during, and after your workouts. Always consult your nephrologist before consuming any electrolyte-enhanced beverages." },
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
      { h: "Avoid these high-potassium 'health' fruits", p: "Oranges, bananas, cantaloupe, honeydew, kiwi, and dried fruits of any kind. These are marketed as healthy hydrating options but are too high in potassium for CKD. The general wellness world doesn't distinguish between kidney-safe and kidney-risky — your app does." },
    ],
  },
  {
    id: "seasonings", icon: "Shield", title: "Seasonings & Labels: What's Safe, What's Not", subtitle: "The low sodium trap, red flag ingredients, clean brands, and DIY blends",
    content: [
      { h: "The problem with 'low sodium'", p: "Many products swap sodium chloride for potassium chloride — dangerous for CKD patients because impaired kidneys can't clear excess potassium. Elevated potassium causes heart rhythm problems. Morton Salt Substitute, Nu-Salt, and most 'lite salt' products use potassium chloride." },
      { h: "Hidden ingredients to avoid", p: "Maltodextrin (glycemic index higher than sugar), yeast extract and hydrolyzed proteins (hidden MSG), 'natural flavors' (can contain 100+ unknown ingredients), disodium guanylate and disodium inosinate (hidden sodium), corn starch, dextrose, caramel color, soybean/canola oil." },
      { h: "Safe single-ingredient spices", p: "Garlic powder, onion powder, black pepper, paprika, smoked paprika, cumin, oregano, basil, thyme, rosemary, dill, parsley, cayenne, turmeric, coriander, ginger. Buy them individually — just the dried plant, nothing added." },
      { h: "Vetted clean brands", p: "Benson's Gourmet Seasonings — salt-free, sugar-free, no MSG, no potassium chloride, no silicon dioxide. Uses rice hulls (natural) as anti-caking agent instead of chemicals. Flavor God — no fillers, no preservatives, no sodium, no artificial coloring. Small business, USA-made. DAK's Spices — 100% salt-free, MSG-free, preservative-free, potassium chloride-free. Always read the full ingredient list yourself — even 'trusted' brands change formulas." },
    ],
  },
  {
    id: "diy-blends", icon: "Star", title: "Make Your Own Blends", subtitle: "5 clean seasoning recipes — zero sodium, zero chemicals, 30 seconds each",
    content: [
      { h: "Why make your own", p: "Every commercial blend is a label-reading gamble. When you mix your own from single-ingredient spices, you know exactly what's in it — no potassium chloride, no maltodextrin, no silicon dioxide, no hidden MSG. It's cheaper, it's cleaner, and it tastes better. Make a batch, store in a small jar, and you're set for weeks." },
      { h: "Chili-Lime (Tajín replacement)", p: "2 tbsp chili powder + 1 tbsp cayenne (adjust to heat preference) + 1 tbsp dehydrated lime zest (or citric acid) + 1 tsp garlic powder + 1 tsp cumin. Perfect on fruit, vegetables, chicken, fish, and popcorn. All the tangy-spicy kick, zero sodium." },
      { h: "All-Purpose Everyday Blend", p: "2 tbsp garlic powder + 2 tbsp onion powder + 1 tbsp black pepper + 1 tbsp paprika + 1 tbsp dried oregano + 1 tsp dried thyme. This covers 90% of your cooking — meat, vegetables, eggs, soups. Your clean replacement for any commercial 'all-purpose' seasoning." },
      { h: "Italian Herb Blend", p: "2 tbsp dried basil + 2 tbsp dried oregano + 1 tbsp dried rosemary (crushed) + 1 tbsp dried thyme + 1 tbsp garlic powder + 1 tsp black pepper + 1 tsp dried parsley. Use on chicken, fish, pasta, roasted vegetables, or mix with olive oil for a dipping sauce." },
      { h: "Smoky Cajun Blend", p: "2 tbsp smoked paprika + 1 tbsp garlic powder + 1 tbsp onion powder + 1 tbsp dried oregano + 1 tbsp dried thyme + 1 tsp cayenne + 1 tsp black pepper. Bold and smoky — great on chicken, shrimp, roasted cauliflower, and fish." },
      { h: "Garlic Herb Everyday Blend", p: "3 tbsp garlic powder + 1 tbsp dried parsley + 1 tbsp dried dill + 1 tbsp onion powder + 1 tsp black pepper + 1 tsp dried basil. Mild and versatile — perfect for anyone just starting to season without salt. Works on everything from eggs to roasted vegetables to rice." },
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
      { h: "The simple rule", p: "If a product needs a chemistry lab to make it taste good, your kidneys don't want it. Stick to whole foods, single-ingredient spices, and things your great-grandmother would recognize as food. When you do buy packaged products, flip it over and read every ingredient. The front of the package is marketing. The back is the truth." },
      { h: "Trader Joe's — 5 products to watch", p: "1) Sweet & Sour Gummy Worms — '0g sugar' but contains erythritol, maltodextrin, sodium citrate, calcium lactate, and 'natural flavors.' Five CKD concerns behind one healthy claim. 2) Quest Protein Bars — 220mg sodium, 21g protein (too much for one sitting with CKD), plus 6g erythritol. 3) Energy Bar Chocolate Chip — oats AND soy protein isolate (double phosphorus hit), brown rice syrup, sea salt listed twice. 4) Chewy Chocolate & Peanut Butter Protein Bar — 180mg sodium, soy protein isolate, peanuts (high phosphorus), agave syrup. Peanuts and soy together deliver a massive phosphorus load. 5) Coconut and plant milks — check every label for tricalcium phosphate or dipotassium phosphate. Phosphorus from additives is absorbed at over 90%, far more than natural food sources." },
      { h: "Whole Foods — 5 products to watch", p: "1) 365 Organic Whole Wheat Bread — whole wheat is high in phosphorus. The general health world says 'choose whole grain.' For CKD, white bread is actually safer. This contradiction confuses newly diagnosed patients. 2) 365 Organic Black Bean Soup — beans are high in both potassium AND phosphorus, and canned soup adds sodium. Three CKD concerns in one 'organic' can. 3) Kombucha (any brand) — high in potassium, contains acids that stress the kidneys, some brands add sugar alcohols. 4) 365 Organic Peanut Butter — peanuts are high in phosphorus and potassium. A two-tablespoon serving can have 100mg+ phosphorus and 200mg+ potassium. 'Organic' doesn't mean kidney-safe. 5) Fortified Almond Milk — check labels for calcium phosphate or dipotassium phosphate. Some brands have up to 500mg added calcium per serving plus phosphorus additives. Choose unfortified, unsweetened versions only." },
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
          Built for men and women living with CKD Stages 2–3
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
  const [searchTerm, setSearchTerm] = useState("");
  const [aiResult, setAiResult] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

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
        <button onClick={() => setShowFoodLookup(true)} style={{ background: "none", border: "none", cursor: "pointer", color: C.primary, display: "flex", alignItems: "center", gap: 4, fontFamily: font.body, fontSize: 13, fontWeight: 600 }}>
          <Search size={16} /> Food Lookup
        </button>
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
            <div style={{ background: C.primaryPale, borderRadius: 8, padding: "8px 12px" }}>
              <p style={{ fontSize: 12, color: C.primary, margin: 0 }}>🍽️ <strong>Order:</strong> {m.order}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function LearnPage({ user }) {
  const [selectedModule, setSelectedModule] = useState(null);
  const iconMap = { Zap, UtensilsCrossed, Heart, Moon, Eye, Droplets, Shield, Activity, Star, AlertTriangle };

  // Filter modules based on user profile
  const isFemale = user?.sex === "Female";
  const isPerimenoAge = user?.age === "40–54" || user?.age === "55–64" || user?.age === "65+";
  const showHormoneModule = isFemale && isPerimenoAge;

  const filteredEducation = EDUCATION.filter(mod => {
    if (mod.id === "bodyafter50" && !showHormoneModule) return false;
    return true;
  });

  if (selectedModule) {
    const mod = selectedModule;
    return (
      <div style={{ paddingBottom: 90 }}>
        <TopBar title={mod.title} onBack={() => setSelectedModule(null)} />
        <div style={{ padding: "0 20px 20px" }}>
          <p style={{ fontSize: 14, color: C.textMid, marginBottom: 24, lineHeight: 1.5 }}>{mod.subtitle}</p>
          {mod.content.map((section, i) => (
            <div key={i} style={{ marginBottom: 24 }}>
              <h3 style={{ fontFamily: font.display, fontSize: 18, fontWeight: 600, color: C.dark, marginBottom: 8 }}>{section.h}</h3>
              <p style={{ fontSize: 15, color: C.darkMuted, lineHeight: 1.7, margin: 0 }}>{section.p}</p>
            </div>
          ))}
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
    { name: "Understanding Your Body", modules: filteredEducation.filter(m => ["insulin", "bodyafter50", "symptoms", "sleep"].includes(m.id)) },
    { name: "Nutrition & Meal Guidance", modules: filteredEducation.filter(m => ["mealorder", "hydration-fruits", "beverages"].includes(m.id)) },
    { name: "Reading Labels & Food Safety", modules: filteredEducation.filter(m => ["seasonings", "hidden-dangers", "detox-dangers"].includes(m.id)) },
    { name: "Exercise & Medical", modules: filteredEducation.filter(m => ["exercise-safety", "labs"].includes(m.id)) },
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
  const [tab, setTab] = useState(subPage?.type === "labs" ? "labs" : subPage?.type === "symptoms" ? "symptoms" : "labs");
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
          {[{ id: "labs", label: "Lab Results" }, { id: "symptoms", label: "Daily Check-In" }].map(t => (
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
