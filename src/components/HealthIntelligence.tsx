import { AlertTriangle, Heart, Salad, Dumbbell, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface HealthIntelligenceProps {
  bmi: number;
  bmiStatus: string;
  calories: number;
  workoutType: string;
}

const getBMIInsights = (bmi: number) => {
  if (bmi < 18.5) {
    return {
      risk: "Underweight",
      riskLevel: "warning",
      suggestions: [
        "Increase caloric intake with nutrient-dense foods",
        "Focus on strength training to build muscle mass",
        "Include protein-rich snacks between meals",
      ],
      dietPlan: {
        breakfast: "Oatmeal with banana, nuts, and honey + whole milk",
        snack1: "Greek yogurt with granola and berries",
        lunch: "Grilled chicken sandwich with avocado and cheese",
        snack2: "Protein smoothie with peanut butter",
        dinner: "Salmon with quinoa and roasted vegetables",
      },
      exercisePlan: [
        { name: "Strength Training", duration: "45 min", focus: "Upper body" },
        { name: "Light Cardio", duration: "20 min", focus: "Walking" },
        { name: "Core Exercises", duration: "15 min", focus: "Stability" },
      ],
    };
  } else if (bmi >= 18.5 && bmi < 25) {
    return {
      risk: "Normal Weight",
      riskLevel: "healthy",
      suggestions: [
        "Maintain current balanced diet",
        "Continue regular exercise routine",
        "Focus on muscle toning and flexibility",
      ],
      dietPlan: {
        breakfast: "Scrambled eggs with whole grain toast and vegetables",
        snack1: "Apple slices with almond butter",
        lunch: "Grilled fish with brown rice and salad",
        snack2: "Mixed nuts and dried fruits",
        dinner: "Lean beef stir-fry with vegetables and noodles",
      },
      exercisePlan: [
        { name: "Mixed Cardio", duration: "30 min", focus: "Endurance" },
        { name: "Strength Training", duration: "30 min", focus: "Full body" },
        { name: "Flexibility", duration: "15 min", focus: "Yoga/Stretching" },
      ],
    };
  } else if (bmi >= 25 && bmi < 30) {
    return {
      risk: "Overweight",
      riskLevel: "caution",
      suggestions: [
        "Increase cardio activities (walking, cycling, swimming)",
        "Reduce processed foods and sugary drinks",
        "Monitor portion sizes and eat mindfully",
      ],
      dietPlan: {
        breakfast: "Greek yogurt parfait with berries (low-fat)",
        snack1: "Carrot sticks with hummus",
        lunch: "Large salad with grilled chicken and olive oil dressing",
        snack2: "Small handful of almonds",
        dinner: "Baked fish with steamed vegetables (no starch)",
      },
      exercisePlan: [
        { name: "Brisk Walking", duration: "45 min", focus: "Fat burning" },
        { name: "Swimming/Cycling", duration: "30 min", focus: "Low impact cardio" },
        { name: "Light Strength", duration: "20 min", focus: "Compound movements" },
      ],
    };
  } else {
    return {
      risk: "Obese",
      riskLevel: "danger",
      suggestions: [
        "Consult a healthcare provider for a personalized plan",
        "Start with low-impact exercises like swimming or walking",
        "Focus on gradual, sustainable calorie reduction",
      ],
      dietPlan: {
        breakfast: "Vegetable omelette with one slice whole grain toast",
        snack1: "Cucumber slices with low-fat cottage cheese",
        lunch: "Soup (vegetable-based) with side salad",
        snack2: "Small apple",
        dinner: "Grilled chicken breast with steamed broccoli",
      },
      exercisePlan: [
        { name: "Water Aerobics", duration: "30 min", focus: "Joint-friendly" },
        { name: "Seated Exercises", duration: "20 min", focus: "Mobility" },
        { name: "Gentle Walking", duration: "20 min", focus: "Building stamina" },
      ],
    };
  }
};

const HealthIntelligence = ({ bmi, bmiStatus, calories, workoutType }: HealthIntelligenceProps) => {
  const insights = getBMIInsights(bmi);

  const riskColors = {
    healthy: "text-primary bg-primary/20 border-primary/30",
    warning: "text-yellow-400 bg-yellow-400/20 border-yellow-400/30",
    caution: "text-orange-400 bg-orange-400/20 border-orange-400/30",
    danger: "text-red-400 bg-red-400/20 border-red-400/30",
  };

  return (
    <section className="py-16 relative">
      <div className="container px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-gradient-primary">Health Intelligence</span> Report
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Personalized insights based on your BMI and workout data
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* BMI Analysis Card */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-lg">BMI Analysis</h3>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="text-4xl font-bold">{bmi.toFixed(1)}</div>
              <div
                className={cn(
                  "px-3 py-1 rounded-full text-sm font-medium border",
                  riskColors[insights.riskLevel as keyof typeof riskColors]
                )}
              >
                {insights.risk}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-accent" />
                Recommendations
              </h4>
              <ul className="space-y-2">
                {insights.suggestions.map((suggestion, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-xs text-muted-foreground flex items-start gap-2 p-3 bg-secondary/30 rounded-lg">
              <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>
                ⚠️ This is not medical advice. Please consult a healthcare professional for serious health concerns.
              </span>
            </div>
          </div>

          {/* Diet Plan Card */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Salad className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-lg">Tomorrow's Diet Plan</h3>
            </div>

            <div className="space-y-3">
              {Object.entries(insights.dietPlan).map(([meal, food]) => (
                <div key={meal} className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
                  <div className="w-20 text-xs font-medium text-accent capitalize">
                    {meal.replace(/([0-9])/g, " $1")}
                  </div>
                  <div className="text-sm text-muted-foreground">{food}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Exercise Plan Card */}
          <div className="glass-card rounded-2xl p-6 lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Dumbbell className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-lg">Tomorrow's Exercise Plan</h3>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {insights.exercisePlan.map((exercise, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-secondary/30 rounded-xl border border-white/5 hover:border-primary/30 transition-colors"
                >
                  <div className="text-lg font-semibold mb-1">{exercise.name}</div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-primary">{exercise.duration}</span>
                    <span>•</span>
                    <span>{exercise.focus}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground">
                Based on your {workoutType} workout burning <span className="text-primary font-medium">{calories} kcal</span>,
                we recommend focusing on recovery and complementary exercises tomorrow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthIntelligence;
