import { useState } from "react";
import {
  User, Mail, Shield, Check, Camera, Crown,
  Activity, Package, ShoppingCart, TrendingUp, Edit3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const activityLog = [
  { action: "Added 50 units of Wireless Headphones", time: "2 hours ago", icon: Package, color: "text-primary" },
  { action: "Created Sale SAL-003 for $789.50", time: "5 hours ago", icon: ShoppingCart, color: "text-success" },
  { action: "Updated Purchase Order PO-002", time: "Yesterday", icon: TrendingUp, color: "text-purple-500" },
  { action: "Invited user emily@stockflow.com", time: "2 days ago", icon: User, color: "text-warning" },
];

const permissions = [
  "View & Edit Products",
  "Create & Manage Sales",
  "Purchase Order Management",
  "User Management",
  "Settings & Configuration",
  "Data Export",
];

export default function Profile() {
  const [name, setName] = useState("John Doe");
  const [email] = useState("john@stockflow.com");
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const initials = name.split(" ").map(n => n[0]).join("").toUpperCase();

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
      </div>

      {/* Hero Card */}
      <div className="rounded-2xl bg-card border border-border shadow-sm overflow-hidden animate-slide-up">
        {/* Banner */}
        <div className="h-28 gradient-primary relative">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }} />
        </div>

        {/* Profile info */}
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-12 mb-4">
            <div className="relative w-fit">
              <Avatar className="h-20 w-20 border-4 border-card shadow-xl">
                <AvatarFallback className="gradient-primary text-white text-2xl font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white shadow-md hover:scale-110 transition-transform">
                <Camera className="h-3 w-3" />
              </button>
            </div>
            <div className="flex gap-2 sm:mb-1">
              {isEditing ? (
                <>
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
                  <Button variant="gradient" size="sm" onClick={handleSave}>
                    <Check className="h-3.5 w-3.5" /> Save Changes
                  </Button>
                </>
              ) : (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit3 className="h-3.5 w-3.5" /> Edit Profile
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-1 mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-foreground">{name}</h2>
              <Crown className="h-4 w-4 text-warning" />
              <Badge variant="success" className="gap-1">
                <span className="status-dot-active" /> Active
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              {email}
            </div>
            <p className="text-sm text-muted-foreground">Administrator · StockFlow Inventory Pro</p>
          </div>

          <Separator className="my-4" />

          {/* Editable fields */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="profile-name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full Name</Label>
              <Input
                id="profile-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? "bg-muted/50 cursor-default" : ""}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="profile-email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Address</Label>
              <Input id="profile-email" value={email} disabled className="bg-muted/50 cursor-default" />
              <p className="text-[11px] text-muted-foreground">Linked via Google — cannot change</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {/* Permissions */}
        <div className="rounded-2xl bg-card border border-border shadow-sm p-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Role & Permissions</h3>
              <p className="text-xs text-muted-foreground">Administrator level</p>
            </div>
          </div>
          <div className="space-y-2">
            {permissions.map((perm) => (
              <div key={perm} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-success/15">
                  <Check className="h-2.5 w-2.5 text-success" />
                </div>
                {perm}
              </div>
            ))}
          </div>
        </div>

        {/* Activity */}
        <div className="rounded-2xl bg-card border border-border shadow-sm p-6 animate-slide-up" style={{ animationDelay: "150ms" }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-purple">
              <Activity className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Recent Activity</h3>
              <p className="text-xs text-muted-foreground">Your latest actions</p>
            </div>
          </div>
          <div className="space-y-4">
            {activityLog.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent ${item.color}`}>
                  <item.icon className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-foreground leading-snug">{item.action}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
