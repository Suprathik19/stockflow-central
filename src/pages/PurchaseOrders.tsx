import { useState } from "react";
import {
  Plus,
  Search,
  ClipboardList,
  X,
  Check,
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

interface PurchaseItem {
  productId: string;
  productName: string;
  quantity: number;
  unitCost: number;
}

interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplier: string;
  items: PurchaseItem[];
  total: number;
  status: "pending" | "ordered" | "received";
  date: string;
}

const products = [
  { id: "1", name: "Wireless Headphones", unitCost: 45.0 },
  { id: "2", name: "USB-C Cable", unitCost: 5.5 },
  { id: "3", name: "Laptop Stand", unitCost: 22.0 },
  { id: "4", name: "Mechanical Keyboard", unitCost: 65.0 },
  { id: "5", name: "Mouse Pad XL", unitCost: 8.0 },
];

const initialOrders: PurchaseOrder[] = [
  {
    id: "1",
    poNumber: "PO-001",
    supplier: "TechSupply Co.",
    items: [
      { productId: "1", productName: "Wireless Headphones", quantity: 50, unitCost: 45.0 },
      { productId: "4", productName: "Mechanical Keyboard", quantity: 25, unitCost: 65.0 },
    ],
    total: 3875.0,
    status: "ordered",
    date: "2024-01-10",
  },
  {
    id: "2",
    poNumber: "PO-002",
    supplier: "AccessoriesPlus",
    items: [
      { productId: "2", productName: "USB-C Cable", quantity: 100, unitCost: 5.5 },
      { productId: "5", productName: "Mouse Pad XL", quantity: 50, unitCost: 8.0 },
    ],
    total: 950.0,
    status: "pending",
    date: "2024-01-12",
  },
  {
    id: "3",
    poNumber: "PO-003",
    supplier: "OfficeWorld",
    items: [
      { productId: "3", productName: "Laptop Stand", quantity: 30, unitCost: 22.0 },
    ],
    total: 660.0,
    status: "received",
    date: "2024-01-08",
  },
];

const statusVariants: Record<string, "warning" | "info" | "success"> = {
  pending: "warning",
  ordered: "info",
  received: "success",
};

export default function PurchaseOrders() {
  const [orders, setOrders] = useState<PurchaseOrder[]>(initialOrders);
  const [search, setSearch] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [supplier, setSupplier] = useState("");
  const [orderItems, setOrderItems] = useState<PurchaseItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("1");
  const { toast } = useToast();

  const filteredOrders = orders.filter(
    (order) =>
      order.poNumber.toLowerCase().includes(search.toLowerCase()) ||
      order.supplier.toLowerCase().includes(search.toLowerCase())
  );

  const addItemToOrder = () => {
    const product = products.find((p) => p.id === selectedProduct);
    if (!product) return;

    const qty = parseInt(quantity);
    const existingItem = orderItems.find((item) => item.productId === selectedProduct);
    
    if (existingItem) {
      setOrderItems(
        orderItems.map((item) =>
          item.productId === selectedProduct
            ? { ...item, quantity: item.quantity + qty }
            : item
        )
      );
    } else {
      setOrderItems([
        ...orderItems,
        {
          productId: product.id,
          productName: product.name,
          quantity: qty,
          unitCost: product.unitCost,
        },
      ]);
    }
    setSelectedProduct("");
    setQuantity("1");
  };

  const removeItem = (productId: string) => {
    setOrderItems(orderItems.filter((item) => item.productId !== productId));
  };

  const calculateTotal = () => {
    return orderItems.reduce((sum, item) => sum + item.unitCost * item.quantity, 0);
  };

  const generatePONumber = () => {
    const num = orders.length + 1;
    return `PO-${String(num).padStart(3, "0")}`;
  };

  const handleCreateOrder = () => {
    if (!supplier || orderItems.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please add a supplier and at least one item.",
        variant: "destructive",
      });
      return;
    }

    const newOrder: PurchaseOrder = {
      id: String(Date.now()),
      poNumber: generatePONumber(),
      supplier,
      items: orderItems,
      total: calculateTotal(),
      status: "pending",
      date: new Date().toISOString().split("T")[0],
    };

    setOrders([newOrder, ...orders]);
    setIsAddDialogOpen(false);
    setSupplier("");
    setOrderItems([]);
    toast({
      title: "Purchase Order Created",
      description: `${newOrder.poNumber} has been created.`,
    });
  };

  const updateOrderStatus = (orderId: string, newStatus: PurchaseOrder["status"]) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    
    if (newStatus === "received") {
      toast({
        title: "Order Received",
        description: "Stock has been updated with received items.",
      });
    } else {
      toast({
        title: "Status Updated",
        description: `Order status changed to ${newStatus}.`,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Purchase Orders</h1>
          <p className="text-muted-foreground mt-1">Manage your purchase orders</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="gradient">
              <Plus className="h-4 w-4" />
              New Order
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create Purchase Order</DialogTitle>
              <DialogDescription>Add items to order from supplier.</DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="grid gap-2">
                <Label htmlFor="supplier">Supplier Name</Label>
                <Input
                  id="supplier"
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                  placeholder="Enter supplier name"
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
                          {product.name} - ${product.unitCost.toFixed(2)}/unit
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
                  <Button onClick={addItemToOrder} disabled={!selectedProduct}>
                    Add
                  </Button>
                </div>
              </div>

              {orderItems.length > 0 && (
                <div className="rounded-lg border border-border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Qty</TableHead>
                        <TableHead>Unit Cost</TableHead>
                        <TableHead>Subtotal</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orderItems.map((item) => (
                        <TableRow key={item.productId}>
                          <TableCell className="font-medium">
                            {item.productName}
                          </TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>${item.unitCost.toFixed(2)}</TableCell>
                          <TableCell className="font-medium">
                            ${(item.unitCost * item.quantity).toFixed(2)}
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

              {orderItems.length > 0 && (
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
              <Button variant="gradient" onClick={handleCreateOrder}>
                Create Order
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex gap-4 animate-slide-up">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by PO number or supplier..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-xl bg-card border border-border shadow-sm overflow-hidden animate-slide-up" style={{ animationDelay: "100ms" }}>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  PO #
                </TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Supplier
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
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <ClipboardList className="h-8 w-8" />
                      <p>No purchase orders found</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow
                    key={order.id}
                    className="hover:bg-accent/50 transition-colors"
                  >
                    <TableCell className="font-medium text-foreground font-mono">
                      {order.poNumber}
                    </TableCell>
                    <TableCell className="text-foreground">{order.supplier}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {order.items.slice(0, 2).map((item, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {item.productName} ({item.quantity})
                          </Badge>
                        ))}
                        {order.items.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{order.items.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-foreground">
                      ${order.total.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariants[order.status]} className="capitalize">
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{order.date}</TableCell>
                    <TableCell>
                      {order.status === "pending" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateOrderStatus(order.id, "ordered")}
                        >
                          Mark Ordered
                        </Button>
                      )}
                      {order.status === "ordered" && (
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => updateOrderStatus(order.id, "received")}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Receive
                        </Button>
                      )}
                      {order.status === "received" && (
                        <span className="text-sm text-muted-foreground">Completed</span>
                      )}
                    </TableCell>
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
