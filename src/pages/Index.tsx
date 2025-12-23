import { useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhySection from "@/components/WhySection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PredictionForm from "@/components/PredictionForm";
import ResultsSection from "@/components/ResultsSection";
import Dashboard from "@/components/Dashboard";
import UseCasesSection from "@/components/UseCasesSection";
import Footer from "@/components/Footer";
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
  const [predictionHistory, setPredictionHistory] = useState<PredictionRecord[]>([]);
  const formRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToDashboard = () => {
    dashboardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleResult = (result: PredictionResult) => {
    setCurrentResult(result);
    
    // Add to history as a PredictionRecord
    const record: PredictionRecord = {
      id: `record-${Date.now()}`,
      timestamp: new Date(),
      calories: result.calories,
      bmi: result.bmi,
      bmiStatus: result.bmiStatus,
      workoutType: result.workoutType,
      duration: result.duration,
      heartRate: result.heartRate,
      weight: result.weight,
    };
    setPredictionHistory(prev => [...prev, record]);
    
    // Scroll to results after a short delay
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar onStartPrediction={scrollToForm} onViewDashboard={scrollToDashboard} />
      
      <HeroSection onStartPrediction={scrollToForm} />
      
      <WhySection />
      
      <HowItWorksSection />
      
      <div ref={formRef}>
        <PredictionForm onResult={handleResult} />
      </div>
      
      <div ref={resultsRef}>
        <ResultsSection result={currentResult} history={predictionHistory} />
      </div>
      
      <div ref={dashboardRef}>
        <Dashboard history={predictionHistory} />
      </div>
      
      <UseCasesSection />
      
      <Footer />
    </main>
  );
};

export default Index;
