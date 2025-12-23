import { Button } from "@/components/ui/button";
import { Flame, Zap, Activity } from "lucide-react";

interface HeroSectionProps {
  onStartPrediction: () => void;
}

const HeroSection = ({ onStartPrediction }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,hsl(174_72%_56%/0.15)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,hsl(262_83%_68%/0.1)_0%,transparent_40%)]" />
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      
      <div className="container relative z-10 px-6 py-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full glass-card animate-fade-in">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">ML-Powered Fitness Analytics</span>
        </div>
        
        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
          <span className="text-foreground">Smart </span>
          <span className="text-gradient-primary">Calorie Burn</span>
          <br />
          <span className="text-foreground">Prediction</span>
        </h1>
        
        {/* Subheading */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Personalized calorie estimation powered by machine learning. 
          Get accurate predictions based on your unique physiological data.
        </p>
        
        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Button variant="hero" size="xl" onClick={onStartPrediction}>
            <Flame className="w-5 h-5" />
            Start Prediction
          </Button>
          <Button variant="outline" size="lg">
            <Activity className="w-4 h-4" />
            Learn More
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto mt-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          {[
            { value: "95%", label: "Accuracy" },
            { value: "10K+", label: "Predictions" },
            { value: "<1s", label: "Response" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gradient-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
