"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useTheme } from "next-themes";
import { 
  LayoutDashboard, 
  BookOpen, 
  Layers, 
  UserCircle2, 
  Menu, 
  Plus, 
  Check, 
  LogIn, 
  LogOut, 
  Sun, 
  Moon, 
  Mail, 
  Laptop 
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TradingAccount {
  id: string;
  account_name: string;
  account_type: string;
}

export function MobileNav() {
  const pathname = usePathname();
  const supabase = createClient();
  const { theme, setTheme } = useTheme();

  const [user, setUser] = useState<{ id: string; name: string; email: string; avatar: string } | null>(null);
  const [loading, setLoading] = useState(true);

  // Accounts state
  const [accounts, setAccounts] = useState<TradingAccount[]>([]);
  const [activeAccount, setActiveAccount] = useState<TradingAccount | null>(null);

  // Modals & Sheets visibility flags
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountsModalOpen, setAccountsModalOpen] = useState(false);
  const [addAccountModalOpen, setAddAccountModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);

  // Form states
  const [newAccountName, setNewAccountName] = useState("");
  const [newAccountType, setNewAccountType] = useState("");
  const [accountSubmitting, setAccountSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const fetchAccounts = async (userId: string) => {
    const { data } = await supabase
      .from("trading_accounts")
      .select("id, account_name, account_type")
      .eq("user_id", userId);

    if (data && data.length > 0) {
      setAccounts(data);
      setActiveAccount(data[0]);
    }
  };

  useEffect(() => {
    async function getUserData() {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        setUser({
          id: authUser.id,
          name: authUser.user_metadata?.full_name || authUser.email?.split("@")[0] || "Trader",
          email: authUser.email || "",
          avatar: authUser.user_metadata?.avatar_url || "",
        });
        fetchAccounts(authUser.id);
      }
      setLoading(false);
    }
    getUserData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          name: session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "Trader",
          email: session.user.email || "",
          avatar: session.user.user_metadata?.avatar_url || "",
        });
        fetchAccounts(session.user.id);
      } else {
        setUser(null);
        setAccounts([]);
        setActiveAccount(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setAuthLoading(false);
    if (!error) {
      setEmailModalOpen(false);
      setEmail("");
      setPassword("");
    } else {
      alert(error.message);
    }
  };

  const handleAddAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setAccountSubmitting(true);
    const { data, error } = await supabase
      .from("trading_accounts")
      .insert([{ user_id: user.id, account_name: newAccountName, account_type: newAccountType }])
      .select();

    setAccountSubmitting(false);
    if (!error && data) {
      setAccounts((prev) => [...prev, data[0]]);
      setActiveAccount(data[0]);
      setAddAccountModalOpen(false);
      setNewAccountName("");
      setNewAccountType("");
    } else if (error) {
      alert(error.message);
    }
  };

  return (
    <>
      {/* Floating iOS Glass Pill Navigation Bar */}
      <div className="md:hidden fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav className="pointer-events-auto flex items-center gap-1.5 bg-background/80 dark:bg-[#121212]/90 backdrop-blur-2xl border border-border/40 shadow-2xl rounded-full p-1.5">
          
          {/* 1. Overview */}
          <Link
            href="/dashboard"
            className={`flex items-center justify-center size-9 rounded-full transition-all ${
              pathname === "/dashboard"
                ? "bg-primary/20 text-primary border border-primary/30"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
            }`}
          >
            <LayoutDashboard className="size-4" />
          </Link>

          {/* 2. Playbook */}
          <Link
            href="/dashboard/playbook"
            className={`flex items-center justify-center size-9 rounded-full transition-all ${
              pathname === "/dashboard/playbook"
                ? "bg-primary/20 text-primary border border-primary/30"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
            }`}
          >
            <BookOpen className="size-4" />
          </Link>

          {/* 3. Account Switcher Trigger */}
          <button
            onClick={() => setAccountsModalOpen(true)}
            className="flex items-center justify-center size-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all"
            title="Switch Trading Account"
          >
            <Layers className="size-4" />
          </button>

          {/* 4. Profile / Settings Trigger */}
          <button
            onClick={() => setProfileModalOpen(true)}
            className="flex items-center justify-center size-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all"
            title="User Profile & Settings"
          >
            <UserCircle2 className="size-4" />
          </button>

          {/* 5. Navigation Sheet Trigger */}
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <button className="flex items-center justify-center size-9 rounded-full bg-primary/20 text-primary border border-primary/30 transition-all">
                <Menu className="size-4" />
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-3xl border-t border-border px-6 pb-8 pt-4">
              <div className="w-10 h-1 bg-muted rounded-full mx-auto mb-6" />
              <SheetHeader className="text-left mb-4">
                <SheetTitle className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider">
                  Propfident Terminal
                </SheetTitle>
              </SheetHeader>
              <div className="space-y-1">
                <Link
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-accent text-xs font-mono"
                >
                  <LayoutDashboard className="size-4 text-primary" />
                  <span>Overview</span>
                </Link>
                <Link
                  href="/dashboard/playbook"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-accent text-xs font-mono"
                >
                  <BookOpen className="size-4 text-primary" />
                  <span>Playbook</span>
                </Link>
              </div>
            </SheetContent>
          </Sheet>

        </nav>
      </div>

      {/* Accounts Selection Dialog */}
      <Dialog open={accountsModalOpen} onOpenChange={setAccountsModalOpen}>
        <DialogContent className="sm:max-w-[360px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-sm font-mono font-bold uppercase tracking-wider text-muted-foreground">
              Trading Accounts
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-2 py-2">
            {accounts.length === 0 ? (
              <p className="text-xs text-muted-foreground font-mono text-center py-4">No accounts linked yet.</p>
            ) : (
              accounts.map((acc) => (
                <button
                  key={acc.id}
                  onClick={() => {
                    setActiveAccount(acc);
                    setAccountsModalOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                    activeAccount?.id === acc.id ? "bg-primary/10 border-primary/40 text-primary" : "border-border/60 hover:bg-accent"
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-xs">{acc.account_name}</span>
                    <span className="text-[10px] text-muted-foreground font-mono">{acc.account_type}</span>
                  </div>
                  {activeAccount?.id === acc.id && <Check className="size-4 text-primary" />}
                </button>
              ))
            )}
            <Button
              variant="outline"
              onClick={() => {
                setAccountsModalOpen(false);
                setAddAccountModalOpen(true);
              }}
              className="w-full text-xs font-mono gap-2 mt-2 h-9 rounded-xl"
            >
              <Plus className="size-4" /> Add Trading Account
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Trading Account Dialog */}
      <Dialog open={addAccountModalOpen} onOpenChange={setAddAccountModalOpen}>
        <DialogContent className="sm:max-w-[360px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-sm font-bold">Add Trading Account</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddAccount} className="space-y-4 pt-2">
            <div className="space-y-1">
              <label className="text-xs font-mono font-medium text-muted-foreground">Account Name</label>
              <Input type="text" placeholder="e.g. FTMO $100k" value={newAccountName} onChange={(e) => setNewAccountName(e.target.value)} required className="h-9 text-xs rounded-xl" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono font-medium text-muted-foreground">Account Type</label>
              <Input type="text" placeholder="e.g. Evaluation / Funded" value={newAccountType} onChange={(e) => setNewAccountType(e.target.value)} required className="h-9 text-xs rounded-xl" />
            </div>
            <Button type="submit" className="w-full text-xs font-mono h-9 rounded-xl" disabled={accountSubmitting}>
              {accountSubmitting ? "Creating..." : "Save Account"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Profile & Settings Dialog */}
      <Dialog open={profileModalOpen} onOpenChange={setProfileModalOpen}>
        <DialogContent className="sm:max-w-[360px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-sm font-bold">Trader Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {user ? (
              <div className="flex items-center gap-3 p-3 bg-muted/40 rounded-xl border border-border/50">
                <Avatar className="size-10 rounded-lg">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="text-xs font-mono">{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col overflow-hidden">
                  <span className="font-semibold text-xs truncate">{user.name}</span>
                  <span className="text-[10px] text-muted-foreground font-mono truncate">{user.email}</span>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-mono">Sign in to sync your terminal data.</p>
                <Button onClick={() => { setProfileModalOpen(false); handleGoogleLogin(); }} className="w-full text-xs font-mono gap-2 h-9 rounded-xl" variant="outline">
                  <LogIn className="size-4" /> Sign in with Google
                </Button>
                <Button onClick={() => { setProfileModalOpen(false); setEmailModalOpen(true); }} className="w-full text-xs font-mono gap-2 h-9 rounded-xl" variant="outline">
                  <Mail className="size-4" /> Sign in with Email
                </Button>
              </div>
            )}

            {/* Theme Toggle Group */}
            <div className="space-y-2 pt-2 border-t border-border/50">
              <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Appearance</label>
              <div className="grid grid-cols-3 gap-2">
                <Button variant={theme === "light" ? "default" : "outline"} size="sm" onClick={() => setTheme("light")} className="text-xs font-mono gap-1.5 h-8 rounded-lg">
                  <Sun className="size-3.5" /> Light
                </Button>
                <Button variant={theme === "dark" ? "default" : "outline"} size="sm" onClick={() => setTheme("dark")} className="text-xs font-mono gap-1.5 h-8 rounded-lg">
                  <Moon className="size-3.5" /> Dark
                </Button>
                <Button variant={theme === "system" ? "default" : "outline"} size="sm" onClick={() => setTheme("system")} className="text-xs font-mono gap-1.5 h-8 rounded-lg">
                  <Laptop className="size-3.5" /> Auto
                </Button>
              </div>
            </div>

            {user && (
              <div className="pt-2 border-t border-border/50">
                <Button
                  variant="destructive"
                  onClick={async () => {
                    setProfileModalOpen(false);
                    await supabase.auth.signOut();
                  }}
                  className="w-full text-xs font-mono gap-2 h-9 rounded-xl"
                >
                  <LogOut className="size-4" /> Log out
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Email Login Modal */}
      <Dialog open={emailModalOpen} onOpenChange={setEmailModalOpen}>
        <DialogContent className="sm:max-w-[360px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-sm font-bold">Sign In with Email</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEmailLogin} className="space-y-4 pt-2">
            <div className="space-y-1">
              <label className="text-xs font-mono font-medium text-muted-foreground">Email</label>
              <Input type="email" placeholder="trader@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-9 text-xs rounded-xl" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono font-medium text-muted-foreground">Password</label>
              <Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required className="h-9 text-xs rounded-xl" />
            </div>
            <Button type="submit" className="w-full text-xs font-mono h-9 rounded-xl" disabled={authLoading}>
              {authLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}