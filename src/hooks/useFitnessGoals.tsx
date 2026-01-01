import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useToast } from "./use-toast";

export interface FitnessGoal {
  id: string;
  name: string;
  target_calories: number;
  period: "daily" | "weekly" | "monthly";
  created_at: string;
  updated_at: string;
}

const DEFAULT_GOALS = [
  { name: "Daily Burn", target_calories: 500, period: "daily" as const },
  { name: "Weekly Goal", target_calories: 3500, period: "weekly" as const },
  { name: "Monthly Target", target_calories: 15000, period: "monthly" as const },
];

export const useFitnessGoals = () => {
  const [goals, setGoals] = useState<FitnessGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchGoals = async () => {
    if (!user) {
      setGoals([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("fitness_goals")
        .select("*")
        .eq("user_id", user.id);

      if (error) throw error;

      if (data && data.length > 0) {
        setGoals(data.map(g => ({ ...g, period: g.period as "daily" | "weekly" | "monthly" })));
      } else {
        // Create default goals for new users
        const { data: newGoals, error: insertError } = await supabase
          .from("fitness_goals")
          .insert(
            DEFAULT_GOALS.map((goal) => ({
              user_id: user.id,
              ...goal,
            }))
          )
          .select();

        if (insertError) throw insertError;
        setGoals((newGoals || []).map(g => ({ ...g, period: g.period as "daily" | "weekly" | "monthly" })));
      }
    } catch (error) {
      console.error("Error fetching goals:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateGoal = async (id: string, updates: Partial<Pick<FitnessGoal, "name" | "target_calories">>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("fitness_goals")
        .update(updates)
        .eq("id", id)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) throw error;
      const typedData = { ...data, period: data.period as "daily" | "weekly" | "monthly" };
      setGoals((prev) => prev.map((g) => (g.id === id ? typedData : g)));
      toast({
        title: "Goal updated",
        description: "Your fitness goal has been updated.",
      });
    } catch (error) {
      console.error("Error updating goal:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update goal.",
      });
    }
  };

  useEffect(() => {
    fetchGoals();
  }, [user]);

  return { goals, loading, updateGoal, refetch: fetchGoals };
};
