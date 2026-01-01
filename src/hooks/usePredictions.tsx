import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useToast } from "./use-toast";

export interface Prediction {
  id: string;
  calories: number;
  bmi: number;
  bmi_status: string;
  workout_type: string;
  duration: number;
  heart_rate: number;
  weight: number;
  created_at: string;
}

export const usePredictions = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchPredictions = async () => {
    if (!user) {
      setPredictions([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("predictions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPredictions(data || []);
    } catch (error) {
      console.error("Error fetching predictions:", error);
    } finally {
      setLoading(false);
    }
  };

  const addPrediction = async (prediction: Omit<Prediction, "id" | "created_at">) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Not logged in",
        description: "Please log in to save predictions.",
      });
      return null;
    }

    try {
      const { data, error } = await supabase
        .from("predictions")
        .insert({
          user_id: user.id,
          ...prediction,
        })
        .select()
        .single();

      if (error) throw error;
      setPredictions((prev) => [data, ...prev]);
      return data;
    } catch (error) {
      console.error("Error adding prediction:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save prediction.",
      });
      return null;
    }
  };

  useEffect(() => {
    fetchPredictions();
  }, [user]);

  return { predictions, loading, addPrediction, refetch: fetchPredictions };
};
