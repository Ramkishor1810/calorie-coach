import { workoutTypes } from "./workoutTypes";

export interface PredictionRecord {
  id: string;
  timestamp: Date;
  calories: number;
  bmi: number;
  bmiStatus: string;
  workoutType: string;
  duration: number;
  heartRate: number;
  weight: number;
}

export interface FitnessGoal {
  id: string;
  name: string;
  targetCalories: number;
  currentCalories: number;
  period: "daily" | "weekly" | "monthly";
  createdAt: Date;
}

// Generate mock historical data for demo
export const generateMockHistory = (): PredictionRecord[] => {
  const records: PredictionRecord[] = [];
  const now = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Skip some days randomly
    if (Math.random() > 0.7) continue;
    
    const workoutType = workoutTypes[Math.floor(Math.random() * workoutTypes.length)];
    const duration = 20 + Math.floor(Math.random() * 60);
    const calories = 150 + Math.floor(Math.random() * 400);
    
    records.push({
      id: `record-${i}`,
      timestamp: date,
      calories,
      bmi: 22 + Math.random() * 5,
      bmiStatus: "Normal",
      workoutType: workoutType.id,
      duration,
      heartRate: 100 + Math.floor(Math.random() * 60),
      weight: 65 + Math.random() * 20,
    });
  }
  
  return records;
};

// Get weekly data aggregated by day
export const getWeeklyData = (records: PredictionRecord[]) => {
  const now = new Date();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekData = days.map((day, index) => ({
    day,
    calories: 0,
    workouts: 0,
  }));
  
  records.forEach((record) => {
    const recordDate = new Date(record.timestamp);
    const daysDiff = Math.floor((now.getTime() - recordDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff < 7) {
      const dayIndex = recordDate.getDay();
      weekData[dayIndex].calories += record.calories;
      weekData[dayIndex].workouts += 1;
    }
  });
  
  return weekData;
};

// Get monthly data aggregated by week
export const getMonthlyData = (records: PredictionRecord[]) => {
  const now = new Date();
  const weeks = [
    { week: "Week 1", calories: 0, workouts: 0 },
    { week: "Week 2", calories: 0, workouts: 0 },
    { week: "Week 3", calories: 0, workouts: 0 },
    { week: "Week 4", calories: 0, workouts: 0 },
  ];
  
  records.forEach((record) => {
    const recordDate = new Date(record.timestamp);
    const daysDiff = Math.floor((now.getTime() - recordDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff < 28) {
      const weekIndex = Math.min(3, Math.floor(daysDiff / 7));
      weeks[3 - weekIndex].calories += record.calories;
      weeks[3 - weekIndex].workouts += 1;
    }
  });
  
  return weeks;
};

// Get workout type distribution
export const getWorkoutDistribution = (records: PredictionRecord[]) => {
  const distribution: Record<string, number> = {};
  
  records.forEach((record) => {
    distribution[record.workoutType] = (distribution[record.workoutType] || 0) + 1;
  });
  
  return Object.entries(distribution).map(([type, count]) => {
    const workout = workoutTypes.find((w) => w.id === type);
    return {
      name: workout?.name || type,
      value: count,
      color: workout?.color || "hsl(174 72% 56%)",
    };
  });
};

// Calculate totals
export const calculateTotals = (records: PredictionRecord[]) => {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - 7);
  const monthStart = new Date(now);
  monthStart.setDate(now.getDate() - 30);
  
  let dailyCalories = 0;
  let weeklyCalories = 0;
  let monthlyCalories = 0;
  let totalWorkouts = records.length;
  
  records.forEach((record) => {
    const recordDate = new Date(record.timestamp);
    
    if (recordDate >= todayStart) {
      dailyCalories += record.calories;
    }
    if (recordDate >= weekStart) {
      weeklyCalories += record.calories;
    }
    if (recordDate >= monthStart) {
      monthlyCalories += record.calories;
    }
  });
  
  return {
    dailyCalories,
    weeklyCalories,
    monthlyCalories,
    totalWorkouts,
    avgCaloriesPerWorkout: totalWorkouts > 0 ? Math.round(monthlyCalories / totalWorkouts) : 0,
  };
};
