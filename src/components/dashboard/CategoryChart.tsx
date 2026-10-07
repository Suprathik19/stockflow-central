import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { BarChart2 } from "lucide-react";

const data = [
  { name: "Electronics", value: 400, color: "hsl(217, 91%, 60%)", pct: "34%" },
  { name: "Accessories", value: 300, color: "hsl(262, 83%, 58%)", pct: "25%" },
  { name: "Home & Office", value: 200, color: "hsl(142, 76%, 36%)", pct: "17%" },
  { name: "Clothing", value: 150, color: "hsl(38, 92%, 50%)", pct: "13%" },
  { name: "Other", value: 100, color: "hsl(0, 84%, 60%)", pct: "11%" },
];

const total = data.reduce((s, d) => s + d.value, 0);

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="rounded-xl border border-border bg-card p-3 shadow-xl">
        <p className="text-xs font-semibold text-muted-foreground mb-1">{d.name}</p>
        <p className="text-sm font-bold text-foreground">{d.value} products</p>
        <p className="text-xs text-muted-foreground">{d.pct} of total</p>
      </div>
    );
  }
  return null;
};

export function CategoryChart() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="rounded-2xl bg-card border border-border shadow-sm p-6 animate-slide-up" style={{ animationDelay: "300ms" }}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg gradient-purple">
          <BarChart2 className="h-3.5 w-3.5 text-white" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-foreground">Product Distribution</h3>
          <p className="text-xs text-muted-foreground">By category ({total} total)</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Donut chart */}
        <div className="h-[200px] w-[200px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    opacity={activeIndex === null || activeIndex === index ? 1 : 0.4}
                    style={{ transition: "opacity 0.2s" }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend with progress bars */}
        <div className="flex-1 space-y-3 min-w-0">
          {data.map((item, index) => {
            const pct = Math.round((item.value / total) * 100);
            return (
              <div
                key={item.name}
                className="space-y-1 cursor-pointer group"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: item.color }} />
                    <span className={`text-xs font-medium truncate transition-colors ${activeIndex === index ? "text-foreground" : "text-muted-foreground"}`}>
                      {item.name}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-foreground ml-2 shrink-0">{pct}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-border overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${pct}%`,
                      background: item.color,
                      opacity: activeIndex === null || activeIndex === index ? 1 : 0.3,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
