import { Flame, BarChart3, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

interface NavbarProps {
  onStartPrediction: () => void;
  onViewDashboard?: () => void;
}

const Navbar = ({ onStartPrediction, onViewDashboard }: NavbarProps) => {
  const { user, signOut } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/5">
      <div className="container px-6">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent/50 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Flame className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg hidden sm:block">CalorieBurn<span className="text-primary">AI</span></span>
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#why" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Why Us</a>
            <a href="#how" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
            <a href="#dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4" />Dashboard
            </a>
          </div>
          
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="text-xs text-muted-foreground hidden sm:block">{user.email}</span>
                <Button variant="ghost" size="sm" onClick={signOut}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm"><User className="w-4 h-4 mr-1.5" />Login</Button>
              </Link>
            )}
            <Button variant="default" size="sm" onClick={onStartPrediction}>Try Now</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
