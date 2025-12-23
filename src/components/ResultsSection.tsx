import { Flame, Scale, TrendingUp, History } from "lucide-react";
import { useEffect, useState } from "react";

interface PredictionResult {
  calories: number;
  bmi: number;
  bmiStatus: string;
}

interface ResultsSectionProps {
  result: PredictionResult | null;
  history: PredictionResult[];
}

const ResultsSection = ({ result, history }: ResultsSectionProps) => {
  const [animatedCalories, setAnimatedCalories] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (result) {
      setIsVisible(true);
      // Animate calorie counter
      const duration = 1500;
      const steps = 60;
      const increment = result.calories / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= result.calories) {
          setAnimatedCalories(result.calories);
          clearInterval(timer);
        } else {
          setAnimatedCalories(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [result]);

  const getBMIColor = (status: string) => {
    switch (status) {
      case "Underweight": return "text-yellow-400";
      case "Normal": return "text-primary";
      case "Overweight": return "text-orange-400";
      case "Obese": return "text-red-400";
      default: return "text-primary";
    }
  };

  if (!result && history.length === 0) return null;

  return (
    <section className="py-24 relative" id="results">
      <div className="container px-6">
        {result && isVisible && (
          <div className="max-w-4xl mx-auto mb-16 animate-scale-in">
            {/* Main result card */}
            <div className="glass-card-glow rounded-3xl p-8 sm:p-12 text-center">
              {/* Calories display */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Flame className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-lg font-medium text-muted-foreground">Estimated Calories Burned</span>
                </div>
                <div className="text-6xl sm:text-8xl font-bold text-gradient-primary animate-pulse-glow inline-block">
                  {animatedCalories}
                </div>
                <span className="text-2xl font-medium text-muted-foreground ml-2">kcal</span>
              </div>
              
              {/* BMI Badge */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 p-6 rounded-2xl bg-white/5">
                <div className="flex items-center gap-3">
                  <Scale className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground">BMI:</span>
                  <span className="text-2xl font-bold text-foreground">{result.bmi}</span>
                </div>
                <div className={`px-4 py-2 rounded-full font-semibold ${getBMIColor(result.bmiStatus)} bg-white/10`}>
                  {result.bmiStatus}
                </div>
              </div>
              
              {/* Visual bar chart */}
              <div className="mt-10">
                <div className="flex items-end justify-center gap-2 h-32">
                  {[...Array(10)].map((_, i) => {
                    const height = Math.min(100, (result.calories / 500) * 100 * ((i + 1) / 10));
                    const isActive = i < Math.ceil((result.calories / 500) * 10);
                    return (
                      <div
                        key={i}
                        className="w-6 sm:w-8 rounded-t-lg transition-all duration-500"
                        style={{
                          height: `${height}%`,
                          background: isActive 
                            ? `linear-gradient(to top, hsl(174 72% 56%), hsl(190 80% 50%))` 
                            : 'hsl(222 30% 18%)',
                          transitionDelay: `${i * 50}ms`,
                        }}
                      />
                    );
                  })}
                </div>
                <div className="flex justify-between text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
                  <span>0 kcal</span>
                  <span>500 kcal</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* History section */}
        {history.length > 1 && (
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <History className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-semibold">Recent Predictions</h3>
            </div>
            <div className="space-y-3">
              {history.slice(-5).reverse().map((item, index) => (
                <div
                  key={index}
                  className="glass-card rounded-xl p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="font-medium">{item.calories} kcal</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>BMI: {item.bmi}</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${getBMIColor(item.bmiStatus)}`}>
                      {item.bmiStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ResultsSection;
