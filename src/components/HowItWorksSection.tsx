import { User, Calculator, Cpu, Zap } from "lucide-react";

const steps = [
  {
    icon: User,
    step: "01",
    title: "Enter Your Data",
    description: "Provide personal info and workout metrics including heart rate and body temperature.",
  },
  {
    icon: Calculator,
    step: "02",
    title: "BMI Calculation",
    description: "We calculate your BMI to provide additional health context alongside predictions.",
  },
  {
    icon: Cpu,
    step: "03",
    title: "ML Analysis",
    description: "Our trained model analyzes patterns across multiple physiological variables.",
  },
  {
    icon: Zap,
    step: "04",
    title: "Instant Results",
    description: "Get accurate calorie burn predictions with visual insights in milliseconds.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 relative" id="how">
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_50%,hsl(174_72%_56%/0.08)_0%,transparent_50%)]" />
      
      <div className="container px-6 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            How It <span className="text-gradient-primary">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Four simple steps to get your personalized calorie burn prediction.
          </p>
        </div>
        
        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((item, index) => (
              <div
                key={index}
                className="relative glass-card rounded-2xl p-6 group hover:bg-white/5 transition-all duration-300"
              >
                {/* Step number */}
                <span className="absolute top-6 right-6 text-5xl font-bold text-white/5 group-hover:text-primary/10 transition-colors duration-300">
                  {item.step}
                </span>
                
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
                
                {/* Connector line for desktop */}
                {index < steps.length - 1 && index % 2 === 0 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
