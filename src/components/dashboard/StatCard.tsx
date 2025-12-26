import { cn } from "@/lib/utils";
import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  gradient: "primary" | "success" | "warning" | "danger" | "purple";
  delay?: number;
}

const gradientClasses = {
  primary: "gradient-primary",
  success: "gradient-success",
  warning: "gradient-warning",
  danger: "gradient-danger",
  purple: "gradient-purple",
};

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  gradient,
  delay = 0,
}: StatCardProps) {
  return (
    <div
      className="relative overflow-hidden rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 group animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground tracking-tight">
              {value}
            </p>
            {trend && (
              <div
                className={cn(
                  "flex items-center gap-1 text-sm font-medium",
                  trend.isPositive ? "text-success" : "text-destructive"
                )}
              >
                {trend.isPositive ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span>{trend.value}%</span>
                <span className="text-muted-foreground font-normal">
                  vs last week
                </span>
              </div>
            )}
          </div>
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl text-primary-foreground shadow-lg transition-transform duration-300 group-hover:scale-110",
              gradientClasses[gradient]
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </div>
      {/* Decorative gradient line */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-1",
          gradientClasses[gradient]
        )}
      />
    </div>
  );
}
