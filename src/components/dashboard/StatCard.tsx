import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { LucideIcon, TrendingDown, TrendingUp, ArrowUpRight } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
  gradient: "primary" | "success" | "warning" | "danger" | "purple";
  delay?: number;
  subtitle?: string;
  sparkData?: number[];
}

const gradientClasses = {
  primary: "gradient-primary shadow-glow",
  success: "gradient-success shadow-glow-success",
  warning: "gradient-warning shadow-glow-warning",
  danger: "gradient-danger shadow-glow-danger",
  purple: "gradient-purple shadow-glow-purple",
};

const bgGlowClasses = {
  primary: "from-primary/10 via-transparent",
  success: "from-success/10 via-transparent",
  warning: "from-warning/10 via-transparent",
  danger: "from-destructive/10 via-transparent",
  purple: "from-purple-500/10 via-transparent",
};

function MiniSparkline({ data, gradient }: { data: number[]; gradient: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 64;
  const height = 28;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  const colorMap: Record<string, string> = {
    primary: "hsl(217,91%,60%)",
    success: "hsl(142,76%,36%)",
    warning: "hsl(38,92%,50%)",
    danger: "hsl(0,84%,60%)",
    purple: "hsl(262,83%,58%)",
  };
  const color = colorMap[gradient] || colorMap.primary;

  return (
    <svg width={width} height={height} className="opacity-70">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  gradient,
  delay = 0,
  subtitle,
  sparkData,
}: StatCardProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-2xl bg-card border border-border shadow-sm hover:shadow-xl transition-all duration-300 group cursor-default",
        visible ? "animate-slide-up opacity-100" : "opacity-0"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Background glow */}
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500", bgGlowClasses[gradient])} />

      {/* Decorative corner element */}
      <div className={cn("absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-300", gradientClasses[gradient])} />

      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3",
              gradientClasses[gradient]
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
          {sparkData && (
            <div className="opacity-60 group-hover:opacity-100 transition-opacity duration-300">
              <MiniSparkline data={sparkData} gradient={gradient} />
            </div>
          )}
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className={cn(
            "text-3xl font-bold text-foreground tracking-tight transition-all duration-500",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          )}>
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>

        {trend && (
          <div className={cn(
            "flex items-center gap-1.5 mt-3 text-sm font-medium",
            trend.isPositive ? "text-success" : "text-destructive"
          )}>
            <div className={cn(
              "flex items-center justify-center w-5 h-5 rounded-full",
              trend.isPositive ? "bg-success/10" : "bg-destructive/10"
            )}>
              {trend.isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
            </div>
            <span>{trend.isPositive ? "+" : ""}{trend.value}%</span>
            <span className="text-muted-foreground font-normal text-xs">
              {trend.label ?? "vs last week"}
            </span>
          </div>
        )}
      </div>

      {/* Bottom gradient accent */}
      <div className={cn("absolute bottom-0 left-0 right-0 h-0.5", gradientClasses[gradient])} />
    </div>
  );
}
