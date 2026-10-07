import { useState, useEffect, createContext, useContext } from "react";
import { Sidebar } from "./Sidebar";
import { cn } from "@/lib/utils";
import { Menu, Bell, Package2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

interface LayoutContextType {
  collapsed: boolean;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const LayoutContext = createContext<LayoutContextType>({
  collapsed: false,
  isDarkMode: false,
  toggleDarkMode: () => {},
});

export const useLayout = () => useContext(LayoutContext);

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("stockflow-theme");
      return saved === "dark";
    }
    return false;
  });
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("stockflow-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("stockflow-theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <LayoutContext.Provider value={{ collapsed, isDarkMode, toggleDarkMode }}>
      <div className="min-h-screen bg-background">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            collapsed={collapsed}
            onCollapsedChange={setCollapsed}
          />
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 border-b border-border bg-background/95 backdrop-blur-md flex items-center justify-between px-4 shadow-sm">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72 border-r border-sidebar-border bg-sidebar">
              <Sidebar
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
                collapsed={false}
                onCollapsedChange={() => {}}
                onNavClick={() => setMobileOpen(false)}
              />
            </SheetContent>
          </Sheet>

          {/* Mobile Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary shadow-md">
              <Package2 className="h-4 w-4 text-white" />
            </div>
            <span className="text-base font-bold text-foreground">StockFlow</span>
          </div>

          {/* Mobile Right Actions */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive border-2 border-background" />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <main
          className={cn(
            "min-h-screen transition-all duration-300 ease-in-out",
            collapsed ? "lg:ml-[72px]" : "lg:ml-64",
            "pt-16 lg:pt-0"
          )}
        >
          <div className="p-4 lg:p-6 xl:p-8 page-enter">{children}</div>
        </main>
      </div>
    </LayoutContext.Provider>
  );
}
