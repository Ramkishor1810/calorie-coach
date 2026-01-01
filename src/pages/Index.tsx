import { useRef, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhySection from "@/components/WhySection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PredictionForm from "@/components/PredictionForm";
import ResultsSection from "@/components/ResultsSection";
import Dashboard from "@/components/Dashboard";
import UseCasesSection from "@/components/UseCasesSection";
import Footer from "@/components/Footer";
import HealthIntelligence from "@/components/HealthIntelligence";
import AIChatAssistant from "@/components/AIChatAssistant";
import GoalTracker from "@/components/GoalTracker";
import { useAuth } from "@/hooks/useAuth";
import { usePredictions, Prediction } from "@/hooks/usePredictions";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import type { PredictionRecord } from "@/lib/fitnessStore";

interface PredictionResult {
  calories: number;
  bmi: number;
  bmiStatus: string;
  workoutType: string;
  duration: number;
  heartRate: number;
  weight: number;
}

const Index = () => {
  const [currentResult, setCurrentResult] = useState<PredictionResult | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const { user, loading: authLoading } = useAuth();
  const { predictions, addPrediction } = usePredictions();

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToDashboard = () => {
    dashboardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleResult = async (result: PredictionResult) => {
    setCurrentResult(result);
    
    if (user) {
      await addPrediction({
        calories: result.calories,
        bmi: result.bmi,
        bmi_status: result.bmiStatus,
        workout_type: result.workoutType,
        duration: result.duration,
        heart_rate: result.heartRate,
        weight: result.weight,
      });
    }
    
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  // Convert predictions to PredictionRecord format for Dashboard
  const predictionHistory: PredictionRecord[] = useMemo(() => 
    predictions.map(p => ({
      id: p.id,
      timestamp: new Date(p.created_at),
      calories: p.calories,
      bmi: p.bmi,
      bmiStatus: p.bmi_status,
      workoutType: p.workout_type,
      duration: p.duration,
      heartRate: p.heart_rate,
      weight: p.weight,
    })), [predictions]);

  const userContext = useMemo(() => {
    if (predictions.length === 0) return undefined;
    const workoutCounts: Record<string, number> = {};
    predictions.forEach(p => {
      workoutCounts[p.workout_type] = (workoutCounts[p.workout_type] || 0) + 1;
    });
    const favorite = Object.entries(workoutCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "general";
    return {
      totalPredictions: predictions.length,
      avgCalories: Math.round(predictions.reduce((sum, p) => sum + p.calories, 0) / predictions.length),
      favoriteWorkout: favorite,
      recentWorkouts: predictions.slice(0, 5).map(p => p.workout_type),
    };
  }, [predictions]);

  return (
    <main className="min-h-screen bg-background">
      <Navbar onStartPrediction={scrollToForm} onViewDashboard={scrollToDashboard} />
      
      {!authLoading && !user && (
        <div className="fixed top-20 right-6 z-40">
          <Link to="/auth">
            <Button variant="outline" size="sm" className="gap-2">
              <LogIn className="w-4 h-4" />
              Login to save data
            </Button>
          </Link>
        </div>
      )}
      
      <HeroSection onStartPrediction={scrollToForm} />
      <WhySection />
      <HowItWorksSection />
      
      <div ref={formRef}>
        <PredictionForm onResult={handleResult} />
      </div>
      
      <div ref={resultsRef}>
        <ResultsSection result={currentResult} history={predictionHistory} />
      </div>

      {currentResult && (
        <HealthIntelligence 
          bmi={currentResult.bmi} 
          bmiStatus={currentResult.bmiStatus}
          calories={currentResult.calories}
          workoutType={currentResult.workoutType}
        />
      )}

      {user && predictions.length > 0 && (
        <GoalTracker predictions={predictions} />
      )}
      
      <div ref={dashboardRef}>
        <Dashboard history={predictionHistory} />
      </div>
      
      <UseCasesSection />
      <Footer />

      <AIChatAssistant userContext={userContext} />
    </main>
  );
};

export default Index;
