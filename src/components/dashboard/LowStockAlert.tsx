import { AlertTriangle, Package, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const lowStockItems = [
  { name: "Power Bank 20K", sku: "PB-023", stock: 1, minimum: 10 },
  { name: "Phone Case XL", sku: "PC-045", stock: 2, minimum: 15 },
  { name: "Wireless Headphones", sku: "WH-001", stock: 3, minimum: 10 },
  { name: "Screen Protector", sku: "SP-089", stock: 4, minimum: 25 },
  { name: "USB-C Cable 2m", sku: "USB-012", stock: 5, minimum: 20 },
];

export function LowStockAlert() {
  return (
    <div className="rounded-2xl bg-card border border-border shadow-sm overflow-hidden animate-slide-up" style={{ animationDelay: "400ms" }}>
      {/* Header */}
      <div className="p-5 border-b border-border bg-destructive/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-destructive/15">
              <AlertTriangle className="h-4.5 w-4.5 text-destructive" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Low Stock Alerts</h3>
              <p className="text-xs text-muted-foreground">{lowStockItems.length} items critical</p>
            </div>
          </div>
          <Badge variant="danger" className="animate-pulse-soft">
            Urgent
          </Badge>
        </div>
      </div>

      {/* Items */}
      <div className="p-3 space-y-1.5">
        {lowStockItems.map((item, i) => {
          const pct = Math.round((item.stock / item.minimum) * 100);
          const urgency = pct <= 20 ? "text-destructive" : pct <= 40 ? "text-warning" : "text-foreground";
          return (
            <div
              key={item.sku}
              className="flex items-center gap-3 rounded-xl p-3 hover:bg-accent/60 transition-all duration-200 group"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-destructive/10 group-hover:scale-110 transition-transform duration-200">
                <Package className="h-3.5 w-3.5 text-destructive" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground truncate">{item.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1 rounded-full bg-border overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${Math.min(pct, 100)}%`,
                        background: pct <= 20
                          ? "hsl(var(--destructive))"
                          : pct <= 40
                          ? "hsl(var(--warning))"
                          : "hsl(var(--success))",
                      }}
                    />
                  </div>
                  <span className={`text-[10px] font-bold shrink-0 ${urgency}`}>{item.stock}/{item.minimum}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-3 pt-1 border-t border-border">
        <Button asChild variant="ghost" size="sm" className="w-full text-muted-foreground hover:text-foreground justify-between group">
          <Link to="/products">
            <span className="text-xs">View all inventory</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
