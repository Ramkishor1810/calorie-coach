import { useState, useMemo } from "react";
import { Target, TrendingUp, TrendingDown, Award, AlertCircle, Edit2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FitnessGoal, useFitnessGoals } from "@/hooks/useFitnessGoals";
import { Prediction } from "@/hooks/usePredictions";

interface GoalTrackerProps {
  predictions: Prediction[];
}

const GoalTracker = ({ predictions }: GoalTrackerProps) => {
  const { goals, updateGoal } = useFitnessGoals();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<number>(0);

  const calculateProgress = useMemo(() => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - 7);
    const monthStart = new Date(now);
    monthStart.setDate(now.getDate() - 30);

    let dailyCalories = 0;
    let weeklyCalories = 0;
    let monthlyCalories = 0;
    let consecutiveDays = 0;

    // Calculate calories by period
    const dayCalories: Record<string, number> = {};
    
    predictions.forEach((pred) => {
      const predDate = new Date(pred.created_at);
      const dateKey = predDate.toISOString().split("T")[0];
      dayCalories[dateKey] = (dayCalories[dateKey] || 0) + pred.calories;

      if (predDate >= todayStart) dailyCalories += pred.calories;
      if (predDate >= weekStart) weeklyCalories += pred.calories;
      if (predDate >= monthStart) monthlyCalories += pred.calories;
    });

    // Calculate streak
    const sortedDates = Object.keys(dayCalories).sort().reverse();
    for (let i = 0; i < sortedDates.length; i++) {
      const date = new Date(sortedDates[i]);
      const expectedDate = new Date(now);
      expectedDate.setDate(now.getDate() - i);
      
      if (date.toISOString().split("T")[0] === expectedDate.toISOString().split("T")[0]) {
        consecutiveDays++;
      } else {
        break;
      }
    }

    return {
      daily: dailyCalories,
      weekly: weeklyCalories,
      monthly: monthlyCalories,
      streak: consecutiveDays,
    };
  }, [predictions]);

  const getProgressForGoal = (goal: FitnessGoal) => {
    const current = calculateProgress[goal.period as keyof typeof calculateProgress] as number;
    return {
      current,
      percentage: Math.min(100, (current / goal.target_calories) * 100),
      isCompleted: current >= goal.target_calories,
      remaining: Math.max(0, goal.target_calories - current),
    };
  };

  const handleEdit = (goal: FitnessGoal) => {
    setEditingId(goal.id);
    setEditValue(goal.target_calories);
  };

  const handleSave = async (id: string) => {
    await updateGoal(id, { target_calories: editValue });
    setEditingId(null);
  };

  const getRecommendation = (goal: FitnessGoal) => {
    const { percentage, remaining, isCompleted } = getProgressForGoal(goal);
    
    if (isCompleted) {
      return { type: "success", message: "Goal achieved! Keep up the great work! 🎉" };
    }
    
    if (goal.period === "daily") {
      if (percentage < 50) {
        return { 
          type: "warning", 
          message: `Need ${remaining} more kcal today. Try a ${Math.ceil(remaining / 8)}-min HIIT session!` 
        };
      }
      return { type: "info", message: `Almost there! ${remaining} kcal to go.` };
    }
    
    if (goal.period === "weekly") {
      const daysLeft = 7 - new Date().getDay();
      const dailyNeeded = Math.ceil(remaining / Math.max(1, daysLeft));
      if (percentage < 70) {
        return { 
          type: "warning", 
          message: `Burn ~${dailyNeeded} kcal/day for the next ${daysLeft} days to hit your goal.` 
        };
      }
      return { type: "info", message: `On track! ${remaining} kcal remaining this week.` };
    }
    
    return { type: "info", message: `${remaining.toLocaleString()} kcal remaining for the month.` };
  };

  return (
    <section className="py-12">
      <div className="container px-6">
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-lg">Goal-Driven Progress</h3>
            </div>
            
            {/* Streak badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/20 rounded-full">
              <Award className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">{calculateProgress.streak} day streak</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {goals.map((goal) => {
              const { current, percentage, isCompleted } = getProgressForGoal(goal);
              const recommendation = getRecommendation(goal);
              const isEditing = editingId === goal.id;

              return (
                <div
                  key={goal.id}
                  className={cn(
                    "p-4 rounded-xl border transition-all",
                    isCompleted
                      ? "bg-primary/10 border-primary/30"
                      : "bg-secondary/30 border-white/5"
                  )}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium">{goal.name}</span>
                    <div className="flex items-center gap-1">
                      <span
                        className={cn(
                          "text-xs px-2 py-0.5 rounded-full",
                          isCompleted
                            ? "bg-primary/20 text-primary"
                            : "bg-accent/20 text-accent"
                        )}
                      >
                        {goal.period}
                      </span>
                      {!isEditing && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleEdit(goal)}
                        >
                          <Edit2 className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="mb-2">
                    <span className="text-2xl font-bold">{current.toLocaleString()}</span>
                    {isEditing ? (
                      <div className="inline-flex items-center gap-1 ml-1">
                        <span className="text-muted-foreground">/</span>
                        <Input
                          type="number"
                          value={editValue}
                          onChange={(e) => setEditValue(Number(e.target.value))}
                          className="w-24 h-7 text-sm inline"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleSave(goal.id)}
                        >
                          <Check className="w-3 h-3 text-primary" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => setEditingId(null)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-sm">
                        /{goal.target_calories.toLocaleString()} kcal
                      </span>
                    )}
                  </div>

                  <div className="h-2 bg-secondary rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                        background: isCompleted
                          ? "var(--gradient-primary)"
                          : "var(--gradient-accent)",
                      }}
                    />
                  </div>

                  <div
                    className={cn(
                      "flex items-start gap-2 text-xs p-2 rounded-lg",
                      recommendation.type === "success" && "bg-primary/10 text-primary",
                      recommendation.type === "warning" && "bg-orange-400/10 text-orange-400",
                      recommendation.type === "info" && "bg-accent/10 text-accent"
                    )}
                  >
                    {recommendation.type === "success" ? (
                      <TrendingUp className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    ) : recommendation.type === "warning" ? (
                      <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mt-0.5 flex-shrink-0" />
                    )}
                    <span>{recommendation.message}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Consistency rewards */}
          <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/20">
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-primary" />
              <div>
                <h4 className="font-medium">Consistency Rewards</h4>
                <p className="text-sm text-muted-foreground">
                  {calculateProgress.streak >= 7
                    ? "🔥 Amazing! 7+ day streak! You're building lasting habits."
                    : calculateProgress.streak >= 3
                    ? "💪 Great progress! Keep the momentum going."
                    : "Start your streak today! Consistency is key to results."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoalTracker;
