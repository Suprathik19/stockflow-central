import { Link } from "react-router-dom";
import { Home, Package2, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="text-center max-w-md animate-scale-in">
        {/* Animated icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl gradient-primary shadow-glow animate-float">
              <Package2 className="h-12 w-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-destructive text-white text-sm font-bold shadow-lg animate-bounce-in">
              !
            </div>
          </div>
        </div>

        {/* Error code */}
        <div className="text-8xl font-black text-gradient mb-4 leading-none">404</div>

        {/* Message */}
        <h1 className="text-2xl font-bold text-foreground mb-2">Page not found</h1>
        <p className="text-muted-foreground mb-8">
          Looks like this inventory item has gone missing. The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="gradient" className="gap-2">
            <Link to="/">
              <Home className="h-4 w-4" />
              Go to Dashboard
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link to="/products">
              <Search className="h-4 w-4" />
              Browse Products
            </Link>
          </Button>
        </div>

        {/* Quick links */}
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground mb-3">Quick links</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { label: "Dashboard", href: "/" },
              { label: "Products", href: "/products" },
              { label: "Sales", href: "/sales" },
              { label: "Purchase Orders", href: "/purchase-orders" },
            ].map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-xs text-primary hover:underline hover:text-primary/80 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
