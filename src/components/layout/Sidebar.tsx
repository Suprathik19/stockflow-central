import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  ClipboardList,
  Users,
  Settings,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
  TrendingUp,
  AlertTriangle,
  Package2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Products", href: "/products", icon: Package },
  { name: "Sales", href: "/sales", icon: ShoppingCart },
  { name: "Purchase Orders", href: "/purchase-orders", icon: ClipboardList },
  { name: "Users", href: "/users", icon: Users, adminOnly: true },
];

export function Sidebar({ isDarkMode, toggleDarkMode }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isAdmin = true; // Mock admin status
  const user = {
    name: "John Doe",
    email: "john@stockflow.com",
    avatar: "",
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r border-sidebar-border bg-sidebar transition-all duration-300 ease-in-out flex flex-col",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary shadow-md">
            <Package2 className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="text-lg font-bold text-sidebar-foreground">
              StockFlow
            </span>
          )}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-sidebar-foreground/60 hover:text-sidebar-foreground"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
        {navigation.map((item) => {
          if (item.adminOnly && !isAdmin) return null;
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Quick Stats */}
      {!collapsed && (
        <div className="px-3 pb-3">
          <div className="rounded-lg bg-sidebar-accent/50 p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-sidebar-foreground/70">
                <TrendingUp className="h-3.5 w-3.5 text-success" />
                Revenue
              </div>
              <Badge variant="success" className="text-[10px]">
                +12.5%
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-sidebar-foreground/70">
                <AlertTriangle className="h-3.5 w-3.5 text-destructive" />
                Low Stock
              </div>
              <Badge variant="danger" className="text-[10px]">
                5 items
              </Badge>
            </div>
          </div>
        </div>
      )}

      <Separator className="bg-sidebar-border" />

      {/* Theme Toggle */}
      <div className="p-3">
        <Button
          variant="ghost"
          size={collapsed ? "icon" : "default"}
          className={cn(
            "w-full text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent",
            !collapsed && "justify-start gap-3"
          )}
          onClick={toggleDarkMode}
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
          {!collapsed && <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>}
        </Button>
      </div>

      <Separator className="bg-sidebar-border" />

      {/* User Menu */}
      <div className="p-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full hover:bg-sidebar-accent",
                collapsed ? "px-0 justify-center" : "justify-start gap-3 px-2"
              )}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {!collapsed && (
                <div className="flex flex-col items-start text-left">
                  <span className="text-sm font-medium text-sidebar-foreground">
                    {user.name}
                  </span>
                  <span className="text-xs text-sidebar-foreground/60">
                    {isAdmin ? "Admin 👑" : "User"}
                  </span>
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem asChild>
              <Link to="/profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
