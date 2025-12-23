import { Target, Brain, Activity } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Beyond Generic Formulas",
    description: "Traditional calculators use outdated equations that ignore your unique body composition and workout intensity.",
  },
  {
    icon: Brain,
    title: "ML-Powered Precision",
    description: "Our model learns from real physiological patterns to deliver predictions tailored to your specific workout profile.",
  },
  {
    icon: Activity,
    title: "Real-Time Insights",
    description: "Factor in heart rate and body temperature for dynamic, context-aware calorie estimation.",
  },
];

const WhySection = () => {
  return (
    <section className="py-24 relative" id="why">
      <div className="container px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Why Choose <span className="text-gradient-primary">This Tool</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Standard calorie calculators fall short. Here's why our approach delivers better results.
          </p>
        </div>
        
        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl p-8 group hover:bg-white/5 transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon container */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;
