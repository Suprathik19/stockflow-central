import { useState } from "react";
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Area, AreaChart,
} from "recharts";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";

const weeklyData = [
  { name: "Mon", sales: 4200, orders: 12 },
  { name: "Tue", sales: 3800, orders: 9 },
  { name: "Wed", sales: 5600, orders: 15 },
  { name: "Thu", sales: 2900, orders: 8 },
  { name: "Fri", sales: 7200, orders: 22 },
  { name: "Sat", sales: 5100, orders: 14 },
  { name: "Sun", sales: 3700, orders: 11 },
];

const monthlyData = [
  { name: "Jan", sales: 42000, orders: 128 },
  { name: "Feb", sales: 38000, orders: 109 },
  { name: "Mar", sales: 55000, orders: 155 },
  { name: "Apr", sales: 61000, orders: 171 },
  { name: "May", sales: 49000, orders: 138 },
  { name: "Jun", sales: 72000, orders: 199 },
  { name: "Jul", sales: 68000, orders: 184 },
];

type ChartType = "bar" | "area";
type Period = "week" | "month";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-border bg-card p-3 shadow-xl">
        <p className="text-xs font-semibold text-muted-foreground mb-2">{label}</p>
        {payload.map((p: any, i: number) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-foreground font-semibold">
              {p.name === "sales" ? `$${p.value.toLocaleString()}` : `${p.value} orders`}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function SalesChart() {
  const [chartType, setChartType] = useState<ChartType>("area");
  const [period, setPeriod] = useState<Period>("week");

  const data = period === "week" ? weeklyData : monthlyData;

  return (
    <div className="rounded-2xl bg-card border border-border shadow-sm p-6 animate-slide-up" style={{ animationDelay: "200ms" }}>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg gradient-primary">
              <TrendingUp className="h-3.5 w-3.5 text-white" />
            </div>
            <h3 className="text-base font-semibold text-foreground">Sales Trend</h3>
          </div>
          <p className="text-xs text-muted-foreground mt-1 ml-9">
            {period === "week" ? "Last 7 days" : "Last 7 months"} performance
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          {/* Period toggle */}
          <div className="flex rounded-lg border border-border bg-muted/50 p-0.5">
            {(["week", "month"] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all duration-150 ${
                  period === p
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {p === "week" ? "7D" : "7M"}
              </button>
            ))}
          </div>
          {/* Chart type toggle */}
          <div className="flex rounded-lg border border-border bg-muted/50 p-0.5">
            {(["area", "bar"] as ChartType[]).map((t) => (
              <button
                key={t}
                onClick={() => setChartType(t)}
                className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all duration-150 ${
                  chartType === t
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t === "area" ? "Line" : "Bar"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "area" ? (
            <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(217,91%,60%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(217,91%,60%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "hsl(var(--border))", strokeWidth: 1 }} />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="hsl(217,91%,60%)"
                strokeWidth={2.5}
                fill="url(#salesGrad)"
                dot={{ fill: "hsl(217,91%,60%)", r: 3, strokeWidth: 0 }}
                activeDot={{ r: 5, strokeWidth: 0 }}
              />
            </AreaChart>
          ) : (
            <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "hsl(var(--accent))", radius: 8 }} />
              <Bar dataKey="sales" fill="hsl(217,91%,60%)" radius={[6, 6, 0, 0]} maxBarSize={40} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Bottom summary */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Total Sales</p>
          <p className="text-sm font-bold text-foreground">
            ${data.reduce((s, d) => s + d.sales, 0).toLocaleString()}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Avg / Day</p>
          <p className="text-sm font-bold text-foreground">
            ${Math.round(data.reduce((s, d) => s + d.sales, 0) / data.length).toLocaleString()}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Best Day</p>
          <p className="text-sm font-bold text-success">
            {data.reduce((best, d) => d.sales > best.sales ? d : best, data[0]).name}
          </p>
        </div>
      </div>
    </div>
  );
}
