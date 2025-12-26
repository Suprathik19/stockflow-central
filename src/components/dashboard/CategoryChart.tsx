import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: "Electronics", value: 400, color: "hsl(217, 91%, 60%)" },
  { name: "Clothing", value: 300, color: "hsl(142, 76%, 36%)" },
  { name: "Food", value: 200, color: "hsl(38, 92%, 50%)" },
  { name: "Home", value: 150, color: "hsl(262, 83%, 58%)" },
  { name: "Other", value: 100, color: "hsl(0, 84%, 60%)" },
];

export function CategoryChart() {
  return (
    <div className="rounded-xl bg-card border border-border shadow-sm p-6 animate-slide-up" style={{ animationDelay: "300ms" }}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Product Distribution</h3>
        <p className="text-sm text-muted-foreground">By category</p>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={4}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.75rem",
                boxShadow: "var(--shadow-lg)",
              }}
              formatter={(value: number) => [`${value} products`, ""]}
            />
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              wrapperStyle={{ fontSize: "12px" }}
              formatter={(value) => (
                <span className="text-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
