import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Flame, Loader2 } from "lucide-react";

interface FormData {
  gender: string;
  age: string;
  height: string;
  weight: string;
  duration: string;
  heartRate: string;
  bodyTemp: string;
}

interface PredictionResult {
  calories: number;
  bmi: number;
  bmiStatus: string;
}

interface PredictionFormProps {
  onResult: (result: PredictionResult) => void;
}

const PredictionForm = ({ onResult }: PredictionFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    gender: "",
    age: "",
    height: "",
    weight: "",
    duration: "",
    heartRate: "",
    bodyTemp: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const calculateBMI = (weight: number, height: number): { bmi: number; status: string } => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    
    let status = "Normal";
    if (bmi < 18.5) status = "Underweight";
    else if (bmi >= 25 && bmi < 30) status = "Overweight";
    else if (bmi >= 30) status = "Obese";
    
    return { bmi: Math.round(bmi * 10) / 10, status };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call - in production, this would POST to Flask backend
    await new Promise(resolve => setTimeout(resolve, 1500));

    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);
    const { bmi, status } = calculateBMI(weight, height);

    // Simulated calorie prediction based on inputs
    const baseCalories = parseFloat(formData.duration) * 7;
    const heartRateFactor = (parseFloat(formData.heartRate) - 60) * 0.5;
    const tempFactor = (parseFloat(formData.bodyTemp) - 36.5) * 20;
    const genderFactor = formData.gender === "male" ? 1.1 : 1;
    const ageFactor = 1 - (parseFloat(formData.age) - 25) * 0.005;
    
    const calories = Math.round((baseCalories + heartRateFactor + tempFactor) * genderFactor * ageFactor);

    onResult({
      calories: Math.max(50, calories),
      bmi,
      bmiStatus: status,
    });

    setIsLoading(false);
  };

  const inputClasses = "w-full h-12 px-4 rounded-lg input-glass text-foreground placeholder:text-muted-foreground focus:outline-none";
  const labelClasses = "block text-sm font-medium text-muted-foreground mb-2";

  return (
    <section className="py-24 relative" id="predict">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,hsl(174_72%_56%/0.05)_0%,transparent_50%)]" />
      
      <div className="container px-6 relative">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Get Your <span className="text-gradient-primary">Prediction</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Enter your details below to receive an instant, personalized calorie burn estimate.
          </p>
        </div>
        
        {/* Form card */}
        <div className="max-w-2xl mx-auto">
          <form 
            onSubmit={handleSubmit}
            className="glass-card-glow rounded-3xl p-8 sm:p-10"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Gender */}
              <div>
                <label htmlFor="gender" className={labelClasses}>Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                >
                  <option value="" disabled>Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              
              {/* Age */}
              <div>
                <label htmlFor="age" className={labelClasses}>Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="e.g., 28"
                  min="10"
                  max="100"
                  required
                  className={inputClasses}
                />
              </div>
              
              {/* Height */}
              <div>
                <label htmlFor="height" className={labelClasses}>Height (cm)</label>
                <input
                  type="number"
                  id="height"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder="e.g., 175"
                  min="100"
                  max="250"
                  required
                  className={inputClasses}
                />
              </div>
              
              {/* Weight */}
              <div>
                <label htmlFor="weight" className={labelClasses}>Weight (kg)</label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="e.g., 70"
                  min="30"
                  max="300"
                  required
                  className={inputClasses}
                />
              </div>
              
              {/* Duration */}
              <div>
                <label htmlFor="duration" className={labelClasses}>Workout Duration (min)</label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g., 45"
                  min="1"
                  max="300"
                  required
                  className={inputClasses}
                />
              </div>
              
              {/* Heart Rate */}
              <div>
                <label htmlFor="heartRate" className={labelClasses}>Heart Rate (bpm)</label>
                <input
                  type="number"
                  id="heartRate"
                  name="heartRate"
                  value={formData.heartRate}
                  onChange={handleChange}
                  placeholder="e.g., 120"
                  min="40"
                  max="220"
                  required
                  className={inputClasses}
                />
              </div>
              
              {/* Body Temperature */}
              <div className="sm:col-span-2">
                <label htmlFor="bodyTemp" className={labelClasses}>Body Temperature (°C)</label>
                <input
                  type="number"
                  id="bodyTemp"
                  name="bodyTemp"
                  value={formData.bodyTemp}
                  onChange={handleChange}
                  placeholder="e.g., 37.5"
                  min="35"
                  max="42"
                  step="0.1"
                  required
                  className={inputClasses}
                />
              </div>
            </div>
            
            {/* Submit button */}
            <Button 
              type="submit" 
              variant="hero" 
              size="lg" 
              className="w-full mt-8"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Flame className="w-5 h-5" />
                  Predict Calories
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PredictionForm;
