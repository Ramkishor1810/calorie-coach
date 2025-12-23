import { Heart, Watch, Dumbbell, Target } from "lucide-react";

const useCases = [
  {
    icon: Heart,
    title: "Fitness & Health Apps",
    description: "Integrate accurate calorie predictions into health tracking platforms.",
  },
  {
    icon: Watch,
    title: "Wearables & Devices",
    description: "Power smartwatch and fitness band calorie calculations.",
  },
  {
    icon: Dumbbell,
    title: "Gym Workout Tracking",
    description: "Help gym-goers understand their workout effectiveness.",
  },
  {
    icon: Target,
    title: "Personal Fitness Plans",
    description: "Enable personalized goal setting with accurate burn data.",
  },
];

const UseCasesSection = () => {
  return (
    <section className="py-24 relative" id="use-cases">
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_100%_50%,hsl(262_83%_68%/0.08)_0%,transparent_50%)]" />
      
      <div className="container px-6 relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Use <span className="text-gradient-accent">Cases</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From personal fitness to enterprise health solutions, our prediction engine powers various applications.
          </p>
        </div>
        
        {/* Use case grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl p-6 text-center group hover:bg-white/5 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <useCase.icon className="w-7 h-7 text-accent" />
              </div>
              
              {/* Content */}
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                {useCase.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
