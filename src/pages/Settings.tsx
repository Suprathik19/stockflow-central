import { useState } from "react";
import {
  Settings as SettingsIcon, Bell, DollarSign, Palette,
  Package, Globe, Shield, Save, Check, Moon, Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface SettingRowProps {
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}

function SettingRow({ label, description, checked, onCheckedChange }: SettingRowProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="space-y-0.5 pr-4">
        <Label className="text-sm font-medium">{label}</Label>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

interface SectionProps {
  icon: React.ElementType;
  gradient: string;
  title: string;
  description: string;
  children: React.ReactNode;
  delay?: number;
}

function Section({ icon: Icon, gradient, title, description, children, delay = 0 }: SectionProps) {
  return (
    <div className="rounded-2xl bg-card border border-border shadow-sm overflow-hidden animate-slide-up" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-center gap-3 p-5 border-b border-border bg-accent/30">
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${gradient}`}>
          <Icon className="h-4.5 w-4.5 text-white" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="px-5 py-2 divide-y divide-border">{children}</div>
    </div>
  );
}

export default function Settings() {
  const [lowStockThreshold, setLowStockThreshold] = useState("10");
  const [currency, setCurrency] = useState("USD");
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [emailNotifications, setEmailNotifications]   = useState(true);
  const [lowStockAlerts, setLowStockAlerts]           = useState(true);
  const [salesReports, setSalesReports]               = useState(false);
  const [weeklyDigest, setWeeklyDigest]               = useState(true);
  const [autoReorder, setAutoReorder]                 = useState(false);
  const [twoFactor, setTwoFactor]                     = useState(true);
  const [sessionTimeout, setSessionTimeout]           = useState(true);
  const [saved, setSaved] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    setSaved(true);
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated.",
    });
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Configure your application preferences</p>
        </div>
        <Button
          variant={saved ? "success" : "gradient"}
          onClick={handleSave}
          className="gap-2 transition-all duration-300"
        >
          {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {saved ? "Saved!" : "Save Settings"}
        </Button>
      </div>

      {/* Inventory */}
      <Section icon={Package} gradient="gradient-primary" title="Inventory" description="Stock management configuration" delay={0}>
        <div className="py-3 space-y-3">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="threshold" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Low Stock Threshold</Label>
              <Input
                id="threshold"
                type="number"
                value={lowStockThreshold}
                onChange={(e) => setLowStockThreshold(e.target.value)}
                className="max-w-[140px]"
              />
              <p className="text-[11px] text-muted-foreground">Alert when stock falls below this</p>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Auto-Reorder</Label>
              <div className="flex items-center gap-3 pt-1.5">
                <Switch checked={autoReorder} onCheckedChange={setAutoReorder} />
                <span className="text-sm text-muted-foreground">
                  {autoReorder ? "Enabled" : "Disabled"}
                </span>
                {autoReorder && <Badge variant="success" className="text-[10px]">Active</Badge>}
              </div>
              <p className="text-[11px] text-muted-foreground">Create POs automatically</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Localization */}
      <Section icon={Globe} gradient="gradient-teal" title="Localization" description="Regional and currency preferences" delay={75}>
        <div className="py-3">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">???? USD ($)</SelectItem>
                  <SelectItem value="EUR">???? EUR (€)</SelectItem>
                  <SelectItem value="GBP">???? GBP (£)</SelectItem>
                  <SelectItem value="JPY">???? JPY (¥)</SelectItem>
                  <SelectItem value="INR">???? INR (?)</SelectItem>
                  <SelectItem value="CAD">???? CAD ($)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Timezone</Label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                  <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                  <SelectItem value="America/Los_Angeles">America/LA (PST)</SelectItem>
                  <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                  <SelectItem value="Asia/Tokyo">Asia/Tokyo (JST)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Section>

      {/* Notifications */}
      <Section icon={Bell} gradient="gradient-warning" title="Notifications" description="Choose what alerts you receive" delay={150}>
        <SettingRow label="Email Notifications" description="Receive email updates about your inventory" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
        <SettingRow label="Low Stock Alerts" description="Get notified when items are running low" checked={lowStockAlerts} onCheckedChange={setLowStockAlerts} />
        <SettingRow label="Sales Reports" description="Daily sales summary sent to your email" checked={salesReports} onCheckedChange={setSalesReports} />
        <SettingRow label="Weekly Digest" description="Weekly performance summary every Monday" checked={weeklyDigest} onCheckedChange={setWeeklyDigest} />
      </Section>

      {/* Security */}
      <Section icon={Shield} gradient="gradient-danger" title="Security" description="Protect your account" delay={225}>
        <SettingRow label="Two-Factor Authentication" description="Add an extra layer of security to your account" checked={twoFactor} onCheckedChange={setTwoFactor} />
        <SettingRow label="Session Timeout" description="Auto-logout after 30 minutes of inactivity" checked={sessionTimeout} onCheckedChange={setSessionTimeout} />
        <div className="py-3">
          <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/5">
            Change Password
          </Button>
        </div>
      </Section>

      {/* Appearance */}
      <Section icon={Palette} gradient="gradient-purple" title="Appearance" description="Customize the look of the app" delay={300}>
        <div className="py-3">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Moon className="h-4 w-4" />
            Toggle dark / light mode using the button in the sidebar.
          </p>
        </div>
      </Section>
    </div>
  );
}
