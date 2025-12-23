import { workoutTypes, type WorkoutType } from "@/lib/workoutTypes";
import { cn } from "@/lib/utils";

interface WorkoutTypeSelectorProps {
  selectedType: string;
  onSelect: (typeId: string) => void;
}

const WorkoutTypeSelector = ({ selectedType, onSelect }: WorkoutTypeSelectorProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {workoutTypes.map((workout) => {
        const Icon = workout.icon;
        const isSelected = selectedType === workout.id;
        
        return (
          <button
            key={workout.id}
            type="button"
            onClick={() => onSelect(workout.id)}
            className={cn(
              "relative p-4 rounded-xl border transition-all duration-300 text-left group",
              isSelected
                ? "bg-primary/20 border-primary shadow-lg shadow-primary/20"
                : "bg-secondary/30 border-white/10 hover:bg-secondary/50 hover:border-white/20"
            )}
          >
            <div
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center mb-2 transition-all",
                isSelected ? "bg-primary/30" : "bg-white/5 group-hover:bg-white/10"
              )}
              style={{ 
                boxShadow: isSelected ? `0 0 20px ${workout.color}40` : undefined 
              }}
            >
              <Icon 
                className="w-5 h-5 transition-colors" 
                style={{ color: isSelected ? workout.color : 'hsl(var(--muted-foreground))' }}
              />
            </div>
            <span className={cn(
              "font-medium text-sm block",
              isSelected ? "text-foreground" : "text-muted-foreground"
            )}>
              {workout.name}
            </span>
            <span className="text-xs text-muted-foreground/70">{workout.description}</span>
            
            {isSelected && (
              <div 
                className="absolute inset-0 rounded-xl opacity-20 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${workout.color}20 0%, transparent 70%)`
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default WorkoutTypeSelector;
