import { Flame, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onStartPrediction: () => void;
  onViewDashboard?: () => void;
}

const Navbar = ({ onStartPrediction, onViewDashboard }: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/5">
      <div className="container px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent/50 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Flame className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg hidden sm:block">CalorieBurn<span className="text-primary">AI</span></span>
          </a>
          
          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#why" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Why Us
            </a>
            <a href="#how" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </a>
            <a href="#dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </a>
            <a href="#use-cases" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Use Cases
            </a>
          </div>
          
          {/* CTA */}
          <div className="flex items-center gap-3">
            {onViewDashboard && (
              <Button variant="outline" size="sm" onClick={onViewDashboard} className="hidden sm:flex">
                <BarChart3 className="w-4 h-4 mr-1.5" />
                Dashboard
              </Button>
            )}
            <Button variant="default" size="sm" onClick={onStartPrediction}>
              Try Now
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
