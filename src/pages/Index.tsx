import { useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhySection from "@/components/WhySection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PredictionForm from "@/components/PredictionForm";
import ResultsSection from "@/components/ResultsSection";
import UseCasesSection from "@/components/UseCasesSection";
import Footer from "@/components/Footer";

interface PredictionResult {
  calories: number;
  bmi: number;
  bmiStatus: string;
}

const Index = () => {
  const [currentResult, setCurrentResult] = useState<PredictionResult | null>(null);
  const [predictionHistory, setPredictionHistory] = useState<PredictionResult[]>([]);
  const formRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleResult = (result: PredictionResult) => {
    setCurrentResult(result);
    setPredictionHistory(prev => [...prev, result]);
    
    // Scroll to results after a short delay
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar onStartPrediction={scrollToForm} />
      
      <HeroSection onStartPrediction={scrollToForm} />
      
      <WhySection />
      
      <HowItWorksSection />
      
      <div ref={formRef}>
        <PredictionForm onResult={handleResult} />
      </div>
      
      <div ref={resultsRef}>
        <ResultsSection result={currentResult} history={predictionHistory} />
      </div>
      
      <UseCasesSection />
      
      <Footer />
    </main>
  );
};

export default Index;
