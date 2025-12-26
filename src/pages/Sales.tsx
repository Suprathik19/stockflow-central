import { useState } from "react";
import {
  Plus,
  Search,
  Download,
  ShoppingCart,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface SaleItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

interface Sale {
  id: string;
  saleNumber: string;
  customer: string;
  items: SaleItem[];
  total: number;
  status: "completed" | "pending" | "cancelled";
  date: string;
}

const products = [
  { id: "1", name: "Wireless Headphones", price: 99.99, stock: 45 },
  { id: "2", name: "USB-C Cable", price: 12.99, stock: 5 },
  { id: "3", name: "Laptop Stand", price: 49.99, stock: 32 },
  { id: "4", name: "Mechanical Keyboard", price: 149.99, stock: 18 },
  { id: "5", name: "Mouse Pad XL", price: 24.99, stock: 67 },
];

const initialSales: Sale[] = [
  {
    id: "1",
    saleNumber: "SAL-001",
    customer: "John Smith",
    items: [
      { productId: "1", productName: "Wireless Headphones", quantity: 2, price: 99.99 },
      { productId: "3", productName: "Laptop Stand", quantity: 1, price: 49.99 },
    ],
    total: 249.97,
    status: "completed",
    date: "2024-01-15",
  },
  {
    id: "2",
    saleNumber: "SAL-002",
    customer: "Sarah Johnson",
    items: [
      { productId: "4", productName: "Mechanical Keyboard", quantity: 1, price: 149.99 },
    ],
    total: 149.99,
    status: "pending",
    date: "2024-01-15",
  },
  {
    id: "3",
    saleNumber: "SAL-003",
    customer: "Mike Davis",
    items: [
      { productId: "2", productName: "USB-C Cable", quantity: 5, price: 12.99 },
      { productId: "5", productName: "Mouse Pad XL", quantity: 2, price: 24.99 },
    ],
    total: 114.93,
    status: "completed",
    date: "2024-01-14",
  },
];

const statusVariants: Record<string, "success" | "warning" | "danger"> = {
  completed: "success",
  pending: "warning",
  cancelled: "danger",
};

export default function Sales() {
  const [sales, setSales] = useState<Sale[]>(initialSales);
  const [search, setSearch] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [customer, setCustomer] = useState("");
  const [saleItems, setSaleItems] = useState<SaleItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("1");
  const { toast } = useToast();

  const filteredSales = sales.filter(
    (sale) =>
      sale.saleNumber.toLowerCase().includes(search.toLowerCase()) ||
      sale.customer.toLowerCase().includes(search.toLowerCase())
  );

  const addItemToSale = () => {
    const product = products.find((p) => p.id === selectedProduct);
    if (!product) return;

    const qty = parseInt(quantity);
    if (qty > product.stock) {
      toast({
        title: "Insufficient Stock",
        description: `Only ${product.stock} units available.`,
        variant: "destructive",
      });
      return;
    }

    const existingItem = saleItems.find((item) => item.productId === selectedProduct);
    if (existingItem) {
      setSaleItems(
        saleItems.map((item) =>
          item.productId === selectedProduct
            ? { ...item, quantity: item.quantity + qty }
            : item
        )
      );
    } else {
      setSaleItems([
        ...saleItems,
        {
          productId: product.id,
          productName: product.name,
          quantity: qty,
          price: product.price,
        },
      ]);
    }
    setSelectedProduct("");
    setQuantity("1");
  };

  const removeItem = (productId: string) => {
    setSaleItems(saleItems.filter((item) => item.productId !== productId));
  };

  const calculateTotal = () => {
    return saleItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const generateSaleNumber = () => {
    const num = sales.length + 1;
    return `SAL-${String(num).padStart(3, "0")}`;
  };

  const handleCreateSale = () => {
    if (!customer || saleItems.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please add a customer and at least one item.",
        variant: "destructive",
      });
      return;
    }

    const newSale: Sale = {
      id: String(Date.now()),
      saleNumber: generateSaleNumber(),
      customer,
      items: saleItems,
      total: calculateTotal(),
      status: "completed",
      date: new Date().toISOString().split("T")[0],
    };

    setSales([newSale, ...sales]);
    setIsAddDialogOpen(false);
    setCustomer("");
    setSaleItems([]);
    toast({
      title: "Sale Created",
      description: `Sale ${newSale.saleNumber} has been created and stock has been deducted.`,
    });
  };

  const exportToCSV = () => {
    const headers = ["Sale Number", "Customer", "Items", "Total", "Status", "Date"];
    const csvData = filteredSales.map((s) =>
      [
        s.saleNumber,
        s.customer,
        s.items.map((i) => `${i.productName}(${i.quantity})`).join("; "),
        s.total.toFixed(2),
        s.status,
        s.date,
      ].join(",")
    );
    const csv = [headers.join(","), ...csvData].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sales.csv";
    a.click();
    toast({
      title: "Export Complete",
      description: `Exported ${filteredSales.length} sales to CSV.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Sales</h1>
          <p className="text-muted-foreground mt-1">Manage your sales transactions</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="gradient">
              <Plus className="h-4 w-4" />
              New Sale
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Sale</DialogTitle>
              <DialogDescription>Add items and complete the sale.</DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="grid gap-2">
                <Label htmlFor="customer">Customer Name</Label>
                <Input
                  id="customer"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  placeholder="Enter customer name"
                />
              </div>

              <div className="space-y-4">
                <Label>Add Products</Label>
                <div className="flex gap-2">
                  <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name} - ${product.price} ({product.stock} in stock)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-20"
                    placeholder="Qty"
                  />
                  <Button onClick={addItemToSale} disabled={!selectedProduct}>
                    Add
                  </Button>
                </div>
              </div>

              {saleItems.length > 0 && (
                <div className="rounded-lg border border-border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Qty</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Subtotal</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {saleItems.map((item) => (
                        <TableRow key={item.productId}>
                          <TableCell className="font-medium">
                            {item.productName}
                          </TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>${item.price.toFixed(2)}</TableCell>
                          <TableCell className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive"
                              onClick={() => removeItem(item.productId)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              {saleItems.length > 0 && (
                <div className="flex justify-end">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-2xl font-bold text-foreground">
                      ${calculateTotal().toFixed(2)}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="gradient" onClick={handleCreateSale}>
                Complete Sale
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by sale number or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" onClick={exportToCSV}>
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline ml-2">Export</span>
        </Button>
      </div>

      {/* Sales Table */}
      <div className="rounded-xl bg-card border border-border shadow-sm overflow-hidden animate-slide-up" style={{ animationDelay: "100ms" }}>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Sale #
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
              {filteredSales.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <ShoppingCart className="h-8 w-8" />
                      <p>No sales found</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredSales.map((sale) => (
                  <TableRow
                    key={sale.id}
                    className="hover:bg-accent/50 transition-colors"
                  >
                    <TableCell className="font-medium text-foreground font-mono">
                      {sale.saleNumber}
                    </TableCell>
                    <TableCell className="text-foreground">{sale.customer}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {sale.items.slice(0, 2).map((item, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {item.productName} ({item.quantity})
                          </Badge>
                        ))}
                        {sale.items.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{sale.items.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-foreground">
                      ${sale.total.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariants[sale.status]} className="capitalize">
                        {sale.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{sale.date}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
