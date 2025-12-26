import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Pencil,
  Trash2,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  minStock: number;
  status: "active" | "inactive";
}

const initialProducts: Product[] = [
  { id: "1", name: "Wireless Headphones", sku: "WH-001", category: "Electronics", price: 99.99, stock: 45, minStock: 10, status: "active" },
  { id: "2", name: "USB-C Cable", sku: "USB-012", category: "Electronics", price: 12.99, stock: 5, minStock: 20, status: "active" },
  { id: "3", name: "Laptop Stand", sku: "LS-003", category: "Accessories", price: 49.99, stock: 32, minStock: 15, status: "active" },
  { id: "4", name: "Mechanical Keyboard", sku: "MK-007", category: "Electronics", price: 149.99, stock: 18, minStock: 10, status: "active" },
  { id: "5", name: "Mouse Pad XL", sku: "MP-015", category: "Accessories", price: 24.99, stock: 67, minStock: 25, status: "active" },
  { id: "6", name: "Webcam HD", sku: "WC-009", category: "Electronics", price: 79.99, stock: 3, minStock: 10, status: "active" },
  { id: "7", name: "Monitor Arm", sku: "MA-022", category: "Accessories", price: 89.99, stock: 12, minStock: 8, status: "inactive" },
  { id: "8", name: "Desk Lamp LED", sku: "DL-033", category: "Home", price: 34.99, stock: 28, minStock: 15, status: "active" },
];

const categories = ["All", "Electronics", "Accessories", "Home", "Clothing"];

export default function Products() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "Electronics",
    price: "",
    stock: "",
    minStock: "",
  });

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || product.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" || product.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: String(Date.now()),
      name: formData.name,
      sku: formData.sku,
      category: formData.category,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      minStock: parseInt(formData.minStock),
      status: "active",
    };
    setProducts([...products, newProduct]);
    setIsAddDialogOpen(false);
    resetForm();
    toast({
      title: "Product Added",
      description: `${newProduct.name} has been added successfully.`,
    });
  };

  const handleEditProduct = () => {
    if (!editingProduct) return;
    const updatedProducts = products.map((p) =>
      p.id === editingProduct.id
        ? {
            ...p,
            name: formData.name,
            sku: formData.sku,
            category: formData.category,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock),
            minStock: parseInt(formData.minStock),
          }
        : p
    );
    setProducts(updatedProducts);
    setEditingProduct(null);
    resetForm();
    toast({
      title: "Product Updated",
      description: "Product has been updated successfully.",
    });
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
    toast({
      title: "Product Deleted",
      description: "Product has been removed.",
      variant: "destructive",
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      sku: "",
      category: "Electronics",
      price: "",
      stock: "",
      minStock: "",
    });
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      sku: product.sku,
      category: product.category,
      price: String(product.price),
      stock: String(product.stock),
      minStock: String(product.minStock),
    });
  };

  const exportToCSV = () => {
    const headers = ["Name", "SKU", "Category", "Price", "Stock", "Min Stock", "Status"];
    const csvData = filteredProducts.map((p) =>
      [p.name, p.sku, p.category, p.price, p.stock, p.minStock, p.status].join(",")
    );
    const csv = [headers.join(","), ...csvData].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "products.csv";
    a.click();
    toast({
      title: "Export Complete",
      description: `Exported ${filteredProducts.length} products to CSV.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground mt-1">
            Manage your inventory products
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="gradient" onClick={() => resetForm()}>
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new product to your inventory.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter product name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    value={formData.sku}
                    onChange={(e) =>
                      setFormData({ ...formData, sku: e.target.value })
                    }
                    placeholder="e.g., WH-001"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.slice(1).map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="0.00"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                    placeholder="0"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="minStock">Min Stock</Label>
                  <Input
                    id="minStock"
                    type="number"
                    value={formData.minStock}
                    onChange={(e) =>
                      setFormData({ ...formData, minStock: e.target.value })
                    }
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="gradient" onClick={handleAddProduct}>
                Add Product
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
            placeholder="Search by name or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={exportToCSV}>
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline ml-2">Export</span>
        </Button>
      </div>

      {/* Products Table */}
      <div className="rounded-xl bg-card border border-border shadow-sm overflow-hidden animate-slide-up" style={{ animationDelay: "100ms" }}>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Product
                </TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  SKU
                </TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Category
                </TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Price
                </TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Stock
                </TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Status
                </TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground uppercase tracking-wider w-[50px]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Package className="h-8 w-8" />
                      <p>No products found</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow
                    key={product.id}
                    className="hover:bg-accent/50 transition-colors"
                  >
                    <TableCell className="font-medium text-foreground">
                      {product.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground font-mono text-sm">
                      {product.sku}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{product.category}</Badge>
                    </TableCell>
                    <TableCell className="font-medium text-foreground">
                      ${product.price.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-foreground">{product.stock}</span>
                        {product.stock <= product.minStock && (
                          <Badge variant="lowStock">Low</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={product.status === "active" ? "success" : "secondary"}
                        className="capitalize"
                      >
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <Dialog
                            open={editingProduct?.id === product.id}
                            onOpenChange={(open) => {
                              if (!open) setEditingProduct(null);
                            }}
                          >
                            <DialogTrigger asChild>
                              <DropdownMenuItem
                                onSelect={(e) => {
                                  e.preventDefault();
                                  openEditDialog(product);
                                }}
                              >
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                              <DialogHeader>
                                <DialogTitle>Edit Product</DialogTitle>
                                <DialogDescription>
                                  Update the product details.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                  <Label htmlFor="edit-name">Product Name</Label>
                                  <Input
                                    id="edit-name"
                                    value={formData.name}
                                    onChange={(e) =>
                                      setFormData({ ...formData, name: e.target.value })
                                    }
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="grid gap-2">
                                    <Label htmlFor="edit-sku">SKU</Label>
                                    <Input
                                      id="edit-sku"
                                      value={formData.sku}
                                      onChange={(e) =>
                                        setFormData({ ...formData, sku: e.target.value })
                                      }
                                    />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="edit-category">Category</Label>
                                    <Select
                                      value={formData.category}
                                      onValueChange={(value) =>
                                        setFormData({ ...formData, category: value })
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {categories.slice(1).map((cat) => (
                                          <SelectItem key={cat} value={cat}>
                                            {cat}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                  <div className="grid gap-2">
                                    <Label htmlFor="edit-price">Price ($)</Label>
                                    <Input
                                      id="edit-price"
                                      type="number"
                                      value={formData.price}
                                      onChange={(e) =>
                                        setFormData({ ...formData, price: e.target.value })
                                      }
                                    />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="edit-stock">Stock</Label>
                                    <Input
                                      id="edit-stock"
                                      type="number"
                                      value={formData.stock}
                                      onChange={(e) =>
                                        setFormData({ ...formData, stock: e.target.value })
                                      }
                                    />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="edit-minStock">Min Stock</Label>
                                    <Input
                                      id="edit-minStock"
                                      type="number"
                                      value={formData.minStock}
                                      onChange={(e) =>
                                        setFormData({ ...formData, minStock: e.target.value })
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button
                                  variant="outline"
                                  onClick={() => setEditingProduct(null)}
                                >
                                  Cancel
                                </Button>
                                <Button variant="gradient" onClick={handleEditProduct}>
                                  Save Changes
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onSelect={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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

// Package icon for empty state
function Package(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}
