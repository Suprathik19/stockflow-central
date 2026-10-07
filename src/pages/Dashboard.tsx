import { Package, DollarSign, TrendingUp, Clock, Bell, RefreshCw } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { CategoryChart } from "@/components/dashboard/CategoryChart";
import { LowStockAlert } from "@/components/dashboard/LowStockAlert";
import { RecentSales } from "@/components/dashboard/RecentSales";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const sparkProducts = [30, 45, 38, 52, 48, 60, 55, 65, 58, 70];
const sparkRevenue  = [18, 22, 16, 28, 24, 35, 30, 38, 32, 45];
const sparkSales    = [10, 14, 11, 18, 15, 22, 19, 25, 20, 28];
const sparkOrders   = [5, 3, 8, 4, 9, 6, 11, 7, 12, 8];

export default function Dashboard() {
  const now = new Date();
  const greeting = now.getHours() < 12 ? "Good morning" : now.getHours() < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-6 max-w-[1600px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 animate-fade-in">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">??</span>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground tracking-tight">
              {greeting}, John!
            </h1>
          </div>
          <p className="text-muted-foreground">
            Here's what's happening with your inventory today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success" className="gap-1.5">
            <span className="status-dot-active" />
            System Online
          </Badge>
          <Button variant="outline" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
            <RefreshCw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
          <Button variant="outline" size="icon" className="relative h-9 w-9">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-destructive border-2 border-background" />
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Products"
          value="1,248"
          icon={Package}
          gradient="primary"
          delay={0}
          subtitle="In 5 categories"
          sparkData={sparkProducts}
        />
        <StatCard
          title="Stock Value"
          value="$284,593"
          icon={DollarSign}
          gradient="success"
          delay={75}
          trend={{ value: 8.2, isPositive: true, label: "vs last month" }}
          sparkData={sparkRevenue}
        />
        <StatCard
          title="Total Revenue"
          value="$45,231"
          icon={TrendingUp}
          trend={{ value: 12.5, isPositive: true }}
          gradient="purple"
          delay={150}
          sparkData={sparkSales}
        />
        <StatCard
          title="Pending Orders"
          value="23"
          icon={Clock}
          gradient="warning"
          delay={225}
          trend={{ value: 4.3, isPositive: false, label: "needs attention" }}
          sparkData={sparkOrders}
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <SalesChart />
        <CategoryChart />
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentSales />
        </div>
        <LowStockAlert />
      </div>
    </div>
  );
}
