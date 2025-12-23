import { Bike, Waves, PersonStanding, Flame, Dumbbell, HeartPulse } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface WorkoutType {
  id: string;
  name: string;
  icon: LucideIcon;
  metValue: number; // Metabolic Equivalent of Task
  color: string;
  description: string;
}

export const workoutTypes: WorkoutType[] = [
  {
    id: "running",
    name: "Running",
    icon: PersonStanding,
    metValue: 9.8,
    color: "hsl(174 72% 56%)",
    description: "High-intensity cardio",
  },
  {
    id: "cycling",
    name: "Cycling",
    icon: Bike,
    metValue: 7.5,
    color: "hsl(262 83% 68%)",
    description: "Moderate-high cardio",
  },
  {
    id: "swimming",
    name: "Swimming",
    icon: Waves,
    metValue: 8.0,
    color: "hsl(200 80% 55%)",
    description: "Full-body workout",
  },
  {
    id: "strength",
    name: "Strength Training",
    icon: Dumbbell,
    metValue: 5.0,
    color: "hsl(45 90% 55%)",
    description: "Weight training",
  },
  {
    id: "hiit",
    name: "HIIT",
    icon: HeartPulse,
    metValue: 12.0,
    color: "hsl(0 84% 60%)",
    description: "High-intensity intervals",
  },
  {
    id: "general",
    name: "General Workout",
    icon: Flame,
    metValue: 6.0,
    color: "hsl(30 80% 55%)",
    description: "Mixed exercises",
  },
];

// Calculate calories burned using MET formula
// Calories = MET × Weight(kg) × Duration(hours)
export const calculateCaloriesByWorkout = (
  workoutTypeId: string,
  weightKg: number,
  durationMinutes: number,
  heartRate: number,
  bodyTemp: number,
  age: number,
  isMale: boolean
): number => {
  const workout = workoutTypes.find((w) => w.id === workoutTypeId);
  const met = workout?.metValue || 6.0;
  
  const durationHours = durationMinutes / 60;
  const baseCalories = met * weightKg * durationHours;
  
  // Adjustments based on physiological data
  const heartRateFactor = 1 + (heartRate - 80) * 0.003;
  const tempFactor = 1 + (bodyTemp - 36.5) * 0.02;
  const genderFactor = isMale ? 1.08 : 1.0;
  const ageFactor = 1 - (age - 25) * 0.003;
  
  return Math.round(baseCalories * heartRateFactor * tempFactor * genderFactor * Math.max(0.8, ageFactor));
};
