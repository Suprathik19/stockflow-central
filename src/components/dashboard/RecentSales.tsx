import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const recentSales = [
  {
    id: "SAL-001",
    customer: "John Smith",
    items: 3,
    total: 459.99,
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: "SAL-002",
    customer: "Sarah Johnson",
    items: 1,
    total: 129.99,
    status: "pending",
    date: "2024-01-15",
  },
  {
    id: "SAL-003",
    customer: "Mike Davis",
    items: 5,
    total: 789.5,
    status: "completed",
    date: "2024-01-14",
  },
  {
    id: "SAL-004",
    customer: "Emily Brown",
    items: 2,
    total: 234.0,
    status: "completed",
    date: "2024-01-14",
  },
  {
    id: "SAL-005",
    customer: "Chris Wilson",
    items: 4,
    total: 567.25,
    status: "processing",
    date: "2024-01-13",
  },
];

const statusVariants: Record<string, "success" | "warning" | "info"> = {
  completed: "success",
  pending: "warning",
  processing: "info",
};

export function RecentSales() {
  return (
    <div className="rounded-xl bg-card border border-border shadow-sm animate-slide-up" style={{ animationDelay: "500ms" }}>
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Recent Sales</h3>
        <p className="text-sm text-muted-foreground">Latest transactions</p>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Order ID
              </TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Customer
              </TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Items
              </TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Total
              </TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Status
              </TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Date
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentSales.map((sale) => (
              <TableRow
                key={sale.id}
                className="hover:bg-accent/50 transition-colors"
              >
                <TableCell className="font-medium text-foreground">
                  {sale.id}
                </TableCell>
                <TableCell className="text-foreground">{sale.customer}</TableCell>
                <TableCell className="text-muted-foreground">{sale.items}</TableCell>
                <TableCell className="font-medium text-foreground">
                  ${sale.total.toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariants[sale.status]} className="capitalize">
                    {sale.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{sale.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
