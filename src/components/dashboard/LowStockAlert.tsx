import { AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const lowStockItems = [
  { name: "Wireless Headphones", sku: "WH-001", stock: 3, minimum: 10 },
  { name: "USB-C Cable", sku: "USB-012", stock: 5, minimum: 20 },
  { name: "Phone Case", sku: "PC-045", stock: 2, minimum: 15 },
  { name: "Screen Protector", sku: "SP-089", stock: 4, minimum: 25 },
  { name: "Power Bank", sku: "PB-023", stock: 1, minimum: 10 },
];

export function LowStockAlert() {
  return (
    <div className="rounded-xl bg-card border border-border shadow-sm p-6 animate-slide-up" style={{ animationDelay: "400ms" }}>
      <div className="flex items-center gap-2 mb-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/10">
          <AlertTriangle className="h-4 w-4 text-destructive" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Low Stock Alerts</h3>
          <p className="text-sm text-muted-foreground">{lowStockItems.length} items need attention</p>
        </div>
      </div>
      <div className="space-y-3">
        {lowStockItems.map((item) => (
          <div
            key={item.sku}
            className="flex items-center justify-between rounded-lg bg-accent/50 p-3 hover:bg-accent transition-colors"
          >
            <div>
              <p className="font-medium text-foreground text-sm">{item.name}</p>
              <p className="text-xs text-muted-foreground">SKU: {item.sku}</p>
            </div>
            <div className="text-right">
              <Badge variant="lowStock">{item.stock} left</Badge>
              <p className="text-xs text-muted-foreground mt-1">
                Min: {item.minimum}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
