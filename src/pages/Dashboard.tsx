import { Package, DollarSign, TrendingUp, Clock } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { CategoryChart } from "@/components/dashboard/CategoryChart";
import { LowStockAlert } from "@/components/dashboard/LowStockAlert";
import { RecentSales } from "@/components/dashboard/RecentSales";

export default function Dashboard() {
  const user = { name: "John" };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="animate-fade-in">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
          Welcome back, {user.name}! 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Here's what's happening with your inventory today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Products"
          value="1,248"
          icon={Package}
          gradient="primary"
          delay={0}
        />
        <StatCard
          title="Stock Value"
          value="$284,593"
          icon={DollarSign}
          gradient="success"
          delay={50}
        />
        <StatCard
          title="Total Revenue"
          value="$45,231"
          icon={TrendingUp}
          trend={{ value: 12.5, isPositive: true }}
          gradient="purple"
          delay={100}
        />
        <StatCard
          title="Pending Orders"
          value="23"
          icon={Clock}
          gradient="warning"
          delay={150}
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
