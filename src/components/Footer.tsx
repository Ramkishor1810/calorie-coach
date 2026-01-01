import { Flame } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 border-t border-white/5">
      <div className="container px-6">
        <div className="flex items-center justify-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent/50 flex items-center justify-center">
            <Flame className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-sm text-muted-foreground">
            CalorieBurn AI
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
