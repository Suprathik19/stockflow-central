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
  Package2,
  Zap,
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
  onNavClick?: () => void;
}

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard, badge: null },
  { name: "Products", href: "/products", icon: Package, badge: null },
  { name: "Sales", href: "/sales", icon: ShoppingCart, badge: "3" },
  { name: "Purchase Orders", href: "/purchase-orders", icon: ClipboardList, badge: "1" },
  { name: "Users", href: "/users", icon: Users, adminOnly: true, badge: null },
];

const accountNav = [
  { name: "Profile", href: "/profile", icon: User, badge: null },
  { name: "Settings", href: "/settings", icon: Settings, badge: null },
];

function NavItem({
  item,
  isActive,
  collapsed,
  onClick,
}: {
  item: { name: string; href: string; icon: React.ElementType; badge: string | null };
  isActive: boolean;
  collapsed: boolean;
  onClick?: () => void;
}) {
  const content = (
    <Link
      to={item.href}
      onClick={onClick}
      className={cn(
        "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 group/nav",
        isActive
          ? "bg-primary text-primary-foreground shadow-md"
          : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
    >
      <item.icon className={cn("h-5 w-5 shrink-0 transition-transform duration-200", !isActive && "group-hover/nav:scale-110")} />
      {!collapsed && (
        <>
          <span className="flex-1 truncate">{item.name}</span>
          {item.badge && (
            <span className={cn(
              "inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold rounded-full",
              isActive ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
            )}>
              {item.badge}
            </span>
          )}
        </>
      )}
    </Link>
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right">
          {item.name}
        </TooltipContent>
      </Tooltip>
    );
  }
  return content;
}

export function Sidebar({ isDarkMode, toggleDarkMode, collapsed, onCollapsedChange, onNavClick }: SidebarProps) {
  const location = useLocation();
  const isAdmin = true;
  const user = { name: "John Doe", email: "john@stockflow.com", avatar: "" };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r border-sidebar-border bg-sidebar transition-all duration-300 ease-in-out flex flex-col",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-3 border-b border-sidebar-border shrink-0">
        <Link to="/" className="flex items-center gap-3 overflow-hidden min-w-0">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl gradient-primary shadow-md">
            <Package2 className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <span className="text-base font-bold text-sidebar-foreground block">StockFlow</span>
              <span className="text-[10px] text-sidebar-foreground/40 font-medium tracking-widest uppercase">Inventory Pro</span>
            </div>
          )}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0 text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent rounded-lg"
          onClick={() => onCollapsedChange(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto space-y-0.5">
        {!collapsed && (
          <p className="text-[10px] font-semibold text-sidebar-foreground/40 uppercase tracking-wider px-3 mb-2">Main Menu</p>
        )}
        {navigation.map((item) => {
          if ((item as any).adminOnly && !isAdmin) return null;
          return (
            <NavItem
              key={item.name}
              item={item}
              isActive={location.pathname === item.href}
              collapsed={collapsed}
              onClick={onNavClick}
            />
          );
        })}
        {!collapsed && (
          <p className="text-[10px] font-semibold text-sidebar-foreground/40 uppercase tracking-wider px-3 mb-2 mt-5">Account</p>
        )}
        {!collapsed && <div className="mt-1" />}
        {accountNav.map((item) => (
          <NavItem
            key={item.name}
            item={item}
            isActive={location.pathname === item.href}
            collapsed={collapsed}
            onClick={onNavClick}
          />
        ))}
      </nav>

      {/* Quick Stats */}
      {!collapsed && (
        <div className="px-3 pb-2">
          <div className="rounded-xl bg-gradient-to-br from-primary/8 via-purple-500/5 to-transparent border border-primary/10 p-3 space-y-2">
            <div className="flex items-center gap-1.5 mb-1">
              <Zap className="h-3 w-3 text-primary" />
              <span className="text-[11px] font-semibold text-sidebar-foreground/70">Live Overview</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] text-sidebar-foreground/60">
                <span className="status-dot-active" />Revenue
              </div>
              <Badge variant="success" className="text-[10px] h-4 px-1.5">+12.5%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] text-sidebar-foreground/60">
                <span className="status-dot-pending" />Low Stock
              </div>
              <Badge variant="danger" className="text-[10px] h-4 px-1.5">5 items</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] text-sidebar-foreground/60">
                <span className="status-dot-idle" />Pending POs
              </div>
              <Badge variant="warning" className="text-[10px] h-4 px-1.5">2</Badge>
            </div>
          </div>
        </div>
      )}

      <Separator className="bg-sidebar-border" />

      {/* Theme Toggle */}
      <div className="p-3">
        {collapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="w-full rounded-xl text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent" onClick={toggleDarkMode}>
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">{isDarkMode ? "Light Mode" : "Dark Mode"}</TooltipContent>
          </Tooltip>
        ) : (
          <Button variant="ghost" className="w-full justify-start gap-3 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent rounded-xl" onClick={toggleDarkMode}>
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="text-sm">{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
          </Button>
        )}
      </div>

      <Separator className="bg-sidebar-border" />

      {/* User Menu */}
      <div className="p-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full hover:bg-sidebar-accent rounded-xl",
                collapsed ? "px-0 justify-center h-11" : "justify-start gap-3 px-2 h-12"
              )}
            >
              <div className="relative shrink-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="gradient-primary text-white text-xs font-bold">
                    {user.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-success border-2 border-sidebar" />
              </div>
              {!collapsed && (
                <div className="flex flex-col items-start text-left overflow-hidden">
                  <span className="text-sm font-semibold text-sidebar-foreground truncate w-full">{user.name}</span>
                  <span className="text-[11px] text-sidebar-foreground/50">Administrator</span>
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="top" className="w-56 mb-1">
            <div className="px-2 py-1.5 mb-1">
              <p className="text-sm font-semibold">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile" className="flex items-center gap-2"><User className="h-4 w-4" />Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings" className="flex items-center gap-2"><Settings className="h-4 w-4" />Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <LogOut className="h-4 w-4 mr-2" />Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
