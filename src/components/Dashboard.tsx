import { useState, useMemo } from "react";
import { 
  Flame, Target, TrendingUp, Calendar, 
  BarChart3, PieChart as PieChartIcon, Activity 
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Area, AreaChart
} from "recharts";
import { 
  generateMockHistory, getWeeklyData, getMonthlyData, 
  getWorkoutDistribution, calculateTotals,
  type PredictionRecord, type FitnessGoal 
} from "@/lib/fitnessStore";
import { workoutTypes } from "@/lib/workoutTypes";
import { cn } from "@/lib/utils";

interface DashboardProps {
  history: PredictionRecord[];
}

const Dashboard = ({ history: propHistory }: DashboardProps) => {
  const [timeRange, setTimeRange] = useState<"weekly" | "monthly">("weekly");
  
  // Use prop history or generate mock data for demo
  const history = useMemo(() => {
    return propHistory.length > 0 ? propHistory : generateMockHistory();
  }, [propHistory]);
  
  const weeklyData = useMemo(() => getWeeklyData(history), [history]);
  const monthlyData = useMemo(() => getMonthlyData(history), [history]);
  const workoutDistribution = useMemo(() => getWorkoutDistribution(history), [history]);
  const totals = useMemo(() => calculateTotals(history), [history]);
  
  const chartData = timeRange === "weekly" ? weeklyData : monthlyData;
  const xKey = timeRange === "weekly" ? "day" : "week";
  
  // Sample fitness goals
  const goals: FitnessGoal[] = [
    { id: "1", name: "Daily Burn", targetCalories: 500, currentCalories: totals.dailyCalories, period: "daily", createdAt: new Date() },
    { id: "2", name: "Weekly Goal", targetCalories: 3500, currentCalories: totals.weeklyCalories, period: "weekly", createdAt: new Date() },
    { id: "3", name: "Monthly Target", targetCalories: 15000, currentCalories: totals.monthlyCalories, period: "monthly", createdAt: new Date() },
  ];

  return (
    <section className="py-24 relative" id="dashboard">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,hsl(262_83%_68%/0.08)_0%,transparent_50%)]" />
      
      <div className="container px-6 relative">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Your <span className="text-gradient-accent">Fitness Dashboard</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Track your progress, analyze trends, and crush your fitness goals.
          </p>
        </div>
        
        {/* Stats cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard 
            icon={Flame} 
            label="Today's Burn" 
            value={`${totals.dailyCalories}`} 
            unit="kcal"
            color="primary"
          />
          <StatCard 
            icon={TrendingUp} 
            label="This Week" 
            value={`${totals.weeklyCalories}`} 
            unit="kcal"
            color="accent"
          />
          <StatCard 
            icon={Activity} 
            label="Total Workouts" 
            value={`${totals.totalWorkouts}`} 
            unit="sessions"
            color="primary"
          />
          <StatCard 
            icon={BarChart3} 
            label="Avg per Workout" 
            value={`${totals.avgCaloriesPerWorkout}`} 
            unit="kcal"
            color="accent"
          />
        </div>
        
        {/* Charts row */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Main calorie chart */}
          <div className="lg:col-span-2 glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Calories Burned</h3>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setTimeRange("weekly")}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-sm transition-all",
                    timeRange === "weekly" 
                      ? "bg-primary/20 text-primary" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Weekly
                </button>
                <button
                  onClick={() => setTimeRange("monthly")}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-sm transition-all",
                    timeRange === "monthly" 
                      ? "bg-primary/20 text-primary" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Monthly
                </button>
              </div>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="caloriesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(174 72% 56%)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="hsl(174 72% 56%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" />
                  <XAxis 
                    dataKey={xKey} 
                    stroke="hsl(215 20% 55%)" 
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="hsl(215 20% 55%)" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{
                      background: "hsl(222 47% 8%)",
                      border: "1px solid hsl(222 30% 18%)",
                      borderRadius: "8px",
                      color: "hsl(210 40% 98%)",
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="calories" 
                    stroke="hsl(174 72% 56%)" 
                    strokeWidth={2}
                    fill="url(#caloriesGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Workout distribution */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <PieChartIcon className="w-5 h-5 text-accent" />
              <h3 className="font-semibold">Workout Types</h3>
            </div>
            
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={workoutDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {workoutDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      background: "hsl(222 47% 8%)",
                      border: "1px solid hsl(222 30% 18%)",
                      borderRadius: "8px",
                      color: "hsl(210 40% 98%)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-2 mt-4">
              {workoutDistribution.slice(0, 3).map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ background: item.color }}
                    />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Fitness goals */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Fitness Goals</h3>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-6">
            {goals.map((goal) => {
              const progress = Math.min(100, (goal.currentCalories / goal.targetCalories) * 100);
              const isCompleted = progress >= 100;
              
              return (
                <div key={goal.id} className="bg-secondary/30 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium">{goal.name}</span>
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-full",
                      isCompleted 
                        ? "bg-primary/20 text-primary" 
                        : "bg-accent/20 text-accent"
                    )}>
                      {goal.period}
                    </span>
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-2xl font-bold">
                      {goal.currentCalories.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      /{goal.targetCalories.toLocaleString()} kcal
                    </span>
                  </div>
                  
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${progress}%`,
                        background: isCompleted 
                          ? "var(--gradient-primary)" 
                          : "var(--gradient-accent)"
                      }}
                    />
                  </div>
                  
                  <span className="text-xs text-muted-foreground mt-2 block">
                    {Math.round(progress)}% complete
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// Stat card component
interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  unit: string;
  color: "primary" | "accent";
}

const StatCard = ({ icon: Icon, label, value, unit, color }: StatCardProps) => (
  <div className="glass-card rounded-xl p-4 sm:p-5">
    <div className={cn(
      "w-10 h-10 rounded-lg flex items-center justify-center mb-3",
      color === "primary" ? "bg-primary/20" : "bg-accent/20"
    )}>
      <Icon className={cn(
        "w-5 h-5",
        color === "primary" ? "text-primary" : "text-accent"
      )} />
    </div>
    <div className="text-2xl sm:text-3xl font-bold">{value}</div>
    <div className="text-sm text-muted-foreground">
      <span className="block">{label}</span>
      <span className="text-xs">{unit}</span>
    </div>
  </div>
);

export default Dashboard;
