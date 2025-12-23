import { Flame, Github, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="container px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & tagline */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent/50 flex items-center justify-center">
              <Flame className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-sm text-muted-foreground">
              Powered by Machine Learning | Flask Backend
            </span>
          </div>
          
          {/* Social links */}
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 text-muted-foreground" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5 text-muted-foreground" />
            </a>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center mt-8 pt-8 border-t border-white/5">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CalorieBurn AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
