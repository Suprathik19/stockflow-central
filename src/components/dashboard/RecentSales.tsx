import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const recentSales = [
  { id: "SAL-001", customer: "John Smith",    initials: "JS", items: 3, total: 459.99,  status: "completed",  date: "2 min ago",   avatar: "from-blue-500 to-indigo-500" },
  { id: "SAL-002", customer: "Sarah Johnson", initials: "SJ", items: 1, total: 129.99,  status: "pending",    date: "18 min ago",  avatar: "from-pink-500 to-rose-500" },
  { id: "SAL-003", customer: "Mike Davis",    initials: "MD", items: 5, total: 789.50,  status: "completed",  date: "1 hr ago",    avatar: "from-emerald-500 to-teal-500" },
  { id: "SAL-004", customer: "Emily Brown",   initials: "EB", items: 2, total: 234.00,  status: "completed",  date: "3 hr ago",    avatar: "from-amber-500 to-orange-500" },
  { id: "SAL-005", customer: "Chris Wilson",  initials: "CW", items: 4, total: 567.25,  status: "processing", date: "5 hr ago",    avatar: "from-purple-500 to-violet-500" },
];

const statusConfig: Record<string, { variant: "success" | "warning" | "info"; label: string }> = {
  completed:  { variant: "success", label: "Completed" },
  pending:    { variant: "warning", label: "Pending" },
  processing: { variant: "info",    label: "Processing" },
};

export function RecentSales() {
  return (
    <div className="rounded-2xl bg-card border border-border shadow-sm overflow-hidden animate-slide-up" style={{ animationDelay: "500ms" }}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-success">
            <ShoppingBag className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">Recent Sales</h3>
            <p className="text-xs text-muted-foreground">Latest transactions</p>
          </div>
        </div>
        <Button asChild variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground gap-1 group">
          <Link to="/sales">
            View all
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </Button>
      </div>

      {/* Sales list */}
      <div className="divide-y divide-border">
        {recentSales.map((sale, i) => {
          const status = statusConfig[sale.status];
          return (
            <div
              key={sale.id}
              className="flex items-center gap-4 px-6 py-3.5 hover:bg-accent/40 transition-colors duration-150 group"
              style={{ animationDelay: `${500 + i * 60}ms` }}
            >
              {/* Avatar */}
              <Avatar className="h-9 w-9 shrink-0">
                <AvatarFallback className={`bg-gradient-to-br ${sale.avatar} text-white text-xs font-bold`}>
                  {sale.initials}
                </AvatarFallback>
              </Avatar>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-foreground truncate">{sale.customer}</p>
                  <span className="text-[10px] font-mono text-muted-foreground/60">{sale.id}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{sale.items} item{sale.items !== 1 ? "s" : ""} · {sale.date}</p>
              </div>

              {/* Right */}
              <div className="flex items-center gap-3 shrink-0">
                <Badge variant={status.variant} className="text-[10px] h-5 px-2">
                  {status.label}
                </Badge>
                <span className="text-sm font-bold text-foreground">
                  ${sale.total.toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
